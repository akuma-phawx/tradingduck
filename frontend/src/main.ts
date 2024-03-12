import { createApp } from 'vue';
import '@/assets/main.scss';
import 'flag-icons';
import App from '@/App.vue';
import router from '@/router/index';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-search-select/dist/VueSearchSelect.css';
import '@mdi/font/css/materialdesignicons.css';
import { VDatePicker } from 'vuetify/labs/VDatePicker';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components: {
    ...components,
    VDatePicker,
  },
  directives,
});

const pinia = createPinia();

createApp(App).use(vuetify).use(ToastPlugin).use(router).use(pinia).mount('#app');
