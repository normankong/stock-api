
const URL_PARAM = "https://financialmodelingprep.com/api/v3/quote/%SYMBOL%?apikey=%API_KEY%";
const VALID_SYMBOL = /^[A-Z|0-9]{0,5}$/;
const moment = require("moment-timezone");

// Main Handler
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { pathname } = new URL(request.url)
  const uriList = pathname.split('/');

  // Get the first param as stock symbol
  let symbol = uriList[1];

  if (!VALID_SYMBOL.test(symbol)) {
    let error = { "error": `Invalid Symbol ${symbol}` };
    return new Response(JSON.stringify(error, null, ''), {
      headers: { 'content-type': 'text/json; charset=utf-8' },
    })
  }

  // Get API Key from KV Store
  const API_KEY = await NAMESPACE.get("API_KEY");

  // Replace Symobl
  let url = URL_PARAM.replace("%SYMBOL%", symbol).replace("%API_KEY%", API_KEY);

  // Fetch Stock Quote
  const response = await fetch(url, REQUEST_HEADER);

  // Gather Response
  const results = await gatherResponse(symbol, response);

  // Return to Caller
  return new Response(JSON.stringify(results, null, ''), {
    headers: { 'content-type': 'text/json; charset=utf-8' },
  })
}

async function gatherResponse(symbol, response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {

    // Encrich the timestamp
    let data = await response.json();
    if (data.length == 0) {
      return { "error": `Invalid Symbol ${symbol}` };
    }
    let timeStamp = new Date(data[0].timestamp * 1000);
    let timeString = moment(timeStamp).tz("Asia/Hong_Kong").format();

    data[0].timeString = timeString;
    return data;
  }
  else {
    return { "error": `Invalid Symbol ${symbol}` };
  }
}

const REQUEST_HEADER = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
}