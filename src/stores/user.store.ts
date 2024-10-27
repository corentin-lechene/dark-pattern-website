import {defineStore} from "pinia";
import {User} from "@/models/user.model";


export const useUserStore = defineStore('user', {
    state() {
        return {
            currentUser: null as User | null,
            loading: false,
            error: null as string | null,
            isAuthenticated: false,
        }
    },
    getters: {},
    persist: true,
    actions: {}
});