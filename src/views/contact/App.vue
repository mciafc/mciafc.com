<template>
    <div class="contact">
        <div class="banner">
            <h1 class="title">GET IN CONTACT</h1>
            <img src="contact_banner.jpg" alt="Banner image of the Auditorium Cabinet" class="banner-image">
        </div>
        <div class="centerer">
            <div class="contact-container">
                <h1 class="contact-header">General Inquiry, Booking</h1>
                <p class="contact-subtext">For general inquiries and third party booking, please contact <a class="hoverable" href="mailto:execs@mciafc.com" target="__blank">execs@mciafc.com</a>. This will get your message across to all Senior Executive members. Please allow up to 24 hours for a response.</p>
                <h1 class="contact-header">Exec Contact</h1>
                <p class="contact-subtext">If you need to contact a specific Senior Executive member, their contact information is below.</p>
                <div class="exec-contact-info-container" v-if="execsLoaded">
                    <MemberCard v-for="exec in sortCrew(execs.execs)" :user="exec" :key="exec.id" :loggedInUser="fakeuser" />
                </div>
                <h1 class="contact-header">Website Contact</h1>
                <p class="contact-subtext">For questions, comments, concerns, quips, quibbles, conundrums, or connections relating to the AFC website, reach our Web Director <a class="hoverable" href="mailto:webadmin@mciafc.com">webadmin@mciafc.com</a>. This email should only be used for website conerns.</p>
                <MemberCard :user="findWebmaster(execs.execs)" :loggedInUser="fakeuser" v-if="execsLoaded"></MemberCard>
            </div>
        </div>
    </div>
</template>

<script>
import MemberCard from '../dashboard/components/tools/crew/components/membercard.vue'
import io from "socket.io-client"
    export default {
        name: 'ContactPage',
        components: {
            MemberCard
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
                    // Remove the Webmaster from the list of members
                    crew = crew.filter((member) => {
                        return member.memberInfo.position !== 'Webmaster'
                    })

                    let sortedList = []
                    // sort by first name
                    sortedList = crew.sort((a, b) => {
                        if (a.FirstName < b.FirstName) {
                            return -1
                        } else if (a.FirstName > b.FirstName) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    // sort by last name
                    sortedList = crew.sort((a, b) => {
                        if (a.LastName < b.LastName) {
                            return -1
                        } else if (a.LastName > b.LastName) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    // sort by role position
                    sortedList = crew.sort((a, b) => {
                        return positionHierarchy[a.memberInfo.position] - positionHierarchy[b.memberInfo.position]
                    })
                    return sortedList
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
                console.log(webmaster)
                console.log(webmasters)
                return webmaster
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
    width: 800px;
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