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
    padding-top: 1rem;
    border-radius: 25px;
    background-position: left 100px;
    background-size: 50%;
    background-repeat: repeat-x;
   padding-bottom: 10px;
   margin-bottom: 20px;
   height: 55vh;
}

.h-container-wrapper {
    width: 100vw;
    background-image:  url("/images/hslogo.png");
    margin-top: 20px;
    border-radius: 20px;
    background-position: left 10px;
    background-size: 50%;
    display: flex;
    justify-content: center;
    padding-top: 100px;
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



.paragraph{
   text-wrap: balance;
   margin-top: 40px;
    background-color: rgb(234,235,202);
   border-radius: 20px;
   padding-bottom: 8px;
}






</style>