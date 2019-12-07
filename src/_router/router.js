import Vue from 'vue';
import VueRouter from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';
import HomePage from '@/home/HomePage';
import ProductDetailPage from '@/product-detail/ProductDetailPage';
import AccountPage from "@/account/AccountPage";
import ProfilePage from '@/profile/ProfilePage';
import ChangePasswordPage from '@/change-password/ChangePasswordPage';
import HistoryPage from '@/history/HistoryPage';
import ErrorPage from '@/error/ErrorPage';
import ForgetPassword from '@/forget-password/ForgetPassword';
import OrderDetailPage from '@/order-detail/OrderDetailPage';
import ShoppingCartPage from '@/shopping-cart/ShoppingCartPage';
import OrderPage from '@/order/OrderPage';
import UserPage from '@/user/UserPage';

import AdminPage from '@/admin/AdminPage';
import AdminHome from '@/admin/AdminHome';
import ManageUsersPage from '@/admin/users/ManageUsersPage';
import ManageStaffsPage from '@/admin/staffs/ManageStaffsPage';
import AddStaffPage from '@/admin/staffs/AddStaffPage';
import ManageProductsPage from '@/admin/products/ManageProductsPage';
import AddProductPage from '@/admin/products/AddProductPage';
import EditProductPage from '@/admin/products/EditProductPage';
import ManageOrdersPage from '@/admin/orders/ManageOrdersPage';
import ManageOrderDetailPage from '@/admin/orders/ManageOrderDetailPage';
import ImportProductsPage from '@/admin/importProducts/ImportProductsPage';
import ImportProductDetailPage from '@/admin/importProducts/ImportProductDetailPage';
import ManageSuppliersPage from "@/admin/suppliers/ManageSuppliersPage";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (savedPosition) {
                    resolve(savedPosition);
                } else {
                    resolve({
                        x: 0,
                        y: 0
                    });
                }
            }, 200);
        });
        // if (savedPosition) {
        //     return savedPosition
        // } else {
        //     return { x: 0, y: 0 }
        // }
    },
    routes: [

        {
            path: '/',
            component: UserPage,
            children: [{
                path: 'home',
                name: 'home',
                component: HomePage,
                alias: ['', '/products']
            },
            {
                path: 'products/:product_id',
                component: ProductDetailPage,
                name: 'product detail'
            },
            {
                path: 'todo',
                component: HelloWorld,
            },

            {
                path: 'account',
                component: AccountPage,
                meta: {
                    requiresAuth: true
                },
                children: [{
                    path: 'profile',
                    component: ProfilePage,
                    alias: '',

                },
                {
                    path: 'change-password',
                    component: ChangePasswordPage,

                },
                {
                    path: 'orders',
                    component: HistoryPage
                },
                // OrderDetailPage là trang sau khi đã tạo đơn hàng, đơn hàng có trong lịch sử đặt hàng
                {
                    path: 'orders/:orderId',
                    component: OrderDetailPage,
                    name: 'orders'
                },
                ]
            },
            {
                path: 'forget-password',
                component: ForgetPassword,
                name: 'forget password'
            },
            {
                path: "shopping-cart",
                component: ShoppingCartPage,
                name: 'shopping cart'
            },
            // OrderPage là trang khi đang tạo đơn hàng, chưa được đặt hàng, thanh toán
            {
                path: "order-page",
                component: OrderPage,
                name: 'order page'
            },
            ]
        },

        {
            path: '/admin',
            component: AdminPage,
            meta: {
                requiresAuth: true
            },
            children: [{
                path: '',
                component: AdminHome
            },
            {
                path: 'users',
                component: ManageUsersPage
            },
            {
                path: 'staffs',
                component: ManageStaffsPage
            },
            {
                path: 'add-staff',
                component: AddStaffPage
            },
            {
                path: 'products',
                component: ManageProductsPage
            },
            {
                path: 'products/:productId',
                component: EditProductPage,
                name: 'admin product'
            },
            {
                path: 'add-product',
                component: AddProductPage
            },
            {
                path: 'orders',
                component: ManageOrdersPage
            },
            {
                path: 'orders/:orderId',
                component: ManageOrderDetailPage,
                name: 'admin order'
            },
            {
                path: 'importProducts',
                component: ImportProductsPage
            },
            {
                path: 'importProducts/:importProductId',
                component: ImportProductDetailPage,
                name: 'admin importProduct'
            },
            {
                path: "suppliers",
                component: ManageSuppliersPage
            }

            ]
        },

        {
            path: '*',
            component: ErrorPage
        },

    ],


});

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
    });
}

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         let user = JSON.parse(localStorage.getItem('user'));
//         if (!user) {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         } else {
//             next()
//         }
//     } else {
//         next() // make sure to always call next()!
//     }
// })

export default router;