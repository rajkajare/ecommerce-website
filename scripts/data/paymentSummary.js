import {cart} from './checkoutSummary.js';
import {get_product} from './products.js'
import {deliveryOptions} from './utils/deliveryDate.js';















/*-------Functions----------*/

function get_items_shipping_cost() {
    let itemsCost = 0;
    let shippingCost = 0;

    cart.cartItems.forEach((cartProduct) => {
        itemsCost += (cartProduct.quantity * get_product(cartProduct.id).priceCents);
        shippingCost += deliveryOptions[cartProduct.deliveryOption-1].cost;
    })

    return [itemsCost, shippingCost]
}





export function updated_payment_details() {
    let baseCost = get_items_shipping_cost();
    let items = baseCost[0];
    let shipping = baseCost[1];
    let totalWithoutTax = (items + shipping);
    let tax = (totalWithoutTax * 0.1);
    let totalWithTax = (totalWithoutTax + tax);

    return {items, shipping, totalWithoutTax, tax, totalWithTax}
}