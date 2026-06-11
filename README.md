# 🌍 ArewaOS AI Agent

**Web3 marketing intelligence. Built from Kano, not a lab.**

Seven-layer AI agent built on Base by [Zahra Usman](https://x.com/0xarewah) — a non-developer builder from Kano, Nigeria.

[![Base](https://img.shields.io/badge/Chain-Base-blue)](https://base.org)
[![Virtuals](https://img.shields.io/badge/Platform-Virtuals-purple)](https://virtuals.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🧠 The Seven Layers

| Layer | Name | Focus |
|:------|:-----|:------|
| L1 | Marketing Oracle | Narrative engineering, community audits, KOL maps, FUD responses, 30-day campaigns |
| L2 | Storytelling Engine | Origin stories, wins-and-losses threads, brand narratives |
| L3 | Crypto Confessions | Anonymous first-person risk stories — specific amounts, real outcomes |
| L4 | On-Chain Analyst | Pre-pump fingerprints, smart money signals, volume analysis |
| L5 | Ecosystem Scout | Grants, bounties, hackathons — ranked by effort-to-reward |
| L6 | AI Training Specialist | Scale AI, DataAnnotation, Remotasks — RLHF evaluation, hallucination review |
| ~~L7~~ | ~~Prediction Markets~~ | **Excluded** — halal-friendly, no prediction services |

---

## 💰 Services (7 Active)

🔹 **Web3 Marketing Teardown** — 15 USDC
Full narrative audit: messaging gaps, competitor blind spots, KOL map, 30-day campaign blueprint.

🔹 **Community Quick Scan** — 10 USDC
Rapid community health check: spam ratio, engagement quality, top-5 action items.

🔹 **X Thread / Narrative Pack** — 15 USDC
High-impact X thread with hook variants, reply reinforcement, and CTA optimization.

🔹 **Crypto Confession / Risk Story** — 12 USDC
Anonymous first-person narrative with specific amounts and real outcomes. Source never identified.

🔹 **Early Setup Finder** — 25 USDC
Pre-pump fingerprint + ecosystem opportunity with risk plan (entry/TP1/TP2/TP3/stop loss). *NFA.*

🔹 **AI Training Pathway Guide** — 10 USDC
Platform match, assessment prep, earning expectations, escalation path.

🔹 **Ecosystem Opportunity Digest** — 10 USDC
Weekly grants/bounties/hackathons ranked by effort-to-reward. Non-dev first.

---

## 🏗️ Tech Stack

**Runtime & Framework**
- Node.js 22+ (JavaScript runtime)
- Express.js (web server, HTTP endpoints)
- Grammy (Telegram bot framework)
- Discord.js (Discord bot integration)
- @slack/bolt (Slack bot integration)

**Communication & APIs**
- OpenAI API (language model interface — OpenAI-compatible endpoints)
- GitHub REST API (repo management via Octokit)
- Telegram Bot API (webhook + bot commands)
- Discord API (slash commands + message handling)
- Slack API (real-time messaging + slash commands)

**Data & Intelligence**
- Base MCP (on-chain data via Base network)
- Bankr Agent (wallet API, token analysis, x402guard scam scanning)
- Moltbook (agent social network API)
- ClawHub (skill marketplace registry)

**Deployment & DevOps**
- Docker (containerized runtime)
- Railway (primary hosting — free tier supported)
- Render (alternative hosting)
- Fly.io (edge deployment)
- GitHub Actions (CI/CD — optional)

**Testing & Quality**
- Node.js built-in test runner (`node --test`)
- Health check endpoint (`/health`)
- Environment-based configuration

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/0xzahra/ArewaOS-AI-Agent.git
cd ArewaOS-AI-Agent
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your tokens
```

Required for AI responses:
- `OPENAI_API_KEY` — your OpenAI-compatible API key
- `OPENAI_BASE_URL` — API endpoint (defaults to OpenAI)
- `MODEL_NAME` — model to use (defaults to gpt-4o-mini)

Optional for platform bots:
- `TELEGRAM_BOT_TOKEN` — from @BotFather
- `DISCORD_BOT_TOKEN` — from Discord Developer Portal
- `SLACK_BOT_TOKEN` + `SLACK_SIGNING_SECRET` — from Slack App config

### 3. Run

```bash
# Development
npm run dev

# Production
npm start

# With Docker
docker build -t arewaos .
docker run -p 3000:3000 --env-file .env arewaos
```

### 4. Test

```bash
npm test
```

---

## 📡 API Endpoints

| Method | Path | Description |
|:-------|:-----|:------------|
| GET | `/health` | Health check (agent status, uptime) |
| POST | `/ask` | Send a message, get AI response |
| GET | `/services` | List all 7 services with details |
| GET | `/proof` | Builder credentials and proof of delivery |

### Example: Ask Endpoint

```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'
```

---

## 🗂️ Project Structure

```
ArewaOS-AI-Agent/
├── src/
│   ├── server.js              # Express server + routing
│   ├── identity.js            # Agent config, 7 services, layers
│   ├── platforms/
│   │   ├── telegram.js        # Grammy Telegram bot
│   │   ├── discord.js         # Discord.js bot
│   │   └── slack.js           # @slack/bolt bot
│   └── skills/
│       ├── github.js          # GitHub automation (Octokit)
│       ├── agent-creator.js   # Agent template creation
│       └── skill-manager.js   # Dynamic skill registry
├── tests/
│   └── identity.test.js       # Core identity tests
├── platform-configs/
│   ├── railway.json           # Railway deployment config
│   ├── render.yaml            # Render deployment config
│   └── fly.toml               # Fly.io deployment config
├── Dockerfile                 # Container build
├── package.json               # Dependencies & scripts
├── .env.example               # Environment template
└── README.md                  # This file
```

---

## 🏆 Proof of Delivery

- 567K+ X impressions
- 6.6% engagement rate (2x industry average)
- 50K+ content views
- 20+ articles published
- Community growth: 400 → 600+ members
- 1,200+ spam messages removed
- PR merged into [Virtual Protocol acp-cli-demos](https://github.com/Virtual-Protocol/acp-cli-demos)
- Featured on [Virtuals Showcase](https://virtuals.io)
- ClawHub skills live and published

---

## 👤 Builder

**Zahra Usman** — Non-developer, Zoology graduate from Kano, Nigeria.

Built this entire agent from a phone. No laptop. No CS degree. No big capital.

- 🌐 [Portfolio](https://notion.so/Zahra-Usman-Portfolio-357a1c4765eb8162b41adb7bc3e2384e)
- 🐙 [GitHub](https://github.com/0xzahra)
- 🐦 [X/Twitter](https://x.com/0xarewah)
- 🤖 [Moltbook](https://moltbook.com/u/arewaos)
- 🦞 [ClawHub](https://clawhub.ai/user/0xzahra)

---

## ⚠️ Non-Negotiables

**Never:**
- Promote rugs or scam tokens
- Skip stop loss on trading analysis
- Identify confession sources
- Use generic AI copy
- Guarantee returns

**Always:**
- Lead with impact
- Flag manipulation and suspicious activity
- Protect @0xarewah's reputation
- Include NFA on all trading content

---

## 📄 License

MIT — see [LICENSE](LICENSE)

---

*No perfect background. No polished story. Just real work from Kano, Nigeria.*
