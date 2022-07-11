import AWS from 'aws-sdk'

const kinesis = new AWS.Kinesis({apiVersion: '2013-12-03', region: 'eu-west-1'})

function publish(totalPublishTimeInSeconds, publishIntervalInMs) {
    kinesis.putRecords({
        StreamName: 'demoStream',
        Records: [
            {
                Data: JSON.stringify({symbol: 'AMZN', price: '3o55.70', date: new Date().toISOString()}),
                PartitionKey: 'AMZN'
            },
            {
                Data: JSON.stringify({symbol: 'GOOG', price: '2559.22$', date: new Date().toISOString()}),
                PartitionKey: 'GOOG'
            }
        ]
    }).promise().then(result => {
        console.log('Published Damaged Records successfully', result)
    })

    setInterval(async () => {
        const result = await kinesis.putRecords({
            StreamName: 'demoStream',
            Records: [
                {
                    Data: JSON.stringify({symbol: 'AMZN', price: 3055.70, date: new Date().toISOString()}),
                    PartitionKey: 'AMZN'
                },
                {
                    Data: JSON.stringify({symbol: 'GOOG', price: 2559.22, date: new Date().toISOString()}),
                    PartitionKey: 'GOOG'
                }
            ]
        }).promise()
        console.log('Published Records successfully', result)
    }, publishIntervalInMs)

    setTimeout(() => {
        console.log('Bye Bye')
        process.exit()
    }, totalPublishTimeInSeconds * 1000)
}

publish(120, 100)