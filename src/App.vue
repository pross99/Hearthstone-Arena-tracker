<script setup>
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'
</script>

<template>
<Navbar /> 
<RouterView /> 

</template>

<style>

html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}

#app {
    background-color: white;
    height: inherit;
  width: inherit;
}
:root {
    --main-color: #5aa0d4;
    --secondary-color: #eaebca;
    --third-color: #976524;
}

@font-face {
  font-family: 'Belwe Bold';
  src: url('@/assets/fonts/Belwe/Belwe-Bold.woff2') format('woff2'),
       url('@/assets/fonts/Belwe/Belwe-Bold.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
h1,h2,h3,h4,h5,h6 {
    font-family: 'Belwe Bold', Georgia, 'Times New Roman', Times, serif;
    font-size: 28px;
    color: var(--third-color);
    text-align: center;
}

p, a, td{
    font-size: 18px;
     font-family:'Belwe Bold', Georgia, 'Times New Roman', Times, serif;
     color: white;
     text-decoration: none;
    
}


button {
  font-family: 'Belwe Bold', Georgia, 'Times New Roman', Times, serif;
  font-size: 18px;
  align-items: center;
  background-color: var(--third-color);
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  height: 48px;
  justify-content: center;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  color: white;
}

button:focus {
  box-shadow: rgb(151,101,36) 0 0 0 1.5px inset, var(--main-color) 0 2px 4px, var(--main-color) 0 7px 13px -3px, var(--secondary-color) 0 -3px 0 inset;
}

button:hover {
    scale: 1.1;
}

button:active {
  box-shadow: rgb(151,101,36) 0 3px 7px inset;
  transform: translateY(1px);
}



</style>
