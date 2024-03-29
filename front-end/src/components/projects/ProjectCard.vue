<script setup>
import {ExclamationTriangleIcon} from "@heroicons/vue/24/outline/index.js";
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {reactive, ref} from "vue";
import {deleteProject, updateProject} from "../../api/backend/project.js";
import {useAuthStore} from "../../stores/authStore.js";
import {useToast} from "vue-toast-notification";
import {useProjectStore} from "../../stores/projectStore.js";

const $toast = useToast();
const authStore = useAuthStore();
const projectsStore = useProjectStore();
const showModal = ref(false);
const showForm = ref(false);
const props = defineProps({
  idProject: {
    type: Number,
    required: true
  },
  nameProject: {
    type: String,
    required: true
  },
  descriptionProject: {
    type:String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
});
const form = reactive({
  name: props.nameProject,
  description: props.descriptionProject
});
const delProject = async() => {
  try {
    const token = authStore.token
    const resp = await deleteProject(props.idProject, token);
    if(resp.status === 200){
      $toast.success('Project delete successful');
      await projectsStore.setProjects(token);
      showModal.value = !showModal.value;
    }
  }catch (e) {
    $toast.error(
        'Error deleted project'
    )
  }
}

const projectUpdate = async() => {
  if(form.name.length > 2 && form.description.length > 4){
    try{
      const resp = await updateProject(props.idProject,form, authStore.token);
      if(resp.status === 200){
        $toast.success('Project updated');
        await projectsStore.setProjects(authStore.token);
        showForm.value = !showForm.value;
      }
    }catch (e) {
      $toast.error('Updated Failed');
    }
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative z-10" @close="showModal = !showModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Delete {{ props.nameProject}}</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Do you really want to delete this project:{{ props.nameProject }} ? </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="delProject">Yes</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="showModal = !showModal" ref="cancelButtonRef">No</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div class="max-w-lg min-w-[512px] max-h-64 min-h-64 p-6 mx-2 my-2 flex flex-col justify-between items-center border border-gray-200 rounded-lg shadow bg-secondary">
    <template v-if="showForm">
      <form @submit.prevent="projectUpdate" class="max-w-sm mx-auto flex flex-col items-center">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900" for="name">Name</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="name" id="name" v-model="form.name" type="text" required />

        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900" for="description">Description</label>
          <textarea class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="description" id="description" v-model="form.description" style="resize: none; overflow: auto" required></textarea>
        </div>
        <div class="flex justify-center">
        <button class="my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="button" @click="showForm = !showForm">Annuler</button>
        <button class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Valider</button>
        </div>
      </form>

    </template>
    <template v-else>

      <RouterLink :to="{name: 'project', params: {id: props.idProject}}" >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{props.nameProject}}</h5>
      </RouterLink>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{props.descriptionProject.length > 150 ? props.descriptionProject.substring(0,150) + '...' : props.descriptionProject}}</p>
      <div class="flex justify-center items-end">
        <RouterLink :to="{name: 'project', params: {id: props.idProject}}"  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
          Afficher les tâches
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </RouterLink>
        <button @click="showForm = !showForm"  class="px-3 py-2 mx-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
          Modifier
        </button>
        <button @click="showModal = !showModal"   class="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
          Supprimer
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>