import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'mkdir -p .github',
  'yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import',
  'rm -v .eslintrc .eslintrc.js',
  'cp -v ../../config/eslint/es6.eslint.js .eslintrc.js',
  'sed -i "s/\\"scripts\\": {/\\"scripts\\": {\\n'
    + '    \\"lint\\": \\"npx eslint src\\/*.js src\\/**\\/*.js\\",\\n'
    + '    \\"prerelease\\": \\"yarn lint\\",\\n'
    + '    \\"release\\": \\"npm publish --access=public\\",'
    + '/" package.json',
]);
