<script setup>
import { ref, reactive, defineProps, onMounted, onUpdated } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import TattooListing from './TattooListing.vue';

const state = reactive({
    tattoos: [],
    isLoading: true
})

defineProps({
    limit: Number,
    showButton: {
        type:Boolean,
        default: true
    }
})


onMounted(async () => {
    try {
        const response = await axios.get('api/tattoos');
        state.tattoos = response.data;
        console.log(response)
    } catch (error) {
        console.log("ERROR", error)
        
    }  finally {
        state.isLoading = false;
    }
})


function updateItem(id, newData) {
const index = state.tattoos.findIndex(tattoo => tattoo.id === id)
if(index !== -1) {
    Object.assign(state.tattoos[index], newData)
}
}
</script>

<template>
    <section class="tl">
        <div class="tl-container">
            <h2 class="tl-title">
                Browse Tattoos
            </h2>

            <!-- Show spinner when fetching saved tattoos -->
             <div v-if="state.isLoading" class="tl-spinner">
                <PulseLoader /> 
             </div>

             <!-- Show tats when done loading -->
              <div v-else class="tl-tattoos">
                <TattooListing v-for="tattoo in state.tattoos.slice(0, limit || state.tattoos.length)" :key="tattoo.id" :tattoo="tattoo" @update="updateItem" />
              </div>
        </div>
    </section>

    <section v-if="showButton" class="tl-expand">
        <RouterLink to="/tattoos" class="tl-button">
           View all saved tats
        </RouterLink>
    </section>


</template>

<style>
.tl{
padding-left: 2rem;
padding-right: 2rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
background-color: rgb(196, 217, 255);
width: 70vh;
margin-left: 0;
margin-right: 0;
z-index: 0;
border-radius: 8px;

}

.tl-container {
    display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 8px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;  
 background-color: rgb(251, 251, 251);
}

.tl-title {
    margin-bottom: 10px;
    text-align: center;
}

.tl-spinner {
    color: burlywood;
}

.tl-tattoos {

}
.tl-expand {
    margin-top: 5px;
    padding-left: 2rem;
padding-right: 2rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
background-color: rgb(196, 217, 255);
width: 70vh;
margin-left: 0;
margin-right: 0;
z-index: 0;
border-radius: 8px;
}
.tl-button {
    display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 8px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;  
 background-color: rgb(251, 251, 251);
 font-size:24px;
line-height: 2rem;
margin: 0;
height: 40px;
text-align: center;
}
</style>

