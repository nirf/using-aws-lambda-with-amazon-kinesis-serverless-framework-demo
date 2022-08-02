import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'
import { getAction } from '../lib/getAction'

function amazonConsumer(event, context) {
    event.Records.forEach(record => {
        const action = getAction(record.kinesis.data)
        console.log(`Decided to ${action}`)
    })
}

export const handler = middy(amazonConsumer)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())