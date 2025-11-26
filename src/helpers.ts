import {S3} from 'aws-sdk';
import clipboardy from 'clipboardy';
import crypto from 'crypto';
import fs from 'fs';
import Hashids from 'hashids';
import inquirer from 'inquirer';
import mime from 'mime-types';

interface IConfig {
  awsKey: string;
  awsSecret: string;
  s3Bucket: string;
  customURL?: string;
}

const createConfig = (): void => {
  const questions = [
    {
      name: 'awsClientKey',
      type: 'input',
      message: 'Enter your AWS Client Key',
      validate: (value: string) =>
        value.length ? true : 'Please enter your AWS Client Key',
    },
    {
      name: 'awsSecretKey',
      type: 'input',
      message: 'Enter your AWS Secret Key',
      validate: (value: string) =>
        value.length ? true : 'Please enter your AWS Secret Key',
    },
    {
      name: 'awsS3Bucket',
      type: 'input',
      message: 'Enter your AWS S3 Bucket',
      validate: (value: string) =>
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
      const configFile: IConfig = {
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

class S3Client {
  client: S3;

  s3Bucket: string;

  customUrl: string | null;

  constructor() {
    const configData = fs.readFileSync(
      `${process.env.HOME}/.pushfile.json`,
      'utf8',
    );
    const config = JSON.parse(configData);

    this.client = new S3({
      accessKeyId: config.awsKey,
      secretAccessKey: config.awsSecret,
    });

    this.customUrl = config.customURL;
    this.s3Bucket = config.s3Bucket;
  }

  put = (
    request: S3.Types.PutObjectRequest,
  ): Promise<S3.Types.PutObjectOutput> => {
    return new Promise((resolve, reject) => {
      this.client.putObject(request, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  };

  createPutRequest = (
    filename: string,
    contents: Buffer,
    contentType: string | boolean,
  ): S3.Types.PutObjectRequest => {
    return {
      Bucket: this.s3Bucket,
      Key: filename,
      Body: contents,
      ContentType: contentType
        ? contentType.toString()
        : 'application/json; charset=utf-8',
      ACL: 'public-read',
      CacheControl: 'max-age=60',
    };
  };
}

const hashFile = (filename: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fd = fs.createReadStream(filename);
    const hash = crypto.createHash('sha1').setEncoding('hex');

    fd.pipe(hash);
    fd.on('end', () => {
      hash.end();
      const shortFilename = new Hashids(salt, 10).encodeHex(hash.read());
      resolve(`${shortFilename}.${filename.split('.').pop()}`);
    });
    fd.on('error', (err) => {
      reject(err);
    });
  });
};

const pushFile = (fileName: string, unique: boolean): void => {
  const s3Client = new S3Client();
  const salt = unique
    ? crypto.randomBytes(12).toString('hex')
    : 'wR2BXqWhHC9b4kbgl6qNei9d';
  hashFile(fileName, salt).then((newFileName) => {
    const contentType: string | boolean = mime.lookup(fileName);
    fs.readFile(fileName, (err, fileBuffer) => {
      if (err) {
        console.log('Unadeble to read file:', err.stack);
        return;
      }

      const request = s3Client.createPutRequest(
        newFileName,
        fileBuffer,
        contentType,
      );

      s3Client.put(request).then(() => {
        if (s3Client.customUrl) {
          const location = `${s3Client.customUrl}/${request.Key}`;
          console.log('File is available at', location);
          clipboardy.writeSync(location);
        } else {
          const location = `https://s3.amazonaws.com/${request.Bucket}/${request.Key}`;
          console.log('File is available at', location);
          clipboardy.writeSync(location);
        }
      });
    });
  });
};

export {createConfig, hashFile, pushFile as default};
