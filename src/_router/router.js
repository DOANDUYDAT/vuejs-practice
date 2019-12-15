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
import AddImportProductPage from '@/admin/importProducts/AddImportProductPage';
import ManageSuppliersPage from "@/admin/suppliers/ManageSuppliersPage";

import NotPermission from '@/not-permission/NotPermission';
import LoginPage from "@/login/LoginPage";

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
            meta: {
                requiresRole: null
            },
            children: [{
                    path: 'home',
                    name: 'home',
                    component: HomePage,
                    alias: ['', '/products'],
                    meta: {
                        requiresRole: null
                    }
                },
                {
                    path: 'filter',
                    component: HomePage,
                    name: 'filter',
                    meta: {
                        requiresRole: null
                    }
                },
                {
                    path: 'search',
                    component: HomePage,
                    name: 'search',
                    meta: {
                        requiresRole: null
                    }
                },
                {
                    path: 'products/:productId',
                    component: ProductDetailPage,
                    name: 'product detail',
                    meta: {
                        requiresRole: null
                    }
                },
                {
                    path: 'todo',
                    component: HelloWorld,
                    meta: {
                        requiresRole: null
                    }
                },

                {
                    path: 'account',
                    component: AccountPage,
                    meta: {
                        requiresRole: ['user', 'staff', 'admin']
                    },
                    children: [{
                            path: 'profile',
                            component: ProfilePage,
                            alias: '',
                            meta: {
                                requiresRole: ['user', 'staff', 'admin']
                            }
                        },
                        {
                            path: 'change-password',
                            component: ChangePasswordPage,
                            meta: {
                                requiresRole: ['user', 'staff', 'admin']
                            }
                        },
                        {
                            path: 'orders',
                            component: HistoryPage,
                            meta: {
                                requiresRole: ['user', 'staff', 'admin']
                            }
                        },
                        // OrderDetailPage là trang sau khi đã tạo đơn hàng, đơn hàng có trong lịch sử đặt hàng
                        {
                            path: 'orders/:orderId',
                            component: OrderDetailPage,
                            name: 'orders',
                            meta: {
                                requiresRole: ['user', 'staff', 'admin']
                            }
                        },
                    ]
                },
                {
                    path: 'forget-password',
                    component: ForgetPassword,
                    name: 'forget password',
                    meta: {
                        requiresRole: null
                    }
                },
                {
                    path: "shopping-cart",
                    component: ShoppingCartPage,
                    name: 'shopping cart',
                    meta: {
                        requiresRole: null
                    }
                },
                // OrderPage là trang khi đang tạo đơn hàng, chưa được đặt hàng, thanh toán
                {
                    path: "order-page",
                    component: OrderPage,
                    name: 'order page',
                    meta: {
                        requiresRole: null
                    }
                },
                {
                    path: "login",
                    component: LoginPage,
                    name: 'login page',
                    meta: {
                        requiresRole: null
                    }
                },
            ]
        },

        {
            path: '/admin',
            component: AdminPage,
            meta: {
                requiresRole: ['staff', 'admin']
            },
            children: [{
                    path: '',
                    component: AdminHome,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'users',
                    component: ManageUsersPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'staffs',
                    component: ManageStaffsPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'add-staff',
                    component: AddStaffPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'products',
                    component: ManageProductsPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'products/:productId',
                    component: EditProductPage,
                    name: 'admin product',
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'add-product',
                    component: AddProductPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'orders',
                    component: ManageOrdersPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'orders/:orderId',
                    component: ManageOrderDetailPage,
                    name: 'admin order',
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'import-products',
                    component: ImportProductsPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'import-products/:importProductId',
                    component: ImportProductDetailPage,
                    name: 'admin importProduct',
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                },
                {
                    path: 'add-import-poducts',
                    component: AddImportProductPage,
                    name: 'admin addImportProduct'
                },
                {
                    path: "suppliers",
                    component: ManageSuppliersPage,
                    meta: {
                        requiresRole: ['staff', 'admin']
                    }
                }

            ]
        },

        {
            path: '/not-permission',
            component: NotPermission,
            meta: {
                requiresRole: null
            }
        },

        {
            path: '*',
            component: ErrorPage,
            meta: {
                requiresRole: null
            }
        }

    ],


});



router.beforeEach((to, from, next) => {
    const requiresRole = to.meta.requiresRole;
    // nếu ko yêu cầu quyền (requiresRole = null) thì next()
    if (!requiresRole) {
        next();
    } else {
        const user = JSON.parse(localStorage.getItem('user'));
        // nếu user = null thì quay lại trang home
        if (!user) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else if (user.groups.length && user.groups.some(e => requiresRole.includes(e.name))) {
            next();
        } else {
            next({
                path: '/not-permission'
            });
        }
    }
})


export default router;