# Tradovate Typescript

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![MIT License][license-image]][license-url]
[![Coverage Status](https://coveralls.io/repos/github/cgilly2fast/tradovate-typescript/badge.svg)](https://coveralls.io/github/cgilly2fast/tradovate-typescript)

<!-- [![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![FOSSA Status][fossa-badge-image]][fossa-badge-url]
[![SemVer compatibility][semver-image]][semver-url] -->

A Typescript package for quickly connecting and deploying trading strategies toyarn Tradovate.

## Project Status

Nearing 1.0 release, tests need to be written for some key components.

## Installation

```bash
npm install tradovate --save
```

## License

Tradovate Typescript is freely distributable under the terms of the [MIT license][license-url].

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/tradovate
[npm-version-image]: https://img.shields.io/npm/v/tradovate.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/tradovate.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/tradovate?minimal=true

<!-- Remove .md file prefixes

```
find docs/ -type f -name "*.md" -exec sh -c '
  for file; do
    newname="$(basename "$file" | sed "s/^[^.]*\.//")"
    mv "$file" "$(dirname "$file")/$newname"
  done
' sh {} +

``` -->
