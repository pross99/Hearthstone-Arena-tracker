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


// prepare clumn headers for sort callback
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



// Dynamic sorting on each collumn
const sortData = (sortBy, direction) => {

  let sortedArray = [...shallowRows.value]

switch(sortBy) {

  //only column with alphabetical sorting
  case 'className':
      sortedArray = sortedArray.sort((a, b) => {
        if (direction === 'ASC') {
          return a[sortBy].localeCompare(b[sortBy])
          //
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
        <h1 class="s-title">Statistics by class</h1>
        </div>
    <table class="s-table">
      <thead>
        <tr>
           <th v-for="header in headerItems" :key="header">{{ header.toUpperCase() }}
               <button @click="sortData(header, 'ASC')" class="sort-btn">↑</button>
           <button @click="sortData(header, 'DESC')" class="sort-btn">↓</button>
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
    padding-left: 0.5rem;
padding-right: 0.5rem;
padding-top:0.5rem;
padding-bottom: 0.5rem;
 background-color: rgb(234,235,202);
border-radius: 20px;
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
}

.s-table {
        border-collapse: collapse;
    margin: 25px 0px;
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

.sort-btn {
  color: rgb(38, 37, 48);
}
   
</style>