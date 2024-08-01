<script setup>
import { useCounterStore } from '~/stores/test'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()

</script>

<template>
    <p>the{{ store.count }}</p>
    <button @click="store.increment()">Increment</button>
</template>