[**tradovate**](../README.md)

***

[API](../API.md) > SubscribeChartParams

# Type alias: SubscribeChartParams

> **SubscribeChartParams**: `object`

## Type declaration

### `chartDescription`

**chartDescription**: [`ChartDescription`](type-alias.ChartDescription.md)

***

### `onSubscription`

**onSubscription**: (`item`) => `void`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `item` | [`Chart`](type-alias.Chart.md) |

#### Returns

`void`

***

### `symbol`

**symbol**: `string`

***

### `timeRange`

**timeRange**: `object`

> #### `timeRange.asFarAsTimestamp`
>
> **asFarAsTimestamp**?: `string`
>
> #### `timeRange.asMuchAsElements`
>
> **asMuchAsElements**?: `number`
>
> #### `timeRange.closestTickId`
>
> **closestTickId**?: `number`
>
> #### `timeRange.closestTimestamp`
>
> **closestTimestamp**?: `string`
>
>

## Source

[types/index.ts:3434](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L3434)
