<script setup lang="ts">
// use head
useHead({
  title: 'Aggr',
  meta: [
    { name: 'description', content: 'Aggregation search engine' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#181818' : '#F9FAFB'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
