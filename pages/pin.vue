<template>
  <div id="background" :style="{backgroundColor:base}" />
  <div>
    <square :style="{backgroundColor:sub}"/>
    <ellipsis :style="{backgroundColor:sub}"/>
    <img src="/assets/img/wahootIndev.webp" alt="Wahoot logo" id="wahoot_logo" />
    <div id="input" class="center" ref="input" >
        <styledinput ref="gamePinInput"placeholder="Game pin" @keyup.enter="checkPin" v-model="gamePin" v-if="isPinInput" disabled />
        <styledinput ref="nicknameInput" placeholder="Nickname" v-model="nickname" @keyup.enter="submitNickname" id="nicknameInput"v-else/>
        <styledbtn @click="checkPin" ref="gamePinSubmitBtn"v-if="isPinInput" />
        <div div v-else>
          <styledsmallbtn @click="generateNickname" ref="nicknameGenerateBtn" id="nicknameGenerateBtn" style="opacity: 0;" disabled/>
          <styledsmallbtn @click="submitNickname" ref="nicknameSubmitBtn" id="nicknameSubmitBtn" style="opacity: 0;" disabled/>
        </div>
    </div>
    <div id="notification-wrapper" style="position: absolute; right: 10%; bottom: 10%;">
      <div class="notification" v-for="notification in notifications" :key="notification.message">
        <span v-html="notification.message"></span>
      </div>
    </div>
    <p style="color: #fff; text-align: left; position: absolute; bottom: -0.5%; cursor: pointer;user-select: none;" @click="verPopup = !verPopup">{{ ver }} </p>
    <rnpopup v-show="verPopup" @closePopup="verPopup = !verPopup"/>
    <setting />
  </div>
</template>

<script setup>
import { Client } from '~/assets/src/kahoot/kahoot';
import { ref, onMounted, computed, nextTick } from 'vue';

const { base, sub, acc1, acc2, setColor, changeColorToDefault} = useColorStore();
const client = new Client();
const ver = ref('Indev 20240805');
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
const nicknameGenerateBtn = ref(false);
const nicknameSubmitBtn = ref(false);

onMounted(() => {
  gamePinInput.value.styledInput.disabled = false;
  gamePinInput.value.styledInput.focus();
  console.log("loaded");
  if (localStorage.getItem("clientVersion") == undefined) {
    localStorage.setItem("clientVersion", ver.value);
    verPopup.value = true;
  } else if (localStorage.getItem("clientVersion") != ver.value) {
    verPopup.value = true;
    localStorage.setItem("clientVersion", ver.value);
  }
  localStorage.setItem("aa",JSON.stringify({"a":true}))
});
const checkPin = async () => {
    if (gamePin.value.startsWith("/test")) {
      transformInput();
    } else if (!gamePin.value.length > 0) {
      console.log("input pin");
    } else {
      const isPinValid = await client.checkPin(gamePin.value);
      if (isPinValid) {
        transformInput();
      } else {
        console.log(`Game pin:${gamePin.value} is incorrect`);
      }
    }
};
const transformInput = async () => {
  gamePinSubmitBtn.value.styledBtn.disabled = false;
  gamePinInput.value.styledInput.classList.add("shrink");
  gamePinSubmitBtn.value.styledBtn.classList.add("shrink");
  delay(500).then(()=> {
    gamePinInput.value.styledInput.placeholder = "";
    gamePinInput.value.styledInput.value = "";
    gamePinSubmitBtn.value.styledBtn.textContent = "";
  });
  delay(750).then(() => {
      isPinInput.value=false;
      nextTick(()=> {
        nicknameInput.value.styledInput.placeholder = ""; 
        nicknameInput.value.styledInput.classList.add("expand");
        nicknameGenerateBtn.value.styledSmallBtn.classList.add("sb_expand");
        nicknameSubmitBtn.value.styledSmallBtn.classList.add("sb_expand");
        delay(500).then(()=>{
          nicknameInput.value.styledInput.placeholder = "Nickname";
          nicknameGenerateBtn.value.styledSmallBtn.textContent = "Generate";
          nicknameSubmitBtn.value.styledSmallBtn.textContent = "Enter";
          nicknameInput.value.styledInput.style.opacity = 1;
          nicknameGenerateBtn.value.styledSmallBtn.style.opacity = 1;
          nicknameSubmitBtn.value.styledSmallBtn.style.opacity = 1;
        })
        delay(250).then(()=>{
          nicknameGenerateBtn.value.styledSmallBtn.disabled = false;
          nicknameSubmitBtn.value.styledSmallBtn.disabled = false;
        });
      });
  });
};
const delay = (time) => {return new Promise((resolve) => setTimeout(resolve, time));};
const generateNickname = async() => {
  const nickNameResponse = await ((await (fetch("https://apis.kahoot.it/namerator"))).json()) ;
  nickname.value = nickNameResponse.name;
  nicknameInput.value.styledInput.value = nickNameResponse.name;
};

const submitNickname = () => {
  if (nickname.value == 0) {
    console.log("enter nickname");
  } else {
    client.join(gamePin.value, nickname.value);
    console.log(`Data: pin:${gamePin.value} nickname: ${nickname.value}`);
  }
};
</script>

<style>
body {
  text-align: center;
  overflow: hidden;
}
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
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
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 3px 3px 5px 3px rgba(0,0,0,1);
  width: 32.5vmin;
  height: 12.5vmin;
  animation: showInputArea 2s linear;
}

#nicknameInput {
  opacity: 0;
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
</style>
