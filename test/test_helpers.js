import chai from 'chai';

import {hashFile} from '../src/helpers';

const {assert} = chai;

describe('test hashFile', () => {
  it('should return proper hash of filename', async () => {
    const result = await hashFile(
      'test/test_of_long_file_name.json',
      'test_salt',
    );
    assert.equal('Qw75JEn5oLhN9Vxjyo4KukxzqxVK0wfjq8X.json', result);
  });

  it('should return same file extension', async () => {
    const result = await hashFile(
      'test/test_of_long_file_name.json',
      'test_salt',
    );
    assert.equal('json', result.split('.').pop());
  });

  it('should return a filename of at least 10 charachers', async () => {
    const result = await hashFile(
      'test/test_of_long_file_name.json',
      'test_salt',
    );
    assert.isTrue(result.substr(0, result.lastIndexOf('.')).length > 10);
  });
});
