<template>
    <div class="background" :style="{backgroundColor: base}" />
</template>
<script setup>
const { base} = useColorStore();
</script>
<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}
</style>