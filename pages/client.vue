<template>
    <span><h1>Test Client</h1></span>
    <input type="input" v-model="pin" placeholder="pin" />
    <input type="input" v-model="name" placeholder="name" />
    <button @click="join">Join</button>
    <button @click="name = Date.now()">time</button><br/>
    <input type="input" v-model="cos1" placeholder="cos1" />
    <input type="input" v-model="cos2" placeholder="cos2" />   
    <button @click="cost">change costume</button>
    <button @click="fa">fetch</button>
    <ul id="console" style="margin-top:100px">
        <li v-for="log in logs" :key="log.message">{{ log.message }}</li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import { kahoot } from '~/assets/src/kahoot/kahoot';

// Define reactive references for the input fields
const client = new kahoot();
const pin = ref("");
const name = ref("");
const cos1 = ref("");
const cos2 = ref("");

// Use ref to make logs reactive
const logs = ref([]);

// Join function
async function join() {
    await client.join(parseInt(pin.value), `wahoot.${name.value}`);
}

// Listen to the "joined" event and update logs
client.on("joined", () => {
    console.log(`Joined ${pin.value}`);
    logs.value.push({ message: `Joined in game with pin: ${pin.value}` });
    console.log(logs.value);
});

// Costume change function
async function cost() {
    await client.changeCostume(cos1.value, cos2.value);
}

async function fa() {
    const res = await fetch("https://apis.kahoot.it/game-reward-service/api/v1/config/avatar?showPartnerCollections=false");
    console.log(res);
}
</script>
