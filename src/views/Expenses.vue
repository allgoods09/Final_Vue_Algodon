<template>
  <div>
    <h2 class="mb-3">Expenses</h2>

    <div class="row">
      <!-- Left: Form + Filter -->
      <div class="col-lg-4 mb-3">
        <ExpenseForm
        :editing-expense="editingExpense"
        @add-expense="addExpense"
        @update-expense="updateExpense"
        @cancel-edit="editingExpense = null"
        />

        <label class="mt-3">Filter by Category</label>
        <select class="form-select" v-model="filterCategory">
          <option value="All">All</option>
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>

        <button @click="loadSample" class="btn btn-outline-secondary mt-3 me-2">Fetch Sample</button>
        <button @click="clearAll" class="btn btn-danger mt-3">Clear All</button>
      </div>

      <!-- Right: Table -->
      <div class="col-lg-8">
        <div class="card p-3 shadow-sm">
          <table class="table table-striped" v-if="filteredExpenses.length">
            <thead>
                <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <ExpenseItem
                v-for="exp in filteredExpenses"
                :key="exp.id"
                :expense="exp"
                @edit-expense="startEdit"
                @delete-expense="deleteExpense"
                />
            </tbody>
          </table>

          <div v-else class="alert alert-info">No expenses found.</div>

          <div class="mt-3">
            <strong>Total: </strong>
            {{ currencySymbol }}{{ totalAmount.toFixed(2) }}
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ExpenseForm from "../components/ExpenseForm.vue";
import ExpenseItem from "../components/ExpenseItem.vue";
import useExpenses from "../composables/useExpenses.js";

const { expenses, add, remove, update, clear, importMany } = useExpenses();

const filterCategory = ref("All");
const editingExpense = ref(null);

const settings = JSON.parse(localStorage.getItem("settings")) || { currency: "PHP", showCents: true };
const currencySymbol = computed(() => (settings.currency === "PHP" ? "₱" : "$"));

function formatCurrency(amount) {
  const symbol = settings.currency === "PHP" ? "₱" : "$";
  return symbol + Number(amount).toFixed(2);
}

const categories = ["Bills", "Utilities", "Food", "Transport", "Entertainment", "Other"];

const filteredExpenses = computed(() =>
  filterCategory.value === "All"
    ? expenses.value
    : expenses.value.filter(e => e.category === filterCategory.value)
);

const totalAmount = computed(() =>
  expenses.value.reduce((sum, e) => sum + Number(e.amount), 0)
);

function addExpense(data) { add(data); }
function deleteExpense(id) { remove(id); }
function updateExpense(data) { update(data); editingExpense.value = null; }
function startEdit(expense) { editingExpense.value = { ...expense }; }

function clearAll() {
  if (confirm("Clear all?")) clear();
}

async function loadSample() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const arr = await res.json();
  importMany(
    arr.map(p => ({
      id: "api-" + p.id,
      name: p.title.slice(0, 15),
      amount: Math.floor(Math.random() * 200) + 1,
      category: categories[Math.floor(Math.random() * categories.length)],
      date: new Date().toISOString().substring(0, 10)
    }))
  );
}
</script>
