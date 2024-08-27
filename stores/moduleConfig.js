import { ref } from "vue";
import { defineStore } from "pinia";

export const useModuleConfigStore = defineStore("moduleConfig",() => {
    const InfiniteNicknameGenerator = ref(true);
    return { InfiniteNicknameGenerator};
},
{
    persist: true,
}
);