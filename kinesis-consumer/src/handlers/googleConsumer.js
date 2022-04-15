import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'

async function googleConsumer(event, context) {
    console.log(event)
    console.log(event.Records[0].kinesis.data)
}

export const handler = middy(googleConsumer)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())