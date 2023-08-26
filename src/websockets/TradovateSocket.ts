import { getCurrentAccount } from '../utils/storage'
import WebSocket, { MessageEvent, Data } from 'ws'
import {
  Dictionary,
  ServerEvent,
  isResponseMsg,
  isServerEvent,
  ResponseMsg,
  EndpointResponseMap,
  ErrorResponse,
  SimpleResponse,
  isErrorResponse,
  ServerEventMessageMap,
} from '../utils/types'
import { URLs } from '../config/tvCredentials'

export type TradovateSocketRequestParams<T extends keyof EndpointResponseMap> =
  {
    url: T | string
    query?: string
    body?: Dictionary
    onResponse?: (item: ResponseMsg<T>) => void
    onReject?: () => void
  }

export type TradovateSocketConnectParams = {
  url: string
  token: string
}

export type TradovateSocketSynchronizeParams = {
  onSubscription: (data: any) => void
}

export default class TradovateSocket {
  private counter: number
  private ws: WebSocket
  private listeningURL: string
  private curTime: Date
  private listeners: any[]

  constructor() {
    this.counter = 0
    this.ws = {} as WebSocket
    this.listeningURL = ''
    this.curTime = new Date()
    this.listeners = []
  }

  private prepareMessage(raw: Data) {
    const T = raw.slice(0, 1)
    let data = []
    if ((raw as string).length > 1) {
      data = JSON.parse((raw as string).slice(1))
    }
    return [T, data]
  }

  private checkHeartbeats() {
    const now = new Date() //time at call of onmessage

    if (now.getTime() - this.curTime.getTime() >= 2500) {
      this.ws.send('[]') //send heartbeat
      this.setCurTime(new Date()) //set the new base time
    }

    this.setCurTime(this.curTime)
  }

  private setCurTime(t: Date) {
    this.curTime = t === this.curTime ? this.curTime : t
  }

  private getCurTime() {
    return this.curTime
  }

  private increment() {
    return this.counter++
  }

  getListeningUrl() {
    return this.listeningURL
  }

  disconnect() {
    console.log(
      '[DevX Trader]: Closing ' + this.constructor.name + ' connection...',
    )
    this.ws.removeAllListeners('message')
    this.ws.close(1000, `Client initiated disconnect.`)
    this.ws = {} as WebSocket
    this.listeners = []
    console.log('[DevX Trader]: ' + this.constructor.name + ' removed.')
  }

  isConnected() {
    return this.ws && this.ws.readyState != 2 && this.ws.readyState != 3
  }

  addListener(listener: any) {
    this.listeners.push(listener)
    return () => this.listeners.splice(this.listeners.indexOf(listener), 1)
  }

  connect(url: string): Promise<void> {
    console.log(
      `[DevX Trader]: connecting ${this.constructor.name} to ${url}...`,
    )
    this.ws = new WebSocket(url)
    this.listeningURL = url
    let heartbeatInterval: NodeJS.Timer
    const token =
      this.constructor.name === 'TradovateSocket'
        ? process.env.ACCESS_TOKEN!
        : process.env.MD_ACCESS_TOKEN!
    const sendHeartbeat = () => {
      if (
        this.ws.readyState == 0 ||
        this.ws.readyState == 3 ||
        this.ws.readyState == 2 ||
        this.ws.readyState === undefined
      ) {
        clearInterval(heartbeatInterval)
        return
      }
      this.ws.send('[]')
    }

    return new Promise((res, rej) => {
      const onHeartbeat = async (msg: MessageEvent) => {
        const [T, data] = this.prepareMessage(msg.data)
        if (T === 'a' && data && data.length > 0) {
          this.listeners.forEach(listener =>
            data.forEach((d: any) => listener(d)),
          )
        } else if (T === 'h') {
          this.ws.send('[]')
        }
      }
      const onConnect = async (msg: MessageEvent) => {
        const [T, _] = this.prepareMessage(msg.data)
        if (T === 'o') {
          await this.request<'authorize'>({
            url: 'authorize',
            body: { token },
          })
          console.log('[DevX Trader]: ' + this.constructor.name + ' connected.')

          heartbeatInterval = setInterval(sendHeartbeat, 2500)
        }
      }
      this.ws.addEventListener('message', onHeartbeat)
      this.ws.addEventListener('message', onConnect)
    })
  }

  request<T extends keyof EndpointResponseMap>(
    params: TradovateSocketRequestParams<T>,
  ): Promise<ResponseMsg<T>> {
    const { url, query, body, onResponse, onReject } = params

    return new Promise((res, rej) => {

      if(!this.isConnected()) {rej('[DevX Trader]: Websocket not connect ')}
      
      const id = this.increment()
      try {
        const onEvent = (msg: MessageEvent) => {
          const [_, data] = this.prepareMessage(msg.data)

          data.forEach((item: ResponseMsg<T> | ErrorResponse) => {
            if (item.i === id) {
              this.ws.removeEventListener('message', onEvent)
              if (isResponseMsg(item)) {
                if (onResponse) onResponse(item)
                res(item)
              } else {
                if (onReject) onReject()
                rej(
                  `[DevX Trader]:\nFAILED:\n\toperation '${url}'\n\tquery ${
                    query ? JSON.stringify(query, null, 2) : ''
                  }\n\tbody ${
                    body ? JSON.stringify(body, null, 2) : ''
                  }\n\treason '${
                    JSON.stringify(item?.d, null, 2) || 'unknown'
                  }'\n\titem '${item ? JSON.stringify(item) : ''}'`,
                )
              }
            }
          })
        }
        this.ws.addEventListener('message', onEvent)
        this.ws.send(`${url}\n${id}\n${query || ''}\n${JSON.stringify(body)}`)
      } catch (err) {
        console.log(
          `[DevX Trader]: WS request params: ${JSON.stringify(
            params,
            null,
            2,
          )}`,
        )
        throw err
      }
    })
  }

  async synchronize(params: TradovateSocketSynchronizeParams) {
    const { onSubscription } = params
    const { WS_DEMO_URL, WS_LIVE_URL } = URLs

    let removeListener: () => void
    
    await this.request({  url: 'user/syncrequest',body: { accounts: [getCurrentAccount().id] } })
    return new Promise((res, rej) => {
      if (
        this.listeningURL !== WS_DEMO_URL &&
        this.listeningURL !== WS_LIVE_URL
      ) {
        rej(
          '[DevX Trader]: Cannot subscribe to User Data without using one of the Demo or Live URLs.',
        )
      }

      if (!this.isConnected()) {
        rej(
          '[DevX Trader]: no websocket connection available, please connect the websocket and try again.',
        )
      }

      removeListener = this.addListener((data: any) => {
        if (data?.d?.users || data?.e === 'props') {
          onSubscription(data.d)
        }
      })

      res(async () => {
        removeListener()
      })
    })
  }
}
