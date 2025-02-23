<script setup>
import { defineProps } from 'vue';

defineProps({
    bg: {
        type:String,
        default: 'c'
    }
})
</script>

<template>
    <div :class="`${bg} hc-card` ">
        <slot></slot>
    </div>
</template>

<style>

.c{
    background-color: rgba(251, 251, 251);
    width: 20%;
  margin-left: auto;
  margin-top: 10px;
margin-bottom: 10px;
  margin-right: auto;
}

.c-card {
padding: 1.25rem; 
border-radius: 0.5rem; 
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
}
.c-card:hover {

box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
    transform: translateY(-2px); /* Slight lift on hover */
}

</style>