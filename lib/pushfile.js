'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pushfile = pushfile;
exports.createConfig = createConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _copyPaste = require('copy-paste');

var _copyPaste2 = _interopRequireDefault(_copyPaste);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let hashfile = require('./hashfile');

function pushfile(filename, unique) {
    let s3Bucket;
    let config;
    try {
        config = require(`${ process.env.HOME }/.pushfile.json`);
        _awsSdk2.default.config.update({
            accessKeyId: config.awsKey,
            secretAccessKey: config.awsSecret
        });
        s3Bucket = new _awsSdk2.default.S3({ params: { Bucket: config.s3Bucket } });
    } catch (e) {
        console.log(e);
        console.log('Looks like your PushFile config file is missing.\nPlease run `pushfile --configuration` to set up.\n');
        process.exit(1);
    }
    let salt;
    if (unique === true) {
        const buf = require('crypto').randomBytes(12);
        salt = buf.toString('hex');
    } else {
        salt = 'wR2BXqWhHC9b4kbgl6qNei9d';
    }
    hashfile.hash(filename, salt, newFilename => {
        let contentType = _mime2.default.lookup(filename);
        _fs2.default.readFile(filename, (err, fileBuffer) => {
            const params = {
                Key: newFilename,
                ACL: 'public-read',
                Body: fileBuffer,
                ContentType: contentType
            };
            s3Bucket.upload(params, (err, success) => {
                if (err) {
                    console.log('Unable to upload:', err.stack);
                } else {
                    if (typeof config.url === 'undefined') {
                        console.log('File is available at', url);
                        _copyPaste2.default.copy(url);
                        return;
                    } else {
                        const location = `${ config.url }/${ newFilename }`;
                        console.log('File is available at', location);
                        _copyPaste2.default.copy(location);
                        return;
                    }
                }
            });
        });
    });
};

function createConfig() {
    _prompt2.default.start();
    const schema = {
        properties: {
            awsClientKey: {
                description: 'Enter your AWS Client Key',
                required: true
            },
            awsSecretKey: {
                description: 'Enter your AWS Secret Key',
                required: true
            },
            awsBucketName: {
                description: 'Enter the name of your AWS Bucket',
                required: true
            },
            customURL: { description: 'Enter your custom URL (not required)' }
        }
    };
    _prompt2.default.get(schema, (err, result) => {
        if (err) throw err;
        const configFile = {
            'awsKey': result.awsClientKey,
            'awsSecret': result.awsSecretKey,
            's3Bucket': result.awsBucketName
        };
        if (result.customURL) {
            configFile.url = result.customURL;
        }
        _fs2.default.writeFile(`${ process.env.HOME }/.pushfile.json`, JSON.stringify(configFile), err => {
            if (err) throw err;
            console.log('Configuration file was written.');
        });
    });
};