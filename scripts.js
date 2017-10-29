// Your JavaScript goes here.
// UTIL FUNCTIONS
// Random selection from array
const randomItemFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const itemFromArrayExceptCurrent = (array, current) => {
  return randomItemFromArray(array.filter((element) => {
    return element !== current;
  }));
} 
// SET DEFAULT VALUES
const currencies = ['EUR', 'USD', 'JPY'];
const URL_DEFAULT = axios.defaults.baseURL = 'http://api.fixer.io/latest';
const AMOUNT_FROM_DEFAULT = document.getElementById('amount_from').defaultValue = '';
const AMOUNT_TO_DEFAULT = document.getElementById('amount_to').defaultValue = '';
const CURRENCY_FROM_DEFAULT = document.getElementById('amount_to').defaultValue = '';

const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');

const optionsFrom = document.createDocumentFragment();
const optionsTo = document.createDocumentFragment();

const getAllCurrencies = (curr) => {
  curr.forEach((currency, index) => {
    const option_currency_from = document.createElement('option');
    const option_currency_to = document.createElement('option');
    option_currency_from.innerHTML = currency;
    option_currency_from.value = currency;
    option_currency_to.innerHTML = currency;
    option_currency_to.value = currency;
    optionsFrom.appendChild(option_currency_from);
    optionsTo.appendChild(option_currency_to);
  });
  selectFrom.appendChild(optionsFrom);
  selectTo.appendChild(optionsTo);
}
getAllCurrencies(currencies)

const getExchangeRate = (from, to) => {
  return axios.get(`${URL_DEFAULT}?base=${from}`)
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
    return convertedAmount;
  }).catch((error) => {
    console.log(error)
  })
}

// get select value from dropdown
const currencyFromOnChange = () => {
  const selectFromValue = document.getElementById('select-from').value;
  const from = document.querySelector('input[name="amount_from"]').value;
  const currenyTo = currencyToOnChange();
  convertCurrency(selectFromValue, currenyTo, from).then((res) => {
    return document.getElementById('amount_to').value = res
  });
  return  selectFromValue ? selectFromValue : 'EUR';
}
const currencyToOnChange = () => {
  const selectToValue = document.getElementById('select-to').value;
  return selectToValue ? selectToValue : 'EUR';
}

// On change 
const onChange = () => {
  const from = document.querySelector('input[name="amount_from"]').value;
  const to = document.querySelector('input[name="currency-to"]').value;
  const currencyFrom = currencyFromOnChange();
  const currencyTo = currencyToOnChange();
  if(currencyFrom === currencyTo || isNaN(to)){
    document.getElementById('select-to').value = itemFromArrayExceptCurrent(currencies, currencyFrom);
    document.getElementById('amount_to').value = '';
  }
  convertCurrency(currencyFrom, currencyTo, from).then((res) => {
    if(!isNaN(res)){
      return document.getElementById('amount_to').value = res;      
    };
    return document.getElementById('amount_to').value = '';
  });
}