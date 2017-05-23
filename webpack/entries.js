var path = require('path'),
    config = require('../config');

const files = {
    home: 'home.js'
}

const entries = {};

Object.keys(files).map((key) => {
    entries[key] = path.join(
        config.js,
        'pages',
        files[key]
    );
});

module.exports = entries;