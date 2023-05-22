<template>
    <div>
        <transition name="modal">
            <div class="modal" v-if="event != null" key="2">
                <h1>HOLD UP!</h1>
                <p>Are you sure you want to delete this event? There's no going back.</p>
                <p><button class="deletebutton" @click="deleteEvent">YES, LETS DELETE IT</button></p>
                <button @click="this.$router.push(`/dash/event/${this.event._id}`)" class="cancelbutton">NO, GO BACK</button>
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
        deleteEvent() {
            fetch(`https://api.mciafc.com/gigs/delete/${this.event._id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.$router.push('/dash')
            })
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

.modal {
    box-shadow: .8rem .8rem 1.4rem #151515,
        -.2rem -.2rem 1.8rem #272727;
    animation: fade-in 300ms forwards ease-out;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    height: 250px;
    width: 400px;
    background-color: #191919;
    font-size: 16px;
    z-index: 20000000;
    padding: 20px;
    padding-left: 75px;
    padding-right: 75px;
    border-radius: 3rem;
    overflow: hidden;
}

.darkenbackground {
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: #19191980;
    animation: blur 200ms forwards ease-out;
    opacity: 1;
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
}

.unscrollable {
    overflow: hidden !important;
}

.continuebutton {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 80px;
}

.pagenumber {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 20px;
}

.fieldCheckText {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 120px;
}

.deletebutton {
    padding: 5px;
    border: none;
    background-color: var(--mciafcorange);
    font-size: 1.2rem;
    font-weight: 900;
    color: white;

}
.cancelbutton {
    padding: 5px;
    border: none;
    background-color: var(--mciafcsky);
    font-size: 1.2rem;
    font-weight: 900;
    color: white;

}
</style>