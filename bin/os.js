const os = require('os');


// define chrome executable path
const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'


let executablePath;
if (/^win/i.test(osPlatform)) {
  executablePath = '';
} else if (/^linux/i.test(osPlatform)) {
  executablePath = '/usr/bin/google-chrome';
}
