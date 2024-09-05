<template>
    <div class="modules-container">
        <div v-if="filter === 'all' || filter === 'ingame'" class="modules" :style="{ backgroundColor: acc1 }">
            <h4 style="text-align: center; font-size: 1.75vmin;">Infinite Nickname Generator</h4>
            <div class="btn-container">
                <button @click="toggleModule('iNG')" class="toggleModuleBtn">Enabled</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const moduleConfig = ref({});
const props = defineProps(["filter"]);
const { acc1 } = useColorStore(); 

function toggleModule(name) {
    moduleConfig.value[name] = !moduleConfig.value[name];
    localStorage.setItem("moduleConfig", JSON.stringify(moduleConfig.value));   
}

onMounted(() => {
    setTimeout(() => {
        try {
            const storedConfig = localStorage.getItem("moduleConfig");
            moduleConfig.value = storedConfig ? JSON.parse(storedConfig) : {};
        } catch (err) {
            console.error(err);
            alert("error: see console");
        }
    }, 100);
});
</script>

<style scoped>
.modules-container {
    display: flex;  
    flex-wrap: wrap;
    margin-left: 1.25vmin;
}

.modules {
    width: 25vmin;
    height: 25vmin;
    margin-top: 1vmin;
    margin-left: 1vmin;
    border-radius: 3vmin;
    border: 0.25vmin solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%;
}

.toggleModuleBtn {
    border: 2px solid rgba(0, 0, 0,0.5);
    transform: translateY(-25%);
    width: 75%;
    height: 40%;    
    border-radius: 1.5vmin;
    background-color:#32CD32;
}
</style>
