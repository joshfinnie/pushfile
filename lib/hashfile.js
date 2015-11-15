'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hash = hash;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hash(filename, salt, callback) {
    const hashids = new _hashids2.default(salt, 10);
    const filenameExtension = filename.split('.').pop();
    const fd = _fs2.default.createReadStream(filename);
    const hash = _crypto2.default.createHash('sha1');
    let shortFilename;
    hash.setEncoding('hex');
    fd.pipe(hash);
    fd.on('end', () => {
        hash.end();
        shortFilename = hashids.encode(parseInt(hash.read(), 16));
        callback(`${ shortFilename }.${ filenameExtension }`);
    });
};