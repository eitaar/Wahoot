<template>
    <p>{{ page }}/{{ totalPage }}</p>
    <div id="textWrapper" ref="textWrapper">
        <ReleasenoteNewest class="text" v-show="page == 1"/>
        <ReleasenoteIndev20240805 class=""text v-show="page == 2"/>
        <ReleasenoteIndev20240803 class="text" v-show="page==3" />
        <ReleasenoteIndev20240802 class="text" v-show="page==4"/>
    </div>
    <div ref="back" id="backNote" @click="pageBack" v-show="page != 1" tabindex="0"/>
    <div ref="next" id="nextNote" @click="nextPage" v-show="page != totalPage" tabindex="0"/>
</template>

<script setup>
import { ref } from 'vue';

const page = ref(1);
const totalPage = ref(4);
const textWrapper = ref(null);

const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const nextPage = async () => {
    textWrapper.value.classList.add("ml");
    await delay(500);
    page.value++;
    textWrapper.value.classList.remove("ml");
};

const pageBack = async () => {
    textWrapper.value.classList.add("ml-back");
    await delay(500);
    page.value--;
    textWrapper.value.classList.remove("ml-back");
};
</script>

<style scoped>
#textWrapper {
    width: 80%;
    height: 100%;
    margin: 0 auto; 
    background-color: #fff;
}

#backNote {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
    width: 4vmin;
    height: 4vmin;
    border: 1.5vmin solid;
    border-color: transparent transparent #565656 #565656;
    transform: rotate(45deg);
}

#nextNote {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translate(-50%, -50%);
    width: 4vmin;
    height: 4vmin;
    border: 1.5vmin solid;
    border-color: transparent transparent #565656 #565656;
    transform: rotate(225deg);
}

.ml {
    animation: moveleft 0.5s ease-in-out;
}

.ml-back {
    animation: moveright 0.5s ease-in-out;
}

@keyframes moveleft {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-150%);
    }
}

@keyframes moveright {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(150%);
    }
}
</style>
