<template>
    <div class="crew-member-card">
        <div class="name-and-profile-picture">
            <p><img src="https://via.placeholder.com/250x250" class="pfp"></p>
            <div class="name-sector">
                <h3 class="userNames">Firstname Lastname</h3>
                <div class="pronouns-position">
                    <p class="pronouns"><font-awesome-icon icon="fa-solid fa-user" /> abc/def</p>
                    <p class="division-dot"> • </p>
                    <p class="position">member</p>
                </div>
            </div>
            <br>
        </div>
        <div class="bio">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, doloremque?</p>
        </div>
        <div class="socials">
            <a class="social-icon"><font-awesome-icon icon="fa-solid fa-envelope" /></a>
            <a class="social-icon"><font-awesome-icon
                    icon="fa-brands fa-instagram" /></a>
            <a class="social-icon"><font-awesome-icon
                    icon="fa-brands fa-twitter" /></a>
            <a class="social-icon"><font-awesome-icon
                    icon="fa-brands fa-facebook" /></a>
            <a class="social-icon"><font-awesome-icon
                    icon="fa-brands fa-linkedin" /></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CrewMemberCardSkeleton',
    computed: {
        getProfilePicture() {
            return function (user) {
                if (user.memberInfo.profilePicture == "null") {
                    return "https://via.placeholder.com/250x250"
                } else {
                    return user.memberInfo.profilePicture
                }
            }
        },
        userBio() {
            return function (user) {
                if (user.memberInfo.bio == "Unset") {
                    return "This user has not set a bio yet."
                } else {
                    return user.memberInfo.bio
                }
            }
        },
        nameLength() {
            return function (user) {
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
@import url('https://fonts.googleapis.com/css2?family=Flow+Circular&display=swap');

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
    font-family: 'Flow Circular', cursive;
}

.crew-member-card > * {
    font-family: 'Flow Circular', cursive;
    font-weight: 400;
}

.name-and-profile-picture {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
    float: right;
    font-family: 'Flow Circular', cursive;
    animation: opacityhover 750ms infinite alternate;

}

.name-sector {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Flow Circular', cursive;
    margin-left: 10px;
}

.pfp {
    width: 100px;
    height: 100px;
    vertical-align: middle;
    border-radius: 50%;
    animation: opacityhover 750ms infinite alternate;

}

.userNames {
    font-size: 30px;
    font-weight: 900;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    margin-bottom: 0;
    font-family: 'Flow Circular', cursive;
    margin-top: 15px;
    animation: opacityhover 750ms infinite alternate;

}

.smallerNameFont {
    font-family: 'Flow Circular', cursive;
    font-size: 25px;
    animation: opacityhover 750ms infinite alternate;

}

.pronouns-position {
    color: #c7c7c7;
    font-family: 'Flow Circular', cursive;
    display: flex;
    grid-column: 2;
    margin-top: 0;
    
}

.pronouns-position>* {
    font-family: 'Flow Circular', cursive;
    margin-right: 5px;
    animation: opacityhover 750ms infinite alternate;

}

.bio {
    font-family: 'Flow Circular', cursive;
    padding: 10px;
    animation: opacityhover 750ms infinite alternate;

}

.bio > * {
    font-family: 'Flow Circular', cursive;
    animation: opacityhover 750ms infinite alternate;
}

.socials {
    font-size: 25px;
    margin-bottom: 10px;
    font-family: 'Flow Circular', cursive;
    display: flex;
    align-items: center;
    justify-content: center;
}

.socials>* {
    margin-right: 10px;
    font-family: 'Flow Circular', cursive;
    margin-left: 10px;
    color: var(--mciafcorange);
    cursor: pointer;
    transition: all 200ms;
}

.socials>*:hover {
    color: var(--mciafcsky);
    font-family: 'Flow Circular', cursive;
    scale: 1.25;
    height: 25;
    width: 25;
}

.social-icon {
    height: 25px;
    font-family: 'Flow Circular', cursive;
    width: 25px;
    margin-bottom: 5px;
}
@keyframes opacityhover {
    0% {
        opacity: 0.95;
    }

    100% {
        opacity: 1;
    }
}
</style>