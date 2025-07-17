<script setup>
import { defineProps, ref, computed,defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios'
import Modal from './Modal.vue'
import { useToast } from 'vue-toastification';

const props = defineProps({
    run: Object,
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
        id: Number(props.run.id),
        classId: Number(formData.classId),
        placement: formData.placement,
        legendaryBracket: formData.legendaryBracket,
        priceWinnings: formData.priceWinnings,
        note: formData.note
    }
    try {
        console.log(updateRun)
        const response = await axios.put(`/api/runs/${props.run.id}`, updateRun)
        console.log(response)
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





</script>

<template>

    <div class="tas">
        <div class="tas-container">

           <h1 id="tas-header-container">{{ run.className}}</h1>
            <div class="tas-header"  :class="
                                    props.run.classId === 1
                                    ? 'c-warrior'
                                    : props.run.classId === 2  
                                    ? 'c-warlock'
                                    : props.run.classId === 3 
                                    ? 'c-rouge'
                                    :props.run.classId === 4 
                                    ? 'c-druid'
                                    :props.run.classId === 5 
                                    ? 'c-mage'
                                    :props.run.classId === 6 
                                    ? 'c-hunter'
                                    :props.run.classId === 7 
                                    ? 'c-shaman'
                                    :props.run.classId === 8 
                                    ? 'c-dh'
                                    :props.run.classId === 9 
                                    ? 'c-dk'
                                    :props.run.classId === 10 
                                    ? 'c-priest'
                                    :props.run.classId === 11 
                                    ? 'c-paladin'
                                    :errorClass "> 
            </div>

            <div class="tas-text-note">
                <div class="tas-text-header-container">
                    <p> <fa icon="note-sticky" /> {{ run.note }} </p>
                    <p> <fa icon="coins" />  {{ run.priceWinnings }}  </p>
                    <p> <fa icon="skull" /> {{ run.legendaryBracket }}</p>
                </div>
                
            </div>
                <div class="tas-image-container">
                <img :src="run.imageLink" @click="showModal = true" class="clickable-image" />
                </div>
                <div  :class="{ 'tas-run-wrapper-high': !goodScore, 'tas-run-wrapper-low': goodScore }" @click="showModal = true" >

               
                <h5 :class="{ 'tas-high': goodScore, 'tas-low': !goodScore }" > 
                         Score: {{ run.placement }}-3

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
   width: 500px;
   margin: 10px;
border-radius: 20px; 
background-color: rgb(251, 251, 251); 
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
margin-bottom: 30px;


}



.tas-container {
    margin-top: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 450px; 
    border-radius: 20px;
}


.tas-header {
    margin-bottom: 15px; 
    text-align: center;
    background-color: rgba(190,190, 190, 0.5);
    border-radius: 30px 30px 8px 8px;
    height: 150px;
}
.tas-header:hover {
   transform: scale(1.01);
    filter: drop-shadow(5px 3px 2px rgb(251, 251, 251));
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
   margin-bottom: 40px;
}

.tas-text-header-container {
    margin-top: 50px;
    
    border-radius: 5px
}

.tas-text-header-container p {
    margin-top: 30px ;
    text-align: left;
}

 .tas-image-container {
   margin: 15px 0;
 }



 /* .tas-container:hover {
    transform: scale(1.01);
    filter: drop-shadow(5px 3px 2px rgb(251, 251, 251));
 } */


 .tas-run-wrapper-high {
 background-color: rgb(251, 251, 251);
 margin-top: 15px;
 margin-top: 10px;
 padding: 10px;
 border-radius: 8px;
 background-color: rgba(212, 72, 72, 0.2) ;
 cursor: pointer;
 }

  .tas-run-wrapper-low {
 background-color: rgb(251, 251, 251);
 margin-top: 15px;
 margin-top: 10px;
 padding: 10px;
 border-radius: 8px;
 background-color: #4dd44833 ;
 cursor: pointer;
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


/* used for??  .tas-router {
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
 } */

 .c-warrior {
    background-image: url("/images/Warrior.webp");
    background-repeat: no-repeat;
    background-position: 50% -0%;
 }

 .c-warlock {
    background-image: url("/images/Warlock.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-rouge {
    background-image: url("/images/Rouge.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-druid {
    background-image: url("/images/Druid.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-mage {
    background-image: url("/images/Mage.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-hunter {
    background-image: url("/images/Hunter.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-shaman {
    background-image: url("/images/Shaman.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-dh {
    background-image: url("/images/DH.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-dk {
    background-image: url("/images/DK.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-priest {
    background-image: url("/images/Priest.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-paladin {
    background-image: url("/images/Paladin.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 
</style>