import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useClientStore = defineStore('clientStore', () => {
  const clientStore = ref(null);
  return {
    clientStore,
  };
});
