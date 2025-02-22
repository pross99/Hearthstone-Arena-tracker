<script setup>
import Card from '@/components/Card.vue';
import { RouterLink } from 'vue-router';
</script>


<template>
    <section class="hc">
        <div class="hc-container">
            <Card>
                <h2 class="hc-head">
                    View saved tattoos
                </h2>
                <p class="hc-para">
                   Browse your saved pics
                </p>
                <RouterLink to="/tattoos" class="hc-button">
                   Browse tattoos
                </RouterLink>
            </Card>

            <Card bg='hc-card'>
                <h2 class="hc-head">
                    New tattoos
                </h2>
                <p class="hc-para">
                   List your new tattoo idea
                </p>
                <RouterLink to="/tattoos/add" class="hc-button">
                    Add Tattoo
                </RouterLink>
            </Card>
        </div>
    </section>
</template>

<style>

.hc{
    padding-top: 1rem;
padding-bottom: 1rem; 
width: 85rem;
margin: auto;
}

.hc-container {
  display: flex;  
}

.hc-card{
    background-color: bisque;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    padding: 1.5rem; 
    border-radius: 0.5rem; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
   
}

.hc-button {
    color: black;
    font-weight: 700;
}

.hc-head{
    text-align: center;
}
.hc-para {
    text-align: center;
}

.hc-button {
   padding-left: 50%;
}
</style>