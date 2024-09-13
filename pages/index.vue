<template>
    <div class="background" :style="{backgroundColor:base}"/>
    <div id="sidebar" :style="{backgroundColor:sub}"></div>
    <img id="img1"src="~/assets/img/webimage1.webp" :style="{border: `1vmin solid ${acc1}`}"/>
    <div id="titlearea">
        <h1 style="padding-left:5%;padding-top:5%" :style="{color:text1}">h1</h1>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
const { base, sub, acc1, acc2, text1, setColor, changeColorToDefault} = useColorStore();
const isTitle = ref(true);
</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    text-align: center;
    background-position: center;
    z-index: -1;
}
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
