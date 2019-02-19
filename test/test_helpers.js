import chai from 'chai';

import { hashFile } from '../src/helpers';

const { assert } = chai;

describe('test hashFile', () => {
  it('should return proper hash of filename', () => {
    hashFile('test/test_of_long_file_name.json', 'test_salt', (result) => {
      assert.equal('Qw75JEn5oLhN9Vxjyo4KukxzqxVK0wfjq8X.json', result);
    });
  });

  it('should return same file extension', () => {
    hashFile('test/test_of_long_file_name.json', 'test_salt', (result) => {
      assert.equal('json', result.split('.').pop());
    });
  });

  it('should return a filename of at least 10 charachers', () => {
    hashFile('test/test_of_long_file_name.json', 'test_salt', (result) => {
      assert.isTrue(result.substr(0, result.lastIndexOf('.')).length > 10);
    });
  });
});
