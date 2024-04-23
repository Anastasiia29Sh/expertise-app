<script setup>
import { ref, computed } from "vue";

import { useUserStore } from "@/frontend/stores/userStore.js";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const emit = defineEmits(["submit"]);

const flag = ref(false);

const message = computed(() =>
  (email.value === "" || password.value === "") && flag.value
    ? "Пожалуйста, заполните все поля"
    : ""
);

function onSudmit() {
  flag.value = true;
  if (email.value !== "" && password.value !== "")
    emit("submit", { email: email.value, password: password.value });
}
</script>

<template>
  <form class="form" method="post" @submit.prevent="onSudmit">
    <input
      v-model="email"
      type="email"
      name="email"
      placeholder="Почта"
      class="input"
    />
    <input
      v-model="password"
      type="password"
      name="password"
      placeholder="Пароль"
      class="input"
    />
    <input type="submit" value="Войти" class="input login-btn" />

    <span class="error">{{ message || userStore.errorLogin }}</span>
  </form>
</template>

<style scoped lang="sass">
.form
	display: flex
	flex-direction: column
	gap: 20px

.input
	padding: 10px
	background-color: #ffffff
	border: 1px solid transparent
	border-radius: 10px

.login-btn
	font-weight: 700
	color: var(--color-main)
	background-color: var(--color-bg)
	cursor: pointer

	&:hover
		color: #ffffff
		background-color: #f50

.error
	margin-top: -10px
	text-align: center
	color: var(--color-bg)
</style>
