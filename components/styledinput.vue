<template>
  <input class="styledInput" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="styledInput" autocomplete="off"
  ></input>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['modelValue']);
const styledInput = ref(null);
defineExpose({styledInput})
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const { modifyConfig } = moduleConfigs;
</script>

<style scoped>
.styledInput {
  text-align: center;
  border: 0.125rem solid;
  width: 87.5%;
  height: 37%;
  border-radius: 4px;
  font-weight: 700;
  font-size: 18px;
  box-sizing: border-box;
  cursor: text;
  transform: translate(-50%, -50%);
  transition: transform 0.25s ease-in-out;
  font-size: 2vmin;
  background-color: v-bind("modulesList.theme.colors.sub2");
  color: v-bind("modulesList.theme.colors.text3");
  border: 0.25vmin solid;
  border-color: v-bind("modulesList.theme.colors.acc2");
}

.styledInput:focus {
  outline: none;
}

.styledInput:hover {
  transform: translate(-50%, -50%) scale(1.025);
}

</style>
