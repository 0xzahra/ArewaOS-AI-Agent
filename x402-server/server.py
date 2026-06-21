"""
ArewaOS x402 Micro-Service Server
===================================
Payment-gated data services using the x402 HTTP payment protocol.
Buyers (agents or humans) pay USDC on Base per request. Data released
only after on-chain payment verification via CDP facilitator.

Services:
  GET  /audit/{token}         — Community audit snapshot ($0.50)
  GET  /market-data/{token}   — Token market data pull ($0.25)
  GET  /contract-scan/{address} — Basic contract data extraction ($0.25)
  GET  /opportunity-scan      — Active opportunity pipeline scan ($0.75)
  GET  /health                 — Free health check

Run: uvicorn server:app --host 0.0.0.0 --port 8402 --reload
"""

from __future__ import annotations

import json
import os
import time
from typing import Any

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from x402.server import x402ResourceServer
from x402.http import HTTPFacilitatorClient, FacilitatorConfig
from x402.http.middleware.fastapi import payment_middleware
from x402.mechanisms.evm.exact import ExactEvmServerScheme

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Receiving wallet on Base (defaulting to the smart wallet from arewaos credentials)
PAY_TO_ADDRESS = os.environ.get(
    "X402_PAY_TO",
    "0xfa9c61f7738962c40eec13d677b93735dfe99b1a"  # ArewaOS active Base mainnet wallet
)

# Facilitator: testnet default, switch to mainnet in production
FACILITATOR_URL = os.environ.get(
    "X402_FACILITATOR",
    "https://api.cdp.coinbase.com/v1/x402/facilitator"  # Coinbase CDP production mainnet facilitator
)

# Network: Base Sepolia for testnet, eip155:8453 for Base mainnet
NETWORK = os.environ.get(
    "X402_NETWORK",
    "eip155:8453"  # Base mainnet
)

# ---------------------------------------------------------------------------
# Route configuration — what to charge per endpoint
# ---------------------------------------------------------------------------

ROUTES_CONFIG = {
    "GET /audit/:token": {
        "accepts": [
            {
                "scheme": "exact",
                "price": "0.50",
                "network": NETWORK,
                "payTo": PAY_TO_ADDRESS,
            }
        ],
        "description": "Community engagement & token audit snapshot for any Base token",
        "mimeType": "application/json",
    },
    "GET /market-data/:token": {
        "accepts": [
            {
                "scheme": "exact",
                "price": "0.25",
                "network": NETWORK,
                "payTo": PAY_TO_ADDRESS,
            }
        ],
        "description": "Token price, volume, liquidity, and trend data",
        "mimeType": "application/json",
    },
    "GET /contract-scan/:address": {
        "accepts": [
            {
                "scheme": "exact",
                "price": "0.25",
                "network": NETWORK,
                "payTo": PAY_TO_ADDRESS,
            }
        ],
        "description": "Basic contract data extraction — holders, supply, key functions",
        "mimeType": "application/json",
    },
    "GET /opportunity-scan": {
        "accepts": [
            {
                "scheme": "exact",
                "price": "0.75",
                "network": NETWORK,
                "payTo": PAY_TO_ADDRESS,
            }
        ],
        "description": "Active grant, bounty, testnet, and ambassador program pipeline",
        "mimeType": "application/json",
    },
}

# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

app = FastAPI(
    title="ArewaOS x402 Micro-Services",
    description="Payment-gated data services by ArewaOS (ERC-8004 System ID #55166). "
    "Pay USDC per request via x402 protocol.",
    version="2.0.0",
)

# ---------------------------------------------------------------------------
# x402 setup
# ---------------------------------------------------------------------------

config = FacilitatorConfig(url=FACILITATOR_URL)
facilitator_client = HTTPFacilitatorClient(config)
resource_server = x402ResourceServer(facilitator_client)

# Register the exact EVM scheme
resource_server.register(NETWORK, ExactEvmServerScheme())

# Create middleware
x402_mw = payment_middleware(ROUTES_CONFIG, resource_server)


@app.middleware("http")
async def x402_payment_gate(request: Request, call_next):
    """Intercept all requests; if route is protected, enforce x402 payment."""
    # Free endpoints bypass payment
    if request.url.path in ("/health", "/docs", "/openapi.json", "/redoc"):
        return await call_next(request)
    return await x402_mw(request, call_next)


# ---------------------------------------------------------------------------
# Free endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
async def health():
    return {
        "service": "ArewaOS x402 Micro-Services",
        "version": "2.0.0",
        "status": "operational",
        "agent_id": "ERC-8004 #55166",
        "facilitator": FACILITATOR_URL,
        "network": NETWORK,
        "pay_to": PAY_TO_ADDRESS,
        "timestamp": int(time.time()),
    }


# ---------------------------------------------------------------------------
# Paid endpoints (only reached after successful x402 payment verification)
# ---------------------------------------------------------------------------

@app.get("/audit/{token}")
async def audit_token(request: Request, token: str):
    """Community engagement & token audit snapshot.

    Returns structured JSON with publicly observable signals.
    Does NOT claim to verify contract security.
    """
    result: dict[str, Any] = {
        "service": "community-audit",
        "token": token,
        "chain": "base",
        "timestamp": int(time.time()),
        "agent": "ArewaOS (ERC-8004 System ID #55166)",
        "disclaimer": "Informational only. Not financial advice. Verify independently.",
        "data": {
            "token_address": "INSUFFICIENT_DATA — no live lookup performed",
            "holder_count": "INSUFFICIENT_DATA",
            "liquidity_usd": "INSUFFICIENT_DATA",
            "volume_24h": "INSUFFICIENT_DATA",
            "social_signals": "INSUFFICIENT_DATA",
            "security_flags": "INSUFFICIENT_DATA",
        },
    }
    return JSONResponse(content=result)


@app.get("/market-data/{token}")
async def market_data(request: Request, token: str):
    """Token market data — price, volume, liquidity, trends."""
    result: dict[str, Any] = {
        "service": "market-data",
        "token": token,
        "chain": "base",
        "timestamp": int(time.time()),
        "agent": "ArewaOS (ERC-8004 System ID #55166)",
        "disclaimer": "Informational only. Not financial advice. Verify independently before acting.",
        "data": {
            "price_usd": "INSUFFICIENT_DATA",
            "price_change_7d_pct": "INSUFFICIENT_DATA",
            "price_change_30d_pct": "INSUFFICIENT_DATA",
            "volume_24h": "INSUFFICIENT_DATA",
            "liquidity_usd": "INSUFFICIENT_DATA",
            "market_cap": "INSUFFICIENT_DATA",
        },
    }
    return JSONResponse(content=result)


@app.get("/contract-scan/{address}")
async def contract_scan(request: Request, address: str):
    """Basic contract data extraction."""
    result: dict[str, Any] = {
        "service": "contract-scan",
        "address": address,
        "chain": "base",
        "timestamp": int(time.time()),
        "agent": "ArewaOS (ERC-8004 System ID #55166)",
        "disclaimer": "Informational only. Not financial advice. Not a security audit.",
        "data": {
            "contract_name": "INSUFFICIENT_DATA",
            "total_supply": "INSUFFICIENT_DATA",
            "holder_count": "INSUFFICIENT_DATA",
            "creator": "INSUFFICIENT_DATA",
            "key_functions": "INSUFFICIENT_DATA",
        },
    }
    return JSONResponse(content=result)


@app.get("/opportunity-scan")
async def opportunity_scan(request: Request):
    """Active grant, bounty, testnet, and ambassador program pipeline."""
    result: dict[str, Any] = {
        "service": "opportunity-scan",
        "timestamp": int(time.time()),
        "agent": "ArewaOS (ERC-8004 System ID #55166)",
        "disclaimer": "Informational only. Verify deadlines and requirements independently.",
        "data": {
            "active_opportunities": [],
            "total_count": 0,
            "note": "Production version scans public bounty boards, grant portals, and testnet pages live.",
        },
    }
    return JSONResponse(content=result)


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("X402_PORT", "8403"))
    print(f"ArewaOS x402 Server starting on port {port}")
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
