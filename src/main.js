import { createApp } from 'vue';
import App from './App.vue'; // Import the App.vue file
import router from './router'; // Import the router

const app = createApp(App);

app.use(router); // Use the router in the app
app.mount('#app'); // Mount the app to the DOM
