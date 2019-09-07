[![Build Status](https://travis-ci.org/kaelzhang/require-esmodule.svg?branch=master)](https://travis-ci.org/kaelzhang/require-esmodule)
[![Coverage](https://codecov.io/gh/kaelzhang/require-esmodule/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/require-esmodule)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/require-esmodule?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/require-esmodule)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/require-esmodule.svg)](http://badge.fury.io/js/require-esmodule)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/require-esmodule.svg)](https://www.npmjs.org/package/require-esmodule)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/require-esmodule.svg)](https://david-dm.org/kaelzhang/require-esmodule)
-->

# require-esmodule

require a compiled es6 module and handle exports.default.

## Install

```sh
$ npm i require-esmodule
```

## Usage

```js
// foo.js
Object.defineProperty(exports, '__esModule', {value: true})

exports.default = {
  foo: 'default-foo'
}

exports.foo = 'foo'
```

```js
// bar.js
module.exports = {
  default: {
    bar: 'default-bar'
  },
  bar: 'bar'
}
```

```js
// baz.js
module.exports = null
```

```js
// qux.js
const {
  requireModule,
  getExports
} = require('require-esmodule')

console.log(requireModule('/path/to/foo').foo)         // 'default-foo'

console.log(requireModule('/path/to/foo', false).foo)  // 'foo'

console.log(requireModule('/path/to/bar').bar)         // 'bar'
// bar.js is not a es6 module

console.log(requireModule('/path/to/baz'))             // null
```

## requireModule(id: string, requireDefault? : boolean = true)

- **id** `string` **ABSOLUTE** path of the module
- **requireDefault?** `boolean=true` whether should require export default. Defaults to `true`.

Returns `any` the module exports

### `requireDefault` as `false`

```js
const foo = requireModule('./foo', false)
```

is equivalent to:

```js
import * as foo from './foo'
```

while

```js
const foo = requireModule('./foo')
```

is equivalent to:

```js
import foo from './foo'
```

The purpose of `require-esmodule` is to detect and make it easier to get the **default export**s of es modules, so the default value of `requireDefault` is set to `true`

## License

[MIT](LICENSE)
