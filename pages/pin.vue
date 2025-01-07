  <template>
    <background/>
    <loading :text="loadingText" dark="true" dot="true" v-if="showLoading"/>
    <div id="body" ref="body">
      <square/>
      <ellipsis/>
      <img src="/assets/img/wahoot.webp" alt="Wahoot logo" id="wahoot_logo" />
      <div id="input" class="center" ref="input">
        <div class="textBoxWrapper">
          <styledinput class="txtBox" ref="gamePinInput" placeholder="Game pin" @keyup.enter="checkPin" v-model="gamePin" v-if="isPinInput" :disabled="gamePinDisabled" />
          <styledinput class="txtBox" ref="nicknameInput" v-model="nickname" @keyup.enter="submitNickname" id="nicknameInput" v-else />
        </div>
        <styledbtn @click="checkPin" ref="gamePinSubmitBtn" v-if="isPinInput" />
        <div v-else>
          <styledsmallbtn @click="generateNickname" ref="nicknameGenerateBtn" id="nicknameGenerateBtn" :disabled="nicknameGenerateDisabled" />
          <styledsmallbtn @click="submitNickname" ref="nicknameSubmitBtn" id="nicknameSubmitBtn" :disabled="nicknameSubmitDisabled" />
        </div>
      </div>
      <p style="text-align: left; position: absolute; bottom: -0.5%; cursor: pointer; user-select: none; font-size:2vmin" @click="isVerPopupOpen = !isVerPopupOpen" :style="{color:modulesList.theme.colors.text1}">{{ ver }} </p>
      <rnpopup ref="verPopup" v-if="isVerPopupOpen"/>
      <setting loadIn="true"/>
    </div>
  </template>

<script setup>
import { Kahoot } from '~/assets/src/kahoot/kahoot';
import { ref, onMounted, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core'
import {storeToRefs} from 'pinia';
const {modulesList} = storeToRefs(useModuleConfigStore());
const client = new Kahoot();
const {clientStore} = storeToRefs(useClientStore());
const ver = ref('β1.0.0');
const gamePin = ref("");
const nickname = ref("");
const isPinInput = ref(true);
const verPopup = ref(null);
const isVerPopupOpen = ref(false);
const gamePinInput = ref(null);
const nicknameInput = ref(null);
const gamePinSubmitBtn = ref(null);
const nicknameGenerateBtn = ref(null);
const nicknameSubmitBtn = ref(null);
const gamePinDisabled = ref(false);
const nicknameGenerateDisabled = ref(true);
const nicknameSubmitDisabled = ref(true);
const body = ref(null);
const showLoading = ref(false);
const loadingText = ref("Connecting to Kahoot");
const fetchedNickName = ref(["loading"]);
onClickOutside(verPopup, closePopup);
onMounted(() => {
  gamePinInput.value.styledInput.disabled = false;
  gamePinInput.value.styledInput.focus();
  console.log("loaded");
  manageStorage();
  if (modulesList.value.infNickGen.preFetch.enabled) {
    for (let i = 0; i < modulesList.value.infNickGen.preFetch.number; i++) {
      fetch("https://apis.kahoot.it/namerator").then((response) => response.json())
      .then((data) => {fetchedNickName.value.push(data.name);})
    }
  }
});

function closePopup() {isVerPopupOpen.value = false;}

async function checkPin(){
  showLoading.value = true;
  nextTick(() => {
    gamePinSubmitBtn.value.styledBtn.disabled = true;
    gamePinInput.value.styledInput.disabled = true;
  });
  if (gamePin.value == "/test") {
      showLoading.value = false;
      transformInput();
  } else {
    const isPinValid = await client.checkPin(gamePin.value);
    if (isPinValid) {
      showLoading.value = false;
      transformInput();
    } else {
      console.log(gamePin.value.length?`Game pin:${gamePin.value} is incorrect`:`Game pin is not entered`);
      showLoading.value=false;
      gamePinInput.value.styledInput.classList.add("inputFailed");
      await delay(760).then(() => {
        gamePinInput.value.styledInput.classList.remove("inputFailed");
        gamePinSubmitBtn.value.styledBtn.disabled = false;
        gamePinInput.value.styledInput.disabled = false;
      });
    }
  }
};

async function transformInput(){
  gamePinSubmitBtn.value.styledBtn.disabled = true;
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
  if (fetchedNickName.value.length > 1) {
    fetchedNickName.value.shift();
    nickname.value = fetchedNickName.value[0];
    nicknameInput.value.styledInput.value = fetchedNickName.value[0];
  } else {
    let fetchedNickName = await (await fetch("https://apis.kahoot.it/namerator")).json();
    nickname.value = fetchedNickName.name;
    nicknameInput.value.styledInput.value = fetchedNickName.name;
  }
};

async function submitNickname() {
  loadingText.value="Joining game";
  showLoading.value = true;
  nicknameInput.value.styledInput.classList.remove("expand");
  if (nickname.value.length === 0) {
    console.log("Please enter a nickname");
    nicknameSubmitBtn.value.styledSmallBtn.disabled = true;
    nicknameInput.value.styledInput.classList.add("inputFailed");
      await delay(760).then(() => {
        nicknameInput.value.styledInput.classList.remove("inputFailed");
        nicknameSubmitBtn.value.styledSmallBtn.disabled = false;
      });
  } else if (gamePin.value === "/test") {
      showLoading.value = false;
      body.value.classList.add("fadeOut");
      delay(750).then(() => {
        navigateTo("game/instructions?dev=true");
      });
  } else {
    await client.join(gamePin.value,`${modulesList.value.ucName.enabled? nickname.value.replace(/\\u{([0-9A-Fa-f]+)}/g, (_, p1) => String.fromCodePoint(parseInt(p1, 16))):nickname.value}`);
    client.on('joined', () => {
      showLoading.value = false;
      clientStore.value = client;
      body.value.classList.add("fadeOut");
      delay(750).then(() => {
        navigateTo("game/instructions");
      });
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
  
};

client.on("error", (err) => {
  if(err.error = "USER_INPUT") {
    showLoading.value = false;
    alert("Error: duplicate name.\nPage will be reloaded.");
    location.reload();
  }
})
</script>

<style scoped>
body {
  text-align: center;
  overflow: hidden;
  font-family:'Roboto', sans-serif;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: v-bind("modulesList.theme.colors.sub2");
}

#wahoot_logo {
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: -1;
  width: 60vmin;
  user-select: none;
  animation: showLogo 2s linear;
  transition: transform 0.35s ease-in-out;
}
#wahoot_logo:hover {
  transform: translate(-50%,-50%) scale(1.1);
}
#body {
  opacity: 1;
}
#input {
  position: absolute;
  top: 52.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 2px rgba(0,0,0,1);
  width: 37.5vmin;
  height: 17.5vmin;
  animation: showInputArea 2s linear;
}

.txtBox {
  position: absolute;
    transform: translate(-50%,-50%);
    top: 30%;
    left: 50%;

}

#nicknameGenerateBtn {
  position: absolute;
  left: 27.5%;
  opacity: 0;
}

#nicknameSubmitBtn {
  position: absolute;
  left: 72.5%;
  opacity: 0;
}

#nicknameInput {
  opacity: 0;
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
.fadeOut {
  animation: fadeOut 0.75s ease-in-out forwards;
}
@keyframes showInputArea {0% {opacity: 0;}10% {opacity: 0;}100% {opacity: 1;}}
@keyframes fadeOut {0% {opacity: 1}100%{opacity: 0}}
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