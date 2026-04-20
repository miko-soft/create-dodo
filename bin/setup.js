#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
updateNotifier({ pkg }).notify();

const { red, yellow, green } = require('kolorist');
const prompts = require('prompts');
const { readFile, writeFile } = require('fs').promises;
const util = require('util');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');

const execP = util.promisify(exec);
const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'


// execute shell command - throws on non-zero exit
const runCmd = async (command, msg = '') => {
  const { stdout, stderr } = await execP(command);
  if (msg) {
    console.log(msg);
  } else if (stdout) {
    console.log(stdout.replace(/\n/g, ''));
  } else if (stderr) {
    console.log(stderr.replace(/\n/g, ''));
  }
};



const setup = async () => {
  const questions = [
    {
      type: 'text',
      name: 'projectTitle',
      message: 'Project Title:'
    },
    {
      type: 'text',
      name: 'projectDescription',
      message: 'Project Description:'
    },
    {
      type: 'text',
      name: 'authorName',
      message: 'Author:'
    },
    {
      type: 'select',
      name: 'gitBranch',
      message: 'Select a boilerplate template:',
      choices: [
        { title: 'One Page App', description: 'Start an One Page Application with a single controller and no routes.', value: 'appOne' },
        { title: 'Single Page App', description: 'Effortlessly begin building browser-based Single Page Application (SPA)', value: 'spa' },
        { title: 'ElectronJS Desktop App', description: 'Initiate the development of desktop applications using the Dodo framework with ElectronJS Forge integration.', value: 'desktop-electronforge' },
        { title: 'Chrome Extension', description: 'Craft chrome extension designed to operate within the Chrome browser.', value: 'extension-chrome' },
        // { title: 'Cordova Mobile App', description: 'Quickly launch cross-platform mobile applications with Cordova and Dodo.', value: 'mobile-cordova' },
      ],
      initial: 0
    },
  ];
  const answers = await prompts(questions);


  // define constants
  const ownPath = process.cwd();
  const projectTitle = answers.projectTitle ? answers.projectTitle.replace(/\s+/g, ' ').trim() : '';
  const projectName = projectTitle.toLowerCase().replace(/\s/g, '-'); // small letters, no whitespaces
  const projectDescription = answers.projectDescription ? answers.projectDescription.replace(/\s+/g, ' ').trim() : '';
  const authorName = answers.authorName ? answers.authorName.replace(/\s+/g, ' ').trim() : '';
  const gitBranch = answers.gitBranch;
  const appPath = path.join(ownPath, projectName);
  const repo = 'https://github.com/miko-soft/create-dodo-boilerplates.git';


  if (!projectTitle) { console.log(red(` - The project name is not defined.`)); return; }
  if (!gitBranch) { console.log(red(` - The template is not defined.`)); return; }
  if (fs.existsSync(appPath)) { console.log(red(` - The project "${projectTitle}" exists already.`)); return; }
  console.log('+ Setup started ...');

  // clone repo
  await runCmd(`git clone -b ${gitBranch} ${repo} ${projectName}`, `+ boilerplate code is cloned: $git clone -b ${gitBranch} ${repo} ${projectName}`);

  // change directory
  process.chdir(appPath);

  // delete .git folder && create new .git
  osPlatform.includes('win') ? await runCmd('rmdir /Q /S .git') : await runCmd('rm -rf .git');
  await runCmd('git init', '+ git is initialised: $git init');

  // change name, productname and author in the package.json
  try {
    let packageJSON = await readFile('./package.json', { encoding: 'utf8' });
    const packageObj = JSON.parse(packageJSON);
    packageObj.name = projectName;
    if (gitBranch === 'desktop-electronforge') { packageObj.productName = projectName; }
    packageObj.title = projectTitle;
    packageObj.description = projectDescription;
    packageObj.author = authorName;
    const portExport = osPlatform.includes('win') ? `set PORT=9000 &&` : `export PORT=9000 &&`;
    if (!packageObj.scripts) { packageObj.scripts = {}; }
    packageObj.scripts.server = `${portExport} pm2 start server/index.js --name ${projectName}`;
    packageJSON = JSON.stringify(packageObj, null, 2);
    await writeFile('./package.json', packageJSON, { encoding: 'utf8' });
  } catch (err) {
    console.log(yellow('WARNING: The "package.json" remains unaltered through this process; please make the necessary modifications manually.'));
    console.log(err.message);
  }


  // install dependencies
  if (fs.existsSync('package-lock.json')) { fs.unlinkSync('package-lock.json'); console.log('+ package-lock.json removed'); }
  await runCmd('npm cache clean --force', '+ npm cache clean --force | installing dependencies ... Please wait!');
  await runCmd('npm install', '+ npm dependencies are installed: $npm install');

  console.log(green('+ Congrats! The DoDo Framework boilerplate code is installed and your project is ready for development.'));
};

setup().catch(console.log);
