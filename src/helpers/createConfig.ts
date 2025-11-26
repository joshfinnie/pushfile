import fs from 'fs/promises';
import inquirer from 'inquirer';
import path from 'path';
import {CONFIG_QUESTIONS} from '../config.js';
import type {IConfig} from '../types/helpers.js';

export function buildConfigFromAnswers(answers: Partial<IConfig>): IConfig {
  const {awsKey, awsSecret, s3Bucket, customURL} = answers;

  if (!awsKey || !awsSecret || !s3Bucket) {
    throw new Error('Missing required fields');
  }

  const finalConfig: IConfig = {
    awsKey,
    awsSecret,
    s3Bucket,
    ...(customURL ? {customURL} : {}),
  };

  return finalConfig;
}
//
// -----------------------------
// Create Config File
// -----------------------------
export async function createConfig(): Promise<void> {
  const answers = await inquirer.prompt(CONFIG_QUESTIONS);
  const config = buildConfigFromAnswers(answers);

  const PROJECT_RC_PATH = path.resolve(process.cwd(), '.pushfilerc.json');
  await fs.writeFile(PROJECT_RC_PATH, JSON.stringify(config, null, 2));
  console.log(`Project config written to ${PROJECT_RC_PATH}`);

  const HOME_RC_PATH = `${process.env.HOME}/.pushfile.json`;
  await fs.writeFile(HOME_RC_PATH, JSON.stringify(config, null, 2));
  console.log(`Legacy config written to ${HOME_RC_PATH}`);
}
