<template>
  <div id="darkArea" ref="darkArea" v-show="settingOpen">
    <div id="setting" ref="setting" :style="{ backgroundColor: acc2 }">
      <div id="settingMenu">
        <div class="modules" id="moduleWrapper">
          <div>
            <h4 @click="toggleModuleArrow"style="padding-left: 10%; margin-bottom: 0; color: #0f0f0f; font-size: 2.5vmin; cursor: pointer; user-select: none;">
              Modules
              <img ref="Marrow" @click="toggleModuleArrow" src="/assets/img/triangleArrow.png" style="height:1.75vmin; margin-left: -1.5%; transform: rotate(90deg);" />
            </h4>
          </div>
          <div ref="modulesList">
            <div id="m1Title">
              <h4 class="moduleTitle">Client</h4>
            </div>
            <div id="m2Title">
              <h4 class="moduleTitle">Visual</h4>
            </div>
            <div id="m3Title">
              <h4 class="moduleTitle">InGame Action</h4>
            </div>
          </div>
        </div>
      </div>
      <div id="settingBody">
        <div v-show="allModules">
          <modules filter="all"/> 
        </div>
        <div v-show="client">
          <modules filter="client"/>
        </div>
        <div v-show="visual">
          <modules filter="visual"/>
        </div>
        <div v-show="inGame">
          <modules filter="inGame"/>
        </div>
      </div>
    </div>
  </div>
  <button ref="settingBtn" @click="toggleSettingVisibility" class="settingBtn" :style="{ backgroundColor: acc1 }">
    <img id="settingImg" src="/assets/img/settings.webp" alt="Settings" />
  </button>
</template>

<script setup>
import { ref } from 'vue';
const { acc1, acc2 } = useColorStore(); 

const settingOpen = ref(false);
const darkArea = ref(null);
const setting = ref(null);
const Marrow = ref(null);
const modulesList = ref(null);
const ModuleListOpened = ref(true);
const allModules = ref(true);
const client = ref(false);
const visual = ref(false);
const inGame = ref(false);

function toggleSettingVisibility() {
  if (!settingOpen.value) {
    settingOpen.value = true;
    darkArea.value.classList.add("openSetting");
    setting.value.classList.add("expandSetting");
  } else {
    setting.value.classList.add("shrinkSetting");
    darkArea.value.classList.add("closeSetting");
    setTimeout(() => {
      settingOpen.value = false;
      darkArea.value.classList.remove("openSetting", "closeSetting");
      setting.value.classList.remove("expandSetting", "shrinkSetting");
    }, 250);
  }
}

function toggleModuleArrow() {
  if (ModuleListOpened.value) {
    Marrow.value.classList.remove("rotateArrowDown");
    Marrow.value.classList.add("rotateArrowUp");
    ModuleListOpened.value = false;
    modulesList.value.style.display = "none";
  } else if (!ModuleListOpened.value) {
    Marrow.value.classList.add("rotateArrowDown");
    Marrow.value.classList.remove("rotateArrowUp");
    ModuleListOpened.value = true;
    modulesList.value.style.display = "block";
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
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
}

#setting {
  position: absolute;
  height: 75%; /* 高さを固定 */
  width: 65%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 2vmin;
  border: 2px solid #000;
  z-index: 7;
  pointer-events: all;
  text-align: left;
  overflow: hidden; /* settingコンテナの外に要素が出ないようにする */
}

#settingMenu {
  position: absolute;
  height: 100%;
  width: 20%;
  left: 0;
  top: 0;
  border-right: 0.35vmin solid #000;
}

.moduleTitle {
  padding-left: 17.5%;
  color: #0f0f0f;
  font-size: 1.85vmin;
  cursor: pointer;
}

.settingBtn {
  position: absolute;
  height: 4vmin;
  width: 4vmin;
  border: none;
  border-radius: 100vmin;
  right: 1%;
  top: 2%;
  color: #000;
  font-size: 2.7vmin;
  font-weight: bold;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  animation: moveSettingBtnDown 1.5s;
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
  transform: translateY(0.1vmin);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
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
  0% {
    height: 0;
    width: 0;
  }
  100% {
    height: 75%;
    width: 65%;
  }
}

@keyframes shrinkSetting {
  0% {
    height: 75%;
    width: 65%;
  }
  100% {
    height: 0;
    width: 0;
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
