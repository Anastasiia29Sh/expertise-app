import {defineStore} from 'pinia'
import { ref } from "vue"

export const useThemeStore = defineStore('theme', () => {
	const allThemes = ref();
	const allImages = ref();
	

	async function getThemes() {
		const res = await fetch("/themes", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const finalRes = await res.json();
		allThemes.value = finalRes;
   }
	
	async function getImages() {
		const res = await fetch("/images", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const finalRes = await res.json();
		allImages.value = finalRes;
   }

	function getThemeImages(idTheme) {
		return allImages.value.filter((f) => f.theme_id === idTheme)
	}
	
	return { allThemes, allImages, getThemes, getImages, getThemeImages }
})