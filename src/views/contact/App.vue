<template>
    <div class="contact">
        <div class="banner">
            <h1 class="title">GET IN CONTACT</h1>
            <v-lazy-image src="contact_banner.jpg" alt="Banner image of the Auditorium Cabinet" class="banner-image" />
        </div>
        <div class="centerer">
            <div class="contact-container">
                <h1 class="contact-header">General Inquiry & Booking</h1>
                <p class="contact-subtext">For general inquiries and third party booking, please contact <a class="hoverable" href="mailto:execs@mciafc.com" target="__blank">execs@mciafc.com</a>. This will get your message across to all Senior Executive members. Please allow up to 24 hours for a response.</p>
                <h1 class="contact-header">Staff Advisor</h1>
                <p class="contact-subtext">If you need to talk to somebody who has connections to the school administration, your best bet is by talking to our Staff Advisor.</p>
                <transition name="fade" mode="out-in">
                    <MemberCard class="card" :user="findStaffAdvisor(execs.execs)" :loggedInUser="fakeuser" v-if="execsLoaded" key="0"></MemberCard><skeletonmembercard key="1" v-else />
                </transition>
                <h1 class="contact-header">Student Executives</h1>
                <p class="contact-subtext">If you need to contact a specific Senior Executive member, their contact information is below.</p>
                <transition name="fade" mode="out-in">
                    <div class="exec-contact-info-container" v-if="execsLoaded" key="0">
                        <MemberCard class="card" v-for="exec in sortCrew(execs.execs).slice(1)" :user="exec" :key="exec.id" :loggedInUser="fakeuser" />
                    </div>
                    <div class="exec-contact-info-container" v-else key="1">
                        <skeletonmembercard v-for="n in 6" :key="n" />
                    </div>
                </transition>
                <h1 class="contact-header">Website Contact</h1>
                <p class="contact-subtext">For questions, comments, concerns, quips, quibbles, conundrums, or connections relating to the AFC website, reach our Web Director <a class="hoverable" href="mailto:webadmin@mciafc.com">webadmin@mciafc.com</a>. This email should only be used for website conerns.</p>
                <transition name="fade" mode="out-in">
                    <MemberCard key="0" class="card" :user="findWebmaster(execs.execs)" :loggedInUser="fakeuser" v-if="execsLoaded"></MemberCard><skeletonmembercard key="1" v-else />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import MemberCard from '../dashboard/components/tools/crew/components/membercard.vue'
import skeletonmembercard from '../dashboard/components/tools/crew/components/skeletonmembercard.vue'

import io from "socket.io-client"
    export default {
        name: 'ContactPage',
        components: {
            MemberCard,
            skeletonmembercard
        },
        data() {
            return {
                execs: [],
                execsLoaded: false,
                socket: null,
                fakeuser: {
                    Email: "notsignedin@mciafc.com",
                    isExec: false
                }
            }
        },
        created() {
            this.socket = io('https://io.mciafc.com/crew')
            this.socket.emit("getCrew")
        },
        mounted() {
            this.socket.on('crew', (data) => {
                console.log(data)
                this.execs = data
                console.log(this.execs)
                this.execsLoaded = true
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

                    return crew.sort((a, b) => {
                        // Sort by role position
                        const positionComparison = positionHierarchy[a.memberInfo.position] - positionHierarchy[b.memberInfo.position]
                        if (positionComparison !== 0) {
                            return positionComparison
                        }
                        // Sort by last name
                        const lastNameComparison = a.LastName.localeCompare(b.LastName)
                        if (lastNameComparison !== 0) {
                            return lastNameComparison
                        }
                        // Sort by first name
                        return a.FirstName.localeCompare(b.FirstName)
                    })

                }
        },
        findWebmaster() {
            return (crew) => {
                // get a list of all the webmasters
                let webmasters = crew.filter((member) => {
                    return member.FirstName == "Caleb" && member.LastName == "Brown"
                })
                // return the first webmaster in the list
                let webmaster = webmasters[0]
                return webmaster
            }
        },
        findStaffAdvisor() {
            return (crew) => {
                // get a list of all the staff advisors
                let staffAdvisors = crew.filter((member) => {
                    return member.memberInfo.position == "Staff Advisor"
                })
                // return the first staff advisor in the list
                let staffAdvisor = staffAdvisors[0]
                return staffAdvisor
            }
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
    margin-bottom: 30px;
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

.contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85%;
    margin-bottom: 30px;
    text-align: center;
}
.centerer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.exec-contact-info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

.contact-header {
    font-size: 2.3em;
    margin-bottom: 0;
}

.contact-subtext {
    margin-top: 10px;
    font-size: 1.2em;
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

a.hoverable:hover {
    color: var(--mciafcsky);
    transition: all 200ms;
}

@media (max-width:960px) {
    .title {
        font-size: 2.5em;
    }
    .presents {
        font-size: 1.5em;
    }
}
</style>