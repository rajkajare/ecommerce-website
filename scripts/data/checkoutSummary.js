/*-----------------------------------Data----------------------------------------*/

class Cart  {
    /*----------Properties----------*/
    cartItems;
    #localStorageKey;


    /*----------Constructor----------*/
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#load_cart();
    }


    /*----------Methods----------*/
    #load_cart() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    get_clear_cart() {
        localStorage.removeItem(this.#localStorageKey);
    }

    #save_cart() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }

    get_cart_quantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartProduct) => {
            cartQuantity += cartProduct.quantity;
        })
        return cartQuantity
    }

    get_cart_product(productId) {
        for (let i=0; i<this.cartItems.length; i++) {
            if (this.cartItems[i].id === productId) {
                return this.cartItems[i]
            }
        }
        return false
    }

    remove_from_cart(productId) {
        for (let i=0; i<this.cartItems.length; i++) {
            if (this.cartItems[i].id === productId) {
                this.cartItems.splice(i, 1);
                break
            }
        }
        this.#save_cart();
    }

    update_cart(productId, quantity, replace=false, deliveryOption=1) {
        if (quantity < 0) {
            this.remove_from_cart(productId);
            return;
        }
        
        let cartProduct = this.get_cart_product(productId);
        if (cartProduct) {
            if (replace) {
                cartProduct.quantity = quantity;
            } else {
                cartProduct.quantity += quantity;
                cartProduct.deliveryOption = deliveryOption;
            }
        } else {
            this.cartItems.push({id: productId, quantity: quantity, deliveryOption: deliveryOption});
        } 
    
        this.#save_cart();
    }
};

export const cart = new Cart('cart1');