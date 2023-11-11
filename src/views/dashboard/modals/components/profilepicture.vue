<template>
    <p>
        <v-lazy-image :src="getProfilePicture(user)" class="pfp" @click="openImageUploader" v-if="image == null" />
        <img :src="image" @click="openImageUploader" class="pfp" v-else>
        <input type="file" @change="uploadImage($event)" style="display: none;" ref="uploader" accept="image/png">
    </p>
</template>

<script>
    export default {
        name: 'ProfilePicture',
        props: {
            user: Object,
            loggedInUser: Object,
        },
        data() {
            return {
                image: null
            }
        },
        methods: {
            uploadImage(e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = (e) => {
                    this.image = e.target.result;
                    console.log(this.image)
                }
            },
            openImageUploader() {
                this.$refs.uploader.click();
            }
        },
        computed: {
            getProfilePicture() {
                return function(user) {
                    if (this.image != null) {
                        return this.image
                    }
                    return "https://api.mciafc.com/crew/pfp/" + user.memberInfo.profilePicture
                }
            },
        }
    }
</script>

<style lang="css" scoped>

.pfp {
    cursor: pointer;
    width: 100px;
    height: 100px;
    vertical-align: middle;
    border-radius: 50%;
    transition: all 200ms;
}

.pfp:hover {
    scale: 1.2;
}

</style>