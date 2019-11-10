import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import TodoList from '@/components/TodoList'
import HomePage from '@/home/HomePage'
import ChangePasswordPage from '@/change-password/ChangePasswordPage'
import ShoppingCartPage from '@/cart/ShoppingCartPage'
import ProductDetailPage from '@/product-detail/ProductDetailPage'
import ProfilePage from '@/profile/ProfilePage'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/todo-app',
            components: {
                default: HelloWorld,
               
            }
        },
        {
            path: '/shopping-cart-page',
            component: ShoppingCartPage
        },
        {
            path: '/change-password',
            component: ChangePasswordPage
        },
        {
            path: '/product-detail-page',
            component: ProductDetailPage
        },
        {
            path: '/profile',
            component: ProfilePage
        }
    ],
    

})