<script setup>
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'

</script>

<template>
<h1 class="appTxt"> View Tattoos</h1>
<Navbar /> 
<RouterView /> 
</template>

<style scoped>


appTxt {
font-size: 1.5rem;
line-height: 2rem;
}
</style>
