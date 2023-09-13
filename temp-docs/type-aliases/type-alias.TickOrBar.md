[**tradovate**](../README.md)

***

[API](../API.md) > TickOrBar

# Type alias: TickOrBar`<T>`

> **TickOrBar**: <`T`> `T` *extends* *typeof* [`TicksTransformer`](../functions/function.TicksTransformer.md) ? [`Tick`](type-alias.Tick.md) : `T` *extends* *typeof* [`BarsTransformer`](../functions/function.BarsTransformer.md) ? [`Bar`](type-alias.Bar.md) : `never`

Represents a type that is either a Tick or a Bar based on the transformer function provided.

## Typeparam

T - The transformer function type (BarsTransformer or TicksTransformer).

## Type parameters

| Parameter |
| :------ |
| `T` *extends* *typeof* [`BarsTransformer`](../functions/function.BarsTransformer.md) \| *typeof* [`TicksTransformer`](../functions/function.TicksTransformer.md) |

## Source

[types/index.ts:4663](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L4663)
