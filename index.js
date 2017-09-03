const { transform } = require('babel-core')
const transformJsonTypes = require('transform-json-types')
const jsonToProptypes = require('babel-plugin-json-to-proptypes')
const program = require('commander')
const getStdin = require('get-stdin')
const R = require('ramda')

const isString = R.is(String)
const jsonTo = R.flip(transformJsonTypes)

program
  .option('-t, --to <output>', 'set output format', /^(flow|typescript|proptypes)$/)
  .parse(process.argv)

if (! isString(program.to)) {
  console.error('not a valid transformer, must be "flow", "typescript", or "proptypes"')
  process.exit(1)
}

getStdin().then(i => {
  const transformer = R.prop(program.to, {
    flow: jsonTo('flow'),
    typescript: jsonTo('typescript'),
    proptypes: R.flip(transform)({ plugins: [jsonToProptypes] }),
  })
  process.stdout.write(transformer(i))
})
  .catch(e => { console.error(e); process.exit(1) })
