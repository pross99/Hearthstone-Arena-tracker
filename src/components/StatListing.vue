<script setup>
import { defineProps, ref, computed,defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios'
import { useToast } from 'vue-toastification';


const props = defineProps({
     stats: Object,
})



// iterate and option for sorting

const statsArray = computed(() => {

    return Object.entries(props.stats).map(([classId, data]) => ({
        classId,
        ...data
    })).sort((a,b) => b.winrate - a.winrate) // sort by winrate
})


</script>

<template>

    <div class="stat">
    <div class="s-container">
        <div class="s-title-container">
        <h1 class="s-title">Statistics by Class</h1>
        </div>
    <table class="s-table">
      <thead>
        <tr>
          <th sameClass>Class</th>
          <th sameClass>Runs</th>
          <th sameClass>Wins</th>
          <th sameClass>Matches</th>
          <th sameClass>Winrate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cls in statsArray" :key="cls.classId">
          <td sameClass>{{ cls.className }}</td>
          <td sameClass>{{ cls.totalRuns }}</td>
          <td sameClass>{{ cls.totalWins }}</td>
          <td sameClass>{{ cls.totalMatches }}</td>
          <td sameClass>{{ cls.winrate.toFixed(1) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>

</template>


<style>
.stat {

    height: 800px;
    width: 100%;
    background-color: black;
    padding-left: 2rem;
padding-right: 2rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
background-color: rgb(196, 217, 255);
border-radius: 8px;
}

.s-container{
        display: flex; 
padding-left: 5rem;
padding-right: 5rem; 
border-radius: 8px;
flex-direction: column; 
align-items: center; 
 max-width: 80rem;
 height: 800px;  
 background-color: rgb(251, 251, 251);
}

.s-title {
     padding: 10px;
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: #080808;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}


.s-title-container h1::after {
  width: 100px;
  height: 1px;
  display: block;
  content: "";
  position: relative;
  margin-top: 25px;
  left: 50%;
  margin-left: -50px;
  background-color: rgb(196, 217, 255);
}

.s-table {
        border-collapse: collapse;
    margin: 25px 0px;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    height: 800px;
}
.s-table thead tr {
 background-color:rgb(196, 217, 255);
    color: #ffffff;
    text-align: left;

}

.s-table th,
.s-table td {
    padding: 12px 15px;
}

.s-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.s-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.s-table tbody tr:last-of-type {
    border-bottom: 2px solid rgb(196, 217, 255);
}

.s-table tbody tr.active-row {
    font-weight: bold;
    color: rgb(196, 217, 255);
}
   
</style>