<template>
    <div class="talentpage">
        <div class="banner">
            <v-lazy-image src="logo_white_crop.png" alt="" class="logo" />
            <h3 class="presents">PRESENTS</h3>
            <h1 class="title">WINTER TALENT SHOW</h1>
            <v-lazy-image src="talent show banner.jpg" alt="AFC Presents: Winter Talent Show" class="banner-image" />
        </div>
        <div class="signup-form-container" v-if="!registrationComplete">
            <div class="signup-form" v-if="!registrationComplete && signupsOpen">
                <h1 class="registration-header">CALLING FOR AUDITIONS</h1>
                <p class="registration-subheader">Got talent? Sign up to audition for the {{ new Date().getFullYear() }} Winter Talent Show, which will take place on <b>{{ dateStringExpander(estimatedTalentShowDate().toDateString()) }}</b>! It can be anything! Singing, dancing, a skit, a magic show, comedy, you name it! Clubs can also sign up to have an act, or they can make a video. Clubs do not need to register here <u><b>if they are making a video.</b></u></p>
                <h2 class="registration-section-header">Organizer Information</h2>
                <p class="registration-section-description">Some information about you, so we can get in contact. By signing up, you will be the 'leader' of your group, and will be the one we will communicate with regarding auditions and other processes with your act.</p>
                <h3 class="information-header">Registering on behalf of a Club?</h3>
                <input class="checkbox-input" type="checkbox" v-model="talentShowRegistration.isClub" />
                <h3 class="information-header"><span v-if="talentShowRegistration.isClub">Club</span><span v-else>Your</span> Name*</h3>
                <input class="text-input" type="text" v-model="talentShowRegistration.organizerName" placeholder="Your name / Club name" />
                <h3 class="information-header">Your Email*</h3>
                <input class="text-input" type="text" v-model="talentShowRegistration.organizerEmail" placeholder="Your email" />
                <h2 class="registration-section-header">Act Information</h2>
                <p class="registration-section-description">Some information about your act, so we can get an idea of what you're doing.</p>
                <h3 class="information-header">Act Name*</h3>
                <p class="information-section-description">Give what you're doing a name.</p>
                <input class="text-input" type="text" v-model="talentShowRegistration.actName" placeholder="e.g. Mystical Magic Show">
                <h3 class="information-header">Act Length (minutes)*</h3>
                <input class="text-input" type="number" min="0" max="5" v-model="talentShowRegistration.actLength">
                <h3 class="information-header">Number of Members*</h3>
                <input class="text-input" type="number" min="1" max="30" v-model="talentShowRegistration.actMembers">
                <h3 class="information-header">Act Description*</h3>
                <textarea class="textarea-input" type="text" v-model="talentShowRegistration.actDescription" placeholder="e.g. We are a group of magicians who will be performing a magic show."></textarea>
                <h3 class="registration-section-header">Equipment</h3>
                <p class="registration-section-description">What kind of equipment will your act need? View a comprehensive list of our equipment <a class="hoverable" href="https://sets.mciafc.com/equipment">here</a>.</p>
                <h3 class="information-header">Microphones</h3>
                <p class="information-section-description">We have 2 wireless mics. Any act which needs more than 2 microphones will have to arrange that with us.</p>
                <input class="text-input" type="number" v-model="talentShowRegistration.actEquipment.mics" min="0" max="2"/>
                <h3 class="information-header">Other Equipment</h3>
                <p class="information-section-description">If you need any other equipment, please list it here. Please check <a class="hoverable" href="https://sets.mciafc.com/equipment" target="__blank">our list of equipment</a> before requesting. If we don't have it listed there, we may be able to arrange something.</p>
                <textarea class="textarea-input" type="text" v-model="talentShowRegistration.actEquipment.other" placeholder="e.g We need a stage monitor and a microphone stand."></textarea>
                <h2 class="registration-section-header">Additional Information</h2>
                <p class="registration-section-description">Anything else you want to tell us? Put it here.</p>
                <textarea class="textarea-input" type="text" v-model="talentShowRegistration.additionalInfo" placeholder="e.g. We are a group of magicians who will be performing a magic show."></textarea>
                <h3 class="information-header" style="display: none;">Audition Date*</h3> 
                <p class="information-section-description" style="display: none;">Select the day that you would like to audition. All auditions take place in the Auditorium after school.</p>
                <select class="dropdown-input" v-model="talentShowRegistration.auditionDay" @click="console.log(talentShowRegistration.auditionDay)" style="display: none;">
                    <option value="0">Select date</option>
                    <option v-for="(date, index) in auditionDates()" :key="index" :value="index + 1">{{ date }}</option>
                </select>
                <button class="btn" style="scale: 1.5; margin-top: 30px;" @click="submitRegistration" v-if="!disableRegisterButton">REGISTER</button>
                <button class="btn" style="scale: 1.5; margin-top: 30px;" v-else>REGISTERING...</button>
            </div>
            <div class="signup-form" v-else>
                <h1 class="registration-header">MAYBE NEXT YEAR...</h1>
                <p class="registration-subheader">Unfortunately, talent show registrations are now closed. :( We hope to see you sign up for next year!!</p>
            </div>
        </div>
        <div v-else class="signup-form-container">
            <div class="signup-form">
                <h1 class="registration-header">THANKS FOR SIGNING UP!</h1>
                <p class="registration-subheader">We will be in contact in order to set up a date for your audition, and for other Talent Show related matters.</p>
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";

    export default {
        name: "TalentShow",
        data() {
            return {
                socket: {},
                registrationComplete: false,
                signupsOpen: true,
                disableRegisterButton: false,
                talentShowRegistration: {
                    organizerName: "",
                    organizerEmail: "",
                    isClub: false,
                    actName: "",
                    actLength: 0,
                    actMembers: 1,
                    actDescription: "",
                    actEquipment: {
                        mics: 0,
                        other: ""
                    },
                    additionalInfo: "",
                    auditionDay: 11,
                }
            }
        },
        created() {
            this.socket = io("https://io.mciafc.com/talent")
        },
        mounted() {
            fetch("https://api.mciafc.com/web")
            .then(res => res.json())
            .then(data => {
                this.signupsOpen = data.allow_talent_show_signups;
            })

            this.socket.on("newActRegistered", (newGig) => {
                let data = newGig;
                console.log(data);
                if (data.success == true) {
                    this.registrationComplete = true;
                } else {
                    alert("There was an error registering your act. Please try again later.");
                    this.disableRegisterButton = false;
                }
            })
        },
        methods: {
            submitRegistration() {
                // check to see if all fields are filled out
                if (this.talentShowRegistration.organizerName == "" || this.talentShowRegistration.organizerEmail == "" || this.talentShowRegistration.actName == "" || this.talentShowRegistration.actMembers == 0 || this.talentShowRegistration.actDescription == "" || this.talentShowRegistration.auditionDay == 0) {
                    alert("Please fill out all required fields. (* indicates required field.)");
                    return;
                }
                if (this.talentShowRegistration.organizerEmail.includes("@") == false) {
                    alert("Please enter a valid email address.");
                    return;
                }
                if (this.talentShowRegistration.actLength > 5 || this.talentShowRegistration.actLength < 0) {
                    alert("Act length can only be from 0 to 5 minutes.");
                    return;
                }
                if (this.talentShowRegistration.additionalInfo.length == 0) {
                    this.talentShowRegistration.additionalInfo = "Nothing specified.";
                }
                this.socket.emit("post", this.talentShowRegistration)
                this.disableRegisterButton = true;
            }
        },
        computed: {
            estimatedTalentShowDate() {
                return function() {
                    let year = new Date().getFullYear();
                    // get the last Friday before December 24th for that year
                    let date = new Date(year, 11, 24);
                    while (date.getDay() != 5) {
                        date.setDate(date.getDate() - 1);
                    }
                    return date;
                }
            },
            dateStringExpander() {
                return function(date) {
                    // Expand the names of the day of the week and the month from the date string
                    let dateArray = date.split(" ");
                    let month = dateArray[1];
                    let day = dateArray[2];
                    let year = dateArray[3];
                    let dayOfWeek = dateArray[0];
                    let monthExpanded = "";
                    switch (month) {
                        case "Jan":
                            monthExpanded = "January";
                            break;
                        case "Feb":
                            monthExpanded = "February";
                            break;
                        case "Mar":
                            monthExpanded = "March";
                            break;
                        case "Apr":
                            monthExpanded = "April";
                            break;
                        case "May":
                            monthExpanded = "May";
                            break;
                        case "Jun":
                            monthExpanded = "June";
                            break;
                        case "Jul":
                            monthExpanded = "July";
                            break;
                        case "Aug":
                            monthExpanded = "August";
                            break;
                        case "Sep":
                            monthExpanded = "September";
                            break;
                        case "Oct":
                            monthExpanded = "October";
                            break;
                        case "Nov":
                            monthExpanded = "November";
                            break;
                        case "Dec":
                            monthExpanded = "December";
                            break;
                    }
                    switch (dayOfWeek) {
                        case "Sun":
                            dayOfWeek = "Sunday";
                            break;
                        case "Mon":
                            dayOfWeek = "Monday";
                            break;
                        case "Tue":
                            dayOfWeek = "Tuesday";
                            break;
                        case "Wed":
                            dayOfWeek = "Wednesday";
                            break;
                        case "Thu":
                            dayOfWeek = "Thursday";
                            break;
                        case "Fri":
                            dayOfWeek = "Friday";
                            break;
                        case "Sat":
                            dayOfWeek = "Saturday";
                            break;
                    }

                    return `${dayOfWeek}, ${monthExpanded} ${day}, ${year}`;
                }
            },
            auditionDates() {
                return function() {
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

                    // use the DateStringExpander method on all dates in the array
                    dates = dates.map((date) => {
                        return this.dateStringExpander(date);
                    })

                    // cut the year off of the dates
                    dates = dates.map((date) => {
                        return date.substring(0, date.length - 6);
                    })
                    return dates
                }
            },
        }
    }
</script>

<style lang="css" scoped>
.signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 800px;
    margin-top: 15px;
}

.signup-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
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
    font-size: 1.2em;
}


.textarea-input {
    width: 400px;
    height: 100px;
    border: 0px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.2em;
    resize: none;
}

.dropdown-input {
    width: 400px;
    height: 50px;
    border: 0px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.2em;
}

@media (max-width:960px) {
    .text-input {
        width: 300px;
    }
    .textarea-input {
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
}



span {
    font-family: 'Josefin Sans', sans-serif !important;
}



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
}

.logo {
    height: 300px;
    width: 300px;
    object-fit: contain;
    z-index: 5;
    opacity: 0.9;
    margin: 0;
    padding: 0;
    display: block;
}

.presents {
    opacity: 0.9;
    font-size: 2em;
    z-index: 10;
    margin: 0;
    margin-bottom: 1%;
}
.title {
    margin: 0;
    font-size: 4em;
    z-index: 10;
}

@media (max-width:960px) {
    .title {
        font-size: 2.5em;
    }
    .presents {
        font-size: 1.5em;
    }
}

a.hoverable:hover {
    color: var(--mciafcsky);
    transition: all 200ms;
}
</style>