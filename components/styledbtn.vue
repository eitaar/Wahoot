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
const styledBtn = ref(null);
const isHovered = ref(false);
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const { modifyConfig } = moduleConfigs;
const buttonStyle = computed(() => ({
  backgroundColor: isHovered.value ? modulesList.value.theme.colors.acc1b : modulesList.value.theme.colors.acc1,color: modulesList.value.theme.colors.text2}));

defineExpose({styledBtn});
</script>

<style scoped>
.styledBtn {
  font-family:'Roboto', sans-serif;
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
  transition: transform 0.25s ease-in-out;
  font-size: 2vmin;
}

.styledBtn:active {
  margin-top: 1%;
}

.styledBtn:hover {
  transform: translate(-50%, -50%) scale(1.025);
}
</style>
