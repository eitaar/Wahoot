<template>
  <background />
  <h2 id="title">
    Joined as
    {{
      client
        ? client.clientData.nickname.length <= 15
          ? client.clientData.nickname
          : `${client.clientData.nickname.substring(0, 12)}...`
        : "dev mode"
    }}
  </h2>
  <setting loadIn="true"/>
  <gameinfobar
    id="gameInfoBar"
    :nickname="client ? client.clientData.nickname : 'dev mode'"
    :score="client ? client.clientData.score : 123456"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const { modulesList } = storeToRefs(useModuleConfigStore());
const { clientStore } = storeToRefs(useClientStore());
const title = ref("Waiting for join...");
const client = clientStore.value;

definePageMeta({
  middleware: ["checkclient"]
});

onMounted(() => {
  console.log("loaded");

  if (!client) {
    console.error("Client is not initialized!");
  } else {
    title.value = `Connected as ${client.clientData.nickname}`;

    client.on("quizStart", (data) => {
      clientStore.value = client;
      navigateTo("/game/start");
    });
  }
});
</script>

<style scoped>
#title {
  font-size: 48px;
  text-align: center;
  margin-top: 100px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeTitleIn 0.75s ease-in-out forwards;
  opacity: 0;
  color: v-bind("modulesList.theme.colors.text5");
}

#gameInfoBar {
  position: absolute;
  transform: translateY(150%);
  width: 100%;
  animation: moveBarUp 0.75s ease-in-out forwards;
}

@keyframes moveBarUp {
  0% {
    transform: translateY(150%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes fadeTitleIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
