# Real time US Stock Quote API

This is a API service to provide the US Stock quote, host on Cloudflare Worker platform.  
Data source from [Financial Modeling Prep](https://financialmodelingprep.com/). Register your free API Key [here](https://financialmodelingprep.com/register).

### To use directly
https://stock.normankong.workers.dev/  
https://stock.normankong.workers.dev/TSLA  (Up to 5 A-Z|0-9 Char)

### To Build 
```
npm i --include=dev
npm run format
npm run pack
```

### Deployment
```
npm run dev
npm run publish
```

### Setup Key Value Binding in Cloudflare
API Key is stored in the Cloudflare KV (Key-value) via the namespace binding
```
wrangler kv:namespace create "NAMESPACE"
wrangler kv:namespace create "NAMESPACE" --preview
wrangler kv:key put --binding=NAMESPACE "API_KEY" "XXXXXXXXXXX"
```
Important Note : For development environment, the API_KEY value need to stored manually via Cloudflare website.

### Sample Response
```json
[
    {
        "symbol": "TSLA",
        "name": "Tesla, Inc.",
        "price": 614.8001,
        "changesPercentage": 1.64,
        "change": 9.9301,
        "dayLow": 601.34,
        "dayHigh": 619.28,
        "yearHigh": 900.4,
        "yearLow": 187.43,
        "marketCap": 592255385600,
        "priceAvg50": 619.0354,
        "priceAvg200": 693.81995,
        "volume": 13089677,
        "avgVolume": 30617825,
        "exchange": "NASDAQ",
        "open": 601.888,
        "previousClose": 604.87,
        "eps": 0.998,
        "pe": 616.03217,
        "earningsAnnouncement": "2021-04-26T20:00:00.000+0000",
        "sharesOutstanding": 963330009,
        "timestamp": 1623948367,
        "timeString": "2021-06-18T00:46:07+08:00"
    }
]
```

For installation of Cloudflare worker and Wrangler, it can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

For information related to KV in Cloudflare, visit [here](https://developers.cloudflare.com/workers/runtime-apis/kv).