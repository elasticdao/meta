import { validateIsString } from '@pie-dao/utils';

import checkoutBranch from './commands/checkoutBranch';
import cloneRepo from './commands/cloneRepo';
import commit from './commands/commit';
import copyTemplates from './commands/copyTemplates';
import deleteRepo from './commands/deleteRepo';
import Github from './adapters/Github';
import pushBranch from './commands/pushBranch';

const repo = process.env.REPO;
const token = process.env.TOKEN;

validateIsString(repo, {
  message: 'Please set environment variable REPO. Ex: REPO="elasticdao/meta" yarn branchProtection"',
});

validateIsString(token, {
  message: 'Please set environment variable TOKEN. Ex: TOKEN="<token>" yarn branchProtection"',
});

const main = async () => {
  const branch = `github-templates-${Date.now()}`;

  await cloneRepo(repo);
  await checkoutBranch(branch);
  await copyTemplates();
  await commit('update Github templates');
  await pushBranch(branch);
  await deleteRepo();

  const github = new Github(repo, token);

  console.log(await github.createPullRequest({
    branch,
    bodyMessage: 'Updates the Github templates. PR generated by elasticdao/meta repo.',
    title: 'New Github templates',
  }));
};

main();
