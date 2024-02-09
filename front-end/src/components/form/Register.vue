<script setup>
// Importation des fonctions nécessaires de Vue.js
import { ref, reactive, watchEffect, onMounted } from 'vue';

// Importation du magasin d'état pour l'authentification
import { useAuthStore } from '../../stores/authStore.js';

// Importation de la fonction useRouter de Vue Router pour la navigation
import { useRouter } from 'vue-router';

// Importation des expressions régulières pour la validation
import * as REGEX from '../../constants/regex.js';

// Importation du schéma de validation pour l'inscription
import registerValidation from '../../yup/registerValidation.js';
import {register} from "../../api/backend/account.js";
import {useToast} from "vue-toast-notification";

// Initialisation du routeur et du magasin d'état pour l'authentification
const router = useRouter();
const authStore = useAuthStore();

const $toast = useToast();
// Création d'un objet réactif pour le formulaire d'inscription
const form = reactive({
  username: '',
  password: '',
  confirmPass: '',
  firstname: '',
  lastname: ''
});

// Création d'un objet réactif pour les erreurs de validation du formulaire
const errors = reactive({
  username: '',
  password: '',
  confirmPass: ''
})

// Création d'un objet réactif pour les classes du formulaire
const classForm = reactive({
  username: '',
  password: '',
  confirmPass: '',
})

// Utilisation de watchEffect pour réagir aux changements de la propriété respStatus
watchEffect(() => {
  // Définition des classes pour les champs du formulaire en fonction du statut de la réponse
  const classDanger = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500';
  const classSuccess = 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500';

  if (form.username !== '') {
    if (REGEX.USERNAME.test(form.username)) {
      classForm.username = classSuccess;
      errors.username = '';
    } else {
      classForm.username = classDanger;
    }
  } else {
    classForm.username = '';
  }

  if (form.password !== '') {
    if (REGEX.PASSWORD.test(form.password)) {
      classForm.password = classSuccess;
      errors.password = '';
    } else {
      classForm.password = classDanger;
    }
  } else {
    classForm.password = '';
  }

  if (form.confirmPass !== '') {
    if (form.password === form.confirmPass) {
      classForm.confirmPass = classSuccess;
      errors.confirmPass = '';
    } else {
      classForm.confirmPass = classDanger;
    }
  } else {
    classForm.confirmPass = '';
  }


});

/**
 * Fonction exécutée avant la soumission du formulaire d'inscription.
 * Réinitialise les erreurs de validation.
 * Effectue la validation du formulaire.
 * Enregistre l'utilisateur si la validation réussit.
 * Gère les réponses de succès ou d'échec de l'enregistrement.
 * Gère les erreurs de validation.
 */
const beforeSubmit = async () => {
  errors.username = '';
  errors.password = '';
  errors.confirmPass = '';
  try {
    await registerValidation.validate(form, { abortEarly: false });

    const values = {
      username: form.username,
      password: form.password,
      firstname: form.firstname,
      lastname: form.lastname
    }
    const resp = await register(values);
    if (resp.status === 201) {
      $toast.success('Account create success');
      form.username = '';
      form.password = '';
      form.confirmPass = '';
      form.lastname = '';
      form.firstname = '';
      setTimeout(() => {
        router.push('/connection')
      }, 1000);
    } else {
      $toast.error('Error account create');
      form.password = '';
      form.confirmPass = '';
    }
  } catch (error) {
    if(error.length > 0){
      error.inner.forEach((e) => errors[e.path] = e.message);
    }else{
      $toast.error(error.response.data.message);
    }
    form.password = '';
    form.confirmPass = '';
  }
}

/**
 * Fonction exécutée lorsque le composant est monté.
 * Redirige l'utilisateur vers la page d'accueil si une session est déjà active.
 */
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/');
  }
});

</script>

<template>
  <div class="flex flex-column items-center mt-3">
    <form @submit.prevent="beforeSubmit" class="max-w-sm mx-auto">
      <div class="row mt-3">
        <div class="col">
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="username">Votre username*</label>
          <input minlength="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :class="classForm.username" type="username"
                 name="username" id="username" v-model="form.username" placeholder="mon super username">
          <p class="mt-2 text-left text-sm text-red-600 dark:text-red-500" v-if="errors.username">{{ errors.username }}</p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="password">Votre mot de passe*</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :class="classForm.password" type="password" name="password"
                 id="password" v-model="form.password">
          <p class="mt-2 text-left text-sm text-red-600 dark:text-red-500" v-if="errors.password">{{ errors.password }}</p>
        </div>
        <div class="col">
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="password-reapeat">Repeter votre mot de passe*</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :class="classForm.confirmPass" type="password"
                 name="password-repeat" id="password-repeat" v-model="form.confirmPass">
          <p class="mt-2 text-left text-sm text-red-600 dark:text-red-500" v-if="errors.confirmPass">{{ errors.confirmPass }}</p>
        </div>
        <span class="text-xs text-left">Votre mot de passe doit avoir au minimum 8 caractère dont une majuscule, une
                    minuscule et un numérique</span>
      </div>
      <div class="row mt-3">
        <div class="col">
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="username">Votre nom</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text"
                 name="lastname" id="lastname" v-model="form.lastname" placeholder="Dupont">
        </div>
        <div class="col">
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="username">Votre prénom</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text"
                 name="firstname" id="firstname" v-model="form.firstname" placeholder="Alex">
        </div>
      </div>
      <div class="flex justify-center">
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">S'inscrire</button>
      </div>
    </form>
  </div>
</template>