// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

// console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

import { createApp } from 'vue';
import Router from '@/frontend/routes.js';
import { createPinia } from 'pinia'
import { languages } from '../i18n';
import { defaultLocale } from '../i18n';
import { createI18n, useI18n } from 'vue-i18n';

import Layout from '@/frontend/views/shared/layout.vue';

import '../frontend/assets/stylesheets/common.sass';

const pinia = createPinia();

const localStorageLang = localStorage.getItem('lang');
const messages = Object.assign(languages);
const i18n = createI18n({
	legacy: false,
	locale: localStorageLang || defaultLocale,
	fallbackLocale: 'ru',
	messages
});

const app = createApp(Layout, {
	setup(){
		const {t} = useI18n()
		return {t}
	}
});

app.use(i18n).use(Router).use(pinia).mount('#app');  
