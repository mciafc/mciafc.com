<template>
    <div class="modalbackdrop" @click="this.$router.push('/dash')">

    </div>
</template>

<script>
    export default {
        name: 'ModalBackdrop'
    }
</script>

<style lang="css" scoped>
.modalbackdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
}

</style>