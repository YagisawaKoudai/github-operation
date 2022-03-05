import yaml from 'js-yaml'
import fs from 'fs'

import { OctokitWrapper } from '../lib/octokit_wrapper.js';
import { usePrCheckUtils  } from './pr_check_utils.js';

const githubApiGateway = new OctokitWrapper({ auth: process.env.BUNDLE_GITHUB_TOKEN });
const { checkMilestone, checkLabel, checkCommitMessages } = usePrCheckUtils();

try {
  // get document
  const { sprint, urls } = yaml.load(fs.readFileSync(`${process.cwd()}/merge_pull_requests/pull_requests.yml`, 'utf8'));

  if (!sprint || !urls || !(urls.length > 0)) {
    throw 'Yml file format is invalid';
  }

  for (var i = 0; i < urls.length; i++) {
    const url = urls[i];

    try {
      const urlParts = url.split('/');
      const owner = urlParts[3];
      const repo = urlParts[4];
      const pull_number = Number(urlParts[6]);

      if (!owner || !repo || !pull_number) {
        throw 'Url format is invalid';
      }

      const prParams = {
        owner,
        repo,
        pull_number
      };
      const prRes = await githubApiGateway.getPr(prParams);
      const prData = prRes.data;

      checkMilestone(prData, sprint);

      checkLabel(prData);

      const commitRes = await githubApiGateway.listCommitsFromPr(prParams);
      const commitData = commitRes.data;

      checkCommitMessages(commitData);

      await githubApiGateway.mergePr(prParams);

      console.log(`Merged! ${url}`)
    } catch (e) {
      console.log(`Error! url: ${url}, error: ${e}`);
    }
  }
} catch (e) {
  console.log(e);
}
