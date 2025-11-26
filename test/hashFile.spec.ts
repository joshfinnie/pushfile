import {describe, expect, it} from 'vitest';
import {hashFile} from '../src/helpers/hashFile';

describe('hashFile', () => {
  const filename = 'test/test_of_long_file_name.json';
  const salt = 'test_salt';

  it('returns the expected hashed filename', async () => {
    const result = await hashFile(filename, salt);
    expect(result).toBe('p8o1Dbg5WNCGpqz1lj7vHmvWb63X09CxGXe.json');
  });

  it('preserves the original file extension', async () => {
    const result = await hashFile(filename, salt);
    expect(result.split('.').pop()).toBe('json');
  });

  it('produces a filename (before extension) at least 10 characters long', async () => {
    const result = await hashFile(filename, salt);
    const base = result.slice(0, result.lastIndexOf('.'));
    expect(base.length).toBeGreaterThan(10);
  });
});
