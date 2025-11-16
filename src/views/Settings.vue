<template>
  <div>
    <h2>Settings</h2>

    <div class="card p-3">
      <label for="currency">Default Currency</label>
      <select id="currency" class="form-select mb-3" v-model="settings.currency">
        <option value="PHP">PHP (₱)</option>
        <option value="USD">USD ($)</option>
      </select>

      <label>Show Cents</label>
      <select class="form-select mb-3" v-model="settings.showCents">
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>

      <strong>Preview:</strong>
      <div>{{ preview }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";

// Settings object
const settings = reactive({
  currency: "PHP",
  showCents: true
});

// Computed preview
const preview = computed(() =>
  `${getCurrencySymbol(settings.currency)} — cents: ${settings.showCents ? "Yes" : "No"}`
);

// Watch for changes to save to localStorage
watch(
  settings,
  (val) => localStorage.setItem("settings", JSON.stringify(val)),
  { deep: true }
);

// Load saved settings
const saved = localStorage.getItem("settings");
if (saved) Object.assign(settings, JSON.parse(saved));

// Helper function
function getCurrencySymbol(curr) {
  return curr === "PHP" ? "₱" : "$";
}

</script>
