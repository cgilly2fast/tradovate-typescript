import {
    EndpointURLs,
    EventHandlerResults,
    RequestParams,
    StrategyState,
    TvSocket
} from '../types'

/**
 * Sends a request event to the Tradovate API using the provided socket connection.
 * This function sends the specified request payload to the API via the given socket.
 * It does not modify the state and does not trigger any actions other than the request itself.
 *
 * @typeparam T - The type of the StrategyState.
 * @typeparam U - The type of the EndpointURLs.
 * @param prevState - The previous state of the strategy.
 * @param payload - The request payload containing the event and parameters.
 * @param socket - The socket connection to the Tradovate API.
 * @returns An object containing the previous state and an empty list of actions.
 */
export function onRequestEvent<T extends StrategyState, U extends EndpointURLs>(
    prevState: T,
    payload: RequestParams<U>,
    socket: TvSocket
): EventHandlerResults<T> {
    socket.request(payload)

    return {state: prevState, actions: []}
}
