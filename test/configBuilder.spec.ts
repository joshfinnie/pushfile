import { describe, expect, it } from 'vitest';

import { buildConfigFromAnswers } from '../src/helpers/createConfig.js';

describe('buildConfigFromAnswers', () => {
  it('creates config with all fields', () => {
    const config = buildConfigFromAnswers({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
      customURL: 'https://example.com',
    });

    expect(config).toEqual({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
      customURL: 'https://example.com',
    });
  });

  it('omits customURL if not provided', () => {
    const config = buildConfigFromAnswers({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
    });

    expect(config).toEqual({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
    });
  });

  it('throws if required fields missing', () => {
    expect(() =>
      buildConfigFromAnswers({
        awsKey: 'key',
        awsSecret: '',
        s3Bucket: 'bucket',
      }),
    ).toThrow('Missing required fields');
  });
});
