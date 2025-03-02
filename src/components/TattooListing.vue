<script setup>
import { defineProps, ref, computed,defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import { IoBodySharp } from "oh-vue-icons/icons";
import axios from 'axios'
import Modal from './Modal.vue'
import { useToast } from 'vue-toastification';

const props = defineProps({
    tattoo: Object
});

const emit = defineEmits(['update'])
//reactive state for modal visibility
const showModal = ref(false)
const submittedeData = ref(null)
const showToast = useToast()
const handleFormSubmit = async (formData) => {

    if(!props.tattoo || !props.tattoo.id) {
        console.error("Where is the ID")
        return;
    }


    const updateTattoo =  {
        id: props.tattoo.id,
        title: formData.title,
        placement: formData.placement,
        imageLink: formData.imageLink,
        theme: formData.theme,
        priceGuess: formData.priceGuess,
        note: formData.note
    }
    try {
        console.log(updateTattoo)
        await axios.put(`/api/tattoos/${props.tattoo.id}`, updateTattoo)
        showToast.success("Listing updated successfully")
        emit('update', props.tattoo.id, updateTattoo)
        showModal.value=false;
       
    } catch (error) {
        console.log("ERROR", error)
        showToast.error("Error updating listing")
    } 
}



</script>

<template>

    <div class="tas">
        <div class="tas-container">

           
            <div class="tas-header"> 
                <h3 class="tas-header-title">{{ tattoo.title }}</h3>
                <div class="tas-header-placement">
                    Placement:<fa icon="child-reaching" />
                  {{ tattoo.placement }}
                   
                </div>
                   
            </div>

            <div class="tas-text-note">
                <h6>
                    Note:
                </h6>
                <div>
                    {{ tattoo.note }}
                </div>
                
            </div>
                <div class="tas-image-container">
                <img :src="tattoo.imageLink" @click="showModal = true" class="clickable-image" />
                </div>
                <div class="tas-price-wrapper">

               
                <h3 class="tas-price"> Estimated price {{ tattoo.priceGuess }} DKK</h3> 

               
            </div> 
            <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit"  :initialData="tattoo">
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


 .tas-price-wrapper {
 background-color: rgb(251, 251, 251);
 margin-top: 15px;
 margin-top: 10px;
 padding: 10px;
 border-radius: 8px;
 background-color: rgba(212, 72, 72, 0.2) ;
 }

 .tas-price {
    color: rgb(212, 72, 72); 
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