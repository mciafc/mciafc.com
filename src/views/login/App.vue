<template>
    <div>
        <h1>Log in to view crew tools</h1>
        <p>If you're a part of the AFC, you can access our crew tools by inputting your member PIN below.</p>
        <!-- only allow numbers in input -->
        <input type="text" v-model="userPin" placeholder="1234" @keypress.enter="login()" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="4" />
        <p v-if="error">Error: {{ this.error }}</p>
    </div>
</template>

<script>
import io from 'socket.io-client'
    export default {
        name: "App",
        data() {
            return {
                userPin: "",
                socket: null,
                connected: false,
                user: null,
                error: null
            }
        },
        methods: {
            login() {
                this.socket.emit('authenticationAttempt', this.userPin)
            }
        },
        emits: ['login'],
        created() {
            this.socket = io('https://io.mciafc.com/authentication')

            this.socket.on('connect', () => {
                this.connected = true
                console.log("connected to authentication socket")
            })

            this.socket.on("successfulAuthentication", data => {
                if (data.FirstName == undefined) {
                    return this.error = "That pin is not valid"
                }
                this.user = data
                console.log("logged in as " + this.user.FirstName)
                this.$emit('login', this.user)
            })

            this.socket.on("failedAuthentication", () => {
                this.error = "That pin is not valid"
            })

            this.socket.on('disconnect', () => {
                this.connected = false
                console.log("disconnected from authentication socket")
            })
        },
        beforeUnmount() {
            this.socket.disconnect()
        }
    }
</script>

<style lang="css" scoped>

</style>