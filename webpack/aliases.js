var path = require('path'),
    jsPath = require('../config').js;

const aliases = {
    '@root': jsPath,
    '@pages': path.join(jsPath, 'pages'),
    '@config': path.join(jsPath, 'config'),
    '@constants': path.join(jsPath, 'constants'),
    '@containers': path.join(jsPath, 'containers'),
    '@components': path.join(jsPath, 'components'),
    '@decorators': path.join(jsPath, 'decorators'),
    '@utility': path.join(jsPath, 'utility'),
    '@forms': path.join(jsPath, 'forms')
}

module.exports = aliases;
