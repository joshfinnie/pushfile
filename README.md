# pushfile

A node.js application that pushes a file to S3 and gives you a short URL.

[![Build Status](http://img.shields.io/travis/joshfinnie/pushfile.svg)](https://travis-ci.org/joshfinnie/pushfile)
[![Dependency Status](https://david-dm.org/joshfinnie/pushfile.svg?theme=shields.io)](https://david-dm.org/joshfinnie/pushfile)
[![devDependency Status](https://david-dm.org/joshfinnie/pushfile/dev-status.svg?theme=shields.io)](https://david-dm.org/joshfinnie/pushfile#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/pushfile.svg)](http://img.shields.io/npm/v/pushfile.svg)


## Installation

To install PushFile, simply run `npm install -g pushfile`. This will install `PushFile` globally on your machine.

### Create a Config File

To create a config file, just run `pushfile --configuration` or copy the example config file to your home directory and rename it `.pushfile.json`.

## Usage

Once your configuration file is created pushing files to S3 is simple:

    $ pushfile /path/to/file.ext
