<template>
  <div class="loadingBg" :class="{ darkBg: props.dark === 'true' }">
    <p class="loadingTitle">{{ text }}{{ dot }}</p>
    <div class="loader"></div>
    <div class="loader2"></div>
    <div class="loader3"></div>
    <p class="loadingTxt">{{ num }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

const moduleConfigs = useModuleConfigStore();
const { modulesList } = storeToRefs(moduleConfigs);

const props = defineProps(["text","dot","dark","num"]);
const dot = ref('');
const num = ref(props.num);
let c = 0;

onMounted(() => {
  setInterval(() => {
    c++;
    dot.value = props.text && props.dot ? '.'.repeat((c % 3) + 1) : '';
  }, 500);

  setInterval(() => {
    if (num.value) {
      num.value--;
    }
  }, 1000);
});

watch(() => props.num, (newVal) => {
  num.value = newVal;
});
</script>

<style scoped>
.loadingBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  user-select: none;
}

.darkBg {
  background-color: rgba(0, 0, 0, 0.8);
}

.loadingTitle {
  font-size: 5vmin;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-weight: bold;
  color: v-bind("modulesList.theme.colors.text1");
}

.loader, .loader2, .loader3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 2s linear infinite;
}

.loader {
  width: 20vmin;
  height: 20vmin;
  background-color: v-bind("modulesList.theme.colors.acc1");
}

.loader2 {
  width: 15vmin;
  height: 15vmin;
  background-color: v-bind("modulesList.theme.colors.base");
}

.loader3 {
  width: 10vmin;
  height: 10vmin;
  animation: small 1s linear infinite;
  background-color: v-bind("modulesList.theme.colors.acc2");
}

.loadingTxt {
  font-size: 6vmin;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-weight: bold;
  animation: small2 1s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}

@keyframes small {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.1); }
  25% { transform: translate(-50%, -50%) rotate(45deg) scale(0.1); }
  50% { transform: translate(-50%, -50%) rotate(90deg) scale(1); }
  75% { transform: translate(-50%, -50%) rotate(135deg) scale(1); }
  100% { transform: translate(-50%, -50%) rotate(180deg) scale(0.1); }
}

@keyframes small2 {
  0%, 25%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(0); }
  50%, 75% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
}
</style>
