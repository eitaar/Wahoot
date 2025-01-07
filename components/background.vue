<template>
    <div class="background" />
</template>
<script setup>
import { storeToRefs } from 'pinia';
const { modulesList } = storeToRefs(useModuleConfigStore());
</script>
<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-color: v-bind("modulesList.theme.colors.base");
}
</style>