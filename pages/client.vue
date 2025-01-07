<template>
    <div>
        <h1>Test Client</h1>
        <input type="text" v-model="pin" placeholder="Pin" />
        <input type="text" v-model="name" placeholder="Name" />
        <button @click="join">Join</button>
        <button @click="name = Date.now()">Set Time</button>
        
        <br />
        
        <input type="text" v-model="cos1" placeholder="Costume 1" />
        <input type="text" v-model="cos2" placeholder="Costume 2" />
        <button @click="cost">Change Costume</button>
        
        <br />
        
        <input type="text" v-model="choice" placeholder="Answer" />
        <button @click="ans">Submit Answer</button>
        
        <p>{{ choice.length > 0 ? choice.split(",") : null }}</p>
        
        <ul id="console" style="margin-top: 100px">
            <li v-for="log in logs" :key="log.message">{{ log.message }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Kahoot } from '~/assets/src/kahoot/kahoot';

const client = new Kahoot();
const pin = ref("");
const name = ref("");
const choice = ref("");
const cos1 = ref("");
const cos2 = ref("");

const logs = ref([]);

async function join() {
    try {
    await client.join(parseInt(pin.value), `${name.value}`);
    } catch (error) {
        logs.value.push({ message: `Error joining: ${error.message}` });
    }
}


client.on("joined", () => {
    logs.value.push({ message: `Joined in game with pin: ${pin.value}` });
});

client.on("quizStart", () => {
    logs.value.push({ message: `Quiz started` });
});

client.on("questionReady", () => {
    logs.value.push({ message: `Question ready` });
});

client.on("questionStart", () => {
    logs.value.push({ message: `Question started` });
});

client.on("questionEnd", () => {
    logs.value.push({ message: `Question ended` });
});

async function cost() {
    try {
        await client.changeCostume(cos1.value, cos2.value);
    } catch (error) {
        logs.value.push({ message: `Error changing costume: ${error.message}` });
    }
}


async function ans() {
    try {
        const answers = choice.value.split(",").map(Number);
        await client.answer(answers);
        logs.value.push({ message: `Submitted answer: ${choice.value}` });
    } catch (error) {
        logs.value.push({ message: `Error submitting answer: ${error.message}` });
    }
}

</script>
