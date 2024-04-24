<script setup>
import { ref, computed } from "vue";

import { useUserStore } from "@/frontend/stores/userStore.js";

const userStore = useUserStore();

const name = ref("");
const email = ref("");
const password = ref("");

const emit = defineEmits(["submit"]);

const flag = ref(false);

const message = computed(() =>
  (name.value === "" || email.value === "" || password.value === "") &&
  flag.value
    ? "Пожалуйста, заполните все поля"
    : ""
);

function onSudmit() {
  flag.value = true;
  if (name.value !== "" && email.value !== "" && password.value !== "")
    emit("submit", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
}
</script>

<template>
  <form class="form" method="post" @submit.prevent="onSudmit">
    <input
      v-model="name"
      type="text"
      name="name"
      placeholder="Имя"
      maxlength="50"
      class="input"
    />

    <input
      v-model="email"
      type="email"
      name="email"
      placeholder="Почта"
      maxlength="50"
      class="input"
    />

    <input
      v-model="password"
      type="password"
      name="password"
      placeholder="Пароль"
      minlength="6"
      class="input"
    />

    <input type="submit" value="Зарегистрироваться" class="input login-btn" />

    <span class="error">{{ message || userStore.errorRegistr }}</span>
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
