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
}

.hc-container {
    width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}


.hc-card{
    background-color: bisque;
}

.hc-button {
    color: black;
    font-weight: 700;
}

</style>