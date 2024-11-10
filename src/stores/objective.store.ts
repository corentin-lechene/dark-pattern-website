import {defineStore} from "pinia";
import {useUserStore} from "@/stores/user.store";

export enum ObjectiveType {
    REGISTERED = 'REGISTERED',
    LOGGED = 'LOGGED',
    SUBSCRIBED_PLUS = 'SUBSCRIBED_PLUS',
    SUBSCRIBED_PREMIUM = 'SUBSCRIBED_PREMIUM',
    ADDED_ARTICLE = 'ADDED_ARTICLE',
    REMOVED_INSURANCE = 'REMOVED_INSURANCE',
    UPDATED_PREFERENCES = 'UPDATED_PREFERENCES',
    PAID_CART = 'PAID_CART',
    UNSUBSCRIBED = 'UNSUBSCRIBED'
}

interface Objective {
    [key: string]: ObjectiveType[]
}

export const useObjectiveStore = defineStore('objective', {
    state() {
        return {
            objectives: {
                'corentin.lechene@orange.fr': []
            } as Objective
        }
    },
    getters: {},
    persist: true,
    actions: {
        init(email: string) {
            this.objectives[email] = [];
        },
        getEmail() {
            const userStore = useUserStore();
            return userStore.currentUser?.email || '';
        },

        registered() {
            this.objectives[this.getEmail()].push(ObjectiveType.REGISTERED);
        },
        logged() {
            console.log(this.getEmail())
            console.log(this.objectives)
            if (!this.objectives[this.getEmail()]) {
                this.objectives[this.getEmail()].push(ObjectiveType.LOGGED);
            }
        },
        subscribed(subscription: 'plus' | 'premium') {
            if (subscription === 'plus') {
                this.objectives[this.getEmail()].push(ObjectiveType.SUBSCRIBED_PLUS);
            } else {
                this.objectives[this.getEmail()].push(ObjectiveType.SUBSCRIBED_PREMIUM);
            }
        },
        addedArticle() {
            this.objectives[this.getEmail()].push(ObjectiveType.ADDED_ARTICLE);
        },
        removedInsurance() {
            this.objectives[this.getEmail()].push(ObjectiveType.REMOVED_INSURANCE);
        },
        updatedPreferences() {
            this.objectives[this.getEmail()].push(ObjectiveType.UPDATED_PREFERENCES);
        },
        paidCart() {
            this.objectives[this.getEmail()].push(ObjectiveType.PAID_CART);
        },
        unsubscribed() {
            this.objectives[this.getEmail()].push(ObjectiveType.UNSUBSCRIBED);
        },

        clear() {
            this.objectives[this.getEmail()] = [];
        }
    }
});
