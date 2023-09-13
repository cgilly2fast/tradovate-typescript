[**tradovate**](../README.md)

---

[API](../API.md) > TradovateService

# Class: TradovateService

Provides functionality for making HTTP requests to the Tradovate REST API.

## Constructors

### constructor

> **new TradovateService**(): [`TradovateService`](class.TradovateService.md)

#### Returns

[`TradovateService`](class.TradovateService.md)

#### Source

[service/index.ts:27](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L27)

## Properties

### storage

> **`private`** **storage**: [`Storage`](class.Storage.md)

#### Source

[service/index.ts:25](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L25)

## Methods

### connect

> **connect**(`data`, `env` = `Environment.Demo`): `Promise`\< [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \>

Connects to the Tradovate API.

#### Parameters

| Parameter | Type                                                                             | Default value      | Description                         |
| :-------- | :------------------------------------------------------------------------------- | :----------------- | :---------------------------------- |
| `data`    | [`AccessTokenRequestBody`](../type-aliases/type-alias.AccessTokenRequestBody.md) | `undefined`        | The data for connecting to the API. |
| `env`     | [`Environment`](../enumerations/enumeration.Environment.md)                      | `Environment.Demo` | The environment (demo or live).     |

#### Returns

`Promise`\< [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \>

A promise that resolves to the response data.

#### Source

[service/index.ts:246](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L246)

---

### get

> **get**<`T`>(
> `endpoint`,
> `env` = `Environment.Demo`,
> `query`?): `Promise`\< [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \| [`EndpointResponse`](../type-aliases/type-alias.EndpointResponse.md)[`T`] \>

Makes a GET request to the Tradovate REST API.

#### Type parameters

| Parameter                                                                                              |
| :----------------------------------------------------------------------------------------------------- |
| `T` _extends_ _keyof_ [`GetEndpointQueryParams`](../type-aliases/type-alias.GetEndpointQueryParams.md) |

#### Parameters

| Parameter  | Type                                                                                  | Default value      | Description                              |
| :--------- | :------------------------------------------------------------------------------------ | :----------------- | :--------------------------------------- |
| `endpoint` | `T`                                                                                   | `undefined`        | The API endpoint to call.                |
| `env`      | [`Environment`](../enumerations/enumeration.Environment.md)                           | `Environment.Demo` | The environment (demo or live).          |
| `query`?   | [`GetEndpointQueryParams`](../type-aliases/type-alias.GetEndpointQueryParams.md)[`T`] | `undefined`        | The query parameters as key-value pairs. |

#### Returns

`Promise`\< [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \| [`EndpointResponse`](../type-aliases/type-alias.EndpointResponse.md)[`T`] \>

A promise that resolves to the response data.

#### Source

[service/index.ts:48](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L48)

#### Example

```typescript
// No parameters
const jsonResponseA = await tvGet('/account/list')

// With parameter object, URL will become '/contract/item?id=2287764'
const jsonResponseB = await tvGet('/contract/item', {id: 2287764})
```

---

### handleConnectRetry

> **handleConnectRetry**(`data`, `penaltyResponse`): `Promise`\< [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \>

Handles retrying a connection when a time penalty is present.

#### Parameters

| Parameter         | Type                                                                             | Description                         |
| :---------------- | :------------------------------------------------------------------------------- | :---------------------------------- |
| `data`            | [`AccessTokenRequestBody`](../type-aliases/type-alias.AccessTokenRequestBody.md) | The data for connecting to the API. |
| `penaltyResponse` | [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md)               | The response data.                  |

#### Returns

`Promise`\< [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \>

A promise that resolves to the response data.

#### Source

[service/index.ts:307](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L307)

---

### handleRenewRetry

> **handleRenewRetry**(`env`, `penaltyResponse`): `Promise`\< [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \| [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \>

Handles retrying an operation when a time penalty is present.

#### Parameters

| Parameter         | Type                                                               | Description                     |
| :---------------- | :----------------------------------------------------------------- | :------------------------------ |
| `env`             | [`Environment`](../enumerations/enumeration.Environment.md)        | The environment (demo or live). |
| `penaltyResponse` | [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) | The response data.              |

#### Returns

`Promise`\< [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \| [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \>

A promise that resolves to either PenaltyResponse or AccessTokenResponse.

#### Source

[service/index.ts:214](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L214)

---

### post

> **post**<`T`>(
> `endpoint`,
> `env` = `Environment.Demo`,
> `data`?,
> `usetoken`? = `true`): `Promise`\< [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \| [`EndpointResponse`](../type-aliases/type-alias.EndpointResponse.md)[`T`] \>

Makes a POST request to the Tradovate REST API.

#### Type parameters

| Parameter                                                                                              |
| :----------------------------------------------------------------------------------------------------- |
| `T` _extends_ _keyof_ [`PostEndpointBodyParams`](../type-aliases/type-alias.PostEndpointBodyParams.md) |

#### Parameters

| Parameter   | Type                                                                                  | Default value      | Description                                              |
| :---------- | :------------------------------------------------------------------------------------ | :----------------- | :------------------------------------------------------- |
| `endpoint`  | `T`                                                                                   | `undefined`        | The API endpoint to call.                                |
| `env`       | [`Environment`](../enumerations/enumeration.Environment.md)                           | `Environment.Demo` | The environment (demo or live).                          |
| `data`?     | [`PostEndpointBodyParams`](../type-aliases/type-alias.PostEndpointBodyParams.md)[`T`] | `undefined`        | The data to send in the request body as JSON.            |
| `usetoken`? | `boolean`                                                                             | `true`             | Indicates whether to use an access token in the request. |

#### Returns

`Promise`\< [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \| [`EndpointResponse`](../type-aliases/type-alias.EndpointResponse.md)[`T`] \>

A promise that resolves to the response data.

#### Source

[service/index.ts:114](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L114)

#### Example

```typescript
// Placing an order with tvPost
const jsonResponseC = await tvPost('/order/placeorder', {
    accountSpec: myAcct.name,
    accountId: myAcct.id,
    action: 'Buy',
    symbol: 'MNQM1',
    orderQty: 2,
    orderType: 'Market',
    isAutomated: true // Was this order placed by you or your robot?
})
```

---

### renewAccessToken

> **renewAccessToken**(`env` = `Environment.Demo`): `Promise`\< `undefined` \| [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \| [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \| \{
> `accessToken`: `undefined` \| `string`;
> `expirationTime`: `undefined` \| `string`;
> `name`: `any`;
> `userId`: `any`;
> } \>

Renews the stored access token.

#### Parameters

| Parameter | Type                                                        | Default value      | Description                                                                               |
| :-------- | :---------------------------------------------------------- | :----------------- | :---------------------------------------------------------------------------------------- |
| `env`     | [`Environment`](../enumerations/enumeration.Environment.md) | `Environment.Demo` | Indicates whether to renew the access token for the live environment or demo environment. |

#### Returns

`Promise`\< `undefined` \| [`AccessTokenResponse`](../type-aliases/type-alias.AccessTokenResponse.md) \| [`PenaltyResponse`](../type-aliases/type-alias.PenaltyResponse.md) \| \{
`accessToken`: `undefined` \| `string`;
`expirationTime`: `undefined` \| `string`;
`name`: `any`;
`userId`: `any`;
} \>

A promise that resolves to the renewed access token information.

#### Source

[service/index.ts:161](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/service/index.ts#L161)
