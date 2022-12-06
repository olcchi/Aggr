<script setup lang="ts">
// fixHeight
const fixHeight = ref(`${window.innerHeight}px`)
</script>

<template>
  <main h-screen flex flex-col justify-between :style="{ height: fixHeight }">
    <RouterView />
  </main>
</template>

