<script setup>
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'
</script>

<template>
<Navbar /> 
<RouterView /> 

</template>

<style lang="scss">
@font-face {
  font-family: 'Belwe Bold';
  src: url('@/assets/fonts/Belwe/Belwe-Bold.woff2') format('woff2'),
       url('@/assets/fonts/Belwe/Belwe-Bold.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@import '@/assets/colors.scss';
@import '@/assets/globals.scss';

</style>
