<script setup>
import { useAuthStore } from '../stores/authStore.js';
import {useProjectStore} from "../stores/projectStore.js";
import ProjectCard from "../components/projects/ProjectCard.vue";
import AddProject from "../components/form/AddProject.vue";
import {ref} from "vue";

const authStore = useAuthStore();
const projectsStore = useProjectStore();

const showAddProject = ref(false);
</script>

<template>
  <main v-if="authStore.isAuthenticated">
    <div class="flex flex-col justify-center items-center my-3">
      <p>Ajout de projet</p>
      <template v-if="showAddProject">
        <AddProject />
      </template>
      <button class="w-20 h-6 mt-3" :class="showAddProject ? 'text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300' : 'text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'" @click="showAddProject = !showAddProject">{{ showAddProject ? 'Fermer' : 'Ouvrir' }}</button>
    </div>
    <template v-if="projectsStore.projects?.length > 0">
      <h1 class="text-2xl text-center">Vos projets :</h1>
      <div class="flex flex-wrap justify-center">
          <template v-for="project in projectsStore.projects">
            <ProjectCard class="mx-6 my-5" :updated-at="new Date(project.updatedAt)" :created-at="new Date(project.createdAt)" :description-project="project.description" :name-project="project.name" :id-project="project.id" />
          </template>
      </div>
    </template>
    <template v-else>
      <h1>Aucun projet</h1>
    </template>
  </main>
  <main v-else>
    <h1>Vous devez vous connecter !!!</h1>
  </main>
</template>

<style scoped>
</style>
