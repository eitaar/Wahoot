<template>
  <input
    class="styledInput"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="styledInput"
    autocomplete="off"
    
  />
</template>

<script setup>
import { ref } from 'vue';
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
  transform: translate(-50%, -50%);
  width: 87.5%;
  height: 37%;
  border: 0.125rem solid rgb(204, 204, 204);
  border-radius: 4px;
  font-weight: 700;
  font-size: 18px;
  color: rgb(40, 40, 40);
  box-sizing: border-box;
  cursor: text;
}
</style>
