import * as fs from 'fs/promises';
import inquirer from 'inquirer';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {createConfig} from '../src/helpers/createConfig.js';

vi.mock('inquirer');
vi.mock('fs/promises');
vi.mock('../src/config.js', () => ({
  CONFIG_QUESTIONS: [],
}));

describe('createConfig', () => {
  beforeEach(() => {
    vi.mocked(fs.writeFile).mockClear();
    vi.mocked(inquirer.prompt).mockClear();
  });

  it('writes config files based on user input', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      awsKey: 'key',
      awsSecret: 'secret',
      s3Bucket: 'bucket',
      customURL: 'url',
    });

    await createConfig();

    // Expect writeFile called for both project and home config
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('.pushfilerc.json'),
      expect.any(String),
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('.pushfile.json'),
      expect.any(String),
    );
  });
});
