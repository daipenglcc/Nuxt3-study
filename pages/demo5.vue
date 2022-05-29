<template>
	<div class="">{{ list }}</div>
</template>

<script setup>
import { ref } from 'vue'

// const res = await useAsyncData('getList', () => $fetch('http://121.36.81.61:8000/getTenArticleList'), {
// 	lazy: true
// })
const res = await useFetch('http://121.36.81.61:8000/getTenArticleList', {
	method: 'get',
	id: 1,
	pick: ['status', 'success']
})

const list = ref(res.data._rawValue.data)
console.log('res', res)
</script>

<style scoped></style>
