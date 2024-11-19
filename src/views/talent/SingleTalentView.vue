<template>
    <div>
        <div v-if="act == null">
            <p>Loading...</p>
        </div>
        <div v-else>
            <div v-if="actFound == true">
                <h1>Found</h1>
            </div>
            <div v-else>
                <h1>That act does not seem to exist...</h1>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SingleTalentRegistrationView",
        data() {
            return {
                act: null,
                actFound: true
            }
        },
        mounted() {
            fetch(`https://api.mciafc.com/talent/all`)
                .then(res => res.json())
                .then(data => {
                    // Search for act with the id in the URL
                    console.log(data)
                    let act = data.find(act => act._id == this.$route.params.id)
                    if (act) {
                        this.act = act
                    } else {
                        this.actFound = false
                    }
                })
            }
    }
</script>

<style lang="css" scoped>

</style>