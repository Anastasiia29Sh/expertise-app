<script setup>
import Header from "./_header.vue";
import Footer from "./_footer.vue";

import { useThemeStore } from "@/frontend/stores/themeStore.js";
import { useUserStore } from "@/frontend/stores/userStore.js";
import { useMarkStore } from "@/frontend/stores/markStore.js";

const themeStore = useThemeStore();
const userStore = useUserStore();
const markStore = useMarkStore();

themeStore.getThemes();
themeStore.getImages();
markStore.getMarks();

userStore.getCurrentUser();
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
