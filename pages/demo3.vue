<template>
	<div class="">
		<button @click="handleClick">显示/隐藏</button>
		<lazyText v-if="show" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
const handleClick = () => {
	show.value = show.value ? false : true
}
</script>

<style scoped></style>
