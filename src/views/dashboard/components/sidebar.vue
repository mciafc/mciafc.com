<template>
    <div class="dashboard-sidebar">
        <ul style="height: 100%;">
            <li title="Controls">
                <p><a href="#controls"><font-awesome-icon icon="fa-solid fa-toggle-on" class="sidebar-item" /></a></p>
            </li>
            <li title="Events">
                <p><a href="#events"><font-awesome-icon icon="fa-solid fa-calendar" class="sidebar-item" /></a></p>
            </li>
            <li title="Featured Events" v-if="user.isExec">
                <p><a><font-awesome-icon icon="fa-solid fa-ticket" class="sidebar-item" /></a></p>
            </li>
            <li title="Crew">
                <p><a><font-awesome-icon v-if="user.isExec" icon="fa-solid fa-users-gear" class="sidebar-item" /><font-awesome-icon v-else icon="fa-solid fa-users" class="sidebar-item" /></a></p>
            </li>
            <li title="Talent Show" v-if="isTalentShowSeason()">
                <p><a><font-awesome-icon icon="fa-solid fa-star" class="sidebar-item" /></a></p>
            </li>
            <li title="General Website Content" v-if="user.isExec">
                <p><a><font-awesome-icon icon="fa-solid fa-globe" class="sidebar-item" /></a></p>
            </li>
            <li title="Sign Out" class="bottom-of-sidebar">
                <p><a><font-awesome-icon icon="fa-solid fa-right-from-bracket" class="sidebar-item" @click="logout()" /></a></p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "DashboardSidebar",
        props: {
            user: Object
        },
        emits: ['logoutRequest'],
        methods: {
            logout() {
                this.$emit('logoutRequest')
            }
        },
        computed: {
            isTalentShowSeason() {
                return () => {
                    let now = new Date()
                    let month = now.getMonth()
                    // if it's between november and december, it's talent show season
                    if (month >= 11 && month <= 12) {
                        return true
                    } else {
                        return false
                    }
                }
            },
        }
    }
</script>

<style lang="css" scoped>
a.dashboard-sidebar {
  color: var(--mciafcorange);
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms;
  margin-bottom: 0px;
  border-radius: 3px;
}

p.dashboard-sidebar {
  margin-bottom: 0;
}

.dashboard-sidebar {
    z-index: 10;
    display: flex;
    flex-wrap: nowrap;
    top: 50px;
    text-align: center;
    justify-content: center;
    right: 0;
    width: 50px;
    height: 100vh;
    position: fixed;
    background-color: var(--bgcolor);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.sidebar-item {
  transition: all 100ms;
  cursor: pointer;
  padding: 5px;
  padding-bottom: 0;
  padding-left: 0;
  transition: all 200ms;
  width: 18px;
  height: 18px;
}

.sidebar-item:hover {
  color: var(--mciafcsky);
  transition: all 200ms;
  scale: 1.2;
}

.bottom-of-sidebar {
    position: absolute;
    bottom: 40px;
}
</style>