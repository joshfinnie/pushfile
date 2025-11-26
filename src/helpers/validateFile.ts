import createDebug from 'debug';
import fs from 'fs/promises';

const debug = createDebug('pushfile:validate');

export async function validateFile(fileName: string): Promise<void> {
  debug('Validating file: %s', fileName);

  // Check if file path is provided
  if (!fileName || fileName.trim() === '') {
    debug('Validation failed: no file path provided');
    throw new Error('File path is required. Usage: pushfile <file>');
  }

  // Check if file exists
  debug('Checking if file exists...');
  try {
    await fs.access(fileName, fs.constants.F_OK);
    debug('File exists');
  } catch {
    debug('Validation failed: file not found');
    throw new Error(
      `File not found: ${fileName}\n` +
        'Please check that the file path is correct and the file exists.',
    );
  }

  // Check if file is readable
  debug('Checking file readability...');
  try {
    await fs.access(fileName, fs.constants.R_OK);
    debug('File is readable');
  } catch {
    debug('Validation failed: file not readable');
    throw new Error(
      `File is not readable: ${fileName}\n` +
        'Please check file permissions and try again.',
    );
  }

  // Check if it's actually a file (not a directory)
  debug('Checking file type...');
  const stats = await fs.stat(fileName);
  if (stats.isDirectory()) {
    debug('Validation failed: path is a directory');
    throw new Error(
      `${fileName} is a directory, not a file.\n` +
        'Please specify a file to upload.',
    );
  }
  debug('Path is a file');

  // Check file size (warn for large files)
  const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
  const fileSizeGB = stats.size / 1024 / 1024 / 1024;
  debug('File size: %.2f GB', fileSizeGB);

  if (stats.size > MAX_FILE_SIZE) {
    debug('Validation failed: file too large');
    throw new Error(
      `File is too large: ${fileSizeGB.toFixed(2)}GB\n` +
        'Maximum file size is 5GB.',
    );
  }

  debug('File validation complete');
}
