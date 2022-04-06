import {Kinesis} from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'
// locking the api version
const kinesis = new Kinesis({apiVersion: '2013-12-03'})

async function producer(event, context) {
    if (!event.body) {
        return {
            statusCode: 400, body: JSON.stringify({message: 'Bad request - No body was found'})
        }
    }

    let statusCode = 200
    let message = 'Message published successfully'
    try {
        const putRecordResponse = await kinesis.putRecord({
            StreamName: process.env.STREAM_NAME,
            PartitionKey: uuidv4(),
            Data: event.body
        }).promise()
        console.log(putRecordResponse)
    } catch (e) {
        console.error(e)
        message = e
        statusCode = 500
    }

    return {
        statusCode, body: JSON.stringify({message})
    }
}

export const handler = producer