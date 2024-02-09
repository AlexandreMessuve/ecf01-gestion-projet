<script setup>
import {ref, reactive, onMounted, watchEffect} from 'vue';
import {useAuthStore} from '../../stores/authStore.js';
import {useToast} from "vue-toast-notification";
import {useRouter} from 'vue-router';
import * as REGEX from '../../constants/regex.js';
import connectionValidation from '../../yup/connectionValidation.js';
import {authenticate} from "../../api/backend/account.js";

const $toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

// Définition des données réactives
const form = reactive({
  username: '',
  password: '',
});

const errors = reactive({
  username: '',
  password: ''
});

let resp = reactive({});
const respStatus = ref(false);
const alertClass = ref('');
const formClass = reactive({
  username: '',
  password: ''
})

// Utilisation de watchEffect pour observer les changements dans les données réactives
watchEffect(() => {
  const success = 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500';
  const danger = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500';

  // Validation de l'username
  if (form.username !== '') {
    if (REGEX.USERNAME.test(form.username)) {
      formClass.username = success;
      errors.username = '';
    } else {
      formClass.username = danger;
    }
  } else {
    formClass.username = '';
  }
  // Validation du mot de passe
  if (form.password !== '') {
    if (REGEX.PASSWORD.test(form.password)) {
      formClass.password = success;
      errors.password = '';
    } else {
      formClass.password = danger;
    }
  } else {
    formClass.password = '';
  }

  // Validation de la case à cocher
  if (form.checkbox) {
    formClass.checkbox = success
  } else {
    formClass.checkbox = '';
  }
})

// Fonction exécutée avant la soumission du formulaire
const beforeSubmit = async () => {
  errors.username = '';
  errors.password = '';

  try {
    // Validation des données du formulaire
    await connectionValidation.validate(form, {abortEarly: false});
    const values = {
      username: form.username,
      password: form.password
    }
    resp = await authenticate(values);

    if (resp.status === 200) {
      // Si l'authentification réussit, redirection vers la page d'accueil
      const token = resp.data.token;
      authStore.login(token);
      $toast.success('Connected !!!');
      await router.push('/');
      form.username = '';
      form.password = '';
    } else {
      // Si l'authentification échoue, affichage d'une alerte
      alertClass.value = 'alert-danger';
      form.password = '';
    }
    respStatus.value = true;
  } catch (error) {
    // En cas d'erreur de validation, affichage des messages d'erreur
    error.inner.forEach((e) => errors[e.path] = e.message);
    form.password = '';
  }
}

// Fonction exécutée après le montage du composant
onMounted(() => {
  // Si l'utilisateur est déjà connecté, redirection vers la page d'accueil
  if (authStore.isAuthenticated) {
    router.push('/');
  }
});
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <form @submit.prevent="beforeSubmit" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="username">Votre username</label>
        <input minlength="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :class="formClass.username" type="username"
               name="username" id="username" v-model="form.username" placeholder="Votre username">
        <p class="mt-2 text-left text-sm text-red-600 dark:text-red-500" v-if="errors.username">{{ errors.username }}</p>
      </div>
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="password">Votre mot de passe</label>
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :class="formClass.password" type="password" name="password" id="password" placeholder="********"
               v-model="form.password">
        <p class="mt-2 text-left text-sm text-red-600 dark:text-red-500" v-if="errors.password">{{ errors.password }}</p>

      </div>
      <div class="mb-5">
        <p class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Si vous n'avez pas de compte
          <router-link class="text-blue-500 hover:text-blue-800" to="/register">inscrivez-vous</router-link>
        </p>
      </div>
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connexion</button>
    </form>
  </div>
</template>