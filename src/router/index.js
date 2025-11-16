import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Expenses from "../views/Expenses.vue";
import Settings from "../views/Settings.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Expenses },
    { path: "/about", component: Landing },
    { path: "/settings", component: Settings }
  ]
});
