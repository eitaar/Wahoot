<template>
  <div id="darkArea" ref="darkArea" v-show="settingOpen" @keyup.esc="closeOnEscape">
    <div id="setting" ref="setting">
      <div id="settingMenu">
        <div class="modules" id="moduleWrapper">
          <div>
            <h4 @click.left="toggleModuleArrow" @click.right="changeModuleFilter('all')" 
            style="padding-left: 10%; margin-bottom: 0; font-size: 2.5vmin; cursor: pointer; user-select: none;" 
            :style="{color:modulesList.theme.colors.acc2}"
            >Modules
              <img ref="Marrow" src="/assets/img/arrow.svg" :class="{'rotateArrowDown': ModuleListOpened, 'rotateArrowUp': !ModuleListOpened}" style="height:1.80vmin; margin-left: -1.5%;" loading="lazy"/>
            </h4>
          </div>
          <div ref="modulesLists" v-show="ModuleListOpened">
            <div @click="changeModuleFilter('client')" id="m1Title"><h4 class="moduleTitle">Client</h4></div>
            <div @click="changeModuleFilter('visual')" id="m2Title"><h4 class="moduleTitle">Visual</h4></div>
            <div @click="changeModuleFilter('inGame')" id="m3Title"><h4 class="moduleTitle">InGame Action</h4></div>
          </div>
        </div>
      </div>
      <div id="settingBody">
        <div v-if="moduleFilter.all">
          <modules filter="all"/> 
        </div>
        <div v-if="moduleFilter.client">
          <modules filter="client"/>
        </div>
        <div v-if="moduleFilter.visual">
          <modules filter="visual"/>
        </div>
        <div v-if="moduleFilter.inGame">
          <modules filter="inGame"/>
        </div>
      </div>
    </div>
  </div>
  <button ref="settingBtn" @click="toggleSettingVisibility" class="settingBtn" :class="{loadBtnIn:loadIn == 'true'?true:false}">
    <img id="settingImg" src="/assets/img/settings.svg" alt="Settings" />
  </button>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import { storeToRefs} from 'pinia';
import { onClickOutside } from '@vueuse/core'
const props = defineProps(["loadIn"]);
const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);
const { modifyConfig } = moduleConfigs;
const settingOpen = ref(false);
const darkArea = ref(null);
const setting = ref(null);
const settingBtn = ref(null);
const Marrow = ref(null);
const modulesLists = ref(null);
const ModuleListOpened = ref(true);
const moduleFilter = ref({ all: true, client: false, visual: false, inGame: false });
onClickOutside(darkArea, closeOnEscape)
function toggleSettingVisibility() {
  if (!settingOpen.value) {
    window.addEventListener('keyup', closeOnEscape);
    settingOpen.value = true;
    darkArea.value.classList.add("openSetting");
    setting.value.classList.add("expandSetting");
    setTimeout(() => {
      setting.value.classList.remove("expandSetting");
    }, 260);
  } else {
    window.removeEventListener('keyup', closeOnEscape);
    setting.value.classList.add("shrinkSetting");
    darkArea.value.classList.add("closeSetting");
    setTimeout(() => {
      settingOpen.value = false;
      darkArea.value.classList.remove("closeSetting");
      setting.value.classList.remove("shrinkSetting");
      changeModuleFilter("all");
    }, 250);
  }
}
onMounted(()=> {
    setTimeout(() => {  props.loadIn?settingBtn.value.classList.remove("loadBtnIn"):false;},1000);
})
function changeModuleFilter(filter) {
  moduleFilter.value = { all: false, client: false, visual: false, inGame: false };
  moduleFilter.value[filter] = true;
}

function toggleModuleArrow() {
  ModuleListOpened.value = !ModuleListOpened.value;
}

function closeOnEscape(event) {
  if (event.key === 'Escape' && settingOpen.value) {
    toggleSettingVisibility();
  }
}
</script>

<style scoped>
#darkArea {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0;
  z-index: 3;
  transition: opacity 0.25s ease-in-out;
}

#setting {
  position: absolute;
  height: 75%; 
  width: 67.5%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2vmin;
  border: 2px solid #000;
  pointer-events: all;
  text-align: left;
  overflow: hidden;
  background-color: v-bind("modulesList.theme.colors.base");
}

#settingMenu {
  font-family: 'Roboto', sans-serif;
  position: absolute;
  height: 100%;
  width: 20%;
  left: 0;
  top: 0;
  border-right: 0.35vmin solid #000;
}

.moduleTitle {
  font-family: 'Roboto', sans-serif;
  padding-left: 17.5%;
  font-size: 1.85vmin;
  cursor: pointer;
  color: v-bind("modulesList.theme.colors.acc2");
}

.settingBtn {
  position: absolute;
  height: 4vmin;
  width: 4vmin;
  border: none;
  border-radius: 100vmin;
  right: 1%;
  top: 2%;
  font-size: 2.7vmin;
  font-weight: bold;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: v-bind("modulesList.theme.colors.acc1");
  transition: transform 0.25s ease-in-out;
}
.loadBtnIn {
  animation: moveSettingBtnDown 1s ease-in-out forwards;
}

#settingImg {
  width: 3.5vmin;
  height: 3.5vmin;
  object-fit: contain;
  user-select: none;
}

#settingBody {
  position: absolute;
  height: 100%;
  width: 80%;
  top: 0;
  left: 20%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden; 
  scrollbar-width: none;
}

.settingBtn:active {
  margin-top:0.2vmin;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
}
.settingBtn:hover {
  transform: scale(1.075);
}

.openSetting {
  animation: openSetting 0.25s ease-in-out forwards;
}

.closeSetting {
  animation: closeSetting 0.25s ease-in-out forwards;
}

.expandSetting {
  animation: expandSetting 0.25s ease-in-out forwards;
}

.shrinkSetting {
  animation: shrinkSetting 0.25s ease-in-out forwards;
}

.rotateArrowDown {
  animation: rotateArrowDown 0.25s ease-in-out forwards;
}

.rotateArrowUp {
  animation: rotateArrowUp 0.25s ease-in-out forwards;
}

@keyframes openSetting {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes closeSetting {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes expandSetting {
  0%{
    transform: translate(-50%,-50%) scale(0.25);
  }
  75% {
    transform: translate(-50%,-50%) scale(1.075);
  }
  100% {
    transform: translate(-50%,-50%) scale(1);
  }
}

@keyframes shrinkSetting {
  0% {
    transform: translate(-50%,-50%) scale(1);
  }
  25% {
    transform: translate(-50%,-50%) scale(1.075);
  }
  100% {
    transform: translate(-50%,-50%) scale(0.25);
  }
}

@keyframes rotateArrowDown {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes rotateArrowUp {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes moveSettingBtnDown {
  0% {
    transform: translateY(-250%);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
