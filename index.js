// Unsubscribe
function unsubscribeSocket(symbol, socket) {
    socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
}

import coins from '/coins.js'
const newsContainer = document.querySelector(".news-containers");
const submit = document.querySelector('#coin-submit');
const chart = document.querySelector("#chart");
const coinDesc = document.querySelector("#coin-desc"); // infoData['description']['en'] 
const marketCap = document.querySelector("#market-cap-data"); // infoData['market_data']['market_cap']['usd']
const volume = document.querySelector("#volume-24h-data") // infoData['market_data']['total_volume']['usd']
const marketCapRank = document.querySelector("#market-cap-rank-data"); // infoData['market_cap_rank']
const marketCapPctChange = document.querySelector("#market-cap-pct-change-24h-data") // infoData['market_data']['market_cap_change_percentage_24h']
const allTimeHigh = document.querySelector("#all-time-high-data") // infoData['market_data']['ath']['usd']
const allTimeLow = document.querySelector("#all-time-low-data") // infoData['market_data']['atl']['usd']
const twentyFourHigh = document.querySelector("#twenty-four-high-data") // infoData['market_data']['high_24h']['usd']
const twentyFourLow = document.querySelector("#twenty-four-low-data") // infoData['market_data']['low_24h']['usd']
const convertedVolume = document.querySelector("#converted-volume-data") // infoData['tickers'][1]['converted_volume']['btc']
const exchangeName = document.querySelector("#exchange-name") // infoData['tickers'][0]['market']['name']
const liquidityScore = document.querySelector("#liquidity-score") // infoData['liquidity_score'].toFixed(2)
const coinTicker = document.querySelector("#coin-ticker")
const coinDataName = document.querySelector("#coin-data-name")
let defaultSocket;
let searchSocket;
let intervalSocket;

let input;
let id;
let globalTicker;

// let ticker = document.querySelector(".ticker-symbol");
const buttons = document.getElementsByClassName("chart-button")

let load = false;
if (load === false) {
    input = 'btc'
    let res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=minute`)
    let data = await res.json()
    let cryptoPriceTimeData = data.prices.map(interval => {
        return {
            time: formatOneDayTime(interval[0]),
            mark: interval[1],
        }
    })
    renderNews('BTC')
    defaultSocket = new WebSocket('wss://ws.finnhub.io?token=cbgrlmqad3i8nvck2b9g');
    // Connection opened -> Subscribe
    defaultSocket.addEventListener('open', function(event) {
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
        defaultSocket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }))
    });

    // Listen for messages
    defaultSocket.addEventListener('message', function(event) {
        let data = JSON.parse(event.data)
        // console.log(data.data[0].p.toFixed(2));
        document.querySelector('#coin-price').textContent = commas(data.data[0].p.toFixed(2))
        const pctChg = ((data.data[0].p.toFixed(2) / cryptoPriceTimeData[0].mark.toFixed(2) - 1) * 100).toFixed(2)
        document.querySelector('#pct-chg').style.color = pctChg > 0 ? '#33ac75' : '#ea4848'
        document.querySelector('#pct-chg').textContent = pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`
    });

    renderData('bitcoin', 'btc', cryptoPriceTimeData)
    renderChart(cryptoPriceTimeData)
}

function formatOneDayTime(num) {
    //converts unix time to human readable date
    let res;
    num = num.toString()
    num = num.slice(0, -3);
    num = parseInt(num)
    let date = new Date(num * 1000)
    // handles timestamp format, 45 minutes will be 00:45 instead of 00:00:45
    res = date.toString().split(' ').slice(0, 4)
    // res = date.toString().split(' ')[4][0] === '0' && date.toString().split(' ')[4][1] === '0'
    //     ? date.toString().split(' ')[4].slice(3)
    //     : date.toString().split(' ')[4]
    return res
}
// make a function to format time correctly based off user input
submit.addEventListener("click", async (e) => {
    load ? unsubscribeSocket(`BINANCE:${globalTicker}USDT`, searchSocket) && unsubscribeSocket(`BINANCE:${globalTicker}USDT`, intervalSocket) : unsubscribeSocket('BINANCE:BTCUSDT', defaultSocket)
    globalTicker = document.querySelector("#coin-input").value.toUpperCase();
    // unsubscribeSocket(`BINANCE:${globalTicker}USDT`)
    for (let button of buttons) {
        button.classList.remove('chart-button-selected')
    }
    buttons[0].classList.add('chart-button-selected')
    load = true
    input = document.querySelector("#coin-input").value.toLowerCase();
    renderNews(input.toUpperCase())
    let id = coins[input.toLowerCase()]['id']
    let histRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=minute`)
    let histData = await histRes.json()
    let cryptoPriceTimeData = histData.prices.map(interval => {
        return {
            time: formatOneDayTime(interval[0]),
            mark: interval[1],
        }
    })
    searchSocket = new WebSocket('wss://ws.finnhub.io?token=cbgrlmqad3i8nvck2b9g');
    // Connection opened -> Subscribe
    searchSocket.addEventListener('open', function(event) {
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
        searchSocket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `BINANCE:${input.toUpperCase()}USDT` }))
    });

    // Listen for messages
    searchSocket.addEventListener('message', function(event) {
        let data = JSON.parse(event.data)
        // console.log(data.data[0].p.toFixed(2));
        document.querySelector('#coin-price').textContent = commas(data.data[0].p.toFixed(2))
        const pctChg = ((data.data[0].p.toFixed(2) / cryptoPriceTimeData[0].mark.toFixed(2) - 1) * 100).toFixed(2)
        document.querySelector('#pct-chg').style.color = pctChg > 0 ? '#33ac75' : '#ea4848'
        document.querySelector('#pct-chg').textContent = pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`
    });

    renderData(id, input, cryptoPriceTimeData)
})

async function renderData(id, ticker, cryptoPriceTimeData) {
    let infoRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
    let infoData = await infoRes.json()
    // console.log(infoData['tickers'])
    coinDesc.innerHTML = `<p>${infoData['description']['en']}</p>`
    marketCap.textContent = `$${abbrNum(infoData['market_data']['market_cap']['usd'], 2)}`
    volume.textContent = `$${abbrNum(infoData['market_data']['total_volume']['usd'], 2)}`
    marketCapRank.textContent = `#${infoData['market_cap_rank']}`
    marketCapPctChange.textContent = `${infoData['market_data']['market_cap_change_percentage_24h']}%`
    if (infoData['market_data']['market_cap_change_percentage_24h'] < 0) {
        marketCapPctChange.textContent = `${infoData['market_data']['market_cap_change_percentage_24h'].toFixed(2)}%`
        marketCapPctChange.style.color = '#ea4848'
    } else {
        marketCapPctChange.textContent = `+${infoData['market_data']['market_cap_change_percentage_24h'].toFixed(2)}%`
        marketCapPctChange.style.color = '#33ac75'
    }
    allTimeHigh.textContent = `$${commas(infoData['market_data']['ath']['usd'].toFixed(2))}`
    allTimeLow.textContent = `$${commas(infoData['market_data']['atl']['usd'].toFixed(2))}`
    twentyFourHigh.textContent = `$${commas(infoData['market_data']['high_24h']['usd'])}`
    twentyFourLow.textContent = `$${commas(infoData['market_data']['low_24h']['usd'])}`
    convertedVolume.textContent = `${infoData['categories'][0]}`
    liquidityScore.textContent = `${infoData['liquidity_score'].toFixed(2)} / 100`
    coinTicker.textContent = infoData['tickers'][0]['base']
    coinDataName.textContent = coins[ticker]['name']
    renderChart(cryptoPriceTimeData)
}

// Get the input field
let searchBar = document.getElementById("coin-input");

// Execute a function when the user presses a key on the keyboard
searchBar.addEventListener("keypress", async (event) => {
    load ? unsubscribeSocket(`BINANCE:${globalTicker}USDT`, searchSocket) && unsubscribeSocket(`BINANCE:${globalTicker}USDT`, intervalSocket) : unsubscribeSocket('BINANCE:BTCUSDT', defaultSocket)
    globalTicker = document.querySelector("#coin-input").value.toUpperCase();
    if (event.key === "Enter") {
        for (let button of buttons) {
            button.classList.remove('chart-button-selected')
        }
        buttons[0].classList.add('chart-button-selected')
        load = true
        input = document.querySelector("#coin-input").value;
        renderNews(input.toUpperCase())
        let id = coins[input.toLowerCase()]['id']
        let histRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=minute`)
        let histData = await histRes.json()
        let cryptoPriceTimeData = histData.prices.map(interval => {
            return {
                time: formatOneDayTime(interval[0]),
                mark: interval[1],
            }
        })
        searchSocket = new WebSocket('wss://ws.finnhub.io?token=cbgrlmqad3i8nvck2b9g');
        // Connection opened -> Subscribe
        searchSocket.addEventListener('open', function(event) {
            // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
            searchSocket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `BINANCE:${input.toUpperCase()}USDT` }))
        });

        // Listen for messages
        searchSocket.addEventListener('message', function(event) {
            let data = JSON.parse(event.data)
            // console.log(data.data[0].p.toFixed(2));
            document.querySelector('#coin-price').textContent = commas(data.data[0].p.toFixed(2))
            const pctChg = ((data.data[0].p.toFixed(2) / cryptoPriceTimeData[0].mark.toFixed(2) - 1) * 100).toFixed(2)
            document.querySelector('#pct-chg').style.color = pctChg > 0 ? '#33ac75' : '#ea4848'
            document.querySelector('#pct-chg').textContent = pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`
        });

        renderData(id, input.toLowerCase(), cryptoPriceTimeData)
    }
});


function renderChart(crypto) {
    const labels = crypto.map(interval => interval.time)
    const mark = crypto.map(interval => interval.mark)

    const chartData = {
        labels: labels,
        datasets: [{
            // label: name,
            backgroundColor: '#3773f5',
            borderColor: '#3773f5',
            data: mark,
        }]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            elements: {
                point: {
                    radius: .5
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false,
                },
                // y: {
                //     display: false,
                // },
            },
        }
    };
    chart.innerHTML = '<canvas id="myChart"></canvas>';
    // const last = mark.pop().toFixed(2)
    // const pctChg = ((mark.pop().toFixed(2) / mark[0].toFixed(2) - 1) * 100).toFixed(2)
    // document.querySelector('#pct-chg').style.color = pctChg > 0 ? '#33ac75' : '#ea4848'
    // document.querySelector('#pct-chg').textContent = pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`
    new Chart(document.querySelector('#myChart'), config)
    renderSentiemnt(input)
}

async function renderSentiemnt(input) {
    let res = await fetch(`https://cryptonews-api.com/api/v1/stat?&tickers=${input.toUpperCase()}&date=last7days&page=1&cache=false&token=qsbeffclbga5yutbf2g6hprfmmpq6ifx73ls3l9t`)
    let data = await res.json()
    document.querySelector('#sentiment-chart').innerHTML = `<canvas id="piechart"></canvas>`
    const sumArray = [
        data['total'][input.toUpperCase()]['Total Positive'],
        data['total'][input.toUpperCase()]['Total Negative'],
        data['total'][input.toUpperCase()]['Total Neutral']
    ]
    const labels = [
        'Positive',
        'Negative',
        'Neutral',
    ];

    const sentiment = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
                '#27ad75',
                '#f0616d',
                '#f7931a'
            ],
            borderColor: 'none',
            data: sumArray,
            hoverOffset: 4,
        }]
    };

    const config = {
        type: 'doughnut',
        data: sentiment,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            }
        }
    };
    const myChart = new Chart(document.getElementById('piechart'), config);
}

async function renderNews(ticker) {
    const res = await fetch(`https://cryptonews-api.com/api/v1?tickers=${ticker}&items=50&page=1&token=qsbeffclbga5yutbf2g6hprfmmpq6ifx73ls3l9t`)
    const news = await res.json()
    const newsCards = news['data'].map(card => formatCard(card))
    newsContainer.innerHTML = newsCards.slice(0, 4).join('')

}

function formatCard(card) {
    return `
    <a href="${card['news_url']}">
        <div class="news-card">
            <img class="news-card-img" src="${card['image_url']}">
            <div class="news-card-info">
                <p class="news-card-title">${card['title']}</p>
                <div class="news-card-footer">
                    <p class="news-card-source">${card['source_name']}</p>
                    <p class="news-card-date">${card['sentiment']}</p>
                </div>
            </div>
        </div>
    </a>
    `
}



let day = document.querySelector("#day");
let week = document.querySelector("#week");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
day.addEventListener("click", (e) => {
    for (let button of buttons) {
        button.classList.remove('chart-button-selected')
    }
    buttons[0].classList.add('chart-button-selected')
    chartDisplay('1', 'minute')

})
week.addEventListener("click", (e) => {
    for (let button of buttons) {
        button.classList.remove('chart-button-selected')
    }
    buttons[1].classList.add('chart-button-selected')
    chartDisplay('7', 'hour')
})
month.addEventListener("click", (e) => {
    for (let button of buttons) {
        button.classList.remove('chart-button-selected')
    }
    buttons[2].classList.add('chart-button-selected')
    chartDisplay('31', 'hour')

})
year.addEventListener("click", (e) => {
    for (let button of buttons) {
        button.classList.remove('chart-button-selected')
    }
    buttons[3].classList.add('chart-button-selected')
    chartDisplay('365', 'day')
})

async function chartDisplay(days, interval) {
    let id = coins[input.toLowerCase()]['id']
    let res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`)
    let data = await res.json()
    let cryptoPriceTimeData = data.prices.map(interval => {
        return {
            time: formatOneDayTime(interval[0]),
            mark: interval[1],
        }
    })
    intervalSocket = new WebSocket('wss://ws.finnhub.io?token=cbgrlmqad3i8nvck2b9g');
    intervalSocket.addEventListener('open', function(event) {
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
        intervalSocket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `BINANCE:${input.toUpperCase()}USDT` }))
    });

    // Listen for messages
    intervalSocket.addEventListener('message', function(event) {
        let data = JSON.parse(event.data)
        // console.log(data.data[0].p.toFixed(2));
        document.querySelector('#coin-price').textContent = commas(data.data[0].p.toFixed(2))
        const pctChg = ((data.data[0].p.toFixed(2) / cryptoPriceTimeData[0].mark.toFixed(2) - 1) * 100).toFixed(2)
        document.querySelector('#pct-chg').style.color = pctChg > 0 ? '#33ac75' : '#ea4848'
        document.querySelector('#pct-chg').textContent = pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`
    });

    renderChart(cryptoPriceTimeData, input)
}

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    let abbrev = ["K", "M", "B", "T"];

    // Go through the array backwards, so we do the largest first
    for (let i = abbrev.length - 1; i >= 0; i--) {

        // Convert array index to "1000", "1000000", etc
        let size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number * decPlaces / size) / decPlaces;

            // Handle special case where we round up to the next abbreviation
            if ((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number;
}
