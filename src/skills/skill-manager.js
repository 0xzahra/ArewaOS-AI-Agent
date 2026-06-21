/**
 * ArewaOS — Skill Manager
 * Dynamically load, register, and execute agent skills.
 */

export class SkillManager {
  constructor() {
    this.skills = new Map();
  }

  register(id, skill) {
    this.skills.set(id, {
      id,
      name: skill.name,
      description: skill.description,
      handler: skill.handler,
      layer: skill.layer || null,
      enabled: true,
    });
  }

  unregister(id) {
    this.skills.delete(id);
  }

  async execute(id, ...args) {
    const skill = this.skills.get(id);
    if (!skill) throw new Error(`Skill "${id}" not found`);
    if (!skill.enabled) throw new Error(`Skill "${id}" is disabled`);
    return await skill.handler(...args);
  }

  list() {
    return [...this.skills.values()].map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      layer: s.layer,
      enabled: s.enabled,
    }));
  }

  enable(id) {
    const skill = this.skills.get(id);
    if (skill) skill.enabled = true;
  }

  disable(id) {
    const skill = this.skills.get(id);
    if (skill) skill.enabled = false;
  }
}
