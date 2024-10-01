<template>
<div id="wrapper">
    <iframe class="game-iframe" id="game-area" src="https://www.jezng.com/open-syobon-action.js/#canvas" frameborder="0" allowfullscreen=true></iframe>
</div>
</template>

<style scoped>
#wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    overflow:hidden;
}
</style>