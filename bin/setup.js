#!/usr/bin/env node
const util = require('util');
const path = require('path');

const fs = require('fs');
const fsp = fs.promises;

const { exec } = require('child_process');
const execP = util.promisify(exec);


// execute shell command
async function runCmd(command, msg = '') {
  try {
    const { stdout, stderr } = await execP(command);
    if (msg) {
      console.log(msg);
    } else if (stdout) {
      const stdout2 = stdout.replace(/\\n/g, '');
      console.log(JSON.stringify(stdout2));
    } else if (stderr) {
      const stderr2 = stderr.replace(/\\n/g, '');
      console.log(stderr2);
    }
  } catch (err) {
    console.log('ERROR::', err);
  }
}


// Validate arguments
if (process.argv.length < 3) {
  console.log(`Please specify the project name:
  For example:
    npx create-dodo my-app
  or
    npm init create-dodo my-app
  `);
  process.exit(1);
}


// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/miko-soft/create-dodo-boilerplates.git';


// Check if directory already exists
try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') { console.log('Directory already exists. Please choose another name for the project.'); }
  else { console.log(err); }
  process.exit(1);
}


async function setup() {
  try {
    console.log('+++ Setup started ...');

    // Clone repo
    await runCmd(`git clone -b master ${repo} ${folderName}`, `  + repo cloned: ${repo}`);

    // Change directory
    process.chdir(appPath);

    // Delete .git folder
    await runCmd('rm -rf .git');

    // Create new .git
    await runCmd('git init', '  + git initialised');

    // Install dependencies
    await runCmd('npm install', '  + npm dependencies installed');

    console.log('+++ DoDo Framework setup is finished !');

  } catch (error) {
    console.log(error);
  }
}

setup();


