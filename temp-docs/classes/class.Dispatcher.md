[**tradovate**](../README.md)

***

[API](../API.md) > Dispatcher

# Class: Dispatcher`<T>`

Represents a dispatcher for managing state and actions in a strategy.

## Typeparam

T - The type of the StrategyState.

## Constructors

### constructor

> **new Dispatcher**<`T`>(`params`): [`Dispatcher`](class.Dispatcher.md)\< `T` \>

Initializes a new instance of the Dispatcher class.

#### Type parameters

| Parameter |
| :------ |
| `T` *extends* [`StrategyState`](../type-aliases/type-alias.StrategyState.md) |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `params` | [`DispatcherParams`](../type-aliases/type-alias.DispatcherParams.md)\< `T`, `string`, `any` \> | The parameters for creating the Dispatcher instance. |

#### Returns

[`Dispatcher`](class.Dispatcher.md)\< `T` \>

#### Source

[utils/dispatcher.ts:48](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L48)

## Properties

### dispatching

> **`private`** **dispatching**: `boolean`

#### Source

[utils/dispatcher.ts:41](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L41)

***

### id

> **id**?: `string`

#### Source

[utils/dispatcher.ts:33](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L33)

***

### model

> **`private`** **model**: `T`

#### Source

[utils/dispatcher.ts:34](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L34)

***

### queue

> **`private`** **queue**: ([`Action`](../type-aliases/type-alias.Action.md) \| [`CustomActionTemplate`](../type-aliases/type-alias.CustomActionTemplate.md)\< `string`, `any` \>)[]

#### Source

[utils/dispatcher.ts:42](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L42)

***

### reducer

> **`private`** **reducer**: (`prevState`, `action`) => [`EventHandlerResults`](../type-aliases/type-alias.EventHandlerResults.md)\< `T` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `prevState` | `T` |
| `action` | [`Action`](../type-aliases/type-alias.Action.md) \| [`CustomActionTemplate`](../type-aliases/type-alias.CustomActionTemplate.md)\< `string`, `any` \> |

#### Returns

[`EventHandlerResults`](../type-aliases/type-alias.EventHandlerResults.md)\< `T` \>

#### Source

[utils/dispatcher.ts:35](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L35)

***

### storeActions

> **`private`** **storeActions**: [`Action`](../type-aliases/type-alias.Action.md)[]

#### Source

[utils/dispatcher.ts:40](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L40)

***

### storeState

> **`private`** **storeState**: `T`

#### Source

[utils/dispatcher.ts:39](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L39)

## Methods

### actions

> **actions**(): [`Action`](../type-aliases/type-alias.Action.md)[]

Retrieves the list of actions applied to the Dispatcher's state.

#### Returns

[`Action`](../type-aliases/type-alias.Action.md)[]

The list of actions applied to the state.

#### Source

[utils/dispatcher.ts:71](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L71)

***

### dispatch

> **dispatch**(`action`): `void`

Dispatches an action to update the Dispatcher's state.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `action` | [`Action`](../type-aliases/type-alias.Action.md) \| [`CustomActionTemplate`](../type-aliases/type-alias.CustomActionTemplate.md)\< `string`, `any` \> | The action to dispatch. |

#### Returns

`void`

#### Source

[utils/dispatcher.ts:79](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L79)

***

### state

> **state**(): `T`

Retrieves the current state managed by the Dispatcher.

#### Returns

`T`

The current state of the Dispatcher.

#### Source

[utils/dispatcher.ts:63](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/utils/dispatcher.ts#L63)
