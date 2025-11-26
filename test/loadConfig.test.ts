import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {loadConfig} from '../src/helpers/loadConfig.js';
import type {IConfig} from '../src/types/helpers.js';

const OLD_ENV = process.env;

describe('loadConfig', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = {...OLD_ENV};
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('throws if required env vars are missing', () => {
    delete process.env.PUSHFILE_AWS_KEY;
    delete process.env.PUSHFILE_AWS_SECRET;
    delete process.env.PUSHFILE_S3_BUCKET;

    expect((): IConfig => loadConfig()).toThrow(/Configuration incomplete/);
  });

  it('loads config from env vars', () => {
    process.env.PUSHFILE_AWS_KEY = 'key';
    process.env.PUSHFILE_AWS_SECRET = 'secret';
    process.env.PUSHFILE_S3_BUCKET = 'my-bucket';
    process.env.PUSHFILE_CUSTOM_URL = 'https://example.com';

    const config: IConfig = loadConfig();

    expect(config.awsKey).toBe('key');
    expect(config.awsSecret).toBe('secret');
    expect(config.s3Bucket).toBe('my-bucket');
    expect(config.customURL).toBe('https://example.com');
  });

  it('throws if S3 bucket name is invalid', () => {
    process.env.PUSHFILE_AWS_KEY = 'key';
    process.env.PUSHFILE_AWS_SECRET = 'secret';
    process.env.PUSHFILE_S3_BUCKET = 'Invalid_Bucket';

    expect((): IConfig => loadConfig()).toThrow(/Invalid S3 bucket name/);
  });

  it('omits customURL if not provided', () => {
    process.env.PUSHFILE_AWS_KEY = 'key';
    process.env.PUSHFILE_AWS_SECRET = 'secret';
    process.env.PUSHFILE_S3_BUCKET = 'my-bucket';

    const config: IConfig = loadConfig();

    expect(config.customURL).toBeUndefined();
  });

  describe('bucket name validation', () => {
    beforeEach(() => {
      process.env.PUSHFILE_AWS_KEY = 'key';
      process.env.PUSHFILE_AWS_SECRET = 'secret';
    });

    it('rejects bucket names that are too short', () => {
      process.env.PUSHFILE_S3_BUCKET = 'ab';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names that are too long', () => {
      process.env.PUSHFILE_S3_BUCKET = 'a'.repeat(64);

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names with uppercase letters', () => {
      process.env.PUSHFILE_S3_BUCKET = 'MyBucket';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names starting with hyphen', () => {
      process.env.PUSHFILE_S3_BUCKET = '-mybucket';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names starting with dot', () => {
      process.env.PUSHFILE_S3_BUCKET = '.mybucket';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names ending with hyphen', () => {
      process.env.PUSHFILE_S3_BUCKET = 'mybucket-';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names ending with dot', () => {
      process.env.PUSHFILE_S3_BUCKET = 'mybucket.';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('rejects bucket names with invalid characters', () => {
      process.env.PUSHFILE_S3_BUCKET = 'my_bucket';

      expect(() => loadConfig()).toThrow(/Invalid S3 bucket name/);
    });

    it('accepts valid bucket names with hyphens', () => {
      process.env.PUSHFILE_S3_BUCKET = 'my-valid-bucket';

      const config = loadConfig();
      expect(config.s3Bucket).toBe('my-valid-bucket');
    });

    it('accepts valid bucket names with dots', () => {
      process.env.PUSHFILE_S3_BUCKET = 'my.valid.bucket';

      const config = loadConfig();
      expect(config.s3Bucket).toBe('my.valid.bucket');
    });

    it('accepts valid bucket names with numbers', () => {
      process.env.PUSHFILE_S3_BUCKET = 'mybucket123';

      const config = loadConfig();
      expect(config.s3Bucket).toBe('mybucket123');
    });

    it('accepts minimum length bucket names', () => {
      process.env.PUSHFILE_S3_BUCKET = 'abc';

      const config = loadConfig();
      expect(config.s3Bucket).toBe('abc');
    });

    it('accepts maximum length bucket names', () => {
      process.env.PUSHFILE_S3_BUCKET = 'a'.repeat(63);

      const config = loadConfig();
      expect(config.s3Bucket).toBe('a'.repeat(63));
    });
  });
});
