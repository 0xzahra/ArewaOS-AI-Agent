/**
 * ArewaOS — Telegram Bot (Grammy)
 */

import { Bot, InlineKeyboard } from 'grammy';
import { AGENT, SERVICES } from '../identity.js';

export function startTelegram(handleQuery) {
  const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

  bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
      .text('📋 Services', 'services')
      .text('🏆 Proof', 'proof')
      .row()
      .text('💬 Ask me anything', 'ask');

    await ctx.reply(
      `Hey! I'm ${AGENT.name} — Web3 marketing intelligence built on ${AGENT.chain}.\n\nBuilt by ${AGENT.builder} (${AGENT.builderHandle}) from ${AGENT.origin}.\n\nWhat do you need?`,
      { reply_markup: keyboard }
    );
  });

  bot.command('services', async (ctx) => {
    const buttons = SERVICES.map(s =>
      new InlineKeyboard().text(`${s.name} — ${s.price} USDC`, `service_${s.id}`)
    );

    await ctx.reply('Available services:', {
      reply_markup: {
        inline_keyboard: SERVICES.map(s => [{
          text: `${s.name} — ${s.price} USDC`,
          callback_data: `service_${s.id}`,
        }]),
      },
    });
  });

  bot.command('proof', async (ctx) => {
    const response = await handleQuery('/proof', 'telegram');
    await ctx.reply(response);
  });

  bot.callbackQuery(/service_(.+)/, async (ctx) => {
    const serviceId = ctx.match[1];
    const response = await handleQuery(serviceId, 'telegram');
    await ctx.answerCallbackQuery();
    await ctx.reply(response);
  });

  bot.callbackQuery('services', async (ctx) => {
    await ctx.answerCallbackQuery();
    const response = await handleQuery('/services', 'telegram');
    await ctx.reply(response);
  });

  bot.callbackQuery('proof', async (ctx) => {
    await ctx.answerCallbackQuery();
    const response = await handleQuery('/proof', 'telegram');
    await ctx.reply(response);
  });

  bot.callbackQuery('ask', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('Just type your question and I\'ll respond!');
  });

  // Handle all text messages
  bot.on('message:text', async (ctx) => {
    const response = await handleQuery(ctx.message.text, 'telegram');
    await ctx.reply(response, { parse_mode: 'Markdown' });
  });

  bot.start();
  return bot;
}
