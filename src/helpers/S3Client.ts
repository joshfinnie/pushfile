import {S3Client as AwsS3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {loadConfig} from './loadConfig.js';

export class S3Client {
  public client: AwsS3Client;
  public s3Bucket: string;
  public customUrl: string | undefined;

  constructor(config = loadConfig()) {
    this.client = new AwsS3Client({
      credentials: {
        accessKeyId: config.awsKey,
        secretAccessKey: config.awsSecret,
      },
      region: 'us-east-1',
    });

    this.s3Bucket = config.s3Bucket;
    this.customUrl = config.customURL;
  }

  async put(request: {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
  }) {
    return this.client.send(new PutObjectCommand(request));
  }

  createPutRequest(
    filename: string,
    contents: Buffer,
    contentType: string | false,
  ) {
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
  }
}
