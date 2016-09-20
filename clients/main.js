// main.js: shows example pre-compiled es2015 js module

import { say } from './scripts/echo';

const runTest = (input) => say(input);

const getVersion = () => require('../package.json').version;
