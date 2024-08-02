<template>
    <button ref="settingBtn" @click="openSettings" class="settingBtn">
      <div class="imgContainer">
        <img id="settingImg" src="/assets/img/settings.webp" alt="Settings">
      </div>
      Settings
    </button>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const settingBtn = ref(null)
  
  function openSettings() {
    // Your logic for opening settings
    console.log('Settings opened')
  }
  </script>
  
  <style scoped>
  .settingBtn {
    position: absolute;
    width: 15vmin;
    height: 4vmin;
    border: none;
    border-radius: 100vmin;
    right: 1%;
    top: 2%;
    color: #000;
    text-align: left;
    font-size: 2.7vmin;
    font-weight: bold;
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
  }
  
  .imgContainer {
    position: relative;
    width: 4vmin;
    padding-top: 4vmin;
    margin-left: 1%;
    margin-right: 2%;
  }
  
  #settingImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
  }
  
  .settingBtn:hover {
    background-color: #B7E8FF;
  }
  
  .settingBtn:active {
    transform: translateY(0.1vmin);
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.75);
  }

</style>
  