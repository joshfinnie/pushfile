# pushfile


A node.js application that pushes a file to S3 and gives you a short URL.

[![Build Status](https://travis-ci.org/joshfinnie/pushfile.png?branch=master)](https://travis-ci.org/joshfinnie/pushfile)

## Installation

Download the repo, and update the configuration file.

    $ git clone https://github.com/joshfinnie/pushfile.git

### Update Config

To create a config file, just run `pushfile --configuration` or copy the example config file to your home directory and rename it `.pushfile.json`.

## Adding pushfile to your path

Simply add a symbolic link to your `/usr/local/bin`.

    $ ln -s /path/to/repo/with/pushfile/bin/pushfile /usr/local/bin/pushfile

This allows you to just push the file from your command line.

    $ pushfile <FILE>
