<template>
    <div>
        <div v-if="act == null">
            <p>Loading...</p>
        </div>
        <div v-else>
            <div v-if="actFound == true" class="big-center">
                <h1 class="gigName">{{ act.actName }}</h1>
                <h3 class="organizationName">By: <span v-if="act.isClub" style="color: cornflowerblue">CLUB</span> {{ act.organizerName }}</h3>
                <h3 class="description-header">Description:</h3>
                <p class="description">{{ act.actDescription }}</p>
                <h3 class="description-header" style="font-size: 18px;">🕒 Act Duration: {{ act.actLength }} min(s)</h3>
                <h3 class="description-header" style="font-size: 18px;">🎤 Mics Needed: {{ act.actEquipment.mics }}</h3>
                <h3 class="description-header" style="font-size: 18px;">👥 Members: {{ act.actMembers }}</h3>
                <h4 class="dateRange">📅 Audition Date: {{ getAuditionDay() }}</h4>
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
                actFound: true,
                audition_dates: []
            }
        },
        methods: {
            getAuditionDay() {
                let day = this.audition_dates[this.act.auditionDay - 1]
                if (day == null) {
                    return "AFC Discretion"
                }
                return day
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
                        fetch(`https://api.mciafc.com/talent/audition-dates/${new Date(this.act.createdAt).getFullYear()}`)
                        .then(res => res.json())
                        .then(data2 => {
                            this.audition_dates = data2
                        })
                    } else {
                        this.actFound = false
                    }
                })
            }
    }
</script>

<style lang="css" scoped>
.gigName {
    font-weight: 600;
    position: relative;
    margin-left: 50px;
    margin-right: 50px;
    line-height: 1;;
}

.organizationName {
    position: relative;
    top: -15px;
    margin-bottom: 0;
    color: #c7c7c7;
}

.dateRange {
    position: relative;
    top: -10px;
}

.gigLocation {
    position: relative;
    top: -15px;
}

.paidJob {
    position: relative;
    top: -15px;
}

.employeesNeeded {
    position: relative;
    top: -15px;
}

.additionalInformation {
    position: relative;
    font-size: 25px;
    top: -15px;
}

.additionalInformationText {
    position: relative;
    top: -35px;
}

.registeredByOrganizer {
    position: relative;
    word-wrap: break-word;
    font-size: 12px;
    color: #c7c7c7;
    bottom: 15px;
}

.employeesAvailable {
    position: relative;
    top: -20px;
}

@keyframes rotate-cog {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.description {
    margin-top: 0;
}

.description-header {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 20px;
}

.big-center {
    text-align: center;
    margin-top: 100px;
    font-size: 1.4rem;
}


</style>