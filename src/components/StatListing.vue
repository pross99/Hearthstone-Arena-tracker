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

</template>


<style>

.s-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  height: 650px;
  margin-bottom: 20px;
}

.s-table thead {
  background-color: var(--main-color);
  color: white;
  text-align: left;
}

.s-table th,
.s-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.s-table tbody tr:nth-child(odd) {
  background-color: #eaebca; /* light cream */
}

.s-table tbody tr:nth-child(even) {
  background-color: #ffffff;
}

.s-table tbody td {
  color: #262530; /* dark gray for text */
}

.sort-btn {
  background: none;
  border: none;
  color: #ffffff;
  margin-left: 4px;
  cursor: pointer;
}

.sort-btn:hover {
  color: var(--third-color);
}

.s-title {
  color: var(--third-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
   
</style>