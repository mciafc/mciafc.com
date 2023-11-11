<template>
    <div>
        <transition name="modal">
            <div class="selecteduser-card-modal" v-if="selecteduser != null" key="2">
                <div class="name-and-profile-picture">
                    <profilepicture :user="selecteduser" :loggedInUser="user" ref="pfp" />
                    <div class="name-sector">
                        <h3 class="selecteduserNames" :class="{ smallerNameFont: nameLength(selecteduser) }">{{ selecteduser.FirstName }} {{ selecteduser.LastName }}</h3>
                        <div class="pronouns-position">
                            <p class="pronouns"><font-awesome-icon icon="fa-solid fa-user" :class="{ selecteduserIsExec: selectedusermodel.isExec, editPosition: allowedToEditPosition(user) }" class="execToggle" title="Toggle Exec Status (If your role is high enough)" @click="toggleExecStatus()" /> <input type="text" class="pronouns-input" max="15" v-model="selectedusermodel.pronouns" placeholder="pro/nouns"> </p>
                            <p class="division-dot"> • </p>
                            <p class="position" v-if="!allowedToEditPosition()">{{ selecteduser.memberInfo.position.toLowerCase() }}</p>
                            <p v-else><select v-model="selectedusermodel.position" class="position-selector">
                                <option v-for="(position, index) in positionsYouAreAllowedToGiveOut()" :value="position" :key="index">{{ position }}</option>
                            </select></p>
                        </div>
                    </div>
                    <br>
                </div>
                <div class="bio">
                    <textarea v-model="selectedusermodel.bio" class="bio-textarea" maxlength="240" placeholder="your bio should go here. 240 character limit." />
                </div>
                <div class="socials">
                    <a class="social-icon"><font-awesome-icon icon="fa-brands fa-instagram" /></a> <input type="text" class="social-input" v-model="selectedusermodel.socials.instagram" placeholder="your instagram handle (exclude the '@')" maxlength="30">
                    <a class="social-icon"><font-awesome-icon icon="fa-brands fa-twitter"  /></a> <input type="text" class="social-input" v-model="selectedusermodel.socials.twitter" placeholder="your twitter handle (exclude the '@')" maxlength="15">
                    <a class="social-icon"><font-awesome-icon icon="fa-brands fa-facebook" /></a> <input type="text" class="social-input" v-model="selectedusermodel.socials.facebook" placeholder="your facebook tag (facebook.com/[this part])" maxlength="50">
                    <a class="social-icon"><font-awesome-icon icon="fa-brands fa-linkedin" /></a> <input type="text" class="social-input" v-model="selectedusermodel.socials.linkedin" placeholder="your linkedin tag (linkedin.com/in/[this part])" maxlength="100">
                </div>
                <button @click="saveData()">SAVE CHANGES</button>
            </div>
            <div v-else key="1">
                <h1>Fetching user card...</h1>
                <p>If this is visible for an extended period of time, there may be a problem.</p>
                <p>Try again, if it doesn't work, contact webmaster@mciafc.com</p>
                <p>When contacting, mention: USER_API_ERROR</p>
                <p>thanks c:</p>
            </div>
        </transition>
        <Backdrop />
    </div>
</template>

<script>
import Backdrop from './components/backdrop.vue'
import profilepicture from './components/profilepicture.vue'

    export default {
        data() {
            return {
                selecteduser: null,
                selectedusermodel: {
                    bio: null,
                    position: null,
                    pronouns: null,
                    isExec: null,
                    socials: {
                        instagram: null,
                        twitter: null,
                        facebook: null,
                        linkedin: null
                    }
                }
            }
        },
        props: {
            user: Object
        },
        components: {
            Backdrop,
            profilepicture
        },
        methods: {
            toggleExecStatus() {
                console.log(this.allowedToEditPosition())
                if (this.allowedToEditPosition()) {
                    return this.selectedusermodel.isExec = !this.selectedusermodel.isExec
                }
            },
            saveData() {
                fetch(`https://api.mciafc.com/crew/update/${this.selecteduser._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        isExec: this.selectedusermodel.isExec,
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetch(`https://api.mciafc.com/crew/updatememberinfo/id/${this.selecteduser._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bio: this.selectedusermodel.bio,
                            position: this.selectedusermodel.position,
                            pronouns: this.selectedusermodel.pronouns,
                            socials: {
                                instagram: this.selectedusermodel.socials.instagram,
                                twitter: this.selectedusermodel.socials.twitter,
                                facebook: this.selectedusermodel.socials.facebook,
                                linkedin: this.selectedusermodel.socials.linkedin
                            }
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (this.$refs.pfp.image != null) {
                            fetch(`http://localhost:4452/files/crew/up/pfp/${this.selecteduser._id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: `${this.selecteduser._id}-profile-${new Date().getTime()}.png`,
                                    file: this.$refs.pfp.image,
                                    uploader: this.user
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                this.$router.push('/dash')
                            })
                        }
                    })
                })
            }
        },
        mounted() {
            fetch('https://api.mciafc.com/crew')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let execSearch = data.execs.find(exec => exec._id == this.$route.params.id)
                if (execSearch != undefined) {
                    this.selecteduser = execSearch
                    // define the selecteduser model for dynamic text areas
                    this.selectedusermodel.bio = this.selecteduser.memberInfo.bio
                    this.selectedusermodel.position = this.selecteduser.memberInfo.position
                    this.selectedusermodel.pronouns = this.selecteduser.memberInfo.pronouns
                    this.selectedusermodel.socials.instagram = this.selecteduser.memberInfo.socials.instagram
                    this.selectedusermodel.socials.twitter = this.selecteduser.memberInfo.socials.twitter
                    this.selectedusermodel.socials.facebook = this.selecteduser.memberInfo.socials.facebook
                    this.selectedusermodel.socials.linkedin = this.selecteduser.memberInfo.socials.linkedin
                    this.selectedusermodel.isExec = this.selecteduser.isExec
                    return
                }
                this.selecteduser = data.members.find(member => member._id == this.$route.params.id)
                // define the selecteduser model for dynamic text areas
                this.selectedusermodel.bio = this.selecteduser.memberInfo.bio
                this.selectedusermodel.position = this.selecteduser.memberInfo.position
                this.selectedusermodel.pronouns = this.selecteduser.memberInfo.pronouns
                this.selectedusermodel.socials.instagram = this.selecteduser.memberInfo.socials.instagram
                this.selectedusermodel.socials.twitter = this.selecteduser.memberInfo.socials.twitter
                this.selectedusermodel.socials.facebook = this.selecteduser.memberInfo.socials.facebook
                this.selectedusermodel.socials.linkedin = this.selecteduser.memberInfo.socials.linkedin
                this.selectedusermodel.isExec = this.selecteduser.isExec
            })
        },
        computed: {
            getProfilePicture() {
                return function(selecteduser) {
                    if (selecteduser.memberInfo.profilePicture == "null") {
                        return "https://via.placeholder.com/250x250"
                    } else {
                        return selecteduser.memberInfo.profilePicture
                    }
                }
            },
            selecteduserBio() {
                return function(selecteduser) {
                    if (selecteduser.memberInfo.bio == "Unset") {
                        return "This selecteduser has not set a bio yet."
                    } else {
                        return selecteduser.memberInfo.bio
                    }
                }
            },
            nameLength() {
                return function(selecteduser) {
                    if (selecteduser.FirstName.length + selecteduser.LastName.length >= 20) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            positionsYouAreAllowedToGiveOut() {
                return function() {
                    if (this.user.isExec) {
                        // there is a hierarchy of positions that can be given out
                        // if you are the president, you can give out any position except staff advisor
                        // you can only give out positions that are below your position
                        // the heirarchy is as follows:
                        const positionHierarchy = {
                            'Staff Advisor': 0,
                            'President': 1,
                            'Co-President': 2,
                            'Vice President': 3,
                            'Exec': 4,
                            'Member': 5,
                            'Webmaster': -1,
                        }
                        // get the position of the user
                        let userPosition = this.user.memberInfo.position
                        // create an array of positions that are below the user's position
                        let positionsBelowUser = []
                        for (let position in positionHierarchy) {
                            if (positionHierarchy[position] >= positionHierarchy[userPosition]) {
                                positionsBelowUser.push(position)
                            }
                        }
                        // return the array of positions that are below the user's position
                        return positionsBelowUser
                    }
                    return []
                }
            },
            allowedToEditPosition() {
                return function(user) {
                    if (isExec) {
                        const positionHierarchy = {
                            'Staff Advisor': 0,
                            'President': 1,
                            'Co-President': 2,
                            'Vice President': 3,
                            'Exec': 4,
                            'Member': 5,
                            'Webmaster': -1,
                        }
                        // get the position of the user
                        let userPosition = this.user.memberInfo.position
                        // get the position of the selecteduser
                        let selecteduserPosition = this.selecteduser.memberInfo.position

                        if (['Staff Advisor', 'President', 'Co-President', 'Vice President'].includes(userPosition)) {
                            return positionHierarchy[selecteduserPosition] > positionHierarchy[userPosition]
                        }
                    }
                    return false
                }
            }
        }
    }
</script>

<style lang="css" scoped>
.selecteduser-card-modal {
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #292929;
    width: 500px;
    height: 550px;
    z-index: 100;
    padding-top: 15px;
    border-radius: 8px;
    text-align: center;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.name-and-profile-picture {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
    float: right;
}

.name-sector {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
}

.selecteduserNames {
    font-size: 30px;
    font-weight: 900;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    margin-bottom: 0;
    margin-top: 15px;
}

.smallerNameFont {
    font-size: 25px;
}

.pronouns-position {
    color: #c7c7c7;
    display: flex;
    grid-column: 2;
    margin-top: 0;
}

.pronouns-position > * {
    margin-right: 5px;
}

.bio {
    padding: 10px;
}

.socials {
    font-size: 25px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.socials > a {
    margin-right: 10px;
    margin-left: 10px;
    color: var(--mciafcorange);
    transition: all 200ms;
    cursor: default;
}

.social-icon {
    height: 25px;
    width: 25px;
    margin-bottom: 5px;
}

.selecteduserIsExec {
    color: var(--mciafcorange)
}

.you-signifier {
    color: var(--mciafcsky);
    font-weight: 900;
}

.bio-textarea {
    width: 400px;
    height: 100px;
    resize: none;
    text-align: center;
}

.social-input {
    width: 300px;
    text-align: center;
}

.pronouns-input {
    width: 75px;
    text-align: center;
}

.position-selector {
    height: 25px;
}

.editPosition {
    cursor: pointer;
    transition: all 200ms;
}

.editPosition:hover {
    scale: 1.5;
}
</style>