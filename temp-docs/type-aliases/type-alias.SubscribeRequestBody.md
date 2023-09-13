[**tradovate**](../README.md)

***

[API](../API.md) > SubscribeRequestBody

# Type alias: SubscribeRequestBody

> **SubscribeRequestBody**: `object`

## Type declaration

### `md/getChart`

**md/getChart**: `object`

> #### `md/getChart.chartDescription`
>
> **chartDescription**: [`ChartDescription`](type-alias.ChartDescription.md)
>
> #### `md/getChart.symbol`
>
> **symbol**: `string`
>
> #### `md/getChart.timeRange`
>
> **timeRange**: `object`
>
> > ##### `timeRange.asFarAsTimestamp`
> >
> > **asFarAsTimestamp**?: `string`
> >
> > ##### `timeRange.asMuchAsElements`
> >
> > **asMuchAsElements**?: `number`
> >
> > ##### `timeRange.closestTickId`
> >
> > **closestTickId**?: `number`
> >
> > ##### `timeRange.closestTimestamp`
> >
> > **closestTimestamp**?: `string`
> >
> >
>
>

***

### `md/subscribeDOM`

**md/subscribeDOM**: `object`

> #### `md/subscribeDOM.symbol`
>
> **symbol**: `string`
>
>

***

### `md/subscribeHistogram`

**md/subscribeHistogram**: `object`

> #### `md/subscribeHistogram.symbol`
>
> **symbol**: `string`
>
>

***

### `md/subscribeQuote`

**md/subscribeQuote**: `object`

> #### `md/subscribeQuote.symbol`
>
> **symbol**: `string`
>
>

***

### `replay/initializeclock`

**replay/initializeclock**: `object`

> #### `replay/initializeclock.initialBalance`
>
> **initialBalance**: `number`
>
> #### `replay/initializeclock.speed`
>
> **speed**: `number`
>
> #### `replay/initializeclock.startTimestamp`
>
> **startTimestamp**: `string`
>
>

***

### `user/syncrequest`

**user/syncrequest**: `object`

> #### `user/syncrequest.accounts`
>
> **accounts**: `number`[]
>
>

## Source

[types/index.ts:2654](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L2654)
