import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'

async function subscribe(event, context) {
    console.log(event)
}

export const handler = middy(subscribe)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())