<template>
    <div class="homepage">
        <div class="banner">
            <v-lazy-image src="logo_white_crop.png" alt="" class="logo" />
            <v-lazy-image src="aud.jpg" alt="Banner image of the Auditorium Seats" class="banner-image" />
        </div>
        <div class="section1">
            <h1 class="section-heading">Martingrove Auditorium Facilities Crew</h1>
            <p class="section1 bodytext">Martingrove Collegiate Institute has one of the best auditoriums in the Etobicoke area. Third party and in-school shows and performances are run here often. The AFC (Auditorium Facilities Crew) runs all the technology and organizes shows with the parties who are running them. Want to run a show in our auditorium? Check out the auditorium specifications, meet our team, and book a time by navigating to the respective portions of the website.</p>
            <!-- <img class="section1image" v-lazy="'soundboard-compress2.JPG'"> -->
        </div>
        <div class="section2">
            <h1 class="section-heading">Our Auditorium</h1>
            <p class="bodytext">The Martingrove CI Auditorium is the largest auditorium in the Etobicoke area with a seating capacity of 669 regular seats, and areas for accessability and mobility accomodations. Almost every section of our Auditorium is wheelchair accessible, including the stage, backstage, the pit, and the audience. The only not accessible section are the dressing rooms below the stage. Our crew can run sound from the front of the audience or the back of the audience.</p>
            <button class="btn" @click="this.$router.push('/auditorium')">MORE INFO</button>
        </div>
        <div class="section3">
            <h1 class="section-heading">Meet the Crew</h1>
            <p class="bodytext">All of the auditorium's functions are student run and led. We also are able to move equipment outside of the auditorium if your event is situated somewhere else in the school. We typically have a group of five or six Senior Executive Members in Grade 11 or 12 who do most of the work, and they're who you'll want to talk to about your event, and a large pool of General Members (otherwise known as "goons") to help with large shows when more people are needed.</p>
            <p class="bodytext">For more information, get in contact with one of our Senior Execs or our Staff Advisor, Mr. Farrow.</p>
            <button class="btn" @click="this.$router.push('/contact')">CHECK OUT THE CREW</button>
        </div>
        <div class="section4">
            <h1 class="section-heading">Events</h1>
            <p class="bodytext">The AFC is a major part of all school events at Martingrove, we run the tech for all assemblies in the school, and for events like Relay for Life, Nuit Blanche, and Carnival. We also run our own show, the Winter Talent Show, every December. We do work with third parties who get permits through the TDSB. We have run events with groups like the Etobicoke Philharmonic Orchestra, as well as run a Mayoral Debate for the 2023 Toronto mayoral by-election.</p>
            <p class="bodytext">Do you have an event that you want to run in our aud, or need us to support your event with lighting or audio tech?</p>
            <button class="btn" @click="this.$router.push('/book')">BOOK YOUR SHOW</button>
            <div class="upcoming-events">
                <!-- Dev note: This section should only show up if there are upcoming featured events in the API -->
            </div>
        </div>
        <!-- <div class="section5">
            <h1 class="section-heading">Support our Cause</h1>
            <p class="bodytext">Our auditorium's equipment is starting to get pretty old, and is definitely showing signs of age. We are also missing equipment that would be vital in putting on the best shows possible. We strive to make every show our best, so monetary donations are very appreciated to help us purchase new equipment to keep our Auditorium running to the best of it's ability.</p>
            <button class="btn">DONATE</button>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
    }
</script>

<style lang="css" scoped>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.banner {
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
}
.banner-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
    position: absolute;
    margin: 0;
    z-index: 0;
}


.logo {
    height: 500px;
    width: 500px;
    object-fit: contain;
    z-index: 5;
    position: absolute;
    opacity: 0.9;
}

@media (max-width: 960px) {
    .logo {
        height: 385px;
        width: 385px;
    }

}

.section-heading {
    font-size: 3em;
}

.section1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    text-align: center;
}
.bodytext {
    font-size: 1.1em;
}
.section1.bodytext {
    font-size: 1.2em;
}

.section1image {
    height: 400px;
    object-fit: cover;
    width: 400px;
    border-radius: 20px;
    float: right;
}

.section2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    text-align: center;
}

.section2-heading {
    font-size: 3em;
}

.section3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    text-align: center;
}
.section4 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    text-align: center;
}

.section5 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    text-align: center;
}

.btn {
    background-image: linear-gradient(-45deg, var(--mciafcorange), var(--mciafcsky));  
    background-size: 400% 400%;
    border: 0;
    border-radius: 3px;
    padding: 5px;
    padding-top: 10px;
    color: white;
    font-size: 1.2em;
    scale: 1.1;
    font-family: 'Josefin Sans', sans-serif !important;
    cursor: pointer;
    margin: 5px;
    transition: all 250ms;
}

.btn:hover {
    background-color: var(--mciafcsky);
    background-position: 100% 50%;
    scale: 1.3;
    color: #ffffff;
    transition: all 250ms;
}

</style>