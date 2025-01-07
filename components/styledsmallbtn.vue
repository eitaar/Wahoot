<template>
  <button ref="styledSmallBtn" class="styledSmallBtn"
    v-wave="{
      color: 'white',
      initialOpacity: 0.5,
      easing: 'ease-out',
      tagName: 'border-radius'
    }"
    :style="buttonStyle"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  ></button>
</template>

<script setup>
import { ref, computed } from 'vue';
const styledSmallBtn = ref(null);
const isHovered = ref(false);
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const { modifyConfig } = moduleConfigs;

const buttonStyle = computed(() => ({
  backgroundColor: isHovered.value ? modulesList.value.theme.colors.acc1b : modulesList.value.theme.colors.acc1,
  color: modulesList.value.theme.colors.text2
}));

defineExpose({ styledSmallBtn });
</script>

<style scoped>
.styledSmallBtn {
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 70%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 42.5%;
  height: 37%;
  border: 0;
  opacity: 0;
  border-radius: 4px;
  font-weight: bold;
  font-size: 2vmin;
  box-shadow: 0px -4px inset rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease-in-out;
}

.styledSmallBtn:active {
  margin-top: 1%;
}

.styledSmallBtn:hover {
  transform: translate(-50%, -50%) scale(1.025);
}
</style>
