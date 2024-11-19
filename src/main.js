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
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


library.add(faUserSecret, faCaretDown, faUser, faToolbox, faToggleOn, faCalendar, faUsersGear, faUsers, faTicket, faGlobe, faStar, faRightFromBracket, faEnvelope, faInstagram, faFacebook, faTwitter, faLinkedin, faUserPen, faYoutube, faGithub, faUserPlus, faTriangleExclamation )


let app = createSSRApp(App);

import Home from './views/home/App.vue'
import LoginPage from './views/login/App.vue'
import CrewDashboard from './views/dashboard/App.vue'
import EventModal from './views/dashboard/modals/EventModal.vue'
import OrganizerInfoModal from './views/dashboard/modals/EventOrganizerInfoModal.vue';
import EventDeletionModal from './views/dashboard/modals/EventDeletionModal.vue';
import UserEditModal from './views/dashboard/modals/UserEditModal.vue';
import FourOhFour from './views/error-pages/404.vue';
import Talent from './views/talent/App.vue';
import ContactPage from './views/contact/App.vue';
import BookPage from './views/book/App.vue';
import AuditoriumPage from './views/auditorium/App.vue';
import ActModal from './views/dashboard/modals/ActModal.vue';
import ActOrganizerInfoModal from './views/dashboard/modals/ActOrganizerInfoModal.vue';
import ActDeletionModal from './views/dashboard/modals/ActDeletionModal.vue';
import NewUserCreationPage from './views/create-new-user/App.vue'
import SingleTalentView from './views/talent/SingleTalentView.vue';

const routes = [
    { path: '/', component: Home, name: "home" },
    { path: '/login', component: LoginPage, name: "login" },
    { path: '/dash', component: CrewDashboard, name: "dashboard", children: [
        { path: 'event/:id', component: EventModal, name: "dashboard - Event", meta: { modal: true } },
        { path: 'event/:id/organizerinfo', component: OrganizerInfoModal, name: "dashboard - Event Organizer Info", meta: { modal: true }},
        { path: 'event/:id/delete', component: EventDeletionModal, name: "dashboard - Delete Event", meta: { modal: true }},
        { path: 'user/:id/edit', component: UserEditModal, name: "dashboard - Edit User", meta: { modal: true }},
        { path: 'act/:id', component: ActModal, name: "dashboard - Act", meta: { modal: true }},
        { path: 'act/:id/organizerinfo', component: ActOrganizerInfoModal, name: "dashboard - Act Organizer Info", meta: { modal: true }},
        { path: 'act/:id/delete', component: ActDeletionModal, name: "dashboard - Delete Act", meta: { modal: true }},
    ] },
    { path: '/talent', component: Talent, name: "Talent Show"},
    { path: '/talent/act/:id', component: SingleTalentView, name: "Talent Show Act"},
    { path: '/contact', component: ContactPage, name: "Contact"},
    { path: '/book', component: BookPage, name: "Book"},
    { path: '/auditorium', component: AuditoriumPage, name: "Auditorium"},
    { path: '/create-new-user', component: NewUserCreationPage, name: "Create New User Account"},
    { path: '/:pathMatch(.*)*', component: FourOhFour, name: "404"}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log("to " + to.name)
        console.log("from " + from.name)
        console.log("savedpos " + savedPosition)
        if (from.name == undefined) {
            return
        }
        if (from.name.startsWith("dashboard") || to.name.startsWith("dashboard")) {
            if (!to.name.startsWith("dashboard")) {
                return { top: 0 }
            }
            return
        }
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

import vLazyImage from 'v-lazy-image';

app.use(router);
app.component('v-lazy-image', vLazyImage);
app.component("font-awesome-icon", FontAwesomeIcon)


app.mount('#app');
