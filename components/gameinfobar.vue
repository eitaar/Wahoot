<template>
  <div class="gameinfobar">
    <h3 id="nickname">{{ nickname.length <= 15?nickname:`${nickname.substring(0,12)}...`}}</h3>
    <div id="scoreInfoBox" @click="scoreSide = !scoreSide">
      <p id="score" v-if="scoreSide">{{score}}</p>
      <p id="score" v-if="!scoreSide">{{ place }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
const { modulesList } = storeToRefs(useModuleConfigStore());
const props = defineProps(["nickname","score"]);
const scoreSide = ref(true);
const place = ref(1);
</script>
<style scoped>

.gameinfobar {
  left: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height:7.5%;
  backdrop-filter: blur(12px);
  user-select: none;
  background-color: v-bind("modulesList.theme.colors.acc2");
}

#nickname {
  position: absolute;
  top: 50%;
  margin : 0 0 0 10vmin;
  transform: translateY(-50%);
  font-size: 2.5vmin;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  transition: transform 0.25s ease-in-out;
  color: v-bind("modulesList.theme.colors.text4");
}
#nickname:hover {
  transform: translateY(-50%) scale(1.05);
}
#scoreInfoBox {
  position: absolute;
  width: 10%;
  height: 60%;
  top: 50%;
  right: 5vmin;
  transform: translateY(-50%);
  border-radius: 1.25vmin;
  transition: transform 0.25s ease-in-out;
  background-color: v-bind("modulesList.theme.colors.acc1");
}
#scoreInfoBox:hover {
  transform: translateY(-50%) scale(1.05);
}

#score {
  text-align: center;
  font-size: 2.5vmin;
  font-weight: bold;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: v-bind("modulesList.theme.colors.text2");
}
</style>