<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import RunListings from '@/components/RunListings.vue';

const rules = `
Add your completed runs below and start tracking your best classes`
</script>



<template>
    <Hero title = "Your Hearthstone Arena companion" subtitle ="Showcase your deck building mastery and compete to reach 12 wins!" :paragraph="rules" /> 
    <HomeCards /> 
    <div class="container-component">
    <RunListings />
    </div>
   
</template>


<style lang="scss">


.container-component{
  width: 100%;
  padding: 30px 0px;
  display: flex;
 gap: 40px;
  justify-content: center;
  background-color: $secondary-color
}





</style>