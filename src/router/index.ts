import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsView.vue'),
    },
    {
      path: '/create-contact',
      name: 'create-contact',
      component: () => import('../views/CreateNewContactView.vue'),
    },
    {
      path: '/edit-contact/:id',
      name: 'edit-contact',
      component: () => import('../views/EditContactView.vue'),
    },
  ],
})

export default router
