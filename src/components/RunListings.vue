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
    isLoading: true,
})

const props = defineProps({
    limit: Number,
    showButton: {
        type:Boolean,
        default: true
    }
})

const emit = defineEmits(['add'])
 onMounted(async () => {
    try {
           const response = await apiCallWithLag(
            () => axios.get('api/runs'),
            500
        );
       
        console.log(response)
 await loadRunsWithDelay(response.data, 300);
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
          const response = await apiCallWithLag(
            () => axios.get('api/runs'),
            500
        );
           await loadRunsWithDelay(response.data, 200);
        console.log(response)

    } catch (error) {
        console.log("ERROR", error)
        
    }  finally {
        state.isLoading = false;
    }

}

const makeLag = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve,ms))
}

const apiCallWithLag = async(apiCall, latencyMs = 500) => {
    const [response] = await Promise.all([
        apiCall(),
        makeLag(latencyMs)
    ]);
    return response;
}

const loadRunsWithDelay = async (runs, delayMs = 100) => {
    for (let i = 0; i < runs.length; i++) {
        await new Promise(resolve => setTimeout(resolve,delayMs))
            state.runs.push(runs[i]);
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
        state.runs = [...state.runs, response.data]
        emit('add', addRun)
        showModal.value=false;
        showToast.success("Listing added successfully");

       
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

            <h2>Recent runs</h2>
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
          <div v-if="state.isLoading" class="tl-spinner">
                <PulseLoader /> 
             </div>
        <div v-else class="tl-container">
             <StatListing  :stats="statsByClass" class="tl-tattoos"/>
            </div>
     </section>



</template>

<style>
.tl{
padding-left: 0.5rem;
padding-right: 0.5rem;
padding-bottom: 0.5rem;
padding-top: 0.5rem;
background-color: white;
width: 45%;
border-radius: 20px;


}

.tl-container {
    display: flex; 
padding-left: 1rem;
padding-top: 40px;
padding-right: 1rem; 
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
    color: var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
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

height: 40px;
text-align: center;
}

#add-btn{
    margin: 10px;
}


/* CSS */

</style>

