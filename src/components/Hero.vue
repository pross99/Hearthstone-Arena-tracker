<script setup>

import { defineProps } from 'vue';


defineProps({
    title: {
        type: String,
        default: 'Add your wanted tattoos',
    },
    subtitle: {
        type: String, 
        default: 'Should piece? Leg piece? you decide!'
    }
})
</script>

<template>
    <section class="h">
        <div class="h-container">
            <div class="h-wrapper">
                <h1>
                    {{ title }}
                </h1>
                <p>
                    {{ subtitle }}
                </p>
            </div>
        </div>
    </section>
</template>

<style>
.h{
    padding-top: 5rem;
    padding-bottom: 5rem;
    margin-bottom: 1rem;
    background-color: lightblue; 
    border-radius: 25px;
}

.h-container {
    display: flex; 
padding-left: 1rem;
padding-right: 1rem; 
flex-direction: column; 
align-items: center; 
max-width: 80rem; 
}

</style>