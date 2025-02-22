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
    <div :class="`${bg} c-card` ">
        <slot></slot>
    </div>
</template>

<style>

.c{
    background-color: bisque;
    width: 30%;
  margin-left: auto;
  margin-right: auto;
}

.c-card {
    padding: 1.5rem; 
border-radius: 0.5rem; 
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
}
</style>