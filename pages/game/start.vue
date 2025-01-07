<template>
  <setting />
  <background />
  <loading text="Get ready!!" dot="false" dark="false" />
  <gameinfobar
    id="gameInfoBar"
    :nickname="client ? client.clientData.nickname : 'dev mode'"
    :score="client ? client.clientData.score : 123456"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const router = useRouter();
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const {clientStore} = storeToRefs(useClientStore());
const client = clientStore.value;

definePageMeta({
  middleware: ["checkclient"]
});

onMounted(() => {
  if (client) {
    client.on("questionReady", (data) => {
      clientStore.value = client; 
      navigateTo("/game/getready");
    });
  } else {
    console.error("Client is not initialized!");
  }
});
</script>

<style scoped>
#gameInfoBar {
  position: absolute;
  width: 100%;
  padding: 10px;
}
</style>
