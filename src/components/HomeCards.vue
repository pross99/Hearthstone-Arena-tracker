<script setup>
import Card from '@/components/Card.vue';
import { RouterLink } from 'vue-router';
</script>


<template>
   <section class="hc">
    <div class="hc-container">
        <Card class="hc-card">
            <div class="hc-head-container">
                 <p class="hc-para">Browse Runs</p>
            </div>
            <RouterLink to="/runs" class="hc-routerlink">
                <button @click="navigate" class="hc-button">Browse</button>
            </RouterLink>
        </Card>

        <Card class="hc-card">
            <div class="hc-head-container">
                <p class="hc-para">Add new run</p>
            </div>
            <RouterLink to="/runs/add" class="hc-routerlink">
                <button @click="navigate" class="hc-button">Add</button>
            </RouterLink>
        </Card>
    </div>
</section>

</template>

<style>
.hc {
    background-color: rgb(38,37,48);
    padding: 2rem;
}

.hc-container {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.hc-card {
    background-color: rgb(76,86,111);
    border-radius: 12px;
    padding: 1.5rem;
    color: #fff;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hc-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 10px rgba(0,0,0,0.3);
}

.hc-head {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.hc-para {
    font-size: 1rem;
    opacity: 0.85;
    margin-bottom: 1rem;
}

.hc-routerlink {
    text-decoration: none;
}

.hc-button {
    background-color: rgb(151,101,36);
    color: #fff;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
}

.hc-button:hover {
    background-color: rgb(131, 88, 32);
}


</style>