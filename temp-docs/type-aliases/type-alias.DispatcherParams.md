[**tradovate**](../README.md)

***

[API](../API.md) > DispatcherParams

# Type alias: DispatcherParams`<T, U, V>`

> **DispatcherParams**: <`T`, `U`, `V`> `object`

Represents parameters for creating a Dispatcher instance.

## Typeparam

T - The type of the StrategyState.

## Typeparam

U - The type of the custom action template.

## Typeparam

V - The type of the custom action value.

## Type parameters

| Parameter |
| :------ |
| `T` *extends* [`StrategyState`](type-alias.StrategyState.md) |
| `U` *extends* `string` |
| `V` |

## Type declaration

### `id`

**id**?: `string`

***

### `model`

**model**: `T`

***

### `reducer`

**reducer**: (`prevState`, `action`) => [`EventHandlerResults`](type-alias.EventHandlerResults.md)\< `T` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `prevState` | `T` |
| `action` | [`Action`](type-alias.Action.md) \| [`CustomActionTemplate`](type-alias.CustomActionTemplate.md)\< `U`, `V` \> |

#### Returns

[`EventHandlerResults`](type-alias.EventHandlerResults.md)\< `T` \>

## Source

[types/index.ts:4650](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L4650)
