<script setup>
import {effect, onMounted, ref, watchEffect} from "vue";
import {useAuthStore} from "./stores/authStore.js";
import {RouterView } from 'vue-router';
import {getToken} from "./services/tokenService.js";
import Navbar from "./components/navbar/Navbar.vue";
import {getAllProjects} from "./api/backend/project.js";
import {useProjectStore} from "./stores/projectStore.js";
const projectsStore = useProjectStore();
const authStore = useAuthStore();

onMounted(() => {
  const token = getToken();
  if(token){
    authStore.login(token);
  }
});

effect(async () => {
  if(authStore.isAuthenticated){
    try {
      await projectsStore.setProjects(authStore.token);
    }catch (e) {
      this.$toast.error('Error');
    }
  }
})
</script>

<template>

  <header class="bg-indigo-200 h-28">
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
