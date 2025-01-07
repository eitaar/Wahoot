<template>
  <background />
  <setting />
  <gameinfobar :nickname="client?.clientData.nickname || 'dev mode'" :score="client?.clientData.score || 123456" />
  <h1 id="time">{{ Math.round(time/100)/10 }}</h1>
  <div id="wrapper">
    <Loadingbar :progress="progress" id="loadingBar"/>
  </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const { clientStore } = storeToRefs(useClientStore());
const client = clientStore.value;
const initialTime = client?.gameData.getReadyTime || 3000;
const time = ref(initialTime);
const progress = ref(100);

onMounted(() => {
  const updateCountdown = () => {
    const elapsed = Date.now() - startTime;
    time.value = Math.max(initialTime - elapsed, 0);
    progress.value = 100-((time.value / initialTime) * 100)
    if (time.value > 0) requestAnimationFrame(updateCountdown);
  };

  const startTime = Date.now();
  updateCountdown();

  client?.on("questionStart", () => {
    console.log(time.value, client.gameData.gameBlockType);
    navigateTo("/game/gameblock");
  });
});

definePageMeta({ middleware: ["checkclient"] });
</script>
<style scoped>
#wrapper {
  position: absolute;
  width:110%;
  left:-5%;
  bottom:15vmin
}
#time {
  font-size: 5vmin;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
