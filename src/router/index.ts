import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Main from '../pages/Main.vue';
import Test from '../pages/Test.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Main',
        component: Main,
      },
      {
        path: 'test',
        name: 'Test',
        component: Test,
      },
    ],
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;