import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useColorStore = defineStore("colorPallete",() => {
const base = ref("#0B2447");
const sub = ref("#19376D");
const acc1 = ref("#576CBC");
const acc2 = ref("#A5D7E8");
const text1 = ref("#000");
const text2 = ref("#fff");

function setColor(type,color) {
    switch (type) {
        case "base":
            base.value = color;
            break;
        case "sub":
            sub.value = color;
            break;
        case "acc1":
            acc1.value = color;
            break;
        case "acc2":
            acc2.value = color;
            break;
        default:
            console.error("Invalid color type");
    }
}
function changeColorToDefault() {
    base.value = "#0B2447";
    sub.value = "#19376D";
    acc1.value = "#576CBC";
    acc2.value = "#A5D7E8";
}
return { base, sub, acc1, acc2, text1, text2,setColor, changeColorToDefault};
},
{
    persist: true,
}
);