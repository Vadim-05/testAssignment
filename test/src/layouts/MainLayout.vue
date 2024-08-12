<template>
  <MainHeader />
  <main>
    <router-view />
  </main>
  <MainFooter />
</template>

<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
</script>
