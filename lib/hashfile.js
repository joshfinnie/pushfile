var crypto = require('crypto');
var Hashids = require('hashids');

var hashfile = exports;

hashfile.hash = function (filename) {

    var hashids = new Hashids("wR2BCXqWhHC94kbgl6qNei99d", 10);

    var shasum = crypto.createHash('sha1');

    var filenameExtension = filename.split('.').pop();

    shasum.update(filename);

    var shortFilename = hashids.encrypt(parseInt(shasum.digest('hex'), 16));

    return shortFilename + '.' + filenameExtension;

}