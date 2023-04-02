#!/usr/bin/env node
const { red, yellow } = require('kolorist');
const prompts = require('prompts');
const util = require('util');
const path = require('path');

const fs = require('fs');
const fsp = fs.promises;

const { exec } = require('child_process');
const execP = util.promisify(exec);

const os = require('os');
const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'


// execute shell command
const runCmd = async (command, msg = '') => {
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
};




const setup = async () => {
  const questions = [
    {
      type: 'text',
      name: 'folderName',
      message: 'Project name:'
    },
    {
      type: 'text',
      name: 'gitBranch',
      message: 'Template:',
      initial: 'master'
    },
  ];
  const answers = await prompts(questions);


  // define constants
  const ownPath = process.cwd();
  const folderName = answers.folderName;
  const gitBranch = answers.gitBranch;
  const appPath = path.join(ownPath, folderName);
  const repo = 'https://github.com/miko-soft/create-dodo-boilerplates.git';

  if (fs.existsSync(appPath)) { console.log(red(` - The project "${folderName}" exists already.`)); return; }

  console.log('+ Setup started ...');

  // clone repo
  await runCmd(`git clone -b ${gitBranch} ${repo} ${folderName}`, `+ boilerplate code is cloned: $git clone -b ${gitBranch} ${repo} ${folderName}`);

  // change directory
  process.chdir(appPath);

  // delete .git folder && create new .git
  osPlatform.includes('win') ? await runCmd('rmdir /Q /S .git') : await runCmd('rm -rf .git');
  await runCmd('git init', '+ git is initialised: $git init');

  // install dependencies
  await runCmd('npm install', '+ npm dependencies are installed: $npm install');

  console.log(yellow('+ Congrats! The DoDo Framework boilerplate code is installed and your project is ready for development.'));
};

setup().catch(console.log);


