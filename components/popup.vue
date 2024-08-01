<template>
    <div id="popup">
        <div id="popup_close" type="button" @click="$emit('closePopup')"></div>
        <div v-html="html"></div>
    </div>
</template>

<style>
    #popup {
        height: 75vmin;
        width: 80vmin;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(255, 255, 255);
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.95);
        border-radius: 5px;
        z-index: 3;
        text-align: left;
    }
    #popup_close:before {
        position: absolute;
        content: '\2716';
        font-size: 20px;
        color: black;
        transform: translate(-50%, -50%);
        left: 97.5%;
        top: 3%;
        cursor: pointer;
    }
</style>

<script>
export default {
    props: ["html"]
};
</script>
