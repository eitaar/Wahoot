<template>
  <div id="loadingBackground">
    <h1 id="loadingText" :style="{ color: text1 }">{{ text }}{{ dot }}</h1>
    <img src="/assets/img/loading.svg" id="loadingIcon" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { text1 } = useColorStore();
const props = defineProps(["text"]);
const dot = ref("");
let c = 0;
onMounted(() => {
  setInterval(() => {
    c++;
    dot.value = ".".repeat((c % 3) + 1);
  }, 500);
});
</script>

<style scoped>
#loadingBackground {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
} 

#loadingIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#loadingText {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
