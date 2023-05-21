<template>
    <div>
        <div v-if="user != null" ref="dashboard-view">
            <transition name="sidebar-slide" mode="out-in">
                <Sidebar :user="user" @logoutRequest="logout()" />
            </transition>
            <h1>This is the dashboard page</h1>
            <p v-if="connected.event">events connected</p>
            <p v-if="connected.talent">talent connected</p>
        </div>
        <div v-else>
            <h1>[403] You don't have permission to view this page</h1>
            <p>Even though we at the AFC run on the philosophy of "ask for forgiveness, not permission", you're still gonna need to sign in to access this page.</p>
            <button @click="this.$router.push('/login')">Go to login page</button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import Sidebar from './components/sidebar.vue'

    export default {
        name: "App",
        components: {
            Sidebar
        },
        data() {
            return {
                eventsocket: null,
                talentsocket: null,
                connected: {
                    event: false,
                    talent: false
                },
            }
        },
        props: {
            user: Object
        },
        methods: {
            logout() {
                this.$emit('logoutRequest')
            }
        },
        emits: ['login', 'logoutRequest'],
        created() {
            this.eventsocket = io('https://io.mciafc.com/gigs')
            this.talentsocket = io('https://io.mciafc.com/talent')

            this.eventsocket.on('connect', () => {
                this.connected.event = true
                console.log("connected to event socket")
            })
            this.talentsocket.on('connect', () => {
                this.connected.talent = true
                console.log("connected to talent socket")
            })




            this.eventsocket.on('disconnect', () => {
                this.connected.event = false
                console.log("disconnected from event socket")
            })
            this.talentsocket.on('disconnect', () => {
                this.connected.talent = false
                console.log("disconnected from talent socket")
            })
        },
        beforeUnmount() {
            this.eventsocket.disconnect()
            this.talentsocket.disconnect()
        },
        computed: {
            isTalentShowSeason() {
                return () => {
                    let now = new Date()
                    let month = now.getMonth()
                    // if it's between november and december, it's talent show season
                    if (month >= 11 && month <= 12) {
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

.sidebar-slide-enter-active {
    animation: slide-in 0.3s ease;
}
.sidebar-slide-leave-active {
    animation: slide-out 0.3s ease;
}
@keyframes slide-in {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0%);
    }
}

</style>