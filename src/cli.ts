#!/usr/bin/env node

import chalk from 'chalk';
import {Command} from 'commander';
import figlet from 'figlet';
import packageData from '../package.json' with {type: 'json'};
import {createConfig} from './helpers/createConfig.js';
import pushFile from './pushfile.js';

// Banner
console.log(
  chalk.red(figlet.textSync('PushFile!', {horizontalLayout: 'full'})),
);

const program = new Command();

program
  .name('pushfile')
  .version(packageData.version)
  .usage('[options] <file>')
  .option('-u, --unique', 'Generate a unique hash for the uploaded file.')
  .option('-c, --configure', 'Create or overwrite your configuration file.')
  .argument('[file]', 'File to upload')
  .parse(process.argv);

const options = program.opts();
const fileArg = program.args[0];

// ----------------------------
// Command handling
// ----------------------------

if (options.configure) {
  await createConfig();
  process.exit(0);
}

if (!fileArg) {
  program.help();
  process.exit(0);
}

await pushFile(fileArg, Boolean(options.unique));
