<script setup>
import { ref, reactive, defineProps, onMounted, onUpdated, computed } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import RunListing from './RunListing.vue';
import StatListing from './StatListing.vue';
import { useToast } from 'vue-toastification';
import Modal from './Modal.vue'
import HsClassesModal from './HsClassesModal.vue';
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
const classes = computed(() => store.getters.classes)
const updateItem = (id, newData) => {
  store.commit('UPDATE_RUN', { id, newData });
};

/* const handleFormSubmit = async (formData) => {
  try {
    const newRun = await store.dispatch('submitRun', formData);
    emit('add', newRun);
    showModal.value = false;
    showToast.success("Listing added successfully");
  } catch (error) {
    showToast.error("Error updating listing");
  }
}; */


</script>

<template>
    <section class="tl">
        <div class="tl-container">

            <h2>Recent runs</h2>
            <button @click="showModal = true" id="add-btn">Add new run   </button>
            <HsClassesModal :isOpen="showModal" @close="showModal = false" :classes="classes" :stats="statsByClass" ></HsClassesModal>
             <!-- <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit" initial-data="null">
            </Modal> -->

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

<style lang="scss" src="../assets/runListings.scss">

</style>

