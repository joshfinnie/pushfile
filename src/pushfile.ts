import chalk from 'chalk';
import {Command} from 'commander';
import figlet from 'figlet';
import {version} from '../package.json';
import pushFile, {createConfig} from './helpers';

console.log(
  chalk.red(figlet.textSync('PushFile!', {horizontalLayout: 'full'})),
);

const program = new Command();

program
  .version(version)
  .usage('[options] <file ...>')
  .option('-u, --unique', 'Gives a unique hash for uploaded file.')
  .option('-c, --configure', 'Create a configuration file.');

program.parse(process.argv);

const options = program.opts();

const argsLength = program.args.length;

if (options.configure) {
  createConfig();
} else if (argsLength > 0) {
  pushFile(program.args[0], options.unique);
} else if (argsLength <= 0) {
  console.log('no filename...');
}
