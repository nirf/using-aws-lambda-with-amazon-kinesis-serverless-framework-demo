# using-aws-lambda-with-amazon-kinesis-serverless-framework-demo
**Using AWS Lambda with Amazon Kinesis Serverless Framework Demo**
## Video Tutorial
[![AWS Kinesis to Lambda Tutorial in Nodejs using Serverless framework](assets/images/thumbnail.png)](https://youtu.be/t6h32ccBxdM)

## Architecture
![Architecture](assets/images/Scaling%20based%20on%20Amazon%20SQS%20-%20Diagram.jpg)

## consumers
### amazonConsumer
gets real time Amazon stock prices and decide if to buy or sell
### googleConsumer
gets real time Google stock prices and decide if to buy or sell
###aggregatorConsumer
get real time Google and Amazon stock prices and calculates the average prices in 60 seconds time window
### dlqConsumer
### list event source mappings
`aws lambda list-event-source-mappings --function-name kinesis-consumer`
## Usage
### Deployment
In order to deploy the demo, you need to run the following command:
```
$ serverless deploy
```
### View lambda logs
```
sls logs -f consumer -t
sls logs -f financialDataProducer -t
```
### Cleanup
```
$ serverless remove
```
## Links
This project is inspired by [Using AWS Lambda with Amazon Kinesis](https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html)
\
Serverless Framework [Serverless Framework](https://www.serverless.com/framework/docs/getting-started), [Serverless Kinesis Streams](https://www.serverless.com/framework/docs/providers/aws/events/streams)
\
Node.js middleware engine for AWS Lambda [middy](https://middy.js.org/), [middy/event-normalizer](https://www.npmjs.com/package/@middy/event-normalizer)


