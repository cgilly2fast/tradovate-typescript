[**tradovate**](../README.md)

***

[API](../API.md) > DataBuffer

# Class: DataBuffer`<T>`

## Constructors

### constructor

> **new DataBuffer**<`T`>(`transformer`, `data` = `[]`): [`DataBuffer`](class.DataBuffer.md)\< `T` \>

Initializes a new instance of the DataBuffer class.

#### Type parameters

| Parameter |
| :------ |
| `T` *extends* (`packet`) => [`Tick`](../type-aliases/type-alias.Tick.md)[] \| (`packet`) => [`Bar`](../type-aliases/type-alias.Bar.md)[] |

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `transformer` | `T` | `undefined` | The transformer function used to process data. |
| `data` | [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[] | `[]` | Initial data for the buffer. |

#### Returns

[`DataBuffer`](class.DataBuffer.md)\< `T` \>

#### Source

[utils/dataBuffer.ts:61](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L61)

## Properties

### buffer

> **buffer**: [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

#### Source

[utils/dataBuffer.ts:51](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L51)

***

### lastTs

> **lastTs**: `number`

#### Source

[utils/dataBuffer.ts:52](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L52)

***

### maxLength

> **`private`** **maxLength**: `null` \| `number`

#### Source

[utils/dataBuffer.ts:54](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L54)

***

### transformer

> **transformer**: `T`

#### Source

[utils/dataBuffer.ts:50](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L50)

## Methods

### concat

> **concat**(`item`): `this`

Concatenates a data packet into the buffer.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `item` | [`TickOrBarPacket`](../type-aliases/type-alias.TickOrBarPacket.md)\< `T` \> | The data packet to be concatenated into the buffer. |

#### Returns

`this`

The updated DataBuffer instance.

#### Source

[utils/dataBuffer.ts:109](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L109)

***

### every

> **every**(`predicate`): `boolean`

Checks if every item in the buffer satisfies the provided predicate function.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`, `index`, `array`) => `boolean` | A predicate function to test each item in the buffer. |

#### Returns

`boolean`

True if all items satisfy the predicate; otherwise, false.

#### Source

[utils/dataBuffer.ts:177](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L177)

***

### filter

> **filter**(`predicate`): [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

Checks if every item in the buffer satisfies the provided predicate function.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`, `index`, `array`) => `boolean` | A predicate function to test each item in the buffer. |

#### Returns

[`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

True if all items satisfy the predicate; otherwise, false.

#### Source

[utils/dataBuffer.ts:186](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L186)

***

### find

> **find**(`predicate`): `undefined` \| [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>

Finds the first item in the buffer that satisfies the provided predicate function.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`, `index`, `array`) => `boolean` | A predicate function to test each item in the buffer. |

#### Returns

`undefined` \| [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>

The first item that satisfies the predicate, or undefined if not found.

#### Source

[utils/dataBuffer.ts:204](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L204)

***

### forEach

> **forEach**(`callback`): `void`

Iterates over each item in the buffer and executes the provided callback function.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`value`, `index`, `array`) => `void` | A callback function to execute for each item in the buffer. |

#### Returns

`void`

#### Source

[utils/dataBuffer.ts:135](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L135)

***

### getData

> **getData**(`i` = `-1`): [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \> \| [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

Retrieves the data stored in the buffer.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `i` | `number` | `-1` | Optional index to retrieve a specific item from the buffer. |

#### Returns

[`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \> \| [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

The entire buffer or a specific item from the buffer.

#### Source

[utils/dataBuffer.ts:129](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L129)

***

### indexOf

> **indexOf**(`item`): `number`

Finds the index of the specified item in the buffer.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `item` | [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \> | The item to search for in the buffer. |

#### Returns

`number`

The index of the item or -1 if not found.

#### Source

[utils/dataBuffer.ts:170](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L170)

***

### last

> **last**(`i` = `0`): [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>

Retrieves the last item in the buffer, or the item at the specified position from the end.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `i` | `number` | `0` | Optional position from the end to retrieve the item. |

#### Returns

[`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>

The last item in the buffer or the item at the specified position.

#### Source

[utils/dataBuffer.ts:213](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L213)

***

### length

> **length**(): `number`

Retrieves the number of items currently stored in the buffer.

#### Returns

`number`

The number of items in the buffer.

#### Source

[utils/dataBuffer.ts:219](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L219)

***

### map

> **map**<`U`>(`callback`): `void`

Maps each item in the buffer to a new value using the provided callback function.

#### Type parameters

| Parameter |
| :------ |
| `U` |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`value`, `index`, `array`) => `U` | A callback function to map each item in the buffer. |

#### Returns

`void`

An array of mapped values.

#### Source

[utils/dataBuffer.ts:145](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L145)

#### Typeparam

U - The type of the mapped items.

***

### push

> **push**(`packet`): `void`

Pushes new data into the buffer.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`TickOrBarPacket`](../type-aliases/type-alias.TickOrBarPacket.md)\< `T` \> | The data packet to be processed and pushed into the buffer. |

#### Returns

`void`

#### Source

[utils/dataBuffer.ts:71](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L71)

***

### reduce

> **reduce**(`callback`, `seed`): [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>

Reduces the items in the buffer to a single value using the provided callback function.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `callback` | `any` | A callback function to execute on each item in the buffer. |
| `seed` | `any` | A value to use as the initial accumulator in the reduction. |

#### Returns

[`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>

The final reduced value.

#### Source

[utils/dataBuffer.ts:155](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L155)

***

### setMaxLength

> **setMaxLength**(`max`): `number`

Sets the maximum length of the buffer.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `max` | `number` | The maximum length of the buffer. |

#### Returns

`number`

#### Source

[utils/dataBuffer.ts:96](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L96)

***

### slice

> **slice**(`start`, `end`): [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

Retrieves a slice of items from the buffer based on the specified start and end indices.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The starting index of the slice. |
| `end` | `number` | The ending index of the slice. |

#### Returns

[`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

An array of sliced items.

#### Source

[utils/dataBuffer.ts:163](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L163)

***

### slicePeriod

> **slicePeriod**(`period`): [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

Retrieves a slice of data from the buffer based on the specified period.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `period` | `number` | The number of items to retrieve from the end of the buffer. Use null to retrieve all items. |

#### Returns

[`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \>[]

An array of Tick or Bar items.

#### Source

[utils/dataBuffer.ts:119](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L119)

***

### softPush

> **softPush**(`item`): `number`

Pushes a new item into the buffer without performing timestamp checks.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `item` | [`TickOrBar`](../type-aliases/type-alias.TickOrBar.md)\< `T` \> | The item to be pushed into the buffer. |

#### Returns

`number`

#### Source

[utils/dataBuffer.ts:102](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L102)

***

### some

> **some**(`predicate`): `boolean`

Checks if at least one item in the buffer satisfies the provided predicate function.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`, `index`, `array`) => `boolean` | A predicate function to test each item in the buffer. |

#### Returns

`boolean`

True if at least one item satisfies the predicate; otherwise, false.

#### Source

[utils/dataBuffer.ts:195](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dataBuffer.ts#L195)
