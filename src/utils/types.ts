import { subscribe } from "diagnostics_channel"

export enum ORDER_TYPE {
    Limit = 'Limit',
    MIT = 'MIT',
    Market = 'Market',
    QTS = 'QTS',
    Stop = 'Stop',
    StopLimit = 'StopLimit',
    TrailingStop = 'TralingStop',
    TrailingStopLimit = 'TrailingStopLimit',
}

export enum ORDER_ACTION {
    Buy = 'Buy',
    Sell = 'Sell',
}

export enum TIME_IN_FORCE {
    Day = 'Day',
    FOK = 'FOK',
    GTC = 'GTC',
    GTD = 'GTD',
    IOC = 'IOC',
}

export enum STORAGE_KEYS {
    STORAGE_KEY = 'tradovate-api-access-token',
    EXPIRATION_KEY = 'tradovate-api-access-expiration',
    DEVICE_ID_KEY = 'tradovate-device-id',
    AVAIL_ACCTS_KEY = 'tradovate-api-available-accounts',
    USER_DATA_KEY = 'tradovate-user-data',
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
    ProductFound = 'product/found',
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
    ContractGroup = 'contractGroup',
}

export enum LongShortMode {
    Long = '[LongShortMode] Long',
    Short = '[LongShortMode] Short',
    Watch = '[LongShortMode] Watch',
    Setup = '[LongShortMode] Setup', // Looking for a technical set up to occur
    Entry = '[LongShortMode] Entry', // When a technical set up occurs and looking for desired price to enter
}

export enum BarType {
    MINUTE_BAR = 'MinuteBar',
    TICK = 'Tick',
    DOM = 'DOM',
    DAILY = 'DailyBar',
    CUSTOM = 'Custom',
}
export enum ElementSizeUnit {
    UNDERLYING_UNITS = 'UnderlyingUnits',
    VOLUME = 'Volume',
    RANGE = 'Range',
    RENKO = 'Renko',
    MOMENTUM_RANGE = 'MomentumRange',
    POINT_AND_FIGURE = 'PointAndFigure',
    OFA_Range = 'OFARange',
}

export enum TimeRangeType {
    AS_MUCH_AS_ELEMENTS = 'asMuchAsElements',
    AS_FAR_AS_TIMESTAMP = 'asFarAsTimestamp',
    CLOSEST_TIMESTAMP = 'closestTimestamp',
    CLOSEST_TICK_ID = 'closestTickId',
}
export type Contract = {
    id: number //123456
    name: string //ESU3
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
    items: { [k: string]: number } // Example: "-14":5906.67 Actual number of histogram items may depend on data
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
    props: { [k: string]: any }
}
export type Action = {
    event: string
    payload: Payload
}
export type EventHandlerResults = {
    state: Dictionary
    effects: Action[]
}
export enum Trend {
    DOWN = -1,
    NA = 0,
    UP = 1,
}

export type AccessToken = {
    token?: string
    expiration?: string
}

export type ClockEvent = {}

export type QuoteEvent = {
    quotes: Quote[]
}

export type ServerEvent<T extends keyof SubscribeEventResponse> = {
    e: TdEventType
    d: SubscribeEventResponse[T]
}



export type ErrorResponse = {
    d: string
    i: number
    s: number
}

export type ResponseMsg<T extends keyof EndpointResponse> = {
    d: EndpointResponse[T]
    i: number
    s: number
}



export interface SimpleRequest<T extends EndpointURLs> {
    url:string
    onResponse?: (item: ResponseMsg<T>) => void
    onReject?: () => void
}

export type OrderListRequest = {
    url?: 'order/list'
    onResponse?: (item: ResponseMsg<'order/list'>) => void
    onReject?: () => void
}

export type OrderItemRequest = {
    url:string
    query:{id:number}
    onResponse?: (item: ResponseMsg<'order/item'>) => void
    onReject?: () => void
}

export type EndpointURLs =  keyof EndpointResponse & keyof EndpointRequestBody & keyof EndpointRequestQuery 
export type SubscribeURLs = keyof SubscribeEventResponse & keyof SubscribeRequestBody 

export type EndpointRequestBody =  {
    'account/list':undefined
    'order/list': undefined
    'order/item': undefined
    'order/cancelorder': {orderId: number}
    'authorize': {token:string}
    'replay/checkreplaysession': {startTimestamp:string}
    'replay/initializeclock': {startTimestamp: string, speed:number, initialBalance: number} 
    'replay/changespeed': {speed:number}
    'user/syncrequest': {accounts: number[]}
    'md/subscribequote': {symbol:string }
    'md/getchart': {symbol:string, chartDescription:ChartDescription, timeRange:TimeRange }
    'md/subscribehistogram': {symbol:string }
    'md/subscribedom': {symbol:string}
    'md/unsubscribehistogram': {symbol:string}
    'md/unsubscribequote':{symbol:string }
    'md/unsubscribedom':{symbol:string }
    'md/cancelchart': { subscriptionId: number}  
} 

export type EndpointRequestQuery = {
    'account/list': undefined,
    'order/list': undefined
    'order/item': {id:number}
    'order/cancelorder': {orderId: number}
    'authorize': undefined
    'user/syncrequest': undefined
    'replay/checkreplaysession': undefined
    'replay/initializeclock': undefined
    'replay/changespeed': undefined
    'md/getchart': undefined
    'md/subscribehistogram': undefined
    'md/subscribequote': undefined
    'md/subscribedom': undefined
    'md/unsubscribehistogram': undefined
    'md/unsubscribequote':undefined
    'md/unsubscribedom':undefined
    'md/cancelchart': undefined
}
export type EndpointResponse = {
    'account/list':AccountListResponse
    'order/list': OrderListResponse
    'order/item': OrderItemResponse
    'order/cancelorder': CancelOrderResponse
    'authorize': undefined
    'user/syncrequest': SyncRequestResponse
    'replay/checkreplaysession': CheckReplaySessionResponse
    'replay/initializeclock': SimpleResponse
    'replay/changespeed': SimpleResponse
    'md/getchart': GetChartResponse
    'md/subscribehistogram': SimpleResponse
    'md/subscribequote': SimpleResponse
    'md/subscribedom': SimpleResponse
    'simple': SimpleResponse
    'md/unsubscribehistogram': SimpleResponse
    'md/unsubscribequote':SimpleResponse
    'md/unsubscribedom':SimpleResponse
    'md/cancelchart':SimpleResponse
}

export type SubscribeRequestBody = {
    'replay/initializeclock': {startTimestamp: string, speed:number, initialBalance: number} 
    'user/syncrequest': {accounts: number[]}
    'md/subscribeQuote': { "symbol": string }
    'md/getChart':{ symbol: string 
                    chartDescription: ChartDescription
                    timeRange: {
                        // All fields in timeRange are optional, but at least any one is required
                        closestTimestamp?: string
                        closestTickId?: number
                        asFarAsTimestamp?: string
                        asMuchAsElements?: number
                    }}
    'md/subscribeHistogram': { "symbol": string }
    'md/subscribeDOM': { "symbol": string }
}

export type SubscribeEventResponse = {
    'replay/initializeclock': SimpleResponse
    'user/syncrequest': SyncRequestResponse
    'md/subscribeQuote': QuoteEvent
    'md/getChart': SimpleResponse
    'md/subscribeHistogram': SimpleResponse
    'md/subscribeDOM': SimpleResponse
}

export type SubscribeMap = {
    'replay/initializeclock':'replay/initializeclock' 
    'user/syncrequest':'user/syncrequest' 
    'md/subscribeQuote':'md/subscribeQuote' 
    'md/getChart':'md/getChart' 
    'md/subscribeHistogram':'md/subscribeHistogram' 
    'md/subscribeDOM':'md/subscribeDOM' 
}

export function isErrorResponse<T extends EndpointURLs>(
    item: ResponseMsg<T> | ErrorResponse,
): item is ErrorResponse

export function isErrorResponse<T extends keyof SubscribeEventResponse>(
    item: ResponseMsg<'simple'> | ErrorResponse | ServerEvent<T>,
): item is ErrorResponse {
    return (item as ErrorResponse).s !== 200
}

export function isServerEvent<T extends keyof SubscribeEventResponse>(
    item: ResponseMsg<'simple'> | ServerEvent<T> | ErrorResponse,
): item is ServerEvent<T> {
    return 'e' in item
}

export function isResponseMsg<T extends EndpointURLs>(
    item: ResponseMsg<T> | ErrorResponse,
): item is ResponseMsg<T> {
    return item.s === 200
}

export type ReplayPeriod = {
    start: string
    stop: string
}

export type Dictionary = {
    [k: string]: any
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
    START_TIMESTAMP_ADJUSTED = 'StartTimestampAdjusted',
}
export type CancelOrderResponse = CommandResponse

export type CommandResponse = {
    failureReason?: string
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
    //complete later
}


export type SimpleResponse = {
    ok: boolean
    errorText?: string
}

export type GetChartResponse = {
    subscriptionId:number,
    realtimeId:number
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
    CUSTOMER='Customer',
    GIVEUP='Giveup',
    HOUSE='HOUSE',
    OMNIBUS='Omnibus',
    WASH='Wash',
}

export enum MarginAccountype {
    HEDGER='Hedger',
    SPECULATOR='Speculator'
}

export enum LegalStatus {
    CORPORATION='Corporation',
    GP='GP',
    INDIVIDUAL='Individual',
    JOINT='Joint',
    LLC='LLC',
    LLP='LLP',
    LP='LP',
    PTR='PTR',
    TRUST='Trust'
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
    SELL = 'Sell',
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
    WORKING = 'Working',
}

export type OrderItemResponse = Order
export type OrderListResponse = Order[]
export type OrderItemsResponse = Order[]
export type OrderDependentsResponse = Order[]
export type OrderLDependentsResponse = Order[]

export type SyncRequestResponse = {
    users: any[]
    accounts?: any[]
    accountRiskStatus?: any[]
    marginRiskStatuses?: any[]
    userAccountAutoLiqs?: any[]
    cashBalances?: any[]
    currencies?: any[]
    positions?: any[]
    fillPairs?: any[]
    orders?: any[]
    contracts?: any[]
    contractMaturities?: any[]
    products?: any[]
    exchanges?: any[]
    spreadDefinitions?: any[]
    commands?: any[]
    commandReports?: any[]
    executionReports?: any[]
    orderVersions?: any[]
    fills?: any[]
    orderStrategies?: any[]
    orderStrategyLinks?: any[]
    userProperties?: any[]
    userPlugins?: any[]
    conractGroups: any[]
    orderStrategyTypes?: any[]
}
// export type PropsEvent = {
//     entityType: EntityType
//     eventType: EventType
//     entity: PropsEntity
// }


export type SubscribeBody = {
   
}

export type SubscribeQuoteParams = {symbol: string , onSubscription:(item: any) => void}
export type SubscribeDOMParams = {}
export type SubscribeHistogramParams = {symbol: string | number, onSubscription:(item: any) => void}
export type SubscribeChartParams = { 
    symbol: string | number
    chartDescription: ChartDescription
    timeRange: {
        // All fields in timeRange are optional, but at least any one is required
        closestTimestamp?: string
        closestTickId?: number
        asFarAsTimestamp?: string
        asMuchAsElements?: number
    }, 
    onSubscription:(item: any) => void}

export interface Socket {
    connect(url:string):Promise<void>,
    disconnect():void
    isConnected():boolean,
}

export type RequestParams<T extends EndpointURLs> = {
    url: T,
    body?: EndpointRequestBody[T],
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
    synchronize(params: TradovateSocketSynchronizeParams):Promise<()=> void>
}

export type MarketDataSocketSubscribeParams<T extends SubscribeURLs> = {
    url: T
    body: SubscribeRequestBody[T]
    onSubscription: (item: ServerEvent<T>) => void
  }

export interface MdSocket extends Socket {
    //subscribe<T extends SubscribeURLs>(params: MarketDataSocketSubscribeParams<T>): Promise<() => Promise<void>>
    subscribeQuote(symbol: string , onSubscription:(item: any) => void):Promise<()=>void>
    subscribeDOM(symbol: string , onSubscription:(item: any) => void):Promise<()=>void>
    subscribeHistogram(symbol: string , onSubscription:(item: any) => void):Promise<()=>void>
    subscribeChart(symbol: string, chartDescription:ChartDescription, timeRange: TimeRange, onSubscription:(item: any) => void):Promise<()=>void>
   
}
export enum URLs {
    DEMO_URL= 'https://demo.tradovateapi.com/v1',
    LIVE_URL= 'https://live.tradovateapi.com/v1',
    MD_URL= 'wss://md.tradovateapi.com/v1/websocket',
    WS_DEMO_URL= 'wss://demo.tradovateapi.com/v1/websocket',
    WS_LIVE_URL= 'wss://live.tradovateapi.com/v1/websocket',
    REPLAY_URL= 'wss://replay.tradovateapi.com/v1/websocket',
}

export type TimeRange = {
        // All fields in timeRange are optional, but at least any one is required
        closestTimestamp?: string
        closestTickId?: number
        asFarAsTimestamp?: string
        asMuchAsElements?: number
    
}
