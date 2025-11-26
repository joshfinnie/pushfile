import clipboardy from 'clipboardy';
import crypto from 'crypto';
import createDebug from 'debug';
import fs from 'fs/promises';
import mime from 'mime-types';
import {hashFile} from './helpers/hashFile.js';
import {S3Client} from './helpers/S3Client.js';
import {validateFile} from './helpers/validateFile.js';

const debug = createDebug('pushfile:main');

// -----------------------------
// pushFile
// -----------------------------
export async function pushFile(
  fileName: string,
  unique: boolean,
): Promise<void> {
  debug('Starting file upload: %s (unique: %s)', fileName, unique);

  // Validate file before processing
  debug('Validating file...');
  await validateFile(fileName);
  debug('File validation passed');

  const s3 = new S3Client();
  debug('S3 client initialized');

  const salt = unique
    ? crypto.randomBytes(12).toString('hex')
    : 'wR2BXqWhHC9b4kbgl6qNei9d';
  debug('Generated salt: %s', unique ? '[random]' : '[static]');

  debug('Hashing file...');
  const hashed = await hashFile(fileName, salt);
  debug('Hashed filename: %s', hashed);

  const contentType = mime.lookup(fileName);
  debug('Content type: %s', contentType || 'unknown');

  debug('Reading file buffer...');
  const buffer = await fs.readFile(fileName);
  debug('File size: %d bytes', buffer.length);

  const request = s3.createPutRequest(hashed, buffer, contentType);
  debug('S3 request created for bucket: %s', request.Bucket);

  debug('Uploading to S3...');
  await s3.put(request);
  debug('Upload successful');

  const url = s3.customUrl
    ? `${s3.customUrl}/${hashed}`
    : `https://s3.amazonaws.com/${request.Bucket}/${request.Key}`;
  debug('Generated URL: %s', url);

  console.log('File is available at', url);
  clipboardy.writeSync(url);
  debug('URL copied to clipboard');
}

export default pushFile;
