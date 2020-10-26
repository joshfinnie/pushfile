# pushfile

A node.js command line application that pushes a file to S3 and gives you a URL. Files are public by default.

[![Tests](https://github.com/joshfinnie/pushfile/workflows/Tests/badge.svg)](https://github.com/joshfinnie/pushfile/actions?query=workflow%3ATests)
[![Dependency Status](https://david-dm.org/joshfinnie/pushfile.svg?theme=shields.io)](https://david-dm.org/joshfinnie/pushfile)
[![devDependency Status](https://david-dm.org/joshfinnie/pushfile/dev-status.svg?theme=shields.io)](https://david-dm.org/joshfinnie/pushfile#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/pushfile.svg)](https://www.npmjs.org/package/pushfile)


## Installation

To install PushFile, simply run `npm install -g pushfile`. This will install `pushfile` globally on your machine.

### Create a Config File

To create a config file, just run `pushfile --configuration` or copy the example config file to your home directory and rename it `.pushfile.json`.

### AWS Credentials

You can go [here](https://console.aws.amazon.com/iam/home?#security_credential) to get your AWS credentials.

## Usage

Once your configuration file is created pushing files to S3 is simple:

    $ pushfile /path/to/file.ext

To create a unique file name, you can use the `-u` flag:

    $ pushfile -u /path/to/file.ext


### Example

```
$ pushfile cat.jpg
____                  _       _____   _   _          _
|  _ \   _   _   ___  | |__   |  ___| (_) | |   ___  | |
| |_) | | | | | / __| | '_ \  | |_    | | | |  / _ \ | |
|  __/  | |_| | \__ \ | | | | |  _|   | | | | |  __/ |_|
|_|      \__,_| |___/ |_| |_| |_|     |_| |_|  \___| (_)

File is available at https://s3.amazonaws.com/i.jfin.us/MzgYBxMBbwSjywx9QKaRFOxYoDWbxkiyGmP.jpg
```

## Development

We have added `npm-watch` to Pushfile to aid in development of this package. To run this code in development mode, simply run the following command:

    $ npm run develop

This will generate a nodemon process that will re-run `npm run build` any time code is changed. To test the changes, you'll need to use the local version of Pushfile. To run that package, run :

    $ ./bin/pushfile <COMMAND>

## Changelog

[See CHANGELOG.md](CHANGELOG.md)
