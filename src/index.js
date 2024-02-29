/**
 * This file is part of the file_upload project.
 *
 * Project based on personal express app template.
 * https://github.com/firealarmss/express-project-template
 *
 * (c) 2024 Caleb <ko4uyj@gmail.com>
 *
 * For the full copyright and license information, see the
 * LICENSE file that was distributed with this source code.
 */

const yargs = require('yargs');
const fs = require('fs');
const yaml = require('js-yaml');
const Server = require('./modules/web/Server');
const Logger = require('./modules/Logger');

const argv = yargs

    .option('c', {
        alias: 'config',
        describe: 'Path to config file',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

let config = {};

if (argv.config) {
    try {
        const configFileContents = fs.readFileSync(argv.config, 'utf8');
        config = yaml.load(configFileContents);
    } catch (e) {
        console.error("Error reading config file: \n" + e);
        process.exit(1);
    }
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    const logger = new Logger(config.debug, config.projectName, config.logPath, 'DEBUG');

    const server = new Server(logger, config);
    server.start();

    async function cleanup() {
        await server.stop();

        process.exit();
    }
}