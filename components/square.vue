<template>
    <div ref="square" id="square" />
</template>


<style>
#square {
  position: absolute;
  min-width: 70vmin;
  min-height: 70vmin;
  top: -15vmin;
  left: -15vmin;
  z-index: -2;
  animation: enlargeAndRotate 1.5s forwards, rotateSquare 60s linear infinite 1.5s; 
}

@keyframes enlargeAndRotate {
  0% {
    transform: rotate(0deg) scale(0.2);
    opacity: 0.5;
  }
  100% {
    transform: rotate(225deg) scale(1);
    opacity: 1;
  }
}

@keyframes rotateSquare {
  0% {
    transform: rotate(225deg) scale(1);
  }
  100% {
    transform: rotate(585deg) scale(1);
  }
}
</style>



