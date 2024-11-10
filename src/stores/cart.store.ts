import {defineStore} from "pinia";
import {Product} from "@/models/product.model";

export const useCartStore = defineStore('cart', {
    state() {
        return {
            currentProduct: {} as Product,
            cart: [] as Product[]
        }
    },
    getters: {
        productTotal({cart}) {
            return cart.reduce((acc: number, product: Product) => {
                return acc + (product.price * parseFloat('1.' + product.size))
            }, 0).toFixed(2);
        },
        insuranceSize({cart}) {
            return cart.filter(product => product.insurance).length;
        },
        insuranceTotal({cart}) {
            return cart.reduce((acc: number, product: Product) => {
                return acc + (product.insurance ? 8.7 : 0)
            }, 0).toFixed(2);
        },
        total({cart}) {
            return cart.reduce((acc: number, product: Product) => {
                return acc + (product.price * parseFloat('1.' + product.size)) + (product.insurance ? 8.7 : 0)
            }, 0).toFixed(2);
        }
    },
    persist: true,
    actions: {
        addProduct(insurance: boolean) {
            this.cart.push({
                ...this.currentProduct,
                insurance
            })
        },

        add(product: Product) {
            this.cart.push(product);
        },
        remove(productId: string) {
            const index = this.cart.findIndex(product => product.id === productId);
            this.cart.splice(index, 1);
        },

        addInsurance(productId: string) {
            const index = this.cart.findIndex(product => product.id === productId);
            if (index === -1) return;
            this.cart[index].insurance = true;
        },
        removeInsurance(productId: string) {
            const index = this.cart.findIndex(product => product.id === productId);
            if (index === -1) return;
            this.cart[index].insurance = false;
        },

        clear() {
            this.cart = [];
        }
    }
});
