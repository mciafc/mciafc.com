<template>
    <div class="dashboard-section">
        <h2 class="section-header">House Controls</h2>
        <p class="section-subtitle">Some quick controls for auditorium equipment.</p>
        <p>There's currently nothing here.</p>
    </div>
</template>

<script>
    export default {
        name: 'DashboardControls',
        props: {
            user: Object
        },
    }
</script>

<style lang="css" scoped>
@import '@/assets/dashboard-global-styles.css';

</style>