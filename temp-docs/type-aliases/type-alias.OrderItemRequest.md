[**tradovate**](../README.md)

***

[API](../API.md) > OrderItemRequest

# Type alias: OrderItemRequest

> **OrderItemRequest**: `object`

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
| `item` | [`ResponseMsg`](type-alias.ResponseMsg.md)\< `"order/item"` \> |

#### Returns

`void`

***

### `query`

**query**: `object`

> #### `query.id`
>
> **id**: `number`
>
>

***

### `url`

**url**: `string`

## Source

[types/index.ts:689](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L689)
