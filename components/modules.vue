<template>
    <div class="modules-container">
      <div v-if="filter === 'all' || filter === 'ingame'" class="modules" :style="{ backgroundColor: acc1 }">
        <h4 style="text-align: center; font-size: 1.75vmin;">Infinite Nickname Generator</h4>
        <button @click="toggleModule('a')">Modify Config</button>
        <p v-show="localData.a">aaa</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const localData = ref({});
  
  const props = defineProps(["filter"]);
  const { acc1 } = useColorStore(); 
  
  function toggleModule(name) {
      localData.value[name] = !localData.value[name];
      localStorage.setItem("aa", JSON.stringify(localData.value));   
  }
  
  // Load data from localStorage on mount
  onMounted(() => {
      const savedData = localStorage.getItem("aa");
      if (savedData) {
          localData.value = JSON.parse(savedData);
      }
  });
  </script>
  
  <style scoped>
  .modules-container {
    display: flex;  
    flex-wrap: wrap;
    margin-left: 1.25vmin;
  }
  
  .modules {
    width: 25vmin;
    height: 25vmin;
    margin-top: 1vmin;
    margin-left: 1vmin;
    border-radius: 3vmin;
    border: 0.25vmin solid black;
  }
  </style>
  