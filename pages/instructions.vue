<template>
  <background />
  <div>{{ text }}</div>
  <setting/>
  <gameinfobar/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const text = ref("Waiting for join...");
const clientStore = useClientStore();
const { client } = clientStore;

definePageMeta({
  middleware: ["checkclient"]
});

onMounted(() => {
  console.log("loaded");
  if (!client) {
    console.error('Client is not initialized!');
  }
});
</script>
