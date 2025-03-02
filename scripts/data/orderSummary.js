import {cart} from './checkoutSummary.js'
import {isDatePassed} from './utils/deliveryDate.js'
import {updated_payment_details} from './paymentSummary.js'
import {get_date} from './utils/deliveryDate.js';















/*------------------------------Data----------------------------*/

export let orders = JSON.parse(localStorage.getItem('order')) || [];















/*------------------------------Functions----------------------------*/

export function clear_passed_orders() {
    orders.forEach((order)=>{
        let orderPlaced = order.orderPlaced;
        order.cart = order.cart.filter(product => {
            return isDatePassed(product.deliveryOption ,orderPlaced)
        })
    });

    orders = orders.filter(order => {
        return order.cart.length != 0;
    })
}





export function update_order() {
    clear_passed_orders()
    
    if (cart.cartItems.length != 0) {
        orders.unshift({orderPlaced: get_date(0, false), 
            total : updated_payment_details().totalWithTax, 
            cart: cart.cartItems})
        save_orders();
    }

    cart.get_clear_cart();
}





function save_orders() {
    localStorage.setItem('order', JSON.stringify(orders))
}