var crypto = require('crypto');
var s3 = require('s3');
var copy = require('copy-paste').copy;
var hashfile = require('./hashfile');

var s3Credentials = require('../config/s3Creds.json');

var pushfile = exports;

pushfile.pf = function (filename) {
  hashfile.hash(filename, "wR2BCXqWhHC94kbgl6qNei99d", function(newFilename){

    var client = s3.createClient({
      key: s3Credentials.key,
      secret: s3Credentials.secret,
      bucket: s3Credentials.bucket
    });

    var uploader = client.upload(filename, newFilename, {});
    uploader.on('error', function(err){
        console.log('Unable to upload:', err.stack);
    })
    uploader.on('end', function(url){
        var location = 'http://'+s3Credentials.bucket+'/'+newFilename;
        console.log('File is available at', location);
        copy(location);
    })
  });
}