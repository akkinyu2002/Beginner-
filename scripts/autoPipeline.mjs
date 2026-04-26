import { execSync } from 'node:child_process';
import process from 'node:process';
import simpleGit from 'simple-git';

const DRY_RUN = process.argv.includes('--dry-run');

function runCommand(command) {
  execSync(command, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
}

function runWithRetry(primaryCommand, recoveryCommand) {
  try {
    runCommand(primaryCommand);
    return;
  } catch (_error) {
    runCommand(recoveryCommand);
    runCommand(primaryCommand);
  }
}

async function autoCommitIfNeeded() {
  const git = simpleGit(process.cwd());
  const status = await git.status();

  if (status.files.length === 0) {
    console.log('No changes to commit.');
    return;
  }

  if (DRY_RUN) {
    console.log('Dry run enabled. Skipping stage and commit.');
    return;
  }

  await git.add('.');

  const message = `chore: automated pipeline commit ${new Date().toISOString()}`;
  await git.commit(message);
  console.log(`Created commit: ${message}`);
}

async function runPipeline() {
  runWithRetry('npm run lint', 'npm run format');
  runCommand('npm run test');
  await autoCommitIfNeeded();
}

runPipeline().catch((error) => {
  console.error('Pipeline failed:', error.message);
  process.exit(1);
});
