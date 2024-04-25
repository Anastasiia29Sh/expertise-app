import {defineStore} from 'pinia'
import { ref } from "vue"

import { useUserStore } from "./userStore.js";

export const useMarkStore = defineStore('mark', () => {
	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	const userStore = useUserStore();

	const allMarks = ref();

	async function getMarks() {
		const res = await fetch("/values", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const finalRes = await res.json();
		allMarks.value = finalRes;

		return res.status;
   }

	function getMarkUserImage(idImage) {
		return allMarks.value.find((f) => f.user_id === userStore.user.id && f.image_id === idImage)
	}

	async function saveMark(idImage, mark) {
		const res = await fetch("/values", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrfToken,
			},
			body: JSON.stringify({ value: {user_id: userStore.user.id, image_id: idImage, value: mark} })
		});

		return res.status;
   }

	async function updateMark(idMark, idImage, mark) {
		const res = await fetch(`/values/${idMark}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrfToken,
			},
			body: JSON.stringify({ value: {user_id: userStore.user.id, image_id: idImage, value: mark} })
		});

		return res.status;
   }

	return { allMarks, getMarks, saveMark, updateMark, getMarkUserImage }
})