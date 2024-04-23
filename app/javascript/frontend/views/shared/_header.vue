<script setup>
import { ref } from "vue";
import { useUserStore } from "@/frontend/stores/userStore.js";

import loginForm from "../components/loginForm.vue";

const userStore = useUserStore();

const openMenu = ref(false);

const openLoginForm = ref(false);

function login(data) {
  userStore.loginUser(data).then((statusCode) => {
    if (statusCode === 200) openLoginForm.value = false;
  });
}

function registr() {
  alert("Зарегистрироваться");
}

function logout() {
  openMenu.value = false;
  userStore.logoutUser();
}

function closeModal() {
  openLoginForm.value = false;
  userStore.errorLogin = null;
}
</script>

<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img src="../../assets/images/logo.png" alt="logo" />
      <p class="text-md">Экспертная оценка</p>
    </router-link>

    <nav class="links-pages">
      <ol>
        <li><router-link to="/" class="link">Главная</router-link></li>
        <li><router-link to="/about" class="link">О нас</router-link></li>
      </ol>
    </nav>

    <div class="group-button">
      <router-link class="languages link" to="#">
        <i class="fa fa-language" aria-hidden="true"></i>
        <span>Ru|En</span>
      </router-link>

      <div v-if="!userStore.isAuthenticated" class="auth">
        <button class="btn link" @click="openLoginForm = true">Войти</button>
        <button class="btn link" @click="registr()">Зарегистрироваться</button>
      </div>

      <div v-else class="profile" @click="openMenu = !openMenu">
        <img src="../../assets/images/user.png" alt="user" />
        <span class="text-sm">{{ userStore.user.name }}</span>
      </div>

      <div v-if="openMenu" class="menu-profile">
        <button class="btn link logout" @click="logout()">Выйти</button>
      </div>
    </div>
  </header>

  <div v-if="openLoginForm" class="modal">
    <i
      class="fa fa-window-close close-btn"
      aria-hidden="true"
      @click="closeModal"
    ></i>
    <h3 class="title-modal">Авторизация</h3>
    <loginForm @submit="login" />
  </div>
</template>

<style scoped lang="sass">

.header
	height: 80px
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	padding: 5px 30px
	background-color: var(--color-bg)

.logo
	max-width: 180px
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	text-decoration: none
	font-weight: 700
	color: var(--color-main)

	img
		width: 75px
		height: 75px

.links-pages ol
	display: flex
	flex-direction: row
	gap: 40px
	list-style-type: none
	padding-left: 0
	a
		color: #000000
		&:hover
			color: var(--color-main)

.group-button
	display: flex
	flex-direction: row
	gap: 40px

.languages
	display: flex
	gap: 8px
	align-items: center

.auth button
	padding: 10px
	border-radius: 15px
	border: 1px solid transparent
	&:first-child
		margin-right: 8px
		border-color: var(--color-main)
		&:hover
			color: var(--color-main)

	&:last-child
		color: #ffffff
		background-color: var(--color-main)
		&:hover
			color: var(--color-bg)

.profile
	display: flex
	align-items: center
	gap: 5px

	position: relative

	font-weight: 700

	cursor: pointer

	&:hover
		color: var(--color-main)

	img
		width: 35px
		height: 35px

.menu-profile
	position: absolute
	right: 30px
	top: 65px

	width: 80px
	text-align: center
	padding: 5px
	background-color: var(--color-main)

.logout
	color: #ffffff

.modal
	max-width: 500px

	position: fixed
	margin: 0 auto
	left: 0
	right: 0
	top: 25%

	padding: 20px

	color: #ffffff
	background-color: var(--color-main)

.close-btn
	float: right
	font-size: 20px
	cursor: pointer

.title-modal
	margin-bottom: 30px
	text-align: center
</style>
