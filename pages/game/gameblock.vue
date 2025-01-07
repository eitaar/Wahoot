<template>
  <background />
  <setting />
  <gameinfobar :nickname="client ? client.clientData.nickname : 'dev mode'" :score="client ? client.clientData.score : 123456" />
  <div v-if="client" class="wrapper">
    <div v-if="client.gameData.gameBlockType === 'quiz'" class="blockwrapper">
      <button class="gameblock" @click="answer([0])" style="background-color: #E21B3C;">▲</button>
      <button class="gameblock" @click="answer([1])" style="background-color: #1265C8;">◆</button>
      <button class="gameblock" @click="answer([2])" style="background-color: #D89E02;">⬤</button>
      <button class="gameblock" @click="answer([3])" style="background-color: #26850D;">◼</button>
    </div>
    <div v-else-if="client.gameData.gameBlockType === 'true_false'" class="blockwrapper">
      <button class="gameblock" @click="answer([0])" style="background-color: #1265C8;">◆</button>
      <button class="gameblock" @click="answer([1])" style="background-color: #E21B3C;">▲</button>
    </div>
    <div v-else-if="client.gameData.gameBlockType === 'multiple_select_quiz'" class="MSblockwrapper">
      <button ref="red" class="gameblock" @click="appendAns(0)" :class="{ selected: choiceArr.includes(0) }" style="background-color: #E21B3C;">▲</button>
      <button ref="blue" class="gameblock" @click="appendAns(1)" :class="{ selected: choiceArr.includes(1) }" style="background-color: #1265C8;">◆</button>
      <button ref="yellow" class="gameblock" @click="appendAns(2)" :class="{ selected: choiceArr.includes(2) }" style="background-color: #D89E02;">⬤</button>
      <button ref="green" class="gameblock" @click="appendAns(3)" :class="{ selected: choiceArr.includes(3) }" style="background-color: #26850D;">◼</button>
    </div>
  </div>
  <div v-if="client && client.gameData.gameBlockType === 'multiple_select_quiz'" class="MSbtnWrapper">
    <styledbtn class="MSbtn" @click="submit"></styledbtn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useEventListener } from "@vueuse/core";
const { modulesList } = storeToRefs(useModuleConfigStore());
const { clientStore } = storeToRefs(useClientStore());
const client = clientStore.value;
const choiceArr = ref([]);
const ansArr = ref([]);

function answer(arr) {
  if (client) {
    client.answer(arr)
      .then(() => navigateTo("/game/answered"))
      .catch(err => console.error("Answer submission failed:", err));
  } else {
    console.log("No client available");
  }
}
function appendAns(num) {
  const index = choiceArr.value.indexOf(num);
  if (index === -1) {
    choiceArr.value.push(num); 
  } else {
    choiceArr.value.splice(index, 1);
  }
}

function submit() {
  if (client) {
    if (modulesList.value.pMultiplier?.enabled) {
      choiceArr.value.forEach(choice => {
        for (let i = 0; i < modulesList.value.pMultiplier.number; i++) {
          ansArr.value.push(choice);
        }
      });
    } else {
      ansArr.value.push(...choiceArr.value);
    }
    client.answer(ansArr.value).then(() => {
        navigateTo("/game/answered");
        ansArr.value = [];
        choiceArr.value = [];
      });
  } else {
    console.log("No client available");
  }
}

useEventListener(window, 'keyup', (event) => {
  if (client?.isAnswerable && modulesList.value.kBind.enabled) {
    if (client.gameData.gameBlockType == 'quiz') {
      if (event.key ==  modulesList.value.kBind.keys.red) {
        answer([0]);
      } else if (event.key == modulesList.value.kBind.keys.blue) {
        answer([1]);
      } else if (event.key == modulesList.value.kBind.keys.yellow) {
        answer([2]);
      } else if (event.key == modulesList.value.kBind.keys.green) {
        answer([3]);
      }
    } else if (client.gameData.gameBlockType == 'multiple_select_quiz') {
      if (event.key == modulesList.value.kBind.keys.red) {
        appendAns(0);
      } else if (event.key == modulesList.value.kBind.keys.blue) {
        appendAns(1);
      } else if (event.key == modulesList.value.kBind.keys.yellow) {
        appendAns(2);
      } else if (event.key == modulesList.value.kBind.keys.green) {
        appendAns(3);
      } else if (event.key == 'Enter') {
        submit();
      }
    } else if (client.gameData.gameBlockType == 'true_false') {
      if (event.key == modulesList.value.kBind.keys.red) {
        answer([0]);
      } else if (event.key == modulesList.value.kBind.keys.blue) {
        answer([1]);
      }
    } 
  } 
});

onMounted(() => {
  if (client) {
    console.log("Game block loaded");
  } else {
    console.error("Client is not initialized!");
  }
});

definePageMeta({
  middleware: ["checkclient"],
});
</script>

<style scoped>
.blockwrapper {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2vmin;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wrapper {
  position: absolute;
  width: 92.5%;
  height: 90%;
  top: 1.25%;
  left: 50%;
  transform: translate(-50%);
}

.MSblockwrapper {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2vmin;
  width: 100%;
  height: 90%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gameblock {
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 7.5vmin;
  border-radius: 2vmin;
  border: 1vmin solid transparent;
  color: white;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
}

.MSbtnWrapper {
  position: absolute;
  top: 83.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vmin;
  height: 20vmin;
}

.selected {
  border: 1vmin solid #90EE90;
  width: 100%;
  height: 100%;
}

.gameblock:hover {
  transform: scale(1.015);
}
</style>
