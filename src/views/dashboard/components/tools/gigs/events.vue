<template>
    <div class="dashboard-section">
        <h2 class="section-header">EVENTS</h2>
        <p class="section-subtitle">View and manage upcoming events</p>
        <transition name="fade" mode="out-in">
            <div v-if="connected" key="1">
                <div class="upcoming-event-card-container">
                    <EventCard v-for="event in events" :key="event.id" :event="event" :user="user" class="clickable" @viewEvent="openEventModal" />
                </div>
            </div>
            <div v-else key="2" class="upcoming-event-card-container">
                <EventCardSkeleton v-for="n in 5" :key="n" :user="user" />
            </div>
        </transition>
    </div>
</template>

<script>
import io from 'socket.io-client'
import EventCard from './components/EventCard.vue'
import EventCardSkeleton from './components/EventCardSkeleton.vue'

    export default {
        name: 'DashboardEvents',
        props: {
            user: Object
        },
        components: {
            EventCard,
            EventCardSkeleton
        },
        data() {
            return {
                socket: null,
                connected: false,
                events: []
            }
        },
        emits: ['viewEvent'],
        created() {
            this.socket = io('https://io.mciafc.com/gigs')
        },
        mounted() {
            this.socket.on('connect', () => {
                this.connected = true
            })
            this.socket.on("upcominggigs", data => {
                console.log(this.events)
                this.events = data
            })




            this.socket.on('disconnect', () => {
                this.connected = false
            })
        },
        beforeUnmount() {
            this.socket.disconnect()
        },
        methods: {
            openEventModal(id) {
                this.$emit('viewEvent', id)
            }
        }
    }
</script>

<style lang="css" scoped>
.upcoming-event-card-container {
    display: flex;
    overflow-x: auto;
    padding-bottom: 40px;
    scroll-behavior: smooth;
}

.fade-enter-active {
    transition: 500ms ease opacity;
}
.fade-leave-active {
  transition: 750ms ease opacity;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>