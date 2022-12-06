<script setup lang="ts">
// fixHeight
const fixHeight = ref('100dvh')
</script>

<template>
  <main h-screen flex flex-col justify-between :style="{ height: fixHeight }">
    <RouterView />
  </main>
</template>

