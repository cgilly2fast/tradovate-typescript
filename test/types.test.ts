import {
    isContractGroupEventMsg,
    isOrderStrategyLinkEventMsg,
    isOrderStrategyEventMsg,
    isFillEventMsg,
    isOrderVersionEventMsg,
    isExecutionReportEventMsg,
    isCommandReportEventMsg,
    isCommandEventMsg,
    isExchangeEventMsg,
    isProductEventMsg,
    isContractMaturityEventMsg,
    isContractEventMsg,
    isOrderEventMsg,
    isFillPairEventMsg,
    isCurrencyEventMsg,
    isMarginSnapshotEventMsg,
    isAccountEventMsg,
    isCashBalanceEventMsg,
    isPositionEventMsg,
    isClockEventMsg,
    isQuoteEventMsg,
    isHistogramEventMsg,
    isDomEventMsg,
    isChartEventMsg,
    isQuoteEvent,
    isHistogramEvent,
    isDomEvent,
    isChartEvent,
    isPropsEvent,
    isRequestAction,
    isSocketPenaltyResponse,
    isPenaltyResponse,
    isHTTPErrorResponse,
    isValidResponseMsg,
    isServerEvent,
    isResponseMsg,
    isGetChartResponse,
    isUserSyncResponseMsg,
    isQuoteSubscription,
    isDOMSubscription,
    isChartSubscription,
    isHistogramSubscription,
    isCommandReport,
    isOrder,
    isAccount,
    isOrderStrategyTypes,
    isContractGroup,
    isUserPlugin,
    isProperties,
    isUserProperties,
    isOrderStrategyLink,
    isFill,
    isOrderVersion,
    isExecutionReport,
    isTradovateURL
} from '../src'

describe('isContractGroupEventMsg', () => {
    it('should return true for a valid ContractGroupEventMsg', () => {
        const validObject: any = {entityType: 'ContractGroup'}
        expect(isContractGroupEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'OrderStrategyLink'}
        expect(isContractGroupEventMsg(invalidObject)).toBe(false)
    })
})

describe('isOrderStrategyLinkEventMsg', () => {
    it('should return true for a valid OrderStrategyLinkEventMsg', () => {
        const validObject: any = {entityType: 'OrderStrategyLink'}
        expect(isOrderStrategyLinkEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Fill'}
        expect(isOrderStrategyLinkEventMsg(invalidObject)).toBe(false)
    })
})

describe('isOrderStrategyEventMsg', () => {
    it('should return true for a valid OrderStrategyEventMsg', () => {
        const validObject: any = {entityType: 'OrderStrategy'}
        expect(isOrderStrategyEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'ExecutionReport'}
        expect(isOrderStrategyEventMsg(invalidObject)).toBe(false)
    })
})

describe('isFillEventMsg', () => {
    it('should return true for a valid FillEventMsg', () => {
        const validObject: any = {entityType: 'Fill'}
        expect(isFillEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'OrderVersion'}
        expect(isFillEventMsg(invalidObject)).toBe(false)
    })
})

describe('isOrderVersionEventMsg', () => {
    it('should return true for a valid OrderVersionEventMsg', () => {
        const validObject: any = {entityType: 'OrderVersion'}
        expect(isOrderVersionEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'ContractGroup'}
        expect(isOrderVersionEventMsg(invalidObject)).toBe(false)
    })
})

describe('isExecutionReportEventMsg', () => {
    it('should return true for a valid ExecutionReportEventMsg', () => {
        const validObject: any = {entityType: 'ExecutionReport'}
        expect(isExecutionReportEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'OrderStrategy'}
        expect(isExecutionReportEventMsg(invalidObject)).toBe(false)
    })
})

describe('isCommandReportEventMsg', () => {
    it('should return true for a valid CommandReportEventMsg', () => {
        const validObject: any = {entityType: 'CommandReport'}
        expect(isCommandReportEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Exchange'}
        expect(isCommandReportEventMsg(invalidObject)).toBe(false)
    })
})

describe('isCommandEventMsg', () => {
    it('should return true for a valid CommandEventMsg', () => {
        const validObject: any = {entityType: 'Command'}
        expect(isCommandEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Product'}
        expect(isCommandEventMsg(invalidObject)).toBe(false)
    })
})

describe('isExchangeEventMsg', () => {
    it('should return true for a valid ExchangeEventMsg', () => {
        const validObject: any = {entityType: 'Exchange'}
        expect(isExchangeEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'ContractMaturity'}
        expect(isExchangeEventMsg(invalidObject)).toBe(false)
    })
})

describe('isProductEventMsg', () => {
    it('should return true for a valid ProductEventMsg', () => {
        const validObject: any = {entityType: 'Product'}
        expect(isProductEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'CommandReport'}
        expect(isProductEventMsg(invalidObject)).toBe(false)
    })
})

describe('isContractMaturityEventMsg', () => {
    it('should return true for a valid ContractMaturityEventMsg', () => {
        const validObject: any = {entityType: 'ContractMaturity'}
        expect(isContractMaturityEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Exchange'}
        expect(isContractMaturityEventMsg(invalidObject)).toBe(false)
    })
})

describe('isContractEventMsg', () => {
    it('should return true for a valid ContractEventMsg', () => {
        const validObject: any = {entityType: 'Contract'}
        expect(isContractEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'FillPair'}
        expect(isContractEventMsg(invalidObject)).toBe(false)
    })
})

describe('isOrderEventMsg', () => {
    it('should return true for a valid OrderEventMsg', () => {
        const validObject: any = {entityType: 'Order'}
        expect(isOrderEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Account'}
        expect(isOrderEventMsg(invalidObject)).toBe(false)
    })
})

describe('isFillPairEventMsg', () => {
    it('should return true for a valid FillPairEventMsg', () => {
        const validObject: any = {entityType: 'FillPair'}
        expect(isFillPairEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Currency'}
        expect(isFillPairEventMsg(invalidObject)).toBe(false)
    })
})

describe('isCurrencyEventMsg', () => {
    it('should return true for a valid CurrencyEventMsg', () => {
        const validObject: any = {entityType: 'Currency'}
        expect(isCurrencyEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'CashBalance'}
        expect(isCurrencyEventMsg(invalidObject)).toBe(false)
    })
})

describe('isMarginSnapshotEventMsg', () => {
    it('should return true for a valid MarginSnapshotEventMsg', () => {
        const validObject: any = {entityType: 'MarginSnapshot'}
        expect(isMarginSnapshotEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Account'}
        expect(isMarginSnapshotEventMsg(invalidObject)).toBe(false)
    })
})

describe('isAccountEventMsg', () => {
    it('should return true for a valid AccountEventMsg', () => {
        const validObject: any = {entityType: 'Account'}
        expect(isAccountEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'CashBalance'}
        expect(isAccountEventMsg(invalidObject)).toBe(false)
    })
})

describe('isCashBalanceEventMsg', () => {
    it('should return true for a valid CashBalanceEventMsg', () => {
        const validObject: any = {entityType: 'CashBalance'}
        expect(isCashBalanceEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'FillPair'}
        expect(isCashBalanceEventMsg(invalidObject)).toBe(false)
    })
})

describe('isPositionEventMsg', () => {
    it('should return true for a valid PositionEventMsg', () => {
        const validObject: any = {entityType: 'Position'}
        expect(isPositionEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {entityType: 'Clock'}
        expect(isPositionEventMsg(invalidObject)).toBe(false)
    })
})

describe('isClockEventMsg', () => {
    it('should return true for a valid ClockEventMsg', () => {
        const validObject: any = {e: 'clock', d: 'string'}
        expect(isClockEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {e: 'quote', d: 'string'}
        expect(isClockEventMsg(invalidObject)).toBe(false)
    })
})

describe('isQuoteEventMsg', () => {
    it('should return true for a valid QuoteEventMsg', () => {
        const validObject: any = {quotes: []}
        expect(isQuoteEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {quotes: 'invalid'}
        expect(isQuoteEventMsg(invalidObject)).toBe(false)
    })
})

describe('isHistogramEventMsg', () => {
    it('should return true for a valid HistogramEventMsg', () => {
        const validObject: any = {histograms: []}
        expect(isHistogramEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {histograms: 'invalid'}
        expect(isHistogramEventMsg(invalidObject)).toBe(false)
    })
})

describe('isDomEventMsg', () => {
    it('should return true for a valid DomEventMsg', () => {
        const validObject: any = {doms: []}
        expect(isDomEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {doms: 'invalid'}
        expect(isDomEventMsg(invalidObject)).toBe(false)
    })
})

describe('isChartEventMsg', () => {
    it('should return true for a valid ChartEventMsg', () => {
        const validObject: any = {charts: []}
        expect(isChartEventMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {charts: 'invalid'}
        expect(isChartEventMsg(invalidObject)).toBe(false)
    })
})

describe('isQuoteEvent', () => {
    it('should return true for a valid QuoteEvent', () => {
        const validObject: any = {e: 'string', d: {quotes: []}}
        expect(isQuoteEvent(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {e: 'quote', d: 'invalid'}
        expect(isQuoteEvent(invalidObject)).toBe(false)
    })
})

describe('isHistogramEvent', () => {
    it('should return true for a valid HistogramEvent', () => {
        const validObject: any = {e: 'string', d: {histograms: []}}
        expect(isHistogramEvent(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {e: 'histogram', d: 'invalid'}
        expect(isHistogramEvent(invalidObject)).toBe(false)
    })
})

describe('isDomEvent', () => {
    it('should return true for a valid DomEvent', () => {
        const validObject: any = {e: 'string', d: {doms: []}}
        expect(isDomEvent(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {e: 'dom', d: 'invalid'}
        expect(isDomEvent(invalidObject)).toBe(false)
    })
})

describe('isChartEvent', () => {
    it('should return true for a valid ChartEvent', () => {
        const validObject: any = {e: 'string', d: {charts: []}}
        expect(isChartEvent(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {e: 'chart', d: 'invalid'}
        expect(isChartEvent(invalidObject)).toBe(false)
    })
})

describe('isPropsEvent', () => {
    it('should return true for a valid PropsEvent', () => {
        const validObject: any = {e: 'props', d: true}
        expect(isPropsEvent(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {e: 'properties', d: 'invalid'}
        expect(isPropsEvent(invalidObject)).toBe(false)
    })
})

describe('isRequestAction', () => {
    it('should return true for a valid RequestAction', () => {
        const validObject: any = {event: 'Request'}
        expect(isRequestAction(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {event: 'Invalid'}
        expect(isRequestAction(invalidObject)).toBe(false)
    })
})

describe('isSocketPenaltyResponse', () => {
    it('should return true for a valid SocketPenaltyResponse', () => {
        const validObject: any = {d: {'p-ticket': 'ticket'}}
        expect(isSocketPenaltyResponse(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {d: 'invalid'}
        expect(isSocketPenaltyResponse(invalidObject)).toBe(false)
    })
})

describe('isPenaltyResponse', () => {
    it('should return true for a valid PenaltyResponse', () => {
        const validObject: any = {'p-ticket': 'ticket'}
        expect(isPenaltyResponse(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {'p-captcha': 'captcha'}
        expect(isPenaltyResponse(invalidObject)).toBe(false)
    })
})

describe('isHTTPErrorResponse', () => {
    it('should return true for a valid HTTPErrorResponse', () => {
        const validObject: any = {s: 400}
        expect(isHTTPErrorResponse(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {s: 200}
        expect(isHTTPErrorResponse(invalidObject)).toBe(false)
    })
})

describe('isValidResponseMsg', () => {
    it('should return true for a valid ResponseMsg with status 200', () => {
        const validObject: any = {s: 200}
        expect(isValidResponseMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid ResponseMsg with status 400', () => {
        const invalidObject: any = {s: 400}
        expect(isValidResponseMsg(invalidObject)).toBe(false)
    })
})

describe('isServerEvent', () => {
    it('should return true for a valid ServerEvent', () => {
        const validObject: any = {e: 'event'}
        expect(isServerEvent(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {d: 'data'}
        expect(isServerEvent(invalidObject)).toBe(false)
    })
})

describe('isResponseMsg', () => {
    it('should return true for a valid ResponseMsg', () => {
        const validObject: any = {i: 'id', s: 200}
        expect(isResponseMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {i: 'id'}
        expect(isResponseMsg(invalidObject)).toBe(false)
    })
})

describe('isGetChartResponse', () => {
    it('should return true for a valid GetChartResponse', () => {
        const validObject: any = {subscriptionId: 'subId'}
        expect(isGetChartResponse(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isGetChartResponse(invalidObject)).toBe(false)
    })
})

describe('isUserSyncResponseMsg', () => {
    it('should return true for a valid UserSyncResponseMsg', () => {
        const validObject: any = {d: {users: []}}
        expect(isUserSyncResponseMsg(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {d: 'data'}
        expect(isUserSyncResponseMsg(invalidObject)).toBe(false)
    })
})

describe('isQuoteSubscription', () => {
    it('should return true for a valid QuoteSubscription function', () => {
        const validFunction = (callback: any) => {}
        expect(isQuoteSubscription(validFunction)).toBe(true)
    })

    it('should return false for an invalid function', () => {
        const invalidFunction = () => {}
        expect(isQuoteSubscription(invalidFunction)).toBe(false)
    })
})

describe('isDOMSubscription', () => {
    it('should return true for a valid DOMSubscription function', () => {
        const validFunction = (callback: any) => {}
        expect(isDOMSubscription(validFunction)).toBe(true)
    })

    it('should return false for an invalid function', () => {
        const invalidFunction = () => {}
        expect(isDOMSubscription(invalidFunction)).toBe(false)
    })
})

describe('isChartSubscription', () => {
    it('should return true for a valid ChartSubscription function', () => {
        const validFunction = (callback: any) => {}
        expect(isChartSubscription(validFunction)).toBe(true)
    })

    it('should return false for an invalid function', () => {
        const invalidFunction = () => {}
        expect(isChartSubscription(invalidFunction)).toBe(false)
    })
})

describe('isHistogramSubscription', () => {
    it('should return true for a valid HistogramSubscription function', () => {
        const validFunction = (callback: any) => {}
        expect(isHistogramSubscription(validFunction)).toBe(true)
    })

    it('should return false for an invalid function', () => {
        const invalidFunction = () => {}
        expect(isHistogramSubscription(invalidFunction)).toBe(false)
    })
})

describe('isCommandReport', () => {
    it('should return true for a valid CommandReport', () => {
        const validObject: any = {
            commandId: 'id',
            timestamp: 'timestamp',
            commandStatus: 'status'
        }
        expect(isCommandReport(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isCommandReport(invalidObject)).toBe(false)
    })
})

describe('isOrder', () => {
    it('should return true for a valid Order', () => {
        const validObject: any = {
            accountId: 'accountId',
            timestamp: 'timestamp',
            action: 'action',
            ordStatus: 'ordStatus',
            admin: 'admin'
        }
        expect(isOrder(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isOrder(invalidObject)).toBe(false)
    })
})

describe('isAccount', () => {
    it('should return true for a valid Account', () => {
        const validObject: any = {
            name: 'name',
            userId: 'userId',
            accountType: 'accountType',
            active: 'active',
            clearingHouseId: 'clearingHouseId',
            riskCategoryId: 'riskCategoryId',
            autoLiqProfileId: 'autoLiqProfileId',
            marginAccountType: 'marginAccountType',
            legalStatus: 'legalStatus',
            archived: 'archived',
            timestamp: 'timestamp'
        }
        expect(isAccount(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isAccount(invalidObject)).toBe(false)
    })
})

describe('isOrderStrategyTypes', () => {
    it('should return true for a valid OrderStrategyTypes', () => {
        const validObject: any = {name: 'name', enabled: 'enabled'}
        expect(isOrderStrategyTypes(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isOrderStrategyTypes(invalidObject)).toBe(false)
    })
})

describe('isContractGroup', () => {
    it('should return true for a valid ContractGroup', () => {
        const validObject: any = {name: 'name'}
        expect(isContractGroup(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isContractGroup(invalidObject)).toBe(false)
    })
})

describe('isUserPlugin', () => {
    it('should return true for a valid UserPlugin', () => {
        const validObject: any = {
            userId: 'userId',
            timestamp: 'timestamp',
            planPrice: 'planPrice',
            pluginName: 'pluginName',
            approval: 'approval',
            startDate: 'startDate',
            paidAmount: 'paidAmount',
            autoRenewal: 'autoRenewal',
            planCategories: 'planCategories'
        }
        expect(isUserPlugin(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isUserPlugin(invalidObject)).toBe(false)
    })
})

describe('isProperties', () => {
    it('should return true for a valid Properties', () => {
        const validObject: any = {
            name: 'name',
            propertyType: 'propertyType',
            defaultValue: 'defaultValue'
        }
        expect(isProperties(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isProperties(invalidObject)).toBe(false)
    })
})

describe('isUserProperties', () => {
    it('should return true for a valid UserProperties', () => {
        const validObject: any = {
            userId: 'userId',
            propertyId: 'propertyId',
            value: 'value'
        }
        expect(isUserProperties(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isUserProperties(invalidObject)).toBe(false)
    })
})

describe('isOrderStrategyLink', () => {
    it('should return true for a valid OrderStrategyLink', () => {
        const validObject: any = {
            orderStrategyId: 'orderStrategyId',
            orderId: 'orderId',
            label: 'label'
        }
        expect(isOrderStrategyLink(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isOrderStrategyLink(invalidObject)).toBe(false)
    })
})

describe('isFill', () => {
    it('should return true for a valid Fill', () => {
        const validObject: any = {
            orderId: 'orderId',
            contractId: 'contractId',
            timestamp: 'timestamp',
            tradeDate: 'tradeDate',
            action: 'action',
            qty: 'qty',
            price: 'price',
            active: 'active',
            finallyPaired: 'finallyPaired'
        }
        expect(isFill(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isFill(invalidObject)).toBe(false)
    })
})

describe('isOrderVersion', () => {
    it('should return true for a valid OrderVersion', () => {
        const validObject: any = {
            orderId: 'orderId',
            orderQty: 'orderQty',
            orderType: 'orderType',
            expireTime: 'expireTime'
        }
        expect(isOrderVersion(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isOrderVersion(invalidObject)).toBe(false)
    })
})

describe('isExecutionReport', () => {
    it('should return true for a valid ExecutionReport', () => {
        const validObject: any = {
            commandId: 'commandId',
            name: 'name',
            accountId: 'accountId',
            contractId: 'contractId',
            timestamp: 'timestamp',
            tradeDate: 'tradeDate',
            orderId: 'orderId',
            execType: 'execType',
            execRefId: 'execRefId',
            ordStatus: 'ordStatus',
            action: 'action',
            rejectReason: 'rejectReason',
            text: 'text',
            exchangeOrderId: 'exchangeOrderId'
        }
        expect(isExecutionReport(validObject)).toBe(true)
    })

    it('should return false for an invalid object', () => {
        const invalidObject: any = {otherField: 'value'}
        expect(isExecutionReport(invalidObject)).toBe(false)
    })
})

describe('isTradovateURL', () => {
    it('should return true for a valid Tradovate URL', () => {
        const validURLs = [
            'https://example.com',
            'https://demo.tradovate.com',
            'https://live.tradovate.com'
        ]
        validURLs.forEach(url => {
            expect(isTradovateURL(url)).toBe(true)
        })
    })

    it('should return false for an invalid URL', () => {
        const invalidURLs = ['http://example.com', 'ftp://example.com', 'invalid-url']
        invalidURLs.forEach(url => {
            expect(isTradovateURL(url)).toBe(false)
        })
    })
})
