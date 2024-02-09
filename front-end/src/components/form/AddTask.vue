<script setup>
import {reactive, ref} from "vue";
import {useAuthStore} from "../../stores/authStore.js";
import {addTask} from "../../api/backend/task.js";
import {useToast} from "vue-toast-notification";
import router from "../../router/index.js";

const $toast = useToast();
const authStore = useAuthStore();
const projectId = ref(router.currentRoute.value.params.projectId);
const form = reactive({
  title: '',
  description: '',
  priority: false,
  endDate: '',
});

const preventSubmit = async () => {
  try{
    const token = authStore.token;
    if(form.title.length > 2 && form.description.length > 4 && form.endDate){
      const values = {
        title: form.title,
        description: form.description,
        priority: form.priority,
        end_date: form.endDate,
        projectId: projectId.value
      }
      const resp = await addTask(values, token);
      const code = resp.status;
      if(code === 201){
        form.title = '';
        form.description = '';
        form.priority = false;
        form.endDate = '';
        $toast.success('Task add successful !');
        await router.push(`/project/${projectId.value}`);
      }
    }else{
      $toast.error('Error');
    }

  }catch (e) {
    console.log(e);
    $toast.error('Error');
  }
}
</script>

<template>
  <form @submit.prevent="preventSubmit" class="max-w-sm mx-auto flex flex-col items-center">
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900" for="title">Title</label>
      <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="title" id="title" v-model="form.title" type="text" required />

    </div>
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900" for="description">Description</label>
      <textarea class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="description" id="description" v-model="form.description" style="resize: none; overflow: auto" required></textarea>
    </div>
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900" for="end-date">End date</label>
      <input type="date" id="end-date" v-model="form.endDate">
    </div>
    <div>
      <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left" for="checkbox">Priority</label>
      <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " id="checkbox" type="checkbox" v-model="form.priority">
    </div>
    <button class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Ajouter</button>
  </form>
</template>

<style scoped>

</style>