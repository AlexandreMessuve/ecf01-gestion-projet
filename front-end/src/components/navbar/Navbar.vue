<script setup>
import {ref} from "vue";
import {RouterLink} from "vue-router";
import {useToast} from "vue-toast-notification";
import * as URL from '../../constants/urls/urlFrontEnd.js';
import {useAuthStore} from "../../stores/authStore.js";
import router from '../../router';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import {useProjectStore} from "../../stores/projectStore.js";
const authStore = useAuthStore();
const projectsStore = useProjectStore();
const $toast = useToast();
const isShowModal = ref(false);
const logout = () => {
  isShowModal.value = !isShowModal.value;
  authStore.logout();
  projectsStore.clearProjects();
  $toast.success(
      'Logout success !!'
  );
  router.push('/login');
}

</script>

<template>
  <template v-if="authStore.isAuthenticated">
    <TransitionRoot as="template" :show="isShowModal">
      <Dialog as="div" class="relative z-10" @close="isShowModal = !isShowModal">
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
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Logout</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Do you really want to logout ? </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="logout">Yes</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="isShowModal = !isShowModal" ref="cancelButtonRef">No</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  <div class="px-4 mx-auto max-w-7xl sm:px-6">
    <div class="relative pt-6 pb-10 sm:pb-16">
      <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
        <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div class="flex items-center justify-between w-full md:w-auto">
            <RouterLink :to="{name: 'home'}"><span class="sr-only">Project Gestion</span>
              <img class="w-auto h-8 sm:h-10" src="https://www.svgrepo.com/show/448244/pack.svg" loading="lazy" width="202" height="40">
            </RouterLink>
            <div class="flex items-center -mr-2 md:hidden">
              <button class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"  type="button" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="hidden md:flex md:space-x-10 list-none">
          <li>
            <RouterLink :to="{name: 'home'}" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
               target="">Home</RouterLink>
          </li>
        </div>
        <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
          <template v-if="authStore.isAuthenticated">
            <div class="inline-flex rounded-full shadow">
              <div @click="isShowModal = !isShowModal"
                          class="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                Logout
              </div>
            </div>
          </template>
          <template v-else>
            <div class="inline-flex rounded-full shadow">
              <RouterLink :to="URL.URL_LOGIN"
                          class="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                Login
              </RouterLink>
            </div>
            <div class="inline-flex rounded-full shadow">
              <RouterLink :to="URL.URL_REGISTER"
                          class="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                Register
              </RouterLink>
            </div>
          </template>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>

</style>