import {defineStore} from 'pinia'
import { ref } from "vue"

export const useThemeStore = defineStore('theme', () => {
	const allThemes = ref();
	const allImages = ref();
	const imagesWithAvgMarks = ref();
	

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

	async function getImagesWithAvgMarks(idTheme) {
		const res = await fetch(`/themes/${idTheme}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		});

		const finalRes = await res.json();
		imagesWithAvgMarks.value = finalRes;
   }

	function getThemeImages(idTheme) {
		return allImages.value.filter((f) => f.theme_id === idTheme)
	}
	
	return { allThemes, allImages, imagesWithAvgMarks, getThemes, getImages, getThemeImages, getImagesWithAvgMarks }
})