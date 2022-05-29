<template>
	<div class="">{{ time }}</div>
</template>

<script setup>
import { ref } from 'vue'
const time = ref(getTime())
test()
</script>

<style scoped></style>
