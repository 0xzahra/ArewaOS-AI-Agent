/**
 * ArewaOS — Slack Bot (@slack/bolt)
 */

import { App } from '@slack/bolt';
import { AGENT, SERVICES } from '../identity.js';

export function startSlack(handleQuery) {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  });

  app.command('/arewaos', async ({ command, ack, respond }) => {
    await ack();
    const response = await handleQuery(command.text || '/start', 'slack');
    await respond(response);
  });

  app.event('app_mention', async ({ event, say }) => {
    const text = event.text.replace(/<@[^>]+>/, '').trim();
    const response = await handleQuery(text || '/start', 'slack');
    await say(response);
  });

  app.event('message', async ({ message, say }) => {
    if (message.bot_id) return;
    const response = await handleQuery(message.text, 'slack');
    await say(response);
  });

  (async () => {
    await app.start(process.env.SLACK_PORT || 3001);
    console.log('📋 Slack bot running');
  })();

  return app;
}
