import {cosmiconfigSync} from 'cosmiconfig';

import type {IConfig} from '../types/helpers.js';

const explorer = cosmiconfigSync('pushfile');

export function loadConfig(): IConfig {
  const result = explorer.search(process.cwd());
  const configFromFile =
    result && !result.isEmpty ? (result.config as IConfig) : null;

  // Read env vars and merge with file config
  const awsKey = process.env.PUSHFILE_AWS_KEY ?? configFromFile?.awsKey ?? '';
  const awsSecret =
    process.env.PUSHFILE_AWS_SECRET ?? configFromFile?.awsSecret ?? '';
  const s3Bucket =
    process.env.PUSHFILE_S3_BUCKET ?? configFromFile?.s3Bucket ?? '';
  const customURL =
    process.env.PUSHFILE_CUSTOM_URL ?? configFromFile?.customURL;

  // Build config object conditionally to satisfy exactOptionalPropertyTypes
  const finalConfig: IConfig = {
    awsKey,
    awsSecret,
    s3Bucket,
    ...(customURL ? {customURL} : {}),
  };

  // Validate required fields
  if (!finalConfig.awsKey || !finalConfig.awsSecret || !finalConfig.s3Bucket) {
    throw new Error(
      'Configuration incomplete. Run `pushfile --configure` or set environment variables:\n' +
        '  PUSHFILE_AWS_KEY\n' +
        '  PUSHFILE_AWS_SECRET\n' +
        '  PUSHFILE_S3_BUCKET',
    );
  }

  // Validate S3 bucket name format
  const bucketRegex = /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/;
  if (
    !bucketRegex.test(finalConfig.s3Bucket) ||
    finalConfig.s3Bucket.length < 3 ||
    finalConfig.s3Bucket.length > 63
  ) {
    throw new Error(
      `Invalid S3 bucket name: ${finalConfig.s3Bucket}\n` +
        'Bucket names must be 3-63 characters, start/end with lowercase letter or number,\n' +
        'and contain only lowercase letters, numbers, dots, and hyphens.',
    );
  }

  return finalConfig;
}
