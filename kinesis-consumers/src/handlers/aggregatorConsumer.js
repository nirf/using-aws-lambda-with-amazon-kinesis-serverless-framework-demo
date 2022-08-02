import middy from '@middy/core'
import eventNormalizer from '@middy/event-normalizer'
import _ from 'lodash'

// Your user managed function is invoked both for aggregation and for processing the final results of that aggregation.
function aggregatorConsumer(event, context) {
    if (event['isFinalInvokeForWindow']) {
        processFinalResult(event)
    } else if (event['isWindowTerminatedEarly']) {
        // Your state can be a maximum of 1 MB per shard. If it exceeds that size, Lambda terminates the window early.
        console.warn('Window terminated early')
        processFinalResult(event)
    } else {
        let state = aggregate(event)
        // If the response does not contain a state property, Lambda considers this a failed invocation.
        return {
            state, batchItemFailures: []
        }
    }
}

export const handler = middy(aggregatorConsumer)
    // Kinesis Stream: Base64 decode and JSON parse for each Records[i].kinesis.data
    .use(eventNormalizer())

function processFinalResult(event) {
    console.log('Processing final result')
    const averageAMZN = event.state.AMZN.sumOfAllPrices / event.state.AMZN.countOfRecords
    const averageGOOG = event.state.GOOG.sumOfAllPrices / event.state.GOOG.countOfRecords
    console.log('Average Prices', {averageAMZN, averageGOOG})
}

function aggregate(event) {
    let state = _.isEmpty(event.state) ? initState(event) : event.state
    event.Records.forEach(record => {
        if (!_.isNumber(record.kinesis.data.price)) {
            throw new Error(`Received a stock price value which is not a number. price: ${record.kinesis.data.price}`)
        }
        // In each window, you can perform calculations, such as a sum or average, at the partition key level within a shard.
        state[record.kinesis.partitionKey].sumOfAllPrices += record.kinesis.data.price
        state[record.kinesis.partitionKey].countOfRecords++
    })

    return state
}

function initState(event) {
    console.log('Initializing state, this is the first batch for the current window', event.window)
    return {
        AMZN: {
            sumOfAllPrices: 0, countOfRecords: 0
        },
        GOOG: {
            sumOfAllPrices: 0, countOfRecords: 0
        }
    }
}