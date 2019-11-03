import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import TodoList from '@/components/TodoList'
import ProductList from '@/components/ProductList'
import ChangePasswordPage from '@/change-password/ChangePasswordPage'

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
            component: ProductList
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
        }
    ],
    

})