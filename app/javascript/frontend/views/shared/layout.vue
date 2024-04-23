<script setup>
import { onMounted } from "vue";

import Header from "./_header.vue";
import Footer from "./_footer.vue";

import { useThemeStore } from "@/frontend/stores/themeStore.js";

const themeStore = useThemeStore();

themeStore.getThemes();
themeStore.getImages();

// console.log(imageStore.allImages);

// onMounted(() => {
//   imageStore.getImages();
// });
</script>

<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="sass">
.wrapper
  display: flex
  flex-direction: column
  height: 100vh
  justify-content: space-between


.content
  flex-grow: 1
  padding: 30px
</style>
