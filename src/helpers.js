/* eslint-disable import/prefer-default-export */
import AWS from 'aws-sdk';
import Hashids from 'hashids/cjs';
import clipboardy from 'clipboardy';
import crypto from 'crypto';
import fs from 'fs';
import inquirer from 'inquirer';
import mime from 'mime-types';

const config = require(`${process.env.HOME}/.pushfile.json`); // eslint-disable-line import/no-dynamic-require

const hashFile = (filename, salt) => {
  return new Promise((resolve, reject) => {
    let shortFilename;
    const fd = fs.createReadStream(filename);
    const hash = crypto.createHash('sha1').setEncoding('hex');

    fd.pipe(hash);
    fd.on('end', () => {
      hash.end();
      shortFilename = new Hashids(salt, 10).encodeHex(hash.read());
      resolve(`${shortFilename}.${filename.split('.').pop()}`);
    });
    fd.on('error', (err) => {
      reject(err);
    });
  });
};

const createS3Bucket = () => {
  let s3Bucket;
  if (config) {
    AWS.config.update({
      accessKeyId: config.awsKey,
      secretAccessKey: config.awsSecret,
    });
    s3Bucket = new AWS.S3({params: {Bucket: config.s3Bucket}});
  } else {
    console.log(
      'Looks like your PushFile config file is missing.\nPlease run `pushfile --configuration` to set up.\n',
    );
    process.exit(1);
  }
  return s3Bucket;
};

const createConfig = () => {
  const questions = [
    {
      name: 'awsClientKey',
      type: 'input',
      message: 'Enter your AWS Client Key',
      validate: (value) =>
        value.length ? true : 'Please enter your AWS Client Key',
    },
    {
      name: 'awsSecretKey',
      type: 'input',
      message: 'Enter your AWS Secret Key',
      validate: (value) =>
        value.length ? true : 'Please enter your AWS Secret Key',
    },
    {
      name: 'awsS3Bucket',
      type: 'input',
      message: 'Enter your AWS S3 Bucket',
      validate: (value) =>
        value.length ? true : 'Please enter your AWS S3 Bucket',
    },
    {
      name: 'customURL',
      type: 'input',
      message: 'Enter your custom URL (not required)',
      validate: () => true,
    },
  ];

  inquirer
    .prompt(questions)
    .then((keys) => {
      const configFile = {
        awsKey: keys.awsClientKey,
        awsSecret: keys.awsSecretKey,
        s3Bucket: keys.awsS3Bucket,
      };
      if (keys.customURL) {
        configFile.customURL = keys.customURL;
      }
      fs.writeFile(
        `${process.env.HOME}/.pushfile.json`,
        JSON.stringify(configFile),
        (err) => {
          if (err) throw err;
          console.log('Configuration file was written.');
        },
      );
    })
    .catch((err) => console.log(err));
};

const pushFile = (fileName, unique) => {
  const bucket = createS3Bucket();
  const salt = unique
    ? crypto.randomBytes(12).toString('hex')
    : 'wR2BXqWhHC9b4kbgl6qNei9d';
  hashFile(fileName, salt).then((newFileName) => {
    const contentType = mime.lookup(fileName);
    fs.readFile(fileName, (err, fileBuffer) => {
      const params = {
        Key: newFileName,
        ACL: 'public-read',
        Body: fileBuffer,
        ContentType: contentType,
      };
      bucket.upload(params, (uploadErr, uploadData) => {
        if (uploadErr) {
          console.log('Unable to upload:', err.stack);
        } else if (typeof config.url === 'undefined') {
          console.log('File is available at', uploadData.Location);
          clipboardy.writeSync(uploadData.Location);
        } else {
          const location = `${config.url}/${newFileName}`;
          console.log('File is available at', location);
          clipboardy.writeSync(location);
        }
      });
    });
  });
};

export {createConfig, createS3Bucket, hashFile, pushFile as default};
