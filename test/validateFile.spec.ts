import type {Stats} from 'node:fs';
import fs from 'node:fs/promises';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {validateFile} from '../src/helpers/validateFile';

vi.mock('node:fs/promises');

describe('validateFile', () => {
  const mockAccess = vi.mocked(fs.access);
  const mockStat = vi.mocked(fs.stat);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws if no fileName is provided', async () => {
    await expect(validateFile('')).rejects.toThrow(
      'File path is required. Usage: pushfile <file>',
    );
  });

  it('throws if file does not exist', async () => {
    mockAccess.mockRejectedValueOnce(new Error('not found'));

    await expect(validateFile('test.txt')).rejects.toThrow(
      'File not found: test.txt\nPlease check that the file path is correct and the file exists.',
    );
  });

  it('throws if file is not readable', async () => {
    // First call (F_OK) succeeds
    mockAccess.mockResolvedValueOnce(undefined);
    // Second call (R_OK) fails
    mockAccess.mockRejectedValueOnce(new Error('not readable'));

    await expect(validateFile('test.txt')).rejects.toThrow(
      'File is not readable: test.txt\nPlease check file permissions and try again.',
    );
  });

  it('throws if file is a directory', async () => {
    mockAccess.mockResolvedValue(undefined);

    const fakeStats: Partial<Stats> = {
      isDirectory: () => true,
      size: 1024 * 1024, // 1MB
    };

    mockStat.mockResolvedValue(fakeStats as Stats);

    await expect(validateFile('test.txt')).rejects.toThrow(
      'test.txt is a directory, not a file.\nPlease specify a file to upload.',
    );
  });

  it('throws if file is too large', async () => {
    mockAccess.mockResolvedValue(undefined);

    const fakeStats: Partial<Stats> = {
      isDirectory: () => false,
      size: 6 * 1024 * 1024 * 1024, // 6GB
    };

    mockStat.mockResolvedValue(fakeStats as Stats);

    await expect(validateFile('largefile.txt')).rejects.toThrow(
      'File is too large: 6.00GB\nMaximum file size is 5GB.',
    );
  });

  it('resolves if file is valid', async () => {
    mockAccess.mockResolvedValue(undefined);

    const fakeStats: Partial<Stats> = {
      isDirectory: () => false,
      size: 1024 * 1024, // 1MB
    };

    mockStat.mockResolvedValue(fakeStats as Stats);

    await expect(validateFile('validfile.txt')).resolves.toBeUndefined();
  });
});
