<template>
  <div class="modules-container">
    <div
      class="modules"
      :class="{
        flip: module.flipped,
        flipBack: module.flipBack,
      }"
      v-for="module in filteredModules"
      :key="module.name"
    >
      <button @click="flip(module)" class="flipBtn"></button>
      <h4 v-if="!module.showBack" class="moduleTitle">{{ module.name }}</h4>
      <button
        v-if="!module.showBack"
        @click="toggleModule(module.id)"
        class="toggleModuleBtn"
        :class="{ greenBtn: modulesList[module.id].enabled, redBtn: !modulesList[module.id].enabled && !modulesList[module.id].special, grayBtn: modulesList[module.id].special}"
      >
        {{ modulesList[module.id].enabled && !modulesList[module.id].special? 'Enabled' : modulesList[module.id].special?modulesList[module.id].special.msg:'Disabled' }}
      </button>
      <div
        v-if="module.showBack"
        class="backContent"
      ><modulesConfig :module="module.id"/></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const { modifyConfig } = moduleConfigs;
const props = defineProps(['filter']);
const modules = ref([
  { name: 'Infinite Nickname Generator', id: "infNickGen", type: 'inGame'},
  {name:'Keybind', id:'kBind',type: 'client'},
  {name:"Point Multiplier", id:"pMultiplier",type: 'inGame'},
  {name:"Theme", id:"theme",type: 'visual'},
  { name: 'Unicode Nickname', id:"ucName",type: 'inGame' },
  ].map((module) => ({
  ...module,
  flipped: false,
  showBack: false,
  flipBack: false,
  hovered: false,
})));

const filteredModules = computed(() => {
  return props.filter === 'all'
    ? modules.value
    : modules.value.filter(module => module.type === props.filter);
});
function flip(module) {
  if (!module.showBack) {
    module.flipped = true;
    setTimeout(() => {
      module.showBack = true;
    }, 375);
  } else {
    module.flipBack = true;
    setTimeout(() => {
      module.showBack = false;
      setTimeout(() => {
        module.flipped = false;
        module.flipBack = false;
      }, 375);
    }, 375);
  }
}

function toggleModule(moduleId) {
  if (moduleId === 'theme') {
    let themeArr = Object.keys(modulesList.value.theme.presets);
    let themePos = themeArr.indexOf(modulesList.value.theme.special.msg);
    themePos = themePos >= themeArr.length - 1 ? 0 : themePos + 1;
    modifyConfig("theme", themeArr[themePos]);
  } else {
    const currentStatus = modulesList.value[moduleId]?.enabled;
    if (currentStatus !== undefined) {
      modifyConfig(moduleId, { enabled: !currentStatus });
    }
  }
}

</script>

<style scoped>
.modules-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 24vmin);
  grid-gap: 1vmin;
  padding-top: 1vmin;
  justify-content: center;
}

.modules {
  width: 24vmin;
  height: 24vmin;
  border-radius: 3vmin;
  position: relative;
  border: 0.25vmin solid black;
  justify-self: center !important;
  align-self: center;
  transform: scale(1) rotateY(0deg);
  transition: transform 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: v-bind("modulesList.theme.colors.sub");
  color: v-bind("modulesList.theme.colors.text1");
}

.modules:hover {
  transform: scale(1.025);
}

.hovered {
  transform: scale(1.01);
}

.greenBtn {
  background-color: #218921;
}

.redBtn {
  background-color: #d32f2f;
}

.grayBtn {
  background-color: #888888;
}


.toggleModuleBtn {
  position: absolute;
  border: 2px solid rgba(0, 0, 0, 0.5);
  width: 75%;
  height: 20%;
  border-radius: 1.5vmin;
  transition: transform 0.25s ease-in-out;
  font-family: 'Roboto', sans-serif,system-ui;
  font-weight: bold;
  font-size: 1.5vmin;
  bottom: 20%;
}

.toggleModuleBtn:hover {
  transform: scale(1.025);
}

.flip {
  animation: flip 0.75s ease-in-out forwards;
}
.flipBtn {
  position: fixed;
  width: 20%;
  height:2.5%;
  top:10%;
  left:50%;
  transform: translate(-50%,-50%);
  outline: none;
  border: 0;
  z-index:2;
  transition: transform 0.25s ease-in-out;
  background-color: v-bind("modulesList.theme.colors.acc2");
}
.flipBtn:hover {
  transform: translate(-50%,-50%) scale(1.25);
}
.flipBack {
  animation: flipBack 0.75s ease-in-out forwards;
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes flipBack {
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

.moduleTitle {
  position: absolute;
  top: 25%;
  text-align: center;
  font-size: 1.8vmin;
  margin: 0;
}

.backContent {
  transform: rotateY(180deg);
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;
  }
</style>
