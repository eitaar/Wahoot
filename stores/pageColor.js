import { ref } from "vue";
import { defineStore } from "pinia";

export const useColorStore = defineStore("colorPallete", () => {
    const white = ref("#000000")
    const base = ref("#222831");
    const sub = ref("#393E46");
    const acc1 = ref("#00ADB5");
    const acc2 = ref("#CCCCCC");
    const text1 = ref("#fff");
    const text2 = ref("#202020");

    function setColor(type, color) {
        switch (type) {
            case "white":
                white.value = color;
                break;
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
            case "text1":
                text1.value = color;
                break;
            default:
                console.error("Invalid color type");
        }
    }
    function changeColorToDefault() {
        white.value = "#F0F2F3"
        base.value = "#222831";
        sub.value = "#393E46";
        acc1.value = "#00ADB5";
        acc2.value = "#EEEEEE";
        text1.value = "#000"
    }
    return { white, base, sub, acc1, acc2, text1, text2, setColor, changeColorToDefault };
},
    {
        persist: true,
    }
);