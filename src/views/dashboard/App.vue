<template>
    <div>
        <div v-if="user != null">
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
    export default {
        name: "App",
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

        },
        emits: ['login'],
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
        }
    }
</script>

<style lang="css" scoped>

</style>