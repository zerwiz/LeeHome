// Cart Management using localStorage
const Cart = {
    // Get cart from localStorage
    getCart() {
        const cart = localStorage.getItem('nexusCart');
        return cart ? JSON.parse(cart) : [];
    },

    // Save cart to localStorage
    saveCart(cart) {
        localStorage.setItem('nexusCart', JSON.stringify(cart));
        this.updateCartCount();
    },

    // Add item to cart
    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: 1
            });
        }

        this.saveCart(cart);
        return cart;
    },

    // Remove item from cart
    removeItem(productId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.id !== productId);
        this.saveCart(filteredCart);
        return filteredCart;
    },

    // Update item quantity
    updateQuantity(productId, change) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                return this.removeItem(productId);
            }
        }

        this.saveCart(cart);
        return cart;
    },

    // Clear cart
    clearCart() {
        localStorage.removeItem('nexusCart');
        this.updateCartCount();
    },

    // Get cart count
    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    // Get cart total
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Update cart count in UI
    updateCartCount() {
        const count = this.getCartCount();
        const cartCountElements = document.querySelectorAll('#cartCount, #mobileCartCount');
        
        cartCountElements.forEach(element => {
            if (element) {
                if (count > 0) {
                    element.textContent = count;
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            }
        });
    }
};

// Update cart count on page load (only if DOM is ready)
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Cart.updateCartCount();
        });
    } else {
        // DOM is already ready
        Cart.updateCartCount();
    }
}
