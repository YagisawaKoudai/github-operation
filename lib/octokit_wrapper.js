import { Octokit } from '@octokit/rest'

export class OctokitWrapper {
  constructor(options) {
    this.client = new Octokit(options);
  }

  /**
   * 特定のPR情報を取得する
   * 
   * @param {String} owner
   * @param {String} repo 
   * @param {Number} pull_number 
   * @returns {Promise<OctokitResponse>}
   */
  async getPr({ owner, repo, pull_number }) {
    return await this.client.rest.pulls.get({
      owner,
      repo,
      pull_number
    });
  }

  /**
   * 特定のPRのコミット情報を取得する
   * 
   * @param {String} owner
   * @param {String} repo 
   * @param {Number} pull_number 
   * @returns {Promise<OctokitResponse>}
   */
  async listCommitsFromPr({ owner, repo, pull_number }) {
    return await this.client.rest.pulls.listCommits({
      owner,
      repo,
      pull_number
    });
  }

  /**
   * 特定のPRをマージする
   * 
   * @param {String} owner
   * @param {String} repo 
   * @param {Number} pull_number 
   * @returns {Promise<OctokitResponse>}
   */
   async mergePr({ owner, repo, pull_number }) {
    return await this.client.rest.pulls.merge({
      owner,
      repo,
      pull_number
    });
  }
}