<script setup>
import { defineProps, ref, computed,defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios'

import { useToast } from 'vue-toastification';


</script>

<template>

    <div class="stat">
    <div class="s-container">
        

    </div>
    </div>

</template>


<style>
.stat {

    height: 800px;
    width: 100%;
    background-color: black;
    padding-left: 2rem;
padding-right: 2rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
background-color: rgb(196, 217, 255);
border-radius: 8px;
}

.s-container{
        display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 8px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;  
 background-color: rgb(251, 251, 251);
}
</style>