<template>
  <button ref="styledBtn" class="styledBtn"
    v-wave="{
      color: 'white',
      initialOpacity: 0.5,
      easing: 'ease-out',
      tagName: 'border-radius'
    }"  
    :style="buttonStyle"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    Enter
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';
const { acc1, text2 } = useColorStore();
const styledBtn = ref(null);
const isHovered = ref(false);

const buttonStyle = computed(() => ({
  backgroundColor: isHovered.value ? '#04bcc4' : acc1,color: text2}));

defineExpose({styledBtn});
</script>

<style scoped>
.styledBtn {
  font-family: Calibri,sans-serif,system-ui;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 87.5%;
  height: 37%;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 0px -4px inset rgba(0, 0, 0, 0.25);
}

.styledBtn:active {
  margin-top: 1%;
}
</style>
