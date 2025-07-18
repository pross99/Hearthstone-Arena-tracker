<script setup>
import { defineProps, ref, computed, watch, onMounted } from 'vue';
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


//Looks ugly. Need to rethink
const headerItems = computed(() => {
   const firstEntry = Object.values(props.stats || {})[0];
  return firstEntry ? Object.keys(firstEntry) : [];
})


const shallowRows = ref([])

onMounted(() => {
  shallowRows.value = [...statsArray.value]
})

watch(statsArray, (newValue) => {
  shallowRows.value = [...newValue]
})


const sortData = (sortBy, direction) => {

  let sortedArray = [...shallowRows.value]

switch(sortBy) {
  case 'className':
      sortedArray = sortedArray.sort((a, b) => {
        if (direction === 'ASC') {
          return a[sortBy].localeCompare(b[sortBy])
        } else {
          return b[sortBy].localeCompare(a[sortBy])
        }
      })
      break
    default:
      sortedArray = sortedArray.sort((a, b) => {
        if (direction === 'ASC') {
          return a[sortBy] - b[sortBy]
        } else {
          return b[sortBy] - a[sortBy]
        }
      })
  }

  shallowRows.value = sortedArray

}

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
           <th v-for="header in headerItems" :key="header">{{ header.toUpperCase() }}
               <button @click="sortData(header, 'ASC')">Asc</button>
           <button @click="sortData(header, 'DESC')">Desc</button>
           </th>
        
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="cls in shallowRows" :key="cls.classId">
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
    width: 45%;
    padding-left: 2rem;
padding-right: 2rem;
padding-top:2.5rem;
padding-bottom: 2.5rem;
 background-color:rgba(76,86,111, 0.7);
  text-shadow: -1px -1px -1px #ffffff, 0.1px 0.1px 0.1px #ffffff;
    box-shadow: 
    inset -5px 5px hsl(34 61.5 36.7% / 0.1),
    -20px 20px 40px hsla(0, 0%, 99%, 0.92) ;
border-radius: 8px;
margin-left: 0;
margin-right: 0;
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
  color: rgb(151,101,36);
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
  background-color:rgb(38,37,48);
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
 background-color:rgb(38,37,48);
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