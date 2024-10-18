<template>
    <div v-if="user != null && user.Email == 'execs@mciafc.com'">
        <h1>Create New AFC Member Account</h1>
        <div class="new-user-form">
            <h3>First Name</h3>
            <input type="text" v-model="new_user.FirstName" />
            <h3>Last Name</h3>
            <input type="text" v-model="new_user.LastName" />
            <h3>Email</h3>
            <input type="email" v-model="new_user.Email" />
            <button class="button" @click="createUser()">Create account!</button>
        </div>
    </div>
    <div v-else>
        <h1>[403] You don't have permission to view this page</h1>
        <p>Even though we at the AFC run on the philosophy of "ask for forgiveness, not permission", you do not have the required permission level to access this page.</p>
    </div>
</template>

<script>
import io from 'socket.io-client'

    export default {
        name: 'CreateNewUser',
        data() {
            return {
                socket: null,
                new_user: {
                    FirstName: "",
                    LastName: "",
                    Email: "",
                    isExec: false,
                    PIN: "",
                }
            }
        },
        props: {
            user: Object
        },
        created() {
            this.socket = io('https://io.mciafc.com/authentication')
            this.socket.on('connect', () => {
                this.connected = true
                console.log("connected to authentication socket")
            })

            this.socket.on("user-created", data => {
                alert(`Created account for ${data.FirstName} ${data.LastName}. Their PIN is ${data.PIN}. Share this code with them immediately, you will not be able to see it again!`)
                this.$router.push('/dash')
            })

            this.socket.on("user-creation-failed", (data) => {
                alert(`Failed to create account for ${data.FirstName} ${data.LastName}. Reason: ${data.message}`)
            })
        },
        methods: {
            createUser() {
                // Generate a random 4 digit pin. This can not start with 0.
                this.new_user.PIN = Math.floor(1000 + Math.random() * 9000)
                this.socket.emit("create-new-user", this.new_user)
            }
        }
    }
</script>

<style lang="css" scoped>

</style>