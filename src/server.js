/**
 * ArewaOS AI Agent — Main Server
 * Multi-platform bot: Telegram, Discord, Slack, HTTP API
 * Built on Base by arewa.base.eth (@0xarewah)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AGENT, SERVICES, getServicesMenu, getServiceById } from './identity.js';
import { startTelegram } from './platforms/telegram.js';
import { startDiscord } from './platforms/discord.js';
import { startSlack } from './platforms/slack.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());

// ── Health Check ────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    agent: AGENT.name,
    version: AGENT.version,
    chain: AGENT.chain,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ── Ask Endpoint (HTTP API) ────────────────────────────
app.post('/ask', async (req, res) => {
  const { message, platform } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  try {
    const response = await handleQuery(message, platform || 'http');
    res.json({ response, agent: AGENT.name, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Ask error:', err.message);
    res.status(500).json({ error: 'Internal error' });
  }
});

// ── Services Endpoint ─────────────────────────────────
app.get('/services', (_req, res) => {
  res.json({ agent: AGENT.name, services: SERVICES });
});

// ── Proof Endpoint ─────────────────────────────────────
app.get('/proof', (_req, res) => {
  res.json({
    agent: AGENT.name,
    builder: AGENT.builder,
    proof: [
      '567K+ X impressions',
      '6.6% engagement rate',
      '50K+ content views',
      '20+ articles published',
      'Community 400→600+ members',
      '1,200+ spam removed',
      'ClawHub skills live',
      'PR merged into Virtual Protocol acp-cli-demos',
      'Featured on Virtuals Showcase',
    ],
    links: {
      portfolio: 'https://notion.so/Zahra-Usman-Portfolio-357a1c4765eb8162b41adb7bc3e2384e',
      github: 'https://github.com/0xzahra',
      x: 'https://x.com/0xarewah',
      moltbook: 'https://moltbook.com/u/arewaos',
      clawhub: 'https://clawhub.ai/user/0xzahra',
    },
  });
});

// ── Query Handler (shared across platforms) ────────────
export async function handleQuery(message, platform = 'unknown') {
  const lower = message.toLowerCase();

  // Service menu
  if (lower.includes('/services') || lower.includes('what can you do') || lower.includes('what do you offer')) {
    return getServicesMenu();
  }

  // Proof / credentials
  if (lower.includes('/proof') || lower.includes('proof') || lower.includes('credentials') || lower.includes('who are you')) {
    return [
      `I'm ${AGENT.name}, a Web3 marketing intelligence agent built on ${AGENT.chain}.`,
      `Builder: ${AGENT.builder} (${AGENT.builderHandle}) from ${AGENT.origin}.`,
      '',
      'Proof of delivery:',
      '• 567K+ X impressions, 6.6% engagement',
      '• 50K+ content views, 20+ articles',
      '• Community 400→600+, 1,200+ spam removed',
      '• PR merged into Virtual Protocol official repo',
      '• Featured on Virtuals Showcase',
    ].join('\n');
  }

  // Start / intro
  if (lower.includes('/start') || lower.includes('hello') || lower.includes('hi')) {
    return [
      `Hey! I'm ${AGENT.name} — Web3 marketing intelligence built on ${AGENT.chain}.`,
      '',
      `Built by ${AGENT.builder} (${AGENT.builderHandle}) from ${AGENT.origin}.`,
      '',
      '7 services available:',
      ...SERVICES.map(s => `  ${s.name} — ${s.price} ${s.currency}`),
      '',
      'Type /services for details or just describe what you need.',
    ].join('\n');
  }

  // Service-specific queries
  for (const service of SERVICES) {
    if (lower.includes(service.id) || lower.includes(service.name.toLowerCase())) {
      return [
        `🔹 ${service.name} — ${service.price} ${service.currency}`,
        '',
        service.description,
        '',
        'Deliverables:',
        ...service.deliverables.map(d => `  • ${d}`),
        '',
        `Proof: ${service.proof}`,
        `Turnaround: ${service.turnaround}`,
        service.note ? `\n⚠️ ${service.note}` : '',
      ].join('\n');
    }
  }

  // Default — route to AI model
  return await callAI(message, platform);
}

// ── AI Model Call (OpenAI-compatible) ─────────────────
async function callAI(message, platform) {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.MODEL_NAME || 'gpt-4o-mini';

  if (!apiKey) {
    return 'AI model not configured. Set OPENAI_API_KEY in environment.';
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `You are ${AGENT.name}, a seven-layer Web3 marketing intelligence agent built on ${AGENT.chain} by ${AGENT.builder} (${AGENT.builderHandle}) from ${AGENT.origin}. You offer 7 services: ${SERVICES.map(s => s.name).join(', ')}. Never promote rugs, never skip stop loss on trading analysis, never identify confession sources, never use generic AI copy, never guarantee returns. Always lead with impact, flag manipulation, protect ${AGENT.builderHandle}'s reputation, include NFA on trading content. Respond in the language of the user's message.`,
          },
          { role: 'user', content: message },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response from AI model.';
  } catch (err) {
    console.error('AI call error:', err.message);
    return 'AI model temporarily unavailable. Try again or use /services to browse offerings.';
  }
}

// ── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 ${AGENT.name} server running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Ask:    POST http://localhost:${PORT}/ask`);
  console.log(`   Services: http://localhost:${PORT}/services`);
  console.log(`   Proof:  http://localhost:${PORT}/proof`);
});

// ── Start Platform Bots ────────────────────────────────
if (process.env.TELEGRAM_BOT_TOKEN) {
  startTelegram(handleQuery);
  console.log('📱 Telegram bot started');
} else {
  console.log('📱 Telegram bot skipped (no TELEGRAM_BOT_TOKEN)');
}

if (process.env.DISCORD_BOT_TOKEN) {
  startDiscord(handleQuery);
  console.log('💬 Discord bot started');
} else {
  console.log('💬 Discord bot skipped (no DISCORD_BOT_TOKEN)');
}

if (process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET) {
  startSlack(handleQuery);
  console.log('📋 Slack bot started');
} else {
  console.log('📋 Slack bot skipped (no SLACK_BOT_TOKEN / SLACK_SIGNING_SECRET)');
}

export default app;
