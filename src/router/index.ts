import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Home from '../pages/Home.vue';
import FormBuilder from '../pages/FormBuilder.vue';
import FormRenderer from '../pages/FormRenderer.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'form-builder',
        name: 'FormBuilder',
        component: FormBuilder,
      },
      {
        path: 'form-renderer',
        name: 'FormRenderer',
        component: FormRenderer,
      },
    ],
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;