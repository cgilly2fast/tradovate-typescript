[**tradovate**](../README.md)

***

[API](../API.md) > MarketDataSocketSubscribeParams

# Type alias: MarketDataSocketSubscribeParams`<T>`

> **MarketDataSocketSubscribeParams**: <`T`> `object`

## Type parameters

| Parameter |
| :------ |
| `T` *extends* [`EndpointURLs`](type-alias.EndpointURLs.md) |

## Type declaration

### `body`

**body**: [`EndpointRequestBody`](type-alias.EndpointRequestBody.md)[`T`]

***

### `onSubscription`

**onSubscription**: [`QuoteSubscription`](type-alias.QuoteSubscription.md) \| [`DOMSubscription`](type-alias.DOMSubscription.md) \| [`ChartSubscription`](type-alias.ChartSubscription.md) \| [`HistogramSubscription`](type-alias.HistogramSubscription.md)

***

### `url`

**url**: `T`

## Source

[types/index.ts:3506](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L3506)
