[**tradovate**](../README.md)

***

[API](../API.md) > MarketDataSocket

# Class: MarketDataSocket

## Implements

- [`MdSocket`](../interfaces/interface.MdSocket.md)

## Constructors

### constructor

> **new MarketDataSocket**(`socket`?): [`MarketDataSocket`](class.MarketDataSocket.md)

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `socket`? | [`RequestSocket`](class.RequestSocket.md) |

#### Returns

[`MarketDataSocket`](class.MarketDataSocket.md)

#### Source

[websockets/MarketDataSocket.ts:38](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L38)

## Properties

### socket

> **`private`** **socket**: [`RequestSocket`](class.RequestSocket.md)

#### Source

[websockets/MarketDataSocket.ts:31](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L31)

***

### subscribeCancelMap

> **`private`** **subscribeCancelMap**: `Record`\< `string`, `"md/getchart"` \| `"md/subscribehistogram"` \| `"md/subscribequote"` \| `"md/subscribedom"` \| `"md/unsubscribehistogram"` \| `"md/unsubscribequote"` \| `"md/unsubscribedom"` \| `"md/cancelchart"` \| `"authorize"` \| `"auth/me"` \| `"auth/oauthtoken"` \| `"auth/accesstokenrequest"` \| `"auth/renewaccesstoken"` \| `"contract/deps"` \| `"contract/find"` \| `"contract/getproductfeeparams"` \| `"contract/item"` \| `"contract/items"` \| `"contract/ldeps"` \| `"contract/rollcontract"` \| `"contract/suggest"` \| `"contractGroup/find"` \| `"contractGroup/item"` \| `"contractGroup/items"` \| `"contractGroup/list"` \| `"contractGroup/suggest"` \| `"contractMaturity/deps"` \| `"contractMaturity/item"` \| `"contractMaturity/items"` \| `"contractMaturity/ldeps"` \| `"currency/find"` \| `"currency/item"` \| `"currency/items"` \| `"currency/list"` \| `"currency/suggest"` \| `"currencyRate/deps"` \| `"currencyRate/item"` \| `"currencyRate/items"` \| `"currencyRate/ldeps"` \| `"currencyRate/list"` \| `"exchange/find"` \| `"exchange/item"` \| `"exchange/items"` \| `"exchange/list"` \| `"exchange/suggest"` \| `"product/deps"` \| `"product/find"` \| `"product/item"` \| `"product/items"` \| `"product/ldeps"` \| `"product/list"` \| `"product/suggest"` \| `"productSession/deps"` \| `"productSession/item"` \| `"productSession/items"` \| `"productSession/ldeps"` \| `"spreadDefinition/item"` \| `"spreadDefinition/items"` \| `"accountRiskStatus/deps"` \| `"accountRiskStatus/item"` \| `"accountRiskStatus/items"` \| `"accountRiskStatus/ldeps"` \| `"accountRiskStatus/list"` \| `"contractMargin/deps"` \| `"contractMargin/item"` \| `"contractMargin/items"` \| `"contractMargin/ldeps"` \| `"productMargin/deps"` \| `"productMargin/item"` \| `"productMargin/items"` \| `"productMargin/ldeps"` \| `"productMargin/list"` \| `"userAccountAutoLiq/create"` \| `"userAccountAutoLiq/deps"` \| `"userAccountAutoLiq/item"` \| `"userAccountAutoLiq/items"` \| `"userAccountAutoLiq/ldeps"` \| `"userAccountAutoLiq/list"` \| `"userAccountAutoLiq/update"` \| `"userAccountPositionLimit/create"` \| `"userAccountPositionLimit/deps"` \| `"userAccountPositionLimit/item"` \| `"userAccountPositionLimit/items"` \| `"userAccountPositionLimit/ldeps"` \| `"userAccountPositionLimit/update"` \| `"userAccountRiskParameter/create"` \| `"userAccountRiskParameter/deps"` \| `"userAccountRiskParameter/item"` \| `"userAccountRiskParameter/items"` \| `"userAccountRiskParameter/ldeps"` \| `"userAccountRiskParameter/update"` \| `"command/deps"` \| `"command/item"` \| `"command/items"` \| `"command/ldeps"` \| `"command/list"` \| `"commandReport/deps"` \| `"commandReport/item"` \| `"commandReport/items"` \| `"commandReport/ldeps"` \| `"commandReport/list"` \| `"executionReport/deps"` \| `"executionReport/find"` \| `"executionReport/item"` \| `"executionReport/items"` \| `"executionReport/ldeps"` \| `"executionReport/list"` \| `"executionReport/suggest"` \| `"fill/deps"` \| `"fill/item"` \| `"fill/items"` \| `"fill/ldeps"` \| `"fill/list"` \| `"fillFee/deps"` \| `"fillFee/item"` \| `"fillFee/items"` \| `"fillFee/ldeps"` \| `"fillFee/list"` \| `"order/deps"` \| `"order/item"` \| `"order/items"` \| `"order/ldeps"` \| `"order/liquidatePosition"` \| `"order/list"` \| `"order/modifyorder"` \| `"order/placeoco"` \| `"order/placeoso"` \| `"orderStrategy/deps"` \| `"orderStrategy/interruptOrderStrategy"` \| `"orderStrategy/item"` \| `"orderStrategy/items"` \| `"orderStrategy/ldeps"` \| `"orderStrategy/list"` \| `"orderStrategy/startOrderStrategy"` \| `"orderStrategyLink/deps"` \| `"orderStrategyLink/item"` \| `"orderStrategyLink/items"` \| `"orderStrategyLink/ldeps"` \| `"orderStrategyLink/list"` \| `"orderVersion/deps"` \| `"orderVersion/item"` \| `"orderVersion/items"` \| `"orderVersion/ldeps"` \| `"orderVersion/list"` \| `"fillPair/deps"` \| `"fillPair/item"` \| `"fillPair/items"` \| `"fillPair/ldeps"` \| `"fillPair/list"` \| `"position/deps"` \| `"position/find"` \| `"position/item"` \| `"position/items"` \| `"position/ldeps"` \| `"position/list"` \| `"account/deps"` \| `"account/find"` \| `"account/item"` \| `"account/items"` \| `"account/ldeps"` \| `"account/list"` \| `"account/suggest"` \| `"cashBalance/deps"` \| `"cashBalance/getcashbalancesnapshot"` \| `"cashBalance/item"` \| `"cashBalance/items"` \| `"cashBalance/ldeps"` \| `"cashBalance/list"` \| `"cashBalanceLog/deps"` \| `"cashBalanceLog/item"` \| `"cashBalanceLog/items"` \| `"cashBalanceLog/ldeps"` \| `"marginSnapshot/deps"` \| `"marginSnapshot/item"` \| `"marginSnapshot/items"` \| `"marginSnapshot/ldeps"` \| `"marginSnapshot/list"` \| `"tradingPermission/deps"` \| `"tradingPermission/item"` \| `"tradingPermission/items"` \| `"tradingPermission/ldeps"` \| `"tradingPermission/list"` \| `"marketDataSubscriptionExchangeScope/find"` \| `"marketDataSubscriptionExchangeScope/item"` \| `"marketDataSubscriptionExchangeScope/items"` \| `"marketDataSubscriptionExchangeScope/list"` \| `"marketDataSubscriptionExchangeScope/suggest"` \| `"marketDataSubscriptionPlan/find"` \| `"marketDataSubscriptionPlan/item"` \| `"marketDataSubscriptionPlan/items"` \| `"marketDataSubscriptionPlan/list"` \| `"marketDataSubscriptionPlan/suggest"` \| `"tradovateSubscriptionPlan/find"` \| `"tradovateSubscriptionPlan/item"` \| `"tradovateSubscriptionPlan/items"` \| `"tradovateSubscriptionPlan/list"` \| `"tradovateSubscriptionPlan/suggest"` \| `"replay/changespeed"` \| `"replay/checkreplaysession"` \| `"replay/initializeclock"` \| `"adminAlertSignal/completealertsignal"` \| `"adminAlert/deps"` \| `"adminAlert/item"` \| `"adminAlert/items"` \| `"adminAlert/ldeps"` \| `"adminAlert/list"` \| `"adminAlertSignal/takealertsignalownership"` \| `"alert/createalert"` \| `"alert/deps"` \| `"alert/item"` \| `"alert/items"` \| `"alert/ldeps"` \| `"alert/list"` \| `"alert/markreadalertsignal"` \| `"alert/modifyalert"` \| `"alert/resetalert"` \| `"alertSignal/deps"` \| `"alertSignal/item"` \| `"alertSignal/items"` \| `"alertSignal/ldeps"` \| `"alertSignal/list"` \| `"adminAlertSignal/deps"` \| `"adminAlertSignal/item"` \| `"adminAlertSignal/items"` \| `"adminAlertSignal/ldeps"` \| `"adminAlertSignal/list"` \| `"clearingHouse/deps"` \| `"clearingHouse/item"` \| `"clearingHouse/items"` \| `"clearingHouse/list"` \| `"clearingHouse/suggest"` \| `"entitlement/item"` \| `"entitlement/items"` \| `"entitlement/list"` \| `"orderStrategyType/find"` \| `"orderStrategyType/item"` \| `"orderStrategyType/items"` \| `"orderStrategyType/list"` \| `"orderStrategyType/suggest"` \| `"property/find"` \| `"property/item"` \| `"property/items"` \| `"property/list"` \| `"property/suggest"` \| `"contactInfo/deps"` \| `"contactInfo/item"` \| `"contactInfo/items"` \| `"contactInfo/ldeps"` \| `"marketDataSubscription/create"` \| `"marketDataSubscription/deps"` \| `"marketDataSubscription/item"` \| `"marketDataSubscription/items"` \| `"marketDataSubscription/ldeps"` \| `"marketDataSubscription/list"` \| `"marketDataSubscription/update"` \| `"organization/find"` \| `"organization/item"` \| `"organization/items"` \| `"organization/list"` \| `"organization/suggest"` \| `"secondMarketDataSubscription/deps"` \| `"secondMarketDataSubscription/item"` \| `"secondMarketDataSubscription/items"` \| `"secondMarketDataSubscription/ldeps"` \| `"secondMarketDataSubscription/list"` \| `"tradovateSubscription/create"` \| `"tradovateSubscription/deps"` \| `"tradovateSubscription/item"` \| `"tradovateSubscription/items"` \| `"tradovateSubscription/ldeps"` \| `"tradovateSubscription/list"` \| `"tradovateSubscription/update"` \| `"user/find"` \| `"user/getaccounttradingpermissions"` \| `"user/item"` \| `"user/items"` \| `"user/list"` \| `"user/suggest"` \| `"user/syncrequest"` \| `"userPlugin/create"` \| `"userPlugin/deps"` \| `"userPlugin/item"` \| `"userPlugin/items"` \| `"userPlugin/ldeps"` \| `"userPlugin/list"` \| `"userPlugin/update"` \| `"userProperty/deps"` \| `"userProperty/item"` \| `"userProperty/items"` \| `"userProperty/ldeps"` \| `"userSession/item"` \| `"userSession/items"` \| `"userSessionStats/deps"` \| `"userSessionStats/item"` \| `"userSessionStats/items"` \| `"userSessionStats/ldeps"` \| `"userSessionStats/list"` \| `"chat/closechat"` \| `"chat/deps"` \| `"chat/item"` \| `"chat/items"` \| `"chat/ldeps"` \| `"chat/list"` \| `"chat/markasreadchatmessage"` \| `"chat/postchatmessage"` \| `"chatMessage/deps"` \| `"chatMessage/item"` \| `"chatMessage/items"` \| `"chatMessage/ldeps"` \| `"userAccountPositionLimit/deleteuseraccountpositionlimit"` \| `"userAccountPositionLimit/deleteuseraccountriskparameter"` \| `"user/accepttradingpermission"` \| `"user/activatesecondmarketdatasubscriptionrenewal"` \| `"user/addmarketdatasubscription"` \| `"user/addsecondmarketdatasubscription"` \| `"user/addtradovatesubscription"` \| `"user/cancelsecondmarketdatasubscription"` \| `"user/cancelsecondmarketdatasubscriptionrenewal"` \| `"user/canceltradovatesubscription"` \| `"user/modifycredentials"` \| `"user/modifyemailaddress"` \| `"user/modifypassword"` \| `"user/opendemoaccount"` \| `"user/requesttradingpermission"` \| `"user/revoketradingpermission"` \| `"user/signuporganizationmember"` \| `"user/addentitlementsubscription"` \| `"user/changepluginpermission"` \>

#### Source

[websockets/MarketDataSocket.ts:36](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L36)

***

### subscriptions

> **`private`** **subscriptions**: \{
  `dispose`: () => `Promise`\< `void` \>;
  `symbol`: `string` \| `number`;
 }[]

#### Source

[websockets/MarketDataSocket.ts:32](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L32)

## Methods

### connect

> **connect**(): `Promise`\< `void` \>

#### Returns

`Promise`\< `void` \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`connect`](../interfaces/interface.MdSocket.md#connect)

#### Source

[websockets/MarketDataSocket.ts:49](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L49)

***

### disconnect

> **disconnect**(): `Promise`\< `void` \>

#### Returns

`Promise`\< `void` \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`disconnect`](../interfaces/interface.MdSocket.md#disconnect)

#### Source

[websockets/MarketDataSocket.ts:53](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L53)

***

### disposeSubscriptions

> **disposeSubscriptions**(): `void`

#### Returns

`void`

#### Source

[websockets/MarketDataSocket.ts:188](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L188)

***

### isConnected

> **isConnected**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`isConnected`](../interfaces/interface.MdSocket.md#isconnected)

#### Source

[websockets/MarketDataSocket.ts:64](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L64)

***

### isSubscribeUrl

> **isSubscribeUrl**(`url`): `boolean`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `url` | `"md/getchart"` \| `"md/subscribehistogram"` \| `"md/subscribequote"` \| `"md/subscribedom"` \| `"md/unsubscribehistogram"` \| `"md/unsubscribequote"` \| `"md/unsubscribedom"` \| `"md/cancelchart"` \| `"authorize"` \| `"auth/me"` \| `"auth/oauthtoken"` \| `"auth/accesstokenrequest"` \| `"auth/renewaccesstoken"` \| `"contract/deps"` \| `"contract/find"` \| `"contract/getproductfeeparams"` \| `"contract/item"` \| `"contract/items"` \| `"contract/ldeps"` \| `"contract/rollcontract"` \| `"contract/suggest"` \| `"contractGroup/find"` \| `"contractGroup/item"` \| `"contractGroup/items"` \| `"contractGroup/list"` \| `"contractGroup/suggest"` \| `"contractMaturity/deps"` \| `"contractMaturity/item"` \| `"contractMaturity/items"` \| `"contractMaturity/ldeps"` \| `"currency/find"` \| `"currency/item"` \| `"currency/items"` \| `"currency/list"` \| `"currency/suggest"` \| `"currencyRate/deps"` \| `"currencyRate/item"` \| `"currencyRate/items"` \| `"currencyRate/ldeps"` \| `"currencyRate/list"` \| `"exchange/find"` \| `"exchange/item"` \| `"exchange/items"` \| `"exchange/list"` \| `"exchange/suggest"` \| `"product/deps"` \| `"product/find"` \| `"product/item"` \| `"product/items"` \| `"product/ldeps"` \| `"product/list"` \| `"product/suggest"` \| `"productSession/deps"` \| `"productSession/item"` \| `"productSession/items"` \| `"productSession/ldeps"` \| `"spreadDefinition/item"` \| `"spreadDefinition/items"` \| `"accountRiskStatus/deps"` \| `"accountRiskStatus/item"` \| `"accountRiskStatus/items"` \| `"accountRiskStatus/ldeps"` \| `"accountRiskStatus/list"` \| `"contractMargin/deps"` \| `"contractMargin/item"` \| `"contractMargin/items"` \| `"contractMargin/ldeps"` \| `"productMargin/deps"` \| `"productMargin/item"` \| `"productMargin/items"` \| `"productMargin/ldeps"` \| `"productMargin/list"` \| `"userAccountAutoLiq/create"` \| `"userAccountAutoLiq/deps"` \| `"userAccountAutoLiq/item"` \| `"userAccountAutoLiq/items"` \| `"userAccountAutoLiq/ldeps"` \| `"userAccountAutoLiq/list"` \| `"userAccountAutoLiq/update"` \| `"userAccountPositionLimit/create"` \| `"userAccountPositionLimit/deps"` \| `"userAccountPositionLimit/item"` \| `"userAccountPositionLimit/items"` \| `"userAccountPositionLimit/ldeps"` \| `"userAccountPositionLimit/update"` \| `"userAccountRiskParameter/create"` \| `"userAccountRiskParameter/deps"` \| `"userAccountRiskParameter/item"` \| `"userAccountRiskParameter/items"` \| `"userAccountRiskParameter/ldeps"` \| `"userAccountRiskParameter/update"` \| `"command/deps"` \| `"command/item"` \| `"command/items"` \| `"command/ldeps"` \| `"command/list"` \| `"commandReport/deps"` \| `"commandReport/item"` \| `"commandReport/items"` \| `"commandReport/ldeps"` \| `"commandReport/list"` \| `"executionReport/deps"` \| `"executionReport/find"` \| `"executionReport/item"` \| `"executionReport/items"` \| `"executionReport/ldeps"` \| `"executionReport/list"` \| `"executionReport/suggest"` \| `"fill/deps"` \| `"fill/item"` \| `"fill/items"` \| `"fill/ldeps"` \| `"fill/list"` \| `"fillFee/deps"` \| `"fillFee/item"` \| `"fillFee/items"` \| `"fillFee/ldeps"` \| `"fillFee/list"` \| `"order/deps"` \| `"order/item"` \| `"order/items"` \| `"order/ldeps"` \| `"order/liquidatePosition"` \| `"order/list"` \| `"order/modifyorder"` \| `"order/placeoco"` \| `"order/placeoso"` \| `"orderStrategy/deps"` \| `"orderStrategy/interruptOrderStrategy"` \| `"orderStrategy/item"` \| `"orderStrategy/items"` \| `"orderStrategy/ldeps"` \| `"orderStrategy/list"` \| `"orderStrategy/startOrderStrategy"` \| `"orderStrategyLink/deps"` \| `"orderStrategyLink/item"` \| `"orderStrategyLink/items"` \| `"orderStrategyLink/ldeps"` \| `"orderStrategyLink/list"` \| `"orderVersion/deps"` \| `"orderVersion/item"` \| `"orderVersion/items"` \| `"orderVersion/ldeps"` \| `"orderVersion/list"` \| `"fillPair/deps"` \| `"fillPair/item"` \| `"fillPair/items"` \| `"fillPair/ldeps"` \| `"fillPair/list"` \| `"position/deps"` \| `"position/find"` \| `"position/item"` \| `"position/items"` \| `"position/ldeps"` \| `"position/list"` \| `"account/deps"` \| `"account/find"` \| `"account/item"` \| `"account/items"` \| `"account/ldeps"` \| `"account/list"` \| `"account/suggest"` \| `"cashBalance/deps"` \| `"cashBalance/getcashbalancesnapshot"` \| `"cashBalance/item"` \| `"cashBalance/items"` \| `"cashBalance/ldeps"` \| `"cashBalance/list"` \| `"cashBalanceLog/deps"` \| `"cashBalanceLog/item"` \| `"cashBalanceLog/items"` \| `"cashBalanceLog/ldeps"` \| `"marginSnapshot/deps"` \| `"marginSnapshot/item"` \| `"marginSnapshot/items"` \| `"marginSnapshot/ldeps"` \| `"marginSnapshot/list"` \| `"tradingPermission/deps"` \| `"tradingPermission/item"` \| `"tradingPermission/items"` \| `"tradingPermission/ldeps"` \| `"tradingPermission/list"` \| `"marketDataSubscriptionExchangeScope/find"` \| `"marketDataSubscriptionExchangeScope/item"` \| `"marketDataSubscriptionExchangeScope/items"` \| `"marketDataSubscriptionExchangeScope/list"` \| `"marketDataSubscriptionExchangeScope/suggest"` \| `"marketDataSubscriptionPlan/find"` \| `"marketDataSubscriptionPlan/item"` \| `"marketDataSubscriptionPlan/items"` \| `"marketDataSubscriptionPlan/list"` \| `"marketDataSubscriptionPlan/suggest"` \| `"tradovateSubscriptionPlan/find"` \| `"tradovateSubscriptionPlan/item"` \| `"tradovateSubscriptionPlan/items"` \| `"tradovateSubscriptionPlan/list"` \| `"tradovateSubscriptionPlan/suggest"` \| `"replay/changespeed"` \| `"replay/checkreplaysession"` \| `"replay/initializeclock"` \| `"adminAlertSignal/completealertsignal"` \| `"adminAlert/deps"` \| `"adminAlert/item"` \| `"adminAlert/items"` \| `"adminAlert/ldeps"` \| `"adminAlert/list"` \| `"adminAlertSignal/takealertsignalownership"` \| `"alert/createalert"` \| `"alert/deps"` \| `"alert/item"` \| `"alert/items"` \| `"alert/ldeps"` \| `"alert/list"` \| `"alert/markreadalertsignal"` \| `"alert/modifyalert"` \| `"alert/resetalert"` \| `"alertSignal/deps"` \| `"alertSignal/item"` \| `"alertSignal/items"` \| `"alertSignal/ldeps"` \| `"alertSignal/list"` \| `"adminAlertSignal/deps"` \| `"adminAlertSignal/item"` \| `"adminAlertSignal/items"` \| `"adminAlertSignal/ldeps"` \| `"adminAlertSignal/list"` \| `"clearingHouse/deps"` \| `"clearingHouse/item"` \| `"clearingHouse/items"` \| `"clearingHouse/list"` \| `"clearingHouse/suggest"` \| `"entitlement/item"` \| `"entitlement/items"` \| `"entitlement/list"` \| `"orderStrategyType/find"` \| `"orderStrategyType/item"` \| `"orderStrategyType/items"` \| `"orderStrategyType/list"` \| `"orderStrategyType/suggest"` \| `"property/find"` \| `"property/item"` \| `"property/items"` \| `"property/list"` \| `"property/suggest"` \| `"contactInfo/deps"` \| `"contactInfo/item"` \| `"contactInfo/items"` \| `"contactInfo/ldeps"` \| `"marketDataSubscription/create"` \| `"marketDataSubscription/deps"` \| `"marketDataSubscription/item"` \| `"marketDataSubscription/items"` \| `"marketDataSubscription/ldeps"` \| `"marketDataSubscription/list"` \| `"marketDataSubscription/update"` \| `"organization/find"` \| `"organization/item"` \| `"organization/items"` \| `"organization/list"` \| `"organization/suggest"` \| `"secondMarketDataSubscription/deps"` \| `"secondMarketDataSubscription/item"` \| `"secondMarketDataSubscription/items"` \| `"secondMarketDataSubscription/ldeps"` \| `"secondMarketDataSubscription/list"` \| `"tradovateSubscription/create"` \| `"tradovateSubscription/deps"` \| `"tradovateSubscription/item"` \| `"tradovateSubscription/items"` \| `"tradovateSubscription/ldeps"` \| `"tradovateSubscription/list"` \| `"tradovateSubscription/update"` \| `"user/find"` \| `"user/getaccounttradingpermissions"` \| `"user/item"` \| `"user/items"` \| `"user/list"` \| `"user/suggest"` \| `"user/syncrequest"` \| `"userPlugin/create"` \| `"userPlugin/deps"` \| `"userPlugin/item"` \| `"userPlugin/items"` \| `"userPlugin/ldeps"` \| `"userPlugin/list"` \| `"userPlugin/update"` \| `"userProperty/deps"` \| `"userProperty/item"` \| `"userProperty/items"` \| `"userProperty/ldeps"` \| `"userSession/item"` \| `"userSession/items"` \| `"userSessionStats/deps"` \| `"userSessionStats/item"` \| `"userSessionStats/items"` \| `"userSessionStats/ldeps"` \| `"userSessionStats/list"` \| `"chat/closechat"` \| `"chat/deps"` \| `"chat/item"` \| `"chat/items"` \| `"chat/ldeps"` \| `"chat/list"` \| `"chat/markasreadchatmessage"` \| `"chat/postchatmessage"` \| `"chatMessage/deps"` \| `"chatMessage/item"` \| `"chatMessage/items"` \| `"chatMessage/ldeps"` \| `"userAccountPositionLimit/deleteuseraccountpositionlimit"` \| `"userAccountPositionLimit/deleteuseraccountriskparameter"` \| `"user/accepttradingpermission"` \| `"user/activatesecondmarketdatasubscriptionrenewal"` \| `"user/addmarketdatasubscription"` \| `"user/addsecondmarketdatasubscription"` \| `"user/addtradovatesubscription"` \| `"user/cancelsecondmarketdatasubscription"` \| `"user/cancelsecondmarketdatasubscriptionrenewal"` \| `"user/canceltradovatesubscription"` \| `"user/modifycredentials"` \| `"user/modifyemailaddress"` \| `"user/modifypassword"` \| `"user/opendemoaccount"` \| `"user/requesttradingpermission"` \| `"user/revoketradingpermission"` \| `"user/signuporganizationmember"` \| `"user/addentitlementsubscription"` \| `"user/changepluginpermission"` |

#### Returns

`boolean`

#### Source

[websockets/MarketDataSocket.ts:60](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L60)

***

### subscribe

> **subscribe**<`T`>(`params`): `Promise`\< () => `Promise`\< `void` \> \>

#### Type parameters

| Parameter |
| :------ |
| `T` *extends* `"md/getchart"` \| `"md/subscribehistogram"` \| `"md/subscribequote"` \| `"md/subscribedom"` \| `"md/unsubscribehistogram"` \| `"md/unsubscribequote"` \| `"md/unsubscribedom"` \| `"md/cancelchart"` \| `"authorize"` \| `"auth/me"` \| `"auth/oauthtoken"` \| `"auth/accesstokenrequest"` \| `"auth/renewaccesstoken"` \| `"contract/deps"` \| `"contract/find"` \| `"contract/getproductfeeparams"` \| `"contract/item"` \| `"contract/items"` \| `"contract/ldeps"` \| `"contract/rollcontract"` \| `"contract/suggest"` \| `"contractGroup/find"` \| `"contractGroup/item"` \| `"contractGroup/items"` \| `"contractGroup/list"` \| `"contractGroup/suggest"` \| `"contractMaturity/deps"` \| `"contractMaturity/item"` \| `"contractMaturity/items"` \| `"contractMaturity/ldeps"` \| `"currency/find"` \| `"currency/item"` \| `"currency/items"` \| `"currency/list"` \| `"currency/suggest"` \| `"currencyRate/deps"` \| `"currencyRate/item"` \| `"currencyRate/items"` \| `"currencyRate/ldeps"` \| `"currencyRate/list"` \| `"exchange/find"` \| `"exchange/item"` \| `"exchange/items"` \| `"exchange/list"` \| `"exchange/suggest"` \| `"product/deps"` \| `"product/find"` \| `"product/item"` \| `"product/items"` \| `"product/ldeps"` \| `"product/list"` \| `"product/suggest"` \| `"productSession/deps"` \| `"productSession/item"` \| `"productSession/items"` \| `"productSession/ldeps"` \| `"spreadDefinition/item"` \| `"spreadDefinition/items"` \| `"accountRiskStatus/deps"` \| `"accountRiskStatus/item"` \| `"accountRiskStatus/items"` \| `"accountRiskStatus/ldeps"` \| `"accountRiskStatus/list"` \| `"contractMargin/deps"` \| `"contractMargin/item"` \| `"contractMargin/items"` \| `"contractMargin/ldeps"` \| `"productMargin/deps"` \| `"productMargin/item"` \| `"productMargin/items"` \| `"productMargin/ldeps"` \| `"productMargin/list"` \| `"userAccountAutoLiq/create"` \| `"userAccountAutoLiq/deps"` \| `"userAccountAutoLiq/item"` \| `"userAccountAutoLiq/items"` \| `"userAccountAutoLiq/ldeps"` \| `"userAccountAutoLiq/list"` \| `"userAccountAutoLiq/update"` \| `"userAccountPositionLimit/create"` \| `"userAccountPositionLimit/deps"` \| `"userAccountPositionLimit/item"` \| `"userAccountPositionLimit/items"` \| `"userAccountPositionLimit/ldeps"` \| `"userAccountPositionLimit/update"` \| `"userAccountRiskParameter/create"` \| `"userAccountRiskParameter/deps"` \| `"userAccountRiskParameter/item"` \| `"userAccountRiskParameter/items"` \| `"userAccountRiskParameter/ldeps"` \| `"userAccountRiskParameter/update"` \| `"command/deps"` \| `"command/item"` \| `"command/items"` \| `"command/ldeps"` \| `"command/list"` \| `"commandReport/deps"` \| `"commandReport/item"` \| `"commandReport/items"` \| `"commandReport/ldeps"` \| `"commandReport/list"` \| `"executionReport/deps"` \| `"executionReport/find"` \| `"executionReport/item"` \| `"executionReport/items"` \| `"executionReport/ldeps"` \| `"executionReport/list"` \| `"executionReport/suggest"` \| `"fill/deps"` \| `"fill/item"` \| `"fill/items"` \| `"fill/ldeps"` \| `"fill/list"` \| `"fillFee/deps"` \| `"fillFee/item"` \| `"fillFee/items"` \| `"fillFee/ldeps"` \| `"fillFee/list"` \| `"order/deps"` \| `"order/item"` \| `"order/items"` \| `"order/ldeps"` \| `"order/liquidatePosition"` \| `"order/list"` \| `"order/modifyorder"` \| `"order/placeoco"` \| `"order/placeoso"` \| `"orderStrategy/deps"` \| `"orderStrategy/interruptOrderStrategy"` \| `"orderStrategy/item"` \| `"orderStrategy/items"` \| `"orderStrategy/ldeps"` \| `"orderStrategy/list"` \| `"orderStrategy/startOrderStrategy"` \| `"orderStrategyLink/deps"` \| `"orderStrategyLink/item"` \| `"orderStrategyLink/items"` \| `"orderStrategyLink/ldeps"` \| `"orderStrategyLink/list"` \| `"orderVersion/deps"` \| `"orderVersion/item"` \| `"orderVersion/items"` \| `"orderVersion/ldeps"` \| `"orderVersion/list"` \| `"fillPair/deps"` \| `"fillPair/item"` \| `"fillPair/items"` \| `"fillPair/ldeps"` \| `"fillPair/list"` \| `"position/deps"` \| `"position/find"` \| `"position/item"` \| `"position/items"` \| `"position/ldeps"` \| `"position/list"` \| `"account/deps"` \| `"account/find"` \| `"account/item"` \| `"account/items"` \| `"account/ldeps"` \| `"account/list"` \| `"account/suggest"` \| `"cashBalance/deps"` \| `"cashBalance/getcashbalancesnapshot"` \| `"cashBalance/item"` \| `"cashBalance/items"` \| `"cashBalance/ldeps"` \| `"cashBalance/list"` \| `"cashBalanceLog/deps"` \| `"cashBalanceLog/item"` \| `"cashBalanceLog/items"` \| `"cashBalanceLog/ldeps"` \| `"marginSnapshot/deps"` \| `"marginSnapshot/item"` \| `"marginSnapshot/items"` \| `"marginSnapshot/ldeps"` \| `"marginSnapshot/list"` \| `"tradingPermission/deps"` \| `"tradingPermission/item"` \| `"tradingPermission/items"` \| `"tradingPermission/ldeps"` \| `"tradingPermission/list"` \| `"marketDataSubscriptionExchangeScope/find"` \| `"marketDataSubscriptionExchangeScope/item"` \| `"marketDataSubscriptionExchangeScope/items"` \| `"marketDataSubscriptionExchangeScope/list"` \| `"marketDataSubscriptionExchangeScope/suggest"` \| `"marketDataSubscriptionPlan/find"` \| `"marketDataSubscriptionPlan/item"` \| `"marketDataSubscriptionPlan/items"` \| `"marketDataSubscriptionPlan/list"` \| `"marketDataSubscriptionPlan/suggest"` \| `"tradovateSubscriptionPlan/find"` \| `"tradovateSubscriptionPlan/item"` \| `"tradovateSubscriptionPlan/items"` \| `"tradovateSubscriptionPlan/list"` \| `"tradovateSubscriptionPlan/suggest"` \| `"replay/changespeed"` \| `"replay/checkreplaysession"` \| `"replay/initializeclock"` \| `"adminAlertSignal/completealertsignal"` \| `"adminAlert/deps"` \| `"adminAlert/item"` \| `"adminAlert/items"` \| `"adminAlert/ldeps"` \| `"adminAlert/list"` \| `"adminAlertSignal/takealertsignalownership"` \| `"alert/createalert"` \| `"alert/deps"` \| `"alert/item"` \| `"alert/items"` \| `"alert/ldeps"` \| `"alert/list"` \| `"alert/markreadalertsignal"` \| `"alert/modifyalert"` \| `"alert/resetalert"` \| `"alertSignal/deps"` \| `"alertSignal/item"` \| `"alertSignal/items"` \| `"alertSignal/ldeps"` \| `"alertSignal/list"` \| `"adminAlertSignal/deps"` \| `"adminAlertSignal/item"` \| `"adminAlertSignal/items"` \| `"adminAlertSignal/ldeps"` \| `"adminAlertSignal/list"` \| `"clearingHouse/deps"` \| `"clearingHouse/item"` \| `"clearingHouse/items"` \| `"clearingHouse/list"` \| `"clearingHouse/suggest"` \| `"entitlement/item"` \| `"entitlement/items"` \| `"entitlement/list"` \| `"orderStrategyType/find"` \| `"orderStrategyType/item"` \| `"orderStrategyType/items"` \| `"orderStrategyType/list"` \| `"orderStrategyType/suggest"` \| `"property/find"` \| `"property/item"` \| `"property/items"` \| `"property/list"` \| `"property/suggest"` \| `"contactInfo/deps"` \| `"contactInfo/item"` \| `"contactInfo/items"` \| `"contactInfo/ldeps"` \| `"marketDataSubscription/create"` \| `"marketDataSubscription/deps"` \| `"marketDataSubscription/item"` \| `"marketDataSubscription/items"` \| `"marketDataSubscription/ldeps"` \| `"marketDataSubscription/list"` \| `"marketDataSubscription/update"` \| `"organization/find"` \| `"organization/item"` \| `"organization/items"` \| `"organization/list"` \| `"organization/suggest"` \| `"secondMarketDataSubscription/deps"` \| `"secondMarketDataSubscription/item"` \| `"secondMarketDataSubscription/items"` \| `"secondMarketDataSubscription/ldeps"` \| `"secondMarketDataSubscription/list"` \| `"tradovateSubscription/create"` \| `"tradovateSubscription/deps"` \| `"tradovateSubscription/item"` \| `"tradovateSubscription/items"` \| `"tradovateSubscription/ldeps"` \| `"tradovateSubscription/list"` \| `"tradovateSubscription/update"` \| `"user/find"` \| `"user/getaccounttradingpermissions"` \| `"user/item"` \| `"user/items"` \| `"user/list"` \| `"user/suggest"` \| `"user/syncrequest"` \| `"userPlugin/create"` \| `"userPlugin/deps"` \| `"userPlugin/item"` \| `"userPlugin/items"` \| `"userPlugin/ldeps"` \| `"userPlugin/list"` \| `"userPlugin/update"` \| `"userProperty/deps"` \| `"userProperty/item"` \| `"userProperty/items"` \| `"userProperty/ldeps"` \| `"userSession/item"` \| `"userSession/items"` \| `"userSessionStats/deps"` \| `"userSessionStats/item"` \| `"userSessionStats/items"` \| `"userSessionStats/ldeps"` \| `"userSessionStats/list"` \| `"chat/closechat"` \| `"chat/deps"` \| `"chat/item"` \| `"chat/items"` \| `"chat/ldeps"` \| `"chat/list"` \| `"chat/markasreadchatmessage"` \| `"chat/postchatmessage"` \| `"chatMessage/deps"` \| `"chatMessage/item"` \| `"chatMessage/items"` \| `"chatMessage/ldeps"` \| `"userAccountPositionLimit/deleteuseraccountpositionlimit"` \| `"userAccountPositionLimit/deleteuseraccountriskparameter"` \| `"user/accepttradingpermission"` \| `"user/activatesecondmarketdatasubscriptionrenewal"` \| `"user/addmarketdatasubscription"` \| `"user/addsecondmarketdatasubscription"` \| `"user/addtradovatesubscription"` \| `"user/cancelsecondmarketdatasubscription"` \| `"user/cancelsecondmarketdatasubscriptionrenewal"` \| `"user/canceltradovatesubscription"` \| `"user/modifycredentials"` \| `"user/modifyemailaddress"` \| `"user/modifypassword"` \| `"user/opendemoaccount"` \| `"user/requesttradingpermission"` \| `"user/revoketradingpermission"` \| `"user/signuporganizationmember"` \| `"user/addentitlementsubscription"` \| `"user/changepluginpermission"` |

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `params` | [`MarketDataSocketSubscribeParams`](../type-aliases/type-alias.MarketDataSocketSubscribeParams.md)\< `T` \> |

#### Returns

`Promise`\< () => `Promise`\< `void` \> \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`subscribe`](../interfaces/interface.MdSocket.md#subscribe)

#### Source

[websockets/MarketDataSocket.ts:80](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L80)

***

### subscribeChart

> **subscribeChart**(
  `symbol`,
  `chartDescription`,
  `timeRange`,
  `onSubscription`): `Promise`\< () => `void` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `symbol` | `string` |
| `chartDescription` | [`ChartDescription`](../type-aliases/type-alias.ChartDescription.md) |
| `timeRange` | [`TimeRange`](../type-aliases/type-alias.TimeRange.md) |
| `onSubscription` | (`item`) => `void` |

#### Returns

`Promise`\< () => `void` \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`subscribeChart`](../interfaces/interface.MdSocket.md#subscribechart)

#### Source

[websockets/MarketDataSocket.ts:237](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L237)

***

### subscribeDOM

> **subscribeDOM**(`symbol`, `onSubscription`): `Promise`\< () => `void` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `symbol` | `string` |
| `onSubscription` | (`item`) => `void` |

#### Returns

`Promise`\< () => `void` \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`subscribeDOM`](../interfaces/interface.MdSocket.md#subscribedom)

#### Source

[websockets/MarketDataSocket.ts:209](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L209)

***

### subscribeHistogram

> **subscribeHistogram**(`symbol`, `onSubscription`): `Promise`\< () => `void` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `symbol` | `string` |
| `onSubscription` | (`item`) => `void` |

#### Returns

`Promise`\< () => `void` \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`subscribeHistogram`](../interfaces/interface.MdSocket.md#subscribehistogram)

#### Source

[websockets/MarketDataSocket.ts:223](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L223)

***

### subscribeQuote

> **subscribeQuote**(`symbol`, `onSubscription`): `Promise`\< () => `void` \>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `symbol` | `string` |
| `onSubscription` | (`item`) => `void` |

#### Returns

`Promise`\< () => `void` \>

#### Implementation of

[`MdSocket`](../interfaces/interface.MdSocket.md).[`subscribeQuote`](../interfaces/interface.MdSocket.md#subscribequote)

#### Source

[websockets/MarketDataSocket.ts:195](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L195)

***

### unsubscribe

> **unsubscribe**(`symbol`): `void`

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `symbol` | `string` |

#### Returns

`void`

#### Source

[websockets/MarketDataSocket.ts:67](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/websockets/MarketDataSocket.ts#L67)
