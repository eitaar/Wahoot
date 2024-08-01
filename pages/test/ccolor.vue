<template>
    <div id="base" :style="{ backgroundColor: baseColor }">Base</div>
    <div id="sub" :style="{ backgroundColor: subColor }">Sub</div>
    <div id="acc1" :style="{ backgroundColor: acc1Color }">acc1</div>
    <div id="acc2" :style="{ backgroundColor: acc2Color }">acc2</div>
    <button @click="changeColor">Click</button>
    <button @click="resetColor">Reset</button>
    <button @click="logBaseColor">Log</button>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useColorStore } from '~/stores/pageColor';
  
  const colorStore = useColorStore();
  const baseColor = ref(colorStore.base);
  const subColor = ref(colorStore.sub);
  const acc1Color = ref(colorStore.acc1);
  const acc2Color = ref(colorStore.acc2);
  
  function changeColor() {
    baseColor.value = "#544179";
    subColor.value = "#6166B3";
    acc1Color.value = "#32C1CD";
    acc2Color.value = "#17D7A0";
    colorStore.setColor('base', "#381272");
    colorStore.setColor('sub', "#321066");
    colorStore.setColor('acc1', "#fff");
    colorStore.setColor('acc2', "#fff");
  }
  
  function resetColor() {
    baseColor.value = colorStore.base;
    subColor.value = colorStore.sub;
    acc1Color.value = colorStore.acc1;
    acc2Color.value = colorStore.acc2;
    colorStore.changeColorToDefault();
  }
  
  function logBaseColor() {
    console.log(baseColor.value);
  }
  
  // Watch the baseColor and update the page background
  onMounted(() => {
    watch(baseColor, (newColor) => {
      document.body.style.backgroundColor = newColor;
    }, { immediate: true });
  });
  </script>
  
  <style scoped>
  #base {
    width: 1000px;
    height: 100px;
  }
  #sub {
    width: 500px;
    height: 100px;
  }
  #acc1 {
    width: 250px;
    height: 100px;
  }
  #acc2 {
    width: 250px;
    height: 100px;
  }
  </style>
  