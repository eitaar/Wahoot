<template>
    <background />
    <setting />
    <h1 :style="{color:modulesList.theme.colors.text1}">{{ client?client.clientData.score:111111 }}</h1>
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
    ;
  } else {
    console.error("Client is not initialized!");
  }
});

definePageMeta({
  middleware: ["checkclient"]
});
</script>