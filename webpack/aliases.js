var path = require('path'),
    jsPath = require('../config').js;

const aliases = {
    '@root': jsPath,
    '@pages': path.join(jsPath, 'pages'),
}

module.exports = aliases;
