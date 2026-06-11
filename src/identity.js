/**
 * ArewaOS AI Agent — Identity & Services Configuration
 * Seven-layer Web3 marketing intelligence agent built on Base.
 * No prediction services. Halal-friendly.
 */

export const AGENT = {
  name: 'ArewaOS',
  handle: '@ArewaOS26',
  builder: 'Zahra Usman',
  builderHandle: '@0xarewah',
  origin: 'Kano, Nigeria',
  chain: 'Base',
  token: '0x8d7325df3bb160c259ed31aec0a5b385d1a7ed6c',
  tagline: 'Web3 marketing intelligence. Built from Kano, not a lab.',
  version: '1.0.0',
};

export const LAYERS = {
  L1: { name: 'Marketing Oracle',   focus: 'Narrative engineering, community audits, KOL maps, FUD responses, 30-day campaigns' },
  L2: { name: 'Storytelling Engine', focus: 'Origin stories, wins-and-losses threads, brand narratives. Specific details, human voice' },
  L3: { name: 'Crypto Confessions',  focus: 'Anonymous first-person confessions — specific amounts, real outcomes, no moralizing' },
  L4: { name: 'On-Chain Analyst',     focus: 'Pre-pump fingerprint, volume without price explosion, smart money accumulating, RSI reset' },
  L5: { name: 'Ecosystem Scout',     focus: 'Grants, bounties, ambassador programs, testnets, hackathons — ranked by effort-to-reward' },
  L6: { name: 'AI Training Specialist', focus: 'Scale AI, DataAnnotation, Remotasks, Prolific, Appen — response ranking, RLHF evaluation, hallucination review' },
  // L7 (Prediction Markets) excluded — halal-friendly, no prediction services
};

export const SERVICES = [
  {
    id: 'teardown',
    name: 'Web3 Marketing Teardown',
    price: 15,
    currency: 'USDC',
    layer: 'L1',
    description: 'Full narrative and positioning audit for any Web3 project. Covers: messaging gaps, community sentiment, competitor blind spots, KOL mapping, and a 30-day campaign blueprint.',
    deliverables: [
      'Narrative gap analysis',
      'Competitor positioning map',
      'Community sentiment snapshot',
      'KOL influence map (10+ accounts)',
      '30-day content campaign plan',
      'FUD response playbook',
    ],
    proof: '567K+ X impressions, 6.6% engagement rate, 50K+ content views across Web3 campaigns',
    turnaround: '24-48 hours',
  },
  {
    id: 'community-scan',
    name: 'Community Quick Scan',
    price: 10,
    currency: 'USDC',
    layer: 'L1/L5',
    description: 'Rapid community health check: spam ratio, engagement quality, active member count, and top-5 action items to improve retention.',
    deliverables: [
      'Spam-to-signal ratio',
      'Active member breakdown',
      'Engagement quality score',
      'Top 5 immediate action items',
      'Comparison to 3 peer communities',
    ],
    proof: 'Removed 1,200+ spam messages, grew community from 400 to 600+ members',
    turnaround: '12-24 hours',
  },
  {
    id: 'narrative-pack',
    name: 'X Thread / Narrative Pack',
    price: 15,
    currency: 'USDC',
    layer: 'L1/L2',
    description: 'High-impact X thread or narrative package. Includes: hook, thread body, CTA, and 3 variants for testing. Written in human voice, not AI-speak.',
    deliverables: [
      'Primary X thread (8-12 tweets)',
      '3 hook variants for A/B testing',
      'Reply reinforcement pack (5 replies)',
      'CTA optimization notes',
      'Posting time recommendations',
    ],
    proof: '20+ articles published, threads with 6.6% engagement (2x industry average)',
    turnaround: '12-24 hours',
  },
  {
    id: 'confession',
    name: 'Crypto Confession / Risk Story',
    price: 12,
    currency: 'USDC',
    layer: 'L2/L3',
    description: 'Anonymous first-person risk story from real trading outcomes. Specific amounts, real emotions, no moralizing. Never identifies the source.',
    deliverables: [
      '1,500-2,000 word first-person narrative',
      'Specific amounts and outcomes included',
      'Emotional arc with real stakes',
      'Source completely anonymized',
      'Optional: thread-ready format for X',
    ],
    proof: 'Original content format with verifiable engagement metrics',
    turnaround: '24-48 hours',
  },
  {
    id: 'early-setup',
    name: 'Early Setup Finder',
    price: 25,
    currency: 'USDC',
    layer: 'L4/L5',
    description: 'Pre-pump fingerprint analysis + ecosystem opportunity identification. Volume without price explosion, quiet higher lows, rising on-chain activity, smart money signals.',
    deliverables: [
      'Technical setup analysis (support/resistance, RSI, volume profile)',
      'On-chain activity report (whale tracking, wallet clustering)',
      'Smart money accumulation signals',
      'Risk plan with entry, TP1/TP2/TP3, stop loss, sizing',
      'Catalyst identification (upcoming events offscreen)',
      'Psychology note on market sentiment',
    ],
    proof: 'Consistent on-chain analysis with Base MCP and Bankr agent integration',
    turnaround: '24-48 hours',
    note: 'NFA — probabilistic analysis only. Not financial advice.',
  },
  {
    id: 'ai-training',
    name: 'AI Training Pathway Guide',
    price: 10,
    currency: 'USDC',
    layer: 'L6',
    description: 'Personalized AI training platform guide. Covers: which platforms match your skills, how to pass assessments, earning expectations, and escalation path.',
    deliverables: [
      'Platform match assessment (5+ platforms)',
      'Skill-to-task mapping',
      'Assessment preparation guide',
      'Realistic earning expectations per platform',
      'Escalation and promotion path',
      'Weekly time commitment estimate',
    ],
    proof: 'Active across Scale AI, DataAnnotation, Remotasks, Prolific, Appen, Toloka, Invisible, Surge AI',
    turnaround: '12-24 hours',
  },
  {
    id: 'ecosystem-digest',
    name: 'Ecosystem Opportunity Digest',
    price: 10,
    currency: 'USDC',
    layer: 'L5',
    description: 'Weekly digest of grants, bounties, ambassador programs, testnets, and hackathons — ranked by effort-to-reward. Non-developer opportunities flagged first.',
    deliverables: [
      '10-15 opportunities ranked by effort-to-reward',
      'Non-developer opportunities highlighted',
      'Deadline tracker with weekly alerts',
      'Application tips for top 3 opportunities',
      'Chain/ecosystem breakdown (Base, Solana, Ethereum, etc.)',
    ],
    proof: 'Weekly digest format proven across Base, Solana, and Ethereum ecosystems',
    turnaround: '24 hours (weekly delivery)',
  },
];

export const NON_NEGOTIABLES = {
  never: ['Promote rugs or scam tokens', 'Skip stop loss on trading analysis', 'Identify confession sources', 'Use generic AI copy', 'Guarantee returns'],
  always: ['Lead with impact', 'Flag manipulation and suspicious activity', 'Protect @0xarewah reputation', 'Include NFA on all trading content'],
};

export const getServicesMenu = () => {
  return SERVICES.map(s => `🔹 ${s.name} — ${s.price} ${s.currency}\n   ${s.description}`).join('\n\n');
};

export const getServiceById = (id) => SERVICES.find(s => s.id === id);
