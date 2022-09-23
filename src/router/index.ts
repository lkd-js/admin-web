import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router' //createWebHistory, 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/goods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    children: [
      {
        path: '/goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import(/* webpackChunkName: "goods" */ '../components/GoodsCom.vue'),
      },
      {
        path: '/users',
        name: 'users',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import(/* webpackChunkName: "goods" */ '../components/UsersCom.vue'),
      },
      {
        path: '/lists',
        name: 'lists',
        meta: {
          isShow: true,
          title: '角色列表'
        },
        component: () => import(/* webpackChunkName: "goods" */ '../components/ListsCom.vue'),
      },
      {
        path: '/aus:id:name',
        name: 'aus',
        meta: {
          isShow: false,
          title: '权限列表'
        },
        component: () => import(/* webpackChunkName: "goods" */ '../components/AusCom.vue'),
      },
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
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),   //打包程序时使用
  routes
})


router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token');
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
