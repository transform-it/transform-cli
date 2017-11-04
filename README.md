# transform-cli

[![Greenkeeper badge](https://badges.greenkeeper.io/transform-it/transform-cli.svg)](https://greenkeeper.io/)

Transforms JSON into various type definitions

Currently supports:

* JSON -> Flow
* JSON -> TypeScript
* JSON -> React PropTypes

## Usage

```
  -t --to  <output>  set output format
```

### Example:

```
curl <someurl> | ./index.js -t flow
```

## TODO

* Publish as NPM package
* Support the rest of the transformations
