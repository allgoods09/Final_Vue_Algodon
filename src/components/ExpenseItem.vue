<template>
  <tr>
    <td>{{ expense.name }}</td>
    <td>{{ currencySymbol }}{{ formattedAmount }}</td>
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

const settings = JSON.parse(localStorage.getItem("settings")) || { currency: "PHP", showCents: true };
const currencySymbol = computed(() => (settings.currency === "PHP" ? "₱" : "$"));

// Format amount based on showCents
const formattedAmount = computed(() => {
  return settings.showCents
    ? Number(props.expense.amount).toFixed(2)
    : Math.round(Number(props.expense.amount));
});

function del() {
  if (confirm("Delete this expense?")) emit("delete-expense", props.expense.id);
}
</script>
