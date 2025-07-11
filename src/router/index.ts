import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

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
      path: '/bindeo',
      name: 'bindeo-app',
      redirect: '/bindeo/contacts',
      component: () => import('../views/private/BindeoView.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'contacts',
          name: 'contacts',
          component: () => import('../views/private/ContactsView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'create-contact',
          name: 'create-contact',
          component: () => import('../views/private/CreateNewContactView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'edit-contact/:id',
          name: 'edit-contact',
          component: () => import('../views/private/EditContactView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta?.requiresAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        path: '/login',
      }
    }
  }
})

export default router
