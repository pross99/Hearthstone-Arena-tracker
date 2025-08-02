<script setup>
import { ref, reactive, defineProps, onMounted, onUpdated, computed } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import RunListing from './RunListing.vue';
import StatListing from './StatListing.vue';
import { useToast } from 'vue-toastification';
import Modal from './Modal.vue'
import {useStore} from 'vuex';

const store = useStore()
const showToast = useToast()
 onMounted(async () => {

  if(store.state.runs || store.state.runs.length === 0) {
  store.dispatch('getRuns')
  }

})

const showModal = ref(false)
//reactive state for modal visability
const emit = defineEmits(['add']);




// Prepare stats for child component
// computed so it knows if new runs are added or updated.
const runsWithClass = computed(() => store.getters.runsWithClass);
const statsByClass = computed(() => store.getters.statsByClass);
const isLoading = computed(() => store.state.isLoading);

const updateItem = (id, newData) => {
  store.commit('UPDATE_RUN', { id, newData });
};

const handleFormSubmit = async (formData) => {
  try {
    const newRun = await store.dispatch('submitRun', formData);
    emit('add', newRun);
    showModal.value = false;
    showToast.success("Listing added successfully");
  } catch (error) {
    showToast.error("Error updating listing");
  }
};

</script>

<template>
    <section class="tl">
        <div class="tl-container">

            <h2>Recent runs</h2>
            <button @click="showModal = true" id="add-btn">Add new run   </button>
             <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit" initial-data="null">
            </Modal>

            <!-- Show spinner when fetching saved runs -->
             <div v-if="isLoading" class="tl-spinner">
                <PulseLoader /> 
             </div>

             <!-- Show runs when done loading -->
              <div v-else class="tl-tattoos">
                <!-- REVERSE order to show latest entry first -->
                <RunListing v-for="run in runsWithClass.slice(0).reverse()"
                 :key="run.id" 
                 :run="run"  
                 @update="updateItem" />
              </div>
             
        </div>
    </section>

     <section class="tl">
          <div v-if="isLoading" class="tl-spinner">
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

