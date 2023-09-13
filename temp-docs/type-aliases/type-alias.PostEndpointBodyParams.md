[**tradovate**](../README.md)

***

[API](../API.md) > PostEndpointBodyParams

# Type alias: PostEndpointBodyParams

> **PostEndpointBodyParams**: `object`

## Type declaration

### `adminAlertSignal/completealertsignal`

**adminAlertSignal/completealertsignal**: `object`

> #### `adminAlertSignal/completealertsignal.adminAlertSignalId`
>
> **adminAlertSignalId**: `number`
>
>

***

### `adminAlertSignal/takealertsignalownership`

**adminAlertSignal/takealertsignalownership**: `object`

> #### `adminAlertSignal/takealertsignalownership.adminAlertSignalId`
>
> **adminAlertSignalId**: `number`
>
>

***

### `auth/accesstokenrequest`

**auth/accesstokenrequest**: [`AccessTokenRequestBody`](type-alias.AccessTokenRequestBody.md)

***

### `auth/oauthtoken`

**auth/oauthtoken**: [`OAuthTokenRequestBody`](type-alias.OAuthTokenRequestBody.md)

***

### `authorize`

**authorize**: `object`

> #### `authorize.token`
>
> **token**: `string`
>
>

***

### `cashBalance/getcashbalancesnapshot`

**cashBalance/getcashbalancesnapshot**: `object`

> #### `cashBalance/getcashbalancesnapshot.accountId`
>
> **accountId**: `number`
>
>

***

### `chat/markasreadchatmessage`

**chat/markasreadchatmessage**: `object`

> #### `chat/markasreadchatmessage.chatMessageId`
>
> **chatMessageId**: `number`
>
>

***

### `chat/postchatmessage`

**chat/postchatmessage**: [`PostChatMessageRequestBody`](type-alias.PostChatMessageRequestBody.md)

***

### `contract/rollcontract`

**contract/rollcontract**: [`RollContractRequestBody`](type-alias.RollContractRequestBody.md)

***

### `marketDataSubscription/create`

**marketDataSubscription/create**: [`MarketDataSubscription`](type-alias.MarketDataSubscription.md)

***

### `marketDataSubscription/update`

**marketDataSubscription/update**: [`MarketDataSubscription`](type-alias.MarketDataSubscription.md)

***

### `md/cancelchart`

**md/cancelchart**: [`CancelChartBody`](type-alias.CancelChartBody.md)

***

### `md/getchart`

**md/getchart**: `object`

> #### `md/getchart.chartDescription`
>
> **chartDescription**: [`ChartDescription`](type-alias.ChartDescription.md)
>
> #### `md/getchart.symbol`
>
> **symbol**: `string`
>
> #### `md/getchart.timeRange`
>
> **timeRange**: [`TimeRange`](type-alias.TimeRange.md)
>
>

***

### `md/subscribedom`

**md/subscribedom**: `object`

> #### `md/subscribedom.symbol`
>
> **symbol**: `string`
>
>

***

### `md/subscribehistogram`

**md/subscribehistogram**: `object`

> #### `md/subscribehistogram.symbol`
>
> **symbol**: `string`
>
>

***

### `md/subscribequote`

**md/subscribequote**: `object`

> #### `md/subscribequote.symbol`
>
> **symbol**: `string`
>
>

***

### `md/unsubscribedom`

**md/unsubscribedom**: [`CancelBody`](type-alias.CancelBody.md)

***

### `md/unsubscribehistogram`

**md/unsubscribehistogram**: [`CancelBody`](type-alias.CancelBody.md)

***

### `md/unsubscribequote`

**md/unsubscribequote**: [`CancelBody`](type-alias.CancelBody.md)

***

### `order/liquidatePosition`

**order/liquidatePosition**: [`LiquidatePositionRequestBody`](type-alias.LiquidatePositionRequestBody.md)

***

### `order/modifyorder`

**order/modifyorder**: [`ModifyOrderRequestBody`](type-alias.ModifyOrderRequestBody.md)

***

### `order/placeoco`

**order/placeoco**: [`PlaceOCORequestBody`](type-alias.PlaceOCORequestBody.md)

***

### `order/placeorder`

**order/placeorder**: [`PlaceOrderRequestBody`](type-alias.PlaceOrderRequestBody.md)

***

### `order/placeoso`

**order/placeoso**: [`PlaceOSORequestBody`](type-alias.PlaceOSORequestBody.md)

***

### `orderStrategy/startOrderStrategy`

**orderStrategy/startOrderStrategy**: [`StartOrderStrategyRequestBody`](type-alias.StartOrderStrategyRequestBody.md)

***

### `replay/changespeed`

**replay/changespeed**: `object`

> #### `replay/changespeed.speed`
>
> **speed**: `number`
>
>

***

### `replay/checkreplaysession`

**replay/checkreplaysession**: `object`

> #### `replay/checkreplaysession.startTimestamp`
>
> **startTimestamp**: `string`
>
>

***

### `replay/initializeclock`

**replay/initializeclock**: `object`

> #### `replay/initializeclock.initialBalance`
>
> **initialBalance**: `number`
>
> #### `replay/initializeclock.speed`
>
> **speed**: `number`
>
> #### `replay/initializeclock.startTimestamp`
>
> **startTimestamp**: `string`
>
>

***

### `tradovateSubscription/create`

**tradovateSubscription/create**: [`TradovateSubscription`](type-alias.TradovateSubscription.md)

***

### `tradovateSubscription/update`

**tradovateSubscription/update**: [`TradovateSubscription`](type-alias.TradovateSubscription.md)

***

### `user/accepttradingpermission`

**user/accepttradingpermission**: `object`

> #### `user/accepttradingpermission.tradingPermissionId`
>
> **tradingPermissionId**: `number`
>
>

***

### `user/activatesecondmarketdatasubscriptionrenewal`

**user/activatesecondmarketdatasubscriptionrenewal**: `object`

> #### `user/activatesecondmarketdatasubscriptionrenewal.secondMarketDataSubscriptionId`
>
> **secondMarketDataSubscriptionId**: `number`
>
>

***

### `user/addentitlementsubscription`

**user/addentitlementsubscription**: [`AddEntitlementSubscriptionRequestBody`](type-alias.AddEntitlementSubscriptionRequestBody.md)

***

### `user/addmarketdatasubscription`

**user/addmarketdatasubscription**: [`AddMarketDataSubscriptionRequestBody`](type-alias.AddMarketDataSubscriptionRequestBody.md)

***

### `user/addsecondmarketdatasubscription`

**user/addsecondmarketdatasubscription**: [`AddSecondMarketDataSubscriptionRequestBody`](type-alias.AddSecondMarketDataSubscriptionRequestBody.md)

***

### `user/addtradovatesubscription`

**user/addtradovatesubscription**: [`AddTradovateSubscriptionRequestBody`](type-alias.AddTradovateSubscriptionRequestBody.md)

***

### `user/cancelsecondmarketdatasubscription`

**user/cancelsecondmarketdatasubscription**: `object`

> #### `user/cancelsecondmarketdatasubscription.secondMarketDataSubscriptionId`
>
> **secondMarketDataSubscriptionId**: `number`
>
>

***

### `user/cancelsecondmarketdatasubscriptionrenewal`

**user/cancelsecondmarketdatasubscriptionrenewal**: `object`

> #### `user/cancelsecondmarketdatasubscriptionrenewal.secondMarketDataSubscriptionId`
>
> **secondMarketDataSubscriptionId**: `number`
>
>

***

### `user/canceltradovatesubscription`

**user/canceltradovatesubscription**: [`CancelTradovateSubscriptionRequestBody`](type-alias.CancelTradovateSubscriptionRequestBody.md)

***

### `user/changepluginpermission`

**user/changepluginpermission**: [`ChangePluginPermissionRequestBody`](type-alias.ChangePluginPermissionRequestBody.md)

***

### `user/modifycredentials`

**user/modifycredentials**: [`ModifyCredentialsRequestBody`](type-alias.ModifyCredentialsRequestBody.md)

***

### `user/modifyemailaddress`

**user/modifyemailaddress**: `object`

> #### `user/modifyemailaddress.email`
>
> **email**: `string`
>
> #### `user/modifyemailaddress.userid`
>
> **userid**?: `number`
>
>

***

### `user/modifypassword`

**user/modifypassword**: [`ModifyPasswordRequestBody`](type-alias.ModifyPasswordRequestBody.md)

***

### `user/opendemoaccount`

**user/opendemoaccount**: [`OpenDemoAccountRequestBody`](type-alias.OpenDemoAccountRequestBody.md)

***

### `user/requesttradingpermission`

**user/requesttradingpermission**: [`RequestTradingPermissionRequestBody`](type-alias.RequestTradingPermissionRequestBody.md)

***

### `user/revoketradingpermission`

**user/revoketradingpermission**: `object`

> #### `user/revoketradingpermission.revoketradingpermission`
>
> **revoketradingpermission**: `number`
>
>

***

### `user/signuporganizationmember`

**user/signuporganizationmember**: [`SignUpOrganizationMemberRequestBody`](type-alias.SignUpOrganizationMemberRequestBody.md)

***

### `user/syncrequest`

**user/syncrequest**: `object`

> #### `user/syncrequest.accounts`
>
> **accounts**: `number`[]
>
>

***

### `userAccountAutoLiq/create`

**userAccountAutoLiq/create**: [`UserAccountAutoLiq`](type-alias.UserAccountAutoLiq.md)

***

### `userAccountAutoLiq/update`

**userAccountAutoLiq/update**: [`UserAccountAutoLiq`](type-alias.UserAccountAutoLiq.md)

***

### `userAccountPositionLimit/create`

**userAccountPositionLimit/create**: [`UserAccountAutoLiq`](type-alias.UserAccountAutoLiq.md)

***

### `userAccountPositionLimit/deleteuseraccountpositionlimit`

**userAccountPositionLimit/deleteuseraccountpositionlimit**: `object`

> #### `userAccountPositionLimit/deleteuseraccountpositionlimit.userAccountPositionLimitId`
>
> **userAccountPositionLimitId**: `number`
>
>

***

### `userAccountPositionLimit/deleteuseraccountriskparameter`

**userAccountPositionLimit/deleteuseraccountriskparameter**: `object`

> #### `userAccountPositionLimit/deleteuseraccountriskparameter.userAccountRiskParameterId`
>
> **userAccountRiskParameterId**: `number`
>
>

***

### `userAccountPositionLimit/update`

**userAccountPositionLimit/update**: [`UserAccountPositionLimit`](type-alias.UserAccountPositionLimit.md)

***

### `userAccountRiskParameter/create`

**userAccountRiskParameter/create**: [`UserAccountPositionLimit`](type-alias.UserAccountPositionLimit.md)

***

### `userAccountRiskParameter/update`

**userAccountRiskParameter/update**: [`UserAccountRiskParameter`](type-alias.UserAccountRiskParameter.md)

***

### `userPlugin/create`

**userPlugin/create**: [`UserPlugin`](type-alias.UserPlugin.md)

***

### `userPlugin/update`

**userPlugin/update**: [`UserPlugin`](type-alias.UserPlugin.md)

## Source

[types/index.ts:4287](https://github.com/cgilly2fast/tradovate-typescript/blob/b1caea5/src/types/index.ts#L4287)
