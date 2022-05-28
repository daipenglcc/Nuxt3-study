<template>
	<NuxtLayout name="default">
		<template #one>
			<div class=""><h1>Index Page</h1></div>
			<NuxtLink to="/demo1">Demo1.vue</NuxtLink><br />
			<NuxtLink to="/demo2-38">Demo2.vue</NuxtLink><br />
			<NuxtLink to="/goods-jspang/demo3-38">Demo3.vue</NuxtLink><br />
			<NuxtLink to="/parent/one">/parent/one</NuxtLink><br />
			<NuxtLink to="/parent/two">/parent/two</NuxtLink><br />
		</template>
		<template #two>
			<div>
				我是two中的内容
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import {} from 'vue'
</script>

<style scoped></style>
