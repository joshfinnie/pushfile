export const CONFIG_QUESTIONS = [
  {
    name: 'awsKey',
    type: 'input',
    message: 'Enter your AWS Client Key',
    validate: (v: string) => (v ? true : 'Please enter your AWS Client Key'),
  },
  {
    name: 'awsSecret',
    type: 'input',
    message: 'Enter your AWS Secret Key',
    validate: (v: string) => (v ? true : 'Please enter your AWS Secret Key'),
  },
  {
    name: 's3Bucket',
    type: 'input',
    message: 'Enter your AWS S3 Bucket',
    validate: (v: string) => (v ? true : 'Please enter your AWS S3 Bucket'),
  },
  {
    name: 'customURL',
    type: 'input',
    message: 'Enter your custom URL (optional)',
    validate: () => true,
  },
];
