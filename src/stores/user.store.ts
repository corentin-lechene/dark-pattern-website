import {defineStore} from "pinia";
import {User} from "@/models/user.model";
import {useCartStore} from "@/stores/cart.store";


export const useUserStore = defineStore('user', {
    state() {
        return {
            currentUser: null as User | null,
            isAuthenticated: false,

            users: [{
                userId: '0',
                email: 'x',
                password: 'xxxxxxxxx',
                newsletter: true,
                shareData: true,
                autoInsurance: true,
                subscriptionRenew: true,
                createdAt: new Date(),
                hasSubscription: false,
            }] as User[]
        }
    },
    getters: {
        hasSubscription(): boolean {
            return this.currentUser?.hasSubscription || false;
        }
    },
    persist: true,
    actions: {
        login(email: string, password: string) {
            const user = this.users.find(user => user.email === email && user.password === password);

            if (user) {
                this.currentUser = user;
                this.isAuthenticated = true;
            } else {
                throw new Error('Utilisateur non trouvé');
            }
        },

        register(email: string, password: string, newsletter: boolean, shareData: boolean) {
            const user: User = {
                userId: this.users.length.toString(),
                email,
                password,
                hasSubscription: false,
                shareData,
                newsletter,
                subscriptionRenew: true,
                autoInsurance: true,
                createdAt: new Date()
            }
            this.users.push(user);
            this.currentUser = user;
            this.isAuthenticated = true;
        },

        logout() {
            this.currentUser = null;
            this.isAuthenticated = false;
        },

        resetApp() {
            this.currentUser = null;
            this.isAuthenticated = false;
            this.users = [];

            const cart = useCartStore();
            cart.clear();
        }
    }
});