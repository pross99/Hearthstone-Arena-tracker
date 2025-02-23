<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { IoBodySharp } from "oh-vue-icons/icons";
const props = defineProps({
    tattoo: Object
})

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
                <img :src="tattoo.imageLink" />
                </div>
                <div class="tas-price-wrapper">

               
                <h3 class="tas-price"> Estimated price {{ tattoo.priceGuess }} DKK</h3> 
            </div>
        </div>
    </div>

</template>


<style>

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

 
</style>