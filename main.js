
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
  console.log("Hello, Anatta!");
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
    //  hide  the  results  div
  resultsDiv.style.display  = 'none';

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
    /// calculate the rate  by multiplying the input.value  by rate
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

  /**************************************************


            When User makes custom Search



  *****************************************************/

  const customCurrencyInput = document.getElementById('custom-currency');
  const addCurrencyButton = document.getElementById('add-currency-button');

   // Show custom search when button is clicked
  addCurrencyButton.addEventListener('click', showCustomSearch );

  function showCustomSearch(){
    customCurrencyInput.classList.remove("hide");
    addCurrencyButton.classList.add("hide");
  }

  // Making custom ajax call upon users input
  function CustomAjax({ type, baseUrl, ajaxCallback  }) {
    const http = new XMLHttpRequest();
    // const query = Object.values(queryString)
    const url = `${baseUrl}`;
    http.open(type, url, true);
    http.send()
    http.onload = ajaxCallback;
  }

  // Check to see if user pressed enter on custom search
  customCurrencyInput.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            UserCustomData();
      }
  });


  function UserCustomData() {
      console.log("User custom data success");
    selectCurrenciesDiv.style.display = 'none';
    //  hide the  resultDIv
    loading.style.display = 'block';
    return ajaxCall({
      type: 'GET',
      baseUrl: "https://api.exchangeratesapi.io/latest?base=USD&symbols=" + customCurrencyInput.value,
      // queryString:  `Base=USD`,
      ajaxCallback: customFilter
    });
  }

  function customFilter(res) {
    const result = JSON.parse(res.currentTarget.response);
    console.log(Object.keys(result));

    selectCurrenciesDiv.style.display = 'block';
    //  show  the results div
    selectCurrencies.innerHTML = makeOptions(result.rates);
    loading.style.display = 'none';
    SuccessDataPull();
  }

  function SuccessDataPull(e) {
    const [currency, rate]= selectCurrencies.value.split('-');
   //  const [currency, rate]= e.target.value.split('-');
   //  //  on select Currency
   //  /// calculate the rate  by multiplying the input.value  by rate
   //  const finalResult = input.value * rate;
   //  //  add  the a new div
   //  // ${rate} result:
   //
   //  // const currencyCardClass = currency + "card";
   //  resultsDiv.innerHTML += `
   //  <div class="row no-gutters card" id="currency-card">
   //  <div class="col-md-11 card-info">
   //  <p class="currency">${currency}</p>
   //  <p class="final-rate">${finalResult}</p>
   //  <p>1 USD = ${currency} ${rate}</p>
   //  </div>
   //  <button id="delete-btn" onclick="deleteCard(this)">(-)</button>
   //  </div>`;
   //
   // resultsDiv.style.display  = 'unset';


   //  on select Currency
   /// calculate the rate  by multiplying the input.value  by rate
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



}
