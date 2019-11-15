import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import HomePage from '@/home/HomePage'
import ShoppingCartPage from '@/cart/ShoppingCartPage'
import ProductDetailPage from '@/product-detail/ProductDetailPage'
import AccountPage from "@/account/AccountPage"
import ProfilePage from '@/profile/ProfilePage'
import ChangePasswordPage from '@/change-password/ChangePasswordPage'
import HistoryPage from '@/history/HistoryPage'
import ErrorPage from '@/error/ErrorPage'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (savedPosition) {
                resolve(savedPosition)
              } else {
                resolve({ x: 0, y: 0 })
              }
          }, 200)
        })
        // if (savedPosition) {
        //     return savedPosition
        // } else {
        //     return { x: 0, y: 0 }
        // }
    },
    routes: [

        {
            path: '/home',
            name: 'home',
            component: HomePage,
            alias: ['/', '/products']
        },
        {
            path: '/products/:product_id',
            component: ProductDetailPage
        },
        {
            path: '/todo',
            component: HelloWorld,
            children: [
                {
                    path: 'profile',
                    component: ProfilePage,
                    alias: ''
                },
                {
                    path: 'change',
                    component: ChangePasswordPage
                },
                {
                    path: 'history',
                    component: HistoryPage
                }
            ]
        },
        {
            path: '/shopping-cart-page',
            component: ShoppingCartPage
        },
        {
            path: '/product-detail-page',
            component: ProductDetailPage
        },
        {
            path: '/account',
            component: AccountPage,
            children: [
                {
                    path: 'profile',
                    component: ProfilePage,
                    alias: ''
                },
                {
                    path: 'change-password',
                    component: ChangePasswordPage
                },
                {
                    path: 'history',
                    component: HistoryPage
                }
            ]
        },
        {
            path: '*',
            component: ErrorPage
        }
    ],


})



// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//       // this route requires auth, check if logged in
//       // if not, redirect to login page.
//       if (!auth.loggedIn()) {
//         next({
//           path: '/login',
//           query: { redirect: to.fullPath }
//         })
//       } else {
//         next()
//       }
//     } else {
//       next() // make sure to always call next()!
//     }
//   })