import {RouteRecordRaw} from "vue-router";
import HomePage from "@/views/HomePage.vue";
import MainLayout from "@/layouts/MainLayout.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginPage.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/RegisterPage.vue"),
    },
    {
        path: "/",
        redirect: "/login"
    },

    {
        path: "/app",
        redirect: "/app/home",
        component: MainLayout,
        children: [
            {
                path: "home",
                name: "Home",
                component: HomePage
            },
            {
                path: "subscription",
                name: "Subscription",
                component: () => import("@/views/SubscriptionPage.vue")
            },
            {
                path: "subscription/unsubscribe",
                name: "UnSubscribe",
                component: () => import("@/views/UnSubscribePage.vue")
            },
            {
                path: "subscription/unsubscribe/success",
                name: "UnsubscribeSuccess",
                component: () => import("@/views/UnsubscribeSuccessPage.vue")
            },
            {
                path: "cart",
                name: "Cart",
                component: () => import("@/views/CartPage.vue")
            },
            {
                path: "cart/payment",
                name: "Payment",
                component: () => import("@/views/Payment.vue")
            },
            {
                path: "cart/payment/success",
                name: "PaymentSuccess",
                component: () => import("@/views/PaymentSuccessPage.vue")
            },
            {
                path: "account",
                name: "Account",
                component: () => import("@/views/AccountPage.vue")
            },
            {
                path: "notifications",
                name: "Notifications",
                component: () => import("@/views/NotificationsPage.vue")
            },
            {
                path: "account/my",
                name: "MyAccount",
                component: () => import("@/views/MyAccount.vue")
            },
            {
                path: "about",
                name: "About",
                component: () => import("@/views/AboutPage.vue")
            },
            {
                path: "policy",
                name: "Policy",
                component: () => import("@/views/PolicyPage.vue")
            },
            {
                path: 'products',
                name: 'Products',
                component: () => import("@/views/ProductsPage.vue"),
            },
            {
                path: 'products/:product_id',
                name: 'Product',
                component: () => import("@/views/ProductPage.vue"),
            },
            {
                path: "404",
                name: "404",
                component: () => import("@/views/NotFoundPage.vue")
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/app/404",
        meta: {
            public: true
        }
    },
];

export default routes;