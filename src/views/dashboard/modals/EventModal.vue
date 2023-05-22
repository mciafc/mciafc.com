<template>
    <div>
        <transition name="modal">
            <div class="eventmodal" v-if="event != null" key="2">
            <div class="dropdownOuterBox" v-if="user.isExec" @click="openDropDown(event._id)" @mouseleave="closeDropDown">
                    <svg class="dropdownMenu" viewBox="-95 -95 700 700">
                        <circle cx="256" cy="256" r="48"></circle>
                        <path
                            d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z">
                        </path>
                    </svg>
                    <div class="dropdown" v-if="dropDownOpen == event._id">
                        <p @click="getOrganizerContactInfo(event)" class="dropdownItem">View Contact Info</p>
                        <!-- <p class="dropdownItem" @click="manageMembers(event._id)">Manage Available Members</p> -->
                        <p class="dropdownItem" style="color: rgb(255, 91, 91);" @click="confirmDelete(event._id)">Delete</p>
                    </div>
                </div>
                <h1>{{event.gigName}}</h1>
                <h3 class="organizationName">By: {{ event.organizationName }}</h3>
                <h4 class="dateRange">📅 {{ dateRange(event.gigStartDate, event.gigEndDate) }}</h4>
                <p class="eventLocation">📌 <b>Location:</b> {{ event.gigLocation }}</p>
                <p v-if="user.isExec" class="paidJob">💵 <b>Paid Job:</b> <span v-if="event.paidJob">Yes</span><span
                        v-else>No</span></p>
                <p class="employeesNeeded">👥 <b>Members Needed:</b> {{ employeesNeeded(event.employeesNeeded) }}</p>
                <h2>Additional Info</h2>
                <p class="additionalInfo">{{ event.additionalInformation }}</p>
                <p><i>User Availability is currently in the process of being re-done. The current system is REALLY bad...</i></p>
                <button @click="close">Close</button>
            </div>
            <div v-else key="1"></div>
        </transition>
        <Backdrop />
    </div>
</template>

<script>
import Backdrop from './components/backdrop.vue'
    export default {
        name: 'EventModal',
        components: {
            Backdrop
        },
        props: {
            user: Object
        },
        data() {
            return {
                showCard: false,
                event: null,
                dropDownOpen: undefined,
            }
        },
        methods: {
            close() {
                this.$router.push('/dash')
            },
            openDropDown(gigId) {
                return this.dropDownOpen = gigId
            },
            closeDropDown() {
                return this.dropDownOpen = undefined
            },
            getOrganizerContactInfo() {
                this.$router.push(`/dash/event/${this.event._id}/organizerinfo`)
            },
            confirmDelete() {
                this.$router.push(`/dash/event/${this.event._id}/delete`)
            }
        },
        mounted() {
            fetch('https://api.mciafc.com/gigs/up')
            .then(response => response.json())
            .then(data => {
                // find the event with the id that matches the id in the url
                this.event = data.find(event => event._id == this.$route.params.id)
                console.log(this.event)
                if (this.event == undefined) {
                    this.$router.push('/dash')
                }
            })
        },
        computed: {
            employeesNeeded() {
                return function (amountSpecified) {
                    if (amountSpecified > 0) {
                        return amountSpecified
                    }
                    return "As many as possible."
                }
            },
            trueOrFalse() {
                return function (value) {
                    if (value) {
                        return `Paid Job?: <span class="yes">Yes</span>`
                    }
                    return `Paid Job?: <span class="no">No</span>`
                }
            },
            dateRange() {
                return function (start, end) {
                    let startString = new Date(start).toDateString()
                    // let endString = new Date(end).toDateString()
                    let startMinutes = new Date(start).getMinutes()
                    let startHours = new Date(start).getHours()
                    let endMinutes = new Date(end).getMinutes()
                    let endHours = new Date(end).getHours()
                    if (startMinutes < 10) {
                        startMinutes = `0${startMinutes}`
                    }
                    if (endMinutes < 10) {
                        endMinutes = `0${endMinutes}`
                    }
                    return `${startString} @ ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
                }
            },
            employeesAvailable() {
                return function (people, gigId) {
                    try {
                        let value = people.find(o => o.gigId === gigId)
                        if (value) {
                            let members = value.availableMembers
                            return members
                        }
                        return "There was an issue finding the availabilities for this event."
                    } catch (e) {
                        return "There was an issue finding the availabilities for this event."
                    }
                }
            },
            scanForLinks() {
                return function (text) {
                    let words = text.split(" ")
                    let newWords = []
                    for (let word of words) {
                        if (word.startsWith("http://") || word.startsWith("https://")) {
                            newWords.push(`<a href="${word}">${word}</a>`)
                        } else {
                            newWords.push(word)
                        }
                    }
                    return newWords.join(" ")
                }
            }
        }
    }
</script>

<style lang="css" scoped>
@import '@/assets/modal-animations.css';

.eventmodal {
    z-index: 1000;
    position: fixed;
    margin: auto;
    top: 70px;
    left: 0;
    right: 0;
    width: 50%;
    height: 90%;
    background-color: #313030;
    border-radius: 5px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
}
.eventmodal > * {
    margin: 10px;
}

@keyframes rotate-cog {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
.dropdown {
    background-color: #1f1f1fcc;
    overflow: hidden;
    box-shadow: .4rem .4rem .7rem #1a1a1a,
                -.1rem -.1rem .9rem #272727;
    z-index: 1;
    border-radius: 20px;
    position: absolute;
    top: 50px;
    left: 10px;
}

.dropdownMenu {
    transition: 200ms all;
    display: flex;
    position: absolute;
    margin: 0;
    top: 20px;
    left: 10px;
    fill: #e59d1675;
    background: #252525;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    transition: all 200ms;
}

.dropdownMenu:hover {
    transition: 200ms all;
    cursor: pointer;
    fill: #e59d16dc;
    animation-name: rotate-cog;
    animation-duration: 1s;
    animation-play-state: forwards;
    animation-timing-function: cubic-bezier(.34, .46, .35, 1.1)
}

.dropdownItem {
    padding-left: 30px;
    padding-right: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin: 20px;
    margin-left: 0px;
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    width: 100%;
    position: relative;
    z-index: 2;
}

.dropdownItem:hover {
    cursor: pointer;
    background-color: #1b1b1bcc;
    transition: 200ms all;
}

</style>