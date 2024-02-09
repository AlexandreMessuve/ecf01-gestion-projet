import { createApp } from 'vue';
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import App from './App.vue';
import router from './router';
import './style.css';
import 'vue-toast-notification/dist/theme-sugar.css';
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ToastPlugin, {
    position: 'bottom'
});
app.mount('#app');

