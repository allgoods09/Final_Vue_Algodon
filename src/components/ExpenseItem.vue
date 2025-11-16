<template>
  <tr>
    <td>{{ expense.name }}</td>
    <td>{{ currencySymbol }}{{ Number(expense.amount).toFixed(2) }}</td>
    <td>{{ expense.category }}</td>
    <td>{{ expense.date }}</td>
    <td>
      <button class="btn btn-sm btn-outline-primary me-1" @click="$emit('edit-expense', expense)">Edit</button>
      <button class="btn btn-sm btn-outline-danger" @click="del">Delete</button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ expense: Object });
const emit = defineEmits(["delete-expense"]);

// Load user-selected currency
const settings = JSON.parse(localStorage.getItem("settings")) || { currency: "PHP" };
const currencySymbol = computed(() => (settings.currency === "PHP" ? "₱" : "$"));

function del() {
  if (confirm("Delete this expense?")) emit("delete-expense", props.expense.id);
}
</script>
