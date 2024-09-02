# Tradovate Typescript

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![MIT License][license-image]][license-url]
[![Coverage Status](https://coveralls.io/repos/github/cgilly2fast/tradovate-typescript/badge.svg)](https://coveralls.io/github/cgilly2fast/tradovate-typescript)

<!-- [![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![FOSSA Status][fossa-badge-image]][fossa-badge-url]
[![SemVer compatibility][semver-image]][semver-url] -->

Robust TypeScript SDK for Tradovate API integration. Simplifies real-time market data handling, order management, and strategy deployment. Features WebSocket support, type safety, and tools for both live trading and backtesting.

## Introduction

[![Video Preview](https://www.colbygilbert.com/api/media/file/tradovateSDk_preview.png)](https://www.youtube.com/watch?v=WoW0uNWQqik)

## Project Status

Working on video examples for live and replay stratigies.

## Installation

```bash
npm install tradovate --save
```

```bash
yarn add tradovate
```

## Usage

Connecting to quote data can be done in a few lines of code.

```typescript
import 'dotenv/config'
import {TradovateService, AccessTokenRequestBody, MarketDataSocket} from '../../src'

const credentials: AccessTokenRequestBody = {
    name: process.env.TV_USER!,
    password: process.env.TV_PASSWORD!,
    appId: process.env.TV_APP_ID,
    appVersion: '1.0.0',
    cid: process.env.TV_CID,
    sec: process.env.TV_SECRET
}

const service = new TradovateService()

const mdSocket = new MarketDataSocket()

async function main() {
    await service.connect(credentials)

    await mdSocket.connect()

    await mdSocket.subscribeQuote('ESU3', item => {
        console.log(item)
    })

    setTimeout(() => {
        mdSocket.disconnect()
    }, 30 * 60 * 1000)
}

main()
```

_Note: you need a funded Tradovate account with API access enabled and a CME Information License Agreement (ILA) for above code to work._

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
