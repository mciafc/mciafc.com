<template>
  <header class="header unselectable">
    <ul class="navbar">
      <div class="navbox">
        <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/')">Home</a></p>
        </li>
        <li class="nav-item" v-if="isTalentShowSeason()">
          <p><a class="navbar" @click="this.$router.push('/talent')">Talent Show</a></p>
        </li>
        <li class="nav-item">
          <p class="navbar"><a class="navbar" @click="this.$router.push('/auditorium')">Our Auditorium</a></p>
        </li>
        <!-- <li class="nav-item">
          <p><a class="navbar">Crew</a></p> 
        </li> -->
        <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/book')">Book</a></p>
        </li>
        <li>
          <p><a class="navbar" @click="this.$router.push('/contact')">Contact</a></p>
        </li>
        <!-- <li class="nav-item">
          <p><a class="navbar">Support Us</a></p>
        </li> -->
        <li class="nav-item right-side " title="Sign in">
          <p><a><font-awesome-icon class="signin-icon" :icon="changeLoginIcon(user)" @click="loginpage()" /></a></p>
        </li>
      </div>
    </ul>
  </header>
  <div v-if="status_header != '' && status_header != null">
    <header class="unselectable status-header">
      <div class="status-container">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
        <p>{{ status_header }} <a class="black-link" href="https://martingroveafc.statuspage.io" target="__blank">View Status</a></p>
      </div>
    </header>
  </div>
  <div :class="{ buffer: isStatusHeaderActive() }">
    <router-view class="view" v-slot="{ Component, route }" @login="logUserIn" @logoutRequest="logUserOut" :user="user">
      <Transition :name="route.meta.transition || 'slide-fade'" :mode=" route.meta.transitionmode || 'out-in'">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
  </div>
  <footer class="footer">
      <div class="footer-section">
        <p class="footer-heading">Explore</p>
        <a class="footer-link" @click="this.$router.push('/auditorium')">Auditorium</a>
        <a class="footer-link" @click="this.$router.push('/book')">Book</a>
      </div>
      <div class="footer-section">
        <p class="footer-heading">Contacts</p>
        <a class="footer-text">50 Winterton Dr</a>
        <a class="footer-link" @click="this.$router.push('/contact')">Contact</a>
        <!-- <a class="footer-link">Donate</a> -->
      </div>
      <div class="footer-section connect-section">
        <p class="footer-heading">Connect</p>
        <a class="footer-link" href="https://instagram.com/mci.afc" target="__blank"><font-awesome-icon icon="fa-brands fa-instagram" /></a>
        <a class="footer-link" href="https://www.youtube.com/@mciafc" target="__blank"><font-awesome-icon icon="fa-brands fa-youtube" /></a>
      </div>
      <div class="footer-section general-info right-side">
        <p class="footer-heading">Site Info</p>
        <p class="footer-text">Created & managed by <a class="footer-link" href="https://github.com/carreb" target="__blank"><font-awesome-icon icon-="fa-brands fa-github" />claire</a></p>
        <a class="footer-link" href="mailto:webadmin@mciafc.com">Web Admin Contact</a>
      </div>
  </footer>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      dropdownVisible: null,
      user: null,
      status_header: null
    }
  },
  methods: {
    loginpage() {
      if (this.user == null) {
        this.$router.push('/login')
      } else {
        this.$router.push('/dash')
      }
    },
    logUserIn(user) {
      this.user = user
      console.log(this.user)
      this.$router.push('/dash')
    },
    logUserOut() {
      this.$router.push('/')
      this.user = null
    }
  },
  mounted() {
    fetch('https://api.mciafc.com/web')
      .then(response => response.json())
      .then(data => {
        this.status_header = data.status_header
      })
  },
  computed: {
    changeLoginIcon() {
      return function(user) {
        if (user == null) {
          return "fa-solid fa-user"
        } else {
          return "fa-solid fa-toolbox"
        }
      }
    },
    isTalentShowSeason() {
      return function() {
        let month = new Date().getMonth()
        if (month == 10 || month == 11) {
          return true
        } else {
          return false
        }
      }
    },
    isStatusHeaderActive() {
      return function() {
        if (this.status_header != '' && this.status_header != null) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap');

* {
  font-family: "Inter", sans-serif;
}
h1, h2, h3, h4 {
  font-family: 'Josefin Sans', sans-serif !important;
}

.view {
  min-height: 98vh;
  margin: 0;
}

.buffer {
  padding-top: 50px;
}

body {
  margin-left: 0;
  margin-top: 0;
  background-color: var(--bgcolor);
  color: #ffffff;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.unselectable {
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.clickable {
  cursor: pointer;
}

.header {
  background-color: var(--bgcolor);
  box-shadow: 0px 0px 20px rgba(12, 12, 12, 0.75);
  display: block;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 1000000;
  font-weight: 600;
  overflow-x: auto;
  overflow-y: hidden;
}

.status-header {
  background-color: #ffd000;
  color: #000000;
  box-shadow: 0px 0px 20px rgba(12, 12, 12, 0.75);
  display: block;
  position: fixed;
  top: 50px;
  width: 100%;
  height: 50px;
  z-index: 1000000;
  font-weight: 400;
  overflow-x: auto;
  overflow-y: hidden;
}

.status-container {
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  text-wrap: nowrap;
}

.nav-item {
  width: fit-content;
  text-wrap: nowrap;
  white-space: nowrap;
  margin-bottom: 15px;
}

.right-side {
  margin-left: auto;
  text-align: center;
}

.signin-icon {
  transition: all 100ms;
}

.signin-icon:hover {
  color: var(--mciafcsky);
  font-size: 1.1em;
}


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
  overflow: hidden;
  padding: 0;
  width: 100%;
}

.navbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
}

a.navbar {
  color: var(--mciafcorange);
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms;
  padding: 10px;
  margin-bottom: 0px;
  border-radius: 3px;
}

p.navbar {
  margin-bottom: 0;
}

a {
  color: var(--mciafcorange);
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms;
}

a.navbar:hover {
  background-color: var(--mciafcsky);
  color: #ffffff;
}

.view {
  margin-top: 50px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: 200ms ease all;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

.footer {
  background-color: #191919;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  gap: 10px;
  bottom: 0;
  width: 100%;
  margin-top: 50px;
  height: 100px;
  z-index: 1000000;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  overflow-x: auto;
}

.footer-section {
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-left: 10px;
  padding-right: 10px;
}

.footer-text {
  color: #ffffff;
  font-size: 0.9em;
  margin-bottom: 0;
  cursor:unset;
  font-weight: 500;
}

.footer-link {
  color: var(--mciafcorange);
  font-size: 1em;
  margin-bottom: 0;
  transition: all 200ms;
}

.footer-link:hover {
  color: var(--mciafcsky);
  scale: 1.1;
}

.footer-heading {
  font-size: 1.2em;
  margin-bottom: 0;
  font-family: 'Josefin Sans', sans-serif !important;
  font-weight: 700;
}

.connect-section {
  flex-direction: column;
  align-items: center;
}
.connect-section > .footer-link {
  font-size: 1.2em;
}
.footer-section.general-info {
  opacity: 0.25;
  align-self: right;
  align-items: right;
  margin-right: 10px;
  width: 300px;
}

.black-link {
  color: #000000;
  font-weight: 600;
  text-decoration: underline;
}
</style>