import ReplaySocket from '../websockets/ReplaySocket'

export enum OrderType {
    Limit = 'Limit',
    MIT = 'MIT',
    Market = 'Market',
    QTS = 'QTS',
    Stop = 'Stop',
    StopLimit = 'StopLimit',
    TrailingStop = 'TrailingStop',
    TrailingStopLimit = 'TrailingStopLimit'
}

export enum OrderAction {
    Buy = 'Buy',
    Sell = 'Sell'
}

export enum TimeInForce {
    Day = 'Day',
    FOK = 'FOK',
    GTC = 'GTC',
    GTD = 'GTD',
    IOC = 'IOC'
}

export enum StrategyEvent {
    MD = 'md',
    DOM = 'dom',
    UserSync = 'usersyncinit',
    Quote = 'quote',
    Chart = 'chart',
    Props = 'props',
    Histogram = 'histogram',
    Clock = 'clock',
    ReplayReset = 'replay/resetEventHandlers',
    NextReplay = 'replay/nextReplayPeriod',
    ReplayDrawStats = 'replay/drawStats', //the draw effect
    ReplayComplete = 'replay/complete', //the event that says replay is done
    Stop = 'stop'
}

export enum EntityType {
    Position = 'position',
    CashBalance = 'cashBalance',
    Account = 'account',
    MarginSnapshot = 'marginSnapshot',
    Currency = 'currency',
    FillPair = 'fillPair',
    Order = 'order',
    Contract = 'contract',
    ContractMaturity = 'contractMaturity',
    Product = 'product',
    Exchange = 'exchange',
    Command = 'command',
    CommandReport = 'commandReport',
    ExecutionReport = 'executionReport',
    OrderVersion = 'orderVersion',
    Fill = 'fill',
    OrderStrategy = 'orderStrategy',
    OrderStrategyLink = 'orderStrategyLink',
    ContractGroup = 'contractGroup'
}

export enum LongShortMode {
    Long = 'long',
    Short = 'short',
    Watch = 'watch',
    Setup = 'setup', // Looking for a technical set up to occur
    Entry = 'entry' // When a technical set up occurs and looking for desired price to enter
}

export enum BarType {
    MinuteBar = 'MinuteBar',
    Tick = 'Tick',
    DOM = 'DOM',
    DailyBar = 'DailyBar',
    Custom = 'Custom'
}

export enum StorageKeys {
    StorageKey = 'tradovate-api-access-token',
    ExpirationKey = 'tradovate-api-access-expiration',
    DeviceIdKey = 'tradovate-device-id',
    AvailAcctsKey = 'tradovate-api-available-accounts',
    UserDataKey = 'tradovate-user-data'
}

export enum ElementSizeUnit {
    UnderlyingUnits = 'UnderlyingUnits',
    Volume = 'Volume',
    Range = 'Range',
    Renko = 'Renko',
    MomentumRange = 'MomentumRange',
    PointAndFigure = 'PointAndFigure',
    OFARange = 'OFARange'
}

export enum TimeRangeType {
    AsMuchAsElements = 'asMuchAsElements',
    AsFarAsTimestamp = 'asFarAsTimestamp',
    ClosestTimestamp = 'closestTimestamp',
    ClosestTickId = 'closestTickId'
}

export type Bar = {
    timestamp: string
    open: number
    high: number
    low: number
    close: number
    upVolume: number
    downVolume: number
    upTicks: number
    downTicks: number
    bidVolume: number
    offerVolume: number
}

export type Tick = {
    subscriptionId: number
    id: number
    contractTickSize: number
    timestamp: string
    price: number
    volume: number
    bidPrice: number
    bidSize: number
    askPrice: number
    askSize: number
}

export type Price = {
    price: number
    size: number
}
export type Quote = {
    timestamp: string //example: "2017-04-13T11:33:57.488Z"
    contractId: number // ID of the quote contract
    entries: {
        // Any of entries may absent if no data available for them.
        // Either price or size field (but not both) may absent in any entries.
        Bid: Price
        TotalTradeVolume: Price
        Offer: Price
        LowPrice: Price
        Trade: Price
        OpenInterest: Price
        OpeningPrice: Price
        HighPrice: Price
        SettlementPrice: Price
        EmptyBook: Price
    }
}

export type PropsEventMsg =
    | PositionEventMsg
    | CashBalanceEventMsg
    | AccountEventMsg
    | MarginSnapshotEventMsg
    | CurrencyEventMsg
    | FillPairEventMsg
    | OrderEventMsg
    | ContractEventMsg
    | ContractMaturityEventMsg
    | ProductEventMsg
    | ExchangeEventMsg
    | CommandEventMsg
    | CommandReportEventMsg
    | ExecutionReportEventMsg
    | OrderVersionEventMsg
    | FillEventMsg
    | OrderStrategyEventMsg
    | OrderStrategyLinkEventMsg
    | ContractGroupEventMsg

export type ContractGroupEventMsg = {
    entityType: EntityType.ContractGroup
    entity: ContractGroup
    eventType: EventType
}

export type OrderStrategyLinkEventMsg = {
    entityType: EntityType.OrderStrategyLink
    entity: OrderStrategyLink
    eventType: EventType
}

export type OrderStrategyEventMsg = {
    entityType: EntityType.OrderStrategy
    entity: OrderStrategy
    eventType: EventType
}

export type FillEventMsg = {
    entityType: EntityType.Fill
    entity: Fill
    eventType: EventType
}

export type OrderVersionEventMsg = {
    entityType: EntityType.OrderVersion
    entity: OrderVersion
    eventType: EventType
}

export type ExecutionReportEventMsg = {
    entityType: EntityType.ExecutionReport
    entity: ExecutionReport
    eventType: EventType
}

export type CommandReportEventMsg = {
    entityType: EntityType.CommandReport
    entity: CommandReport
    eventType: EventType
}

export type CommandEventMsg = {
    entityType: EntityType.Command
    entity: Command
    eventType: EventType
}

export type ExchangeEventMsg = {
    entityType: EntityType.Exchange
    entity: Exchange
    eventType: EventType
}

export type ProductEventMsg = {
    entityType: EntityType.Product
    entity: Product
    eventType: EventType
}

export type ContractMaturityEventMsg = {
    entityType: EntityType.ContractMaturity
    entity: ContractMaturity
    eventType: EventType
}

export type ContractEventMsg = {
    entityType: EntityType.Contract
    entity: Contract
    eventType: EventType
}

export type OrderEventMsg = {
    entityType: EntityType.Order
    entity: Order
    eventType: EventType
}

export type FillPairEventMsg = {
    entityType: EntityType.FillPair
    entity: FillPair
    eventType: EventType
}

export type CurrencyEventMsg = {
    entityType: EntityType.Currency
    entity: Currency
    eventType: EventType
}

export type MarginSnapshotEventMsg = {
    entityType: EntityType.MarginSnapshot
    entity: MarginSnapshot
    eventType: EventType
}

export type AccountEventMsg = {
    entityType: EntityType.Account
    entity: Account
    eventType: EventType
}

export type CashBalanceEventMsg = {
    entityType: EntityType.CashBalance
    entity: CashBalance
    eventType: EventType
}

export type PositionEventMsg = {
    entityType: EntityType.Position
    entity: Position
    eventType: EventType
}

export function isContractGroupEventMsg(obj: any): obj is ContractGroupEventMsg {
    return obj.entityType === EntityType.ContractGroup
}

export function isOrderStrategyLinkEventMsg(obj: any): obj is OrderStrategyLinkEventMsg {
    return obj.entityType === EntityType.OrderStrategyLink
}

export function isOrderStrategyEventMsg(obj: any): obj is OrderStrategyEventMsg {
    return obj.entityType === EntityType.OrderStrategy
}

export function isFillEventMsg(obj: any): obj is FillEventMsg {
    return obj.entityType === EntityType.Fill
}

export function isOrderVersionEventMsg(obj: any): obj is OrderVersionEventMsg {
    return obj.entityType === EntityType.OrderVersion
}

export function isExecutionReportEventMsg(obj: any): obj is ExecutionReportEventMsg {
    return obj.entityType === EntityType.ExecutionReport
}

export function isCommandReportEventMsg(obj: any): obj is CommandReportEventMsg {
    return obj.entityType === EntityType.CommandReport
}

export function isCommandEventMsg(obj: any): obj is CommandEventMsg {
    return obj.entityType === EntityType.Command
}

export function isExchangeEventMsg(obj: any): obj is ExchangeEventMsg {
    return obj.entityType === EntityType.Exchange
}

export function isProductEventMsg(obj: any): obj is ProductEventMsg {
    return obj.entityType === EntityType.Product
}

export function isContractMaturityEventMsg(obj: any): obj is ContractMaturityEventMsg {
    return obj.entityType === EntityType.ContractMaturity
}

export function isContractEventMsg(obj: any): obj is ContractEventMsg {
    return obj.entityType === EntityType.Contract
}

export function isOrderEventMsg(obj: any): obj is OrderEventMsg {
    return obj.entityType === EntityType.Order
}

export function isFillPairEventMsg(obj: any): obj is FillPairEventMsg {
    return obj.entityType === EntityType.FillPair
}

export function isCurrencyEventMsg(obj: any): obj is CurrencyEventMsg {
    return obj.entityType === EntityType.Currency
}

export function isMarginSnapshotEventMsg(obj: any): obj is MarginSnapshotEventMsg {
    return obj.entityType === EntityType.MarginSnapshot
}

export function isAccountEventMsg(obj: any): obj is AccountEventMsg {
    return obj.entityType === EntityType.Account
}

export function isCashBalanceEventMsg(obj: any): obj is CashBalanceEventMsg {
    return obj.entityType === EntityType.CashBalance
}

export function isPositionEventMsg(obj: any): obj is PositionEventMsg {
    return obj.entityType === EntityType.Position
}

export type PropsEvent = {
    e: string
    d: PropsEventMsg
}

export type ClockEventMsg = string

export type QuoteEvent = {
    e: string
    d: QuoteEventMsg
}

export type HistogramEvent = {
    e: string
    d: HistogramEventMsg
}

export type DomEvent = {
    e: string
    doms: DomEventMsg
}

export type ChartEvent = {
    e: string
    d: ChartEventMsg
}

export type QuoteEventMsg = {
    quotes: Quote[]
}

export type HistogramEventMsg = {
    histograms: Histogram[]
}

export type DomEventMsg = {
    doms: DOM[]
}

export type ChartEventMsg = {
    charts: Chart[]
}

export enum EventType {
    CREATED = 'Created',
    UPDATED = 'Updated',
    DELETED = 'Deleted'
}

export function isClockEventMsg(obj: any): obj is ClockEventMsg {
    return obj.e === 'clock' && typeof obj.d === 'string'
}

export function isQuoteEventMsg(obj: any): obj is QuoteEventMsg {
    return 'quotes' in obj && Array.isArray(obj.quotes)
}

export function isHistogramEventMsg(obj: any): obj is HistogramEventMsg {
    return 'histograms' in obj && Array.isArray(obj.histograms)
}

export function isDomEventMsg(obj: any): obj is DomEventMsg {
    return 'doms' in obj && Array.isArray(obj.doms)
}

export function isChartEventMsg(obj: any): obj is ChartEventMsg {
    return 'charts' in obj && (Array.isArray(obj.charts) || obj.charts instanceof Array)
}

export function isQuoteEvent(obj: any): obj is QuoteEvent {
    return obj && obj.e === 'string' && 'd' in obj && 'quotes' in obj.d
}

export function isHistogramEvent(obj: any): obj is HistogramEvent {
    return obj && obj.e === 'string' && 'd' in obj && 'histograms' in obj.d
}

export function isDomEvent(obj: any): obj is DomEvent {
    return obj && obj.e === 'string' && 'd' in obj && 'doms' in obj.d
}

export function isChartEvent(obj: any): obj is ChartEvent {
    return obj && obj.e === 'string' && 'd' in obj && 'charts' in obj.d
}

export function isPropsEvent(obj: any): obj is PropsEvent {
    return obj && obj.e === 'props' && obj.d
}

// export function isUserSyncEvent(obj: any): obj is UserSyncEvent {
//     return obj && obj
// }

export type Chart = BarPacket | TickPacket
export type DOM = {
    contractId: number // ID of the DOM contract
    timestamp: string //example: "2017-04-13T11:33:57.488Z"
    bids: Price[] // Actual depth of bids may varies depending on available data
    offers: Price[] // Actual depth of "offers" may varies depending on available data
}

export type Histogram = {
    contractId: number // ID of the histogram contract
    timestamp: string //example: 2017-04-13T11:33:57.412Z
    tradeDate: {
        year: number //YYYY
        month: number // MM
        day: number // DD
    }
    base: number //2338.75
    items: {[k: string]: number} // Example: "-14":5906.67 Actual number of histogram items may depend on data
    refresh: boolean
}

export type ChartRequest = {
    symbol: string | number //ESM7 | 123456,
    chartDescription: ChartDescription
    timeRange: {
        // All fields in timeRange are optional, but at least any one is required
        closestTimestamp?: string
        closestTickId?: number
        asFarAsTimestamp?: string
        asMuchAsElements?: number
    }
}

export type ChartDescription = {
    underlyingType: BarType // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
    elementSize: number
    elementSizeUnit: ElementSizeUnit // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
    withHistogram: boolean
}

export type TickPacket = {
    id: number // Subscription ID, the same as historical/real-time subscription IDs from request response.
    eoh?: boolean // End-of-history used in historical data loads indicates that historical ticks are loaded and further packets will contain real-time ticks
    s: string // Source of packet data.
    td: string // Trade date YYYYMMDD.
    bp: number // Base price of the packet (integer number of contract tick sizes). Tick prices are calculated as relative from this one.
    bt: number // Base timestamp of the packet. Tick timestamps are calculated as relative from this value.
    ts: number // Tick size of the contract for which the tick chart is requested.
    tks: TickRaw[]
}

export type TickRaw = {
    id: number // Tick ID
    t: number // Tick relative timestamp. Actual tick timestamp is packet.bt + tick.t
    p: number // Tick relative price (in contract tick sizes). Actual tick price is packet.bp + tick.p
    s: number // Tick size (seems more proper name should be tick volume). Please don't confuse with contract tick size (packet.ts).
    b: number // Bid relative price (optional). Actual bid price is packet.bp + tick.b
    a: number // Ask relative price (optional).Actual ask price is packet.bp + tick.a
    bs: number // Bid size (optional).
    as: number // Ask size (optional).
}

export type BarPacket = {
    id: number // id matches either historicalId or realtimeId values from response
    td: number // Trade date as a number with value YYYYMMDD
    bars: Bar[]
}
export type Payload = {
    data: any
    props: StrategyProps | any
}
export type ChartAction = {
    event: StrategyEvent.Chart
    payload: ChartPayload
}

export type PropsAction = {
    event: StrategyEvent.Props
    payload: PropsPayload
}

export type UserSyncAction = {
    event: StrategyEvent.UserSync
    payload: UserSyncPayload
}

export type ReplayCompleteAction = {
    event: StrategyEvent.ReplayComplete
    payload: ReplayCompletePayload
}

export type StopAction = {
    event: StrategyEvent.Stop
    payload: {[key: string]: any} | undefined
}

export type ReplayResetAction = {
    event: StrategyEvent.ReplayReset
    payload: {[key: string]: any} | undefined
}

export type ClockAction = {
    event: StrategyEvent.Clock
    payload: string
}

export type NextReplayAction = {
    event: StrategyEvent.NextReplay
    payload: {[key: string]: any} | undefined
}

export type DOMAction = {
    event: StrategyEvent.DOM
    payload: DOM
}

export type QuoteAction = {
    event: StrategyEvent.Quote
    payload: Quote
}

export type CustomActionTemplate<T extends string, U> = {event: T; payload: U}

export type RequestAction = {
    event: TvEndpoint
    payload: {[key: string]: any}
}

export function isRequestAction(action: any): action is RequestAction {
    return (
        action &&
        action.event &&
        (ReversedTvEndpoint as Record<string, string>)[action.event] !== undefined
    )
}

export type ReplayCompletePayload = {[key: string]: any}

export type ProductFoundPayload = {name: string}

export type UserSyncPayload = SyncRequestResponse

export type PropsPayload = PropsEventMsg

export type ChartPayload = BarPacket | TickPacket

export type Action =
    | ChartAction
    | PropsAction
    | UserSyncAction
    | ReplayCompleteAction
    // | PlaceOrderAction
    // | PlaceOCOAction
    // | StartOrderStrategyAction
    | StopAction
    | ReplayResetAction
    | ClockAction
    | NextReplayAction
    | DOMAction
    | QuoteAction
    | RequestAction

// {
//     event: StrategyEvent
//     payload: Payload
// }

export enum Trend {
    DOWN = -1,
    NA = 0,
    UP = 1
}

export type AccessToken = {
    accessToken?: string
    expiration?: string
}

export type MdAccessToken = {
    mdAccessToken?: string
    expiration?: string
}

export type HTTPErrorResponse = {
    d: string
    i: number
    s: number
}

export type ServerEvent = {
    e: StrategyEvent
    d:
        | QuoteEventMsg
        | ChartEventMsg
        | HistogramEventMsg
        | DomEventMsg
        | ClockEventMsg
        | PropsEvent
}

export type ResponseMsg<T extends keyof EndpointResponse> = {
    d: EndpointResponse[T]
    i: number
    s: number
}

export interface SimpleRequest<T extends EndpointURLs> {
    url: string
    onResponse?: (item: ResponseMsg<T>) => void
    onReject?: () => void
}

export type OrderListRequest = {
    url?: 'order/list'
    onResponse?: (item: ResponseMsg<'order/list'>) => void
    onReject?: () => void
}

export type OrderItemRequest = {
    url: string
    query: {id: number}
    onResponse?: (item: ResponseMsg<'order/item'>) => void
    onReject?: () => void
}

export type EndpointURLs = keyof EndpointResponse

export type SubscribeURLs = keyof SubscribeMap

export type LiquidatePositionRequestBody = {
    accountId: number
    contractId: number
    admin: boolean
    customTag50?: string
}

export type PlaceOSORequestBody = {
    accountSpec: string
    accountId: number
    clOrdId: string
    action: OrderAction
    symbol: string
    orderQty: number
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow: number
    pegDifference?: number
    timeInForce: TimeInForce
    expireTime?: string
    text: string
    activationTime?: string
    customTag50?: string
    isAutomated: boolean
    bracket1: RestrainedOrderVersion
    bracket2: RestrainedOrderVersion
}

export type RestrainedOrderVersion = {
    action: OrderAction
    clOrdId: string
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow: number
    pegDifference?: number
    timeInForce: TimeInForce
    expireTime?: string
    text: string
}
export type MarketDataSubscription = {
    id: number
    userId: number
    timestamp: string
    planPrice: number
    creditCardTransactionId: number
    cashBalanceLogId: number
    creditCardId: number
    accountId: number
    marketDataSubscriptionPlanId: number
    year: number
    month: number
    renewalCreditCardId: number
    renewalAccountId: number
}
export type TradovateSubscription = {
    id?: number
    userId: number
    timestamp: string
    planPrice: number
    creditCardTransactionId?: number
    cashBalanceLogId?: number
    creditCardId?: number
    accountId?: number
    tradovateSubscriptionPlanId: number
    startDate: TradeDate
    expirationDate: TradeDate
    paidAmount: number
    cancelledRenewal: boolean
    cancelReason?: string
}
export type PostChatMessageRequestBody = {
    userId: number
    category: 'Support' | 'TradeDesk'
    text: string
}
export type ChangePluginPermissionRequestBody = {
    userId: number
    pluginName: string
    approval: boolean
}
export type AddEntitlementSubscriptionRequestBody = {
    entitlementId: number
    creditCardId: number
    accountId: number
    userId: number
}

export type SignUpOrganizationMemberRequestBody = {
    name: string
    email: string
    password: string
    firstName: string
    lastName: string
}

export type RequestTradingPermissionRequestBody = {
    accountId: number
    ctaContact: string
    ctaEmail: string
}

export type OpenDemoAccountRequestBody = {
    templateAccountId: number
    name: string
    initialBalance: number
}

export type ModifyPasswordRequestBody = {
    userId: number
    password: string
    currentPassword: string
}

export type ModifyCredentialsRequestBody = {
    userId: number
    name: string
    password: string
    currentPassword: string
}

export type CancelTradovateSubscriptionRequestBody = {
    tradovateSubscriptionId: number
    cancelReason?: string
    expire: boolean
}

export type AddTradovateSubscriptionRequestBody = {
    tradovateSubscriptionPlanId: number
    creditCardId: number
    accountId: number
    userId: number
}
export type AddMarketDataSubscriptionRequestBody = {
    marketDataSubscriptionPlanIds: number[]
    year: number
    month: number
    creditCardId?: number
    accountId?: number
    userId: number
}
export type AddSecondMarketDataSubscriptionRequestBody = {
    year: number
    month: number
    creditCardId?: number
    accountId?: number
    userId?: number
}

export type CancelOrderRequestBody = {
    orderId: number
    clOrdId?: string
    activationTime?: string
    customTag50?: string
    isAutomated?: boolean
}

export type ModifyOrderStrategyRequestBody = {
    orderStrategyId: number
    command: string
    customTag50?: string
}

export type EndpointRequestBody = {
    'md/subscribequote': {symbol: string}
    'md/getchart': {
        symbol: string
        chartDescription: ChartDescription
        timeRange: TimeRange
    }
    'md/subscribehistogram': {symbol: string}
    'md/subscribedom': {symbol: string}
    'md/unsubscribehistogram': CancelBody
    'md/unsubscribequote': CancelBody
    'md/unsubscribedom': CancelBody
    'md/cancelchart': CancelChartBody
    authorize: string //{token: string}
    'auth/accesstokenrequest': AccessTokenRequestBody
    'auth/me': undefined
    'auth/oauthtoken': OAuthTokenRequestBody
    'auth/renewaccesstoken': undefined
    'contract/deps': undefined
    'contract/find': undefined
    'contract/getproductfeeparams': undefined
    'contract/item': undefined
    'contract/items': undefined
    'contract/ldeps': undefined
    'contract/rollcontract': RollContractRequestBody
    'contract/suggest': undefined
    'contractGroup/find': undefined
    'contractGroup/item': undefined
    'contractGroup/items': undefined
    'contractGroup/list': undefined
    'contractGroup/suggest': undefined
    'contractMaturity/deps': undefined
    'contractMaturity/item': undefined
    'contractMaturity/items': undefined
    'contractMaturity/ldeps': undefined
    'currency/find': undefined
    'currency/item': undefined
    'currency/items': undefined
    'currency/list': undefined
    'currency/suggest': undefined
    'currencyRate/deps': undefined
    'currencyRate/item': undefined
    'currencyRate/items': undefined
    'currencyRate/ldeps': undefined
    'currencyRate/list': undefined
    'exchange/find': undefined
    'exchange/item': undefined
    'exchange/items': undefined
    'exchange/list': undefined
    'exchange/suggest': undefined
    'product/deps': undefined
    'product/find': undefined
    'product/item': undefined
    'product/items': undefined
    'product/ldeps': undefined
    'product/list': undefined
    'product/suggest': undefined
    'productSession/deps': undefined
    'productSession/item': undefined
    'productSession/items': undefined
    'productSession/ldeps': undefined
    'spreadDefinition/item': undefined
    'spreadDefinition/items': undefined
    'accountRiskStatus/deps': undefined
    'accountRiskStatus/item': undefined
    'accountRiskStatus/items': undefined
    'accountRiskStatus/ldeps': undefined
    'accountRiskStatus/list': undefined
    'contractMargin/deps': undefined
    'contractMargin/item': undefined
    'contractMargin/items': undefined
    'contractMargin/ldeps': undefined
    'productMargin/deps': undefined
    'productMargin/item': undefined
    'productMargin/items': undefined
    'productMargin/ldeps': undefined
    'productMargin/list': undefined
    'userAccountAutoLiq/create': UserAccountAutoLiq
    'userAccountAutoLiq/deps': undefined
    'userAccountAutoLiq/item': undefined
    'userAccountAutoLiq/items': undefined
    'userAccountAutoLiq/ldeps': undefined
    'userAccountAutoLiq/list': undefined
    'userAccountAutoLiq/update': UserAccountAutoLiq
    'userAccountPositionLimit/create': UserAccountAutoLiq
    'userAccountPositionLimit/deps': undefined
    'userAccountPositionLimit/item': undefined
    'userAccountPositionLimit/items': undefined
    'userAccountPositionLimit/ldeps': undefined
    'userAccountPositionLimit/update': UserAccountPositionLimit
    'userAccountRiskParameter/create': UserAccountPositionLimit
    'userAccountRiskParameter/deps': undefined
    'userAccountRiskParameter/item': undefined
    'userAccountRiskParameter/items': undefined
    'userAccountRiskParameter/ldeps': undefined
    'userAccountRiskParameter/update': UserAccountRiskParameter
    'command/deps': undefined
    'command/item': undefined
    'command/items': undefined
    'command/ldeps': undefined
    'command/list': undefined
    'commandReport/deps': undefined
    'commandReport/item': undefined
    'commandReport/items': undefined
    'commandReport/ldeps': undefined
    'commandReport/list': undefined
    'executionReport/deps': undefined
    'executionReport/find': undefined
    'executionReport/item': undefined
    'executionReport/items': undefined
    'executionReport/ldeps': undefined
    'executionReport/list': undefined
    'executionReport/suggest': undefined
    'fill/deps': undefined
    'fill/item': undefined
    'fill/items': undefined
    'fill/ldeps': undefined
    'fill/list': undefined
    'fillFee/deps': undefined
    'fillFee/item': undefined
    'fillFee/items': undefined
    'fillFee/ldeps': undefined
    'fillFee/list': undefined
    'order/deps': undefined
    'order/item': undefined
    'order/items': undefined
    'order/ldeps': undefined
    'order/liquidateposition': LiquidatePositionRequestBody
    'order/list': undefined
    'order/placeorder': PlaceOrderRequestBody
    'order/placeoco': PlaceOCORequestBody
    'order/modifyorder': ModifyOrderRequestBody
    'order/placeoso': PlaceOSORequestBody
    'order/cancelorder': CancelOrderRequestBody
    'orderStrategy/deps': undefined
    'orderStrategy/interruptorderstrategy': undefined
    'orderStrategy/item': undefined
    'orderStrategy/items': undefined
    'orderStrategy/ldeps': undefined
    'orderStrategy/list': undefined
    'orderStrategy/modifyorderstrategy': ModifyOrderStrategyRequestBody
    'orderStrategy/startorderstrategy': StartOrderStrategyRequestBody
    'orderStrategyLink/deps': undefined
    'orderStrategyLink/item': undefined
    'orderStrategyLink/items': undefined
    'orderStrategyLink/ldeps': undefined
    'orderStrategyLink/list': undefined
    'orderVersion/deps': undefined
    'orderVersion/item': undefined
    'orderVersion/items': undefined
    'orderVersion/ldeps': undefined
    'orderVersion/list': undefined
    'fillPair/deps': undefined
    'fillPair/item': undefined
    'fillPair/items': undefined
    'fillPair/ldeps': undefined
    'fillPair/list': undefined
    'position/deps': undefined
    'position/find': undefined
    'position/item': undefined
    'position/items': undefined
    'position/ldeps': undefined
    'position/list': undefined
    'account/deps': undefined
    'account/find': undefined
    'account/item': undefined
    'account/items': undefined
    'account/ldeps': undefined
    'account/list': undefined
    'account/suggest': undefined
    'cashBalance/deps': undefined
    'cashBalance/getcashbalancesnapshot': {accountId: number}
    'cashBalance/item': undefined
    'cashBalance/items': undefined
    'cashBalance/ldeps': undefined
    'cashBalance/list': undefined
    'cashBalanceLog/deps': undefined
    'cashBalanceLog/item': undefined
    'cashBalanceLog/items': undefined
    'cashBalanceLog/ldeps': undefined
    'marginSnapshot/deps': undefined
    'marginSnapshot/item': undefined
    'marginSnapshot/items': undefined
    'marginSnapshot/ldeps': undefined
    'marginSnapshot/list': undefined
    'tradingPermission/deps': undefined
    'tradingPermission/item': undefined
    'tradingPermission/items': undefined
    'tradingPermission/ldeps': undefined
    'tradingPermission/list': undefined
    'marketDataSubscriptionExchangeScope/find': undefined
    'marketDataSubscriptionExchangeScope/item': undefined
    'marketDataSubscriptionExchangeScope/items': undefined
    'marketDataSubscriptionExchangeScope/list': undefined
    'marketDataSubscriptionExchangeScope/suggest': undefined
    'marketDataSubscriptionPlan/find': undefined
    'marketDataSubscriptionPlan/item': undefined
    'marketDataSubscriptionPlan/items': undefined
    'marketDataSubscriptionPlan/list': undefined
    'marketDataSubscriptionPlan/suggest': undefined
    'tradovateSubscriptionPlan/find': undefined
    'tradovateSubscriptionPlan/item': undefined
    'tradovateSubscriptionPlan/items': undefined
    'tradovateSubscriptionPlan/list': undefined
    'tradovateSubscriptionPlan/suggest': undefined
    'replay/changespeed': {speed: number}
    'replay/checkreplaysession': {startTimestamp: string}
    'replay/initializeclock': {
        startTimestamp: string
        speed: number
        initialBalance: number
    }
    'adminAlertSignal/completealertsignal': {adminAlertSignalId: number}
    'adminAlertSignal/takealertsignalownership': {adminAlertSignalId: number}
    'adminAlert/deps': undefined
    'adminAlert/item': undefined
    'adminAlert/items': undefined
    'adminAlert/ldeps': undefined
    'adminAlert/list': undefined
    'adminAlertSignal/deps': undefined
    'adminAlertSignal/item': undefined
    'adminAlertSignal/items': undefined
    'adminAlertSignal/ldeps': undefined
    'adminAlertSignal/list': undefined
    'alert/createalert': undefined
    'alert/deletealert': undefined
    'alert/deps': undefined
    'alert/dismissalert': undefined
    'alert/item': undefined
    'alert/items': undefined
    'alert/ldeps': undefined
    'alert/list': undefined
    'alert/markreadalertsignal': undefined
    'alert/modifyalert': undefined
    'alert/resetalert': undefined
    'alertSignal/deps': undefined
    'alertSignal/item': undefined
    'alertSignal/items': undefined
    'alertSignal/ldeps': undefined
    'alertSignal/list': undefined
    'clearingHouse/deps': undefined
    'clearingHouse/item': undefined
    'clearingHouse/items': undefined
    'clearingHouse/list': undefined
    'clearingHouse/suggest': undefined
    'entitlement/item': undefined
    'entitlement/items': undefined
    'entitlement/list': undefined
    'orderStrategyType/find': undefined
    'orderStrategyType/item': undefined
    'orderStrategyType/items': undefined
    'orderStrategyType/list': undefined
    'orderStrategyType/suggest': undefined
    'property/find': undefined
    'property/item': undefined
    'property/items': undefined
    'property/list': undefined
    'property/suggest': undefined
    'contactInfo/deps': undefined
    'contactInfo/item': undefined
    'contactInfo/items': undefined
    'contactInfo/ldeps': undefined
    'marketDataSubscription/create': MarketDataSubscription
    'marketDataSubscription/deps': undefined
    'marketDataSubscription/item': undefined
    'marketDataSubscription/items': undefined
    'marketDataSubscription/ldeps': undefined
    'marketDataSubscription/list': undefined
    'marketDataSubscription/update': MarketDataSubscription
    'organization/find': undefined
    'organization/item': undefined
    'organization/items': undefined
    'organization/list': undefined
    'organization/suggest': undefined
    'secondMarketDataSubscription/deps': undefined
    'secondMarketDataSubscription/item': undefined
    'secondMarketDataSubscription/items': undefined
    'secondMarketDataSubscription/ldeps': undefined
    'secondMarketDataSubscription/list': undefined
    'tradovateSubscription/create': TradovateSubscription
    'tradovateSubscription/deps': undefined
    'tradovateSubscription/item': undefined
    'tradovateSubscription/items': undefined
    'tradovateSubscription/ldeps': undefined
    'tradovateSubscription/list': undefined
    'tradovateSubscription/update': TradovateSubscription
    'user/find': undefined
    'user/getaccounttradingpermissions': undefined
    'user/item': undefined
    'user/items': undefined
    'user/list': undefined
    'user/suggest': undefined
    'user/syncrequest': {accounts: number[]}
    'userPlugin/create': UserPlugin
    'userPlugin/deps': undefined
    'userPlugin/item': undefined
    'userPlugin/items': undefined
    'userPlugin/ldeps': undefined
    'userPlugin/list': undefined
    'userPlugin/update': UserPlugin
    'userProperty/deps': undefined
    'userProperty/item': undefined
    'userProperty/items': undefined
    'userProperty/ldeps': undefined
    'userSession/item': undefined
    'userSession/items': undefined
    'userSessionStats/deps': undefined
    'userSessionStats/item': undefined
    'userSessionStats/items': undefined
    'userSessionStats/ldeps': undefined
    'userSessionStats/list': undefined
    'chat/closechat': undefined
    'chat/deps': undefined
    'chat/item': undefined
    'chat/items': undefined
    'chat/ldeps': undefined
    'chat/list': undefined
    'chat/markasreadchatmessage': {chatMessageId: number}
    'chat/postchatmessage': PostChatMessageRequestBody
    'chatMessage/deps': undefined
    'chatMessage/item': undefined
    'chatMessage/items': undefined
    'chatMessage/ldeps': undefined
    'userAccountPositionLimit/deleteuseraccountpositionlimit': {
        userAccountPositionLimitId: number
    }
    'userAccountPositionLimit/deleteuseraccountriskparameter': {
        userAccountRiskParameterId: number
    }
    'user/accepttradingpermission': {tradingPermissionId: number}
    'user/activatesecondmarketdatasubscriptionrenewal': {
        secondMarketDataSubscriptionId: number
    }
    'user/addmarketdatasubscription': AddMarketDataSubscriptionRequestBody
    'user/addsecondmarketdatasubscription': AddSecondMarketDataSubscriptionRequestBody
    'user/addtradovatesubscription': AddTradovateSubscriptionRequestBody
    'user/cancelsecondmarketdatasubscription': {secondMarketDataSubscriptionId: number}
    'user/cancelsecondmarketdatasubscriptionrenewal': {
        secondMarketDataSubscriptionId: number
    }
    'user/canceltradovatesubscription': CancelTradovateSubscriptionRequestBody
    'user/modifycredentials': ModifyCredentialsRequestBody
    'user/modifyemailaddress': {userid?: number; email: string}
    'user/modifypassword': ModifyPasswordRequestBody
    'user/opendemoaccount': OpenDemoAccountRequestBody
    'user/requesttradingpermission': RequestTradingPermissionRequestBody
    'user/revoketradingpermission': {revoketradingpermission: number}
    'user/signuporganizationmember': SignUpOrganizationMemberRequestBody
    'user/addentitlementsubscription': AddEntitlementSubscriptionRequestBody
    'user/changepluginpermission': ChangePluginPermissionRequestBody
}

export type EndpointRequestQuery = {
    'md/getchart': undefined
    'md/subscribehistogram': undefined
    'md/subscribequote': undefined
    'md/subscribedom': undefined
    'md/unsubscribehistogram': undefined
    'md/unsubscribequote': undefined
    'md/unsubscribedom': undefined
    'md/cancelchart': undefined
    authorize: undefined
    'auth/accesstokenrequest': undefined
    'auth/me': undefined
    'auth/oauthtoken': undefined
    'auth/renewaccesstoken': undefined
    'contract/deps': QueryMasterId
    'contract/find': QueryName
    'contract/getproductfeeparams': QueryProductIds
    'contract/item': QueryId
    'contract/items': QueryIds
    'contract/ldeps': QueryMasterIds
    'contract/rollcontract': undefined
    'contract/suggest': ContractSuggestQuery
    'contractGroup/find': QueryName
    'contractGroup/item': QueryId
    'contractGroup/items': QueryIds
    'contractGroup/list': undefined
    'contractGroup/suggest': QuerySuggest
    'contractMaturity/deps': QueryMasterId
    'contractMaturity/item': QueryId
    'contractMaturity/items': QueryIds
    'contractMaturity/ldeps': QueryMasterIds
    'currency/find': QueryName
    'currency/item': QueryId
    'currency/items': QueryIds
    'currency/list': undefined
    'currency/suggest': QuerySuggest
    'currencyRate/deps': QueryMasterId
    'currencyRate/item': QueryId
    'currencyRate/items': QueryIds
    'currencyRate/ldeps': QueryMasterIds
    'currencyRate/list': undefined
    'exchange/find': QueryName
    'exchange/item': QueryId
    'exchange/items': QueryIds
    'exchange/list': undefined
    'exchange/suggest': QuerySuggest
    'product/deps': QueryMasterId
    'product/find': QueryName
    'product/item': QueryId
    'product/items': QueryIds
    'product/ldeps': QueryMasterIds
    'product/list': undefined
    'product/suggest': QuerySuggest
    'productSession/deps': QueryMasterId
    'productSession/item': QueryId
    'productSession/items': QueryIds
    'productSession/ldeps': QueryMasterIds
    'spreadDefinition/item': QueryId
    'spreadDefinition/items': QueryIds
    'accountRiskStatus/deps': QueryMasterId
    'accountRiskStatus/item': QueryId
    'accountRiskStatus/items': QueryIds
    'accountRiskStatus/ldeps': QueryMasterIds
    'accountRiskStatus/list': undefined
    'contractMargin/deps': QueryMasterId
    'contractMargin/item': QueryId
    'contractMargin/items': QueryIds
    'contractMargin/ldeps': QueryMasterIds
    'productMargin/deps': QueryMasterId
    'productMargin/item': QueryId
    'productMargin/items': QueryIds
    'productMargin/ldeps': QueryMasterIds
    'productMargin/list': undefined
    'userAccountAutoLiq/create': undefined
    'userAccountAutoLiq/deps': QueryMasterId
    'userAccountAutoLiq/item': QueryId
    'userAccountAutoLiq/items': QueryIds
    'userAccountAutoLiq/ldeps': QueryMasterIds
    'userAccountAutoLiq/list': undefined
    'userAccountAutoLiq/update': undefined
    'userAccountPositionLimit/create': undefined
    'userAccountPositionLimit/deps': QueryMasterId
    'userAccountPositionLimit/item': QueryId
    'userAccountPositionLimit/items': QueryIds
    'userAccountPositionLimit/ldeps': QueryMasterIds
    'userAccountPositionLimit/update': undefined
    'userAccountRiskParameter/create': undefined
    'userAccountRiskParameter/deps': QueryMasterId
    'userAccountRiskParameter/item': QueryId
    'userAccountRiskParameter/items': QueryIds
    'userAccountRiskParameter/ldeps': QueryMasterIds
    'userAccountRiskParameter/update': undefined
    'command/deps': QueryMasterId
    'command/item': QueryId
    'command/items': QueryIds
    'command/ldeps': QueryMasterIds
    'command/list': undefined
    'commandReport/deps': QueryMasterId
    'commandReport/item': QueryId
    'commandReport/items': QueryIds
    'commandReport/ldeps': QueryMasterIds
    'commandReport/list': undefined
    'executionReport/deps': QueryMasterIds
    'executionReport/find': QueryName
    'executionReport/item': QueryId
    'executionReport/items': QueryIds
    'executionReport/ldeps': QueryMasterIds
    'executionReport/list': undefined
    'executionReport/suggest': QuerySuggest
    'fill/deps': QueryMasterIds
    'fill/item': QueryId
    'fill/items': QueryIds
    'fill/ldeps': QueryMasterIds
    'fill/list': undefined
    'fillFee/deps': QueryMasterIds
    'fillFee/item': QueryId
    'fillFee/items': QueryIds
    'fillFee/ldeps': QueryMasterIds
    'fillFee/list': undefined
    'order/deps': QueryMasterIds
    'order/item': QueryId
    'order/items': QueryIds
    'order/ldeps': QueryMasterIds
    'order/liquidateposition': undefined
    'order/list': undefined
    'order/modifyorder': undefined
    'order/placeoco': undefined
    'order/placeorder': undefined
    'order/placeoso': undefined
    'order/cancelorder': undefined
    'orderStrategy/deps': QueryMasterIds
    'orderStrategy/interruptorderstrategy': undefined
    'orderStrategy/item': QueryId
    'orderStrategy/items': QueryIds
    'orderStrategy/ldeps': QueryMasterIds
    'orderStrategy/list': undefined
    'orderStrategy/modifyorderstrategy': undefined
    'orderStrategy/startorderstrategy': undefined
    'orderStrategyLink/deps': QueryMasterIds
    'orderStrategyLink/item': QueryId
    'orderStrategyLink/items': QueryIds
    'orderStrategyLink/ldeps': QueryMasterIds
    'orderStrategyLink/list': undefined
    'orderVersion/deps': QueryMasterIds
    'orderVersion/item': QueryId
    'orderVersion/items': QueryIds
    'orderVersion/ldeps': QueryMasterIds
    'orderVersion/list': undefined
    'fillPair/deps': QueryMasterIds
    'fillPair/item': QueryId
    'fillPair/items': QueryIds
    'fillPair/ldeps': QueryMasterIds
    'fillPair/list': undefined
    'position/deps': QueryMasterIds
    'position/find': QueryName
    'position/item': QueryId
    'position/items': QueryIds
    'position/ldeps': QueryMasterIds
    'position/list': undefined
    'account/deps': QueryMasterIds
    'account/find': QueryName
    'account/item': QueryId
    'account/items': QueryIds
    'account/ldeps': QueryMasterIds
    'account/list': undefined
    'account/suggest': QuerySuggest
    'cashBalance/deps': QueryMasterIds
    'cashBalance/getcashbalancesnapshot': undefined
    'cashBalance/item': QueryId
    'cashBalance/items': QueryIds
    'cashBalance/ldeps': QueryMasterIds
    'cashBalance/list': undefined
    'cashBalanceLog/deps': QueryMasterIds
    'cashBalanceLog/item': QueryId
    'cashBalanceLog/items': QueryIds
    'cashBalanceLog/ldeps': QueryMasterIds
    'marginSnapshot/deps': QueryMasterIds
    'marginSnapshot/item': QueryId
    'marginSnapshot/items': QueryIds
    'marginSnapshot/ldeps': QueryMasterIds
    'marginSnapshot/list': undefined
    'tradingPermission/deps': QueryMasterIds
    'tradingPermission/item': QueryId
    'tradingPermission/items': QueryIds
    'tradingPermission/ldeps': QueryMasterIds
    'tradingPermission/list': undefined
    'marketDataSubscriptionExchangeScope/find': QueryName
    'marketDataSubscriptionExchangeScope/item': QueryId
    'marketDataSubscriptionExchangeScope/items': QueryIds
    'marketDataSubscriptionExchangeScope/list': undefined
    'marketDataSubscriptionExchangeScope/suggest': QuerySuggest
    'marketDataSubscriptionPlan/find': QueryName
    'marketDataSubscriptionPlan/item': QueryId
    'marketDataSubscriptionPlan/items': QueryIds
    'marketDataSubscriptionPlan/list': undefined
    'marketDataSubscriptionPlan/suggest': QuerySuggest
    'tradovateSubscriptionPlan/find': QueryName
    'tradovateSubscriptionPlan/item': QueryId
    'tradovateSubscriptionPlan/items': QueryIds
    'tradovateSubscriptionPlan/list': undefined
    'tradovateSubscriptionPlan/suggest': QuerySuggest
    'replay/changespeed': undefined
    'replay/checkreplaysession': undefined
    'replay/initializeclock': undefined
    'adminAlertSignal/completealertsignal': undefined
    'adminAlert/deps': QueryMasterIds
    'adminAlert/item': QueryId
    'adminAlert/items': QueryIds
    'adminAlert/ldeps': QueryMasterIds
    'adminAlert/list': undefined
    'adminAlertSignal/takealertsignalownership': undefined
    'alert/createalert': undefined
    'alert/deletealert': undefined
    'alert/deps': QueryMasterIds
    'alert/dismissalert': undefined
    'alert/item': QueryId
    'alert/items': QueryIds
    'alert/ldeps': QueryMasterIds
    'alert/list': undefined
    'alert/markreadalertsignal': undefined
    'alert/modifyalert': undefined
    'alert/resetalert': undefined
    'alertSignal/deps': QueryMasterIds
    'alertSignal/item': QueryId
    'alertSignal/items': QueryIds
    'alertSignal/ldeps': QueryMasterIds
    'alertSignal/list': undefined
    'adminAlertSignal/deps': QueryMasterIds
    'adminAlertSignal/item': QueryId
    'adminAlertSignal/items': QueryIds
    'adminAlertSignal/ldeps': QueryMasterIds
    'adminAlertSignal/list': undefined
    'clearingHouse/deps': QueryMasterIds
    'clearingHouse/item': QueryId
    'clearingHouse/items': QueryIds
    'clearingHouse/list': undefined
    'clearingHouse/suggest': QuerySuggest
    'entitlement/item': QueryId
    'entitlement/items': QueryIds
    'entitlement/list': undefined
    'orderStrategyType/find': QueryName
    'orderStrategyType/item': QueryId
    'orderStrategyType/items': QueryIds
    'orderStrategyType/list': undefined
    'orderStrategyType/suggest': QuerySuggest
    'property/find': QueryName
    'property/item': QueryId
    'property/items': QueryIds
    'property/list': undefined
    'property/suggest': QuerySuggest
    'contactInfo/deps': QueryMasterIds
    'contactInfo/item': QueryId
    'contactInfo/items': QueryIds
    'contactInfo/ldeps': QueryMasterIds
    'marketDataSubscription/create': undefined
    'marketDataSubscription/deps': QueryMasterIds
    'marketDataSubscription/item': QueryId
    'marketDataSubscription/items': QueryIds
    'marketDataSubscription/ldeps': QueryMasterIds
    'marketDataSubscription/list': undefined
    'marketDataSubscription/update': undefined
    'organization/find': QueryName
    'organization/item': QueryId
    'organization/items': QueryIds
    'organization/list': undefined
    'organization/suggest': QuerySuggest
    'secondMarketDataSubscription/deps': QueryMasterIds
    'secondMarketDataSubscription/item': QueryId
    'secondMarketDataSubscription/items': QueryIds
    'secondMarketDataSubscription/ldeps': QueryMasterIds
    'secondMarketDataSubscription/list': undefined
    'tradovateSubscription/create': undefined
    'tradovateSubscription/deps': QueryMasterIds
    'tradovateSubscription/item': QueryId
    'tradovateSubscription/items': QueryIds
    'tradovateSubscription/ldeps': QueryMasterIds
    'tradovateSubscription/list': undefined
    'tradovateSubscription/update': undefined
    'user/find': QueryName
    'user/getaccounttradingpermissions': undefined
    'user/item': QueryId
    'user/items': QueryIds
    'user/list': undefined
    'user/suggest': QuerySuggest
    'user/syncrequest': undefined
    'userPlugin/create': undefined
    'userPlugin/deps': QueryMasterIds
    'userPlugin/item': QueryId
    'userPlugin/items': QueryIds
    'userPlugin/ldeps': QueryMasterIds
    'userPlugin/list': undefined
    'userPlugin/update': undefined
    'userProperty/deps': QueryMasterIds
    'userProperty/item': QueryId
    'userProperty/items': QueryIds
    'userProperty/ldeps': QueryMasterIds
    'userSession/item': QueryId
    'userSession/items': QueryIds
    'userSessionStats/deps': QueryMasterIds
    'userSessionStats/item': QueryId
    'userSessionStats/items': QueryIds
    'userSessionStats/ldeps': QueryMasterIds
    'userSessionStats/list': undefined
    'chat/closechat': undefined
    'chat/deps': QueryMasterIds
    'chat/item': QueryId
    'chat/items': QueryIds
    'chat/ldeps': QueryMasterIds
    'chat/list': undefined
    'chat/markasreadchatmessage': undefined
    'chat/postchatmessage': undefined
    'chatMessage/deps': QueryMasterIds
    'chatMessage/item': QueryId
    'chatMessage/items': QueryIds
    'chatMessage/ldeps': QueryMasterIds
    'userAccountPositionLimit/deleteuseraccountpositionlimit': undefined

    'userAccountPositionLimit/deleteuseraccountriskparameter': undefined
    'user/accepttradingpermission': undefined
    'user/activatesecondmarketdatasubscriptionrenewal': undefined
    'user/addmarketdatasubscription': undefined
    'user/addsecondmarketdatasubscription': undefined
    'user/addtradovatesubscription': undefined
    'user/cancelsecondmarketdatasubscription': undefined
    'user/cancelsecondmarketdatasubscriptionrenewal': undefined
    'user/canceltradovatesubscription': undefined
    'user/modifycredentials': undefined
    'user/modifyemailaddress': undefined
    'user/modifypassword': undefined
    'user/opendemoaccount': undefined
    'user/requesttradingpermission': undefined
    'user/revoketradingpermission': undefined
    'user/signuporganizationmember': undefined
    'user/addentitlementsubscription': undefined
    'user/changepluginpermission': undefined
}

export type QuerySuggest = {
    t: string
    l: number
}

export type EndpointResponse = {
    'md/getchart': GetChartResponse
    'md/subscribehistogram': SimpleResponse
    'md/subscribequote': SimpleResponse
    'md/subscribedom': SimpleResponse
    'md/unsubscribehistogram': SimpleResponse
    'md/unsubscribequote': SimpleResponse
    'md/unsubscribedom': SimpleResponse
    'md/cancelchart': SimpleResponse
    authorize: undefined
    'auth/me': MeResponse
    'auth/oauthtoken': OAuthTokenResponse
    'auth/accesstokenrequest': AccessTokenResponse
    'auth/renewaccesstoken': AccessTokenResponse
    'contract/deps': Contract[]
    'contract/find': Contract
    'contract/getproductfeeparams': ProductFeeParamsResponse
    'contract/item': Contract
    'contract/items': Contract[]
    'contract/ldeps': Contract[]
    'contract/rollcontract': RollContractResponse
    'contract/suggest': Contract[]
    'contractGroup/find': ContractGroup
    'contractGroup/item': ContractGroup
    'contractGroup/items': ContractGroup[]
    'contractGroup/list': ContractGroup[]
    'contractGroup/suggest': ContractGroup[]
    'contractMaturity/deps': ContractMaturity[]
    'contractMaturity/item': ContractMaturity
    'contractMaturity/items': ContractMaturity[]
    'contractMaturity/ldeps': ContractMaturity[]
    'currency/find': Currency
    'currency/item': Currency
    'currency/items': Currency[]
    'currency/list': Currency[]
    'currency/suggest': Currency[]
    'currencyRate/deps': CurrencyRate[]
    'currencyRate/item': CurrencyRate
    'currencyRate/items': CurrencyRate[]
    'currencyRate/ldeps': CurrencyRate[]
    'currencyRate/list': CurrencyRate[]
    'exchange/find': Exchange
    'exchange/item': Exchange[]
    'exchange/items': Exchange[]
    'exchange/list': Exchange[]
    'exchange/suggest': Exchange[]
    'product/deps': Product[]
    'product/find': Product
    'product/item': Product
    'product/items': Product[]
    'product/ldeps': Product[]
    'product/list': Product[]
    'product/suggest': Product[]
    'productSession/deps': ProductSession[]
    'productSession/item': ProductSession
    'productSession/items': ProductSession[]
    'productSession/ldeps': ProductSession[]
    'spreadDefinition/item': SpreadDefinition
    'spreadDefinition/items': SpreadDefinition[]
    'accountRiskStatus/deps': AccountRiskStatus[]
    'accountRiskStatus/item': AccountRiskStatus
    'accountRiskStatus/items': AccountRiskStatus[]
    'accountRiskStatus/ldeps': AccountRiskStatus[]
    'accountRiskStatus/list': AccountRiskStatus[]
    'contractMargin/deps': ContractMargin[]
    'contractMargin/item': ContractMargin
    'contractMargin/items': ContractMargin[]
    'contractMargin/ldeps': ContractMargin[]
    'productMargin/deps': ProductMargin[]
    'productMargin/item': ProductMargin
    'productMargin/items': ProductMargin[]
    'productMargin/ldeps': ProductMargin[]
    'productMargin/list': ProductMargin[]
    'userAccountAutoLiq/create': UserAccountAutoLiq
    'userAccountAutoLiq/deps': UserAccountAutoLiq[]
    'userAccountAutoLiq/item': UserAccountAutoLiq
    'userAccountAutoLiq/items': UserAccountAutoLiq[]
    'userAccountAutoLiq/ldeps': UserAccountAutoLiq[]
    'userAccountAutoLiq/list': UserAccountAutoLiq[]
    'userAccountAutoLiq/update': UserAccountAutoLiq
    'userAccountPositionLimit/create': UserAccountPositionLimit
    'userAccountPositionLimit/deps': UserAccountPositionLimit[]
    'userAccountPositionLimit/item': UserAccountPositionLimit
    'userAccountPositionLimit/items': UserAccountPositionLimit[]
    'userAccountPositionLimit/ldeps': UserAccountPositionLimit[]
    'userAccountPositionLimit/update': UserAccountPositionLimit
    'userAccountRiskParameter/create': UserAccountRiskParameter
    'userAccountRiskParameter/deps': UserAccountRiskParameter[]
    'userAccountRiskParameter/item': UserAccountRiskParameter
    'userAccountRiskParameter/items': UserAccountRiskParameter[]
    'userAccountRiskParameter/ldeps': UserAccountRiskParameter[]
    'userAccountRiskParameter/update': UserAccountRiskParameter
    'command/deps': Command[]
    'command/item': Command
    'command/items': Command[]
    'command/ldeps': Command[]
    'command/list': Command[]
    'commandReport/deps': CommandReport[]
    'commandReport/item': CommandReport
    'commandReport/items': CommandReport[]
    'commandReport/ldeps': CommandReport[]
    'commandReport/list': CommandReport[]
    'executionReport/deps': ExecutionReport[]
    'executionReport/find': ExecutionReport
    'executionReport/item': ExecutionReport
    'executionReport/items': ExecutionReport[]
    'executionReport/ldeps': ExecutionReport[]
    'executionReport/list': ExecutionReport[]
    'executionReport/suggest': ExecutionReport[]
    'fill/deps': Fill[]
    'fill/item': Fill
    'fill/items': Fill[]
    'fill/ldeps': Fill[]
    'fill/list': Fill[]
    'fillFee/deps': FillFee[]
    'fillFee/item': FillFee
    'fillFee/items': FillFee[]
    'fillFee/ldeps': FillFee[]
    'fillFee/list': FillFee[]
    'order/deps': Order[]
    'order/item': Order
    'order/items': Order[]
    'order/ldeps': Order[]
    'order/liquidateposition': PlaceOrderResponse
    'order/list': Order[]
    'order/modifyorder': CommandResponse
    'order/placeoco': PlaceOCOOrderResponse
    'order/placeorder': PlaceOrderResponse
    'order/placeoso': PLaceOSOResult
    'order/cancelorder': CommandResponse
    'orderStrategy/deps': OrderStrategy[]
    'orderStrategy/interruptorderstrategy': OrderStrategyStatusResponse
    'orderStrategy/item': OrderStrategy
    'orderStrategy/items': OrderStrategy[]
    'orderStrategy/ldeps': OrderStrategy[]
    'orderStrategy/list': OrderStrategy[]
    'orderStrategy/modifyorderstrategy': OrderStrategyStatusResponse
    'orderStrategy/startorderstrategy': StartOrderStrategyResponse
    'orderStrategyLink/deps': OrderStrategyLink[]
    'orderStrategyLink/item': OrderStrategyLink
    'orderStrategyLink/items': OrderStrategyLink[]
    'orderStrategyLink/ldeps': OrderStrategyLink[]
    'orderStrategyLink/list': OrderStrategyLink[]
    'orderVersion/deps': OrderVersion[]
    'orderVersion/item': OrderVersion
    'orderVersion/items': OrderVersion[]
    'orderVersion/ldeps': OrderVersion[]
    'orderVersion/list': OrderVersion[]
    'fillPair/deps': FillPair[]
    'fillPair/item': FillPair
    'fillPair/items': FillPair[]
    'fillPair/ldeps': FillPair[]
    'fillPair/list': FillPair[]
    'position/deps': Position[]
    'position/find': Position
    'position/item': Position
    'position/items': Position[]
    'position/ldeps': Position[]
    'position/list': Position[]
    'account/deps': Account[]
    'account/find': Account
    'account/item': Account
    'account/items': Account[]
    'account/ldeps': Account[]
    'account/list': Account[]
    'account/suggest': Account[]
    'cashBalance/deps': CashBalance[]
    'cashBalance/getcashbalancesnapshot': CashBalanceSnapshot
    'cashBalance/item': CashBalance
    'cashBalance/items': CashBalance[]
    'cashBalance/ldeps': CashBalance[]
    'cashBalance/list': CashBalance[]
    'cashBalanceLog/deps': CashBalanceLog[]
    'cashBalanceLog/item': CashBalanceLog
    'cashBalanceLog/items': CashBalanceLog[]
    'cashBalanceLog/ldeps': CashBalanceLog[]
    'marginSnapshot/deps': MarginSnapshot[]
    'marginSnapshot/item': MarginSnapshot
    'marginSnapshot/items': MarginSnapshot[]
    'marginSnapshot/ldeps': MarginSnapshot[]
    'marginSnapshot/list': MarginSnapshot[]
    'tradingPermission/deps': TradingPermission[]
    'tradingPermission/item': TradingPermission
    'tradingPermission/items': TradingPermission[]
    'tradingPermission/ldeps': TradingPermission[]
    'tradingPermission/list': TradingPermission[]
    'marketDataSubscriptionExchangeScope/find': MarketDataSubscriptionExchangeScope
    'marketDataSubscriptionExchangeScope/item': MarketDataSubscriptionExchangeScope
    'marketDataSubscriptionExchangeScope/items': MarketDataSubscriptionExchangeScope[]
    'marketDataSubscriptionExchangeScope/list': MarketDataSubscriptionExchangeScope[]
    'marketDataSubscriptionExchangeScope/suggest': MarketDataSubscriptionExchangeScope[]
    'marketDataSubscriptionPlan/find': MarketDataSubscriptionPlan
    'marketDataSubscriptionPlan/item': MarketDataSubscriptionPlan
    'marketDataSubscriptionPlan/items': MarketDataSubscriptionPlan[]
    'marketDataSubscriptionPlan/list': MarketDataSubscriptionPlan[]
    'marketDataSubscriptionPlan/suggest': MarketDataSubscriptionPlan[]
    'tradovateSubscriptionPlan/find': TradovateSubscriptionPlan
    'tradovateSubscriptionPlan/item': TradovateSubscriptionPlan
    'tradovateSubscriptionPlan/items': TradovateSubscriptionPlan[]
    'tradovateSubscriptionPlan/list': TradovateSubscriptionPlan[]
    'tradovateSubscriptionPlan/suggest': TradovateSubscriptionPlan[]
    'replay/changespeed': ChangeSpeedResponse
    'replay/checkreplaysession': CheckReplaySessionResponse
    'replay/initializeclock': SimpleResponse
    'adminAlertSignal/completealertsignal': AdminAlertSignalResponse
    'adminAlert/deps': AdminAlert[]
    'adminAlert/item': AdminAlert
    'adminAlert/items': AdminAlert[]
    'adminAlert/ldeps': AdminAlert[]
    'adminAlert/list': AdminAlert[]
    'adminAlertSignal/takealertsignalownership': AdminAlertSignalResponse
    'alert/createalert': AlertResponse
    'alert/deletealert': AlertResponse
    'alert/deps': Alert[]
    'alert/dismissalert': AlertResponse
    'alert/item': Alert
    'alert/items': Alert[]
    'alert/ldeps': Alert[]
    'alert/list': Alert[]
    'alert/markreadalertsignal': AlertResponse
    'alert/modifyalert': AlertResponse
    'alert/resetalert': AlertResponse
    'alertSignal/deps': AlertSignal
    'alertSignal/item': AlertSignal
    'alertSignal/items': AlertSignal[]
    'alertSignal/ldeps': AlertSignal[]
    'alertSignal/list': AlertSignal[]
    'adminAlertSignal/deps': AdminAlertSignal[]
    'adminAlertSignal/item': AdminAlertSignal
    'adminAlertSignal/items': AdminAlertSignal[]
    'adminAlertSignal/ldeps': AdminAlertSignal[]
    'adminAlertSignal/list': AdminAlertSignal[]
    'clearingHouse/deps': ClearingHouse[]
    'clearingHouse/item': ClearingHouse
    'clearingHouse/items': ClearingHouse[]
    'clearingHouse/list': ClearingHouse[]
    'clearingHouse/suggest': ClearingHouse[]
    'entitlement/item': Entitlement
    'entitlement/items': Entitlement[]
    'entitlement/list': Entitlement[]
    'orderStrategyType/find': OrderStrategyType
    'orderStrategyType/item': OrderStrategyType
    'orderStrategyType/items': OrderStrategyType[]
    'orderStrategyType/list': OrderStrategyType[]
    'orderStrategyType/suggest': OrderStrategyType[]
    'property/find': Property
    'property/item': Property
    'property/items': Property[]
    'property/list': Property[]
    'property/suggest': Property[]
    'contactInfo/deps': ContactInfo[]
    'contactInfo/item': ContactInfo
    'contactInfo/items': ContactInfo[]
    'contactInfo/ldeps': ContactInfo[]
    'marketDataSubscription/create': MarketDataSubscription
    'marketDataSubscription/deps': MarketDataSubscription[]
    'marketDataSubscription/item': MarketDataSubscription
    'marketDataSubscription/items': MarketDataSubscription[]
    'marketDataSubscription/ldeps': MarketDataSubscription[]
    'marketDataSubscription/list': MarketDataSubscription[]
    'marketDataSubscription/update': MarketDataSubscription
    'organization/find': Organization
    'organization/item': Organization
    'organization/items': Organization[]
    'organization/list': Organization[]
    'organization/suggest': Organization[]
    'secondMarketDataSubscription/deps': SecondMarketDataSubscription[]
    'secondMarketDataSubscription/item': SecondMarketDataSubscription
    'secondMarketDataSubscription/items': SecondMarketDataSubscription[]
    'secondMarketDataSubscription/ldeps': SecondMarketDataSubscription[]
    'secondMarketDataSubscription/list': SecondMarketDataSubscription[]
    'tradovateSubscription/create': TradovateSubscription
    'tradovateSubscription/deps': TradovateSubscription[]
    'tradovateSubscription/item': TradovateSubscription
    'tradovateSubscription/items': TradovateSubscription[]
    'tradovateSubscription/ldeps': TradovateSubscription[]
    'tradovateSubscription/list': TradovateSubscription[]
    'tradovateSubscription/update': TradovateSubscription
    'user/find': User
    'user/getaccounttradingpermissions': {tradingPermissions: TradingPermission[]}
    'user/item': User
    'user/items': User[]
    'user/list': User[]
    'user/suggest': User[]
    'user/syncrequest': SyncRequestResponse
    'userPlugin/create': UserPlugin
    'userPlugin/deps': UserPlugin[]
    'userPlugin/item': UserPlugin
    'userPlugin/items': UserPlugin[]
    'userPlugin/ldeps': UserPlugin[]
    'userPlugin/list': UserPlugin[]
    'userPlugin/update': UserPlugin
    'userProperty/deps': UserProperty[]
    'userProperty/item': UserProperty
    'userProperty/items': UserProperty[]
    'userProperty/ldeps': UserProperty[]
    'userSession/item': UserSession
    'userSession/items': UserSession[]
    'userSessionStats/deps': UserSessionStats[]
    'userSessionStats/item': UserSessionStats
    'userSessionStats/items': UserSessionStats[]
    'userSessionStats/ldeps': UserSessionStats[]
    'userSessionStats/list': UserSessionStats[]
    'chat/closechat': ChatResponse
    'chat/deps': Chat[]
    'chat/item': Chat
    'chat/items': Chat[]
    'chat/ldeps': Chat[]
    'chat/list': Chat[]
    'chat/markasreadchatmessage': ChatMessageResponse
    'chat/postchatmessage': ChatMessageResponse
    'chatMessage/deps': ChatMessage[]
    'chatMessage/item': ChatMessage
    'chatMessage/items': ChatMessage[]
    'chatMessage/ldeps': ChatMessage[]
    'userAccountPositionLimit/deleteuseraccountpositionlimit': DeleteResultResponse
    'userAccountPositionLimit/deleteuseraccountriskparameter': DeleteResultResponse
    'user/accepttradingpermission': {tradingPermissionId: number}
    'user/activatesecondmarketdatasubscriptionrenewal': SecondMarketDataSubscriptionResponse
    'user/addmarketdatasubscription': MarketDataSubscriptionResponse
    'user/addsecondmarketdatasubscription': SecondMarketDataSubscriptionResponse
    'user/addtradovatesubscription': TradovateSubscriptionResponse
    'user/cancelsecondmarketdatasubscription': SecondMarketDataSubscriptionResponse
    'user/cancelsecondmarketdatasubscriptionrenewal': SecondMarketDataSubscriptionResponse
    'user/canceltradovatesubscription': TradovateSubscriptionResponse
    'user/modifycredentials': AccessTokenResponse
    'user/modifyemailaddress': UserStatusMessage
    'user/modifypassword': AccessTokenResponse
    'user/opendemoaccount': OpenDemoAccountResponse
    'user/requesttradingpermission': TradingPermissionResponse
    'user/revoketradingpermission': TradingPermissionResponse
    'user/signuporganizationmember': SignUpResponse
    'user/addentitlementsubscription': EntitlementSubscriptionResponse
    'user/changepluginpermission': SimpleResponse
}

export type EntitlementSubscriptionResponse = {
    errorText?: string
    errorCode: ErrorCode
    entitlementSubscription: UserPlugin
}

export enum ErrorCode {
    DataError = 'DataError',
    EmailAlreadyRegistered = 'EmailAlreadyRegistered',
    EmailPolicyFailed = 'EmailPolicyFailed',
    FailedRecaptcha = 'FailedRecaptcha',
    Success = 'Success',
    UnknownError = 'UnknownError',
    UserAlreadyExists = 'UserAlreadyExists',
    WeakPassword = 'WeakPassword',
    WrongChallenge = 'WrongChallenge',
    WrongChallengeOrigin = 'WrongChallengeOrigin'
}

export type SignUpResponse = {
    errorText?: string
    errorCode: ErrorCode
    userId: number
    emailVerified: boolean
}

export type TradingPermissionResponse = {
    errorText: string
    tradingPermission: TradingPermission
}

export type OpenDemoAccountResponse = {
    errorText?: string
    accountId?: number
}

export type UserStatusMessage = {
    errorText?: string
    status: UserStatus
}

export enum SubscriptionResponseErrorCode {
    ConflictWithExisting = 'ConflictWithExisting',
    DowngradeNotAllowed = 'DowngradeNotAllowed',
    IncompatibleCMEMarketDataSubscriptionPlans = 'IncompatibleCMEMarketDataSubscriptionPlans',
    IncorrectPaymentMethod = 'IncorrectPaymentMethod',
    InsufficientFunds = 'InsufficientFunds',
    PaymentProviderError = 'PaymentProviderError',
    PlanDiscontinued = 'PlanDiscontinued',
    SingleTrialOnly = 'SingleTrialOnly',
    Success = 'Success',
    UnknownError = 'UnknownError'
}

export type SecondMarketDataSubscriptionResponse = {
    errorText?: string
    errorCode: SubscriptionResponseErrorCode

    secondMarketDataSubscription?: SecondMarketDataSubscription
}

export type MarketDataSubscriptionResponse = {
    errorText?: string
    errorCode: SubscriptionResponseErrorCode

    marketDataSubscription?: MarketDataSubscription
}

export type TradovateSubscriptionResponse = {
    errorText?: string
    errorCode: SubscriptionResponseErrorCode

    marketDataSubscription?: TradovateSubscription
}

export type DeleteResultResponse = {
    errorText?: string
    success: boolean
}
export type UserAccountPositionLimit = {
    id: number
    contractId: number
    productId: number
    exchangeId: number
    productType: ProductType
    riskDiscountContractGroupId: number
    productVerificationStatus: ProductVerificationStatus
    contractGroupId: number
    active: boolean
    riskTimePeriodId: number
    totalBy: TotalBy
    shortLimit: number
    longLimit: number
    exposedLimit: number
    description: string
    accountId: number
}

export type PLaceOSOResult = {
    failureReason?: FailureReason
    failureText?: string
    orderId?: number
    oso1Id?: number
    oso2Id?: number
}

export type OrderStrategyStatusResponse = {
    errorText: string
    orderStrategy: OrderStrategy
}

export type CashBalanceSnapshot = {
    errorText?: string
    totalCashValue?: number
    totalPnL?: number
    initialMargin?: number
    maintenanceMargin?: number
    netLiq?: number
    openPnL?: number
    realizedPnL?: number
    weekRealizedPnL?: number
}

export type FillFee = {
    id?: number
    clearingFee?: number
    clearingCurrencyId?: number
    exchangeFee?: number
    exchangeCurrencyId?: number
    nfaFee?: number
    nfaCurrencyId?: number
    brokerageFee?: number
    brokerageCurrencyId?: number
    ipFee?: number
    ipCurrencyId?: number
    commission?: number
    commissionCurrencyId?: number
    orderRoutingFee?: number
    orderRoutingCurrencyId?: number
}

export enum CashChangeType {
    AddUserFee = 'AddUserFee',
    AutomaticReconciliation = 'AutomaticReconciliation',
    BrokerageFee = 'BrokerageFee',
    CancelledPairedTrade = 'CancelledPairedTrade',
    CashSettlement = 'CashSettlement',
    ClearingFee = 'ClearingFee',
    Commission = 'Commission',
    Courtesy = 'Courtesy',
    Debit = 'Debit',
    DepositFee = 'DepositFee',
    DeskFee = 'DeskFee',
    EntitlementSubscription = 'EntitlementSubscription',
    ExchangeFee = 'ExchangeFee',
    FundTransaction = 'FundTransaction',
    FundTransactionFee = 'FundTransactionFee',
    IPFee = 'IPFee',
    InactivityFee = 'InactivityFee',
    LiquidationFee = 'LiquidationFee',
    LiquidationFee2 = 'LiquidationFee2',
    ManualAdjustment = 'ManualAdjustment',
    MarketDataSubscription = 'MarketDataSubscription',
    NewSession = 'NewSession',
    NfaFee = 'NfaFee',
    OptionsTrade = 'OptionsTrade',
    OrderRoutingFee = 'OrderRoutingFee',
    PROMO = 'PROMO',
    RithmicFee = 'RithmicFee',
    StopPaymentFee = 'StopPaymentFee',
    ThirdPartyFee = 'ThirdPartyFee',
    TradePaired = 'TradePaired',
    TradovateSubscription = 'TradovateSubscription'
}

export type CashBalanceLog = {
    id: number
    accountId: number
    timestamp: string
    tradeDate: {
        date: string
        timezone_type: number
        timezone: string
    }
    currencyId: number
    amount: number
    realizedPnL?: number
    weekRealizedPnL?: number
    cashChangeType: CashChangeType
    fillPairId?: number
    fillId?: number
    fundTransactionId?: number
    comment?: string
    delta: number
    senderId?: number
}

export type MarketDataSubscriptionExchangeScope = {
    id: number
    name: string
    bundleOf?: string
}

export type MarketDataSubscriptionPlan = {
    id: number
    name: string
    title: string
    price: number
    startDate: TradeDate
    discontinuedDate: TradeDate
    exchangeScopeId: number
    dataType: 'DOM' | 'Top'
    professional: 'Either' | 'NonProfessional' | 'Professional'
    tooltip?: string
}

export type TradovateSubscriptionPlan = {
    id: number
    name: string
    title: string
    price: number
    startDate: TradeDate
    discontinuedDate: TradeDate
    category: string
    trial: boolean
    duration: number
    durationUnits: 'Month' | 'Quarter' | 'Week' | 'Year'
    riskCategoryId: number
    multipleAccounts: boolean
    organizationId: number
    replaySessions: number
    footnote: string
    simOnly: boolean
}

export type AdminAlertSignalResponse = {
    errorText: string
    adminAlertSignal: AdminAlertSignal
}

export type AdminAlert = {
    id: number
    name: string
    timestamp: string
}

export enum AlertStatus {
    Active = 'Active',
    Expired = 'Expired',
    Failed = 'Failed',
    Inactive = 'Inactive',
    TriggeredOut = 'TriggeredOut'
}

export type Alert = {
    id: number
    timestamp: string
    userId: number
    status: AlertStatus
    expression: string
    validUntil: string
    triggerLimits: number
    triggeredCounter: number
    failure: string
    message: string
}

export type AlertResponse = {
    errorText: string
    alert: Alert
}

export type AlertSignal = {
    id: number
    timestamp: string
    alertId: number
    isRead: boolean
    text: string
}

export type AdminAlertSignal = {
    id: number
    timestamp: string
    adminAlertId: number
    relatedToAccountId?: number
    relatedToUserId?: number
    ownedByAdminId?: number
    completed?: string
    text: string
    emailSent: boolean
    subjectId: number
}
export type Entitlement = {
    id: number
    title: string
    price: number
    startDate: TradeDate
    discontinuedDate: TradeDate
    name: string
    duration: number
    durationUnits: 'Month' | 'Quarter' | 'Week' | 'Year'
    autorenewal: boolean
}

export type OrderStrategyType = {
    id?: number
    name: string
    enabled: boolean
}

export type ContactInfo = {
    id: number
    userId: number
    firstName: string
    lastName: string
    streetAddress1: string
    streetAddress2?: string
    city: string
    state: string
    postCode: string
    country: string
    phone: string
    mailingIsDifferent: boolean
    mailingStreetAddress1?: string
    mailingStreetAddress2?: string
    mailingCity?: string
    mailingState?: string
    mailingPostCode?: string
    mailingCountry?: string
    jointFirstName?: string
    jointLastName?: string
}
export type ClearingHouse = {
    id?: number
    name: string
}
export type Organization = {
    id?: number
    name: string
}

export type SecondMarketDataSubscription = {
    id: number
    userId: number
    timestamp: string
    year: number
    month: number
    cancelledRenewal: boolean
    cancellationTimestamp?: string
}

export enum TradingPermissionStatus {
    Accepted = 'Accepted',
    Approved = 'Approved',
    Declined = 'Declined',
    Requested = 'Requested',
    Revoked = 'Revoked'
}

export type TradingPermission = {
    id?: number
    userId: number
    accountId: number
    accountHolderContact: string
    accountHolderEmail: string
    ctaContact: string
    ctaEmail: string
    status: TradingPermissionStatus
    updated: string
    approvedById?: number
}

export type UserProperty = {
    id?: number
    userId: number
    propertyId: number
    value: string
}

export type UserSession = {
    id?: number
    userId: number
    startTime: string
    endTime?: string
    ipAddress?: string
    appId?: string
    appVersion?: string
    clientAppId: number
}

export type UserSessionStats = {
    id?: number
    lastSessionTime: string
    failedPasswords: number
}

export type ChatCategory = 'Support' | 'TradeDesk'

export type Chat = {
    id?: number
    userId: number
    timestamp: string
    category: ChatCategory
    assignedSupportId: number
    closedById: number
    closeTimestamp: string
    updatedTimestamp: string
}
export type ChatResponse = {
    errorText: string
    chatMessage: Chat
}

export type ChatMessageResponse = {
    errorText: string
    chatMessage: ChatMessage
}
export type ChatMessage = {
    id?: number
    timestamp: string
    chatId: number
    senderId: number
    senderName: string
    text: string
    readStatus: boolean
}
export type Property = {
    id?: number
    name: string
    propertyType: PropertyType
    enumOptions?: string
    defaultValue?: string
}

export enum ProductVerificationStatus {
    Inactive = 'Inactive',
    Locked = 'Locked',
    ReadyForContracts = 'ReadyForContracts',
    ReadyToTrade = 'ReadyToTrade',
    Verified = 'Verified'
}

export type UserAccountRiskParameter = {
    id: number
    contractId: number
    productId: number
    exchangeId: number
    productType: ProductType
    riskDiscountContractGroupId: number
    productVerificationStatus: ProductVerificationStatus
    contractGroupId: number
    maxOpeningOrderQty?: number
    maxClosingOrderQty?: number
    maxBackMonth?: number
    preExpirationDays?: number
    marginPercentage?: number
    marginDollarValue?: number
    hardLimit: boolean
    userAccountPositionLimitId: number
}

export enum TotalBy {
    Contract = 'Contract',
    ContractGroup = 'ContractGroup',
    DiscountGroup = 'DiscountGroup',
    Exchange = 'Exchange',
    Overall = 'Overall',
    Product = 'Product',
    ProductType = 'ProductType'
}

export type UserAccountAutoLiq = {
    id?: number
    changesLocked?: boolean
    marginPercentageAlert?: number
    dailyLossPercentageAlert?: number
    dailyLossAlert?: number
    marginPercentageLiqOnly?: number
    dailyLossPercentageLiqOnly?: number
    dailyLossLiqOnly?: number
    marginPercentageAutoLiq?: number
    dailyLossPercentageAutoLiq?: number
    dailyLossAutoLiq?: number
    weeklyLossAutoLiq?: number
    flattenTimestamp?: string // Should be a valid date-time format
    trailingMaxDrawdown?: number
    trailingMaxDrawdownLimit?: number
    trailingMaxDrawdownMode?: 'EOD' | 'RealTime'
    dailyProfitAutoLiq?: number
    weeklyProfitAutoLiq?: number
    doNotUnlock?: boolean
}

export type ContractMargin = {
    id: number
    initialMargin: number
    maintenanceMargin: number
    timestamp: string
}

export type ProductSession = {
    id: number
    openTime: TradeTime
    startTime: TradeTime
    stopTime: TradeTime
    closeTime: TradeTime
    sundayOpenTime?: TradeTime
}

export type TradeTime = {
    hour: number
    minute: number
}
export type CurrencyRate = {
    id?: number
    timestamp: string
    rate: number
}

export type ContractGroupFindRequest = {
    name: string
}

export enum CommandStatus {
    AT_EXECUTION = 'AtExecution',
    EXECUTION_REJECTED = 'ExecutionRejected',
    EXECUTION_STOPPED = 'ExecutionStopped',
    EXECUTION_SUSPENDED = 'ExecutionSuspended',
    ON_HOLD = 'OnHold',
    PEDNING = 'Pending',
    PENDING_EXECUTION = 'PendingExecution',
    REPLACED = 'Replaced',
    RISK_PASSED = 'RiskPassed',
    RISK_REJECTED = 'RiskRejected'
}

export type ModifyOrderRequestBody = {
    orderId: number
    clOrdId?: string
    orderQty: number
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TimeInForce
    expireTime?: string
    text?: string
    activationTime?: string
    customTag50?: string
    isAutomated?: boolean
}

export type PlaceOCOOrderResponse = {
    failureReason: FailureReason
    failureText: string
    orderId: number
    ocoId: number
}

export type PlaceOCORequestBody = {
    accountId?: number
    accountSpec?: string
    clOrdId?: string
    action: OrderAction
    symbol: string
    orderQty: number
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TimeInForce
    expireTime?: string
    text?: string
    activationTime?: string
    customTag50?: string
    isAutomated?: boolean
    other: OtherOrderOCO
}

export type OtherOrderOCO = {
    action: OrderAction
    clOrdId?: string
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TimeInForce
    expireTime?: string
    text?: string
}

export type PlaceOrderResponse = {
    failureReason: FailureReason
    failureText: string
    orderId: number
}

export type PlaceOrderRequestBody = {
    accountId?: number
    accountSpec?: string
    clOrdId?: string
    action: OrderAction
    symbol: string
    orderQty: number
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TimeInForce
    expireTime?: string
    text?: string
    activationTime?: string
    customTag50?: string
    isAutomated?: boolean
}

export type StartOrderStrategyResponse = {
    errorText: string
    orderStrategy: OrderStrategy
}

export type StartOrderStrategyRequestBody = {
    accountId?: number
    accountSpec?: string
    symbol: string
    orderStrategyTypeId: number // must be 2
    action: OrderAction
    params?: string //{ entryVersion: EntryVersion; brackets: OrderBracket[]}
    uuid?: string
    customTag50?: string
}

export type EntryVersion = {
    orderQty: number
    orderType: OrderType
}

export type OrderBracket = {
    qty: number
    profitTarget: number
    stopLoss: number
    trailingStop: boolean
}

export type CancelBody = {symbol: string}

export type CancelChartBody = {subscriptionId: number}

export type ContractSuggestQuery = {
    t: string
    l: number
}
export type RollContractResponse = {
    errorText?: string
    contract: Contract
}

export type RollContractRequestBody = {
    name: string
    forward: string
    ifExpired?: boolean
}

export type ProductFeeParamsResponse = {
    params: ProductFeeParams[]
}
export type ProductFeeParams = {
    clearingFee?: number
    clearingCurrencyId?: number
    exchangeCurrencyId?: number
    nfaFee?: number
    nfaCurrencyId?: number
    brokerageFee?: number
    brokerageCurrencyId?: number
    ipFee?: number
    ipCurrencyId?: number
    commission?: number
    commissionCurrencyId?: number
    orderRoutingFee?: number
    orderRoutingCurrencyId?: number
    productId: number
    dayMargin?: number
    nightMargin?: number
    fullMargin?: ProductMargin
}

export type ProductMargin = {
    id?: number
    initialMargin: number
    maintenanceMargin: number
    timestamp: number
}

export type QueryName = {
    name: string
}

export type QueryProductIds = {
    productIds: number[]
}

export type QueryProductId = {
    productId: number[]
}

export type QueryId = {
    id: number
}

export type QueryIds = {
    ids: number
}

export type QueryMasterId = {
    masterid: number
}

export type QueryMasterIds = {
    masterids: number[]
}

export type OAuthTokenResponse = {
    access_token?: string
    token_type?: string
    expires_in?: number
    error?: string
    error_description?: string
}

export type OAuthTokenRequestBody = {
    grant_type: string
    code: string
    redirect_uri: string
    client_id?: string
    client_request?: string
    httpAuth?: string
}

export type MeResponse = {
    errorText?: string
    userId?: string
    name?: string
    fullName?: string
    email?: string
    emailVerified?: boolean
    isTrial?: boolean
}

export type AccessTokenResponse = {
    errorText?: string
    accessToken?: string
    mdAccessToken?: string
    expirationTime?: string
    passwordExpirationTime?: string
    userStatus?: UserStatus
    userId?: number
    name?: string
    hasLive?: boolean
}

export enum UserStatus {
    Active = 'active',
    Closed = 'Closed',
    Initiated = 'Initiated',
    TemporaryLocked = 'Temporary_Locked',
    UnconfirmedEmail = 'UnconfirmedEmail'
}
export type PenaltyResponse = {
    'p-ticket'?: string
    'p-time'?: number
    'p-captcha'?: string
}

export type SocketPenaltyResponse = {
    s: number
    i: number
    d: PenaltyResponse
}

export function isSocketPenaltyResponse(obj: any): obj is SocketPenaltyResponse {
    return obj && obj.d && isPenaltyResponse(obj.d)
}

export type SubscribeRequestBody = {
    'replay/initializeclock': {
        startTimestamp: string
        speed: number
        initialBalance: number
    }
    'user/syncrequest': {accounts: number[]}
    'md/subscribeQuote': {symbol: string}
    'md/getChart': {
        symbol: string
        chartDescription: ChartDescription
        timeRange: {
            // All fields in timeRange are optional, but at least any one is required
            closestTimestamp?: string
            closestTickId?: number
            asFarAsTimestamp?: string
            asMuchAsElements?: number
        }
    }
    'md/subscribeHistogram': {symbol: string}
    'md/subscribeDOM': {symbol: string}
}

export type SubscribeEventResponse = {
    'replay/initializeclock': string
    'user/syncrequest': SyncRequestResponse
    'md/subscribeQuote': {quotes: Quote[]}
    'md/getChart': SimpleResponse
    'md/subscribeHistogram': SimpleResponse
    'md/subscribeDOM': SimpleResponse
    any: undefined
}

export type SubscribeMap = {
    'replay/initializeclock': 'replay/initializeclock'
    'user/syncrequest': 'user/syncrequest'
    'md/subscribequote': 'md/subscribeQuote'
    'md/getchart': 'md/getChart'
    'md/subscribehistogram': 'md/subscribeHistogram'
    'md/subscribedom': 'md/subscribeDOM'
}

export function isPenaltyResponse(obj: any): obj is PenaltyResponse {
    if (typeof obj === 'object' && ('p-ticket' in obj || 'p-captcha' in obj)) {
        return true
    }
    return false
}

export function isHTTPErrorResponse<T extends EndpointURLs>(
    item: ResponseMsg<T> | HTTPErrorResponse
): item is HTTPErrorResponse {
    return (item as HTTPErrorResponse).s !== 200
}

export function isValidResponseMsg<T extends EndpointURLs>(
    item: ResponseMsg<T> | HTTPErrorResponse
): item is ResponseMsg<T> {
    return isResponseMsg(item) && item.s === 200
}

export const isServerEvent = (data: any): data is ServerEvent => {
    return 'e' in data
}

export const isResponseMsg = (data: any): data is ResponseMsg<any> => {
    return 'i' in data && 's' in data
}

export type ReplayPeriod = {
    start: string
    stop: string
}

export type StrategyState = {
    current_period?: number
}
export type ReplaySessionResults = {
    start: string
    stop: string
    finalPos: number
    bought: number
    sold: number
    realizedPnL: string
    openPnL: string
}
export type CheckReplaySessionResponse = {
    checkStatus: CheckStatus
    startTimestamp: string | undefined
}

export type CommandResponse = {
    failureReason?: FailureReason
    failureText?: string
    commandId?: number
}

export enum CheckStatus {
    Ineligible = 'Ineligible',
    OK = 'OK',
    StartTimestampAdjusted = 'StartTimestampAdjusted'
}

export enum FailureReason {
    AccountClosed = 'AccountClosed',
    AdvancedTrailingStopUnsupported = 'AdvancedTrailingStopUnsupported',
    AnotherCommandPending = 'AnotherCommandPending',
    BackMonthProhibited = 'BackMonthProhibited',
    ExecutionProviderNotConfigured = 'ExecutionProviderNotConfigured',
    ExecutionProviderUnavailable = 'ExecutionProviderUnavailable',
    InvalidContract = 'InvalidContract',
    InvalidPrice = 'InvalidPrice',
    LiquidationOnly = 'LiquidationOnly',
    LiquidationOnlyBeforeExpiration = 'LiquidationOnlyBeforeExpiration',
    MaxOrderQtyIsNotSpecified = 'MaxOrderQtyIsNotSpecified',
    MaxOrderQtyLimitReached = 'MaxOrderQtyLimitReached',
    MaxPosLimitMisconfigured = 'MaxPosLimitMisconfigured',
    MaxPosLimitReached = 'MaxPosLimitReached',
    MaxTotalPosLimitReached = 'MaxTotalPosLimitReached',
    MultipleAccountPlanRequired = 'MultipleAccountPlanRequired',
    NoQuote = 'NoQuote',
    NotEnoughLiquidity = 'NotEnoughLiquidity',
    OtherExecutionRelated = 'OtherExecutionRelated',
    ParentRejected = 'ParentRejected',
    RiskCheckTimeout = 'RiskCheckTimeout',
    SessionClosed = 'SessionClosed',
    Success = 'Success',
    TooLate = 'TooLate',
    TradingLocked = 'TradingLocked',
    TrailingStopNonOrderQtyModify = 'TrailingStopNonOrderQtyModify',
    Unauthorized = 'Unauthorized',
    UnknownReason = 'UnknownReason',
    Unsupported = 'Unsupported'
}

export type SimpleResponse = {
    ok: boolean
    errorText?: string
}

export type GetChartResponse = {
    subscriptionId?: number
    realtimeId?: number
    errorText?: string
}

export function isGetChartResponse(
    response: ResponseMsg<any>
): response is ResponseMsg<'md/getchart'> {
    return 'subscriptionId' in response || 'realtimeId' in response
}

export type ChangeSpeedResponse = SimpleResponse

export type AccountDependentsResponse = Account
export type AccountFindResponse = Account
export type AccountItemResponse = Account
export type AccountItemsResponse = Account[]
export type AccountListDependentsResponse = Account[]
export type AccountListResponse = Account[]
export type AccountSuggestResponse = Account

export enum AccountType {
    Customer = 'Customer',
    Giveup = 'Giveup',
    House = 'HOUSE',
    Omnibus = 'Omnibus',
    Wash = 'Wash'
}

export enum MarginAccountType {
    Hedger = 'Hedger',
    Speculator = 'Speculator'
}

export enum LegalStatus {
    Corporation = 'Corporation',
    GP = 'GP',
    Individual = 'Individual',
    Joint = 'Joint',
    LLC = 'LLC',
    LLP = 'LLP',
    LP = 'LP',
    PTR = 'PTR',
    Trust = 'Trust'
}

export enum OrderStatus {
    Canceled = 'Canceled',
    Completed = 'Completed',
    Expired = 'Expired',
    Filled = 'Filled',
    PendingCancelled = 'PendingCancel',
    PendingNew = 'PendingNew',
    PendingReplace = 'PendingReplace',
    Rejected = 'Rejected',
    Suspended = 'Suspended',
    Unknown = 'Unknown',
    Working = 'Working'
}

export type OrderItemResponse = Order
export type OrderListResponse = Order[]
export type OrderItemsResponse = Order[]
export type OrderDependentsResponse = Order[]
export type OrderLDependentsResponse = Order[]

export type SyncRequestResponse = {
    users: User[]
    accounts?: Account[]
    accountRiskStatuses?: AccountRiskStatus[]
    marginSnapshots?: MarginSnapshot[]
    userAccountAutoLiqs?: UserAccountAutoLiqs[]
    cashBalances?: CashBalance[]
    currencies?: Currency[]
    positions?: Position[]
    fillPairs?: FillPair[]
    orders?: Order[]
    contracts?: Contract[]
    contractMaturities?: ContractMaturity[]
    products?: Product[]
    exchanges?: Exchange[]
    spreadDefinitions?: any[]
    commands?: Command[]
    commandReports?: CommandReport[]
    executionReports?: ExecutionReport[]
    orderVersions?: OrderVersion[]
    fills?: Fill[]
    orderStrategies?: OrderStrategy[]
    orderStrategyLinks?: OrderStrategyLink[]
    userProperties?: UserProperties[]
    properties?: Properties[]
    userPlugins?: UserPlugin[]
    contractGroups: ContractGroup[]
    orderStrategyTypes?: any[]
    errorText?: string
}

export function isUserSyncResponseMsg(
    obj: ResponseMsg<any> | ServerEvent
): obj is ResponseMsg<'user/syncrequest'> {
    return obj && obj.d && obj.d.users
}

export type CommandReport = {
    id?: number
    commandId: number
    timestamp: string
    commandStatus: CommandStatus
    rejectReason?: FailureReason
    text?: string
    ordStatus?: OrderStatus
}

export type Order = {
    id?: string
    accountId: number
    contractId?: number
    spreadDefinitionId?: number
    timestamp: string
    action: OrderAction
    ordStatus: OrderStatus
    executionProviderId?: number
    ocoId?: number
    parentId?: number
    linkedId?: number
    admin: boolean
}

export type Account = {
    id?: number
    name: string
    userId: number
    accountType: AccountType
    active: boolean
    clearingHouseId: number
    riskCategoryId: number
    autoLiqProfileId: number
    marginAccountType: MarginAccountType
    legalStatus: LegalStatus
    archived: boolean
    timestamp: string
    readonly?: boolean
}

export type OrderStrategyTypes = {
    id?: number
    name: string
    enabled: boolean
}

export type ContractGroup = {
    id?: number
    name: string
}

export type UserPlugin = {
    id?: number
    userId: number
    timestamp: string
    planPrice: number
    creditCardTransactionId?: number
    cashBalanceLogId?: number
    creditCardId?: number
    accountId?: number
    pluginName: number
    approval: boolean
    entitlementId?: number
    startDate: TradeDate
    expirationDate?: TradeDate
    paidAmount: number
    autoRenewal: boolean
    planCategories: string
}

export type Properties = {
    id?: number
    name: string
    propertyType: PropertyType
    enumOptions?: string
    defaultValue: string
}

export enum PropertyType {
    Boolean = 'Boolean',
    Enum = 'Enum',
    Integer = 'Integer',
    String = 'String'
}

export type UserProperties = {
    id?: number
    userId: number
    propertyId: number
    value: string
}

export type OrderStrategyLink = {
    id?: number
    orderStrategyId: number
    orderId: number
    label: string
}

export type Fill = {
    id?: number
    orderId: number
    contractId: number
    timestamp: number
    tradeDate: number
    action: OrderAction
    qty: number
    price: number
    active: boolean
    finallyPaired: number
}

export type OrderVersion = {
    id?: number
    orderId: number
    orderQty: number
    orderType: OrderType
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TimeInForce
    expireTime?: string
    text?: string
}

export type ExecutionReport = {
    id?: number
    commandId: number
    name: string
    accountId: number
    contractId: number
    timestamp: string
    tradeDate: TradeDate
    orderId: number
    execType: ExecutionReportType
    execRefId: number
    ordStatus: OrderStatus
    action: OrderAction
    cumQty?: number
    avgPx?: number
    lastQty?: number
    lastPx?: number
    rejectReason: FailureReason
    text: string
    exchangeOrderId: string
}

export enum ExecutionReportType {
    CANCELED = 'Canceled',
    COMPLETED = 'Completed',
    DONE_FOR_DAY = 'DoneForDay',
    EXPIRED = 'Expired',
    NEW = 'New',
    ORDER_STATUS = 'OrderStatus',
    PEDNING_CANCEL = 'PendingCancel',
    PEDNING_NEW = 'PendingNew',
    PENDING_REPLACE = 'PendingReplace',
    REJECTED = 'Rejected',
    REPLACED = 'Replaced',
    STOPPED = 'Stopped',
    SUSPENED = 'Suspended',
    TRADE = 'Trade',
    TRADE_CANCEL = 'TradeCancel',
    TRADE_CORRECT = 'TradeCorrect'
}

export type Command = {
    id?: number
    orderId: number
    timestamp: string
    clOrdId?: number
    commandType: CommandType
    commandStatus: CommandStatus
    senderId?: number
    userSessionId?: number
    activationTime: string
    customTag50: string
    isAutomated: boolean
}

export enum CommandType {
    CANCEL = 'Cancel',
    MODIFY = 'Modify',
    New = 'New'
}

export type SpreadDefinition = {
    id?: number
    timestamp: string
    spreadType: SpreadType
    uds: boolean
}

export enum SpreadType {
    BUNDLE = 'Bundle',
    BUNDLE_SPREAD = 'BundleSpread',
    BUTERFLY = 'Butterfly',
    CALENDAR_SPREAD = 'CalendarSpread',
    CONDOR = 'Condor',
    CRACK = 'Crack',
    DOUBLE_BUTTEFLY = 'DoubleButterfly',
    GENERAL = 'General',
    INTERCOMMODITY_SPREAD = 'IntercommoditySpread',
    LAGGED_INTERCOMMODITY_SPREAD = 'LaggedIntercommoditySpread',
    PACK = 'Pack',
    PACK_BUTTERFLY = 'PackButterfly',
    PACK_SPREAD = 'PackSpread',
    REDUCED_TICK_CALENDAR_SPREAD = 'ReducedTickCalendarSpread',
    REVERSE_INTERCOMMODITY_SPREAD = 'ReverseIntercommoditySpread',
    REVERSE_SPREAD = 'ReverseSpread',
    STRIP = 'Strip',
    TREASURY_INTERCOMMODITY_SPREAD = 'TreasuryIntercommoditySpread'
}

export type Exchange = {
    id?: number
    name: string
}

export type Product = {
    id?: number
    name: string
    currencyId: number
    productType: ProductType
    description: string
    exchangeId: number
    contractGroupId: number
    riskDiscountContractGroupIda: number
    status: ProductStatus
    months?: string
    isSecured?: boolean
    valuePerPoint?: number
    priceFormatType?: PriceFormatType
    priceFormat: number
    tickSize: number
}

export enum PriceFormatType {
    DECIMAL = 'Decimal',
    FRACTIONAL = 'Fractional'
}

export enum ProductStatus {
    INACTIVE = 'Inactive',
    LOCKED = 'Locked',
    READY_FOR_CONTRACTS = 'ReadyForContracts',
    READY_TO_TRADE = 'ReadyToTrade',
    VERIFIED = 'Verified'
}

export enum ProductType {
    COMMON_STOCK = 'CommonStock',
    CONTINUOUS = 'Continuous',
    CRYPTOCURRENCY = 'Cryptocurrency',
    FUTURES = 'Futures',
    MARKET_INTERNALS = 'MarketInternals',
    OPTIONS = 'Options',
    SPREAD = 'Spread'
}

export type ContractMaturity = {
    id?: number
    productId: number
    expirationMonth: number
    expirationDate: string
    firstIntentDate?: string
    underlyingId?: string
    isFront: boolean
}

export type FillPair = {
    id?: number
    positionId: number
    buyFillId: number
    sellFillId: number
    qty: number
    buyPrice: number
    sellPrice: number
    active: boolean
}

export type Position = {
    id?: number
    accountId: number
    contractId: number
    timestamp: string
    tradeDate: string
    netPos: number
    netPrice?: number
    bought: number
    boughtValue: number
    sold: number
    soldValue: number
    prevPos: number
    prevPrice?: number
}

export type Contract = {
    id?: number
    name: string
    contractMaturityId?: number
}

export type Currency = {
    id?: number
    name: string
    symbol?: string
}

export type CashBalance = {
    id?: number
    accountId: number
    timestamp: string
    tradeDate: TradeDate
    currencyId: number
    amount: number
    realizedPnl?: number
    weekRealizedPnL?: number
}

export type TradeDate = {
    year: number
    month: number
    day: number
}

export type UserAccountAutoLiqs = {
    id?: number
    changesLocked?: boolean
    marginPercentageAlert?: number
    dailyLossPercentageAlert?: number
    dailyLossAlert?: number
    marginPercentageLiqOnly?: number
    dailyLossPercentageLiqOnly?: number
    dailyLossLiqOnly?: number
    marginPercentageAutoLiq?: number
    dailyLossPercentageAutoLiq?: number
    dailyLossAutoLiq?: number
    weeklyLossAutoLiq?: number
    flattenTimestamp?: string
    trailingMaxDrawdown?: number
    trailingMaxDrawdownLimit?: number
    trailingMaxDrawdownMode?: TrailingMaxDrawdownMode
    dailyProfitAutoLiq?: number
    weeklyProfitAutoLiq?: number
    doNotUnlock?: boolean
}

export enum TrailingMaxDrawdownMode {
    EOD = 'EOD',
    REAL_TIME = 'RealTime'
}

export type MarginSnapshot = {
    id?: number
    timestamp: string
    riskTimePeriodId: number
    initialMargin: number
    maintenanceMargin: number
    autoLiqLevel?: number
    liqOnlyLevel?: number
    totalUsedMargin: number
    fullInitialMargin: number
}

export type AccountRiskStatus = {
    id?: number
    adminAction?: AdminAction
    adminTimestamp?: string
    liquidationOnly?: string
    userTriggeredLiqOnly?: boolean
}

export enum AdminAction {
    AGREE_ON_LIQ_ONLY_MODE_BY_AUTO_LIQ = 'AgreedOnLiqOnlyModeByAutoLiq',
    AGREE_ON_LIQUIDATION_BY_AUTO_LIQ = 'AgreedOnLiquidationByAutoLiq',
    DISABLE_AUTO_LIQ = 'DisableAutoLiq',
    LIQUIDATE_IMMEDIATELY = 'LiquidateImmediately',
    LIQUIDATE_ONLY_MODE_IMMEDIATELY = 'LiquidateOnlyModeImmediately',
    LOCK_TRADING_IMMEDIATELY = 'LockTradingImmediately',
    NORMAL = 'Normal',
    PLACE_AUTO_LIQ_ON_HOLD = 'PlaceAutoLiqOnHold'
}

export type User = {
    id?: number
    name: string
    timestamp?: string
    email: string
    status: UserStatus
    professional?: boolean
    organizationId?: boolean
    linkedUserId: number
    foreignIntroducingBrokerId?: number
}

export type OrderStrategy = {
    id?: number
    accountId: number
    timestamp: string
    contractId: number
    orderStrategyTypeId: number
    initiatorId: number
    action: OrderAction
    params?: string //{entryVersion: EntryVersion; brackets: OrderBracket[]}
    uuid?: string
    status: StartOrderStrategyStatus
    failureMessage?: string
    senderId?: number
    customTag50?: string
    userSessionId?: string
}

export enum StartOrderStrategyStatus {
    ActiveStrategy = 'ActiveStrategy',
    ExecutionFailed = 'ExecutionFailed',
    ExecutionFinished = 'ExecutionFinished',
    ExecutionInterrupted = 'ExecutionInterrupted',
    InactiveStrategy = 'InactiveStrategy',
    NotEnoughLiquidity = 'NotEnoughLiquidity',
    StoppedByUser = 'StoppedByUser'
}

export function isCommandReport(obj: any): obj is CommandReport {
    return 'commandId' in obj && 'timestamp' in obj && 'commandStatus' in obj
}

export function isOrder(obj: any): obj is Order {
    return (
        'accountId' in obj &&
        'timestamp' in obj &&
        'action' in obj &&
        'ordStatus' in obj &&
        'admin' in obj
    )
}

export function isAccount(obj: any): obj is Account {
    return (
        'name' in obj &&
        'userId' in obj &&
        'accountType' in obj &&
        'active' in obj &&
        'clearingHouseId' in obj &&
        'riskCategoryId' in obj &&
        'autoLiqProfileId' in obj &&
        'marginAccountType' in obj &&
        'legalStatus' in obj &&
        'archived' in obj &&
        'timestamp' in obj
    )
}

export function isOrderStrategyTypes(obj: any): obj is OrderStrategyTypes {
    return 'name' in obj && 'enabled' in obj
}

export function isContractGroup(obj: any): obj is ContractGroup {
    return 'name' in obj
}

export function isUserPlugin(obj: any): obj is UserPlugin {
    return (
        'userId' in obj &&
        'timestamp' in obj &&
        'planPrice' in obj &&
        'pluginName' in obj &&
        'approval' in obj &&
        'startDate' in obj &&
        'paidAmount' in obj &&
        'autoRenewal' in obj &&
        'planCategories' in obj
    )
}

export function isProperties(obj: any): obj is Properties {
    return 'name' in obj && 'propertyType' in obj && 'defaultValue' in obj
}

export function isUserProperties(obj: any): obj is UserProperties {
    return 'userId' in obj && 'propertyId' in obj && 'value' in obj
}

export function isOrderStrategyLink(obj: any): obj is OrderStrategyLink {
    return 'orderStrategyId' in obj && 'orderId' in obj && 'label' in obj
}

export function isFill(obj: any): obj is Fill {
    return (
        'orderId' in obj &&
        'contractId' in obj &&
        'timestamp' in obj &&
        'tradeDate' in obj &&
        'action' in obj &&
        'qty' in obj &&
        'price' in obj &&
        'active' in obj &&
        'finallyPaired' in obj
    )
}

export function isOrderVersion(obj: any): obj is OrderVersion {
    return (
        'orderId' in obj && 'orderQty' in obj && 'orderType' in obj && 'expireTime' in obj
    )
}

export function isExecutionReport(obj: any): obj is ExecutionReport {
    return (
        'commandId' in obj &&
        'name' in obj &&
        'accountId' in obj &&
        'contractId' in obj &&
        'timestamp' in obj &&
        'tradeDate' in obj &&
        'orderId' in obj &&
        'execType' in obj &&
        'execRefId' in obj &&
        'ordStatus' in obj &&
        'action' in obj &&
        'rejectReason' in obj &&
        'text' in obj &&
        'exchangeOrderId' in obj
    )
}

export type SubscribeQuoteParams = {symbol: string; onSubscription: (item: Quote) => void}
export type SubscribeDOMParams = {symbol: string; onSubscription: (item: DOM) => void}
export type SubscribeHistogramParams = {
    symbol: string
    onSubscription: (item: Histogram) => void
}
export type SubscribeChartParams = {
    symbol: string
    chartDescription: ChartDescription
    timeRange: {
        // All fields in timeRange are optional, but at least any one is required
        closestTimestamp?: string
        closestTickId?: number
        asFarAsTimestamp?: string
        asMuchAsElements?: number
    }
    onSubscription: (item: Chart) => void
}

export type SubscribeBodyParams = {
    symbol: string
    chartDescription?: ChartDescription
    timeRange?: {
        // All fields in timeRange are optional, but at least any one is required
        closestTimestamp?: string
        closestTickId?: number
        asFarAsTimestamp?: string
        asMuchAsElements?: number
    }
}

export interface Socket {
    connect(): Promise<void>
    disconnect(): void
    isConnected(): boolean
}

export type RequestParams<T extends EndpointURLs> = {
    url: T
    body?: EndpointRequestBody[T]
    query?: EndpointRequestQuery[T]
}

export type TradovateSocketConnectParams = {
    url: string
    token: string
}

export type TradovateSocketSynchronizeParams = {
    onSubscription: (data: any) => void
}
export interface TvSocket extends Socket {
    synchronize(params: TradovateSocketSynchronizeParams): Promise<() => void>
    addListener(fn: (item: ResponseMsg<any> | ServerEvent) => void): () => Listener[]
    request<T extends EndpointURLs>(params: RequestParams<T>): Promise<ResponseMsg<T>>
}

export function isQuoteSubscription(fn: any): fn is QuoteSubscription {
    return typeof fn === 'function' && fn.length === 1
}

export function isDOMSubscription(fn: any): fn is DOMSubscription {
    return typeof fn === 'function' && fn.length === 1
}

export function isChartSubscription(fn: any): fn is ChartSubscription {
    return typeof fn === 'function' && fn.length === 1
}

export function isHistogramSubscription(fn: any): fn is HistogramSubscription {
    return typeof fn === 'function' && fn.length === 1
}

export type QuoteSubscription = (item: Quote) => void
export type DOMSubscription = (item: DOM) => void
export type ChartSubscription = (item: Chart) => void
export type HistogramSubscription = (item: Histogram) => void

export type MarketDataSocketSubscribeParams<T extends SubscribeURLs> = {
    url: T
    body: EndpointRequestBody[T]
    onSubscription:
        | QuoteSubscription
        | DOMSubscription
        | ChartSubscription
        | HistogramSubscription
}

export interface MdSocket extends Socket {
    subscribe<T extends SubscribeURLs>(
        params: MarketDataSocketSubscribeParams<T>
    ): Promise<() => Promise<void>>
    subscribeQuote(symbol: string, onSubscription: QuoteSubscription): Promise<() => void>
    subscribeDOM(symbol: string, onSubscription: DOMSubscription): Promise<() => void>
    subscribeHistogram(
        symbol: string,
        onSubscription: HistogramSubscription
    ): Promise<() => void>
    subscribeChart(
        symbol: string,
        chartDescription: ChartDescription,
        timeRange: TimeRange,
        onSubscription: ChartSubscription
    ): Promise<() => void>
}

export enum URLs {
    DEMO_URL = 'https://demo.tradovateapi.com/v1',
    LIVE_URL = 'https://live.tradovateapi.com/v1',
    MD_URL = 'wss://md.tradovateapi.com/v1/websocket',
    WS_DEMO_URL = 'wss://demo.tradovateapi.com/v1/websocket',
    WS_LIVE_URL = 'wss://live.tradovateapi.com/v1/websocket',
    REPLAY_URL = 'wss://replay.tradovateapi.com/v1/websocket'
}

export type TimeRange = {
    // All fields in timeRange are optional, but at least any one is required
    closestTimestamp?: string
    closestTickId?: number
    asFarAsTimestamp?: string
    asMuchAsElements?: number
}

export interface StrategyParams {
    live: boolean
    contract: Contract
    timeRangeType: TimeRangeType
    timeRangeValue: number
    replayMode: boolean
    replayPeriods?: ReplayPeriod[]
    replaySpeed?: number
    underlyingType: BarType
    elementSize: number
    elementSizeUnit: ElementSizeUnit
    withHistogram: boolean
}

export type StrategyProps = {
    contract: Contract
    timeRangeType: TimeRangeType
    timeRangeValue: number
    replayMode: boolean
    replayPeriods: ReplayPeriod[]
    replaySpeed: number
    underlyingType: BarType
    elementSize: number
    elementSizeUnit: ElementSizeUnit
    withHistogram: boolean
}

export type Dictionary = {[key: string]: unknown}

export type Listener = (item: any) => void

export type AccessTokenRequestBody = {
    name: string
    password: string
    appId?: string
    appVersion?: string
    deviceId?: string
    cid?: string
    sec?: string
    'p-ticket'?: string
}

export interface Strategy {
    init(): StrategyState
    next(
        prevState: StrategyState,
        action: Action
    ): {state: StrategyState; effects: Action[]}
}

export type StartOrderStrategyPayload = {
    contract: Contract
    action: OrderAction
    brackets: OrderBracket[]
    entryVersion: EntryVersion
}

export type PlaceOrderPayload = {
    contract: Contract
    orderType: OrderType
    action: OrderAction
    orderQty: number
    price: number
}

export type PlaceOCOPayload = {
    contract: Contract
    orderType: OrderType
    action: OrderAction
    orderQty: number
    price: number
    other: OtherOrderOCO
}

export type SocketsParams = {
    tvSocket: TvSocket
    mdSocket: MdSocket
    replaySocket: ReplaySocket
}

export type EventHandlerResults<T extends StrategyState> = {
    state: T
    actions: Action[]
}

export type AccountMini = {
    id: number
    name: string
    userId: number
}

export enum TvEndpoint {
    ContractDependents = 'contract/deps',
    ContractFind = 'contract/find',
    GetProductFeeParams = 'getProductFeeParams',
    ContractItem = 'contract/item',
    ContractItems = 'contract/items',
    ContractLDependents = 'contract/ldeps',
    RollContract = 'rollContract',
    ContractSuggest = 'contract/suggest',
    ContractGroupFind = 'contractGroup/find',
    ContractGroupItem = 'contractGroup/item',
    ContractGroupItems = 'contractGroup/items',
    ContractGroupList = 'contractGroup/list',
    ContractGroupSuggest = 'contractGroup/suggest',
    ContractMaturityDependents = 'contractMaturity/deps',
    ContractMaturityItem = 'contractMaturity/item',
    ContractMaturityItems = 'contractMaturity/items',
    ContractMaturityLDependents = 'contractMaturity/ldeps',
    CurrencyFind = 'currency/find',
    CurrencyItem = 'currency/item',
    CurrencyItems = 'currency/items',
    CurrencyList = 'currency/list',
    CurrencySuggest = 'currency/suggest',
    CurrencyRateDependents = 'currencyRate/deps',
    CurrencyRateItem = 'currencyRate/item',
    CurrencyRateItems = 'currencyRate/items',
    CurrencyRateLDependents = 'currencyRate/ldeps',
    CurrencyRateList = 'currencyRate/list',
    ExchangeFind = 'exchange/find',
    ExchangeItem = 'exchange/item',
    ExchangeItems = 'exchange/items',
    ExchangeList = 'exchange/list',
    ExchangeSuggest = 'exchange/suggest',
    ProductDependents = 'product/deps',
    ProductFind = 'product/find',
    ProductItem = 'product/item',
    ProductItems = 'product/items',
    ProductLDependents = 'product/ldeps',
    ProductList = 'product/list',
    ProductSuggest = 'product/suggest',
    ProductSessionDependents = 'productSession/deps',
    ProductSessionItem = 'productSession/item',
    ProductSessionItems = 'productSession/items',
    ProductSessionLDependents = 'productSession/ldeps',
    SpreadDefinitionItem = 'spreadDefinition/item',
    SpreadDefinitionItems = 'spreadDefinition/items',
    AccountRiskStatusDependents = 'accountRiskStatus/deps',
    AccountRiskStatusItem = 'accountRiskStatus/item',
    AccountRiskStatusItems = 'accountRiskStatus/items',
    AccountRiskStatusLDependents = 'accountRiskStatus/ldeps',
    AccountRiskStatusList = 'accountRiskStatus/list',
    ContractMarginDependents = 'contractMargin/deps',
    ContractMarginItem = 'contractMargin/item',
    ContractMarginItems = 'contractMargin/items',
    ContractMarginLDependents = 'contractMargin/ldeps',
    ProductMarginDependents = 'productMargin/deps',
    ProductMarginItem = 'productMargin/item',
    ProductMarginItems = 'productMargin/items',
    ProductMarginLDependents = 'productMargin/ldeps',
    ProductMarginList = 'productMargin/list',
    UserAccountAutoLiqCreate = 'userAccountAutoLiq/create',
    UserAccountAutoLiqDependents = 'userAccountAutoLiq/deps',
    UserAccountAutoLiqItem = 'userAccountAutoLiq/item',
    UserAccountAutoLiqItems = 'userAccountAutoLiq/items',
    UserAccountAutoLiqLDependents = 'userAccountAutoLiq/ldeps',
    UserAccountAutoLiqList = 'userAccountAutoLiq/list',
    UserAccountAutoLiqUpdate = 'userAccountAutoLiq/update',
    Create = 'userAccountPositionLimit/create',
    Dependents = 'userAccountPositionLimit/deps',
    UserAccountPositionLimitItem = 'userAccountPositionLimit/item',
    UserAccountPositionLimitItems = 'userAccountPositionLimit/items',
    UserAccountPositionLimitLDependents = 'userAccountPositionLimit/ldeps',
    UserAccountPositionLimitUpdate = 'userAccountPositionLimit/update',
    UserAccountRiskParameterCreate = 'userAccountRiskParameter/create',
    UserAccountRiskParameterDependents = 'userAccountRiskParameter/deps',
    UserAccountRiskParameterItem = 'userAccountRiskParameter/item',
    UserAccountRiskParameterItems = 'userAccountRiskParameter/items',
    UserAccountRiskParameterLDependents = 'userAccountRiskParameter/ldeps',
    UserAccountRiskParameterUpdate = 'userAccountRiskParameter/update',
    CommandDependents = 'command/deps',
    CommandItem = 'command/item',
    CommandItems = 'command/items',
    CommandLDependents = 'command/ldeps',
    CommandList = 'command/list',
    CommandReport = 'commandReport',
    CommandReportDependents = 'commandReport/deps',
    CommandReportItem = 'commandReport/item',
    CommandReportItems = 'commandReport/items',
    CommandReportLDependents = 'commandReport/ldeps',
    CommandReportList = 'commandReport/list',
    ExecutionReportDependents = 'executionReport/deps',
    ExecutionReportFind = 'executionReport/find',
    ExecutionReportItem = 'executionReport/item',
    ExecutionReportItems = 'executionReport/items',
    ExecutionReportLDependents = 'executionReport/ldeps',
    ExecutionReportList = 'executionReport/list',
    ExecutionReportSuggest = 'executionReport/suggest',
    FillDependents = 'fill/deps',
    FillItem = 'fill/item',
    FillItems = 'fill/items',
    FillLDependents = 'fill/ldeps',
    FillList = 'fill/list',
    FillFeeDependents = 'fillFee/deps',
    FillFeeItem = 'fillFee/item',
    FillFeeItems = 'fillFee/items',
    FillFeeLDependents = 'fillFee/ldeps',
    FillFeeList = 'fillFee/list',
    OrderDependents = 'order/deps',
    OrderItem = 'order/item',
    OrderItems = 'order/items',
    OrderLDependents = 'order/ldeps',
    LiquidatePosition = 'order/liquidateposition',
    OrderList = 'order/list',
    ModifyOrder = 'order/modifyorder',
    PlaceOCO = 'order/placeoco',
    PlaceOrder = 'order/placeorder',
    PlaceOSO = 'order/placeoso',
    CancelOrder = 'order/cancelorder',
    OrderStrategyDependents = 'orderStrategy/deps',
    InterruptOrderStrategy = 'orderStrategy/interruptorderstrategy',
    OrderStrategyItem = 'orderStrategy/item',
    OrderStrategyItems = 'orderStrategy/items',
    OrderStrategyLDependents = 'orderStrategy/ldeps',
    OrderStrategyList = 'orderStrategy/list',
    ModifyOrderStrategy = 'orderStrategy/modifyorderstrategy',
    StartOrderStrategy = 'orderStrategy/startorderstrategy',
    OrderStrategyLinkDependents = 'orderStrategyLink/deps',
    OrderStrategyLinkItem = 'orderStrategyLink/item',
    OrderStrategyLinkItems = 'orderStrategyLink/items',
    OrderStrategyLinkLDependents = 'orderStrategyLink/ldeps',
    OrderStrategyLinkList = 'orderStrategyLink/list',
    OrderVersionDependents = 'orderVersion/deps',
    OrderVersionItem = 'orderVersion/item',
    OrderVersionItems = 'orderVersion/items',
    OrderVersionLDependents = 'orderVersion/ldeps',
    OrderVersionList = 'orderVersion/list',
    FillPairDependents = 'fillPair/deps',
    FillPairItem = 'fillPair/item',
    FillPairItems = 'fillPair/items',
    FillPairLDependents = 'fillPair/ldeps',
    FillPairList = 'fillPair/list',
    PositionDependents = 'position/deps',
    PositionFind = 'position/find',
    PositionItem = 'position/item',
    PositionItems = 'position/items',
    PositionLDependents = 'position/ldeps',
    PositionList = 'position/list',
    AccountDependents = 'account/deps',
    AccountFind = 'account/find',
    AccountItem = 'account/item',
    AccountItems = 'account/items',
    AccountLDependents = 'account/ldeps',
    AccountList = 'account/list',
    AccountSuggest = 'account/suggest',
    CashBalanceDependents = 'cashBalance/deps',
    CashBalanceSnapshot = 'cashBalance/getcashbalancesnapshot',
    CashBalanceItem = 'cashBalance/item',
    CashBalanceItems = 'cashBalance/items',
    CashBalanceLDependents = 'cashBalance/ldeps',
    CashBalanceList = 'cashBalance/list',
    CashBalanceLogDependents = 'cashBalanceLog/deps',
    CashBalanceLogItem = 'cashBalanceLog/item',
    CashBalanceLogItems = 'cashBalanceLog/items',
    CashBalanceLogLDependents = 'cashBalanceLog/ldeps',
    MarginSnapshotDependents = 'marginSnapshot/deps',
    MarginSnapshotItem = 'marginSnapshot/item',
    MarginSnapshotItems = 'marginSnapshot/items',
    MarginSnapshotLDependents = 'marginSnapshot/ldeps',
    MarginSnapshotList = 'marginSnapshot/list',
    TradingPermissionDependents = 'tradingPermission/deps',
    TradingPermissionItem = 'tradingPermission/item',
    TradingPermissionItems = 'tradingPermission/items',
    TradingPermissionLDependents = 'tradingPermission/ldeps',
    TradingPermissionList = 'tradingPermission/list',
    MarketDataSubscriptionExchangeScopeFind = 'marketDataSubscriptionExchangeScope/find',
    MarketDataSubscriptionExchangeScopeItem = 'marketDataSubscriptionExchangeScope/item',
    MarketDataSubscriptionExchangeScopeItems = 'marketDataSubscriptionExchangeScope/items',
    MarketDataSubscriptionExchangeScopeList = 'marketDataSubscriptionExchangeScope/list',
    MarketDataSubscriptionExchangeScopeSuggest = 'marketDataSubscriptionExchangeScope/suggest',
    MarketDataSubscriptionPlanFind = 'marketDataSubscriptionPlan/find',
    MarketDataSubscriptionPlanItem = 'marketDataSubscriptionPlan/item',
    MarketDataSubscriptionPlanItems = 'marketDataSubscriptionPlan/items',
    MarketDataSubscriptionPlanList = 'marketDataSubscriptionPlan/list',
    MarketDataSubscriptionPlanSuggest = 'marketDataSubscriptionPlan/suggest',
    TradovateSubscriptionPlanFind = 'tradovateSubscriptionPlan/find',
    TradovateSubscriptionPlanItem = 'tradovateSubscriptionPlan/item',
    TradovateSubscriptionPlanItems = 'tradovateSubscriptionPlan/items',
    TradovateSubscriptionPlanList = 'tradovateSubscriptionPlan/list',
    TradovateSubscriptionPlanSuggest = 'tradovateSubscriptionPlan/suggest',
    ChangeSpeed = 'replay/changespeed',
    CheckReplaySession = 'replay/checkreplaysession',
    InitializeClock = 'replay/initializeclock',
    CompleteAlertSnapshot = 'adminAlertSignal/completealertsignal',
    AdminAlertSnapshot = 'adminAlert/deps',
    AdminAlertItem = 'adminAlert/item',
    AdminAlertItems = 'adminAlert/items',
    AdminAlertLDepends = 'adminAlert/ldeps',
    AdminAlertList = 'adminAlert/list',
    TakeAlertOwnership = 'adminAlertSignal/takealertsignalownership',
    CreateAlert = 'alert/createalert',
    DeleteAlert = 'alert/deletealert',
    AlertDependents = 'alert/deps',
    DismissAlert = 'alert/dismissalert',
    AlertItem = 'alert/item',
    AlertItems = 'alert/items',
    AlertLDepends = 'alert/ldeps',
    AlertList = 'alert/list',
    MarkReadAlertSignal = 'alert/markreadalertsignal',
    ModifyAlert = 'alert/modifyalert',
    ResetAlert = 'alert/resetalert',
    AlertSignalDependents = 'alertSignal/deps',
    AlertSignalItem = 'alertSignal/item',
    AlertSignalItems = 'alertSignal/items',
    AlertSignalLDepends = 'alertSignal/ldeps',
    AlertSignalList = 'alertSignal/list',
    ClearingHouseDependents = 'clearingHouse/deps',
    ClearingHouseItem = 'clearingHouse/item',
    ClearingHouseItems = 'clearingHouse/items',
    ClearingHouseList = 'clearingHouse/list',
    ClearingHouseSuggest = 'clearingHouse/suggest',
    EntitlementItem = 'entitlement/item',
    EntitlementItems = 'entitlement/items',
    EntitlementList = 'entitlement/list',
    OrderStrategyTypeFind = 'orderStrategyType/find',
    OrderStrategyTypeItem = 'orderStrategyType/item',
    OrderStrategyTypeItems = 'orderStrategyType/items',
    OrderStrategyTypeList = 'orderStrategyType/list',
    OrderStrategyTypeSuggest = 'orderStrategyType/suggest',
    PropertyFind = 'property/find',
    PropertyItem = 'property/item',
    PropertyItems = 'property/items',
    PropertyList = 'property/list',
    PropertySuggest = 'property/suggest',
    ContactInfoDependents = 'contactInfo/deps',
    ContactInfoItem = 'contactInfo/item',
    ContactInfoItems = 'contactInfo/items',
    ContactInfoLDepends = 'contactInfo/ldeps',
    MarketDataSubscriptionCreate = 'marketDataSubscription/create',
    MarketDataSubscriptionDepends = 'marketDataSubscription/deps',
    MarketDataSubscriptionItem = 'marketDataSubscription/item',
    MarketDataSubscriptionItems = 'marketDataSubscription/items',
    MarketDataSubscriptionLDepends = 'marketDataSubscription/ldeps',
    MarketDataSubscriptionList = 'marketDataSubscription/list',
    MarketDataSubscriptionUpdate = 'marketDataSubscription/update',
    OrganizationFind = 'organization/find',
    OrganizationItem = 'organization/item',
    OrganizationItems = 'organization/items',
    OrganizationList = 'organization/list',
    OrganizationSuggest = 'organization/suggest',
    SecondMarketDataSubscriptionDepends = 'secondMarketDataSubscription/deps',
    SecondMarketDataSubscriptionItem = 'secondMarketDataSubscription/item',
    SecondMarketDataSubscriptionItems = 'secondMarketDataSubscription/items',
    SecondMarketDataSubscriptionLDepends = 'secondMarketDataSubscription/ldeps',
    SecondMarketDataSubscriptionList = 'secondMarketDataSubscription/list',
    TradovateSubscriptionCreate = 'tradovateSubscription/create',
    TradovateSubscriptionDepends = 'tradovateSubscription/deps',
    TradovateSubscriptionItem = 'tradovateSubscription/item',
    TradovateSubscriptionItems = 'tradovateSubscription/items',
    TradovateSubscriptionLDepends = 'tradovateSubscription/ldeps',
    TradovateSubscriptionList = 'tradovateSubscription/list',
    TradovateSubscriptionUpdate = 'tradovateSubscription/update',
    UserFind = 'user/find',
    GetAccountTradingPermissions = 'user/getaccounttradingpermissions',
    UserItem = 'user/item',
    UserItems = 'user/items',
    UserList = 'user/list',
    UserSuggest = 'user/suggest',
    SyncRequest = 'user/syncrequest',
    UserPluginCreate = 'userPlugin/create',
    UserPluginDepends = 'userPlugin/deps',
    UserPluginItem = 'userPlugin/item',
    UserPluginItems = 'userPlugin/items',
    UserPluginLDepends = 'userPlugin/ldeps',
    UserPluginList = 'userPlugin/list',
    UserPluginUpdate = 'userPlugin/update',
    UserPropertyDepends = 'userProperty/deps',
    UserPropertyItem = 'userProperty/item',
    UserPropertyItems = 'userProperty/items',
    UserPropertyLDepends = 'userProperty/ldeps',
    UserSessionItem = 'userSession/item',
    UserSessionItems = 'userSession/items',
    UserSessionStatsDepends = 'userSessionStats/deps',
    UserSessionStatsItem = 'userSessionStats/item',
    UserSessionStatsItems = 'userSessionStats/items',
    UserSessionStatsLDepends = 'userSessionStats/ldeps',
    UserSessionStatsList = 'userSessionStats/list',
    CloseChat = 'chat/closechat',
    ChatDepends = 'chat/deps',
    ChatItem = 'chat/item',
    ChatItems = 'chat/items',
    ChatLDependents = 'chat/ldeps',
    ChatList = 'chat/list',
    MarkAsReadChatMessage = 'chat/markasreadchatmessage',
    PostChatMessage = 'chat/postchatmessage',
    ChatMessageDepends = 'chatMessage/deps',
    ChatMessageItem = 'chatMessage/item',
    ChatMessageItems = 'chatMessage/items',
    ChatMessageLDepends = 'chatMessage/ldeps',
    DeleteUserAccountPositionLimit = 'userAccountPositionLimit/deleteuseruccountpositionlimit',
    DeleteUserAccountRiskParameter = 'userAccountRiskParameter/deleteuseraccountriskparameter',
    AcceptTradingPermission = 'user/accepttradingpermission',
    ActivateSecondMarketDataSubscriptionRenewal = 'user/activatesecondmarketdatasubscriptionrenewal',
    AddMarketDataSubscription = 'user/addmarketdatasubscription',
    AddSecondMarketDataSubscription = 'user/addsecondmarketdatasubscription',
    AddTradovateSubscription = 'user/addtradovatesubscription',
    CancelSecondMarketDataSubscription = 'user/cancelsecondmarketdatasubscription',
    CancelSecondMarketDataSubscriptionRenewal = 'user/cancelsecondmarketdatasubscriptionrenewal',
    CancelTradovateSubscription = 'user/canceltradovatesubscription',
    ModifyCredentials = 'user/modifycredentials',
    ModifyEmailAddress = 'user/modifyemailaddress',
    ModifyPassword = 'user/modifypassword',
    OpenDemoAccount = 'user/opendemoaccount',
    RequestTradingPermission = 'user/requesttradingpermission',
    RevokeTradingPermission = 'user/revoketradingpermission',
    SignUpOrganizationMember = 'user/signuporganizationmember',
    AddEntitlementSubscription = 'user/addentitlementsubscription',
    ChangePluginPermission = 'user/changepluginpermission',
    AdminAlertSignalDependents = 'adminAlertSignal/deps',
    AdminAlertSignalItem = 'adminAlertSignal/item',
    AdminAlertSignalItems = 'adminAlertSignal/items',
    AdminAlertSignalLDependents = 'adminAlertSignal/ldeps',
    AdminAlertSignalList = 'adminAlertSignal/list'
}

export enum ReversedTvEndpoint {
    'contract/deps' = 'ContractDependents',
    'contract/find' = 'ContractFind',
    'getProductFeeParams' = 'GetProductFeeParams',
    'contract/item' = 'ContractItem',
    'contract/items' = 'ContractItems',
    'contract/ldeps' = 'ContractLDependents',
    'contract/suggest' = 'ContractSuggest',
    'contractGroup/find' = 'ContractGroupFind',
    'contractGroup/item' = 'ContractGroupItem',
    'contractGroup/items' = 'ContractGroupItems',
    'contractGroup/list' = 'ContractGroupList',
    'contractGroup/suggest' = 'ContractGroupSuggest',
    'contractMaturity/deps' = 'ContractMaturityDependents',
    'contractMaturity/item' = 'ContractMaturityItem',
    'contractMaturity/items' = 'ContractMaturityItems',
    'contractMaturity/ldeps' = 'ContractMaturityLDependents',
    'currency/find' = 'CurrencyFind',
    'currency/item' = 'CurrencyItem',
    'currency/items' = 'CurrencyItems',
    'currency/list' = 'CurrencyList',
    'currency/suggest' = 'CurrencySuggest',
    'currencyRate/deps' = 'CurrencyRateDependents',
    'currencyRate/item' = 'CurrencyRateItem',
    'currencyRate/items' = 'CurrencyRateItems',
    'currencyRate/ldeps' = 'CurrencyRateLDependents',
    'currencyRate/list' = 'CurrencyRateList',
    'exchange/find' = 'ExchangeFind',
    'exchange/item' = 'ExchangeItem',
    'exchange/items' = 'ExchangeItems',
    'exchange/list' = 'ExchangeList',
    'exchange/suggest' = 'ExchangeSuggest',
    'product/deps' = 'ProductDependents',
    'product/find' = 'ProductFind',
    'product/item' = 'ProductItem',
    'product/items' = 'ProductItems',
    'product/ldeps' = 'ProductLDependents',
    'product/list' = 'ProductList',
    'product/suggest' = 'ProductSuggest',
    'productSession/deps' = 'ProductSessionDependents',
    'productSession/item' = 'ProductSessionItem',
    'productSession/items' = 'ProductSessionItems',
    'productSession/ldeps' = 'ProductSessionLDependents',
    'spreadDefinition/item' = 'SpreadDefinitionItem',
    'spreadDefinition/items' = 'SpreadDefinitionItems',
    'accountRiskStatus/deps' = 'AccountRiskStatusDependents',
    'accountRiskStatus/item' = 'AccountRiskStatusItem',
    'accountRiskStatus/items' = 'AccountRiskStatusItems',
    'accountRiskStatus/ldeps' = 'AccountRiskStatusLDependents',
    'accountRiskStatus/list' = 'AccountRiskStatusList',
    'contractMargin/deps' = 'ContractMarginDependents',
    'contractMargin/item' = 'ContractMarginItem',
    'contractMargin/items' = 'ContractMarginItems',
    'contractMargin/ldeps' = 'ContractMarginLDependents',
    'productMargin/deps' = 'ProductMarginDependents',
    'productMargin/item' = 'ProductMarginItem',
    'productMargin/items' = 'ProductMarginItems',
    'productMargin/ldeps' = 'ProductMarginLDependents',
    'productMargin/list' = 'ProductMarginList',
    'userAccountAutoLiq/create' = 'UserAccountAutoLiqCreate',
    'userAccountAutoLiq/deps' = 'UserAccountAutoLiqDependents',
    'userAccountAutoLiq/item' = 'UserAccountAutoLiqItem',
    'userAccountAutoLiq/items' = 'UserAccountAutoLiqItems',
    'userAccountAutoLiq/ldeps' = 'UserAccountAutoLiqLDependents',
    'userAccountAutoLiq/list' = 'UserAccountAutoLiqList',
    'userAccountAutoLiq/update' = 'UserAccountAutoLiqUpdate',
    'userAccountPositionLimit/create' = 'UserAccountPositionLimitCreate',
    'userAccountPositionLimit/deps' = 'UserAccountPositionLimitDependents',
    'userAccountPositionLimit/item' = 'UserAccountPositionLimitItem',
    'userAccountPositionLimit/items' = 'UserAccountPositionLimitItems',
    'userAccountPositionLimit/ldeps' = 'UserAccountPositionLimitLDependents',
    'userAccountPositionLimit/update' = 'UserAccountPositionLimitUpdate',
    'userAccountRiskParameter/create' = 'UserAccountRiskParameterCreate',
    'userAccountRiskParameter/deps' = 'UserAccountRiskParameterDependents',
    'userAccountRiskParameter/item' = 'UserAccountRiskParameterItem',
    'userAccountRiskParameter/items' = 'UserAccountRiskParameterItems',
    'userAccountRiskParameter/ldeps' = 'UserAccountRiskParameterLDependents',
    'userAccountRiskParameter/update' = 'UserAccountRiskParameterUpdate',
    'command/deps' = 'CommandDependents',
    'command/item' = 'CommandItem',
    'command/items' = 'CommandItems',
    'command/ldeps' = 'CommandLDependents',
    'command/list' = 'CommandList',
    'commandReport' = 'CommandReport',
    'commandReport/deps' = 'CommandReportDependents',
    'commandReport/item' = 'CommandReportItem',
    'commandReport/items' = 'CommandReportItems',
    'commandReport/ldeps' = 'CommandReportLDependents',
    'commandReport/list' = 'CommandReportList',
    'executionReport/deps' = 'ExecutionReportDependents',
    'executionReport/find' = 'ExecutionReportFind',
    'executionReport/item' = 'ExecutionReportItem',
    'executionReport/items' = 'ExecutionReportItems',
    'executionReport/ldeps' = 'ExecutionReportLDependents',
    'executionReport/list' = 'ExecutionReportList',
    'executionReport/suggest' = 'ExecutionReportSuggest',
    'fill/deps' = 'FillDependents',
    'fill/item' = 'FillItem',
    'fill/items' = 'FillItems',
    'fill/ldeps' = 'FillLDependents',
    'fill/list' = 'FillList',
    'fillFee/deps' = 'FillFeeDependents',
    'fillFee/item' = 'FillFeeItem',
    'fillFee/items' = 'FillFeeItems',
    'fillFee/ldeps' = 'FillFeeLDependents',
    'fillFee/list' = 'FillFeeList',
    'order/deps' = 'OrderDependents',
    'order/item' = 'OrderItem',
    'order/items' = 'OrderItems',
    'order/ldeps' = 'OrderLDependents',
    'order/liquidateposition' = 'LiquidatePosition',
    'order/list' = 'OrderList',
    'order/modifyorder' = 'ModifyOrder',
    'order/placeoco' = 'PlaceOCO',
    'order/placeorder' = 'PlaceOrder',
    'order/placeoso' = 'PlaceOSO',
    'order/cancelorder' = 'CancelOrder',
    'orderStrategy/deps' = 'OrderStrategyDependents',
    'orderStrategy/interruptorderstrategy' = 'InterruptOrderStrategy',
    'orderStrategy/item' = 'OrderStrategyItem',
    'orderStrategy/items' = 'OrderStrategyItems',
    'orderStrategy/ldeps' = 'OrderStrategyLDependents',
    'orderStrategy/list' = 'OrderStrategyList',
    'orderStrategy/modifyorderstrategy' = 'ModifyOrderStrategy',
    'orderStrategy/startorderstrategy' = 'StartOrderStrategy',
    'orderStrategyLink/deps' = 'OrderStrategyLinkDependents',
    'orderStrategyLink/item' = 'OrderStrategyLinkItem',
    'orderStrategyLink/items' = 'OrderStrategyLinkItems',
    'orderStrategyLink/ldeps' = 'OrderStrategyLinkLDependents',
    'orderStrategyLink/list' = 'OrderStrategyLinkList',
    'orderVersion/deps' = 'OrderVersionDependents',
    'orderVersion/item' = 'OrderVersionItem',
    'orderVersion/items' = 'OrderVersionItems',
    'orderVersion/ldeps' = 'OrderVersionLDependents',
    'orderVersion/list' = 'OrderVersionList',
    'fillPair/deps' = 'FillPairDependents',
    'fillPair/item' = 'FillPairItem',
    'fillPair/items' = 'FillPairItems',
    'fillPair/ldeps' = 'FillPairLDependents',
    'fillPair/list' = 'FillPairList',
    'position/deps' = 'PositionDependents',
    'position/find' = 'PositionFind',
    'position/item' = 'PositionItem',
    'position/items' = 'PositionItems',
    'position/ldeps' = 'PositionLDependents',
    'position/list' = 'PositionList',
    'account/deps' = 'AccountDependents',
    'account/find' = 'AccountFind',
    'account/item' = 'AccountItem',
    'account/items' = 'AccountItems',
    'account/ldeps' = 'AccountLDependents',
    'account/list' = 'AccountList',
    'account/suggest' = 'AccountSuggest',
    'cashBalance/deps' = 'CashBalanceDependents',
    'cashBalance/getcashbalancesnapshot' = 'CashBalanceSnapshot',
    'cashBalance/item' = 'CashBalanceItem',
    'cashBalance/items' = 'CashBalanceItems',
    'cashBalance/ldeps' = 'CashBalanceLDependents',
    'cashBalance/list' = 'CashBalanceList',
    'cashBalanceLog/deps' = 'CashBalanceLogDependents',
    'cashBalanceLog/item' = 'CashBalanceLogItem',
    'cashBalanceLog/items' = 'CashBalanceLogItems',
    'cashBalanceLog/ldeps' = 'CashBalanceLogLDependents',
    'marginSnapshot/deps' = 'MarginSnapshotDependents',
    'marginSnapshot/item' = 'MarginSnapshotItem',
    'marginSnapshot/items' = 'MarginSnapshotItems',
    'marginSnapshot/ldeps' = 'MarginSnapshotLDependents',
    'marginSnapshot/list' = 'MarginSnapshotList',
    'tradingPermission/deps' = 'TradingPermissionDependents',
    'tradingPermission/item' = 'TradingPermissionItem',
    'tradingPermission/items' = 'TradingPermissionItems',
    'tradingPermission/ldeps' = 'TradingPermissionLDependents',
    'tradingPermission/list' = 'TradingPermissionList',
    'marketDataSubscriptionExchangeScope/find' = 'MarketDataSubscriptionExchangeScopeFind',
    'marketDataSubscriptionExchangeScope/item' = 'MarketDataSubscriptionExchangeScopeItem',
    'marketDataSubscriptionExchangeScope/items' = 'MarketDataSubscriptionExchangeScopeItems',
    'marketDataSubscriptionExchangeScope/list' = 'MarketDataSubscriptionExchangeScopeList',
    'marketDataSubscriptionExchangeScope/suggest' = 'MarketDataSubscriptionExchangeScopeSuggest',
    'marketDataSubscriptionPlan/find' = 'MarketDataSubscriptionPlanFind',
    'marketDataSubscriptionPlan/item' = 'MarketDataSubscriptionPlanItem',
    'marketDataSubscriptionPlan/items' = 'MarketDataSubscriptionPlanItems',
    'marketDataSubscriptionPlan/list' = 'MarketDataSubscriptionPlanList',
    'marketDataSubscriptionPlan/suggest' = 'MarketDataSubscriptionPlanSuggest',
    'tradovateSubscriptionPlan/find' = 'TradovateSubscriptionPlanFind',
    'tradovateSubscriptionPlan/item' = 'TradovateSubscriptionPlanItem',
    'tradovateSubscriptionPlan/items' = 'TradovateSubscriptionPlanItems',
    'tradovateSubscriptionPlan/list' = 'TradovateSubscriptionPlanList',
    'tradovateSubscriptionPlan/suggest' = 'TradovateSubscriptionPlanSuggest',
    'replay/changespeed' = 'ChangeSpeed',
    'replay/checkreplaysession' = 'CheckReplaySession',
    'replay/initializeclock' = 'InitializeClock',
    'adminAlertSignal/completealertsignal' = 'CompleteAlertSnapshot',
    'adminAlert/deps' = 'AdminAlertSnapshot',
    'adminAlert/item' = 'AdminAlertItem',
    'adminAlert/items' = 'AdminAlertItems',
    'adminAlert/ldeps' = 'AdminAlertLDepends',
    'adminAlert/list' = 'AdminAlertList',
    'adminAlertSignal/takealertsignalownership' = 'TakeAlertOwnership',
    'alert/createalert' = 'CreateAlert',
    'alert/deletealert' = 'DeleteAlert',
    'alert/deps' = 'AlertDependents',
    'alert/dismissalert' = 'DismissAlert',
    'alert/item' = 'AlertItem',
    'alert/items' = 'AlertItems',
    'alert/ldeps' = 'AlertLDepends',
    'alert/list' = 'AlertList',
    'alert/markreadalertsignal' = 'MarkReadAlertSignal',
    'alert/modifyalert' = 'ModifyAlert',
    'alert/resetalert' = 'ResetAlert',
    'alertSignal/deps' = 'AlertSignalDependents',
    'alertSignal/item' = 'AlertSignalItem',
    'alertSignal/items' = 'AlertSignalItems',
    'alertSignal/ldeps' = 'AlertSignalLDepends',
    'alertSignal/list' = 'AlertSignalList',
    'clearingHouse/deps' = 'ClearingHouseDependents',
    'clearingHouse/item' = 'ClearingHouseItem',
    'clearingHouse/items' = 'ClearingHouseItems',
    'clearingHouse/list' = 'ClearingHouseList',
    'clearingHouse/suggest' = 'ClearingHouseSuggest',
    'entitlement/item' = 'EntitlementItem',
    'entitlement/items' = 'EntitlementItems',
    'entitlement/list' = 'EntitlementList',
    'orderStrategyType/find' = 'OrderStrategyTypeFind',
    'orderStrategyType/item' = 'OrderStrategyTypeItem',
    'orderStrategyType/items' = 'OrderStrategyTypeItems',
    'orderStrategyType/list' = 'OrderStrategyTypeList',
    'orderStrategyType/suggest' = 'OrderStrategyTypeSuggest',
    'property/find' = 'PropertyFind',
    'property/item' = 'PropertyItem',
    'property/items' = 'PropertyItems',
    'property/list' = 'PropertyList',
    'property/suggest' = 'PropertySuggest',
    'contactInfo/deps' = 'ContactInfoDependents',
    'contactInfo/item' = 'ContactInfoItem',
    'contactInfo/items' = 'ContactInfoItems',
    'contactInfo/ldeps' = 'ContactInfoLDepends',
    'marketDataSubscription/create' = 'MarketDataSubscriptionCreate',
    'marketDataSubscription/deps' = 'MarketDataSubscriptionDepends',
    'marketDataSubscription/item' = 'MarketDataSubscriptionItem',
    'marketDataSubscription/items' = 'MarketDataSubscriptionItems',
    'marketDataSubscription/ldeps' = 'MarketDataSubscriptionLDepends',
    'marketDataSubscription/list' = 'MarketDataSubscriptionList',
    'marketDataSubscription/update' = 'MarketDataSubscriptionUpdate',
    '' = 'OrganizationFind',
    'organization/item' = 'OrganizationItem',
    'organization/items' = 'OrganizationItems',
    'organization/list' = 'OrganizationList',
    'organization/suggest' = 'OrganizationSuggest',
    'secondMarketDataSubscription/deps' = 'SecondMarketDataSubscriptionDepends',
    'secondMarketDataSubscription/item' = 'SecondMarketDataSubscriptionItem',
    'secondMarketDataSubscription/items' = 'SecondMarketDataSubscriptionItems',
    'secondMarketDataSubscription/ldeps' = 'SecondMarketDataSubscriptionLDepends',
    'secondMarketDataSubscription/list' = 'SecondMarketDataSubscriptionList',
    'tradovateSubscription/create' = 'TradovateSubscriptionCreate',
    'tradovateSubscription/deps' = 'TradovateSubscriptionDepends',
    'tradovateSubscription/item' = 'TradovateSubscriptionItem',
    'tradovateSubscription/items' = 'TradovateSubscriptionItems',
    'tradovateSubscription/ldeps' = 'TradovateSubscriptionLDepends',
    'tradovateSubscription/list' = 'TradovateSubscriptionList',
    'tradovateSubscription/update' = 'TradovateSubscriptionUpdate',
    'user/find' = 'UserFind',
    'user/getaccounttradingpermissions' = 'GetAccountTradingPermissions',
    'user/item' = 'UserItem',
    'user/items' = 'UserItems',
    'user/list' = 'UserList',
    'user/suggest' = 'UserSuggest',
    'user/syncrequest' = 'SyncRequest',
    'userPlugin/create' = 'UserPluginCreate',
    'userPlugin/deps' = 'UserPluginDepends',
    'userPlugin/item' = 'UserPluginItem',
    'userPlugin/items' = 'UserPluginItems',
    'userPlugin/ldeps' = 'UserPluginLDepends',
    'userPlugin/list' = 'UserPluginList',
    'userPlugin/update' = 'UserPluginUpdate',
    'userProperty/deps' = 'UserPropertyDepends',
    'userProperty/item' = 'UserPropertyItem',
    'userProperty/items' = 'UserPropertyItems',
    'userProperty/ldeps' = 'UserPropertyLDepends',
    'userSession/item' = 'UserSessionItem',
    'userSession/items' = 'UserSessionItems',
    'userSessionStats/deps' = 'UserSessionStatsDepends',
    'userSessionStats/item' = 'UserSessionStatsItem',
    'userSessionStats/items' = 'UserSessionStatsItems',
    'userSessionStats/ldeps' = 'UserSessionStatsLDepends',
    'userSessionStats/list' = 'UserSessionStatsList',
    'chat/closechat' = 'CloseChat',
    'chat/deps' = 'ChatDepends',
    'chat/item' = 'ChatItem',
    'chat/items' = 'ChatItems',
    'chat/ldeps' = 'ChatLDependents',
    'chat/list' = 'ChatList',
    'chat/markasreadchatmessage' = 'MarkAsReadChatMessage',
    'chat/postchatmessage' = 'PostChatMessage',
    'chatMessage/deps' = 'ChatMessageDepends',
    'chatMessage/item' = 'ChatMessageItem',
    'chatMessage/items' = 'ChatMessageItems',
    'chatMessage/ldeps' = 'ChatMessageLDepends',
    'userAccountPositionLimit/deleteuseruccountpositionlimit' = 'DeleteUserAccountPositionLimit',
    'userAccountRiskParameter/deleteuseraccountriskparameter' = 'DeleteUserAccountRiskParameter',
    'user/accepttradingpermission' = 'AcceptTradingPermission',
    'user/activatesecondmarketdatasubscriptionrenewal' = 'ActivateSecondMarketDataSubscriptionRenewal',
    'user/addmarketdatasubscription' = 'AddMarketDataSubscription',
    'user/addsecondmarketdatasubscription' = 'AddSecondMarketDataSubscription',
    'user/addtradovatesubscription' = 'AddTradovateSubscription',
    'user/cancelsecondmarketdatasubscription' = 'CancelSecondMarketDataSubscription',
    'user/cancelsecondmarketdatasubscriptionrenewal' = 'CancelSecondMarketDataSubscriptionRenewal',
    'user/canceltradovatesubscription' = 'CancelTradovateSubscription',
    'user/modifycredentials' = 'ModifyCredentials',
    'user/modifyemailaddress' = 'ModifyEmailAddress',
    'user/modifypassword' = 'ModifyPassword',
    'user/opendemoaccount' = 'OpenDemoAccount',
    'user/requesttradingpermission' = 'RequestTradingPermission',
    'user/revoketradingpermission' = 'RevokeTradingPermission',
    'user/signuporganizationmember' = 'SignUpOrganizationMember',
    'user/addentitlementsubscription' = 'AddEntitlementSubscription',
    'user/changepluginpermission' = 'ChangePluginPermission',
    'adminAlertSignal/deps' = 'AdminAlertSignalDependents',
    'adminAlertSignal/item' = 'AdminAlertSignalItem',
    'adminAlertSignal/items' = 'AdminAlertSignalItems',
    'adminAlertSignal/ldeps' = 'AdminAlertSignalLDependents',
    'adminAlertSignal/list' = 'AdminAlertSignalList'
}

export type PostEndpointBodyParams = {
    'md/subscribequote': {symbol: string}
    'md/getchart': {
        symbol: string
        chartDescription: ChartDescription
        timeRange: TimeRange
    }
    'md/subscribehistogram': {symbol: string}
    'md/subscribedom': {symbol: string}
    'md/unsubscribehistogram': CancelBody
    'md/unsubscribequote': CancelBody
    'md/unsubscribedom': CancelBody
    'md/cancelchart': CancelChartBody
    authorize: {token: string}
    'auth/accesstokenrequest': AccessTokenRequestBody
    'auth/oauthtoken': OAuthTokenRequestBody
    'contract/rollcontract': RollContractRequestBody
    'userAccountAutoLiq/create': UserAccountAutoLiq
    'userAccountAutoLiq/update': UserAccountAutoLiq
    'userAccountPositionLimit/create': UserAccountAutoLiq
    'userAccountPositionLimit/update': UserAccountPositionLimit
    'userAccountRiskParameter/create': UserAccountPositionLimit
    'userAccountRiskParameter/update': UserAccountRiskParameter
    'order/liquidateposition': LiquidatePositionRequestBody
    'order/placeorder': PlaceOrderRequestBody
    'order/placeoco': PlaceOCORequestBody
    'order/modifyorder': ModifyOrderRequestBody
    'order/placeoso': PlaceOSORequestBody
    'order/cancelorder': CancelOrderRequestBody
    'orderStrategy/startorderstrategy': StartOrderStrategyRequestBody
    'cashBalance/getcashbalancesnapshot': {accountId: number}
    'replay/changespeed': {speed: number}
    'replay/checkreplaysession': {startTimestamp: string}
    'replay/initializeclock': {
        startTimestamp: string
        speed: number
        initialBalance: number
    }
    'adminAlertSignal/completealertsignal': {adminAlertSignalId: number}
    'adminAlertSignal/takealertsignalownership': {adminAlertSignalId: number}
    'marketDataSubscription/create': MarketDataSubscription
    'marketDataSubscription/update': MarketDataSubscription
    'tradovateSubscription/create': TradovateSubscription
    'tradovateSubscription/update': TradovateSubscription
    'user/syncrequest': {accounts: number[]}
    'userPlugin/create': UserPlugin
    'userPlugin/update': UserPlugin
    'chat/markasreadchatmessage': {chatMessageId: number}
    'chat/postchatmessage': PostChatMessageRequestBody
    'userAccountPositionLimit/deleteuseraccountpositionlimit': {
        userAccountPositionLimitId: number
    }
    'userAccountPositionLimit/deleteuseraccountriskparameter': {
        userAccountRiskParameterId: number
    }
    'user/accepttradingpermission': {tradingPermissionId: number}
    'user/activatesecondmarketdatasubscriptionrenewal': {
        secondMarketDataSubscriptionId: number
    }
    'user/addmarketdatasubscription': AddMarketDataSubscriptionRequestBody
    'user/addsecondmarketdatasubscription': AddSecondMarketDataSubscriptionRequestBody
    'user/addtradovatesubscription': AddTradovateSubscriptionRequestBody
    'user/cancelsecondmarketdatasubscription': {secondMarketDataSubscriptionId: number}
    'user/cancelsecondmarketdatasubscriptionrenewal': {
        secondMarketDataSubscriptionId: number
    }
    'user/canceltradovatesubscription': CancelTradovateSubscriptionRequestBody
    'user/modifycredentials': ModifyCredentialsRequestBody
    'user/modifyemailaddress': {userid?: number; email: string}
    'user/modifypassword': ModifyPasswordRequestBody
    'user/opendemoaccount': OpenDemoAccountRequestBody
    'user/requesttradingpermission': RequestTradingPermissionRequestBody
    'user/revoketradingpermission': {revoketradingpermission: number}
    'user/signuporganizationmember': SignUpOrganizationMemberRequestBody
    'user/addentitlementsubscription': AddEntitlementSubscriptionRequestBody
    'user/changepluginpermission': ChangePluginPermissionRequestBody
}
export type GetEndpointQueryParams = {
    'auth/renewaccesstoken': undefined
    'contract/deps': QueryMasterId
    'contract/find': QueryName
    'contract/getproductfeeparams': QueryProductIds
    'contract/item': QueryId
    'contract/items': QueryIds
    'contract/ldeps': QueryMasterIds
    'contract/suggest': ContractSuggestQuery
    'contractGroup/find': QueryName
    'contractGroup/item': QueryId
    'contractGroup/items': QueryIds
    'contractGroup/list': undefined
    'contractGroup/suggest': QuerySuggest
    'contractMaturity/deps': QueryMasterId
    'contractMaturity/item': QueryId
    'contractMaturity/items': QueryIds
    'contractMaturity/ldeps': QueryMasterIds
    'currency/find': QueryName
    'currency/item': QueryId
    'currency/items': QueryIds
    'currency/list': undefined
    'currency/suggest': QuerySuggest
    'currencyRate/deps': QueryMasterId
    'currencyRate/item': QueryId
    'currencyRate/items': QueryIds
    'currencyRate/ldeps': QueryMasterIds
    'currencyRate/list': undefined
    'exchange/find': QueryName
    'exchange/item': QueryId
    'exchange/items': QueryIds
    'exchange/list': undefined
    'exchange/suggest': QuerySuggest
    'product/deps': QueryMasterId
    'product/find': QueryName
    'product/item': QueryId
    'product/items': QueryIds
    'product/ldeps': QueryMasterIds
    'product/list': undefined
    'product/suggest': QuerySuggest
    'productSession/deps': QueryMasterId
    'productSession/item': QueryId
    'productSession/items': QueryIds
    'productSession/ldeps': QueryMasterIds
    'spreadDefinition/item': QueryId
    'spreadDefinition/items': QueryIds
    'accountRiskStatus/deps': QueryMasterId
    'accountRiskStatus/item': QueryId
    'accountRiskStatus/items': QueryIds
    'accountRiskStatus/ldeps': QueryMasterIds
    'accountRiskStatus/list': undefined
    'contractMargin/deps': QueryMasterId
    'contractMargin/item': QueryId
    'contractMargin/items': QueryIds
    'contractMargin/ldeps': QueryMasterIds
    'productMargin/deps': QueryMasterId
    'productMargin/item': QueryId
    'productMargin/items': QueryIds
    'productMargin/ldeps': QueryMasterIds
    'productMargin/list': undefined
    'userAccountAutoLiq/deps': QueryMasterId
    'userAccountAutoLiq/item': QueryId
    'userAccountAutoLiq/items': QueryIds
    'userAccountAutoLiq/ldeps': QueryMasterIds
    'userAccountAutoLiq/list': undefined
    'userAccountPositionLimit/deps': QueryMasterId
    'userAccountPositionLimit/item': QueryId
    'userAccountPositionLimit/items': QueryIds
    'userAccountPositionLimit/ldeps': QueryMasterIds
    'userAccountRiskParameter/deps': QueryMasterId
    'userAccountRiskParameter/item': QueryId
    'userAccountRiskParameter/items': QueryIds
    'userAccountRiskParameter/ldeps': QueryMasterIds
    'command/deps': QueryMasterId
    'command/item': QueryId
    'command/items': QueryIds
    'command/ldeps': QueryMasterIds
    'command/list': undefined
    'commandReport/deps': QueryMasterId
    'commandReport/item': QueryId
    'commandReport/items': QueryIds
    'commandReport/ldeps': QueryMasterIds
    'commandReport/list': undefined
    'executionReport/deps': QueryMasterIds
    'executionReport/find': QueryName
    'executionReport/item': QueryId
    'executionReport/items': QueryIds
    'executionReport/ldeps': QueryMasterIds
    'executionReport/list': undefined
    'executionReport/suggest': QuerySuggest
    'fill/deps': QueryMasterIds
    'fill/item': QueryId
    'fill/items': QueryIds
    'fill/ldeps': QueryMasterIds
    'fill/list': undefined
    'fillFee/deps': QueryMasterIds
    'fillFee/item': QueryId
    'fillFee/items': QueryIds
    'fillFee/ldeps': QueryMasterIds
    'fillFee/list': undefined
    'order/deps': QueryMasterIds
    'order/item': QueryId
    'order/items': QueryIds
    'order/ldeps': QueryMasterIds
    'order/list': undefined
    'orderStrategy/deps': QueryMasterIds
    'orderStrategy/item': QueryId
    'orderStrategy/items': QueryIds
    'orderStrategy/ldeps': QueryMasterIds
    'orderStrategy/list': undefined
    'orderStrategyLink/deps': QueryMasterIds
    'orderStrategyLink/item': QueryId
    'orderStrategyLink/items': QueryIds
    'orderStrategyLink/ldeps': QueryMasterIds
    'orderStrategyLink/list': undefined
    'orderVersion/deps': QueryMasterIds
    'orderVersion/item': QueryId
    'orderVersion/items': QueryIds
    'orderVersion/ldeps': QueryMasterIds
    'orderVersion/list': undefined
    'fillPair/deps': QueryMasterIds
    'fillPair/item': QueryId
    'fillPair/items': QueryIds
    'fillPair/ldeps': QueryMasterIds
    'fillPair/list': undefined
    'position/deps': QueryMasterIds
    'position/find': QueryName
    'position/item': QueryId
    'position/items': QueryIds
    'position/ldeps': QueryMasterIds
    'position/list': undefined
    'account/deps': QueryMasterIds
    'account/find': QueryName
    'account/item': QueryId
    'account/items': QueryIds
    'account/ldeps': QueryMasterIds
    'account/list': undefined
    'account/suggest': QuerySuggest
    'cashBalance/deps': QueryMasterIds
    'cashBalance/item': QueryId
    'cashBalance/items': QueryIds
    'cashBalance/ldeps': QueryMasterIds
    'cashBalance/list': undefined
    'cashBalanceLog/deps': QueryMasterIds
    'cashBalanceLog/item': QueryId
    'cashBalanceLog/items': QueryIds
    'cashBalanceLog/ldeps': QueryMasterIds
    'marginSnapshot/deps': QueryMasterIds
    'marginSnapshot/item': QueryId
    'marginSnapshot/items': QueryIds
    'marginSnapshot/ldeps': QueryMasterIds
    'marginSnapshot/list': undefined
    'tradingPermission/deps': QueryMasterIds
    'tradingPermission/item': QueryId
    'tradingPermission/items': QueryIds
    'tradingPermission/ldeps': QueryMasterIds
    'tradingPermission/list': undefined
    'marketDataSubscriptionExchangeScope/find': QueryName
    'marketDataSubscriptionExchangeScope/item': QueryId
    'marketDataSubscriptionExchangeScope/items': QueryIds
    'marketDataSubscriptionExchangeScope/list': undefined
    'marketDataSubscriptionExchangeScope/suggest': QuerySuggest
    'marketDataSubscriptionPlan/find': QueryName
    'marketDataSubscriptionPlan/item': QueryId
    'marketDataSubscriptionPlan/items': QueryIds
    'marketDataSubscriptionPlan/list': undefined
    'marketDataSubscriptionPlan/suggest': QuerySuggest
    'tradovateSubscriptionPlan/find': QueryName
    'tradovateSubscriptionPlan/item': QueryId
    'tradovateSubscriptionPlan/items': QueryIds
    'tradovateSubscriptionPlan/list': undefined
    'tradovateSubscriptionPlan/suggest': QuerySuggest
    'adminAlert/deps': QueryMasterIds
    'adminAlert/item': QueryId
    'adminAlert/items': QueryIds
    'adminAlert/ldeps': QueryMasterIds
    'adminAlert/list': undefined
    'alert/deps': QueryMasterIds
    'alert/item': QueryId
    'alert/items': QueryIds
    'alert/ldeps': QueryMasterIds
    'alert/list': undefined
    'alertSignal/deps': QueryMasterIds
    'alertSignal/item': QueryId
    'alertSignal/items': QueryIds
    'alertSignal/ldeps': QueryMasterIds
    'alertSignal/list': undefined
    'adminAlertSignal/deps': QueryMasterIds
    'adminAlertSignal/item': QueryId
    'adminAlertSignal/items': QueryIds
    'adminAlertSignal/ldeps': QueryMasterIds
    'adminAlertSignal/list': undefined
    'clearingHouse/deps': QueryMasterIds
    'clearingHouse/item': QueryId
    'clearingHouse/items': QueryIds
    'clearingHouse/list': undefined
    'clearingHouse/suggest': QuerySuggest
    'entitlement/item': QueryId
    'entitlement/items': QueryIds
    'entitlement/list': undefined
    'orderStrategyType/find': QueryName
    'orderStrategyType/item': QueryId
    'orderStrategyType/items': QueryIds
    'orderStrategyType/list': undefined
    'orderStrategyType/suggest': QuerySuggest
    'property/find': QueryName
    'property/item': QueryId
    'property/items': QueryIds
    'property/list': undefined
    'property/suggest': QuerySuggest
    'contactInfo/deps': QueryMasterIds
    'contactInfo/item': QueryId
    'contactInfo/items': QueryIds
    'contactInfo/ldeps': QueryMasterIds
    'marketDataSubscription/deps': QueryMasterIds
    'marketDataSubscription/item': QueryId
    'marketDataSubscription/items': QueryIds
    'marketDataSubscription/ldeps': QueryMasterIds
    'marketDataSubscription/list': undefined
    'organization/find': QueryName
    'organization/item': QueryId
    'organization/items': QueryIds
    'organization/list': undefined
    'organization/suggest': QuerySuggest
    'secondMarketDataSubscription/deps': QueryMasterIds
    'secondMarketDataSubscription/item': QueryId
    'secondMarketDataSubscription/items': QueryIds
    'secondMarketDataSubscription/ldeps': QueryMasterIds
    'secondMarketDataSubscription/list': undefined
    'tradovateSubscription/deps': QueryMasterIds
    'tradovateSubscription/item': QueryId
    'tradovateSubscription/items': QueryIds
    'tradovateSubscription/ldeps': QueryMasterIds
    'tradovateSubscription/list': undefined
    'user/find': QueryName
    'user/item': QueryId
    'user/items': QueryIds
    'user/list': undefined
    'user/suggest': QuerySuggest
    'userPlugin/deps': QueryMasterIds
    'userPlugin/item': QueryId
    'userPlugin/items': QueryIds
    'userPlugin/ldeps': QueryMasterIds
    'userPlugin/list': undefined
    'userProperty/deps': QueryMasterIds
    'userProperty/item': QueryId
    'userProperty/items': QueryIds
    'userProperty/ldeps': QueryMasterIds
    'userSession/item': QueryId
    'userSession/items': QueryIds
    'userSessionStats/deps': QueryMasterIds
    'userSessionStats/item': QueryId
    'userSessionStats/items': QueryIds
    'userSessionStats/ldeps': QueryMasterIds
    'userSessionStats/list': undefined
    'chat/deps': QueryMasterIds
    'chat/item': QueryId
    'chat/items': QueryIds
    'chat/ldeps': QueryMasterIds
    'chat/list': undefined
    'chatMessage/deps': QueryMasterIds
    'chatMessage/item': QueryId
    'chatMessage/items': QueryIds
    'chatMessage/ldeps': QueryMasterIds
}

export type GetEndpoints = keyof GetEndpointQueryParams

export type PostEndpoints = keyof PostEndpointBodyParams

export enum Environment {
    Live = 'live',
    Demo = 'demo'
}

export interface TicksTransformer {
    (packet: TickPacket): Tick[]
}

export interface BarsTransformer {
    (packet: BarPacket): Bar[]
}

export type CalculatePnLParams = {
    price: number
    position: Position
    product: Product
}

/**
 * Represents parameters for creating a Dispatcher instance.
 * @typeparam T - The type of the StrategyState.
 * @typeparam U - The type of the custom action template.
 * @typeparam V - The type of the custom action value.
 */
export type DispatcherParams<T extends StrategyState, U extends string, V> = {
    id?: string
    model: T
    reducer: (
        prevState: T,
        action: Action | CustomActionTemplate<U, V>
    ) => EventHandlerResults<T>
}

/**
 * Represents a type that is either a Tick or a Bar based on the transformer function provided.
 * @typeparam T - The transformer function type (BarsTransformer or TicksTransformer).
 */
export type TickOrBar<T extends BarsTransformer | TicksTransformer> =
    T extends TicksTransformer ? Tick : T extends BarsTransformer ? Bar : never

/**
 * Represents a type that is either a TickPacket or a BarPacket based on the transformer function provided.
 * @typeparam T - The transformer function type (BarsTransformer or TicksTransformer).
 */
export type TickOrBarPacket<T extends BarsTransformer | TicksTransformer> =
    T extends TicksTransformer
        ? TickPacket
        : T extends BarsTransformer
        ? BarPacket
        : never
