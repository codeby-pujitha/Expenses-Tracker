let expenses = [];

// Load saved expenses from localStorage
window.onload = function () {
  const savedExpenses = localStorage.getItem("expenses");
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    renderExpenses();
  }
};

function addExpense() {
  const name = document.getElementById('expenseName').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const date = document.getElementById('expenseDate').value;

  if (!name || isNaN(amount) || amount <= 0 || !date) {
    alert("Please enter a valid name, amount, and date.");
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

  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDate').value = '';

  renderExpenses();
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  const container = document.getElementById('expensesContainer');
  container.innerHTML = "";

  expenses.forEach(exp => {
    const formattedDate = new Date(exp.date).toLocaleDateString('en-IN');

    const card = document.createElement('div');
    card.className = "expense-card";

    card.innerHTML = `
      <h3>${exp.name}</h3>
      <p>${exp.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      <p><small>🗓️ ${formattedDate}</small></p>
      <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
    `;

    container.appendChild(card);
  });

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById('totalExpense').textContent =
    `Total: ${total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`;
}
