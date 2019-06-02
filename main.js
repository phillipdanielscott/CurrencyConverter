
/**************************************************************************************

    Objectives:
    1. Retrieve current rate of currency.
    2. Store current rate of currency.
    3. Create way to display rate of currency.
    4. Have a way for User to input current rate.
    5. From Users input do math to see what users rates would be with currencies.
    6. Display currencies with ability to delete.

**************************************************************************************/

window.onload = function() {
  const inputValue =  document.getElementById('inputValue');
  const selectCurrenciesDiv  =  document.getElementById('selectCurrencies');
  const loading = document.getElementById('loading');
  const selectCurrencies = document.getElementById('currencies');
  const submitButton = document.getElementById('submit');
  const input = document.getElementById('user-value');
  const resultsDiv = document.getElementById('results');
  // create varible  for  card  contents from result  div

  selectCurrencies.addEventListener('change', onSelect)
  input.addEventListener('keyup', onInput);
  submitButton.addEventListener('click', buttonClick);

  loading.style.display  = 'none';
  //  resultsDiv.style.display  = 'none';
  //  hide  the  results  div

  function ajaxCall({ type, baseUrl, queryString, ajaxCallback  }) {
    const http = new XMLHttpRequest();
    // const query = Object.values(queryString)
    const url = `${baseUrl}?queryString`;
    http.open(type, url, true);
    http.send()
    http.onload = ajaxCallback
  }

  function onInput(e) {
    inputValue.innerHTML = e.target.value;
  }

  function onSelect(e) {
    const [currency, rate]= e.target.value.split('-');
    //  on select Currency
    /// calculate the rate  by multipleyingthe input.value  by rate
    const finalResult = input.value * rate;
    //  add  the a new div
    resultsDiv.innerHTML += `<div class="card w-100">${currency} sample card ${rate} result: ${finalResult}</div>`;

  }

  function buttonClick() {

    selectCurrenciesDiv.style.display = 'none';
    //  hide the  resultDIv
    loading.style.display = 'block';
    return ajaxCall({
      type: 'GET',
      baseUrl: "https://api.exchangeratesapi.io/latest",
      queryString:  `BASE=USD`,
      ajaxCallback: ajaxCallback
    })
  }

  function ajaxCallback(res) {
    const result = JSON.parse(res.currentTarget.response);
    selectCurrenciesDiv.style.display = 'block';
    //  show  the results div
    selectCurrencies.innerHTML = makeOptions(result.rates);
    loading.style.display = 'none';
  }

  function makeOptions(rates) {
    return  Object.keys(rates).map(
      rate => `<option value="${rate}-${rates[rate]}">${rate}</option>`
    ).join('')
  }

}
