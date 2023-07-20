export enum ORDER_TYPE {
    Limit =              'Limit',
    MIT =                'MIT',
    Market =             'Market',
    QTS =                'QTS',
    Stop =               'Stop',
    StopLimit =          'StopLimit',
    TrailingStop =       'TralingStop',
    TrailingStopLimit =  'TrailingStopLimit'
}

export enum ORDER_ACTION  {
    Buy=                'Buy',
    Sell=               'Sell'
}

export enum TIME_IN_FORCE {
    Day="Day",
    FOK= "FOK",
    GTC= "GTC",
    GTD= "GTD",
    IOC= "IOC"

}

export enum TdEvent  {
    DOM=            'dom',
    UserSync=       'usersyncinit',
    Quote=          'quote',
    Chart=          'chart',
    Props=          'props',
    Histogram=      'histogram',
    Clock=          'clock',
    ReplayReset=    'replay/resetEventHandlers',
    NextReplay=     'replay/nextReplayPeriod',
    ReplayDrawStats='replay/drawStats', //the draw effect
    ReplayComplete= 'replay/complete', //the event that says replay is done
    ProductFound=   'product/found',
}

export enum EntityType  {
    Position=           'position',
    CashBalance=        'cashBalance',
    Account=            'account',
    MarginSnapshot=     'marginSnapshot',
    Currency=           'currency',
    FillPair=           'fillPair',
    Order=              'order',
    Contract=           'contract',
    ContractMaturity=   'contractMaturity',
    Product=            'product',
    Exchange=           'exchange',
    Command=            'command',
    CommandReport=      'commandReport',
    ExecutionReport=    'executionReport',
    OrderVersion=       'orderVersion',
    Fill=               'fill', 
    OrderStrategy=      'orderStrategy',
    OrderStrategyLink=  'orderStrategyLink',
    ContractGroup=      'contractGroup'
}

export enum LongShortMode  {
    Long=       '[LongShortMode] Long',
    Short=      '[LongShortMode] Short', 
    Watch=      '[LongShortMode] Watch',
    Entry=      '[LongShortMode] Active Entry', // When a techincal set up occurs and looking for desired price to enter 
}

export enum BarType {
    MINUTE_BAR = "MinuteBar",
    TICK = "Tick",
    DOM = "DOM",
    DAILY= "DailyBar",
    CUSTOM ="Custom"
}
export enum ElementSizeUnit {
    UNDERLYING_UNITS ='UnderlyingUnits',
    VOLUME =         'Volume',
    RANGE =          'Range',
    RENKO=          'Renko',
    MOMENTUM_RANGE=  'MomentumRange',
    POINT_AND_FIGURE= 'PointAndFigure',
    OFA_Range = "OFARange"
}

export enum TimeRangeType {
    AS_MUCH_AS_ELEMENTS= 'asMuchAsElements',
    AS_FAR_AS_TIMESTAMP= 'asFarAsTimestamp',
    CLOSEST_TIMESTAMP= 'closestTimestamp',
    CLOSEST_TICK_ID=    'closestTickId',
}
export interface Contract {
    id:number //123456
    name:string //ESU3
}

export interface Bar  {
    timestamp: Date, 
    open: number, 
    high: number, 
    low: number, 
    close: number, 
    upVolume: number, 
    downVolume: number, 
    upTicks: number, 
    downTicks: number, 
    bidVolume: number, 
    offerVolume: number
}

export interface Tick {
    subscriptionId:number, 
    id: number, 
    contractTickSize: number, 
    timestamp: Date, 
    price: number, 
    volume: number, 
    bidPrice: number, 
    bidSize: number, 
    askPrice: number, 
    askSize: number
}

export interface Price {
    price:number, 
    size:number
}
export interface Quote {
    timestamp:string, //example: "2017-04-13T11:33:57.488Z"
    contractId:number // ID of the quote contract
    entries: {
        // Any of entries may absent if no data available for them.
        // Either price or size field (but not both) may absent in any entries.
        Bid: Price,
        TotalTradeVolume: Price,
        Offer: Price,
        LowPrice: Price,
        Trade: Price,
        OpenInterest: Price,
        OpeningPrice: Price,
        HighPrice: Price,
        SettlementPrice: Price,
        EmptyBook: Price
    }
}

export interface DOM {
    contractId:number, // ID of the DOM contract
    timestamp:string, //example: "2017-04-13T11:33:57.488Z"
    bids: Price[], // Actual depth of bids may varies depending on available data
    offers: Price[] // Actual depth of "offers" may varies depending on available data
      
}

export interface Histogram {
    contractId:number // ID of the histogram contract
    timestamp:string//example: 2017-04-13T11:33:57.412Z
    tradeDate: {
      year:number //YYYY
      month:number // MM
      day:number // DD
    }
    base: number //2338.75
    items: {[k:string]: number} // Example: "-14":5906.67 Actual number of histogram items may depend on data
    refresh:boolean
}

export interface ChartRequest {
    symbol: string| number//ESM7 | 123456,
    chartDescription: ChartDescription,
    timeRange: {
        // All fields in timeRange are optional, but at least any one is required
        closestTimestamp?:string,
        closestTickId?:number,
        asFarAsTimestamp?:string,
        asMuchAsElements?:number
    }
}

export interface ChartDescription {
    underlyingType:BarType, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
    elementSize:number,
    elementSizeUnit:ElementSizeUnit, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
    withHistogram: boolean
}

export interface TickPacket {
    id: number,       // Subscription ID, the same as historical/real-time subscription IDs from request response.
    eoh?:boolean        // End-of-history used in historical data loads indicates that historical ticks are loaded and further packets will contain real-time ticks
    s: string,        // Source of packet data.
    td: string,       // Trade date YYYYMMDD.
    bp: number,       // Base price of the packet (integer number of contract tick sizes). Tick prices are calculated as relative from this one.
    bt: number,       // Base timestamp of the packet. Tick timestamps are calculated as relative from this value.
    ts: number,       // Tick size of the contract for which the tick chart is requested.
    tks: TickRaw[]
}

export interface TickRaw {
    id: number       // Tick ID
    t: number,       // Tick relative timestamp. Actual tick timestamp is packet.bt + tick.t
    p: number,       // Tick relative price (in contract tick sizes). Actual tick price is packet.bp + tick.p
    s: number,       // Tick size (seems more proper name should be tick volume). Please don't confuse with contract tick size (packet.ts).
    b: number,       // Bid relative price (optional). Actual bid price is packet.bp + tick.b
    a: number,       // Ask relative price (optional).Actual ask price is packet.bp + tick.a
    bs: number,      // Bid size (optional).
    as: number,      // Ask size (optional).
}

export interface BarPacket {
    id:number, // id matches either historicalId or realtimeId values from response
    td:number, // Trade date as a number with value YYYYMMDD
    bars: Bar[]
}

export type Action = {event?:string, url?:string, payload?:any} 

export interface EventHandlerResults {
    state: {[k:string]:any},
    effects: Action[]
}

export enum Trend {
    DOWN = -1,
    NA = 0,
    UP =1
}

export interface AccessToken {
    token:string| undefined,
    expiration:string |undefined
}
export interface TradovateAccount {
    id:number,
    name:string,
    userId:number,
    accountType:string,
    active:boolean,
    clearingHouseId:number,
    riskCategoryId:number,
    autoLiqProfileId:number,
    marginAccountType:string,
    legalStatus:string,
    archived:boolean,
    timestamp:string
}