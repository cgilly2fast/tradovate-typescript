[**tradovate**](../README.md)

***

[API](../API.md) > Storage

# Class: Storage

Represents a storage utility class for managing user data and access tokens.

## Constructors

### constructor

> **new Storage**(): [`Storage`](class.Storage.md)

Initializes a new instance of the Storage class.

#### Returns

[`Storage`](class.Storage.md)

#### Source

[storage/index.ts:19](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L19)

## Properties

### accessToken

> **`private`** **accessToken**: `string`

#### Source

[storage/index.ts:12](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L12)

***

### accountId

> **`private`** **accountId**: `number`

#### Source

[storage/index.ts:9](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L9)

***

### availableAccounts

> **`private`** **availableAccounts**: [`Account`](../type-aliases/type-alias.Account.md)[]

#### Source

[storage/index.ts:8](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L8)

***

### deviceId

> **`private`** **deviceId**: `string`

#### Source

[storage/index.ts:7](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L7)

***

### expiration

> **`private`** **expiration**: `string`

#### Source

[storage/index.ts:14](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L14)

***

### mdAccessToken

> **`private`** **mdAccessToken**: `string`

#### Source

[storage/index.ts:13](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L13)

***

### spec

> **`private`** **spec**: `string`

#### Source

[storage/index.ts:10](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L10)

***

### userId

> **`private`** **userId**: `number`

#### Source

[storage/index.ts:11](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L11)

## Methods

### getAccessToken

> **getAccessToken**(): [`AccessToken`](../type-aliases/type-alias.AccessToken.md)

Gets the access token and its expiration date.

#### Returns

[`AccessToken`](../type-aliases/type-alias.AccessToken.md)

An AccessToken object.

#### Source

[storage/index.ts:111](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L111)

***

### getAvailableAccounts

> **getAvailableAccounts**(): [`Account`](../type-aliases/type-alias.Account.md)[]

Returns an array of available accounts or undefined.

#### Returns

[`Account`](../type-aliases/type-alias.Account.md)[]

An array of available accounts.

#### Source

[storage/index.ts:65](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L65)

***

### getCurrentAccount

> **getCurrentAccount**(): [`AccountMini`](../type-aliases/type-alias.AccountMini.md)

Returns the current account as an AccountMini object.

#### Returns

[`AccountMini`](../type-aliases/type-alias.AccountMini.md)

The current account as an AccountMini object.

#### Source

[storage/index.ts:73](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L73)

***

### getDeviceId

> **getDeviceId**(): `string`

Gets the device ID.

#### Returns

`string`

The device ID.

#### Source

[storage/index.ts:42](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L42)

***

### getMdAccessToken

> **getMdAccessToken**(): [`MdAccessToken`](../type-aliases/type-alias.MdAccessToken.md)

Gets the market data access token and its expiration date.

#### Returns

[`MdAccessToken`](../type-aliases/type-alias.MdAccessToken.md)

A MdAccessToken object.

#### Source

[storage/index.ts:126](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L126)

***

### getUserData

> **getUserData**(): `any`

Gets user data from the environment variable.

#### Returns

`any`

User data.

#### Source

[storage/index.ts:167](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L167)

***

### queryAvailableAccounts

> **queryAvailableAccounts**(`predicate`): `undefined` \| [`Account`](../type-aliases/type-alias.Account.md)

Uses a predicate function to find an account. May be undefined.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`account`) => `boolean` | A predicate function to filter accounts. |

#### Returns

`undefined` \| [`Account`](../type-aliases/type-alias.Account.md)

The first matching account or undefined.

#### Source

[storage/index.ts:86](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L86)

***

### setAccessToken

> **setAccessToken**(
  `token`,
  `md_token`,
  `expiration`): `void`

Sets the access tokens and expiration date.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The access token. |
| `md_token` | `string` | The market data access token. |
| `expiration` | `string` | The expiration date of the tokens. |

#### Returns

`void`

#### Source

[storage/index.ts:99](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L99)

#### Throws

Throws an error if either token or expiration is undefined.

***

### setAvailableAccounts

> **setAvailableAccounts**(`accounts`): `void`

Sets the available accounts.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `accounts` | [`Account`](../type-aliases/type-alias.Account.md)[] | An array of available accounts. |

#### Returns

`void`

#### Source

[storage/index.ts:51](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L51)

#### Throws

Throws an error if an empty array is passed.

***

### setDeviceId

> **setDeviceId**(`id`): `void`

Sets the device ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The device ID to set. |

#### Returns

`void`

#### Source

[storage/index.ts:34](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L34)

***

### setUserData

> **setUserData**(`data`): `void`

Sets user data as an environment variable.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | User data to be stored. |

#### Returns

`void`

#### Source

[storage/index.ts:159](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L159)

***

### tokenIsValid

> **tokenIsValid**(`expiration`): `boolean`

Checks if a token is valid based on its expiration date.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `expiration` | `string` | The expiration date of the token. |

#### Returns

`boolean`

A boolean indicating whether the token is valid.

#### Source

[storage/index.ts:142](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L142)

***

### tokenNearExpiry

> **tokenNearExpiry**(`expiration`): `boolean`

Checks if a token is near its expiry based on its expiration date.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `expiration` | `string` | The expiration date of the token. |

#### Returns

`boolean`

A boolean indicating whether the token is near its expiry.

#### Source

[storage/index.ts:151](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/storage/index.ts#L151)
