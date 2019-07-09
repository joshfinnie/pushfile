import chalk from 'chalk';
import figlet from 'figlet';
import commander from 'commander';

import {version} from '../package.json';
import pushFile, {createConfig} from './helpers';

console.log(
  chalk.red(figlet.textSync('PushFile!', {horizontalLayout: 'full'})),
);

commander
  .version(version)
  .usage('[options] <file ...>')
  .option('-u, --unique', 'Gives a unique hash for uploaded file.')
  .option('-c, --configure', 'Create a configuration file.')
  .option('-v, --version', 'Prints Version');

commander.parse(process.argv);

const argsLength = commander.args.length;

if (commander.configure) {
  createConfig();
} else if (argsLength > 0) {
  pushFile(commander.args[0], commander.unique);
} else if (argsLength <= 0) {
  console.log('no filename...');
}
