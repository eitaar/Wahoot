<template>
    <p>{{ time }}</p>
</template>

<script setup>
import moment from "moment";

const time = moment().format("YYYY-MM-DD HH:mm:ss");

</script>
