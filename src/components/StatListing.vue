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



const headerNames= {
  className: 'Class',
  totalRuns: 'Completed runs',
  totalWins: 'Wins',
  totalMatches: 'Matches played',
  winrate: 'Winrate'
}

// prepare clumn headers for sort callback
const headerItems = computed(() => {
   const firstEntry = Object.values(props.stats || {})[0];
  if(!firstEntry) return [];

  return Object.keys(firstEntry).map(key =>({
    key,
    name: headerNames[key] || key
  }));
});


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



function goodWinrate(num) {
if(num > 75) {
      return 'rgba(179,104,0,255)'
    }
    else if(num > 60){
      return '#a247b0'
    }
    else if(num > 50){
      return '#3e8df2'
    }
    else {
      return '#b0bcb2'
    }
}


</script>

<template>

    <div class="s-container">
        <h2>Statistics by class</h2>
      
    <table class="s-table">
      <thead>
        <tr>
           <th v-for="header in headerItems" :key="header">{{ header.name}}
               <button @click="sortData(header.key, 'ASC')" class="sort-btn">↑</button>
           <button @click="sortData(header.key, 'DESC')" class="sort-btn">↓</button>
           </th>
        
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="cls in shallowRows" :key="cls.classId">
          <td sameClass>{{ cls.className }}</td>
          <td sameClass>{{ cls.totalRuns }}</td>
          <td sameClass>{{ cls.totalWins }}</td>
          <td sameClass>{{ cls.totalMatches }}</td>
          <td :style="{ color:goodWinrate(cls.winrate)}">{{ cls.winrate.toFixed(1) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<style lang="scss">
.s-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  height: 650px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.s-table thead {
  background-color: $third-color;
  color: white;
  text-align: left;
}

.s-table th,
.s-table td {
  color: white;
  border: solid $third-color 1px;
  text-align: center;
  font-size: 15px;
}


td{
  width: 200px;
}

.s-table tbody tr:nth-child(odd) {
  background-color: $secondary-color /* light cream */
}

.s-table tbody tr:nth-child(even) {
  background-color: #ffffff;
}

.s-table tbody td {
  color: black;
}

.sort-btn {
  background: none;
  border: none;
  color: $secondary-color;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-left: 0px;

}

.sort-btn:hover {
  color: $primary-color;
}

.sort-btn:focus {
  color: $primary-color;
  box-shadow: none;
}

</style>