# transform-cli

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
curl <someurl> | index.js -t flow
```
