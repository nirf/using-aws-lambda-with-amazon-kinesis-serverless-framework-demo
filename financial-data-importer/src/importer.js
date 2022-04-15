const yahooFinance = require('yahoo-finance')
const fs = require('fs')

yahooFinance.historical({
    symbol: 'GOOG',
    from: '2010-01-01',
    to: '2022-01-01',
    period: 'd'
}, (err, quotes) => {
    if (err) {
        console.error(`Something went wrong: ${err}`)
    } else {
        const jsonContent = JSON.stringify(quotes)
        fs.writeFile("googleStockDailyQuotes.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.")
                return console.log(err)
            }

            console.log("JSON file has been saved.")
        })
    }
})

yahooFinance.historical({
    symbol: 'AMZN',
    from: '2010-01-01',
    to: '2022-01-01',
    period: 'd'
}, (err, quotes) => {
    if (err) {
        console.error(`Something went wrong: ${err}`)
    } else {
        const jsonContent = JSON.stringify(quotes)
        fs.writeFile("amazonStockDailyQuotes.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.")
                return console.log(err)
            }

            console.log("JSON file has been saved.")
        })
    }
})