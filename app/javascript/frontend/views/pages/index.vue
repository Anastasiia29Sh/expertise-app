<script setup>
import { ref, computed, watch } from "vue";
import { useThemeStore } from "@/frontend/stores/themeStore.js";

const themeStore = useThemeStore();

const allThemes = computed(() => themeStore.allThemes);
const allImages = computed(() => themeStore.allImages);

const selectedTheme = ref(null);

const themeImages = computed(() =>
  themeStore.getThemeImages(+selectedTheme.value)
);

const currentIndexImage = ref(0);
const mark = ref(5);

const nameTheme = ref();
const srcImage = (img) => `/vite-dev/frontend/assets/images/pictures/${img}`;

function changeStep(type) {
  if (type === "increase") currentIndexImage.value++;
  else currentIndexImage.value--;
}

watch(selectedTheme, (newValue) => {
  currentIndexImage.value = 0;
  nameTheme.value = allThemes.value.find((f) => f.id === newValue).name;
  mark.value = 5;
});
</script>

<template>
  <div class="main-wrapper">
    <div class="left-part">
      <div class="list-themes">
        <p><b>Выберите тему</b></p>
        <button
          v-for="theme in allThemes"
          :key="theme.id"
          @click="selectedTheme = theme.id"
          class="btn-themes"
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
          class="btn-arrow"
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
          class="btn-arrow"
          @click="changeStep('increase')"
          :disabled="currentIndexImage >= themeImages.length - 1"
        >
          &#9658;
        </button>
      </div>

      <div>
        {{ themeImages[currentIndexImage].name }}
      </div>

      <div class="range">
        <input type="range" v-model="mark" id="range1" min="0" max="100" />
      </div>

      <div class="evaluate">
        <span>
          Ваша оценка - <b>{{ mark }}</b>
        </span>

        <button class="btn-save">Сохранить</button>
      </div>
    </div>

    <div v-else class="right-part empty-theme">Тема не выбрана</div>
  </div>
</template>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.left-part {
  width: 500px;
}

.right-part {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  flex-grow: 1;
  border: 1px solid #478390;
}

.empty-theme {
  display: flex;
  justify-content: center;
  font-size: 30px;
  color: #8f8f8f;
}

.list-themes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.btn-themes {
  width: 100%;
  padding: 8px;
  background-color: transparent;
  border: 1px solid #969696;

  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: var(--color-main);
  }
}

.selected-theme {
  color: #ffffff;
  background-color: var(--color-main);
}

.main-content {
  display: flex;
  gap: 20px;
}

.btn-arrow {
  font-size: 40px;
  padding-inline: 10px;

  background-color: transparent;
  border: none;
  cursor: pointer;
}

.image {
  width: 600px;
  height: 350px;
  object-fit: cover;
}

.evaluate {
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.btn-save {
  padding: 7px;
  background-color: transparent;
  border: 1px solid var(--color-main);
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: var(--color-main);
  }
}

// **********************************************
#range1 {
  -webkit-appearance: none;
  appearance: none;
  width: 600px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 16px;
}

#range1::-webkit-slider-runnable-track {
  height: 15px;
  background: #ccc;
  border-radius: 16px;
}

#range1::-moz-range-track {
  height: 15px;
  background: #ccc;
  border-radius: 16px;
}

#range1::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #f50;
  box-shadow: -407px 0 0 400px #f50;
}

#range1::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #f50;
  box-shadow: -407px 0 0 400px #f50;
}
</style>
