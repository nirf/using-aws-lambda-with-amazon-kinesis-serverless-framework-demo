import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'
import _ from 'lodash'

function googleConsumer(event, context) {
    event.Records.forEach(record => {
        const action = getAction(record.kinesis.data)
        console.log(`Decided to ${action}`)
    })
}

export const handler = middy(googleConsumer)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())

function getAction(data) {
    if (!_.isNumber(data.price)) {
        throw new Error(`Received a stock price value which is not a number. price: ${data.price}`)
    }
    return Math.random() < 0.5 ? 'BUY' : 'SELL'
}