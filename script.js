let expenses = [];

// Load from localStorage
window.onload = function () {
  const savedExpenses = localStorage.getItem("expenses");
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    renderExpenses();
  }

  const dark = localStorage.getItem("darkMode");
  if (dark === "true") {
    document.body.classList.add("dark");
    document.getElementById("themeToggle").checked = true;
  }

  document.getElementById("themeToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  });
};

function addExpense() {
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const date = document.getElementById('expenseDate').value;
  const category = document.getElementById('expenseCategory').value;

  if (isNaN(amount) || amount <= 0 || !date || !category) {
    alert("Please enter valid amount, date, and category.");
    return;
  }

  const expense = {
    id: Date.now(),
    amount,
    date,
    category
  };

  expenses.push(expense);
  saveExpenses();

  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDate').value = '';
  document.getElementById('expenseCategory').value = '';

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
      <p>₹${exp.amount.toLocaleString('en-IN')}</p>
      <p>📅 ${formattedDate}</p>
      <p>🏷️ ${exp.category}</p>
      <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
    `;

    container.appendChild(card);
  });

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById('totalExpense').textContent =
    `Total: ₹${total.toLocaleString('en-IN')}`;

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthlyTotal = expenses
    .filter(e => new Date(e.date).getMonth() === thisMonth && new Date(e.date).getFullYear() === thisYear)
    .reduce((sum, e) => sum + e.amount, 0);

  document.getElementById('monthlyExpense').textContent =
    `This Month: ₹${monthlyTotal.toLocaleString('en-IN')}`;
}
