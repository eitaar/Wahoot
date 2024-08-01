<template>
<button ref="styledBtn" class="styledBtn"
v-wave="{
    color: 'white',
    initialOpacity: 0.5,
    easing: 'ease-out',
    tagName: 'border-radius'
}"  
>Enter</button>
</template>

<script setup>
import {ref } from 'vue';
const styledBtn = ref(null);
defineExpose({styledBtn});

</script>
<style scoped>
.styledBtn {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 87.5%;
  height: 37%;
  border: 0;
  background-color: #1c1e24;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0px -4px inset rgba(0, 0, 0, 0.25);
}

.styledBtn:hover {
  background-color: #333;
}

.styledBtn:active {
  margin-top: 1%;
}
</style>