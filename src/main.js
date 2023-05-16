import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import "./assets/global.css";
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faCaretDown, faUser)


let app = createApp(App);

import Home from './views/home/App.vue'

const routes = [
    { path: '/', component: Home, name: "home" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon)


app.mount('#app');
