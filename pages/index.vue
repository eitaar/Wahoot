<template>
    <background />
    <div id="sidebar" :style="{backgroundColor:modulesList.theme.colors.sub}"></div>
    <img id="img1"src="~/assets/img/webimage1.webp" :style="{border: `1vmin solid ${modulesList.theme.colors.acc1}`}"/>
    <div id="titlearea">
        <h1 style="padding-left:5%;padding-top:5%" :style="{color:modulesList.theme.colors.text1}">h1</h1>
    </div>
</template>
<script setup>
definePageMeta({
  middleware: ["checkclient"]
});
import { ref, onMounted, computed, nextTick } from 'vue';
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const { modifyConfig } = moduleConfigs;
const isTitle = ref(true);
</script>

<style scoped>
#sidebar {
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width: 5%;
}
#titlearea {
    position:absolute;
    text-align: left;
    left: 5.5%;
    top:1vmin;
    width:46%;
    height:50%;
}
#img1{
    max-width: 100%;
    height: auto;
    border-radius: 2vmin;
    position: absolute;
    right:1vmin;
    top:1vmin;
    width: 46%; 
}
</style>
