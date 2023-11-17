<template>
    <div class="event" v-if="act.gigName != 'do not delete this'" @click="this.$emit('viewAct', act._id)">
        <h1 class="eventName">{{ act.actName }}</h1>
        <h3 class="organizationName">By: <span v-if="act.isClub" style="color: cornflowerblue">CLUB</span> {{ act.organizerName }}</h3>
        <h3 class="description-header">Description:</h3>
        <p class="description">{{ act.actDescription }}</p>
        <h3 class="description-header" style="font-size: 18px;">🕒 Act Duration: {{ act.actLength }} min(s)</h3>
        <h3 class="description-header" style="font-size: 18px;">🎤 Mics Needed: {{ act.actEquipment.mics }}</h3>
        <h4 class="dateRange">📅 Audition Date: {{ auditionDates()[act.auditionDay - 1] }}</h4>
        <p class="registeredByOrganizer">Click to view more.</p>
    </div>
</template>

<script>
    export default {
        name: "ActCard",
        props: {
            act: Object,
            user: Object
        },
        data() {
            return {
                people: {},
                markedForDeletion: "",
                execToolsEnabled: false,
                dropDownOpen: undefined,
                deleteConfirmation: false,
                organizerContactInfo: {},
                managingMembersModalOpen: false,
                managingMembers: {},
                managingMembersGigId: ""
            }
        },
        emits: ['viewAct'],
        methods: {
            getOrganizerContactInfo(gig) {
                this.organizerContactInfo.name = gig.organizerName
                this.organizerContactInfo.email = gig.organizerContactEmail
                this.organizerContactInfo.number = gig.organizerContactNumber
                this.organizerContactInfo.regByOrganizer = gig.registeredByOrganizer
                this.organizerContactInfo.modalOpen = true
                console.log(this.people)
            },
            saveAvailabilities(avdata) {
                this.people = avdata
                console.log(this.people)
            },
            closeOrganizerContactInfo() {
                this.organizerContactInfo.name = undefined
                this.organizerContactInfo.email = undefined
                this.organizerContactInfo.number = undefined
                this.organizerContactInfo.modalOpen = false
            },
            manageMembers(gigId) {
                this.socket.emit('getavailability', gigId)
                this.managingMembersModalOpen = true
                this.managingMembersGigId = gigId
                this.managingMembers = this.employeesAvailable(gigId)
            },
            closeManagingMembers() {
                this.managingMembersModalOpen = false;
                this.managingMembers = {}
            },
            confirmDelete(gigId) {
                this.markedForDeletion = this.dropDownOpen
                this.deleteConfirmation = gigId
            },
            requestEventDeletion(gigId) {
                console.log(gigId)
                this.socket.emit("deleteRequest", gigId)
            },
            openDropDown(gigId) {
                return this.dropDownOpen = gigId
            },
            closeDropDown() {
                return this.dropDownOpen = undefined
            },
            removeMember(gigId) {
                console.log(gigId)
                this.closeManagingMembers()
                this.manageMembers(gigId)
            }
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
            eventIsHappeningNow() {
                return function (start, end) {
                    let now = new Date()
                    let startOfEvent = new Date(start)
                    let endOfEvent = new Date(end)
                    console.log(now)
                    console.log(startOfEvent)
                    console.log(endOfEvent)
                    if (now > startOfEvent && now < endOfEvent) {
                        return true
                    }
                    return false
                }
            },
             auditionDates() {
                return function () {
                    // get Weekdays for the last week of november and the first week of december
                    let year = new Date().getFullYear();
                    let date = new Date(year, 10, 24);
                    let dates = [];
                    while (date.getDay() != 5) {
                        date.setDate(date.getDate() - 1);
                    }
                    for (let i = 0; i < 7; i++) {
                        date.setDate(date.getDate() + 1);
                        dates.push(date.toDateString());
                    }
                    date = new Date(year, 11, 1);
                    while (date.getDay() != 5) {
                        date.setDate(date.getDate() + 1);
                    }
                    for (let i = 0; i < 7; i++) {
                        date.setDate(date.getDate() + 1);
                        dates.push(date.toDateString());
                    }
                    // remove saturdays and sundays from the array
                    dates = dates.filter((date) => {
                        return date.includes("Sat") == false && date.includes("Sun") == false;
                    })
                    // cut the year off of the dates
                    dates = dates.map((date) => {
                        return date.substring(0, date.length - 5);
                    })
                    return dates
                }
            }
        }
    }
</script>

<style lang="css" scoped>
.event {
    background-color: #31303080;
    backdrop-filter: blur(8px);
    color: #fff;
    float: left;
    word-wrap: break-word;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;
    flex: 0 0 auto;
    height: 350px;
    overflow-x: hidden;
    width: 400px;
    margin: 20px;
}

button {
    background-color: rgb(229, 157, 22);
    padding: 7px;
    font-size: 20px;
    max-width: 80%;
    border: 5px 5px;
    border-color: rgb(229, 157, 22);
    border-radius: 5px;
    color: white;
    transition: all 200ms;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    position: relative;
}

.yes {
    color: green;
}

.no {
    color: red;
}

.availableButton {
    background-color: rgb(229, 157, 22);
    padding: 7px;
    font-size: 20px;
    top: -20px;
    max-width: 80%;
    border: 5px 5px;
    border-color: rgb(229, 157, 22);
    border-radius: 5px;
    color: white;
    transition: all 200ms;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    position: relative;
}

.deletebutton {
    background-color: rgb(255, 0, 0) !important;
    margin: 15px;
    border-color: rgb(255, 0, 0) !important
}

.canceldeletebutton {
    background-color: rgb(229, 157, 22) !important;
    border-color: rgb(229, 157, 22) !important;
}

button:hover {
    cursor: pointer;
    background-color: rgb(229, 157, 22, 0.9);
    transition: all 200ms;
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
}

.dropdownMenu {
    transition: 200ms all;
    display: flex;
    position: absolute;
    margin: 0;
    top: 20px;
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

</style>