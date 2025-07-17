<script setup>

import { defineProps } from 'vue';


defineProps({
    title: {
        type: String,
        default: 'Add your wanted Arena runs',
    },
    subtitle: {
        type: String, 
        default: 'Unsure how Hearthstone Arena works?'
    },

    paragraph: {
        type:String,
        default: 'Show rules or write a longer para'
    }
})
</script>

<template>
    <section class="h-section banner banner-section">
        <div class="h-container-wrapper">
        <div class="h-container banner-column">
            <img src="/images/Arena.webp">
            <div class="h-wrapper">
                <h1 class="heading-xl">
                    {{ title }}
                </h1>
                <p class="heading-xl" id="heading-gray">
                    {{ subtitle }}
                </p>

                <p class="paragraph">
                 <pre>  {{ paragraph }}</pre> 

                </p>
            </div>
        </div>
        </div>
    </section>
</template>

<style>
.h-section{
    display: flex;
    justify-content: center;
    padding-top: 5rem;
    padding-bottom: 5rem;
    border-radius: 25px;
    background-image:  url("/images/hslogo.png");
    background-position: left 100px;
    background-size: 50%;
    background-repeat: repeat-x;
    color: white;
   padding-bottom: 10px;
    
}

.h-container-wrapper {
   backdrop-filter: invert(80%);
    width: 100vw;
    height: 55%;
    display: flex;
    justify-content: center;
    padding-top: 80px;
    border-radius: 20px;
   
}

#heading-gray {
    text-align: center;
}

.h-container {
display: flex; 
padding-left: 1rem;
padding-right: 1rem; 
flex-direction: column; 
border-radius: 20px;
align-items: center; 
 max-width: 80rem; 
}

.heading {
   &-xl {
      font-family: inherit;
      font-size: clamp(2.648rem, 6vw, 4.241rem);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -1px;
   }
}

.paragraph{
     font-family: inherit;
   text-wrap: balance;
   color: inherit;
   font-size: 14px;
   margin-top: 40px;
   color: black;
   background-color: rgba(251,251,251, 0.5);
   border-radius: 10px;
   padding-bottom: 8px;
}






</style>