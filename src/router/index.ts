import {createRouter, createWebHistory, NavigationGuard} from "vue-router";
import routes from "./routes";
import {useUserStore} from "@/stores/user.store";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({top: 0}),
    routes
});

export const onBeforeEach: NavigationGuard = async (to, _, next) => {
    const userStore = useUserStore();
    const user = userStore.currentUser;

    console.group('Navigation Guard');
    console.log('to:', to);
    console.log('user:', user);

    if (userStore.users.length === 0) {
        userStore.init();
    }

    if (!user) {
        if (['Login', 'Register'].includes(to.name as string)) {
            console.log('User is not logged in and is trying to access a public route');
            console.groupEnd();
            next();
        } else {
            console.log('User is not logged in and is trying to access a private route');
            console.groupEnd();
            next({name: 'Login'});
        }
        return;
    } else if (['Login', 'Register'].includes(to.name as string)) {
        return next({name: 'Home'});
    }

    console.groupEnd();
    next();
}
router.beforeEach(onBeforeEach);


export default router