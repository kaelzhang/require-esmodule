const getExports = (exports, requireDefault) =>
  exports === undefined
  || exports === null
  || requireDefault === false
  // eslint-disable-next-line no-underscore-dangle
  || !exports.__esModule
    ? exports
    : exports.default || exports

const requireModule = (id, requireDefault) =>
  getExports(require(id), requireDefault)

module.exports = {
  getExports,
  requireModule
}
