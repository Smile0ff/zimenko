var path = require('path'),
    jsPath = require('../config').js;

const aliases = {
    '@root': jsPath,
    '@pages': path.join(jsPath, 'pages'),
    '@config': path.join(jsPath, 'config'),
    '@components': path.join(jsPath, 'components'),
    '@utility': path.join(jsPath, 'utility')
}

module.exports = aliases;
