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
const router = express.Router();

module.exports = function({ config }) {
    router.get('/', (req, res) => {
        res.render('index', { passphrase: config.passPhrase });
    });

    return router;
};