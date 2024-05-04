<script setup>
import { ref, computed, watch } from "vue";

import { useThemeStore } from "@/frontend/stores/themeStore.js";
import { useUserStore } from "@/frontend/stores/userStore.js";
import { useMarkStore } from "@/frontend/stores/markStore.js";

const themeStore = useThemeStore();

const allThemes = computed(() => themeStore.allThemes);
const userStore = useUserStore();
const markStore = useMarkStore();

const selectedTheme = ref(null);

const themeImages = computed(() =>
  themeStore.getThemeImages(+selectedTheme.value)
);

const currentIndexImage = ref(0);

const noEvaluate = ref(false);

const nameTheme = ref();
const srcImage = (img) => `/vite-dev/frontend/assets/images/pictures/${img}`;

const initialMark = computed(() => getInitialMark());

function getInitialMark() {
  if (selectedTheme.value !== null && userStore.isAuthenticated) {
    return markStore.getMarkUserImage(
      themeImages.value[currentIndexImage.value].id
    )?.value;
  } else return 0;
}

const mark = ref(0);

function changeStep(type) {
  if (type === "increase") currentIndexImage.value++;
  else currentIndexImage.value--;
}

function saveMark(idImage) {
  if (userStore.isAuthenticated) {
    // если ранее пользователь НЕ оставлял оценку, то ее надо добавить
    if (initialMark.value === undefined) {
      markStore.saveMark(idImage, mark.value).then(() => {
        markStore.getMarks().then(() => getInitialMark());
        mark.value = 0;
      });
    }
    // если ранее пользователь УЖЕ оставлял оценку, то ее надо обновить
    else {
      const idMark = markStore.getMarkUserImage(
        themeImages.value[currentIndexImage.value].id
      ).id;
      markStore.updateMark(idMark, idImage, mark.value).then(() => {
        markStore.getMarks().then(() => getInitialMark());
        mark.value = 0;
      });
    }

    noEvaluate.value = false;
  } else noEvaluate.value = true;
}

watch(selectedTheme, (newValue) => {
  currentIndexImage.value = 0;
  nameTheme.value = allThemes.value.find((f) => f.id === newValue).name;
  mark.value = 0;
});

watch(currentIndexImage, () => {
  mark.value = 0;
});
</script>

<template>
  <div class="main-wrapper">
    <div class="left-part">
      <div class="list-themes">
        <p>
          <b>{{ $t("main.title_choice_theme") }}</b>
        </p>
        <button
          v-for="theme in allThemes"
          :key="theme.id"
          @click="selectedTheme = theme.id"
          class="btn btn-themes"
          :class="{ 'selected-theme': selectedTheme === theme.id }"
        >
          {{ theme.name }}
        </button>
      </div>
    </div>

    <div class="right-part" v-if="selectedTheme !== null">
      <h3>{{ nameTheme }}</h3>

      <div class="main-content">
        <button
          class="btn btn-arrow"
          @click="changeStep('decrease')"
          :disabled="currentIndexImage === 0"
        >
          &#9668;
        </button>

        <img
          class="image"
          :src="srcImage(themeImages[currentIndexImage].file)"
          alt=""
        />

        <button
          class="btn btn-arrow"
          @click="changeStep('increase')"
          :disabled="currentIndexImage >= themeImages.length - 1"
        >
          &#9658;
        </button>
      </div>

      <div>
        {{ themeImages[currentIndexImage].name }}
      </div>

      <span
        v-if="userStore.isAuthenticated && initialMark !== undefined"
        class="initial-mark"
      >
        {{ $t("main.initial_mark") }} <b>{{ initialMark }}</b>
      </span>

      <div class="range">
        <input type="range" v-model="mark" id="range1" min="0" max="100" />
      </div>

      <div class="evaluate">
        <span>
          {{ $t("main.your_mark") }} - <b>{{ mark }}</b>
        </span>

        <button
          class="btn btn-save"
          @click="saveMark(themeImages[currentIndexImage].id)"
        >
          {{ $t("main.save_mark_btn") }}
        </button>
      </div>

      <span
        v-if="noEvaluate && !userStore.isAuthenticated"
        class="notification"
      >
        {{ $t("main.notification") }}
      </span>
    </div>

    <div v-else class="right-part empty-theme">
      {{ $t("main.empty_theme") }}
    </div>
  </div>
</template>

<style scoped lang="sass">
.main-wrapper
  display: flex
  justify-content: space-between
  gap: 30px

.left-part
  width: 500px

.right-part
  display: flex
  flex-direction: column
  gap: 15px
  align-items: center
  flex-grow: 1
  border: 1px solid #478390

.empty-theme
  display: flex
  justify-content: center
  font-size: 30px
  color: #8f8f8f

.list-themes
  display: flex
  flex-direction: column
  gap: 10px
  align-items: center

.btn-themes
  width: 100%
  padding: 8px
  border: 1px solid #969696

  &:hover
    color: #ffffff
    background-color: var(--color-main)

.selected-theme
  color: #ffffff
  background-color: var(--color-main)

.main-content
  display: flex
  gap: 20px

.btn-arrow
  font-size: 40px
  padding-inline: 10px

.image
  width: 600px
  height: 330px
  object-fit: cover

.evaluate
  width: 600px
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 15px

.initial-mark
  display: inline-block
  width: 600px

.btn-save
  padding: 7px
  border: 1px solid var(--color-main)

  &:hover
    color: #ffffff
    background-color: var(--color-main)

.notification
  display: inline-block
  width: 600px
  text-align: end
  color: red

  margin-top: -15px
  margin-bottom: 15px

// **********************************************
#range1
  -webkit-appearance: none
  appearance: none
  width: 600px
  cursor: pointer
  outline: none
  overflow: hidden
  border-radius: 16px

#range1::-webkit-slider-runnable-track
  height: 15px
  background: #ccc
  border-radius: 16px

#range1::-moz-range-track
  height: 15px
  background: #ccc
  border-radius: 16px

#range1::-webkit-slider-thumb
  -webkit-appearance: none
  appearance: none
  height: 15px
  width: 15px
  background-color: #fff
  border-radius: 50%
  border: 2px solid #f50
  box-shadow: -407px 0 0 400px #f50

#range1::-moz-range-thumb
  height: 15px
  width: 15px
  background-color: #fff
  border-radius: 50%
  border: 1px solid #f50
  box-shadow: -407px 0 0 400px #f50
</style>
