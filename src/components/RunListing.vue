<script setup>
import { defineProps, ref, computed,defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import { IoBodySharp } from "oh-vue-icons/icons";
import axios from 'axios'
import Modal from './Modal.vue'
import { useToast } from 'vue-toastification';

const props = defineProps({
    run: Object
});

const emit = defineEmits(['update'])
//reactive state for modal visibility
const showModal = ref(false)
const submittedeData = ref(null)
const showToast = useToast()
const handleFormSubmit = async (formData) => {

    if(!props.run || !props.run.id) {
        console.error("Where is the ID")
        return;
    }


    const updateRun =  {
        id: props.run.id,
        class: formData.class,
        placement: formData.placement,
        legendaryBracket: formData.legendaryBracket,
        priceWinnings: formData.priceWinnings,
        note: formData.note
    }
    try {
        console.log(updateRun)
        const response = await axios.put(`/api/runs/${props.run.id}`, updateRun)
        showToast.success("Listing updated successfully")
        emit('update', props.run.id, updateRun)
        showModal.value=false;
       
    } catch (error) {
        console.log("ERROR", error)
        showToast.error("Error updating listing")
    } 
}



function checkScore() {
    const result = props.run.placement >= 7;
    return result
  
}

let goodScore = checkScore()

console.log(typeof props.run.placement)

</script>

<template>

    <div class="tas">
        <div class="tas-container">

           
            <div class="tas-header"> 
                <h3 class="tas-header-title">{{ run.class }}</h3>
                <div class="tas-header-placement">
                </div>
                   Legendary Bracket{{ run.legendaryBracket }} 
            </div>

            <div class="tas-text-note">
                <h4>
                    Note and Winnings
                </h4>
                <div>
                    <p> Note {{ run.note }} </p>
                    <p> Gold: {{ run.priceWinnings }} <fa icon="coins" /> </p>
                </div>
                
            </div>
                <div class="tas-image-container">
                <img :src="run.imageLink" @click="showModal = true" class="clickable-image" />
                </div>
                <div  :class="{ 'tas-run-wrapper-high': !goodScore, 'tas-run-wrapper-low': goodScore }" @click="showModal = true" >

               
                <h5 :class="{ 'tas-high': goodScore, 'tas-low': !goodScore }" > 
                         Placement:{{ run.placement }}-3

                </h5> 

               
            </div> 
            <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit"  :initialData="run">
            </Modal>
        </div>
    </div>

</template>


<style>
.clickable-image {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.clickable-image:hover {
    transform: scale(1.05);
}
h6{
    margin-bottom: 10px;
    text-align: left;
}

.tas {
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 10px;
border-radius: 8px; 
background-color: rgb(251, 251, 251); 
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
margin-bottom: 30px;


}

.tas-container {
    margin-top: 10px;
    padding: 20px;
    
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px; 
}


.tas-header {
    margin-bottom: 15px; 
    text-align: center;
    background-color: rgba(190,190, 190, 0.5);
    border-radius: 8px;
}

.tas-header-title {
    font-size: 1.25rem;
}

.tas-header-placement {
    font-size: 1rem;
    display: flex;
    align-self: center;
    justify-content: center;
    gap: 8px;
}


.tas-text-note {
    border-radius: 8px;
    padding-left: 20px;
    padding-right: 20px;
    
   
    background-color: rgb(251, 251, 251);
    height: 100px;
   margin: auto;
   margin-bottom: 15px;
}

 .tas-image-container {
   margin: 15px 0;
 }

 .tas-image-container img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
   max-height: 400px; 
 }

 .tas-image-container img:hover {
    transform: scale(1.1);
    filter: drop-shadow(5px 3px 2px rgb(251, 251, 251));
 }


 .tas-run-wrapper-high {
 background-color: rgb(251, 251, 251);
 margin-top: 15px;
 margin-top: 10px;
 padding: 10px;
 border-radius: 8px;
 background-color: rgba(212, 72, 72, 0.2) ;
 }

  .tas-run-wrapper-low {
 background-color: rgb(251, 251, 251);
 margin-top: 15px;
 margin-top: 10px;
 padding: 10px;
 border-radius: 8px;
 background-color: #4dd44833 ;
 }

 .tas-low {
    color: rgb(212, 72, 72); 
    filter: drop-shadow(0 0 0.9rem rgb(251,251,251));
    font-weight: bold;
 }

  .tas-high {
    color: #70d448; 
    filter: drop-shadow(0 0 0.9rem rgb(251,251,251));
    font-weight: bold;
 }


 .tas-router {
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