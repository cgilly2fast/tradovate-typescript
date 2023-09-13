[**tradovate**](../README.md)

***

[API](../API.md) > OrderListRequest

# Type alias: OrderListRequest

> **OrderListRequest**: `object`

## Type declaration

### `onReject`

**onReject**?: () => `void`

#### Returns

`void`

***

### `onResponse`

**onResponse**?: (`item`) => `void`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `item` | [`ResponseMsg`](type-alias.ResponseMsg.md)\< `"order/list"` \> |

#### Returns

`void`

***

### `url`

**url**?: `"order/list"`

## Source

[types/index.ts:683](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L683)
