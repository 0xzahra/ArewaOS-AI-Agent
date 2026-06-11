import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AGENT, SERVICES, getServicesMenu, getServiceById, NON_NEGOTIABLES } from '../src/identity.js';

describe('ArewaOS Identity', () => {
  it('has correct agent name', () => {
    assert.equal(AGENT.name, 'ArewaOS');
  });

  it('has 7 services', () => {
    assert.equal(SERVICES.length, 7);
  });

  it('no prediction services', () => {
    const hasPrediction = SERVICES.some(s =>
      s.name.toLowerCase().includes('prediction') ||
      s.name.toLowerCase().includes('polymarket') ||
      s.name.toLowerCase().includes('kalshi')
    );
    assert.equal(hasPrediction, false);
  });

  it('all services have required fields', () => {
    for (const s of SERVICES) {
      assert.ok(s.id, `Missing id for ${s.name}`);
      assert.ok(s.name, `Missing name`);
      assert.ok(s.price > 0, `Invalid price for ${s.name}`);
      assert.ok(s.currency, `Missing currency for ${s.name}`);
      assert.ok(s.description, `Missing description for ${s.name}`);
      assert.ok(s.deliverables.length > 0, `Missing deliverables for ${s.name}`);
      assert.ok(s.proof, `Missing proof for ${s.name}`);
      assert.ok(s.turnaround, `Missing turnaround for ${s.name}`);
    }
  });

  it('service menu returns string', () => {
    const menu = getServicesMenu();
    assert.equal(typeof menu, 'string');
    assert.ok(menu.includes('USDC'));
  });

  it('getServiceById works', () => {
    const service = getServiceById('teardown');
    assert.ok(service);
    assert.equal(service.name, 'Web3 Marketing Teardown');
  });

  it('getServiceById returns undefined for unknown id', () => {
    const service = getServiceById('nonexistent');
    assert.equal(service, undefined);
  });

  it('non-negotiables are defined', () => {
    assert.ok(NON_NEGOTIABLES.never.length > 0);
    assert.ok(NON_NEGOTIABLES.always.length > 0);
  });
});
