<template>
    <div class="dashboard-section">
        <h2 class="section-header">Talent Show</h2>
        <p class="section-subtitle">See registrations for this year's talent show.</p>
        <p class="minutes">Total Act Time: {{ totalActMinutes(acts) }} mins, {{ acts.length }} acts</p>
        <a :href="`https://api.mciafc.com/talent/spreadsheet/${new Date().getFullYear()}`" class="section-link">Download production manager spreadsheet</a>
        <transition name="fade" mode="out-in">
            <div v-if="connected" key="1">
                <div class="upcoming-event-card-container" v-if="acts.length > 0">
                    <ActCard v-for="act in organizeByAuditionDay(acts)" :key="act.id" :act="act" :user="user" class="clickable flex-item" @viewAct="openActModal" />
                </div>
                <div v-else>
                    <p>Nobody has registered yet.</p>
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
import ActCard from './components/ActCard.vue'
import EventCardSkeleton from './components/EventCardSkeleton.vue'

    export default {
        name: 'DashboardEvents',
        props: {
            user: Object
        },
        components: {
            ActCard,
            EventCardSkeleton
        },
        data() {
            return {
                socket: null,
                connected: false,
                acts: []
            }
        },
        emits: ['viewAct'],
        created() {
            this.socket = io('https://io.mciafc.com/talent')
        },
        mounted() {
            this.socket.on('connect', () => {
                this.connected = true
            })
            this.socket.on("acts", data => {
                console.log(this.acts)
                this.acts = data
            })

            this.socket.on('disconnect', () => {
                this.connected = false
            })
        },
        beforeUnmount() {
            this.socket.disconnect()
        },
        methods: {
            openActModal(id) {
                this.$emit('viewAct', id)
            }
        },
        computed: {
            organizeByAuditionDay() {
                return function (acts) {
                    return acts.sort((a, b) => {
                        return a.auditionDay - b.auditionDay
                    })
                }
            },
            totalActMinutes() {
                return function (acts) {
                    let total = 0
                    acts.forEach(act => {
                        total += act.actLength
                    })
                    return total
                }
            
            }
        }
    }
</script>

<style lang="css" scoped>
.upcoming-event-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 40px;
    scroll-behavior: smooth;
    padding-right: 40px;
}

.fade-enter-active {
    transition: 250ms ease opacity;
}
.fade-leave-active {
  transition: 250ms ease opacity;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.minutes {
    font-size: 0.95rem;
    margin: 0;
}

</style>