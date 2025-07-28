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

async function getNewruns() {

    
        try {
        const response = await axios.get('api/runs');
        state.runs = response.data;
        console.log(response)

    } catch (error) {
        console.log("ERROR", error)
        
    }  finally {
        state.isLoading = false;
    }

}


function combineRunWithClass(run) {
 const cls = state.classes.find(e => String(e.id) === String(run.classId)) ?? {};
    return {
        ...run,
        className: cls.className // only return className to not clash ids..
    }
    }


    // uses the function above and returns a new object with classes linked to the runs
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
 let idNewRuns = state.runs.length
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
        getNewruns()

       
    } catch (error) {
        console.log("ERROR", error)
        showToast.error("Error updating listing")
    }
}











// Prepare stats for child component
// computed so it knows if new runs are added or updated.

const statsByClass = computed (() => {
    const stats = {}
    const runsArray = runsWithClass.value

    runsArray.forEach(run => {
        const clsId = run.classId
        const clsName = run.className

        if (!stats[clsId]) {
        stats[clsId] = {
          className : clsName,
          totalRuns: 0,
          totalWins: 0,
          totalMatches: 0,
        };
      }

      const placement = Number(run.placement) // convert to number
      const matchesPlayed = placement + 3;

      stats[clsId].totalRuns++;
      stats[clsId].totalWins += placement
      stats[clsId].totalMatches += matchesPlayed
    });


      // After all runs are proccessed, i loop through each class in the stats obejct and calc the winrate. If no matches have been played it can be set to 0
   Object.keys(stats).forEach(cls => {
      const s = stats[cls];
      s.winrate = s.totalMatches > 0
        ? (s.totalWins / s.totalMatches) * 100
        : 0;
    });

    return stats;
  
})

</script>

<template>
    <section class="tl">
        <div class="tl-container">

            
            <h2 class="tl-title">
                Recent Runs
            </h2>

            <button @click="showModal = true" id="add-btn">Add new run   </button>
             <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit" initial-data="null">
            </Modal>

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

     <section class="tl">
        <div class="tl-container">
             <StatListing  :stats="statsByClass" class="tl-tattoos"/>
            </div>
     </section>



</template>

<style>
.tl{
padding-left: 0.5rem;
padding-right: 0.5rem;
padding-top:0.5rem;
padding-bottom: 0.5rem;
background-color: var(--secondary-color);
width: 50%;
border-radius: 20px;
border: solid var(--third-color) 5px;


}

.tl-container {
    display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 20px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;  
  background-color: var(--secondary-color);
}

.tl-title {
    margin-bottom: 10px;
    text-align: center;
}

.tl-spinner {
    color: burlywood;
}

.tl-button {
    display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 8px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;  
line-height: 2rem;
margin: 0;
height: 40px;
text-align: center;
}

#add-btn{
    margin-top: 10px;
}


/* CSS */

</style>

