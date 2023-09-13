[**tradovate**](../README.md)

***

[API](../API.md) > SimpleRequest

# Interface: SimpleRequest`<T>`

## Type parameters

| Parameter |
| :------ |
| `T` *extends* [`EndpointURLs`](../type-aliases/type-alias.EndpointURLs.md) |

## Properties

### onReject

> **onReject**?: () => `void`

#### Returns

`void`

#### Source

[types/index.ts:680](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L680)

***

### onResponse

> **onResponse**?: (`item`) => `void`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `item` | [`ResponseMsg`](../type-aliases/type-alias.ResponseMsg.md)\< `T` \> |

#### Returns

`void`

#### Source

[types/index.ts:679](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L679)

***

### url

> **url**: `string`

#### Source

[types/index.ts:678](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L678)
