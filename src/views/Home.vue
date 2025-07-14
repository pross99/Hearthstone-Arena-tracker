<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import RunListings from '@/components/RunListings.vue';
</script>

<template>
    <Hero title = "Arena Tracker" subtitle ="Collect your arena runs here!" /> 
    <HomeCards /> 
    <div class="container-component">
    <RunListings />
    </div>
   
</template>


<style>
h1, h2, h3, h4, h5, h6 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #333; /* Dark gray */
  text-align: center;
  margin-bottom: 10px;
}

.container-component{
  display: flex;
 gap: 50px;
  width: 95vw;
}

p {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
}

a {
  text-decoration: none; /* Removes underline */
}


</style>