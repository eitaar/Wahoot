<template>
  <div class="gameinfobar" :style="{backgroundColor:acc2}">
    <p>test</p>
  </div>
</template>
<script setup>
const { base, sub, text1, acc2 } = useColorStore();
</script>
<style scoped>
.gameinfobar {
  left: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height:10%;
  backdrop-filter: blur(12px);
}
</style>