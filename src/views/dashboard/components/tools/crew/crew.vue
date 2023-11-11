<template>
    <div class="dashboard-section">
        <h2 class="section-header">Crew Management</h2>
        <p class="section-subtitle">View and manage crew members</p>
        <div class="membercards">
            <h1>Execs</h1>
            <transition name="fade" mode="out-in">
                <div v-if="crew.length != 0" key="5" class="card-container-container">
                    <div v-if="crew.length != 0" key="1" class="membercards">
                        <CrewMemberCard v-for="(crewmember, index) in sortCrew(crew.execs)" :key="index" :user="crewmember" :loggedInUser="user" />
                    </div>
                    <div v-else key="3" class="membercards">
                        <CrewMemberCardSkeleton v-for="n in 9" :key="n" />
                    </div>
                    <h1>Goons</h1>
                    <font-awesome-icon icon="fa-user-plus" v-if="user.isExec" class="new-goon-button" />
                    <br>
                    <div v-if="crew.length != 0" key="2" class="membercards">
                        <CrewMemberCard v-for="(crewmember, index) in sortCrew(crew.members)" :key="index" :user="crewmember" :loggedInUser="user" />
                    </div>
                    <div v-else key="4" class="membercards">
                        <CrewMemberCardSkeleton v-for="n in 9" :key="n" />
                    </div>
                </div>
                <div v-else key="6">
                    <div key="3" class="membercards">
                        <CrewMemberCardSkeleton v-for="n in 9" :key="n" />
                    </div>
                    <h1>Members</h1>
                    <div key="4" class="membercards">
                        <CrewMemberCardSkeleton v-for="n in 9" :key="n" />
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import CrewMemberCard from './components/membercard.vue'
import CrewMemberCardSkeleton from './components/skeletonmembercard.vue'
import io from 'socket.io-client'

    export default {
        name: 'DashboardControls',
        components: {
            CrewMemberCard,
            CrewMemberCardSkeleton
        },
        props: {
            user: Object
        },
        data() {
            return {
                socket: null,
                connected: false,
                authenticated: false,
                crew: [],
            }
        },
        created() {
            this.socket = io('https://io.mciafc.com/crew', {
                pin: this.user.pin
            })
        },
        mounted() {
            this.socket.on('connect', () => {
                this.connected = true;
            })

            this.socket.on('getSocketPin', () => {
                this.socket.emit('socketPin', this.user.PIN)
            })

            this.socket.on('successfulAuthentication', () => {
                this.authenticated = true;
                this.socket.emit('getCrew')
            })
            this.socket.on('crew', data => {
                console.log(data)
                this.crew = data
            })
        },
        computed: {
            sortCrew() {
                return (crew) => {
                    // first sort crew by role positions.
                    // then sort by last name
                    // then sort by first name
                    // valid crew positions in order of highest to lowest:
                    const positionHierarchy = {
                        'Staff Advisor': 0,
                        'President': 1,
                        'Co-President': 2,
                        'Vice President': 3,
                        'Exec': 4,
                        'Member': 5,
                        'Webmaster': 6,
                    }

                    let sortedList = crew
                    // sort by first name
                    sortedList = sortedList.sort((a, b) => {
                        if (a.FirstName < b.FirstName) {
                            return -1
                        } else if (a.FirstName > b.FirstName) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    // sort by last name
                    sortedList = sortedList.sort((a, b) => {
                        if (a.LastName < b.LastName) {
                            return -1
                        } else if (a.LastName > b.LastName) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    // sort by role position
                    sortedList = sortedList.sort((a, b) => {
                        return positionHierarchy[a.memberInfo.position] - positionHierarchy[b.memberInfo.position]
                    })
                    return sortedList
                    
                }
            }
        }
    }
</script>

<style lang="css" scoped>
@import '@/assets/dashboard-global-styles.css';

.membercards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    float: left;
    gap: 10px;
}

.card-container-container {
    display: flex;
    flex-direction: column;
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

.new-goon-button {
    font-size: 1.5em;
    margin-bottom: 30px;
    color: var(--mciafcorange);
    cursor: pointer;
    transition: all 200ms;
}

.new-goon-button:hover {
    color: var(--mciafcsky);
    scale: 1.25;
}


</style>