<template>
    <h1>{{ text }}</h1>
</template>

<script>
    export default {
        data() {
            return {
                text: 'Hello World'
            }
        },
        mounted() {
            console.log("hi");
        }
    }
</script>