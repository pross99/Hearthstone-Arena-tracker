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
        id: props.run.id,
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

const goodScore = computed(() => {
    return props.run.placement > 7 
})





</script>

<template>

    <div class="tas">
        
        <div class="tas-container">
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
                <img :src="run.imageLink" class="clickable-image" />
                </div>
                <div  :class="{ 'tas-run-wrapper-high': !goodScore, 'tas-run-wrapper-low': goodScore }" @click="showModal = true">

               
                <h5 :class="{ 'tas-high': goodScore, 'tas-low': !goodScore }" > 
                         Score: {{ run.placement }}-3

                </h5> 

               
            </div> 
            <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit"  :initialData="run">
            </Modal>
        </div>
    </div>

</template>


<style lang="scss">
.clickable-image {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.clickable-image:hover {
    transform: scale(1.05);
}

.tas {
   display: flex;
   justify-content: center;
   align-items: center;
    max-width: 300px;
border-radius: 20px; 
background-color:white;
margin-bottom: 60px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
 background: repeating-linear-gradient(
  45deg,
  $third-color, 100px,
  $third-color 0px,
  rgba(234, 235, 202,0.9) 625px,
  rgba(0,0,0,0) 0px
);

}



.tas-container {
    padding: 20px;
    width: 480px; 
    border-radius: 20px;
}


.tas-header {
    margin-bottom: 2px; 
    text-align: center;
    background-color: rgba(251,251, 251);
    border-radius: 20px 20px 8px 8px;
    height: 150px;
    margin-bottom: 5px;
}
.tas-header:hover {
   transform: scale(1.01);
}



.tas-header-placement {
    display: flex;
    align-self: center;
    justify-content: center;
    gap: 8px;
}


.tas-text-note {
    border-radius: 8px 8px 20px 20px;
    padding: 20px;
    background-color: white;
    height: 130px;
}

.tas-text-note p {
    color: $third-color;
}



 /* .tas-container:hover {
    transform: scale(1.01);
    filter: drop-shadow(5px 3px 2px rgb(251, 251, 251));
 } */


 .tas-run-wrapper-high {
 margin: 10px;
 padding: 10px;
 border-radius: 8px;
 height: 50px;
 background-color: rgba(212, 72, 72) ;
 cursor: pointer;
 }

  .tas-run-wrapper-low {
 padding: 10px;
 border-radius: 8px;
 background-color: $primary-color ;
 cursor: pointer;
 height: 50px;
 }

 .tas-low { 
margin-top: 10px;
color: white;
 }

  .tas-high {
margin-top: 10px ;
    color: white;
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

line-height: 2rem;
margin: 0;
height: 40px;
text-align: center;
 } */

 .c-warrior {
    background-image: url("/images/DK.webp");
    background-repeat: no-repeat;
    background-position: 50% -0%;
 }

 .c-warlock {
    background-image: url("/images/DH.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-rouge {
    background-image: url("/images/Druid.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-druid {
    background-image: url("/images/Hunter.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-mage {
    background-image: url("/images/Mage.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-hunter {
    background-image: url("/images/Paladin.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-shaman {
    background-image: url("/images/Priest.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-dh {
    background-image: url("/images/Rouge.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-dk {
    background-image: url("/images/Shaman.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-priest {
    background-image: url("/images/Warlock.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 .c-paladin {
    background-image: url("/images/Warrior.webp");
    background-repeat: no-repeat;
    
    background-position: 50% -0%;
 }
 

 .s-title {
  color: $third-color;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>