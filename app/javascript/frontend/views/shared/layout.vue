<script setup>
import { useI18n } from "vue-i18n";

import Header from "./_header.vue";
import Footer from "./_footer.vue";

import { useThemeStore } from "@/frontend/stores/themeStore.js";
import { useUserStore } from "@/frontend/stores/userStore.js";
import { useMarkStore } from "@/frontend/stores/markStore.js";

const { t, locale } = useI18n({ useScope: "global" });

const themeStore = useThemeStore();
const userStore = useUserStore();
const markStore = useMarkStore();

themeStore.getThemes();
themeStore.getImages();
markStore.getMarks();

userStore.getCurrentUser();

const switchLang = () => {
  locale.value === "ru" ? (locale.value = "en") : (locale.value = "ru");
  localStorage.setItem("lang", locale.value);
};
</script>

<template>
  <div class="wrapper">
    <Header @switch-lang="switchLang" :lang="locale" />
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
