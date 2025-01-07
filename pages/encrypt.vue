<template>
    <div id="encwrapper">
        <h1>Encrypter</h1>
        <input class="txt" placeholder="apple pen" v-model="enctxt" />
        <button @click="copy(encode(enctxt))">{{ status }}</button>
        <p>{{ encode(enctxt) }}</p>
    </div>
    <div id="decwrapper">
        <h1>Decrypter</h1>
        <input class="txt" placeholder="encrypted text" v-model="dectxt" />
        <p>{{ decrypt(dectxt) }}</p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useClipboard } from "@vueuse/core";

const { copy,copied } = useClipboard();
const enctxt = ref('');
const status = ref('Copy');
const dectxt = ref('');
const dec = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const enc = "ZABCDEFGHIJKLMNOPQRSTUVWXY";

// Encode function
function encode(txt) {
    let ret = "";
    for (let i = 0; i < txt.length; i++) {
        let index = dec.indexOf(txt[i].toUpperCase());
        if (index !== -1) {
            ret += enc[index];
        } else {
            ret += txt[i];
        }
    }
    return ret;
}

// Decode function
function decrypt(txt) {
    let ret = "";
    for (let i = 0; i < txt.length; i++) {
        let index = enc.indexOf(txt[i].toUpperCase());
        if (index !== -1) {
            ret += dec[index];
        } else {
            ret += txt[i];
        }
    }
    return ret;
}
</script>

<style scoped>
#encwrapper {
    position: absolute;
    top: 1vmin;
    left: 1vmin;
}
#decwrapper {
    position: absolute;
    top: 20vmin;
    left: 1vmin;
}
</style>
