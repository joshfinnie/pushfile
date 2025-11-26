import {S3Client as AwsS3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import createDebug from 'debug';
import {loadConfig} from './loadConfig.js';

const debug = createDebug('pushfile:s3');

export class S3Client {
  public client: AwsS3Client;
  public s3Bucket: string;
  public customUrl: string | undefined;

  constructor(config = loadConfig()) {
    debug('Initializing S3 client...');
    this.client = new AwsS3Client({
      credentials: {
        accessKeyId: config.awsKey,
        secretAccessKey: config.awsSecret,
      },
      region: 'us-east-1',
    });
    debug('S3 client initialized for region: us-east-1');

    this.s3Bucket = config.s3Bucket;
    this.customUrl = config.customURL;
    debug(
      'Bucket: %s, Custom URL: %s',
      this.s3Bucket,
      this.customUrl || 'none',
    );
  }

  async put(request: {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
  }) {
    debug(
      'Sending PutObject request: bucket=%s, key=%s, size=%d bytes',
      request.Bucket,
      request.Key,
      request.Body.length,
    );
    try {
      const result = await this.client.send(new PutObjectCommand(request));
      debug('Upload successful: ETag=%s', result.ETag);
      return result;
    } catch (error) {
      debug('Upload failed: %O', error);
      throw error;
    }
  }

  createPutRequest(
    filename: string,
    contents: Buffer,
    contentType: string | false,
  ) {
    const ct = contentType
      ? contentType.toString()
      : 'application/json; charset=utf-8';
    debug(
      'Creating S3 put request: filename=%s, contentType=%s, ACL=public-read',
      filename,
      ct,
    );

    return {
      Bucket: this.s3Bucket,
      Key: filename,
      Body: contents,
      ContentType: ct,
      ACL: 'public-read',
      CacheControl: 'max-age=60',
    };
  }
}
