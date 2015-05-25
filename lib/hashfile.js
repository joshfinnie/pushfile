/*globals require, exports*/
var crypto = require('crypto');
var Hashids = require('hashids');
var fs = require('fs');

var hashfile = exports;

hashfile.hash = function (filename, salt, callback) {
  'use strict';
  var hashids = new Hashids(salt, 10);
  var filenameExtension = filename.split('.').pop();
  var fd = fs.createReadStream(filename);
  var hash = crypto.createHash('sha1');
  var shortFilename;

  hash.setEncoding('hex');

  fd.pipe(hash);

  fd.on('end', function() {
    hash.end();
    shortFilename = hashids.encode(parseInt(hash.read(), 16));
    callback(shortFilename + '.' + filenameExtension);
  });

};
