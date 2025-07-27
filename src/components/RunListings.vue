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

            <button @click="showModal = true" class="button-29">Add new run   </button>
             <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit" initial-data="null">
            </Modal>
            <h2 class="tl-title">
                Recent Runs
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

 <StatListing  :stats="statsByClass"/>

</template>

<style>
.tl{
padding-left: 2rem;
padding-right: 2rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
 background-color:rgba(76,86,111, 0.7);
  text-shadow: -1px -1px -1px #ffffff, 0.1px 0.1px 0.1px #ffffff;
    box-shadow: 
    inset -5px 5px hsl(34 61.5 36.7% / 0.1),
    -20px 20px 40px hsla(0, 0%, 99%, 0.92) ;
width: 45%;
margin-left: 0;
margin-right: 0;
z-index: 0;
border-radius: 20px;

}

.tl-container {
    display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 8px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;  
  background-color:rgba(251,251,251, 0.7);
  text-shadow: -1px -1px -1px #ffffff, 0.9px 0.9px 0.9px #ffffff;
    box-shadow: 
    inset -5px 5px hsl(34 61.5 36.7% / 0.1),
    -20px 20px 40px hsla(0, 0%, 99%, 0.95) ;
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
 font-size:24px;
line-height: 2rem;
margin: 0;
height: 40px;
text-align: center;
}


/* CSS */
.button-29 {
    margin-top: 20px;
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, rgb(76,86,111) 0, rgb(151,101,36) 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  
}

.button-29:focus {
  box-shadow: rgb(151,101,36) 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.button-29:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgb(151,101,36) 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: rgb(151,101,36) 0 3px 7px inset;
  transform: translateY(2px);
}
</style>

