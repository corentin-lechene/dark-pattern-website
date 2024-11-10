import {defineStore} from "pinia";
import {User} from "@/models/user.model";
import {useCartStore} from "@/stores/cart.store";
import {useObjectiveStore} from "@/stores/objective.store";


export const useUserStore = defineStore('user', {
    state() {
        return {
            currentUser: null as User | null,
            isAuthenticated: false,
            isFirstTime: true,

            step: 0,
            users: [] as User[]
        }
    },
    getters: {
        hasSubscription(): boolean {
            return this.currentUser?.hasSubscription || false;
        }
    },
    persist: true,
    actions: {
        init() {
            this.isFirstTime = true;
            this.step = 0;
            this.users = [
                {
                    userId: '0',
                    email: 'corentin.lechene@orange.fr',
                    password: 'azertyuiop',
                    newsletter: true,
                    shareData: true,
                    autoInsurance: true,
                    subscriptionRenew: true,
                    createdAt: new Date(),
                    hasSubscription: false,
                    subscription: 'free'
                }
            ];
        },

        login(email: string, password: string) {
            const user = this.users.find(user => user.email === email && user.password === password);

            if (user) {
                this.currentUser = user;
                this.isAuthenticated = true;
                this.step = 0;
            } else {
                throw new Error('Utilisateur non trouvé');
            }
        },

        register(email: string, password: string, newsletter: boolean, shareData: boolean) {
            const objectiveStore = useObjectiveStore();
            if (this.users.find(user => user.email === email)) {
                throw new Error('Email déjà utilisé');
            }

            const user: User = {
                userId: this.users.length.toString(),
                email: email.toLowerCase().trim(),
                password,
                hasSubscription: false,
                subscription: 'free',
                shareData,
                newsletter,
                subscriptionRenew: true,
                autoInsurance: true,
                createdAt: new Date()
            }
            this.users.push(user);
            this.currentUser = user;
            this.isAuthenticated = true;
            this.step = 0;

            objectiveStore.init(user.email);
        },

        logout() {
            this.currentUser = null;
            this.isAuthenticated = false;
            this.step = 0;
        },

        unsubscribe() {
            if (this.currentUser) {
                this.currentUser.hasSubscription = false;
                this.currentUser.subscription = 'free';
                this.step = 0;
            }
        },

        resetApp() {
            this.logout();

            this.currentUser = null;
            this.isAuthenticated = false;
            this.isFirstTime = true;
            this.users = [];

            const cart = useCartStore();
            cart.clear();

            const objectiveStore = useObjectiveStore();
            objectiveStore.clear();

            this.init();
        }
    }
});