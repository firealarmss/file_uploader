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

const express = require('express');
const path = require('path');

class Server {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;

        this.app = express();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, "views"));

        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.setupRoutes();
    }

    setupRoutes() {
        const indexRouter = require('./routes')({ config: this.config });
        const uploadRouter = require('./routes/upload')({ logger: this.logger, config: this.config });

        this.app.use('/', indexRouter);
        this.app.use('/', uploadRouter);
    }

    async stop() {
        this.logger.info(`Cleaning up ${this.config.projectName} Server`);

        if (this.initializedServer) {
            this.initializedServer.close();
            this.logger.info("Server shutdown");
        } else {
            this.logger.warn("Server not initialized so Server not stopped!")
        }
    }

    start() {
        const port = this.config.bindPort || 3000;
        const addr = this.config.bindAddress || "0.0.0.0"
        const method = this.config.ssl ? "https" : "http" || "http" // Only used in some apps

        this.initializedServer = this.app.listen(port, addr, () => {
            console.log(`Server running on ${method}://${addr}:${port}`);
        });
    }
}

module.exports = Server;