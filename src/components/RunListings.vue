<script setup>
import { ref, reactive, defineProps, onMounted, onUpdated, computed } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import RunListing from './RunListing.vue';

const state = reactive({
    runs: [],
    classes: [],
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
        const response = await axios.get('api/runs');
        state.runs = response.data;
        console.log(response)

        const classResponse = await axios.get('api/classes')
        state.classes = classResponse.data
        console.log(classResponse)

    } catch (error) {
        console.log("ERROR", error)
        
    }  finally {
        state.isLoading = false;
    }
})


function combineRunWithClass(run) {
 const cls = state.classes.find(e => String(e.id) === String(run.classId)) ?? {};
    return {
        ...run,
        ...cls
    }
    }


const runsWithClass = computed(() => {
    return state.runs.map(combineRunWithClass);
});


function updateItem(id, newData) {
const index = state.runs.findIndex(run => run.id === id)
if(index !== -1) {
    Object.assign(state.runs[index], newData)
}
}
</script>

<template>
    <section class="tl">
        <div class="tl-container">
            <h2 class="tl-title">
                Previous runs
            </h2>

            <!-- Show spinner when fetching saved runs -->
             <div v-if="state.isLoading" class="tl-spinner">
                <PulseLoader /> 
             </div>

             <!-- Show runs when done loading -->
              <div v-else class="tl-tattoos">
                <RunListing v-for="run in runsWithClass.slice(0, limit || state.runs.length)"
                 :key="run.id" 
                 :run="run"  
                 @update="updateItem" />
              </div>
        </div>
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

