import _ from 'lodash'

export function getAction(data) {
    if (!_.isNumber(data.price)) {
        throw new Error(`Received a stock price value which is not a number. price: ${data.price}`)
    }
    return Math.random() < 0.5 ? 'BUY' : 'SELL'
}