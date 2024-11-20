import { createApp } from 'vue';
import App from './app.vue'; // Import the App.vue file
import router from './router'; // Import the router
import './assets/styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faWind, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'; // Import both icons

// Add the icons to the library
library.add(faWind, faTemperatureThreeQuarters);

const app = createApp(App);

// Register the Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use the router in the app
app.use(router); 

// Mount the app to the DOM
app.mount('#app'); 
