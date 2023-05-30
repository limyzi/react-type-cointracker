
const BASE_URL = `https://api.coingecko.com/api/v3`

export function fetchCoins(){
  return fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
  .then(response => response.json());
}

export function fetchCoinInfo(coinId:string){
  return fetch(`${BASE_URL}/coins/${coinId}?localization=false&tickers=false`)
  .then(response => response.json());
}

export function fetchCoinHistory(coinId:string){
  return fetch(`${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=1`)
  .then(response => response.json());
}