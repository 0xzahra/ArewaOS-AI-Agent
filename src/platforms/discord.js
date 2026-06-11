/**
 * ArewaOS — Discord Bot (Discord.js)
 */

import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import { AGENT, SERVICES } from '../identity.js';

export function startDiscord(handleQuery) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.on('ready', () => {
    console.log(`💬 Discord: ${client.user.tag}`);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'start') {
      const embed = new EmbedBuilder()
        .setTitle(AGENT.name)
        .setDescription(`Web3 marketing intelligence built on ${AGENT.chain} by ${AGENT.builder} (${AGENT.builderHandle})`)
        .addFields(SERVICES.map(s => ({
          name: `${s.name} — ${s.price} USDC`,
          value: s.description.substring(0, 100) + '...',
          inline: false,
        })))
        .setFooter({ text: `From ${AGENT.origin}` });

      await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'services') {
      const response = await handleQuery('/services', 'discord');
      await interaction.reply(response);
    }

    if (interaction.commandName === 'proof') {
      const response = await handleQuery('/proof', 'discord');
      await interaction.reply(response);
    }
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const response = await handleQuery(message.content, 'discord');
    await message.reply(response);
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
  return client;
}
