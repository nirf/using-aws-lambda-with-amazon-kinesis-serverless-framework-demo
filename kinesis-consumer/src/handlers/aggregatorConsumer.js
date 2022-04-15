import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'

async function aggregatorConsumer(event, context) {
    console.log(event)
    console.log(event.Records[0].kinesis.data)
}

export const handler = middy(aggregatorConsumer)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())