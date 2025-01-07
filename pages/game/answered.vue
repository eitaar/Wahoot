<template>
    <background />
    <setting />
    <h1 :style="{color:modulesList.theme.colors.text1}">Answered</h1>
    <gameinfobar :nickname="client?client.clientData.nickname:'dev mode'" :score="client?client.clientData.score:123456" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const { modulesList } = storeToRefs(useModuleConfigStore());
const {clientStore} = storeToRefs(useClientStore());
const client = clientStore.value;

onMounted(() => {
  if (client) {
    console.log("Client is initialized!");
    client.on("questionEnd",(data)=>{
        client.clientData.score = (JSON.parse(data.data.content)).totalScore;
        clientStore.value = client;
        navigateTo("/game/result");
    })
  } else {
    console.error("Client is not initialized!");
  }
});

definePageMeta({
  middleware: ["checkclient"]
});
</script>