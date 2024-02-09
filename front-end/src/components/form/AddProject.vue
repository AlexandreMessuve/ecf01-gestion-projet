<script setup>
import {reactive} from "vue";
import {useAuthStore} from "../../stores/authStore.js";
import { addProject, getAllProjects } from "../../api/backend/project.js";
import {useToast} from "vue-toast-notification";
import {useProjectStore} from "../../stores/projectStore.js";

const $toast = useToast();
const authStore = useAuthStore();
const projectsStore = useProjectStore();
const form = reactive({
  name: '',
  description: ''
});

const preventSubmit = async () => {
  try{
    const token = authStore.token;
    if(form.name.length > 2 && form.description.length > 4){
      const values = {
        name: form.name,
        description: form.description
      }
      const resp = await addProject(values, token);
      const code = resp.status;
      if(code === 201){
        form.name = '';
        form.description = '';
        $toast.success('Project add successful !');
        await projectsStore.setProjects(token);
      }
    }else{
      $toast.error('name or description to short');
    }

  }catch (e) {
    console.log(e)
  }
}
</script>

<template>
<form @submit.prevent="preventSubmit" class="max-w-sm mx-auto flex flex-col items-center">
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900" for="name">Name</label>
    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="name" id="name" v-model="form.name" type="text" required />

  </div>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900" for="description">Description</label>
    <textarea class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="description" id="description" v-model="form.description" style="resize: none; overflow: auto" required></textarea>
  </div>
  <button class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Ajouter</button>
</form>
</template>

<style scoped>

</style>