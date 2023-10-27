import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import "./assets/global.css";
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faUsersGear } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


library.add(faUserSecret, faCaretDown, faUser, faToolbox, faToggleOn, faCalendar, faUsersGear, faUsers, faTicket, faGlobe, faStar, faRightFromBracket, faEnvelope, faInstagram, faFacebook, faTwitter, faLinkedin, faUserPen, faYoutube, faGithub )


let app = createSSRApp(App);

import Home from './views/home/App.vue'
import LoginPage from './views/login/App.vue'
import CrewDashboard from './views/dashboard/App.vue'
import EventModal from './views/dashboard/modals/EventModal.vue'
import OrganizerInfoModal from './views/dashboard/modals/EventOrganizerInfoModal.vue';
import EventDeletionModal from './views/dashboard/modals/EventDeletionModal.vue';
import UserEditModal from './views/dashboard/modals/UserEditModal.vue';
import FourOhFour from './views/error-pages/404.vue';

const routes = [
    { path: '/', component: Home, name: "home" },
    { path: '/login', component: LoginPage, name: "login" },
    { path: '/dash', component: CrewDashboard, name: "dashboard", children: [
        { path: 'event/:id', component: EventModal, name: "event", meta: { modal: true } },
        { path: 'event/:id/organizerinfo', component: OrganizerInfoModal, name: "eventorganizerinfo", meta: { modal: true }},
        { path: 'event/:id/delete', component: EventDeletionModal, name: "deleteEvent", meta: { modal: true }},
        { path: 'user/:id/edit', component: UserEditModal, name: "editUser", meta: { modal: true }},
    ] },
    { path: '/:pathMatch(.*)*', component: FourOhFour, name: "404"}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
        return { top: 0 }
    }
});

router.afterEach((to, from) => {
    const isToModal = to.meta.modal;
    const isFromModal = from.meta.modal;
    const toName = to.name;
    console.log(toName)
    if (isFromModal || isToModal) {
        if (to.name != "dashboard") {
            to.meta.transition = 'slide-fade'
        }
        to.meta.transition = 'none'
    }
    // set the page title
    if (toName != undefined) {
        document.title = "Martingrove Auditorium - " + toName.charAt(0).toUpperCase() + toName.slice(1);
    }
})

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon)


app.mount('#app');
