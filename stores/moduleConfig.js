import { ref } from "vue";
import { defineStore } from "pinia";

export const useModuleConfigStore = defineStore("moduleConfig", () => {
    const modulesList = ref({
        infNickGen: { enabled: true, preFetch: { enabled: true, number: 5 } },
        kBind: { enabled: true, keys: {red:'1',blue:'2',yellow:'3',green:'4'}},
        ucName: { enabled: true },
        pMultiplier : { enabled: true,number: 10},
        theme: {
            special: { msg: "dark",},
            colors: {base: "#222831",sub: "#393E46", sub2:"#393E46",acc1: "#00ADB5",acc1b: "#04bcc4",acc2: "#CCCCCC",text1: "#ffffff",text2: "#202020",text3:"#ffffff",text4:"#202020",text5: "#ffffff"},
            presets: {
                dark: {base: "#222831",sub: "#393E46", sub2:"#393E46",acc1: "#00ADB5",acc1b: "#04bcc4",acc2: "#CCCCCC",text1: "#ffffff",text2: "#202020",text3:"#ffffff",text4:"#202020",text5:"#ffffff"},
                kahoot: {base: "#381272",sub: "#321066",sub2: "#ffffff",acc1: "#2f2f2f",acc1b:"#3C3C3C",acc2: "#CCCCCC",text1: "#ffffff",text2: "#ffffff",text3: "#000000",text4:"#000000",text5:"#ffffff"},
                automn: {base: "#343131",sub: "#A04747", sub2: "#A04747",acc1: "#DF8C23", acc1b:"#F5A137",acc2: "#EEDF7A",text1: "#ffffff",text2: "#000000",text3: "#ffffff",text4:"#000000", text5:"#ffffff"},
            }
        },
    });
    
    function updateNestedValue(base, changes) {
        return { ...base, ...Object.entries(changes).reduce((acc, [key, value]) => {
            acc[key] = (typeof value === 'object' && value !== null)
                ? updateNestedValue(base[key] || {}, value)
                : value;    
            return acc;
        }, {}) };
    }

    function modifyConfig(name, config) {
        if (name === "theme" && !(/^\{.*\}$/.test(config))) {
            if (Object.keys(modulesList.value.theme.presets).includes(config)) {
                modulesList.value.theme =  updateNestedValue(modulesList.value.theme, {colors:modulesList.value.theme.presets[config]});
                modulesList.value.theme.special.msg = config;
            }
        }
        if (modulesList.value[name]) {
            modulesList.value[name] = updateNestedValue(modulesList.value[name], config);
        }
    }

    return { modulesList, modifyConfig };
},
{
    persist:false,
});
