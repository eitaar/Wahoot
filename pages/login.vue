<template>
    <background />
    <loading v-if="loadingTime" text="Loading"/>
    <div id="formArea" :style="{ backgroundColor: sub }">
        <div id="activateCodeInput" v-if="activateCodeInput">
            <Styledinput v-model="codeInput" placeholder="Enter activation code" />
        </div>
        <div v-else>
            <!-- Content when activateCodeInput is false -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Using color store to get sub color
const { sub } = useColorStore();

// Define reactive states
const activateCodeInput = ref(true);
const codeInput = ref('');
const loadingTime = ref(true);
</script>

<style scoped>
#formArea {
    position: absolute;
    width: 30%;
    height: 30%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5vmin;   
}
#activateCodeInput {
    position: absolute;
    border-radius: 5vmin;
    width: 80%; 
    height: 80%;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
