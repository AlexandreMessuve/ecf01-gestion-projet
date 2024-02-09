import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConnectionView from '../views/ConnectionView.vue';
import RegisterView from '../views/RegisterView.vue';
import * as URL from '../constants/urls/urlFrontEnd.js';
import ProjectView from "../views/ProjectView.vue";
import { useAuthStore } from '../stores/authStore.js';
import AddTaskView from "../views/AddTaskView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: URL.URL_HOME,
            name: 'home',
            component: HomeView

        },
        {
            path: URL.URL_PROJECT,
            name: 'project',
            component: ProjectView
        },
        {
          path: URL.URL_ADD_TASK,
          name: 'add-task',
          component: AddTaskView
        },
        {
            path: '/:pathMatch(.*)',
            redirect  : URL.URL_HOME
        },
        {
            path:URL.URL_LOGIN,
            component: ConnectionView,
        },
        {
            path:URL.URL_REGISTER,
            component: RegisterView,
        },

    ]
})

router.beforeEach((to, from) => {
    if(to.path.startsWith('/home' || '/project')){

        if(!useAuthStore().isAuthenticated){
            return '/login'
        }else{
            return true;
        }
    }else{
        return true;
    }
})
export default router
