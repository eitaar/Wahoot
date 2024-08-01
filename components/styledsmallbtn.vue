<template>
  <button ref="styledSmallBtn" class="styledSmallBtn"
  v-wave="{
      color: 'white',
      initialOpacity: 0.5,
      easing: 'ease-out',
      tagName: 'border-radius'
  }"  
  ></button>
  </template>
  
  <script setup>
  import {ref } from 'vue';
  const styledSmallBtn = ref(null);
  defineExpose({styledSmallBtn});
  
  </script>
  <style scoped>
  .styledSmallBtn {
    position: absolute;
    top: 70%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    width: 42.5%;
    height: 37%;
    border: 0;
    background-color: #1c1e24;
    color: #fff;
    border-radius: 4px;
    font-weight: bold;
    font-size: 18px;
    box-shadow: 0px -4px inset rgba(0, 0, 0, 0.25);
  }
  
  .styledSmallBtn:hover {
    background-color: #333;
  }
  
  .styledSmallBtn:active {
    margin-top: 1%;
  }
  </style>
  