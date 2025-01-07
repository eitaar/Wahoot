<template>
    <div>
        <h1>flooder</h1>
        <input type="text" v-model="pin" placeholder="Pin" />
        <input type="text" v-model="name" placeholder="Name" />
        <button @click="join">Join</button>
        <button @click="name = Date.now()">Set Time</button>
        <ul id="console" style="margin-top: 100px">
            <li v-for="log in logs" :key="log.message">{{ log.message }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { Kahoot } from '~/assets/src/kahoot/kahoot';

const pin = ref("");
const name = ref("");
const logs = ref([]);
const clients = Array.from({ length: 10 }, () => new Kahoot());
async function join() {
    for (let i = 0; i < clients.length; i++) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await clients[i].join(parseInt(pin.value), `${name.value}-${i + 1}`);
        } catch (error) {
            logs.value.push({ message: `Error joining client ${i + 1}: ${error.message}` });
        }
    }
}

clients.forEach((client, index) => {
    client.on("joined", () => {
        logs.value.push({ message: `Client ${index + 1} joined in game with pin: ${pin.value}` });
    });

    client.on("quizStart", () => {
        logs.value.push({ message: `Client ${index + 1} quiz started` });
    });

    client.on("questionReady", () => {
        logs.value.push({ message: `Client ${index + 1} question ready` });
    });

    client.on("questionStart", () => {
        logs.value.push({ message: `Client ${index + 1} question started` });
        client.answer([0]);
    });

    client.on("questionEnd", () => {
        logs.value.push({ message: `Client ${index + 1} question ended` });
    });
});
</script>
