const balanceElement = document.getElementById("balance");
const moneyIncomeElement = document.getElementById("money-income");
const moneyExpenseElement = document.getElementById("money-expense");
const historyListElement = document.getElementById("list");
const inputTextElement = document.getElementById("text");
const inputAmountElement = document.getElementById("amount");
const addTransactionBtnEl = document.getElementById("add-transaction-btn");

let transactions = [];

// Check local storage
function checkLocalStorage() {
  let storedTransactions = JSON.parse(localStorage.getItem("transactions"));
  if (storedTransactions !== null) {
    transactions = storedTransactions;
  }
}

checkLocalStorage();
updateUI();

// Store New Transaction Object
function storeNewTransactionObject(text, value) {
  text = inputTextElement.value;
  value = +inputAmountElement.value;
  let newTransactionId;
  if (transactions.length === 0) {
    newTransactionId = 0;
  } else {
    newTransactionId = transactions[transactions.length - 1].id + 1;
  }
  const transaction = {
    id: newTransactionId,
    title: text,
    amount: value,
  };
  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Create New Transaction Element
function createNewTransactionElement(transaction) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const input = document.createElement("input");
  if (transaction.amount > 0) {
    li.classList.add("income");
    span.innerText = `+${transaction.amount}`;
  } else {
    li.classList.add("expense");
    span.innerText = transaction.amount;
  }
  li.innerText = transaction.title;
  button.classList.add("delete-btn");
  button.innerText = "X";
  input.type = "hidden";
  input.value = transaction.id;
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(input);

  historyListElement.appendChild(li);
}

// Show all transactions
function showAllTransactions() {
  historyListElement.innerHTML = ``;
  transactions.forEach((transaction) =>
    createNewTransactionElement(transaction)
  );
}

// Show Ialance
function showBalance() {
  let balance = 0;
  transactions.forEach((item) => {
    balance += item.amount;
  });
  balanceElement.innerText = `$${balance}`;
}

// Show Income
function showIncome() {
  let income = 0;
  transactions.forEach((item) => {
    if (item.amount > 0) {
      income += item.amount;
    }
  });
  moneyIncomeElement.innerText = `$${income}`;
}

// Show Expense
function showExpense() {
  let expense = 0;
  transactions.forEach((item) => {
    if (item.amount < 0) {
      expense += item.amount;
    }
  });
  moneyExpenseElement.innerText = `$${expense}`;
}

// Update UI
function updateUI() {
  showAllTransactions();
  showBalance();
  showIncome();
  showExpense();
}

addTransactionBtnEl.addEventListener("click", () => {
  storeNewTransactionObject();
  updateUI();
  inputTextElement.value = ``;
  inputAmountElement.value = ``;
});
