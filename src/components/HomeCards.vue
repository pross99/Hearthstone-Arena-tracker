<script setup>
import Card from '@/components/Card.vue';
import { RouterLink } from 'vue-router';
</script>


<template>
    <section class="hc">
        <div class="hc-container">
            <Card>

                <div class="hc-head-container">
                     <h2 class="hc-head">
                    View saved Runs
                </h2>
                
               
                <p class="hc-para">
                   Browse your saved Runs
                </p></div>
                <RouterLink to="/tattoos" class="hc-routerlink">
                    <button @click="navigate" class="hc-button">Browse Tattoos </button>
                </RouterLink>
            </Card>

            <Card>

                <div class="hc-head-container">
                     <h2 class="hc-head">
                    New Runs
                </h2>
               
                <p class="hc-para">
                   List your new Run
                </p> </div>
                <RouterLink to="/tattoos/add" class="hc-routerlink">
                    <button @click="navigate" class="hc-button">Add A New Tattoo </button>
                </RouterLink>
            </Card>
        </div>
    </section>
</template>

<style>

.hc{
    padding-top: 1rem;
padding-bottom: 1rem; 
width: 100%;
margin: auto;
}

.hc-container {
  display: flex;  
  background-color: rgba(196, 217, 255);
  width: 100%;
}

.hc-card{
    background-color:rgba(251, 251, 251);
    margin-top: 10px;
    margin-bottom: 10px;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    padding: 1.5rem; 
    border-radius: 0.5rem; 
    box-shadow: 0 4px 6px -1px rgba(197, 186, 255, 0.1), 0 2px 4px -1px rgba(197, 186, 255, 0.06); 
   
}
.hc-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
    transform: translateY(-2px); /* Slight lift on hover */
}

.hc-button {
    background-color: rgb(197, 186, 255);
    font-weight: 700;
    color: white;
    padding: 10px 20px;
    border-radius: 12px;
    border-color: rgb(197, 186, 255);
    cursor: pointer;
}

.hc-routerlink {
    display: flex;
    justify-content: flex-end;
}

.hc-head{
    text-align: center;
    
}

.hc-head-container {
    width:auto;
    background-color: rgb(232, 249, 255);
    border-radius: 15px;
}

.hc-para {
    text-align: center;
  
}
</style>