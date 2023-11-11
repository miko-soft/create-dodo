#!/usr/bin/env node
const { red, yellow, green } = require('kolorist');
const prompts = require('prompts');
const { readFile, writeFile } = require('fs').promises;
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
        { title: 'Single Page App', description: 'Effortlessly begin building browser-based Single Page Application (SPA)', value: 'spa' },
        { title: 'ElectronJS Desktop App', description: 'Initiate the development of desktop applications using the Dodo framework with ElectronJS Forge integration.', value: 'desktop-electronforge' },
        // { title: 'Chrome Extension', description: 'Craft Chrome Extensions designed to operate within the Chrome browser.', value: 'extension-chrome' },
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
  if (!authorName) { console.log(red(` - The author name is not defined.`)); return; }
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
    packageJSON = JSON.stringify(packageObj, null, 2);
    await writeFile('./package.json', packageJSON, { encoding: 'utf8' });
  } catch (err) {
    console.log(yellow('WARNING: The "package.json" remains unaltered through this process; please make the necessary modifications manually.'));
    console.log(err.message);
  }



  // install dependencies
  await runCmd('npm install', '+ npm dependencies are installed: $npm install');

  console.log(green('+ Congrats! The DoDo Framework boilerplate code is installed and your project is ready for development.'));
};

setup().catch(console.log);


