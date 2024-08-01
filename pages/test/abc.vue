<template>
    <div :style="{ backgroundColor: backgroundColor }" class="container">
      <h1>Welcome to the Random Background Color Page!</h1>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const { data: colorData } = await useAsyncData('random-color', async () => {
    const response = await fetch('https://x-colors.yurace.pro/api/random');
    const data = await response.json();
    return data;
  });
  
  const backgroundColor = ref(colorData.value.hex);
  </script>
  
  <style scoped>
  body {
    background-color: green;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #fff;
    text-align: center;
  }
  </style>
  