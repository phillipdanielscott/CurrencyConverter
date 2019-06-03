
/**************************************************************************************

    Objectives:
    1. Retrieve current rate of currency.
    2. Store current rate of currency.
    3. Create way to display rate of currency.
    4. Have a way for User to input current rate.
    5. From Users input do math to see what users rates would be with currencies.
    6. Display currencies with ability to delete.

***************************************************************************************/

window.onload = function() {
  // const inputValue =  document.getElementById('inputValue');
  const selectCurrenciesDiv  =  document.getElementById('selectCurrencies');
  const loading = document.getElementById('loading');
  const selectCurrencies = document.getElementById('currencies');
  const submitButton = document.getElementById('submit');
  const input = document.getElementById('user-value');
  const resultsDiv = document.getElementById('results');
  // create varible  for  card  contents from result  div

  selectCurrencies.addEventListener('change', onSelect)
  // input.addEventListener('keyup', onInput);
  // submitButton.addEventListener('click', buttonClick);

  // deleteBtn.addEventListener('click', deleteMethod );
  loading.style.display  = 'none';
  resultsDiv.style.display  = 'none';
  //  hide  the  results  div

  function ajaxCall({ type, baseUrl, ajaxCallback  }) {
    const http = new XMLHttpRequest();
    // const query = Object.values(queryString)
    const url = `${baseUrl}`;
    http.open(type, url, true);
    http.send()
    http.onload = ajaxCallback
  }

  input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"

            buttonClick();

      }
  });

  function onSelect(e) {
    const [currency, rate]= e.target.value.split('-');
    //  on select Currency
    /// calculate the rate  by multipleyingthe input.value  by rate
    const finalResult = input.value * rate;
    //  add  the a new div
    // ${rate} result:

    // const currencyCardClass = currency + "card";
    resultsDiv.innerHTML += `
    <div class="row no-gutters card" id="currency-card">
    <div class="col-md-11 card-info">
    <p class="currency">${currency}</p>
    <p class="final-rate">${finalResult}</p>
    <p>1 USD = ${currency} ${rate}</p>
    </div>
    <button id="delete-btn" onclick="deleteCard(this)">(-)</button>
    </div>`;

   resultsDiv.style.display  = 'unset';
  }

  function buttonClick() {
    selectCurrenciesDiv.style.display = 'none';
    //  hide the  resultDIv
    loading.style.display = 'block';
    return ajaxCall({
      type: 'GET',
      baseUrl: "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,USD,CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW",
      // queryString:  `Base=USD`,
      ajaxCallback: ajaxCallback
    });
    const name = Object.keys(rates);
  }

  function ajaxCallback(res) {
    const result = JSON.parse(res.currentTarget.response);
    console.log(result);
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
