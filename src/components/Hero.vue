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
    margin-bottom: 1rem;
    border-radius: 25px;
    background-image:  url("/images/hslogo.png");
    background-position: left 100px;
    background-size: 500px;
    background-repeat: repeat-x;
    background-color:white;
    color: white;
    
}

.h-container-wrapper {
   
    width: 900px;
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
 background-color:rgba(76,86,111, 0.7);
  text-shadow: -1px -1px -1px #ffffff, 0.1px 0.1px 0.1px #ffffff;
    box-shadow: 
    inset -5px 5px hsl(34 61.5 36.7% / 1),
    -20px 20px 40px hsla(0, 0%, 99%, 0.25) ;
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
}




</style>