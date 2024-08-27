<template>
    <span ref="sppan"><h1>aa</h1></span>
    <input type="input" v-model="pin" placeholder="pin" />
    <input type="input" v-model="name" placeholder="name" />
    <button @click="join">Join</button>
    <button @click="gd">gd</button>
    <span ref="cs"></span>
</template>

<script setup>
import { ref } from 'vue';
import { Client } from '~/assets/src/kahoot/kahoot';

const client = new Client();
const pin = ref("");
const name = ref("");
const sppan = ref(null);
const cs = ref(null);
const join = async () => {
    await client.join(parseInt(pin.value), name.value);
    client.on("joined", () => {
        console.log(`Joined ${pin.value}`);
    });
};

const gd = async() => {
    await console.log(client.getGameData(parseInt(pin.value)));
};
</script>