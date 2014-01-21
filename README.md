# pushfile


A node.js application that pushes a file to S3 and gives you a short URL.

## Installation

Download the repo, and update the configuration file.

    $ git clone https://github.com/joshfinnie/pushfile.git

### Update Config

Add your [AWS](http://aws.amazon.com/) `key`, `secret`, and `bucket` information to `s3Creds.json`.

## Adding pushfile to your path

Simply add a symbolic link to your `/usr/local/bin`.

    $ ln -s /path/to/repo/with/pushfile/bin/pushfile /usr/local/bin/pushfile
    
This allows you to just push the file from your command line.

    $ pushfile <FILE>