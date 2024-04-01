<template>
  <div class="header">
    <a class="logo" href="/">
      <img src="../../assets/images/logo.png" alt="logo" />
      <p class="text-md">Экспертная оценка</p>
    </a>

    <nav class="links-pages">
      <ol>
        <li><a class="link" href="/">Главная</a></li>
        <li><a class="link" href="/about">О нас</a></li>
      </ol>
    </nav>

    <div class="group-button">
      <div class="languages">
        <a class="link" href="#">
          <i class="fa fa-language" aria-hidden="true"></i>
          <span>Ru|En</span>
        </a>
      </div>

      <div class="auth">
        <a class="link" href="/auth/login">Войти</a>
        <a class="link" href="/auth/registr">Зарегистрироваться</a>
      </div>
    </div>
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

.auth a
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
