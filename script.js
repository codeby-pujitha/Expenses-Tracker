let expenses = [];

function addExpense() {
  const name = document.getElementById('expenseName').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const date = document.getElementById('expenseDate').value;

  if (!name || isNaN(amount) || amount <= 0 || !date) {
    alert("Please enter a valid name, amount, and date.");
    return;
  }

  // ✅ Push the date into the object
  const expense = {
    id: Date.now(),
    name: name,
    amount: amount,
    date: date  // <- storing the date
  };

  expenses.push(expense);

  // Reset fields
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDate').value = '';

  renderExpenses();
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  renderExpenses();
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
