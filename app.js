const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

const fetchExpenses = async () => {
  const res = await fetch('/api/expenses');
  const data = await res.json();
  expenseList.innerHTML = '';
  data.forEach(expense => {
    const li = document.createElement('li');
    li.innerHTML = `${expense.amount} - ${expense.category} - ${expense.date.slice(0, 10)} 
    <button onclick="deleteExpense('${expense._id}')">Delete</button>`;
    expenseList.appendChild(li);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const expense = {
    amount: document.getElementById('amount').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value,
    date: document.getElementById('date').value,
  };
  await fetch('/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense)
  });
  form.reset();
  fetchExpenses();
});

const deleteExpense = async (id) => {
  await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
  fetchExpenses();
};

fetchExpenses();
