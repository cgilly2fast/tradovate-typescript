[**tradovate**](../README.md)

***

[API](../API.md) > RequestSocket

# Class: RequestSocket

## Implements

- [`Socket`](../interfaces/interface.Socket.md)

## Constructors

### constructor

> **new RequestSocket**(`url`): [`RequestSocket`](class.RequestSocket.md)

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `url` | [`URLs`](../enumerations/enumeration.URLs.md) |

#### Returns

[`RequestSocket`](class.RequestSocket.md)

#### Source

[websockets/RequestSocket.ts:22](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L22)

## Properties

### counter

> **`private`** **counter**: `number`

#### Source

[websockets/RequestSocket.ts:16](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L16)

***

### curTime

> **`private`** **curTime**: `Date`

#### Source

[websockets/RequestSocket.ts:19](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L19)

***

### listeners

> **`private`** **listeners**: [`Listener`](../type-aliases/type-alias.Listener.md)[]

#### Source

[websockets/RequestSocket.ts:20](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L20)

***

### listeningURL

> **`private`** **listeningURL**: `string`

#### Source

[websockets/RequestSocket.ts:18](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L18)

***

### ws

> **`private`** **ws**: `WebSocket`

#### Source

[websockets/RequestSocket.ts:17](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L17)

## Methods

### addListener

> **addListener**(`listener`): () => [`Listener`](../type-aliases/type-alias.Listener.md)[]

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `listener` | (`item`) => `void` |

#### Returns

> > (): [`Listener`](../type-aliases/type-alias.Listener.md)[]
>
> ##### Returns
>
> [`Listener`](../type-aliases/type-alias.Listener.md)[]
>
>
>
> ##### Source
>
> [websockets/RequestSocket.ts:97](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L97)

#### Source

[websockets/RequestSocket.ts:95](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L95)

***

### checkHeartbeats

> `private` **checkHeartbeats**(): `void`

#### Returns

`void`

#### Source

[websockets/RequestSocket.ts:39](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L39)

***

### connect

> **connect**(): `Promise`\< `void` \>

#### Returns

`Promise`\< `void` \>

#### Implementation of

[`Socket`](../interfaces/interface.Socket.md).[`connect`](../interfaces/interface.Socket.md#connect)

#### Source

[websockets/RequestSocket.ts:100](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L100)

***

### dataToListeners

> `private` **dataToListeners**(`data`): `void`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `data` | `any`[] |

#### Returns

`void`

#### Source

[websockets/RequestSocket.ts:64](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L64)

***

### disconnect

> **disconnect**(): `void`

#### Returns

`void`

#### Implementation of

[`Socket`](../interfaces/interface.Socket.md).[`disconnect`](../interfaces/interface.Socket.md#disconnect)

#### Source

[websockets/RequestSocket.ts:78](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L78)

***

### getListeningUrl

> **getListeningUrl**(): `string`

#### Returns

`string`

#### Source

[websockets/RequestSocket.ts:68](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L68)

***

### getToken

> `private` **getToken**(): `string`

#### Returns

`string`

#### Source

[websockets/RequestSocket.ts:58](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L58)

***

### increment

> `private` **increment**(): `number`

#### Returns

`number`

#### Source

[websockets/RequestSocket.ts:54](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L54)

***

### isConnected

> **isConnected**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`Socket`](../interfaces/interface.Socket.md).[`isConnected`](../interfaces/interface.Socket.md#isconnected)

#### Source

[websockets/RequestSocket.ts:85](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L85)

***

### prepareMessage

> `private` **prepareMessage**(`raw`): `object`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `raw` | `Data` |

#### Returns

##### `T`

**T**: `string` \| `ArrayBuffer` \| `Buffer`[]

##### `data`

**data**: `any`

#### Source

[websockets/RequestSocket.ts:30](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L30)

***

### removeListeners

> **removeListeners**(): `void`

#### Returns

`void`

#### Source

[websockets/RequestSocket.ts:72](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L72)

***

### request

> **request**<`T`>(`params`): `Promise`\< [`ResponseMsg`](../type-aliases/type-alias.ResponseMsg.md)\< `T` \> \>

#### Type parameters

| Parameter |
| :------ |
| `T` *extends* `"md/getchart"` \| `"md/subscribehistogram"` \| `"md/subscribequote"` \| `"md/subscribedom"` \| `"md/unsubscribehistogram"` \| `"md/unsubscribequote"` \| `"md/unsubscribedom"` \| `"md/cancelchart"` \| `"authorize"` \| `"auth/me"` \| `"auth/oauthtoken"` \| `"auth/accesstokenrequest"` \| `"auth/renewaccesstoken"` \| `"contract/deps"` \| `"contract/find"` \| `"contract/getproductfeeparams"` \| `"contract/item"` \| `"contract/items"` \| `"contract/ldeps"` \| `"contract/rollcontract"` \| `"contract/suggest"` \| `"contractGroup/find"` \| `"contractGroup/item"` \| `"contractGroup/items"` \| `"contractGroup/list"` \| `"contractGroup/suggest"` \| `"contractMaturity/deps"` \| `"contractMaturity/item"` \| `"contractMaturity/items"` \| `"contractMaturity/ldeps"` \| `"currency/find"` \| `"currency/item"` \| `"currency/items"` \| `"currency/list"` \| `"currency/suggest"` \| `"currencyRate/deps"` \| `"currencyRate/item"` \| `"currencyRate/items"` \| `"currencyRate/ldeps"` \| `"currencyRate/list"` \| `"exchange/find"` \| `"exchange/item"` \| `"exchange/items"` \| `"exchange/list"` \| `"exchange/suggest"` \| `"product/deps"` \| `"product/find"` \| `"product/item"` \| `"product/items"` \| `"product/ldeps"` \| `"product/list"` \| `"product/suggest"` \| `"productSession/deps"` \| `"productSession/item"` \| `"productSession/items"` \| `"productSession/ldeps"` \| `"spreadDefinition/item"` \| `"spreadDefinition/items"` \| `"accountRiskStatus/deps"` \| `"accountRiskStatus/item"` \| `"accountRiskStatus/items"` \| `"accountRiskStatus/ldeps"` \| `"accountRiskStatus/list"` \| `"contractMargin/deps"` \| `"contractMargin/item"` \| `"contractMargin/items"` \| `"contractMargin/ldeps"` \| `"productMargin/deps"` \| `"productMargin/item"` \| `"productMargin/items"` \| `"productMargin/ldeps"` \| `"productMargin/list"` \| `"userAccountAutoLiq/create"` \| `"userAccountAutoLiq/deps"` \| `"userAccountAutoLiq/item"` \| `"userAccountAutoLiq/items"` \| `"userAccountAutoLiq/ldeps"` \| `"userAccountAutoLiq/list"` \| `"userAccountAutoLiq/update"` \| `"userAccountPositionLimit/create"` \| `"userAccountPositionLimit/deps"` \| `"userAccountPositionLimit/item"` \| `"userAccountPositionLimit/items"` \| `"userAccountPositionLimit/ldeps"` \| `"userAccountPositionLimit/update"` \| `"userAccountRiskParameter/create"` \| `"userAccountRiskParameter/deps"` \| `"userAccountRiskParameter/item"` \| `"userAccountRiskParameter/items"` \| `"userAccountRiskParameter/ldeps"` \| `"userAccountRiskParameter/update"` \| `"command/deps"` \| `"command/item"` \| `"command/items"` \| `"command/ldeps"` \| `"command/list"` \| `"commandReport/deps"` \| `"commandReport/item"` \| `"commandReport/items"` \| `"commandReport/ldeps"` \| `"commandReport/list"` \| `"executionReport/deps"` \| `"executionReport/find"` \| `"executionReport/item"` \| `"executionReport/items"` \| `"executionReport/ldeps"` \| `"executionReport/list"` \| `"executionReport/suggest"` \| `"fill/deps"` \| `"fill/item"` \| `"fill/items"` \| `"fill/ldeps"` \| `"fill/list"` \| `"fillFee/deps"` \| `"fillFee/item"` \| `"fillFee/items"` \| `"fillFee/ldeps"` \| `"fillFee/list"` \| `"order/deps"` \| `"order/item"` \| `"order/items"` \| `"order/ldeps"` \| `"order/liquidatePosition"` \| `"order/list"` \| `"order/modifyorder"` \| `"order/placeoco"` \| `"order/placeoso"` \| `"orderStrategy/deps"` \| `"orderStrategy/interruptOrderStrategy"` \| `"orderStrategy/item"` \| `"orderStrategy/items"` \| `"orderStrategy/ldeps"` \| `"orderStrategy/list"` \| `"orderStrategy/startOrderStrategy"` \| `"orderStrategyLink/deps"` \| `"orderStrategyLink/item"` \| `"orderStrategyLink/items"` \| `"orderStrategyLink/ldeps"` \| `"orderStrategyLink/list"` \| `"orderVersion/deps"` \| `"orderVersion/item"` \| `"orderVersion/items"` \| `"orderVersion/ldeps"` \| `"orderVersion/list"` \| `"fillPair/deps"` \| `"fillPair/item"` \| `"fillPair/items"` \| `"fillPair/ldeps"` \| `"fillPair/list"` \| `"position/deps"` \| `"position/find"` \| `"position/item"` \| `"position/items"` \| `"position/ldeps"` \| `"position/list"` \| `"account/deps"` \| `"account/find"` \| `"account/item"` \| `"account/items"` \| `"account/ldeps"` \| `"account/list"` \| `"account/suggest"` \| `"cashBalance/deps"` \| `"cashBalance/getcashbalancesnapshot"` \| `"cashBalance/item"` \| `"cashBalance/items"` \| `"cashBalance/ldeps"` \| `"cashBalance/list"` \| `"cashBalanceLog/deps"` \| `"cashBalanceLog/item"` \| `"cashBalanceLog/items"` \| `"cashBalanceLog/ldeps"` \| `"marginSnapshot/deps"` \| `"marginSnapshot/item"` \| `"marginSnapshot/items"` \| `"marginSnapshot/ldeps"` \| `"marginSnapshot/list"` \| `"tradingPermission/deps"` \| `"tradingPermission/item"` \| `"tradingPermission/items"` \| `"tradingPermission/ldeps"` \| `"tradingPermission/list"` \| `"marketDataSubscriptionExchangeScope/find"` \| `"marketDataSubscriptionExchangeScope/item"` \| `"marketDataSubscriptionExchangeScope/items"` \| `"marketDataSubscriptionExchangeScope/list"` \| `"marketDataSubscriptionExchangeScope/suggest"` \| `"marketDataSubscriptionPlan/find"` \| `"marketDataSubscriptionPlan/item"` \| `"marketDataSubscriptionPlan/items"` \| `"marketDataSubscriptionPlan/list"` \| `"marketDataSubscriptionPlan/suggest"` \| `"tradovateSubscriptionPlan/find"` \| `"tradovateSubscriptionPlan/item"` \| `"tradovateSubscriptionPlan/items"` \| `"tradovateSubscriptionPlan/list"` \| `"tradovateSubscriptionPlan/suggest"` \| `"replay/changespeed"` \| `"replay/checkreplaysession"` \| `"replay/initializeclock"` \| `"adminAlertSignal/completealertsignal"` \| `"adminAlert/deps"` \| `"adminAlert/item"` \| `"adminAlert/items"` \| `"adminAlert/ldeps"` \| `"adminAlert/list"` \| `"adminAlertSignal/takealertsignalownership"` \| `"alert/createalert"` \| `"alert/deps"` \| `"alert/item"` \| `"alert/items"` \| `"alert/ldeps"` \| `"alert/list"` \| `"alert/markreadalertsignal"` \| `"alert/modifyalert"` \| `"alert/resetalert"` \| `"alertSignal/deps"` \| `"alertSignal/item"` \| `"alertSignal/items"` \| `"alertSignal/ldeps"` \| `"alertSignal/list"` \| `"adminAlertSignal/deps"` \| `"adminAlertSignal/item"` \| `"adminAlertSignal/items"` \| `"adminAlertSignal/ldeps"` \| `"adminAlertSignal/list"` \| `"clearingHouse/deps"` \| `"clearingHouse/item"` \| `"clearingHouse/items"` \| `"clearingHouse/list"` \| `"clearingHouse/suggest"` \| `"entitlement/item"` \| `"entitlement/items"` \| `"entitlement/list"` \| `"orderStrategyType/find"` \| `"orderStrategyType/item"` \| `"orderStrategyType/items"` \| `"orderStrategyType/list"` \| `"orderStrategyType/suggest"` \| `"property/find"` \| `"property/item"` \| `"property/items"` \| `"property/list"` \| `"property/suggest"` \| `"contactInfo/deps"` \| `"contactInfo/item"` \| `"contactInfo/items"` \| `"contactInfo/ldeps"` \| `"marketDataSubscription/create"` \| `"marketDataSubscription/deps"` \| `"marketDataSubscription/item"` \| `"marketDataSubscription/items"` \| `"marketDataSubscription/ldeps"` \| `"marketDataSubscription/list"` \| `"marketDataSubscription/update"` \| `"organization/find"` \| `"organization/item"` \| `"organization/items"` \| `"organization/list"` \| `"organization/suggest"` \| `"secondMarketDataSubscription/deps"` \| `"secondMarketDataSubscription/item"` \| `"secondMarketDataSubscription/items"` \| `"secondMarketDataSubscription/ldeps"` \| `"secondMarketDataSubscription/list"` \| `"tradovateSubscription/create"` \| `"tradovateSubscription/deps"` \| `"tradovateSubscription/item"` \| `"tradovateSubscription/items"` \| `"tradovateSubscription/ldeps"` \| `"tradovateSubscription/list"` \| `"tradovateSubscription/update"` \| `"user/find"` \| `"user/getaccounttradingpermissions"` \| `"user/item"` \| `"user/items"` \| `"user/list"` \| `"user/suggest"` \| `"user/syncrequest"` \| `"userPlugin/create"` \| `"userPlugin/deps"` \| `"userPlugin/item"` \| `"userPlugin/items"` \| `"userPlugin/ldeps"` \| `"userPlugin/list"` \| `"userPlugin/update"` \| `"userProperty/deps"` \| `"userProperty/item"` \| `"userProperty/items"` \| `"userProperty/ldeps"` \| `"userSession/item"` \| `"userSession/items"` \| `"userSessionStats/deps"` \| `"userSessionStats/item"` \| `"userSessionStats/items"` \| `"userSessionStats/ldeps"` \| `"userSessionStats/list"` \| `"chat/closechat"` \| `"chat/deps"` \| `"chat/item"` \| `"chat/items"` \| `"chat/ldeps"` \| `"chat/list"` \| `"chat/markasreadchatmessage"` \| `"chat/postchatmessage"` \| `"chatMessage/deps"` \| `"chatMessage/item"` \| `"chatMessage/items"` \| `"chatMessage/ldeps"` \| `"userAccountPositionLimit/deleteuseraccountpositionlimit"` \| `"userAccountPositionLimit/deleteuseraccountriskparameter"` \| `"user/accepttradingpermission"` \| `"user/activatesecondmarketdatasubscriptionrenewal"` \| `"user/addmarketdatasubscription"` \| `"user/addsecondmarketdatasubscription"` \| `"user/addtradovatesubscription"` \| `"user/cancelsecondmarketdatasubscription"` \| `"user/cancelsecondmarketdatasubscriptionrenewal"` \| `"user/canceltradovatesubscription"` \| `"user/modifycredentials"` \| `"user/modifyemailaddress"` \| `"user/modifypassword"` \| `"user/opendemoaccount"` \| `"user/requesttradingpermission"` \| `"user/revoketradingpermission"` \| `"user/signuporganizationmember"` \| `"user/addentitlementsubscription"` \| `"user/changepluginpermission"` |

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `params` | [`RequestParams`](../type-aliases/type-alias.RequestParams.md)\< `T` \> |

#### Returns

`Promise`\< [`ResponseMsg`](../type-aliases/type-alias.ResponseMsg.md)\< `T` \> \>

#### Source

[websockets/RequestSocket.ts:146](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L146)

***

### setCurTime

> `private` **setCurTime**(`t`): `void`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `t` | `Date` |

#### Returns

`void`

#### Source

[websockets/RequestSocket.ts:50](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/RequestSocket.ts#L50)
