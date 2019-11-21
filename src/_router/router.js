import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import HomePage from '@/home/HomePage'
import ProductDetailPage from '@/product-detail/ProductDetailPage'
import AccountPage from "@/account/AccountPage"
import ProfilePage from '@/profile/ProfilePage'
import ChangePasswordPage from '@/change-password/ChangePasswordPage'
import HistoryPage from '@/history/HistoryPage'
import ErrorPage from '@/error/ErrorPage'
import AdminPage from '@/admin/AdminPage'
import ForgetPassword from '@/forget-password/ForgetPassword'
import OrderDetail from '@/components/OrderDetail'

Vue.use(VueRouter);

const router = new VueRouter({
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
            component: ProductDetailPage,
            name: 'product detail'
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
            path: '/account',
            component: AccountPage,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'profile',
                    component: ProfilePage,
                    alias: '',

                },
                {
                    path: 'change-password',
                    component: ChangePasswordPage,

                },
                {
                    path: 'history',
                    component: HistoryPage
                }
            ]
        },
        {
            path: '/admin',
            component: AdminPage
        },
        {
            path: '/orders/:order_id',
            component: OrderDetail,
            name: 'orders'
        },
        {
            path: '/forget-password',
            component: ForgetPassword,
            name: 'forget password'
        },
        {
            path: '*',
            component: ErrorPage
        },
        

        
    ],


})

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
    Vue.use(VueAnalytics, {
        id: process.env.GOOGLE_ANALYTICS,
        router,
        autoTracking: {
            page: process.env.NODE_ENV !== 'development'
        }
    })
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router;