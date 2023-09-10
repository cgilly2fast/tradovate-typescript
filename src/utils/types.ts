import ReplaySocket from '../websockets/ReplaySocket'

export enum OrderType {
    Limit = 'Limit',
    MIT = 'MIT',
    Market = 'Market',
    QTS = 'QTS',
    Stop = 'Stop',
    StopLimit = 'StopLimit',
    TrailingStop = 'TralingStop',
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

export enum StorageKeys {
    STORAGE_KEY = 'tradovate-api-access-token',
    EXPIRATION_KEY = 'tradovate-api-access-expiration',
    DEVICE_ID_KEY = 'tradovate-device-id',
    AVAIL_ACCTS_KEY = 'tradovate-api-available-accounts',
    USER_DATA_KEY = 'tradovate-user-data'
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
    ProductFound = 'product/found',
    PlaceOCO = 'order/placeOCO',
    PlaceOrder = 'order/placeOrder',
    StartOrderStrategy = 'orderStrategy/startOrderStrategy',
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
    Long = '[LongShortMode] Long',
    Short = '[LongShortMode] Short',
    Watch = '[LongShortMode] Watch',
    Setup = '[LongShortMode] Setup', // Looking for a technical set up to occur
    Entry = '[LongShortMode] Entry' // When a technical set up occurs and looking for desired price to enter
}

export enum BarType {
    MINUTE_BAR = 'MinuteBar',
    TICK = 'Tick',
    DOM = 'DOM',
    DAILY = 'DailyBar',
    CUSTOM = 'Custom'
}
export enum ElementSizeUnit {
    UNDERLYING_UNITS = 'UnderlyingUnits',
    VOLUME = 'Volume',
    RANGE = 'Range',
    RENKO = 'Renko',
    MOMENTUM_RANGE = 'MomentumRange',
    POINT_AND_FIGURE = 'PointAndFigure',
    OFA_Range = 'OFARange'
}

export enum TimeRangeType {
    AS_MUCH_AS_ELEMENTS = 'asMuchAsElements',
    AS_FAR_AS_TIMESTAMP = 'asFarAsTimestamp',
    CLOSEST_TIMESTAMP = 'closestTimestamp',
    CLOSEST_TICK_ID = 'closestTickId'
}

export type Bar = {
    timestamp: Date
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
    timestamp: Date
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

export type ProductFoundAction = {
    event: StrategyEvent.ProductFound
    payload: ProductFoundPayload
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

export type ChartPayload = BarPacket[] | TickPacket[]

export type Action =
    | ChartAction
    | PropsAction
    | UserSyncAction
    | ProductFoundAction
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
    token?: string
    expiration?: string
}

export type ErrorResponse = {
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

export type EndpointURLs = keyof EndpointResponse &
    keyof EndpointRequestBody &
    keyof EndpointRequestQuery
export type SubscribeURLs = keyof SubscribeEventResponse & keyof SubscribeRequestBody

export type EndpointRequestBody = {
    'account/list': undefined
    'order/list': undefined
    'order/item': undefined
    'order/cancelorder': {orderId: number}
    authorize: {token: string}
    'replay/checkreplaysession': {startTimestamp: string}
    'replay/initializeclock': {
        startTimestamp: string
        speed: number
        initialBalance: number
    }
    'replay/changespeed': {speed: number}
    'user/syncrequest': {accounts: number[]}
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
    'auth/accessTokenRequest': AccessTokenRequestBody
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
    'commandReport/deps': undefined
    'orderStrategy/startOrderStrategy': StartOrderStrategyRequestBody
    'order/placeOrder': PlaceOrderRequestBody
    'order/placeOCO': PlaceOCORequestBody
    'order/modifyorder': ModifyOrderRequestBody
}

export type EndpointRequestQuery = {
    'account/list': undefined
    'order/list': undefined
    'order/item': {id: number}
    'order/cancelorder': {orderId: number}
    authorize: undefined
    'user/syncrequest': undefined
    'replay/checkreplaysession': undefined
    'replay/initializeclock': undefined
    'replay/changespeed': undefined
    'md/getchart': undefined
    'md/subscribehistogram': undefined
    'md/subscribequote': undefined
    'md/subscribedom': undefined
    'md/unsubscribehistogram': undefined
    'md/unsubscribequote': undefined
    'md/unsubscribedom': undefined
    'md/cancelchart': undefined
    'auth/accessTokenRequest': undefined
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
    'commandReport/deps': QueryMasterId
    'orderStrategy/startOrderStrategy': undefined
    'order/placeOrder': undefined
    'order/placeOCO': undefined
    'order/modifyorder': undefined
}

export type EndpointResponse = {
    'account/list': AccountListResponse
    'order/list': OrderListResponse
    'order/item': OrderItemResponse
    'order/cancelorder': CommandResponse
    authorize: undefined
    'user/syncrequest': SyncRequestResponse
    'replay/checkreplaysession': CheckReplaySessionResponse
    'replay/initializeclock': SimpleResponse
    'replay/changespeed': SimpleResponse
    'md/getchart': GetChartResponse
    'md/subscribehistogram': SimpleResponse
    'md/subscribequote': SimpleResponse
    'md/subscribedom': SimpleResponse
    simple: SimpleResponse
    'md/unsubscribehistogram': SimpleResponse
    'md/unsubscribequote': SimpleResponse
    'md/unsubscribedom': SimpleResponse
    'md/cancelchart': SimpleResponse
    'auth/accessTokenRequest': AccessTokenResponse
    'auth/me': MeResponse
    'auth/oauthtoken': OAuthTokenResponse
    'auth/renewaccesstoken': AccessTokenResponse
    'contract/deps': Contract[]
    'contract/find': Contract
    'contract/getproductfeeparams': ProductFeeParamsResponse
    'contract/item': Contract
    'contract/items': Contract[]
    'contract/ldeps': Contract[]
    'contract/rollcontract': RollContractResponse
    'contract/suggest': Contract[]
    'commandReport/deps': CommandReport[]
    'orderStrategy/startOrderStrategy': StartOrderStrategyResponse
    'order/placeOrder': PlaceOrderResponse
    'order/placeOCO': PlaceOCOOrderResponse
    'order/modifyorder': CommandResponse
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
    expirationTime?: string
    passwordExpirationTime?: string
    userStatus?: UserStatus
    userId?: number
    name?: string
    hasLive?: boolean
}

export enum UserStatus {
    ACTIVE = 'active',
    CLOSED = 'Closed',
    INITIATED = 'Initiated',
    TEMPORARY_LOCKED = 'Temporary_Locked',
    UNCONFIRMED_EMAIL = 'UnconfirmedEmail'
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
    'md/subscribeQuote': 'md/subscribeQuote'
    'md/getChart': 'md/getChart'
    'md/subscribeHistogram': 'md/subscribeHistogram'
    'md/subscribeDOM': 'md/subscribeDOM'
}

export function isErrorResponse<T extends EndpointURLs>(
    item: ResponseMsg<T> | ErrorResponse
): item is ErrorResponse

export function isErrorResponse(
    item: ResponseMsg<'simple'> | ErrorResponse | ServerEvent
): item is ErrorResponse {
    return (item as ErrorResponse).s !== 200
}

// export function isServerEvent<T extends keyof SubscribeEventResponse>(
//     item: ResponseMsg<'simple'> | ServerEvent<T> | ErrorResponse
// ): item is ServerEvent<T> {
//     return 'e' in item
// }

export function isValidResponseMsg<T extends EndpointURLs>(
    item: ResponseMsg<T> | ErrorResponse
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

export enum CheckStatus {
    INELIGIBLE = 'Ineligible',
    OK = 'OK',
    START_TIMESTAMP_ADJUSTED = 'StartTimestampAdjusted'
}

export type CommandResponse = {
    failureReason?: FailureReason
    failureText?: string
    commandId?: number
}

export enum FailureReason {
    ACCOUNT_CLOSED = 'AccountClosed',
    ADVANCED_TRAILING_STOP_UNSUPPORTED = 'AdvancedTrailingStopUnsupported',
    ANOTHER_COMMAND_PENDING = 'AnotherCommandPending',
    BACK_MONTH_PENDING = 'BackMonthProhibited',
    EXECUTION_PROVIDER_NOT_CONFIGURED = 'ExecutionProviderNotConfigured',
    EXECUTION_PROVIDER_UNAVAILABLE = 'ExecutionProviderUnavailable',
    INVALID_CONTRACT = 'InvalidContract',
    INVALID_PRICE = 'InvalidPrice',
    LIQUIDATION_ONLY = 'LiquidationOnly',
    LIQUIDATION_ONLY_BEFORE_EXPIRATION = 'LiquidationOnlyBeforeExpiration',
    MAX_ORDER_QTY_IS_NOT_SPECIFIED = 'MaxOrderQtyIsNotSpecified',
    MAX_ORDER_QTY_LIMIT_REACHED = 'MaxOrderQtyLimitReached',
    MAX_POS_LIMIT_MISCONFIGURED = 'MaxPosLimitMisconfigured',
    MAX_POS_LIMIT_REACHED = 'MaxPosLimitReached',
    MAX_TOTAL_POS_LIMIT_REACHED = 'MaxTotalPosLimitReached',
    MULTIPLE_ACCOUNT_PLAN_REQUIRED = 'MultipleAccountPlanRequired',
    NO_QUOTE = 'NoQuote',
    NOT_ENOUGH_LIQUIDITY = 'NotEnoughLiquidity',
    OTHER_EXECUTION_RELATED = 'OtherExecutionRelated',
    PARENT_REJECTED = 'ParentRejected',
    RISK_CHECK_TIMEOUT = 'RiskCheckTimeout',
    SESSION_CLOSED = 'SessionClosed',
    SUCCESS = 'Success',
    TOO_LATE = 'TooLate',
    TRADING_LOCKED = 'TradingLocked',
    TRAILING_STOP_NON_ORDER_QTY_MODIFY = 'TrailingStopNonOrderQtyModify',
    UNAUTHORIZED = 'Unauthorized',
    UNKNOWN_REASON = 'UnknownReason',
    UNSUPPORTED = 'Unsupported'
}

export type SimpleResponse = {
    ok: boolean
    errorText?: string
}

export type GetChartResponse = {
    subscriptionId?: number
    realtimeId?: number
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
    CUSTOMER = 'Customer',
    GIVEUP = 'Giveup',
    HOUSE = 'HOUSE',
    OMNIBUS = 'Omnibus',
    WASH = 'Wash'
}

export enum MarginAccountype {
    HEDGER = 'Hedger',
    SPECULATOR = 'Speculator'
}

export enum LegalStatus {
    CORPORATION = 'Corporation',
    GP = 'GP',
    INDIVIDUAL = 'Individual',
    JOINT = 'Joint',
    LLC = 'LLC',
    LLP = 'LLP',
    LP = 'LP',
    PTR = 'PTR',
    TRUST = 'Trust'
}

export enum OrderAction {
    BUY = 'Buy',
    SELL = 'Sell'
}

export enum OrderStatus {
    CANCELED = 'Canceled',
    COMPLETE = 'Completed',
    EXPIRED = 'Expired',
    FILLED = 'Filled',
    PENDING_CANCELLED = 'PendingCancel',
    PENDING_NEW = 'PendingNew',
    PENDING_REPLACE = 'PendingReplace',
    REJECTED = 'Rejected',
    SUSPENDED = 'Suspended',
    UNKNOWN = 'Unknown',
    WORKING = 'Working'
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
    marginAccountType: MarginAccountype
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
    BOOLEAN = 'Boolean',
    ENUM = 'Enum',
    INTEGER = 'INTEGER',
    STRING = 'String'
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
    ACTIVE_STRATEGY = 'ActiveStrategy',
    EXECUTION_FAILED = 'ExecutionFailed',
    EXECUTION_FINISHED = 'ExecutionFinished',
    EXECUTION_INTERRUPTED = 'ExecutionInterrupted',
    INACTIVE_STRATEGY = 'InactiveStrategy',
    NOT_ENOUGH_LIQUIDITY = 'NotEnoughLiquidity',
    STOPPED_BY_USER = 'StoppedByUser'
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

export type SubscribeQuoteParams = {symbol: string; onSubscription: (item: any) => void}
export type SubscribeDOMParams = {symbol: string; onSubscription: (item: any) => void}
export type SubscribeHistogramParams = {
    symbol: string | number
    onSubscription: (item: any) => void
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
    onSubscription: (item: any) => void
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

export type MarketDataSocketSubscribeParams<T extends EndpointURLs> = {
    url: T
    body: EndpointRequestBody[T]
    onSubscription: (data: Quote | DOM | Chart | Histogram) => void
}

export interface MdSocket extends Socket {
    //subscribe<T extends SubscribeURLs>(params: MarketDataSocketSubscribeParams<T>): Promise<() => Promise<void>>
    subscribeQuote(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void>
    subscribeDOM(symbol: string, onSubscription: (item: any) => void): Promise<() => void>
    subscribeHistogram(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void>
    subscribeChart(
        symbol: string,
        chartDescription: ChartDescription,
        timeRange: TimeRange,
        onSubscription: (item: any) => void
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
    UserAccountPositionLimitCreate = 'userAccountPositionLimit/create',
    UserAccountPositionLimitDependents = 'userAccountPositionLimit/deps',
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
    LiquidatePosition = 'order/liquidatePosition',
    OrderList = 'order/list',
    ModifyOrder = 'order/modifyrder',
    PlaceOCO = 'order/placeoco',
    PlaceOrder = 'order/placeorder',
    PlaceOSO = 'order/placeoso',
    OrderStrategyDependents = 'orderStrategy/deps',
    InterruptOrderStrategy = 'orderStrategy/interruptOrderStrategy',
    OrderStrategyItem = 'orderStrategy/item',
    OrderStrategyItems = 'orderStrategy/items',
    OrderStrategyLDependents = 'orderStrategy/ldeps',
    OrderStrategyList = 'orderStrategy/list',
    ModifyOrderStrategy = 'orderStrategy/modifyOrderStrategy',
    StartOrderStrategy = 'orderStrategy/startOrderStrategy',
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
    CashBalanceSnapshot = 'getCashBalance/snapshot',
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
    CompleteAlertSnapshot = 'completeAlert/snapshot',
    AdminAlertSnapshot = 'adminAlert/snapshot',
    AdminAlertItem = 'adminAlert/item',
    AdminAlertItems = 'adminAlert/items',
    AdminAlertLDepends = 'adminAlert/ldeps',
    AdminAlertList = 'adminAlert/list',
    TakeAlertOwnership = 'takeAlert/ownership',
    CreateAlert = 'create/alert',
    DeleteAlert = 'delete/alert',
    AlertSnapshot = 'alert/snapshot',
    DismissAlert = 'dismiss/alert',
    AlertItem = 'alert/item',
    AlertItems = 'alert/items',
    AlertLDepends = 'alert/ldeps',
    AlertList = 'alert/list',
    MarkReadAlertSnapshot = 'markReadAlert/snapshot',
    ModifyAlert = 'modify/alert',
    ResetAlert = 'reset/alert',
    AlertSignalSnapshot = 'alertSignal/snapshot',
    AlertSignalItem = 'alertSignal/item',
    AlertSignalItems = 'alertSignal/items',
    AlertSignalLDepends = 'alertSignal/ldeps',
    AlertSignalList = 'alertSignal/list',
    AdminAlertSuggest = 'adminAlert/suggest',
    ClearingHouseSnapshot = 'clearingHouse/snapshot',
    ClearingHouseItem = 'clearingHouse/item',
    ClearingHouseItems = 'clearingHouse/items',
    ClearingHouseList = 'clearingHouse/list',
    ClearingHouseSuggest = 'clearingHouse/suggest',
    EntitlementItem = 'entitlement/item',
    EntitlementItems = 'entitlement/items',
    EntitlementList = 'entitlement/list',
    OrderStrategyTypeSnapshot = 'orderStrategyType/snapshot',
    OrderStrategyTypeItem = 'orderStrategyType/item',
    OrderStrategyTypeItems = 'orderStrategyType/items',
    OrderStrategyTypeList = 'orderStrategyType/list',
    OrderStrategyTypeSuggest = 'orderStrategyType/suggest',
    PropertySnapshot = 'property/snapshot',
    PropertyItem = 'property/item',
    PropertyItems = 'property/items',
    PropertyList = 'property/list',
    PropertySuggest = 'property/suggest',
    ContactInfoSnapshot = 'contactInfo/snapshot',
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
    OrganizationSnapshot = 'organization/snapshot',
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
    UserSnapshot = 'user/snapshot',
    GetAccountTradingPermissions = 'getAccountTradingPermissions',
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
    ChatLDepends = 'chat/ldeps',
    ChatList = 'chat/list',
    MarkAsReadChatMessage = 'markAsReadChatMessage',
    PostChatMessage = 'postChatMessage',
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
    ChangePluginPermission = 'user/changepluginpermission'
}
//}

enum ReversedTvEndpoint {
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
    'order/liquidatePosition' = 'LiquidatePosition',
    'order/list' = 'OrderList',
    'order/modifyrder' = 'ModifyOrder',
    'order/placeoco' = 'PlaceOCO',
    'order/placeorder' = 'PlaceOrder',
    'order/placeoso' = 'PlaceOSO',
    'orderStrategy/deps' = 'OrderStrategyDependents',
    'orderStrategy/interruptOrderStrategy' = 'InterruptOrderStrategy',
    'orderStrategy/item' = 'OrderStrategyItem',
    'orderStrategy/items' = 'OrderStrategyItems',
    'orderStrategy/ldeps' = 'OrderStrategyLDependents',
    'orderStrategy/list' = 'OrderStrategyList',
    'orderStrategy/modifyOrderStrategy' = 'ModifyOrderStrategy',
    'orderStrategy/startOrderStrategy' = 'StartOrderStrategy',
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
    'getCashBalance/snapshot' = 'CashBalanceSnapshot',
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
    'completeAlert/snapshot' = 'CompleteAlertSnapshot',
    'adminAlert/snapshot' = 'AdminAlertSnapshot',
    'adminAlert/item' = 'AdminAlertItem',
    'adminAlert/items' = 'AdminAlertItems',
    'adminAlert/ldeps' = 'AdminAlertLDepends',
    'adminAlert/list' = 'AdminAlertList',
    'takeAlert/ownership' = 'TakeAlertOwnership',
    'create/alert' = 'CreateAlert',
    'delete/alert' = 'DeleteAlert',
    'alert/snapshot' = 'AlertSnapshot',
    'dismiss/alert' = 'DismissAlert',
    'alert/item' = 'AlertItem',
    'alert/items' = 'AlertItems',
    'alert/ldeps' = 'AlertLDepends',
    'alert/list' = 'AlertList',
    'markReadAlert/snapshot' = 'MarkReadAlertSnapshot',
    'modify/alert' = 'ModifyAlert',
    'reset/alert' = 'ResetAlert',
    'alertSignal/snapshot' = 'AlertSignalSnapshot',
    'alertSignal/item' = 'AlertSignalItem',
    'alertSignal/items' = 'AlertSignalItems',
    'alertSignal/ldeps' = 'AlertSignalLDepends',
    'alertSignal/list' = 'AlertSignalList',
    'adminAlert/suggest' = 'AdminAlertSuggest',
    'clearingHouse/snapshot' = 'ClearingHouseSnapshot',
    'clearingHouse/item' = 'ClearingHouseItem',
    'clearingHouse/items' = 'ClearingHouseItems',
    'clearingHouse/list' = 'ClearingHouseList',
    'clearingHouse/suggest' = 'ClearingHouseSuggest',
    'entitlement/item' = 'EntitlementItem',
    'entitlement/items' = 'EntitlementItems',
    'entitlement/list' = 'EntitlementList',
    'orderStrategyType/snapshot' = 'OrderStrategyTypeSnapshot',
    'orderStrategyType/item' = 'OrderStrategyTypeItem',
    'orderStrategyType/items' = 'OrderStrategyTypeItems',
    'orderStrategyType/list' = 'OrderStrategyTypeList',
    'orderStrategyType/suggest' = 'OrderStrategyTypeSuggest',
    'property/snapshot' = 'PropertySnapshot',
    'property/item' = 'PropertyItem',
    'property/items' = 'PropertyItems',
    'property/list' = 'PropertyList',
    'property/suggest' = 'PropertySuggest',
    'contactInfo/snapshot' = 'ContactInfoSnapshot',
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
    'organization/snapshot' = 'OrganizationSnapshot',
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
    'user/snapshot' = 'UserSnapshot',
    'getAccountTradingPermissions' = 'GetAccountTradingPermissions',
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
    'chat/ldeps' = 'ChatLDepends',
    'chat/list' = 'ChatList',
    'markAsReadChatMessage' = 'MarkAsReadChatMessage',
    'postChatMessage' = 'PostChatMessage',
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
    'user/changepluginpermission' = 'ChangePluginPermission'
}

// 1. Take a list of strings as input.
// 2. Create a TypeScript enum following these conditions:
// 2a.Format using industry-standard TypeScript enum formatting.
// 2b. Do not make changes to enum keys
// 2c. Parse the last word of values:
// 2c1.Remove the last word and append '/'+toLowerCase(last word).
// 2c2a. Special cases:
// If the last word of the key is 'lDependents', replace it with '/ldeps'.
// If the last word of the key  is 'Dependents', replace it with '/deps'.
// If the last word of the key is 'Snapshot', replace it with '/snapshot'
// If the last word of the key  is 'Find', replace it with '/find'
// If the last word of the key  is 'Create', replace it with '/create'
// If the last word of the key  is 'Update', replace it with '/update'
// 3. Exclude values like 'GET' and 'POST' from the enum. Input:
