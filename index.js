#!/usr/bin/env node
const { transform } = require('babel-core')
const transformJsonTypes = require('transform-json-types')
const babelJsonToProptypes = require('babel-plugin-json-to-proptypes')
const program = require('commander')
const getStdin = require('get-stdin')
const R = require('ramda')

const isString = R.is(String)
const jsonTo = R.flip(transformJsonTypes)
const jsonToFlow = jsonTo({ lang: 'flow' })
const jsonToTS = jsonTo({ lang: 'typescript' })
const jsonToProptypes = x => transform(x, { plugins: [babelJsonToProptypes] }).code + "\n"

program
  .option('-t, --to <output>', 'set output format', /^(flow|typescript|proptypes|scala|rust)$/i)
  .parse(process.argv)

if (! isString(program.to)) {
  console.error('not a valid transformer, must be "flow", "typescript", or "proptypes"')
  process.exit(1)
}

getStdin().then(R.prop(program.to.toLowerCase(), {
    flow: jsonToFlow,
    typescript: jsonToTS,
    proptypes: jsonToProptypes,
  }))
  .then(x => process.stdout.write(x))
  .catch(e => { console.error(e); process.exit(1) })
