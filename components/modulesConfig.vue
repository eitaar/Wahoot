<template>
    <div v-if="module === 'infNickGen'" class="configArea">
      <p class="configTitle">Prefetch Nickname</p>
      <div class="configRow">
        <p class="configTxt" style="margin-right: 1vmin">Number:</p>
        <input
          v-model="infNickGenRange1"
          type="range"
          min="1"
          max="10"
          class="configRange"
          @input="updateInfNickGenNumber"
        />
        <p class="configTxt">{{ infNickGenRange1 }}</p>
      </div>
      <button
        @click="togglePrefetch"
        class="configBtn"
        :class="{
          greenBtn: modulesList.infNickGen.preFetch.enabled,
          redBtn: !modulesList.infNickGen.preFetch.enabled,
        }"
      >
        {{ modulesList.infNickGen.preFetch.enabled ? "Enabled" : "Disabled" }}
      </button>
    </div>
  
    <div v-if="module === 'ucName'" class="configArea">
      <p class="configTitle">How to use</p>
      <p class="configTxt">1. Choose your character and get the Unicode (e.g., U+2665). </p>
      <p class="configTxt">2. Type \u{} in the nickname input field and put the Unicode without "U+"(e.g., \u{2665}).</p>
      <p class="configTxt">3. Add more Unicode or type normal text and submit (e.g., \u{2665} is a love mark).</p>
    </div>
  
    <div v-if="module === 'theme'" class="configArea">
      <p class="configTitle">Theme</p>
      <div v-for="color in themeColors" :key="color.key" class="configRow">
        <input
          v-model="color.model"
          type="color"
          class="configColor"
          :style="{ backgroundColor: color.value }"
          @input="updateThemeColor(color.key, color.model)"
        />
        <p class="configTxt">{{ color.key }}</p>
      </div>
    </div>
  
    <div v-if="module === 'pMultiplier'" class="configArea">
      <p class="configTitle">Multiplier</p>
      <div class="configRow">
        <p class="configTxt" style="margin-right: 1vmin">Number:</p>
        <input
          v-model="pMultiplierRange1"
          type="range"
          min="2"
          max="100"
          class="configRange"
          @input="updatePMultiplierNumber"
        />
        <p class="configTxt">{{ pMultiplierRange1 }}</p>
      </div>
    </div>
  
    <div v-if="module === 'kBind'" class="configArea">
      <p class="configTitle">Keybinds</p>
      <div v-for="(color, index) in keybindColors" :key="color" class="configRow">
        <p class="configTxt" style="margin-right: 1vmin">{{ color }}:</p>
        <input
          v-model="kBindInput[index]"
          maxlength="1"
          type="text"
          class="configSilentInput"
          @input="updateKeybind(color)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { storeToRefs } from "pinia";
  
  const props = defineProps(["module"]);
  const moduleConfigs = useModuleConfigStore();
  const { modulesList } = storeToRefs(moduleConfigs);
  const { modifyConfig } = moduleConfigs;
  
  const infNickGenRange1 = ref(modulesList.value.infNickGen.preFetch.number);
  const pMultiplierRange1 = ref(modulesList.value.pMultiplier.number);
  const kBindInput = ref([
    modulesList.value.kBind.keys.red,
    modulesList.value.kBind.keys.blue,
    modulesList.value.kBind.keys.yellow,
    modulesList.value.kBind.keys.green,
  ]);
  
  const keybindColors = ["red", "blue", "yellow", "green"];
  
  function togglePrefetch() {
    modifyConfig("infNickGen", {
      preFetch: { enabled: !modulesList.value.infNickGen.preFetch.enabled },
    });
  }
  
  function updateInfNickGenNumber() {
    modifyConfig("infNickGen", { preFetch: { number: infNickGenRange1.value } });
  }
  
  function updatePMultiplierNumber() {
    modifyConfig("pMultiplier", { number: pMultiplierRange1.value });
  }
  
  const themeColors = computed(() =>
    Object.entries(modulesList.value.theme.colors).map(([key, value]) => ({
      key,
      model: value,
    }))
  );
  
  function updateThemeColor(key, color) {
    modifyConfig("theme", { colors: { [key]: color } });
  }
  
  function updateKeybind(color) {
    const index = keybindColors.indexOf(color);
    modifyConfig("kBind", {
      keys: { [color]: kBindInput.value[index].toLowerCase() },
    });
  }
  </script>
  
<style scoped>
.description {
    position: absolute;
    top: 15%;
    text-align: center;
    margin: 0 1vmin 0 0;
}

.configTitle {
    font-size: 1.5vmin;
    margin: 2vmin 2vmin 0 2vmin;
    text-align: center;
    font-weight: bold;
}

.configBtn {
    border: 2px solid rgba(0, 0, 0, 0.5);
    margin: 0vmin 2vmin;
    width: 20vmin;
    height: 3vmin;
    border-radius: 1vmin;
    font-weight: bold;
    transition: transform 0.25s ease-in-out;
}

.configBtn:hover {
    transform: scale(1.025);
}

.greenBtn {
    background-color: #218921;
}

.redBtn {
    background-color: #d32f2f;
}

.configTxt {
    font-size: 1.25vmin;
    margin: 1vmin 2vmin;
    font-weight: bold;
}

.configRange {
    appearance: none;
    width: 100%;
    height: 1.5vmin;
    border-radius: 1vmin;
    outline: none;
    transition: transform 0.25s ease-in-out;
    background-color: v-bind("modulesList.theme.colors.base");
}

.configRange:hover {
    transform: scale(1.025);
}

.configRow {
    display: flex;
    align-items: center;
    margin: 0;
    white-space: nowrap;
    hyphens: none;
}

.configArea {
    position: absolute;
    border-radius: 3vmin;
    width: 100%;
    bottom: 0;
    height: 90%;
    z-index: 1;
    overflow-y: auto;
    scrollbar-width: none;
}

.configColor {
    position: absolute;
    left: 10.5vmin;
    transform: translate(-50%);
    width: 10vmin;
    height: 1.5vmin;
    outline: none;
    border: none;
    border-color: transparent;
    padding: 0 0 0 0;
    border-radius: 1vmin;
}

.configSilentInput {
    border: none;
    outline: none;
    width: 10%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 1.25vmin;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
}
</style>
