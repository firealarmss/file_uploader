# File Uploader

[![License](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)

Simple file uploader

## Getting started

Install node js

### Install Requirements

`npm i`

`npm i -g pkg` (if you want to compile the app)

### Compile
To build for mac, windows, and linux:

`npm run build`

To build for windows:

`npm run build:win`

To build for mac:

`npm run build:mac`

To build for linux:

`npm run build:linux`

Binary will be in the `bin` folder. By default, it will be named `file_upload-os type`

### Running File Uploader without compiling

If you want to specify your own config file:
```bash
node src/index.js -c configs/config.yml
```

To just run the app (make sure you have a `config.yml` file in the `configs` folder):

```bash
npm run start
```

### Configure

Edit the `config.yml` file to your needs

## Todo
