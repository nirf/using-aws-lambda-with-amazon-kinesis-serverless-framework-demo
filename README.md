# aws-kinesis-to-lambda-demo
**Using AWS Lambda with Amazon Kinesis**
## Video Tutorial
[![AWS Kinesis to Lambda Tutorial in Nodejs using Serverless framework](assets/images/thumbnail.png)](https://youtu.be/t6h32ccBxdM)

## Architecture
![Architecture](assets/images/Scaling%20based%20on%20Amazon%20SQS%20-%20Diagram.jpg)

## producer
bla bla
## consumer
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
sls logs -f producer -t
```
### Send HTTP POST request to the producer lambda
```
curl -d '{"name":"Nir","age":37}'  \
https://m45td8j8jj.execute-api.eu-west-1.amazonaws.com/dev/producer
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


