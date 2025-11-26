import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock modules before importing cli
vi.mock('../src/helpers/createConfig.js', () => ({
  createConfig: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../src/pushfile.js', () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('chalk', () => ({
  default: {
    red: (text: string) => text,
  },
}));

vi.mock('figlet', () => ({
  default: {
    textSync: vi.fn(() => 'PushFile!'),
  },
}));

describe('CLI', () => {
  let exitSpy: any;
  let consoleLogSpy: any;
  let processArgv: string[];

  beforeEach(() => {
    // Save original process.argv
    processArgv = process.argv;

    // Mock process.exit
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((code?: any) => {
      throw new Error(`process.exit: ${code}`);
    });

    // Mock console.log
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore process.argv
    process.argv = processArgv;

    // Restore mocks
    exitSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('shows banner on startup', async () => {
    process.argv = ['node', 'cli.js', '--help'];

    try {
      await import('../src/cli.js');
    } catch (e) {
      // Ignore exit errors
    }

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('PushFile!'));
  });

  it('calls createConfig when --configure flag is used', async () => {
    const { createConfig } = await import('../src/helpers/createConfig.js');

    process.argv = ['node', 'cli.js', '--configure'];

    try {
      // Force re-import by clearing cache
      vi.resetModules();
      await import('../src/cli.js');
    } catch (e) {
      // process.exit was called, which is expected
    }

    expect(createConfig).toHaveBeenCalled();
  });

  it('exits with code 1 when no file is provided', async () => {
    process.argv = ['node', 'cli.js'];

    try {
      vi.resetModules();
      await import('../src/cli.js');
    } catch (e: any) {
      expect(e.message).toContain('process.exit: 1');
    }

    expect(consoleLogSpy).toHaveBeenCalledWith('No filename provided…');
  });

  it('calls pushFile with correct arguments when file is provided', async () => {
    const pushFile = (await import('../src/pushfile.js')).default;

    process.argv = ['node', 'cli.js', 'test.txt'];

    try {
      vi.resetModules();
      await import('../src/cli.js');
    } catch (e) {
      // May exit after successful execution
    }

    expect(pushFile).toHaveBeenCalledWith('test.txt', false);
  });

  it('calls pushFile with unique=true when --unique flag is used', async () => {
    const pushFile = (await import('../src/pushfile.js')).default;

    process.argv = ['node', 'cli.js', '--unique', 'test.txt'];

    try {
      vi.resetModules();
      await import('../src/cli.js');
    } catch (e) {
      // May exit after successful execution
    }

    expect(pushFile).toHaveBeenCalledWith('test.txt', true);
  });

  it('calls pushFile with unique=true when -u flag is used', async () => {
    const pushFile = (await import('../src/pushfile.js')).default;

    process.argv = ['node', 'cli.js', '-u', 'test.txt'];

    try {
      vi.resetModules();
      await import('../src/cli.js');
    } catch (e) {
      // May exit after successful execution
    }

    expect(pushFile).toHaveBeenCalledWith('test.txt', true);
  });

  it('exits with code 0 after successful configure', async () => {
    process.argv = ['node', 'cli.js', '--configure'];

    try {
      vi.resetModules();
      await import('../src/cli.js');
    } catch (e: any) {
      expect(e.message).toContain('process.exit: 0');
    }
  });
});
