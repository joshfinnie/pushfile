import clipboardy from 'clipboardy';
import crypto from 'crypto';
import fs from 'fs/promises';
import mime from 'mime-types';
import {hashFile} from './helpers/hashFile.js';
import {S3Client} from './helpers/S3Client.js';
import {validateFile} from './helpers/validateFile.js';

// -----------------------------
// pushFile
// -----------------------------
export async function pushFile(
  fileName: string,
  unique: boolean,
): Promise<void> {
  // Validate file before processing
  await validateFile(fileName);

  const s3 = new S3Client();

  const salt = unique
    ? crypto.randomBytes(12).toString('hex')
    : 'wR2BXqWhHC9b4kbgl6qNei9d';

  const hashed = await hashFile(fileName, salt);
  const contentType = mime.lookup(fileName);
  const buffer = await fs.readFile(fileName);

  const request = s3.createPutRequest(hashed, buffer, contentType);

  await s3.put(request);

  const url = s3.customUrl
    ? `${s3.customUrl}/${hashed}`
    : `https://s3.amazonaws.com/${request.Bucket}/${request.Key}`;

  console.log('File is available at', url);
  clipboardy.writeSync(url);
}

export default pushFile;
