[**tradovate**](../README.md)

***

[API](../API.md) > waitUntil

# Function: waitUntil

> **waitUntil**(`pred`): `Promise`\< `void` \>

Waits until a specified predicate function returns true before resolving.

## Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `pred` | () => `boolean` | The predicate function to evaluate. |

## Returns

`Promise`\< `void` \>

A Promise that resolves when the predicate function returns true.

## Source

[utils/wait.ts:19](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/wait.ts#L19)
