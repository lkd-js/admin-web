import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '../components/GoodsCom.vue'),
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '../components/GoodsCom.vue'),
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '../components/GoodsCom.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
