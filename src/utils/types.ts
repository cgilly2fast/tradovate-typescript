import ReplaySocket from '../websockets/ReplaySocket'
import Dispatcher from './dispatcher'

export enum ORDER_TYPE {
    Limit = 'Limit',
    MIT = 'MIT',
    Market = 'Market',
    QTS = 'QTS',
    Stop = 'Stop',
    StopLimit = 'StopLimit',
    TrailingStop = 'TralingStop',
    TrailingStopLimit = 'TrailingStopLimit'
}

export enum ORDER_ACTION {
    Buy = 'Buy',
    Sell = 'Sell'
}

export enum TIME_IN_FORCE {
    Day = 'Day',
    FOK = 'FOK',
    GTC = 'GTC',
    GTD = 'GTD',
    IOC = 'IOC'
}

export enum STORAGE_KEYS {
    STORAGE_KEY = 'tradovate-api-access-token',
    EXPIRATION_KEY = 'tradovate-api-access-expiration',
    DEVICE_ID_KEY = 'tradovate-device-id',
    AVAIL_ACCTS_KEY = 'tradovate-api-available-accounts',
    USER_DATA_KEY = 'tradovate-user-data'
}

export enum TdEventType {
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
    ProductFound = 'product/found'
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

export type PropsEventMsg = {
    e: string
}

export type ClockEventMsg = {
    e: string
    d: string
}

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
    charts: BarPacket[] | TickPacket[]
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

export type Chart = BarPacket[] | TickPacket[]
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
    data: {[k: string]: unknown}
    props: StrategyProps | any
}
export type Action = {
    event: string
    payload: Payload
}
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
    e: TdEventType
    d:
        | QuoteEventMsg
        | ChartEventMsg
        | HistogramEventMsg
        | DomEventMsg
        | ClockEventMsg
        | PropsEventMsg
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
export type CommandReport = {
    id?: number
    commandId: number
    timestamp: string
    commandStatus: CommandStatus
    rejectReason?: FailureReason
    text?: string
    ordStatus?: OrderStatus
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
    orderType: ORDER_TYPE
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TIME_IN_FORCE
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
    orderType: ORDER_TYPE
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TIME_IN_FORCE
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
    orderType: ORDER_TYPE
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TIME_IN_FORCE
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
    orderType: ORDER_TYPE
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TIME_IN_FORCE
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
    orderType: ORDER_TYPE
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

export function isErrorResponse<T extends keyof SubscribeEventResponse>(
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
    [k: string]: unknown
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
    cashBalances?: CashBalances[]
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
    contractGroups: ContractGroups[]
    orderStrategyTypes?: any[]
}

export type OrderStrategyTypes = {
    id?: number
    name: string
    enabled: boolean
}

export type ContractGroups = {
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
    orderType: ORDER_TYPE
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: TIME_IN_FORCE
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
    clOrdid?: number
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

export type Currency = {
    id?: number
    name: string
    symbol?: string
}

export type CashBalances = {
    id?: number
    accountId: number
    timestamp: number
    tradeDate: TradeDate
    currencyId: number
    amount: number
    realizedPnL?: number
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

export type Contract = {
    id?: number
    name: string
    contractMaturityId?: number
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

export interface StrategyBodyParams {
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
    dispatcher?: Dispatcher
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
    dispatcher: Dispatcher
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

export type StartOrderStrategyEffectParams = {
    contract: Contract
    action: OrderAction
    brackets: OrderBracket[]
    entryVersion: EntryVersion
}

export type PlaceOrderEffectParams = {
    contract: Contract
    orderType: ORDER_TYPE
    action: OrderAction
    orderQty: number
    price: number
}

export type PlaceOCOOrderEffectParams = {
    contract: Contract
    orderType: ORDER_TYPE
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

export type EventHandlerResults<T> = {
    state: T
    effects: Action[]
}
