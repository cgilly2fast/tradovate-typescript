[**tradovate**](../README.md)

***

[API](../API.md) > TickOrBarPacket

# Type alias: TickOrBarPacket`<T>`

> **TickOrBarPacket**: <`T`> `T` *extends* *typeof* [`TicksTransformer`](../functions/function.TicksTransformer.md) ? [`TickPacket`](type-alias.TickPacket.md) : `T` *extends* *typeof* [`BarsTransformer`](../functions/function.BarsTransformer.md) ? [`BarPacket`](type-alias.BarPacket.md) : `never`

Represents a type that is either a TickPacket or a BarPacket based on the transformer function provided.

## Typeparam

T - The transformer function type (BarsTransformer or TicksTransformer).

## Type parameters

| Parameter |
| :------ |
| `T` *extends* *typeof* [`BarsTransformer`](../functions/function.BarsTransformer.md) \| *typeof* [`TicksTransformer`](../functions/function.TicksTransformer.md) |

## Source

[types/index.ts:4674](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L4674)
