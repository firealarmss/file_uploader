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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

module.exports = function({ logger, config }) {
    router.post('/upload', upload.single('file'), (req, res) => {
        const { passphrase } = req.body;
        if (passphrase !== config.passPhrase) {
            logger.warn(`Failed upload attempt with passphrase: ${passphrase}`);
            return res.status(401).send('Unauthorized: Incorrect passphrase');
        }
        logger.info(`Uploaded file: ${req.file.path}`);
        res.send('File uploaded successfully');
    });

    return router;
};
