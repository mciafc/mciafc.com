<template>
  <div class="body" :class="{ noscroll: bookingModalOpen }" id="About" ref="about">
    <BookForm @viewSpecs="specsModalOpen = true" @closebookingmodal="closeBookingModal" :bookingModalOpenProp="bookingModalOpen"></BookForm>
    <TalentModal @closetalentmodal="closeTalentModal" :talentModalOpenProp="talentModalOpen" />
    <InfoModal @closeinfomodal="closeInfoModal" :infoModalOpenProp="infoModalData.open" :headerProp="infoModalData.header" :textProp="infoModalData.text" :textProp2="infoModalData.text2" />
    <SpecsModal :viewingSpecs="specsModalOpen" @closeSpecsModal="specsModalOpen = false" @notReadyYet="notReadyYet"/>
    <header class="header unselectable">
      <ul>
        <div class="navbox">
          <li>
            <p><a class="about" href="/#About">About</a></p>
          </li>
          <li v-if="showTalentShowScreen">
            <p><a class="talent" href="/#Talent">Talent Show</a></p>
          </li>
          <li>
            <p><a href="/#Upcoming">Upcoming Events</a></p>
          </li>
          <li>
            <p><a class="book" href="/#Book">Book</a></p>
          </li>
        </div>
      </ul>
    </header>
    <div class="flex-container">
      <div class="Screen section" ref="aboutscreen">
        <div class="typographybg" :class="{ oddtypographybg: aboutBoxIsOdd('aboutscreen') }">
          <h1 class="bigtypography unselectable" :class="{ oddtypography: aboutBoxIsOdd('aboutscreen') }">WHAT IS AFC?</h1>
        </div>
        <div class="aboutbox selectable" :class="{ odd: aboutBoxIsOdd('aboutscreen') }">
          <h1 class="clubname">AUDITORIUM FACILITIES CREW</h1>
          <br>
          <h2 class="gradient-text subheading">ABOUT US</h2>
          <p class="clubinfo">The AFC is responsible for working the more technical parts of the MCI auditorium. We help out with assemblies, extracurricular activities, and more by setting up the stage lights, speakers and other equipment. Click the button below to view more detailed information about our auditorium.</p>
          <!-- <button class="applybtn moveup" @click="showTalentShowScreenTest">DEBUG</button> -->
          <button class="applybtn" @click="specsModalOpen = true">MORE INFO</button>
        </div>
        <div class="backgroundimg">
          <img src="./assets/board3.png" class="backgroundimg boardimgshift">
        </div>
        <div class="scrollReminder">
          <p>Scroll to see more</p>
        </div>
      </div>
      <div class="Screen section" v-if="showTalentShowScreen" id="Talent" ref="talentscreen">
        <div class="typographybg2" :class="{ oddtypographybg: aboutBoxIsOdd('talentscreen') }">
          <h1 class="bigtypography unselectable" :class="{ oddtypography: aboutBoxIsOdd('talentscreen') }">TALENT SHOW SIGNUPS</h1>
        </div>
        <div class="aboutbox selectable" :class="{ odd: aboutBoxIsOdd('talentscreen') }">
          <h1 class="clubname">TALENT SHOW REGISTRATION</h1>
          <br>
          <h2 class="gradient-text subheading2">Late December</h2>
          <p class="clubinfo">Our normal Winter Assembly has been replaced with a Talent Show! Click the button below to
            audition for an act!</p>
          <button class="applybtn" @click="openTalentModal" disabled="true">GOT TALENT?</button>
        </div>
        <div class="backgroundimg2">
          <img src="./assets/drumkit.png" class="backgroundimg2">
        </div>
      </div>
      <div class="Screen section" id="Upcoming" ref="upcomingscreen">
        <div class="typographybg" :class="{ oddtypographybg: aboutBoxIsOdd('upcomingscreen') }">
          <h1 class="bigtypography unselectable" :class="{ oddtypography: aboutBoxIsOdd('upcomingscreen') }">UP COMING EVENTS</h1>
        </div>
        <div class="aboutbox selectable" :class="{ odd: aboutBoxIsOdd('upcomingscreen') }">
          <h1 class="clubname">OUR UPCOMING SHOWS</h1>
          <br>
          <h2 class="gradient-text subheading2">CLICK SHOW FOR INFO</h2>
          <CurrentBookings class="clubinfo" @moreInfo="showGigInfo" />
          <!-- <button class="applybtn moveup">AUD SPECS</button> -->
          <!-- <button class="applybtn" @click="openBookingModal">BOOK US</button> -->
        </div>
        <div class="backgroundimg2">
          <img src="./assets/curtains.jpg" class="backgroundimg2">
        </div>
      </div>
      <div class="Screen section" id="Book" ref="bookscreen">
        <div class="typographybg" :class="{ oddtypographybg: aboutBoxIsOdd('bookscreen') }">
          <h1 class="bigtypography unselectable" :class="{ oddtypography: aboutBoxIsOdd('bookscreen') }">BOOK A VENUE</h1>
        </div>
        <div class="aboutbox selectable" :class="{ odd: aboutBoxIsOdd('bookscreen') }">
          <h1 class="clubname">BOOK OUR AUDITORIUM</h1>
          <br>
          <h2 class="gradient-text subheading2">LET'S RUN A SHOW!</h2>
          <p class="clubinfo">If you're looking for a space to run your show in the Etobicoke area, we have one of the best auditoriums. We've worked with several third party groups in the past and they all only have good things to say. If you're an in-school organization, you can book us for free.</p>
          <!-- <button class="applybtn moveup">AUD SPECS</button> -->
          <button class="applybtn" @click="openBookingModal">BOOK US</button>
        </div>
        <div class="backgroundimg2">
          <img src="./assets/aud.jpg" class="backgroundimg2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookForm from "./components/BookForm.vue"
import InfoModal from "./components/InfoModal.vue"
import TalentModal from "./components/TalentShowSignup.vue"
import SpecsModal from "./components/SpecsModal.vue"
import CurrentBookings from "./components/CurrentBookings.vue"

export default {
  name: 'App',
  components: {
    BookForm,
    InfoModal,
    TalentModal,
    SpecsModal,
    CurrentBookings
  },
  data() {
    return {
      bookingModalOpen: false,
      infoModalData: {},
      preventScrolling: false,
      talentModalOpen: false,
      specsModalOpen: false,
      orderOfScreens: []
    }
  },
  methods: {
    notReadyYet(title, text) {
      this.openInfoModal(title, text)
    },
    aboutBoxIsOdd(cref) {
        let index = this.orderOfScreens.findIndex(ref => ref == cref)
        if (index % 2 == 0) {
          return false
        } else {
          return true
        }
    },
    showGigInfo(gig) {
      this.infoModalData.open = true,
      this.infoModalData.header = gig.gigName
      let employeesNeeded
      if (gig.employeesNeeded < 0) {
        employeesNeeded = 'As many as possible'
      } else {
        employeesNeeded = gig.employeesNeeded
      }
      this.infoModalData.text = `Location: ${gig.gigLocation}`
      this.infoModalData.text2 = `Minimum AFC Staff Needed: ${employeesNeeded}`
    },
    openBookingModal() {
      this.bookingModalOpen = true
      this.preventScrolling = true
    },
    openTalentModal() {
      this.talentModalOpen = true
      this.preventScrolling = true
    },
    closeTalentModal() {
      this.talentModalOpen = false
      this.preventScrolling = false
    },
    closeBookingModal() {
      this.bookingModalOpen = false;
      this.preventScrolling = false
    },
    openInfoModal(header, text) {
      this.infoModalData.open = true
      this.preventScrolling = true
      this.infoModalData.header = header
      this.infoModalData.text = text
    },
    closeInfoModal() {
      this.infoModalData.open = false;
      this.preventScrolling = false
      this.infoModalData.text2 = ""
    },
  },
  watch: {
    preventScrolling: function() {
      if (this.preventScrolling) {
        return document.documentElement.style.overflow = 'hidden'
      } else {
        return [document.documentElement.style.overflow = 'auto', document.documentElement.style.overflowX = 'hidden']
      }
    },
  },
  mounted() {
      document.querySelectorAll("*").forEach((elem) => {
        elem.setAttribute('draggable', false)
        elem.addEventListener('dragstart', (event) => {
          event.preventDefault()
        })
      })

      this.orderOfScreens = Object.keys(this.$refs)
  },
  computed: {
    showTalentShowScreen() {
        let currentYear = new Date().getFullYear()
        let start = new Date(`${currentYear}-11-20`)
        let end = new Date(`${currentYear}-12-25`)
        let now = new Date()
        if (now > start && now < end) {
          return true
        }
        return false
    }
  }
}
</script>

<style>
@media only screen and (max-width: 800px) {
  .backgroundimg {
    display: none;
  }
  .backgroundimg2 {
    display: none;
  }
  .header {
    display: none !important;
  }
  li {
    display: none;
  }
  .navbox {
    display: none;
  }
  ul {
    display: none;
  }
  li p {
    display: none;
  }
  .scrollReminder {
    display: none;
  }
  .typographybg {
    display: none;
  }
  .typographybg2 {
    display: none;
  }
  .aboutbox {
    backdrop-filter: none !important;
    transform: scale(0.8) !important;
    left: 0 !important;
    right: 0 !important;
    margin: auto !important;
    margin-bottom: 100px !important;
    padding: 25px !important;
    top: 10% !important;
    width: 400px !important;
    height: 650px !important;
  }

  .flex-container {
    padding-bottom: 100px !important;
  }

  .aboutbox.odd {
    right: 0 !important;
    left: 0 !important;
    margin: auto !important;
  }

  .clubname {
    color: var(--mciafcorange);
    font-weight: 600;
    font-size: 50px !important;
    left: 0;
    position: absolute;
    right: 0;
    top: 10px;
  }

  .darkenbackground {
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: #19191980;
    animation: blur 200ms forwards ease-out;
    opacity: 1;
    position: fixed;
    margin: 0;
    top: 0;
    left: 0;
  }
  .bookModal {
    box-shadow:.8rem .8rem 1.4rem #151515,
                -.2rem -.2rem 1.8rem #222222;
    animation: fade-in 300ms forwards ease-out;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /* scale: 0.8; */
    text-align: center;
    height: 80% !important;
    width: 100% !important;
    background-color: #313131 !important;
    font-size: 16px;
    z-index: 20000000;
    padding: 0 !important;
    /* padding-left: 75px;
    padding-right: 75px; */
    border-radius: 3rem;
    overflow: auto !important;
  }
  .continuebutton.hidemobile {
    display: none !important;
  }

  .goback.hidemobile {
    display: none !important;
  }
  .pagenumber.hidemobile {
        display: none;
    }

  .fieldCheckText.hidemobile {
    display: none;
  }

  .fieldCheckText.mobile {
    position: fixed !important;
    /* transform: translateY(-115%) !important; */
    display: inline-block !important;
    z-index: 19999999;
    text-align: center;
    top: 3% !important;
  }

  .continuebutton.mobile {
    position: fixed !important;
    transform: translateY(115%) !important;
    display: block !important;
    z-index: 45000000000;
    bottom: -10 !important;
  }
  .goback.mobile {
    position: fixed !important;
    transform: translateX(-260%) !important;
    display: block !important;
    bottom: 1.5% !important;
    z-index: 45000000001;
  }
  /* .pagenumber.mobile {
    position: fixed !important;
    transform: translateX(5000%);
    bottom: 0;
    right: -100px !important;
    display: inline-block !important;
    z-index: 45000000001;
  } */
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;1,800&display=swap');

::-webkit-scrollbar {
    display: none;
    width: 0;
}

/* buttons.css */
button {
  animation: reverse-gradient 200ms forwards ease-out;
  background-size: 400% 400%;
  background-position: 0% 0%;
  background-image: linear-gradient(-45deg, rgb(229, 157, 22), #57acdc);
  border-radius: 0.3rem;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.596);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  max-width: fit-content;
  padding: 7px 18px;
}

button:hover {
  animation: gradient 200ms forwards ease-out;
  cursor: pointer;
}

#email {
  display: none;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
    bottom: 60px;
  }

  100% {
    background-position: 100% 50%;
    bottom: 65px;
  }
}

@keyframes reverse-gradient {
  0% {
    background-position: 100% 50%;
    bottom: 65px;
  }

  100% {
    background-position: 0% 50%;
    bottom: 60px;
  }
}

@keyframes scrollReminderPopIn {
  0% {
    transform: translateX(120%);
  }

  100% {
    transform: translateX(0%);
  }
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}


/* contactpagestyles.css */
.contact {
  align-self: center;
  text-align: center;
}

.wrappercontactpg {
  align-items: center;
  display: flex;
  justify-content: center;
}

/* global.css */
:root {
  /* general random colors */
  --mciafcmagenta: #e91e63;
  --mciafcdarkmagenta: #c21858;
  --mciafcpurple: #9c2780;
  --mciafcdeeppurple: #572780;
  --mciafcblue: #272ab0;
  --mciafcnavy: #276880;
  --mciafcmint: #57dcbe;
  --mciafcgreen: #60c689;
  /* main palette */
  --mciafcorange: rgb(229, 157, 22);
  --mciafcsky: #57acdc;
  --mciafcgray: #313030;
  --mciafcblack: #1a1a1a;
}

a {
  color: lightblue;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-decoration: none;
}

a:visited {
  color: lightblue;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
}




.unselectable {
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.selectable {
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -webkit-touch-callout: auto !important;
  -webkit-user-select: auto !important;
  user-select: auto !important;
}

.header {
  background-color: var(--mciafcblack);
  box-shadow: 0px 0px 20px rgba(12, 12, 12, 0.75);
  padding-top: 30px;
  display: block;
  align-content: center;
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 100;
}

/* .about {
  position: fixed;
  left: 30px;
  top: 26.5px;
}

.talent {
  position: fixed;
  left: 130px;
  top: 26.5px;
}

.book {
  position: fixed;
  left: 230px;
  top: 26.5px;
} */

/* header.css */
li {
  float: left;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
}

li p {
  color: white;
  display: block;
  padding-top: 0;
  text-align: center;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin: 0;
  position: absolute;
  top: 13px;
  overflow: hidden;
  padding: 0;
}

.navbox {
  display: flexbox;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  height: 60px;
  top: 0;
  left: 0;
}




/* initialscreen.css */

body {
  -ms-overflow-style: none;  /* IE and Edge */
  background-color: var(--mciafcblack);
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  margin-left: 0;
  margin-top: 0;
  overflow-x: hidden;
  scrollbar-width: none;  /* Firefox */
  z-index: 2;
}

.flex-container {
    display: flexbox;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 15%;
}


.flex-container > .Screen {
  position: relative;
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
}



/*
.secondScreen {
  display: flex;
  margin: 0;
  top: 115%;
  left: 0;
  height: 100%;
  width: 100%;
}

.thirdScreen {
  margin: 0;
  display: flex;
  top: 230%;
  left: 0;
  height: 100%;
  width: 100%;
} */



.clubname {
  color: var(--mciafcorange);
  font-weight: 600;
  font-size: 55px;
  left: 0;
  position: absolute;
  right: 0;
  top: 10px;
}

.backgroundimg {
  height: 100%;
  margin: 0;
  overflow: hidden;
  position: absolute;
  width: 1920px;
}

.applybtn {
  bottom: 60px;
  margin: auto;
  font-weight: 600;
  left: 0;
  max-width: fit-content;
  padding-top: 7px !important;
  padding-bottom: 7px !important;
  position: absolute;
  right: 0;
  scale: 1.5;
}

.moveup {
  bottom: 140px !important;
  transition: all 200ms !important;
}

.moveup:hover {
  transform: translateY(-5px)
}

.aboutbox {
  backdrop-filter: blur(4px);
  background-color: #191919c0;
  border-radius: 2rem;backdrop-filter: blur(4px);background-color: #191919c0;border-radius: 2rem;box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);height: 650px;left: 5%;line-height: 1.2;margin: 0;padding: 25px;position: absolute;text-align: center;top: 17.5%;width: 500px;z-index: 10;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  height: 650px;
  left: 5%;
  line-height: 1.2;
  margin: 0;
  padding: 25px;
  position: absolute;
  text-align: center;
  top: 17.5%;
  width: 500px;
  z-index: 10;
}

.clubinfo {
  font-size: 21.5px;
  font-weight: 200;
  left: 0;
  line-height: 1.5;
  margin: auto;
  position: absolute;
  right: 0;
  top: 36.5%;
  width: 400px;
}

.gradient-text {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(-45deg, rgb(229, 157, 22), #57acdc);
  background-size: 200% 200%;
  color: transparent;
}

.subheading {
  font-size: 40px;
  font-weight: 600;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 200px;
}



/* Scroll Reminder */

.scrollReminder {
  background-position: 100% 50%;
  background-size: 200% 200%;
  background: linear-gradient(-45deg, rgb(229, 157, 22), #57acdc);
  border-radius: 0.3rem;
  bottom: 30px;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  right: 30px;
  z-index: 1;
  /* animation: scrollReminderPopIn 600ms forwards 5000ms;
  transform: translateX(120%); */
}


.bigtypography {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(-45deg, rgb(229, 157, 22, 0.5), #57acdc);
  background-position: 50% 200%;
  background-size: 200% 200%;
  color: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 150px;
  font-style: italic;
  font-weight: 800;
  line-height: 1;
  opacity: 0.9;
  padding-left: 50%;
  text-shadow: 10px 5px 2px rgba(255, 255, 255);
}

.typographybg {
  height: fit-content;
  margin: 0;
  position: absolute;
  right: 5%;
  text-align: right;
  top: 20%;
  z-index: 2;
  width: fit-content;
}

.oddtypographybg {
  height: fit-content;
  margin: 0;
  position: absolute;
  left: 5%;
  text-align: left;
  top: 20%;
  width: fit-content;
}



/* secondscreen.css */

.odd {
  left: auto !important;
  right: 5% !important;
}

.backgroundimg2 {
  height: 100%;
  margin: 0;
  position: absolute;
  width: 1920px;
  z-index: -1;
}

.applybtn2 {
  bottom: 50px;
  left: 33%;
  position: absolute;
}

.subheading2 {
  font-size: 40px;
  font-weight: 600;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 200px;
}

.oddtypography {
  padding-left: 0;
  padding-right: 50% !important;
}

.typographybg2 {
  height: fit-content;
  margin: 0;
  position: absolute;
  left: 5%;
  text-align: left;
  top: 20%;
  width: fit-content;
}
</style>
