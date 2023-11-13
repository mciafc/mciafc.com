<template>
    <div class="auditorium">
        <div class="banner">
            <h1 class="title">OUR AUDITORIUM</h1>
            <v-lazy-image src="auditorium-banner.jpg" alt="Banner image of the Auditorium Cabinet" class="banner-image" />
        </div>
        <div class="flex-container">
            <div class="container">
                <div class="text-container">
                    <h1 class="big-header">About our Auditorium</h1>
                    <p class="subtext">We are located at 50 Winterton Drive, inside Martingrove Collegiate Institute. Upon entering the foyer, the auditorium is the big room in the center. There are accessibility accomodations and entrances for the audience and on stage.</p>
                    <div class="stats">
                        <h1 class="big-header">Stats</h1>
                        <p class="subtext">~669 Seating Capacity</p>
                        <p class="subtext">Orchestra Pit</p>
                        <p class="subtext">2 Dressing Rooms</p>
                        <p class="subtext">Mirrors / Makeup desks</p>
                        <p class="subtext">Wheelchair Accessible Seating and Stage Access</p>
                        <p class="subtext">One of the largest auditoriums in the Etobicoke area.</p>
                        <p class="subtext">High quality sound system</p>
                        <p class="subtext">High quality single-color lighting system.</p>
                    </div>
                </div>
                <h1 class="big-header">Gallery</h1>
                <div class="gallery">
                    <v-lazy-image src="gallery1.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery2.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery3.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery4.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery5.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery6.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery8.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery9.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery10.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery11.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery12.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery13.jpg" class="gallery-image"></v-lazy-image>
                    <v-lazy-image src="gallery14.jpg" class="gallery-image"></v-lazy-image>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuditoriumPage"
    }
</script>

<style lang="css" scoped>
.banner {
    height: 300px;
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0;
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

.title {
    margin: 0;
    font-size: 5em;
    z-index: 10;
}

.flex-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 0;
    margin-bottom: 30px;
    text-align: center;
}

.gallery {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.gallery-image {
    max-height: 600px;
    max-width: 600px;
}

.text-container {
    max-width: 1000px;
}

.big-header {
    font-size: 3em;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}

.subtext {
    font-size: 1.2em;
    margin: 0;
    margin-bottom: 1%;
}

.stats {
    text-align: center;
    /* place the text in the center */
}

@media (max-width: 960px) {
    .gallery {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow-x: auto;
    }
    .gallery-image {
        max-height: 300px;
        max-width: 300px;
    }

    .title {
        font-size: 3em;
    }

}

</style>