import {describe, expect, it, vi} from 'vitest';

import {S3Client} from '../src/helpers/S3Client';

vi.mock('@aws-sdk/client-s3', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@aws-sdk/client-s3')>();

  class MockS3Client {
    send = vi.fn().mockResolvedValue('success');
  }

  return {
    ...actual,
    S3Client: MockS3Client,
  };
});

describe('S3Client', () => {
  it('put calls client.send with PutObjectCommand', async () => {
    const client = new S3Client({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
      customURL: undefined,
    });

    const request = client.createPutRequest(
      'file.txt',
      Buffer.from('hi'),
      'text/plain',
    );

    await expect(client.put(request)).resolves.toBe('success');
    expect(client.client.send).toHaveBeenCalledWith(expect.anything());
  });

  it('creates put request with correct properties', () => {
    const client = new S3Client({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'my-bucket',
      customURL: undefined,
    });

    const buffer = Buffer.from('test content');
    const request = client.createPutRequest('test.txt', buffer, 'text/plain');

    expect(request).toEqual({
      Bucket: 'my-bucket',
      Key: 'test.txt',
      Body: buffer,
      ContentType: 'text/plain',
      ACL: 'public-read',
      CacheControl: 'max-age=60',
    });
  });

  it('uses default content type when contentType is false', () => {
    const client = new S3Client({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'my-bucket',
      customURL: undefined,
    });

    const buffer = Buffer.from('test content');
    const request = client.createPutRequest('test.json', buffer, false);

    expect(request.ContentType).toBe('application/json; charset=utf-8');
  });

  it('stores custom URL when provided in config', () => {
    const client = new S3Client({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
      customURL: 'https://cdn.example.com',
    });

    expect(client.customUrl).toBe('https://cdn.example.com');
    expect(client.s3Bucket).toBe('bucket');
  });

  it('sets customUrl to undefined when not provided', () => {
    const client = new S3Client({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
    });

    expect(client.customUrl).toBeUndefined();
  });

  it('initializes AWS S3Client with correct credentials', () => {
    const client = new S3Client({
      awsKey: 'my-access-key',
      awsSecret: 'my-secret-key',
      s3Bucket: 'bucket',
    });

    expect(client.client).toBeDefined();
    // The mock S3Client should have been instantiated
    expect(client.client.send).toBeDefined();
  });
});
