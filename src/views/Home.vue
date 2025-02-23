<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import TattooListings from '@/components/TattooListings.vue';
</script>

<template>
    <Hero title = "Hey Peter" subtitle ="Your Tattoo Project!" /> 
    <HomeCards /> 
    <TattooListings />
</template>


<style>
h1, h2, h3, h4, h5, h6 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #333; /* Dark gray */
  text-align: center;
  margin-bottom: 10px;
}

p {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
}

a {
  text-decoration: none; /* Removes underline */
}


</style>