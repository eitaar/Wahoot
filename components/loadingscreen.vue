<template>
  <div class="loading-screen">
    <img src="/img/wahoot.png" alt="Wahoot logo" id="wahoot_logo"/>
    <div id="loadingBarFrame">
      <div class="loadingBar" v-show="loadingComplete" style="z-index: 5; text-align: center; width: 100%; font-size: 16px;">Loaded!!</div>
      <div class="loadingBar" v-show="isloading"style="z-index: 5; text-align: center; width: 100%; font-size: 16px;">Loading...</div>
      <div class="loadingBar" id="loading" v-show="isloading"></div>
      <div class="loadingBar" id="loadingComplete" v-show="loadingComplete"></div>
    </div>
    <p id="info">It seems like loading is taking time...</p>
    <p id="reloadInfo">Maybe reloading page might help...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      isloading: true,
      loadingComplete: false
    };
  },
  methods: {
    completeLoading() {
      this.isloading = false;
      this.loadingComplete = true;
    }
  },
  mounted() {
    this.isloading = false;
    this.completeLoading();
  }
};
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 100;
}
p {
  text-align: center;
}

#info {
  animation: showInfo 5s linear;
}

#reloadInfo {
  animation: reloadInfo 10s linear;
}
#wahoot_logo {
  margin-bottom: 10vmin;
  
}

#loadingBarFrame {
  height: 2.5vmin;
  border-radius: 2vmin;
  border: 0.25vmin solid rgba(0, 0, 0, 0.9);
  width: 40vmin;
  z-index: 3;
  overflow: hidden;
  position: relative;
}

.loadingBar {
  height: 100%;
  position: absolute;
}

#loading {
  background-color: rgb(41, 87, 143);
  width: 25%;
  animation: load 1.5s linear infinite;
}

#loadingComplete {
  background-color: rgb(35, 190, 15);
  width: 0%;
  animation: loaded 0.5s linear;
}

@keyframes reloadInfo {
  0% {
    opacity:0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity:1;
  }
}
@keyframes showInfo {
  0% {
    opacity:0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity:1;
  }
}
@keyframes load {
  0% {
    left: -25%;
  }
  25% {
    left: -25%;
  }
  100% {
    left: 125%;
  }
}

@keyframes loaded {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
