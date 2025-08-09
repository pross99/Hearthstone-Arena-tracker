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
                <button @click="navigate" class="hc-button-29">Browse</button>
            </RouterLink>
        </Card>

        <Card class="hc-card">
            <div class="hc-head-container">
                <p class="hc-para">Add new run</p>
            </div>
            <RouterLink to="/runs/add" class="hc-routerlink">
                <button @click="navigate" class="hc-button-29">Add</button>
            </RouterLink>
        </Card>
    </div>
</section>

</template>

<style lang="scss">
.hc {
background-color: rgb(234,235,202);
    padding: 2rem;
    border-radius: 20px;
    display: none;
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
   
    margin-bottom: 0.5rem;
}

.hc-para {
  
    opacity: 0.85;
    margin-bottom: 1rem;
}

.hc-routerlink {
    text-decoration: none;
}



</style>