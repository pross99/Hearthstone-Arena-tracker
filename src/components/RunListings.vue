<script setup>
import { ref, reactive, defineProps, onMounted, onUpdated, computed } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import RunListing from './RunListing.vue';
import StatListing from './StatListing.vue';
import { useToast } from 'vue-toastification';
import Modal from './Modal.vue'

const state = reactive({
    runs: [],
    classes: [],
    isLoading: true
})

const props = defineProps({
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
        className: cls.className // only return className to not clash ids..
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






// Add a new run:

const emit = defineEmits(['add'])

//reactive state for modal visability

const showModal = ref(false)
const submittedData = ref(null)
const showToast = useToast()

const handleFormSubmit = async (formData) => {

    const addRun = {
        classId: Number(formData.classId),
        placement: formData.placement,
        legendaryBracket: formData.legendaryBracket,
        priceWinnings: formData.priceWinnings,
        note: formData.note

    }
         try {
        console.log(addRun)
        const response = await axios.post(`/api/runs/`, addRun)
        console.log(response)
        showToast.success("Listing added successfully")
        emit('add', addRun)
        showModal.value=false;
       
    } catch (error) {
        console.log("ERROR", error)
        showToast.error("Error updating listing")
    }
}
</script>

<template>
    <section class="tl">
        <div class="tl-container">

            <button @click="showModal = true">Add a new run</button>
             <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit" initial-data="null">
            </Modal>
            <h2 class="tl-title">
                Previous runs
            </h2>

            <!-- Show spinner when fetching saved runs -->
             <div v-if="state.isLoading" class="tl-spinner">
                <PulseLoader /> 
             </div>

             <!-- Show runs when done loading -->
              <div v-else class="tl-tattoos">
                <!-- REVERSE order to show latest entry first -->
                <RunListing v-for="run in runsWithClass.slice(0, limit || state.runs.length).reverse()"
                 :key="run.id" 
                 :run="run"  
                 @update="updateItem" />

                
              </div>
        </div>
    </section>

 <StatListing />

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

