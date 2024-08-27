import { ref} from "vue";
import { defineStore } from "pinia";

export const useColorStore = defineStore("colorPallete",() => {
    const base = ref("#365E32");
    const sub = ref("#81A263");
    const acc1 = ref("#E7D37F");
    const acc2 = ref("#729762");
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
        base.value = "#365E32";
        sub.value = "#81A263";
        acc1.value = "#E7D37F";
        acc2.value = "#729762";
    }
    return { base, sub, acc1, acc2, text1, text2,setColor, changeColorToDefault};
},
{
    persist: true,
}
);