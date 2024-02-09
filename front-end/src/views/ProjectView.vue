<script setup>
import router from "../router/index.js";
import {onMounted, ref} from "vue";
import {useAuthStore} from "../stores/authStore.js";
import {getProject} from "../api/backend/project.js";
import {deleteTask, getAllTask, updateTask} from "../api/backend/task.js";
import TaskCard from "../components/task/TaskCard.vue";
import {useToast} from "vue-toast-notification";


const authStore = useAuthStore();
const projectId = ref(router.currentRoute.value.params.id);
const project = ref('');
const tasks = ref([]);
const isLoad = ref(false);
const $toast = useToast();
const getTask = async() => {
  try {
    const token = authStore.token;
    const resp = await getProject(projectId.value, token);
    if(resp.status === 200){
      project.value = resp.data;
      try {
        const tasksResp = await getAllTask(projectId.value, token);
        if(tasksResp.status === 200){
          tasks.value = await tasksResp.data;
          isLoad.value = true;
        }else{
          console.log('error');
        }
      }catch (e) {
        console.log(e);
      }
    }else{
      console.log('error');
    }
  }catch (e){
    console.log(e);
  }
}
onMounted(async() => {
    await getTask();
});

const taskUpdate = async(idTask, values) => {
  try{
    const resp = await updateTask(idTask, values, authStore.token);
    if(resp.status === 200){
      await getTask();
      $toast.success('Task updated');
    }
  }catch (e){
    $toast.error('Update failed');
  }
};
const taskDelete = async(idTask) => {
  try{
    const resp = await deleteTask(idTask, authStore.token);
    if(resp.status === 200){
      await getTask();
      $toast.success('Task has been deleted successful')
    }
  }catch (e) {
    $toast.error('Delete failed');
  }
}
</script>

<template>
<template v-if="isLoad">
  <h1 class="text-5xl text-center my-1">Nom du projet :{{ project.name }}</h1>
  <p class="text-center text-2xl my-1">Description: {{ project.description}}</p>
  <div class="flex justify-center my-3">
    <RouterLink :to="{name: 'add-task', params:{projectId: projectId}}" class="text-white px-3 py-3 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Ajouter une tâche</RouterLink>
  </div>

  <template v-if="tasks.length > 0">
    <h2 class="text-center text-2xl">Vos tâche :</h2>
    <div class="flex flex-wrap justify-center">
      <template v-for="task in tasks">
        <TaskCard :updated-at="new Date(task.updatedAt)" :created-at="new Date(task.createdAt)" :end-date="new Date(task.end_date)" :priority="task.priority" :description-task="task.description" :title-task="task.title" :id-task="task.id" :id-project="task.ProjectId" @update-task="taskUpdate" @delete-task="taskDelete"/>
      </template>
    </div>
  </template>
  <template v-else>
    <h2 class="text-center text-3xl">Aucune tâche</h2>
  </template>
</template>
  <template v-else>
    <div class="flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-arrow-clockwise animate-spin" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
      </svg>
      <p class="text-5xl mx-6">Chargement ...</p>
    </div>
  </template>
</template>

<style scoped>

</style>