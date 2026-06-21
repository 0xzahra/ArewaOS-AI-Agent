/**
 * ArewaOS — GitHub Automation Skill
 * Uses Octokit for repo management, PR creation, issue tracking.
 */

import { Octokit } from '@octokit/rest';

export class GitHubSkill {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
    this.owner = '0xzahra';
  }

  async listRepos() {
    const { data } = await this.octokit.repos.listForUser({ username: this.owner });
    return data.map(r => ({ name: r.name, url: r.html_url, description: r.description }));
  }

  async createIssue(repo, title, body, labels = []) {
    const { data } = await this.octokit.issues.create({
      owner: this.owner,
      repo,
      title,
      body,
      labels,
    });
    return { number: data.number, url: data.html_url };
  }

  async createBranch(repo, branch, base = 'main') {
    const { data: ref } = await this.octokit.git.getRef({
      owner: this.owner, repo, ref: `heads/${base}`,
    });
    await this.octokit.git.createRef({
      owner: this.owner, repo, ref: `refs/heads/${branch}`, sha: ref.object.sha,
    });
    return true;
  }

  async pushFile(repo, path, content, message, branch = 'main') {
    const { data } = await this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
    });
    return { sha: data.commit.sha, url: data.content?.html_url };
  }

  async openPR(repo, title, body, head, base = 'main') {
    const { data } = await this.octokit.pulls.create({
      owner: this.owner, repo, title, body, head, base,
    });
    return { number: data.number, url: data.html_url };
  }
}
