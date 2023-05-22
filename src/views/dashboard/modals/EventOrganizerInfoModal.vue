<template>
    <div>
        <transition name="modal">
            <div class="eventmodal" v-if="event != null" key="2">
                <h1>Organizer Info</h1>
                <p>Name: {{event.organizerName}}</p>
                <p>Email: {{ event.organizerContactEmail }}</p>
                <p>Phone: {{ event.organizerContactNumber }}</p>
            </div>
            <div v-else key="1"></div>
        </transition>
        <Backdrop @click="this.$router.push(`/dash/event/${event._id}`)" />
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
    },
    mounted() {
        fetch('https://api.mciafc.com/gigs/up')
            .then(response => response.json())
            .then(data => {
                // find the event with the id that matches the id in the url
                this.event = data.find(event => event._id == this.$route.params.id)
                console.log(this.event)
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
    width: 25%;
    height: 50%;
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

.eventmodal>* {
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
}</style>