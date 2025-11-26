import fs from 'fs/promises';

export async function validateFile(fileName: string): Promise<void> {
  // Check if file path is provided
  if (!fileName || fileName.trim() === '') {
    throw new Error('File path is required. Usage: pushfile <file>');
  }

  // Check if file exists
  try {
    await fs.access(fileName, fs.constants.F_OK);
  } catch {
    throw new Error(
      `File not found: ${fileName}\n` +
        'Please check that the file path is correct and the file exists.',
    );
  }

  // Check if file is readable
  try {
    await fs.access(fileName, fs.constants.R_OK);
  } catch {
    throw new Error(
      `File is not readable: ${fileName}\n` +
        'Please check file permissions and try again.',
    );
  }

  // Check if it's actually a file (not a directory)
  const stats = await fs.stat(fileName);
  if (stats.isDirectory()) {
    throw new Error(
      `${fileName} is a directory, not a file.\n` +
        'Please specify a file to upload.',
    );
  }

  // Check file size (warn for large files)
  const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
  if (stats.size > MAX_FILE_SIZE) {
    throw new Error(
      `File is too large: ${(stats.size / 1024 / 1024 / 1024).toFixed(2)}GB\n` +
        'Maximum file size is 5GB.',
    );
  }
}
