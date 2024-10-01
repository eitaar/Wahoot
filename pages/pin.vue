<template>
  <background/>
  <div>
    <square :style="{backgroundColor: sub}" />
    <ellipsis :style="{backgroundColor: sub}" />
    <img src="/assets/img/wahootIndev.webp" alt="Wahoot logo" id="wahoot_logo" />
    <div id="input" class="center" ref="input" :style="{backgroundColor : sub}">
      <styledinput ref="gamePinInput" placeholder="Game pin" @keyup.enter="checkPin" v-model="gamePin" v-if="isPinInput" :disabled="gamePinDisabled" />
      <styledinput ref="nicknameInput" placeholder="Nickname" v-model="nickname" @keyup.enter="submitNickname" id="nicknameInput" v-else />
      <styledbtn @click="checkPin" ref="gamePinSubmitBtn" v-if="isPinInput" />
      <div v-else>
        <styledsmallbtn @click="generateNickname" ref="nicknameGenerateBtn" id="nicknameGenerateBtn" :disabled="nicknameGenerateDisabled" />
        <styledsmallbtn @click="submitNickname" ref="nicknameSubmitBtn" id="nicknameSubmitBtn" :disabled="nicknameSubmitDisabled" />
      </div>
    </div>

    <div id="notification-wrapper" style="position: absolute; right: 10%; bottom: 10%;">
      <div class="notification" v-for="notification in notifications" :key="notification.message">
        <span v-html="notification.message"></span>
      </div>
    </div>
    <p style="text-align: left; position: absolute; bottom: -0.5%; cursor: pointer; user-select: none; font-size:2vmin" @click="verPopup = !verPopup" :style="{color:text1}">{{ ver }} </p>
    <rnpopup v-show="verPopup" @closePopup="verPopup = !verPopup" />
    <setting />
  </div>
</template>

<script setup>
import { kahoot } from '~/assets/src/kahoot/kahoot';
import { ref, onMounted, nextTick } from 'vue';
const { base, sub, text1 } = useColorStore();
const { setClient } = useClientStore();
const client = new kahoot();
const ver = ref('Indev 20240912');
const notifications = ref([
  { message: "<h1>test</h1>" },
  { message: "<p>error?</p>" }
]);
const gamePin = ref("");
const nickname = ref("");
const isPinInput = ref(true);
const verPopup = ref(false);
const gamePinInput = ref(null);
const nicknameInput = ref(null);
const gamePinSubmitBtn = ref(null);
const nicknameGenerateBtn = ref(null);
const nicknameSubmitBtn = ref(null);
const gamePinDisabled = ref(false);
const nicknameGenerateDisabled = ref(true);
const nicknameSubmitDisabled = ref(true);

onMounted(() => {
  gamePinInput.value.styledInput.disabled = false;
  gamePinInput.value.styledInput.focus();
  console.log("loaded");
  setClient(client);
  manageStorage();
});
async function checkPin(){
  nextTick(() => {
    gamePinSubmitBtn.value.styledBtn.disabled = true;
  });
  if (gamePin.value.startsWith("/test")) {
      transformInput();
  } else if (!gamePin.value.length > 0) {
  } else {
    const isPinValid = await client.checkPin(gamePin.value);
    if (isPinValid) {
      transformInput();
    } else {
      console.log(`Game pin:${gamePin.value} is incorrect`);
      gamePinInput.value.styledInput.classList.add("inputFailed");
      await delay(760).then(() => {
        gamePinInput.value.styledInput.classList.remove("inputFailed");
        gamePinSubmitBtn.value.styledBtn.disabled = false;
      });
    }
  }
};

async function transformInput(){
  gamePinSubmitBtn.value.styledBtn.disabled = false;
  gamePinInput.value.styledInput.classList.add("shrink");
  gamePinSubmitBtn.value.styledBtn.classList.add("shrink");
  delay(500).then(() => {
    gamePinInput.value.styledInput.placeholder = "";
    gamePinInput.value.styledInput.value = "";
    gamePinSubmitBtn.value.styledBtn.textContent = "";
  });
  delay(750).then(() => {
    isPinInput.value = false;
    nextTick(() => {
      nicknameInput.value.styledInput.placeholder = ""; 
      nicknameInput.value.styledInput.classList.add("expand");
      nicknameGenerateBtn.value.styledSmallBtn.classList.add("sb_expand");
      nicknameSubmitBtn.value.styledSmallBtn.classList.add("sb_expand");

      delay(500).then(() => {
        nicknameInput.value.styledInput.placeholder = "Nickname";
        nicknameGenerateBtn.value.styledSmallBtn.textContent = "Generate";
        nicknameSubmitBtn.value.styledSmallBtn.textContent = "Enter";
        nicknameInput.value.styledInput.style.opacity = 1;
        nicknameGenerateBtn.value.styledSmallBtn.style.opacity = 1;
        nicknameSubmitBtn.value.styledSmallBtn.style.opacity = 1;
      });

      delay(250).then(() => {
        nicknameInput.value.styledInput.focus();
        nicknameGenerateBtn.value.styledSmallBtn.disabled = false;
        nicknameSubmitBtn.value.styledSmallBtn.disabled = false;
      });
    });
  });
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

async function generateNickname() {
  const nickNameResponse = await (await fetch("https://apis.kahoot.it/namerator")).json();
  nickname.value = nickNameResponse.name;
  nicknameInput.value.styledInput.value = nickNameResponse.name;
};

async function submitNickname() {
  if (nickname.value.length === 0) {
    console.log("Please enter a nickname");
  } else if (gamePin.value === "/test") {
    navigateTo("/instructions?dev=true");
  } else {
    await client.join(gamePin.value, nickname.value);
    client.on('joined', () => {
      console.log('Successfully joined');
      navigateTo("/instructions");
    });
  }
};

function manageStorage() {
  if (!localStorage.getItem("clientVersion")) {
    localStorage.setItem("clientVersion", ver.value);
    verPopup.value = true;
  } else if (localStorage.getItem("clientVersion") != ver.value) {
    verPopup.value = true;
    localStorage.setItem("clientVersion", ver.value);
  }
  
  if (sessionStorage.getItem("clientData") && localStorage.getItem("dev") == false) {
    sessionStorage.clear();
    console.log("aaaa");
  }
};
</script>

<style scoped>
body {
  text-align: center;
  overflow: hidden;
  font-family: Calibri,sans-serif;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

#wahoot_logo {
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: -1;
  height: 28.125vmin;
  width: 50vmin;
  user-select: none;
  animation: showLogo 2s linear;
  
}

#input {
  position: absolute;
  top: 52.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 2px rgba(0,0,0,1);
  width: 32.5vmin;
  height: 12.5vmin;
  animation: showInputArea 2s linear;
}


#nicknameGenerateBtn {
  position: absolute;
  left: 27.5%;
}

#nicknameSubmitBtn {
  position: absolute;
  left: 72.5%;
}
.shrink {
  animation: shrink 0.75s ease-in-out;
}
.expand {
  animation: expand 0.75s ease-in-out;
}
.sb_expand {
  animation: sb_expand 0.75s ease-in-out;
}

.inputFailed {
  animation: inputFailed 0.75s ease-in-out;
}
@keyframes showInputArea {0% {opacity: 0;}10% {opacity: 0;}100% {opacity: 1;}}
@keyframes expand {
  0% {
    width: 0%;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 87.5%;
    opacity: 1;
  }
}

@keyframes sb_expand {
  0% {
    width: 0%;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 42.5%;
    opacity: 1;
  }
}
@keyframes shrink {
  0% {
    width: 87.5%;
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 0px;
    opacity: 0;
  }
}
@keyframes showLogo {0% {opacity: 0;}10% {opacity: 0;}100% {opacity: 1;}}

@keyframes inputFailed {
  0%{
    transform: translate(-50%,-50%);
    border: 0.25rem solid red;
  }
  10% {
    transform: translate(-45%,-50%);
  }
  30% {
    transform:translate(-55%,-50%);
  }
  50% {
    transform: translate(-45%,-50%);
    border: 0.25rem solid red;
  }
  70% {
    transform:translate(-55%,-50%);
  }
  90% {
    transform: translate(-45%,-50%);
  }
  100% {
    transform: translate(-50%,-50%);
    border: 0.125rem solid;
  }
}
</style>
