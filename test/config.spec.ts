import {describe, expect, it} from 'vitest';
import {CONFIG_QUESTIONS} from '../src/config';

describe('CONFIG_QUESTIONS', () => {
  it('has the correct number of questions', () => {
    expect(CONFIG_QUESTIONS).toHaveLength(4);
  });

  it('has the expected question names and types', () => {
    const names = CONFIG_QUESTIONS.map((q) => q.name);
    expect(names).toEqual(['awsKey', 'awsSecret', 's3Bucket', 'customURL']);

    const types = CONFIG_QUESTIONS.map((q) => q.type);
    expect(types).toEqual(['input', 'input', 'input', 'input']);
  });

  it('has correct messages', () => {
    const messages = CONFIG_QUESTIONS.map((q) => q.message);
    expect(messages).toEqual([
      'Enter your AWS Client Key',
      'Enter your AWS Secret Key',
      'Enter your AWS S3 Bucket',
      'Enter your custom URL (optional)',
    ]);
  });

  it('validate functions behave correctly', () => {
    expect(CONFIG_QUESTIONS[0].validate('foo')).toBe(true);
    expect(CONFIG_QUESTIONS[0].validate('')).toBe(
      'Please enter your AWS Client Key',
    );
    expect(CONFIG_QUESTIONS[1].validate('foo')).toBe(true);
    expect(CONFIG_QUESTIONS[1].validate('')).toBe(
      'Please enter your AWS Secret Key',
    );
    expect(CONFIG_QUESTIONS[2].validate('foo')).toBe(true);
    expect(CONFIG_QUESTIONS[2].validate('')).toBe(
      'Please enter your AWS S3 Bucket',
    );
    expect(CONFIG_QUESTIONS[3].validate('anything')).toBe(true);
  });
});
