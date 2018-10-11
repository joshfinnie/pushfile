"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _figlet = _interopRequireDefault(require("figlet"));

var _commander = _interopRequireDefault(require("commander"));

var _package = require("../package.json");

var _helpers = _interopRequireWildcard(require("./helpers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_chalk.default.red(_figlet.default.textSync('PushFile!', {
  horizontalLayout: 'full'
})));

_commander.default.version(_package.version).usage('[options] <file ...>').option('-u, --unique', 'Gives a unique hash for uploaded file.').option('-c, --configure', 'Create a configuration file.').option('-v, --version', 'Prints Version');

_commander.default.parse(process.argv);

var argsLength = _commander.default.args.length;

if (_commander.default.configure) {
  (0, _helpers.createConfig)();
} else if (argsLength > 0) {
  (0, _helpers.default)(_commander.default.args[0], _commander.default.unique);
} else if (argsLength <= 0) {
  console.log('no filename...');
}