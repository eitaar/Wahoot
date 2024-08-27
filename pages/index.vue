<template>
    <div class="background"/>
    <img v-if="isTitle" id="titleWrapper" src="~/assets/img/wahoot.webp" width="30%" height="30%">
        <h1>hi</h1>
</template>

<script setup>
import { ref } from 'vue';

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
    background-color: pink;
    z-index: -1;
}
#titleWrapper {
    font-size: 10vmin;
    color: #fff; 
    font-weight: bold;
    animation: load 2s;
}
@keyframes load {
    0% { transform: rotateX(0)}
    10% { transform: rotateZ(22.5deg)}
    30% { transform: rotateZ(-22.5deg)}
    50% { transform: rotateZ(45deg)};
}
</style>
