[**tradovate**](../README.md)

***

[API](../API.md) > Strategy

# Class: Strategy`<T, U>`

Represents a trading.

## Constructors

### constructor

> **new Strategy**<`T`, `U`>(
  `params`,
  `initState`,
  `next`): [`Strategy`](class.Strategy.md)\< `T`, `U` \>

Creates a new instance of the Strategy class.

#### Type parameters

| Parameter |
| :------ |
| `T` *extends* [`StrategyParams`](../interfaces/interface.StrategyParams.md) |
| `U` *extends* [`StrategyState`](../type-aliases/type-alias.StrategyState.md) |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `params` | `T` | The parameters for initializing the strategy. |
| `initState` | `U` | The initial state of the strategy. |
| `next` | (`prevState`, `action`) => [`EventHandlerResults`](../type-aliases/type-alias.EventHandlerResults.md)\< `U` \> | The function to handle and update the strategy state based on actions. |

#### Returns

[`Strategy`](class.Strategy.md)\< `T`, `U` \>

#### Source

[strategy/index.ts:48](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L48)

#### Throws

Throws an error if required parameters are missing in replay mode.

## Properties

### D

> **`private`** **D**: [`Dispatcher`](class.Dispatcher.md)\< `U` \>

#### Source

[strategy/index.ts:40](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L40)

***

### live

> **`private`** **live**: `boolean`

#### Source

[strategy/index.ts:34](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L34)

***

### mdSocket

> **`private`** **mdSocket**: [`MdSocket`](../interfaces/interface.MdSocket.md)

#### Source

[strategy/index.ts:31](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L31)

***

### model

> **`private`** **model**: `U` & \{
  `current_period`: `undefined` \| `number`;
 }

> #### `model.current_period`
>
> **current\_period**: `undefined` \| `number`
>
>

#### Source

[strategy/index.ts:33](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L33)

***

### props

> **`private`** **props**: `Required`\< `T` \>

#### Source

[strategy/index.ts:38](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L38)

***

### replayMode

> **`private`** **replayMode**: `boolean`

#### Source

[strategy/index.ts:36](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L36)

***

### replaySocket

> **replaySocket**?: [`ReplaySocket`](class.ReplaySocket.md)

#### Source

[strategy/index.ts:32](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L32)

***

### tvSocket

> **`private`** **tvSocket**: [`TvSocket`](../interfaces/interface.TvSocket.md)

#### Source

[strategy/index.ts:30](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L30)

## Methods

### catchReplaySessionsDefault

> **catchReplaySessionsDefault**(`prevState`, `action`): [`EventHandlerResults`](../type-aliases/type-alias.EventHandlerResults.md)\< `U` \>

Default implementation for handling replay sessions and clock events.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `prevState` | `U` | The previous state of the strategy. |
| `action` | [`Action`](../type-aliases/type-alias.Action.md) \| [`CustomActionTemplate`](../type-aliases/type-alias.CustomActionTemplate.md)\< `any`, `any` \> | The action to process. |

#### Returns

[`EventHandlerResults`](../type-aliases/type-alias.EventHandlerResults.md)\< `U` \>

An object containing the updated state and actions to perform.

#### Source

[strategy/index.ts:248](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L248)

***

### getRequestSocket

> **getRequestSocket**(): [`TvSocket`](../interfaces/interface.TvSocket.md)

Retrieves the request socket associated with the strategy.

#### Returns

[`TvSocket`](../interfaces/interface.TvSocket.md)

The request socket used for communication.

#### Source

[strategy/index.ts:239](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L239)

***

### nextReplayPeriod

> `private` **nextReplayPeriod**(): `Promise`\< `void` \>

#### Returns

`Promise`\< `void` \>

#### Source

[strategy/index.ts:115](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L115)

***

### replayModeSetup

> `private` **replayModeSetup**(): `Promise`\< `void` \>

#### Returns

`Promise`\< `void` \>

#### Source

[strategy/index.ts:122](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L122)

***

### runSideFx

> **runSideFx**(): `void`

Runs side effects based on the actions processed by the strategy.

#### Returns

`void`

#### Source

[strategy/index.ts:100](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L100)

***

### setupEventCatcher

> `private` **setupEventCatcher**(`socket`, `mdSocket`): `Promise`\< `void` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `socket` | [`TvSocket`](../interfaces/interface.TvSocket.md) |
| `mdSocket` | [`MdSocket`](../interfaces/interface.MdSocket.md) |

#### Returns

`Promise`\< `void` \>

#### Source

[strategy/index.ts:172](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/strategy/index.ts#L172)
