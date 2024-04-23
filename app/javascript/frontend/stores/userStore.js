import {defineStore} from 'pinia'
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	const isAuthenticated = ref(false)
	const user = ref(null)

	const errorLogin = ref(null)

	async function loginUser(data) {
		const res = await fetch("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrfToken,
			},
			body: JSON.stringify({
				session: data
			})
		});

		const finalRes = await res.json();

		if (res.ok) {
			user.value = finalRes.user;
			isAuthenticated.value = true;
			errorLogin.value = null;
		}
		else {
			errorLogin.value = finalRes.error
			user.value = null;
			isAuthenticated.value = false;
		}

		return res.status;
   }

	async function getCurrentUser() {
		const res = await fetch("/auth/current", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const finalRes = await res.json();
		user.value = finalRes.user;
		if(user.value !== null) isAuthenticated.value = true;
		else isAuthenticated.value = false;
		errorLogin.value = null;
   }

	async function logoutUser() {
		await fetch("/auth/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		user.value = null;
		isAuthenticated.value = false;
		errorLogin.value = null;
   }

	return { isAuthenticated, user, errorLogin, loginUser, getCurrentUser, logoutUser }
})