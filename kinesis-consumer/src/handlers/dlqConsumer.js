import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'

function dlqConsumer(event, context) {
    console.log(event.Records[0].body)
}

export const handler = middy(dlqConsumer)
    // SQS: JSON parse for each Records[i].body
    .use(eventNormalizer())