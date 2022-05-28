<template>
  <div class="">获取的id:{{ id }}</div>
</template>

<script setup>
import { ref } from "vue";
const route = useRoute();
const id = ref(route.params.id);
</script>

<style scoped></style>