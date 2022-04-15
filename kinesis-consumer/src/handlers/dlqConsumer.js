import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'

async function dlqConsumer(event, context) {
    console.log(event)
    console.log(event.Records[0])
}

export const handler = middy(dlqConsumer)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())