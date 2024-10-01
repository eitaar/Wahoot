import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useClientStore = defineStore('clientStore', () => {
  const client = ref(null);
  const setClient = (clientInstance) => {
    client.value = clientInstance;
  };
  return {
    client,
    setClient,
  };
});
