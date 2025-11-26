import crypto from 'crypto';
import {createReadStream} from 'fs';
import Hashids from 'hashids';
import path from 'path';

export async function hashFile(
  filename: string,
  salt: string,
): Promise<string> {
  const stream = createReadStream(filename);
  const hash = crypto.createHash('sha1');

  for await (const chunk of stream) {
    hash.update(chunk);
  }

  const hex = hash.digest('hex');
  const short = new Hashids(salt, 10).encodeHex(hex);
  const ext = path.extname(filename).slice(1);

  return `${short}.${ext}`;
}
