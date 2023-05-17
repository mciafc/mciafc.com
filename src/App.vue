<template>
  <header class="header unselectable">
    <ul>
      <div class="navbox">
        <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/')">Home</a></p>
        </li>
        <li class="nav-item">
          <p class="navbar"><a class="navbar" @click="this.$router.push('/auditorium')">Our Auditorium</a></p>
        </li>
        <li class="nav-item">
          <p><a class="navbar">About Us <font-awesome-icon icon="fa-solid fa-caret-down" /></a></p>
        </li>
        <li class="nav-item">
          <p><a class="navbar">Book <font-awesome-icon icon="fa-solid fa-caret-down" /></a></p>
        </li>
        <li class="nav-item">
          <p><a class="navbar">Support Us</a></p>
        </li>
        <li class="nav-item right-side " title="Sign in">
          <p><a><font-awesome-icon class="signin-icon" icon="fa-solid fa-user" @click="loginpage()" /></a></p>
        </li>
      </div>
    </ul>
    <div class="dropdown projects" v-if="dropdownVisible == 'projects'">
      <div class="dropdownitem">
        <p>web</p>
      </div>
    </div>
  </header>
  <router-view class="view" v-slot="{ Component, route }" @login="logUserIn" :user="user">
    <Transition name="slide-fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </Transition>
  </router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      dropdownVisible: null,
      user: null
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
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

* {
  font-family: "Inter", sans-serif;
}

body {
  margin-left: 0;
  margin-top: 0;
  overflow-x: hidden;
  background-color: var(--bgcolor);
  color: #ffffff;
}

html {
  scroll-behavior: smooth;
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
}

.nav-item {
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
  margin-top: 75px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: 300ms ease all;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-60px)
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(60px)
}</style>