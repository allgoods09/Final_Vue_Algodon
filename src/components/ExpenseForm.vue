<template>
  <form @submit.prevent="submit" class="card p-3">
    <h5>{{ isEditing ? "Edit Expense" : "Add Expense" }}</h5>

    <input v-model="form.name" class="form-control mb-2" placeholder="Name" required />

    <input v-model.number="form.amount" type="number" class="form-control mb-2" placeholder="Amount" min="0" required />

    <select v-model="form.category" class="form-select mb-2" required>
      <option value="" disabled>Select Category</option>
      <option>Bills</option>
      <option>Utilities</option>
      <option>Food</option>
      <option>Transport</option>
      <option>Entertainment</option>
      <option>Other</option>
    </select>

    <input v-model="form.date" type="date" class="form-control mb-3" required />

    <button class="btn btn-success">{{ isEditing ? "Update" : "Add" }}</button>
    <button
      v-if="isEditing"
      type="button"
      class="btn btn-secondary ms-2"
      @click="cancelEdit"
    >
      Cancel
    </button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  editingExpense: Object
});

const emit = defineEmits(["add-expense", "update-expense", "cancel-edit"]);

const form = ref({
  id: null,
  name: "",
  amount: "",
  category: "",
  date: new Date().toISOString().substring(0, 10)
});

const isEditing = computed(() => !!props.editingExpense);

// Whenever editingExpense changes, populate the form
watch(
  () => props.editingExpense,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function submit() {
  if (isEditing.value) {
    emit("update-expense", { ...form.value });
  } else {
    emit("add-expense", { ...form.value, id: Date.now().toString() });
    resetForm();
  }
}

// This function properly cancels editing
function cancelEdit() {
  resetForm();
  emit("cancel-edit"); // notify parent to exit edit mode
}

function resetForm() {
  form.value = {
    id: null,
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString().substring(0, 10)
  };
}
</script>
