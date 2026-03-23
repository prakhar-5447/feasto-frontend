import { Injectable } from '@angular/core';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    restaurantId: string;
    restaurantName: string;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart: CartItem[] = [];
    restaurantId: string | null = null;

    constructor() {
        this.loadCart();
    }

    // ✅ Add item
    addToCart(item: Omit<CartItem, 'quantity'>): boolean {
        // Restrict multiple restaurants
        if (this.restaurantId && this.restaurantId !== item.restaurantId) {
            return false;
        }

        this.restaurantId = item.restaurantId;

        const existingItem = this.cart.find((i) => i.id === item.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }

        this.saveCart();
        return true;
    }

    // ✅ Update quantity
    updateQuantity(itemId: string, quantity: number) {
        const item = this.cart.find((i) => i.id === itemId);

        if (!item) return;

        if (quantity <= 0) {
            this.removeFromCart(itemId);
        } else {
            item.quantity = quantity;
        }

        this.saveCart();
    }

    // ✅ Remove item
    removeFromCart(itemId: string) {
        this.cart = this.cart.filter((i) => i.id !== itemId);

        // Reset restaurant if cart empty
        if (this.cart.length === 0) {
            this.restaurantId = null;
        }

        this.saveCart();
    }

    // ✅ Clear cart
    clearCart() {
        this.cart = [];
        this.restaurantId = null;
        this.saveCart();
    }

    // ✅ Get total price
    getTotal(): number {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // ✅ Get total items count
    getItemCount(): number {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // ✅ Persist to localStorage
    private saveCart() {
        // localStorage.setItem('cart', JSON.stringify(this.cart));
        // localStorage.setItem('restaurantId', this.restaurantId || '');
    }

    // ✅ Load from localStorage
    private loadCart() {
        // const cartData = localStorage.getItem('cart');
        // const restaurantId = localStorage.getItem('restaurantId');

        // if (cartData) {
        //     this.cart = JSON.parse(cartData);
        // }

        // if (restaurantId) {
        //     this.restaurantId = restaurantId;
        // }
    }
}