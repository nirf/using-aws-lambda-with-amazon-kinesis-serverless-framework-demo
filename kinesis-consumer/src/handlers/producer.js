async function producer(event, context) {
    console.log(event)
}

export const handler = producer