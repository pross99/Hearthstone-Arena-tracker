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
                <div class="tas-header-placement">
                    <fa icon="child-reaching" />
                    {{ tattoo.placement }}
                   
                </div>
                    <h3 class="tas-header-title">{{ tattoo.title }}</h3>
            </div>

            <div class="tas-wrapper">
                <div>
                    {{ tattoo.note }}
                </div>
                
            </div>
            
                <div class="tas-image-container">
                <img :src="tattoo.imageLink" />
                </div>
            
            
                <h3 class="tas-price"> Estimated price {{ tattoo.priceGuess }} DKK</h3>

           

        </div>
    </div>

</template>


<style>

.tas {
    position: relative; 
border-radius: 0.75rem; 
background-color: #ffffff; 
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
}

.tas-container {
    padding: 2rem;
    margin-bottom: 20px;
}

.tas-header {
    margin-bottom: 1.5rem; 
    text-align: center;
    width: fit-content;
   margin: auto;
}

.tas-header-placement {
    margin-top: 0.5rem;
margin-bottom: 0.5rem;  
background-color: aliceblue;
border-radius: 15px;
}

.tas-header-title {
    font-size: 1.25rem;
line-height: 1.75rem; 
font-weight: 700;
background-color:aliceblue ; 
border-radius: 15px;
}

.tas-wrapper {
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    width: 900px;
    background-color: rgba(190, 190, 240, 0.2);;
    height: 100px;
   margin: auto;
   margin-bottom: 15px;
}

 .tas-image-container {
    background-color: rgba(190, 190, 240, 0.2);
   border-radius: 20px;
   width: 30%;
   overflow: hidden;
   margin: auto;
   padding-top: 15px;
   padding-bottom: 15px;
 }

 .tas-image-container img {
    display: block;
    margin: auto;
    border-radius: 5px;
    filter: drop-shadow(30px 10px 4px gray);
 }

 .tas-image-container img:hover {
    transform: scale(1.1);
    filter: drop-shadow(32px 12px 5px gray);
 }

 .tas-price {
    margin-bottom: 0.5rem; 
    color: lightcoral; 
    text-align: right;
 }
</style>