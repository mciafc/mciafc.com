<template>
    <div>
        <div v-if="user != null" ref="dashboard-view">
            <transition name="sidebar-slide" mode="out-in">
                <Sidebar :user="user" @logoutRequest="logout()" />
            </transition>
            <div class="banner">
                <h1 class="bannertext">Your Dashboard</h1>
            </div>
            <div class="modals">
                <router-view class="modals" v-slot="{ Component, route }" :user="user" appear>
                    <transition name="modal" mode="out-in">
                        <div :key="route.name">
                            <component :is="Component" :user="user" />
                        </div>
                    </transition>
                </router-view>
            </div>
            <div class="dashboard-sections">
                <Divider />
                <Controls id="controls" :user="user" class="dash-section" />
                <Divider />
                <Events id="events" :user="user" class="dash-section" @viewEvent="openEventModal" />
                <Divider />
                <Talent id="talent" :user="user" class="dash-section" @viewAct="openActModal" v-if="isTalentShowSeason()" />
                <Divider v-if="isTalentShowSeason()" />
                <Crew id="crew" :user="user" class="dash-section" />
                <Divider v-if="user.isExec" />
                <SiteControls id="sitecontrols" :user="user" class="dash-section" v-if="user.isExec" />
                <Divider />
            </div>
        </div>
        <div v-else>
            <h1>[403] You don't have permission to view this page</h1>
            <p>Even though we at the AFC run on the philosophy of "ask for forgiveness, not permission", you're still gonna need to sign in to access this page.</p>
            <button @click="this.$router.push('/login')">Go to login page</button>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/sidebar.vue'
import Divider from './components/sectiondivider.vue'
import Controls from './components/tools/controls/controls.vue'
import Events from './components/tools/gigs/events.vue'
import Crew from './components/tools/crew/crew.vue'
import Talent from './components/tools/talent/talent.vue'
import SiteControls from './components/tools/site-controls/site-controls.vue'

    export default {
        name: "App",
        components: {
            Sidebar,
            Controls,
            Events,
            Divider,
            Crew,
            Talent,
            SiteControls
        },
        props: {
            user: Object
        },
        methods: {
            logout() {
                this.$emit('logoutRequest')
            },
            openEventModal(id) {
                this.$router.replace(`/dash/event/${id}`)
            },
            openActModal(id) {
                console.log(id)
                this.$router.replace(`/dash/act/${id}`)
            }
        },
        emits: ['login', 'logoutRequest'],
        computed: {
            isTalentShowSeason() {
                return function() {
                    let now = new Date()
                    let month = now.getMonth()
                    // if it's between november and december, it's talent show season
                    if (month >= 9) {
                        return true
                    } else {
                        return false
                    }
                }
            },
        }
    }
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

.banner {
    background-size: 200% 200%;
    background-position: 100%;
    height: 100px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
}

.bannertext {
    font-weight: 900;
    text-shadow: 5px 5px 0px rgba(0,0,0,0.25);
}

.dashboard-sections {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

.dash-section {
    width: 100%;
}


</style>