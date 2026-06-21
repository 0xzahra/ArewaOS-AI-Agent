/**
 * ArewaOS — Agent Creator Skill
 * Create and configure new AI agents from templates.
 */

export const AGENT_TEMPLATES = {
  telegram: {
    name: 'Telegram Bot Agent',
    platforms: ['telegram'],
    runtime: 'node',
    framework: 'grammy',
  },
  discord: {
    name: 'Discord Bot Agent',
    platforms: ['discord'],
    runtime: 'node',
    framework: 'discord.js',
  },
  multi: {
    name: 'Multi-Platform Agent',
    platforms: ['telegram', 'discord', 'slack', 'http'],
    runtime: 'node',
    framework: 'express',
  },
};

export function createAgent(templateId, config) {
  const template = AGENT_TEMPLATES[templateId];
  if (!template) throw new Error(`Template "${templateId}" not found`);

  return {
    ...template,
    ...config,
    createdAt: new Date().toISOString(),
    version: '1.0.0',
  };
}

export function listTemplates() {
  return Object.entries(AGENT_TEMPLATES).map(([id, t]) => ({
    id,
    name: t.name,
    platforms: t.platforms.join(', '),
  }));
}
