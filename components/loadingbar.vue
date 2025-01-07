<template>
    <div id="loadingBar" :style="{ width: progress + '%'}"><p id="number">{{ Math.round(progress) }}%</p></div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
const { modulesList } = storeToRefs(useModuleConfigStore());
const props = defineProps({progress: {type: Number}});
</script>

<style scoped>
#loadingBar {
    height: 2.5vmin;
    border-radius: 100vmin;
    background-color: v-bind("modulesList.theme.colors.acc1");
    color: v-bind("modulesList.theme.colors.text2");
}
#number {
    font-size: 2vmin;
    text-align: center;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    padding-left: 1.5vmin;
    margin: auto;
}
</style>