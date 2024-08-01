<template>
    <div ref="ellipsis" id="ellipsis"></div>
</template>

<style>
#ellipsis {
  position: absolute;
  min-width: 70vmin;
  min-height: 70vmin;
  border-radius: 50%;
  bottom: -15vmin;
  right: -15vmin;
  z-index: -2;
  opacity: 1;
  animation: moveInEllipsis 1.5s ;
}
@keyframes moveInEllipsis{
    0% {
        transform: translateX(100%);
        opacity: 0.5;
    }
    100% {
        transform: translateX(0) ;
        opacity: 1;
    }

}
</style>
    