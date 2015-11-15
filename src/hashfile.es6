import crypto from 'crypto';
import Hashids from 'hashids';
import fs from 'fs';

export function hash (filename, salt, callback) {
    const hashids = new Hashids(salt, 10);
    const filenameExtension = filename.split('.').pop();
    const fd = fs.createReadStream(filename);
    const hash = crypto.createHash('sha1');
    let shortFilename;
    hash.setEncoding('hex');
    fd.pipe(hash);
    fd.on('end', () => {
        hash.end();
        shortFilename = hashids.encode(parseInt(hash.read(), 16));
        callback(`${ shortFilename }.${ filenameExtension }`);
    });
};
