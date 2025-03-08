<script setup>
import image from '@/assets/img/humanbody.svg'
import peterBody from '@/assets/img/pBody.jpg'

</script>


<template>
    <div class="image">
        <img :src="image">
        <img :src="peterBody">

            
            test
        </div>
    <img :src="image">

</template>




<style scoped>


img {
    width: 55rem;
    position: relative;
    object-fit: cover;
    background-repeat: no-repeat;
}

.test {
position: absolute;
  top: 70%;
  left: 60%;
  transform: translate(-50%, -50%);
  font-size: 18px;
}

</style>