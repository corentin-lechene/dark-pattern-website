import {defineStore} from "pinia";
import {Product} from "@/models/product.model";

export const useCartStore = defineStore('cart', {
    state() {
        return {
            cart: [] as Product[]
        }
    },
    getters: {
        total({cart}) {
            return cart.reduce((acc: number, product: Product) => acc + product.price, 0);
        }
    },
    persist: true,
    actions: {
        add(product: Product) {
            this.cart.push(product);
        },
        remove(productId: string) {
            const index = this.cart.findIndex(product => product.id === productId);
            this.cart.splice(index, 1);
        },

        removeInsurance(productId: string) {
            const index = this.cart.findIndex(product => product.id === productId);
            if (index === -1) return;
            this.cart[index].insurance = false;
        }
    }
});
