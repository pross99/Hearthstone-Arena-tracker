<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import RunListings from '@/components/RunListings.vue';

const rules = `
✅ Draft a 30-card deck by picking 1 of 3 random cards, repeated 30 times.
✅ Face off against other Arena players with similar records.
✅ Play until you reach 12 wins or 3 losses, whichever comes first.
✅ The more wins, the better your reward (gold, packs, dust, etc).
✅ Add each completed run below and keep track of your winrates, best classes e.t.c`
</script>



<template>
    <Hero title = "Arena Tracker" subtitle ="Showcase your deck building mastery " :paragraph="rules" /> 
    <HomeCards /> 
    <div class="container-component">
    <RunListings />
    </div>
   
</template>


<style>
h1, h2, h3, h4, h5, h6 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color:rgb(151,101,36);
  text-align: center;
  margin-bottom: 10px;
}

.container-component{
  margin-top: 30px;
  display: flex;
 gap: 30px;
  width: 100vw;
}

p {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    padding: 0 15px;
}

a {
  text-decoration: none; /* Removes underline */
}



</style>