let total = 0;
let expenses = [];

window.onload = function () {
  // Load from local storage
  const saved = localStorage.getItem("expenses");
  if (saved) {
    expenses = JSON.parse(saved);
    expenses.forEach(exp => renderExpense(exp));
    updateTotal();
  }
};

function addExpense() {
  const name = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const date = document.getElementById("expenseDate").value;

  if (!name || isNaN(amount) || !date) {
    alert("Please fill all fields.");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    date
  };

  expenses.push(expense);
  saveExpenses();
  renderExpense(expense);
  updateTotal();

  // Clear inputs
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDate").value = "";
}

function renderExpense(expense) {
  const container = document.getElementById("expensesContainer");

  const card = document.createElement("div");
  card.className = "expense-card";
  card.setAttribute("data-id", expense.id);
  card.innerHTML = `
    <h3>${expense.name}</h3>
    <p>Amount: ₹${expense.amount.toFixed(2)}</p>
    <p>Date: ${expense.date}</p>
    <button class="delete-btn" onclick="deleteExpense(${expense.id})">×</button>
  `;

  container.appendChild(card);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  document.querySelector(`[data-id="${id}"]`).remove();
  updateTotal();
}

function updateTotal() {
  total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("totalExpense").innerText = `Total: ₹${total.toFixed(2)}`;
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
