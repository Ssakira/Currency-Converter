const apiURL = "https://open.er-api.com/v6/latest/USD";
async function loadCurrencies() {
  const response = await fetch(apiURL);
  const data = await response.json();
  const currencies = Object.keys(data.rates);
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.innerText = currency;

    const option2 = option1.cloneNode(true);

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  // Set default selection
  fromCurrency.value = "USD";
  toCurrency.value = "NPR";
}

// Convert currency function
async function convertCurrency() {
  const amount = document.getElementById("amount").value; //reads amount from input field
  const fromCurrency = document.getElementById("fromCurrency").value; //reads selected currencies form dropdown
  const toCurrency = document.getElementById("toCurrency").value;
  const resultDiv = document.getElementById("result"); //grab result div where converted amount will be display

  if (amount === "" || amount <= 0) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
  );
  const data = await response.json();

  const rate = data.rates[toCurrency]; //rate is exchange rate from the selected "from" currency to the selected "to" currency
  const convertedAmount = (amount * rate).toFixed(2); //multiply users amount by rate

  resultDiv.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`; //diplay conversion result like 100 USD = 14017.00 NPR
}
window.onload = loadCurrencies;// Load currencies when page loads
