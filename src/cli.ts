#!/usr/bin/env node

import chalk from 'chalk';
import {Command} from 'commander';
import createDebug from 'debug';
import figlet from 'figlet';
import packageData from '../package.json' with {type: 'json'};
import {createConfig} from './helpers/createConfig.js';
import pushFile from './pushfile.js';

const debug = createDebug('pushfile:cli');

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
  .option('-v, --verbose', 'Enable verbose debug logging.')
  .argument('[file]', 'File to upload')
  .parse(process.argv);

const options = program.opts();
const fileArg = program.args[0];

// Enable debug logging if verbose flag is set
if (options.verbose) {
  createDebug.enable('pushfile:*');
  debug('Verbose mode enabled');
}

debug('CLI started with options: %O', options);
debug('File argument: %s', fileArg || 'none');

// ----------------------------
// Command handling
// ----------------------------

if (options.configure) {
  debug('Running configuration wizard');
  await createConfig();
  debug('Configuration complete');
  process.exit(0);
}

if (!fileArg) {
  debug('No file argument provided, showing help');
  program.help();
  process.exit(0);
}

debug('Starting file upload process');
try {
  await pushFile(fileArg, Boolean(options.unique));
  debug('File upload completed successfully');
} catch (error) {
  debug('File upload failed: %O', error);
  throw error;
}
