<script setup>
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'

</script>

<template>
<Navbar /> 
<RouterView /> 
</template>

<style scoped>


.appTxt {
font-size:24px;
line-height: 2rem;
margin: 0;
height: 40px;
text-align: center;
}
</style>
