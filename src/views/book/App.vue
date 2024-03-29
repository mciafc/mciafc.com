<template>
    <div class="bookpage">
        <div class="banner">
            <h1 class="title">BOOK YOUR SHOW</h1>
            <v-lazy-image src="soundboard-compress2.JPG" alt="Banner image of the Auditorium Cabinet" class="banner-image" />
        </div>
        <div class="flex-container">
            <div class="centerer">
                <transition name="fade" v-if="!formFinished">
                    <div class="booking-signup-form" v-if="!startForm" key="0">
                        <h1 class="registration-header">Ready to Run a Show?</h1>
                        <p class="registration-subheader">You've come to the right place! Follow through the form below to register your event and we will be in contact.</p>
                        <h2 class="registration-section-header">BEFORE WE GET STARTED</h2>
                        <p class="registration-section-description">We need to know if you're a Martingrove Affiliated Organization (i.e. A Club or School staff), or if you're a Third Party Organization (Not affiliated with Martingrove)</p>
                        <button class="btn" style="scale: 1.5; margin: 15px;" @click="this.startForm = true">Martingrove Affiliated Organization</button>
                        <button class="btn" style="scale: 1.5; margin: 15px;" @click="this.$router.push('/contact')">Third Party Organization</button>
                    </div>
                    <div class="booking-signup-form" v-else key="1">
                        <h1 class="registration-section-header">Organizer Information</h1>
                        <p class="registration-section-description">Information about you, so we can get in contact</p>
                        <h2 class="information-header">Your Name*</h2>
                        <input class="text-input" type="text" v-model="event.organizerName" placeholder="Organizer / Your Name" />
                        <h2 class="information-header">Your Email*</h2>
                        <input class="text-input" type="text" v-model="event.organizerContactEmail" placeholder="Organizer / Your Email" />
                        <h2 class="information-header">Your Phone Number</h2>
                        <p class="information-section-description">We only text or call in dire scenarios.</p>
                        <input class="text-input" type="text" v-model="event.organizerContactNumber" placeholder="Organizer / Your Phone Number">
                        <h1 class="registration-section-header">Organization Information</h1>
                        <p class="registration-section-description">Information about your organization.</p>
                        <h2 class="information-header">Organization / Group Name*</h2>
                        <input class="text-input" type="text" v-model="event.organizationName" placeholder="e.g. AFC, SAC, etc.">
                        <h1 class="registration-section-header">Event Information</h1>
                        <p class="registration-section-description">Information about your event.</p>
                        <h2 class="information-header">Event Name*</h2>
                        <input class="text-input" type="text" v-model="event.gigName" placeholder="e.g. Winter Talent Show">
                        <h2 class="information-header">Event Start Date*</h2>
                        <p class="information-section-description" style="max-width: 600px;">The date and time that your event will start. This should NOT include the time we will use to set up your location.</p>
                        <input class="date-input" type="datetime-local" v-model="event.gigStartDate">
                        <h2 class="information-header">Event End Date*</h2>
                        <p class="information-section-description" style="max-width: 600px;">The date and time that your event will end. This should NOT include the time we will use to strike (take down) your location.</p>
                        <input class="date-input" type="datetime-local" v-model="event.gigEndDate">
                        <h2 class="information-header">Event Location*</h2>
                        <p class="information-section-description">The location that your event will take place.</p>
                        <input class="text-input" type="text" v-model="event.gigLocation" placeholder="e.g. Auditorium, Gym, Cafeteria">
                        <h1 class="registration-section-header">Crew Information</h1>
                        <p class="registration-section-description">Information for the crew.</p>
                        <h2 class="information-header">Crew Members Needed*</h2>
                        <p class="information-section-description">The minimum number of crew members you need to run your event. Leave at 0 for as many as possible.</p>
                        <input class="text-input" type="number" v-model="event.employeesNeeded" min="0" max="99">
                        <h1 class="registration-section-header">Additional Information</h1>
                        <p class="registration-section-description">Anything else you want to tell us? Put it here.</p>
                        <textarea class="textarea-input" v-model="event.additionalInformation" placeholder="Anything else you want to tell us?"></textarea>
                        <button class="btn" style="scale: 1.5; margin-top: 30px;" v-if="!registering" @click="registerEvent()">REGISTER</button>
                        <button class="btn" style="scale: 1.5; margin-top: 30px; opacity: 0.5;" v-else>REGISTERING...</button>
                    </div>
                </transition>
                <div class="booking-signup-form" v-else>
                    <h1 class="registration-header">Thank You!</h1>
                    <p class="registration-subheader">We really appreciate you using our website to register your event. It really helps keep things organized. We will be in contact with you about running your event!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client"

    export default {
        name: 'BookPage',
        data() {
            return {
                startForm: false,
                formFinished: false,
                registering: false,
                socket: null,
                event: {
                    organizerName: "",
                    organizerContactEmail: "",
                    organizerContactNumber: "", // Not required
                    organizationName: "", 
                    gigName: "",
                    gigStartDate: null,
                    gigEndDate: null,
                    gigLocation: "Auditorium",
                    employeesNeeded: 0,
                    registeredByOrganizer: true,
                    paidJob: false,
                    additionalInformation: "", // Not required
                }
            }
        },
        created() {
            this.socket = io("https://io.mciafc.com/gigs")
        },
        mounted() {
            this.socket.on("newGigRegistered", (newGig) => {
                let data = newGig
                console.log(data)
                this.formFinished = true
                this.registering = false
            })
        },
        methods: {
            registerEvent() {
                this.registering = true;
                // ensure all required fields are filled
                if (this.event.organizerName == "" || this.event.organizerContactEmail == "" || this.event.organizationName == "" || this.event.gigName == "" || this.event.gigStartDate == null || this.event.gigEndDate == null || this.event.gigLocation == "") {
                    alert("Please fill out all required fields.")
                    this.registering = false;
                    return;
                }
                if (this.event.organizerContactNumber == "") {
                    this.event.organizerContactNumber = "N/A"
                }
                if (this.event.additionalInformation == "") {
                    this.event.additionalInformation = "No additional details provided."
                }
                // do not allow the start date to be after the end date or before the current date
                if (this.event.gigStartDate > this.event.gigEndDate || this.event.gigStartDate < new Date()) {
                    alert("Please ensure that your start date is before your end date and after the current date.")
                    this.registering = false;
                    return;
                }
                // do not allow the end date to be before the start date or before the current date
                if (this.event.gigEndDate < this.event.gigStartDate || this.event.gigEndDate < new Date()) {
                    alert("Please ensure that your end date is after your start date and after the current date.")
                    this.registering = false;
                    return;
                }

                // send the event to the server
                this.socket.emit("post", this.event)
            }
        }
    }
</script>

<style lang="css" scoped>
.banner {
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0;
}
.banner-image {
    position: absolute;
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin: 0;
    z-index: 0;
    opacity: 0.75;
}

.title {
    margin: 0;
    font-size: 5em;
    z-index: 10;
}

.flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
}

.centerer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85%;
    text-align: center;
}

.booking-signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85%;
    max-width: 1000px;
    margin-bottom: 30px;
    text-align: center;
}

.registration-header {
    font-size: 3em;
    padding-top: 30px;
    margin: 0;
}

.registration-subheader {
    font-size: 1.2em;
    margin-bottom: 30px;
}

.registration-section-header {
    font-size: 3em;
    margin: 0;
    margin-top: 50px;
    text-decoration: underline;
}
.registration-section-description {
    font-size: 1.2em;
}
.information-header {
    font-size: 2em;
}
.information-section-description {
    font-size: 1.2em;
    margin-top: -20px;
}

.checkbox-input {
    width: 50px;
    height: 50px;
    border: 0px;
    border-radius: 10px;
}

.text-input {
    width: 400px;
    height: 50px;
    border: 0px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1em;
}


.textarea-input {
    width: 400px;
    height: 100px;
    border: 0px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1em;
    resize: none;
}

.dropdown-input {
    width: 400px;
    height: 50px;
    border: 0px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1em;
}

.date-input {
    width: 400px;
    height: 50px;
    border: 0px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1em;
}

@media (max-width:960px) {
    .text-input {
        width: 300px;
    }
    .textarea-input {
        width: 300px;
    }
    .date-input {
        width: 300px;
    }
}

@media (max-width:600px) {
    .text-input {
        width: 200px;
    }
    .textarea-input {
        width: 200px;
    }
    .signup-form {
        width: 90%;
    }
    .dropdown-input {
        width: 200px;
        font-size: 1em;
    }
    .date-input {
        width: 200px;
    }
}


.fade-enter-active {
    transition: 500ms ease opacity;
}
.fade-leave-active {
  transition: 100ms ease opacity;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>