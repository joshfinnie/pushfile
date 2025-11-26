import {beforeEach, describe, expect, it, vi} from 'vitest';

// ----- MOCKS ----- //
vi.mock('../src/helpers/S3Client', () => {
  return {
    S3Client: vi.fn(function () {
      this.createPutRequest = vi.fn((filename, buffer, contentType) => ({
        Bucket: 'bucket',
        Key: filename,
        Body: buffer,
        ContentType: contentType || 'application/json; charset=utf-8',
        ACL: 'public-read',
        CacheControl: 'max-age=60',
      }));
      this.put = vi.fn().mockResolvedValue('success');
      this.customUrl = undefined;
      this.s3Bucket = 'bucket';
    }),
  };
});

// Mock validateFile and hashFile BEFORE importing pushFile
vi.mock('../src/helpers/validateFile.js', () => ({
  validateFile: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../src/helpers/hashFile.js', () => ({
  hashFile: vi.fn().mockResolvedValue('hashedfile'),
}));

vi.mock('node:fs/promises', () => ({
  default: {
    access: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn(() => Buffer.from('file contents')),
  },
}));

vi.mock('mime-types', () => ({
  default: {
    lookup: vi.fn(() => 'application/json'),
  },
}));

vi.mock('clipboardy', () => ({
  default: {
    writeSync: vi.fn(),
  },
}));

import fs from 'node:fs/promises';
// ----- IMPORT AFTER MOCKS ----- //
import clipboardy from 'clipboardy';
import {hashFile} from '../src/helpers/hashFile';
import {S3Client} from '../src/helpers/S3Client';
import {validateFile} from '../src/helpers/validateFile';
import pushFile from '../src/pushfile.js';

// ----- TESTS ----- //
describe('pushFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls validateFile, hashFile, reads file, and uploads', async () => {
    await pushFile('file.txt', true);

    expect(validateFile).toHaveBeenCalledWith('file.txt');
    expect(hashFile).toHaveBeenCalled();
    expect(fs.readFile).toHaveBeenCalledWith('file.txt');
    expect(S3Client).toHaveBeenCalled();

    const s3Instance = vi.mocked(S3Client).mock.results[0].value;
    expect(s3Instance.createPutRequest).toHaveBeenCalled();
    expect(s3Instance.put).toHaveBeenCalled();

    expect(clipboardy.writeSync).toHaveBeenCalledWith(
      expect.stringContaining('hashedfile'),
    );
  });

  it('uses default salt if unique=false', async () => {
    await pushFile('file.txt', false);

    expect(hashFile).toHaveBeenCalledWith(
      'file.txt',
      'wR2BXqWhHC9b4kbgl6qNei9d',
    );
  });

  it('uses custom salt if unique=true', async () => {
    await pushFile('file.txt', true);

    const calledSalt = hashFile.mock.calls[0][1];
    expect(calledSalt).toMatch(/^[a-f0-9]{24}$/);
  });

  it('uses custom URL when configured', async () => {
    // Clear previous mock
    vi.mocked(S3Client).mockClear();

    // Create a new mock with customUrl set
    vi.mocked(S3Client).mockImplementation(function () {
      this.createPutRequest = vi.fn((filename, buffer, contentType) => ({
        Bucket: 'bucket',
        Key: filename,
        Body: buffer,
        ContentType: contentType || 'application/json; charset=utf-8',
        ACL: 'public-read',
        CacheControl: 'max-age=60',
      }));
      this.put = vi.fn().mockResolvedValue('success');
      this.customUrl = 'https://cdn.example.com';
      this.s3Bucket = 'bucket';
    } as any);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await pushFile('file.txt', false);

    expect(consoleSpy).toHaveBeenCalledWith(
      'File is available at',
      'https://cdn.example.com/hashedfile',
    );
    expect(clipboardy.writeSync).toHaveBeenCalledWith(
      'https://cdn.example.com/hashedfile',
    );

    consoleSpy.mockRestore();
  });

  it('uses S3 URL when no custom URL configured', async () => {
    // Reset the S3Client mock to ensure customUrl is undefined
    vi.mocked(S3Client).mockClear();
    vi.mocked(S3Client).mockImplementation(function () {
      this.createPutRequest = vi.fn((filename, buffer, contentType) => ({
        Bucket: 'bucket',
        Key: filename,
        Body: buffer,
        ContentType: contentType || 'application/json; charset=utf-8',
        ACL: 'public-read',
        CacheControl: 'max-age=60',
      }));
      this.put = vi.fn().mockResolvedValue('success');
      this.customUrl = undefined;
      this.s3Bucket = 'bucket';
    } as any);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await pushFile('file.txt', false);

    expect(consoleSpy).toHaveBeenCalledWith(
      'File is available at',
      'https://s3.amazonaws.com/bucket/hashedfile',
    );
    expect(clipboardy.writeSync).toHaveBeenCalledWith(
      'https://s3.amazonaws.com/bucket/hashedfile',
    );

    consoleSpy.mockRestore();
  });

  it('handles S3 upload failures', async () => {
    // Clear and recreate mock to throw error
    vi.mocked(S3Client).mockClear();
    vi.mocked(S3Client).mockImplementation(function () {
      this.createPutRequest = vi.fn((filename, buffer, contentType) => ({
        Bucket: 'bucket',
        Key: filename,
        Body: buffer,
        ContentType: contentType || 'application/json; charset=utf-8',
        ACL: 'public-read',
        CacheControl: 'max-age=60',
      }));
      this.put = vi.fn().mockRejectedValue(new Error('S3 upload failed'));
      this.customUrl = undefined;
      this.s3Bucket = 'bucket';
    } as any);

    await expect(pushFile('file.txt', false)).rejects.toThrow(
      'S3 upload failed',
    );
  });

  it('handles validateFile failures', async () => {
    vi.mocked(validateFile).mockRejectedValueOnce(new Error('File not found'));

    await expect(pushFile('nonexistent.txt', false)).rejects.toThrow(
      'File not found',
    );

    // Should not proceed to upload
    expect(hashFile).not.toHaveBeenCalled();
  });
});
