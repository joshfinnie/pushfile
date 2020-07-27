import chalk from 'chalk';
import figlet from 'figlet';
import {program} from 'commander';

import {version} from '../package.json';
import pushFile, {createConfig} from './helpers';

console.log(
  chalk.red(figlet.textSync('PushFile!', {horizontalLayout: 'full'})),
);

program
  .version(version)
  .usage('[options] <file ...>')
  .option('-u, --unique', 'Gives a unique hash for uploaded file.')
  .option('-c, --configure', 'Create a configuration file.');

program.parse(process.argv);

const argsLength = program.args.length;

if (program.configure) {
  createConfig();
} else if (argsLength > 0) {
  pushFile(program.args[0], program.unique);
} else if (argsLength <= 0) {
  console.log('no filename...');
}
