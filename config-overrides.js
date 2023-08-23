const { alias, configPaths } = require('react-app-rewire-alias')

const jsConfig = configPaths("./jsconfig.json")
console.log(jsConfig)

module.exports = function override(config) {
    // Override default React "jsconfig.json" file
    const newConfig = alias(jsConfig)(config)

    return newConfig;
}
