const test = require('ava')
const {resolve} = require('path')
// const log = require('util').debuglog('require-esmodule')
const {requireModule} = require('../src')

const CASES = [
  // id, requireDefault, key, expect
  ['./foo',, 'foo', 'default-foo'],
  ['./foo', false, 'foo', 'foo'],
  ['./foo-no-default', true, 'foo', 'foo'],
  ['./foo-no-default', false, 'foo', 'foo'],
  ['./bar',, 'bar', 'bar'],
  ['./bar', false, 'bar', 'bar'],
  ['./null', true, , null],
  ['./null', false, , null],
  ['./undefined', true, , undefined],
  ['./undefined', false, , undefined],
]

CASES.forEach(c => {
  const [id, requireDefault, key, expect] = c

  test(c.join(', '), t => {
    const m = requireModule(resolve(__dirname, id), requireDefault)
    t.is(key ? m[key] : m, expect)
  })
})
