<script setup>
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'


/* 
3 COLORS 

rgb(38,37,48);
rgb(76,86,111);
rgb(151,101,36);
*/

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
