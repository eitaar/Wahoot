import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    function increment() {
      count.value++;
    }
    function setvalue(num) {
      count.value = num;
    }
    return { count, increment,setvalue };
  },
{
  persist: true,
}
);