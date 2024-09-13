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
const { acc1, text2 } = useColorStore();

const buttonStyle = computed(() => ({
  backgroundColor: isHovered.value ? '#04bcc4' : acc1,
  color: text2
}));

defineExpose({ styledSmallBtn });
</script>

<style scoped>
.styledSmallBtn {
  font-family: Calibri,sans-serif,system-ui;
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
  font-size: 20px;
  box-shadow: 0px -4px inset rgba(0, 0, 0, 0.25);
}

.styledSmallBtn:active {
  margin-top: 1%;
}
</style>
