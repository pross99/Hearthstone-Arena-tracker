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

<style>
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

.hc-button-29 {
    margin-top: 20px;
  align-items: center;
  appearance: none;
  background-image: radial-gradient(80% 80% at 100% 0, rgb(240,240,240) 0, rgb(151,101,36) 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  
}

.hc-button-29:focus {
  box-shadow: rgb(151,101,36) 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.hc-button-29:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgb(151,101,36) 0 -3px 0 inset;
  transform: translateY(-2px);
}

.hc-button-29:active {
  box-shadow: rgb(151,101,36) 0 3px 7px inset;
  transform: translateY(2px);
}


</style>