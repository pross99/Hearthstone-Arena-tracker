<script setup>
import { ref, reactive, defineProps, onMounted } from 'vue';
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
        default: false
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
                <TattooListing v-for="tattoo in state.tattoos.slice(0, limit || state.tattoos.length)" :key="tattoo.id" :tattoo="tattoo" />
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
padding-left: 1rem;
padding-right: 1rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
background-color: rgba(190, 190, 240, 0.4);;
}

.tl-container {
    display: flex;
    flex-direction: column;
    padding: auto;
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

}
.tl-button {

}
</style>

