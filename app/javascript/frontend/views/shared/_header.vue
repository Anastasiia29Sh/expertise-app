<script setup>
function login() {
  alert("Войти");
}

function registr() {
  alert("Зарегистрироваться");
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

      <div class="auth">
        <button class="btn link" @click="login()">Войти</button>
        <button class="btn link" @click="registr()">Зарегистрироваться</button>
      </div>
    </div>
  </header>
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
</style>
