// Your JavaScript goes here.
const DEFAULT_URL = axios.defaults.baseURL = 'http://api.fixer.io/latest';

const getExchangeRate = (from, to) => {
  return axios.get(`${DEFAULT_URL}?base=${from}`)
    .then((rate) => {
      return rate.data.rates[to];
    })
    .catch((error) => {
      return error;
    })
}

const convertCurrency = (from, to, amount) => {
  return getExchangeRate(from, to)
    .then((rate) => {
      const convertedAmount = (amount * rate).toFixed(2);
      return console.log(convertedAmount);
    })
}