import { ref } from "vue";

const KEY = "expenses-data";

export default function useExpenses() {

  const categories = ["Bills", "Utilities", "Food", "Transport", "Entertainment", "Other"];
  const expenses = ref(JSON.parse(localStorage.getItem(KEY) || "[]"));

  const save = () => localStorage.setItem(KEY, JSON.stringify(expenses.value));

  function getRandomCategory() {
  const index = Math.floor(Math.random() * categories.length);
  return categories[index];
}

  function add(exp) { expenses.value.push(exp); save(); }
  function remove(id) { expenses.value = expenses.value.filter(e => e.id !== id); save(); }
  function update(exp) {
    const i = expenses.value.findIndex(e => e.id === exp.id);
    if (i !== -1) expenses.value[i] = exp;
    save();
  }
  function clear() { expenses.value = []; save(); }
  function importMany(arr) {
    const randomized = arr.map(exp => ({
      ...exp,
      category: getRandomCategory()
    }));
    expenses.value.push(...randomized);
    save();
  }

  function generateSampleExpenses(n = 5) {
  const samples = [];
  for (let i = 0; i < n; i++) {
    samples.push({
      id: Date.now() + i,
      name: `Sample ${i + 1}`,
      amount: (Math.random() * 100).toFixed(2), // store numeric value
      category: getRandomCategory(),
      date: new Date().toISOString().split("T")[0]
    });
  }
  importMany(samples);
}


  return { expenses, add, remove, update, clear, importMany };
}
