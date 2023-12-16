<template>
    <div class="dashboard-section">
        <h2 class="section-header">Site Controls</h2>
        <p class="section-subtitle">Toggle sections on the AFC website (this one!)</p>
        <button class="btn" v-if="allow_talent_show_signups" @click="toggleTalentShowSignups">Disable Talent Show Signups</button>
        <button class="btn" v-else @click="toggleTalentShowSignups">Enable Talent Show Signups</button>
    </div>
</template>

<script>
export default {
    name: 'DashboardControls',
    props: {
        user: Object
    },
    data() {
        return {
            allow_talent_show_signups: true
        }
    },
    mounted() {
        this.mountFunction()
    },
    methods: {
        toggleTalentShowSignups() {
            this.allow_talent_show_signups = !this.allow_talent_show_signups
            fetch("https://api.mciafc.com/web/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    allow_talent_show_signups: this.allow_talent_show_signups
                })
            })

        },
        mountFunction() {
            fetch("https://api.mciafc.com/web")
            .then(res => res.json())
            .then(data => {
                this.allow_talent_show_signups = data.allow_talent_show_signups
            })
        }
    }
}
</script>

<style lang="css" scoped>
@import '@/assets/dashboard-global-styles.css';
</style>