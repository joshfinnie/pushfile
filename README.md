# pushfile

A node.js command line application that pushes a file to S3 and gives you a URL. Files are public by default.

[![Build Status](https://travis-ci.org/joshfinnie/pushfile.png?branch=master)](https://travis-ci.org/joshfinnie/pushfile)
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

## Changelog

0.6.1 - Updated packages and swapped out `copy-paste` for `clipboardy`.

0.4 - Replaced `Optimist` with `nomnom` for command line args parsing. Bumped all versions and updated AWS SDK to use `upload` instead of `push`.

0.3 - Implenmeted PushFile using the native AWS SDK instead of out-dated package

0.2 - Implemented feature that turns all pushed files public by default.
