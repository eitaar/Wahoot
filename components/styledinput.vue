<template>
  <input class="styledInput" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="styledInput" autocomplete="off"
  :style="{ backgroundColor: sub, border: `0.125rem solid ${acc2}`,color: text1}"
  />
</template>

<script setup>
import { ref } from 'vue';
const {sub, acc2, text1} = useColorStore();
const props = defineProps(['modelValue']);
const styledInput = ref(null);
defineExpose({styledInput})
</script>

<style>
.styledInput {
  position: absolute;
  text-align: center;
  top: 30%;
  left: 50%;
  border: 0.125rem solid;
  transform: translate(-50%, -50%);
  width: 87.5%;
  height: 37%;
  border-radius: 4px;
  font-weight: 700;
  font-size: 18px;
  box-sizing: border-box;
  cursor: text;
}
</style>
