<template>
    <div class="crew-member-card">
        <div class="name-and-profile-picture">
            <p><v-lazy-image :src="getProfilePicture(user)" class="pfp" /></p>
            <div class="name-sector">
                <h3 class="userNames" :class="{ smallerNameFont: nameLength(user) }">{{ user.FirstName }} {{ user.LastName }} <span v-if="user._id == loggedInUser._id" class="you-signifier">YOU</span></h3>
                <div class="pronouns-position">
                    <p class="pronouns" v-if="user.memberInfo.pronouns != 'Unset' && user.memberInfo.pronouns != ''"><font-awesome-icon icon="fa-solid fa-user" :class="{ userIsExec: user.isExec }" /> {{ user.memberInfo.pronouns.toLowerCase() }}</p>
                    <p class="division-dot" v-if="user.memberInfo.pronouns != 'Unset' && user.memberInfo.pronouns != ''"> • </p>
                    <p class="position"><font-awesome-icon icon="fa-solid fa-user" v-if="user.memberInfo.pronouns == 'Unset' || user.memberInfo.pronouns == ''" :class="{ userIsExec: user.isExec }" /> {{ user.memberInfo.position.toLowerCase() }}</p>
                </div>
            </div>
            <br>
        </div>
        <div class="bio">
            <p>{{ userBio(user) }}</p>
        </div>
        <div class="socials">
            <a class="social-icon" :href="`mailto:${this.user.Email}`" target="__blank"><font-awesome-icon icon="fa-solid fa-envelope" /></a>
            <a class="social-icon" :href="`https://instagram.com/${this.user.memberInfo.socials.instagram}`" target="__blank" v-if="user.memberInfo.socials.instagram != null && user.memberInfo.socials.instagram != ''"><font-awesome-icon icon="fa-brands fa-instagram" /></a>
            <a class="social-icon" :href="`https://twitter.com/${this.user.memberInfo.socials.twitter}`" target="__blank" v-if="user.memberInfo.socials.twitter != null && user.memberInfo.socials.twitter != ''"><font-awesome-icon icon="fa-brands fa-twitter"  /></a>
            <a class="social-icon" :href="`https://facebook.com/${this.user.memberInfo.socials.facebook}`" target="__blank" v-if="user.memberInfo.socials.facebook != null && user.memberInfo.socials.facebook != ''"><font-awesome-icon icon="fa-brands fa-facebook" /></a>
            <a class="social-icon" :href="`https://linkedin.com/in/${this.user.memberInfo.socials.linkedin}`" target="__blank" v-if="user.memberInfo.socials.linkedin != null && user.memberInfo.socials.linkedin != ''"><font-awesome-icon icon="fa-brands fa-linkedin" /></a>
            <a class="social-icon" @click="this.$router.push(`/dash/user/${user._id}/edit`)" v-if="loggedInUser.Email == user.Email || loggedInUser.Email == 'execs@mciafc.com'"><font-awesome-icon icon="fa-solid fa-user-pen" /></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CrewMemberCard',
        props: {
            user: Object,
            loggedInUser: Object,
        },
        computed: {
            getProfilePicture() {
                return function(user) {
                    if (user.memberInfo.profilePicture == "null") {
                        return "default_pfp.jpg"
                    } else {
                        return "https://api.mciafc.com/crew/pfp/" + user.memberInfo.profilePicture
                    }
                }
            },
            userBio() {
                return function(user) {
                    if (user.memberInfo.bio == "Unset") {
                        return "This user has not set a bio yet."
                    } else {
                        return user.memberInfo.bio
                    }
                }
            },
            nameLength() {
                return function(user) {
                    if (user.FirstName.length + user.LastName.length >= 20) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }
</script>

<style lang="css" scoped>

.crew-member-card {
    width: 500px;
    height: 320px;
    background-color: #292929;
    padding-top: 15px;
    border-radius: 8px;
    margin-top: 0;
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

.pfp {
    width: 100px;
    height: 100px;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
}

.userNames {
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
}

.socials > * {
    margin-right: 10px;
    margin-left: 10px;
    color: var(--mciafcorange);
    cursor: pointer;
    transition: all 200ms;
}

.socials > *:hover {
    color: var(--mciafcsky);
    scale: 1.25;
    height: 25;
    width: 25;
}

.social-icon {
    height: 25px;
    width: 25px;
    margin-bottom: 5px;
}

.userIsExec {
    color: var(--mciafcorange)
}

.you-signifier {
    color: var(--mciafcsky);
    font-weight: 900;
}

@media (max-width: 500px) {
    .crew-member-card {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
    }
    .name-and-profile-picture {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}


</style>