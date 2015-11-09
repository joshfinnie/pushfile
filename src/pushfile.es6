import fs from 'fs';
import crypto from 'crypto';
import AWS from 'aws-sdk';
import Copy from 'copy-paste';
import Prompt from 'prompt';
import mime from 'mime';

let hashfile = require('./hashfile');

export function pushfile(filename, unique) {
    let s3Bucket;
    let config;
    try {
        config = require(`${ process.env.HOME }/.pushfile.json`);
        AWS.config.update({
            accessKeyId: config.awsKey,
            secretAccessKey: config.awsSecret
        });
        s3Bucket = new AWS.S3({ params: { Bucket: config.s3Bucket } });
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
        let contentType = mime.lookup(filename);
        fs.readFile(filename, (err, fileBuffer) => {
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
                        Copy.copy(url);
                        return;
                    } else {
                        const location = `${ config.url }/${ newFilename }`;
                        console.log('File is available at', location);
                        Copy.copy(location);
                        return;
                    }
                }
            });
        });
    });
};

export function createConfig() {
    Prompt.start();
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
    prompt.get(schema, (err, result) => {
        if (err)
            throw err;
        const configFile = {
            'awsKey': result.awsClientKey,
            'awsSecret': result.awsSecretKey,
            's3Bucket': result.awsBucketName
        };
        if (result.customURL) {
            configFile.url = result.customURL;
        }
        fs.writeFile(`${ process.env.HOME }/.pushfile.json`, JSON.stringify(configFile), err => {
            if (err)
                throw err;
            console.log('Configuration file was written.');
        });
    });
};
