
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
  // Store values in variables
  const selectCurrenciesDiv  =  document.getElementById('selectCurrencies');
  const loading = document.getElementById('loading');
  const selectCurrencies = document.getElementById('currencies');
  const submitButton = document.getElementById('submit');
  const input = document.getElementById('user-value');
  const resultsDiv = document.getElementById('results');

  // Listen for changes in dropdown to update data
  selectCurrencies.addEventListener('change', onSelect)
  // loading icon hidden by default
  loading.style.display  = 'none';
  //  hide  the  results  div
  resultsDiv.style.display  = 'none';

  function ajaxCall({ type, baseUrl, ajaxCallback  }) {
    const http = new XMLHttpRequest();
    const url = `${baseUrl}`;
    http.open(type, url, true);
    http.send()
    http.onload = ajaxCallback
  }

  input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"

            initializeData();

      }
  });

  function onSelect(e) {
    // Get currency and rate from split value in dropdown
    const [currency, rate]= e.target.value.split('-');
    //  on select Currency
    /// calculate the rate  by multiplying the input.value  by rate
    const finalResult = input.value * rate;
    //  add  the a new div

    // Create currenct card
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

  // Grab latest rates
  function initializeData() {
    selectCurrenciesDiv.style.display = 'none';
    loading.style.display = 'block';
    return ajaxCall({
      type: 'GET',
      baseUrl: "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,USD,CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW",
      // queryString:  `Base=USD`,
      ajaxCallback: ajaxCallback
    });
    const name = Object.keys(rates);
  }

  // Parse data and console log it to double check accuracy
  function ajaxCallback(res) {
    const result = JSON.parse(res.currentTarget.response);
    console.log(result);
    selectCurrenciesDiv.style.display = 'block';
    //  show  the results div
    selectCurrencies.innerHTML = makeOptions(result.rates);
    loading.style.display = 'none';
  }

  // make options for dropdown currencies
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
    const url = `${baseUrl}`;
    http.onreadystatechange = function() {
        if (http.Status === 400) {
            alert(http.responseText);
        }
    };
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

  // Send Data to get parsed
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

   /// calculate the rate  by multiplying the input.value by rate
   const finalResult = input.value * rate;
   //  add  the a new div

   // Create custom currency card
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
