<template>
    <input type="input" v-model="pin"/>
    <button @click="join">Join</button>
</template>

<script>
definePageMeta({
  middleware: ['auth'], // もしくは 'auth'
  // middleware: 'auth',
})
import { Client } from '~/assets/src/kahoot/kahoot';
const client = new Client();
export default {
    data() {
        return {
            pin: undefined,
        };
    },
    mounted() {
        console.log("mounted");
    },
    methods: {
        async join() {
            client.join(parseInt(this.pin), `Wahoot!${Date.now()}`);
            client.on("joined", () => {
                this.pin = `Joined ${this.pin}`;
            })
            }
        }
}
</script>
