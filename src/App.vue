<template>
  <div id="app">
    <NavBar />

    <main class="container main-content d-flex flex-column justify-content-center">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
</script>
