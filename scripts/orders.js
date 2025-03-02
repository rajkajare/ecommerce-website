import {get_product, load_products_fetch} from './data/products.js'
import {orders, clear_passed_orders} from './data/orderSummary.js'
import {format_currency} from './data/utils/money.js';
import {get_date, deliveryDays} from './data/utils/deliveryDate.js';
import {cart} from './data/checkoutSummary.js'
import {add_tracking_product} from './data/trackingSummary.js'















/*-----------------------------View----------------------------*/

load_products_fetch().then(()=>{
    clear_passed_orders();
    render_order_page();
})





function get_orderDetailsHtml(orderCart, orderPlaced) {
    let orderDetailsGridHtml = ``;
    orderCart.forEach((cartProduct)=>{
        const product = get_product(cartProduct.id);
        orderDetailsGridHtml += `
            <div class="product-image-container">
                <img src=${"../" + product.image}>
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${get_date(deliveryDays[cartProduct.deliveryOption-1], true, orderPlaced)}
                </div>
                <div class="product-quantity">
                    Quantity: ${cartProduct.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${cartProduct.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                    <button class="track-package-button button-secondary js-track-package-button" 
                        data-order-placed="${get_date(deliveryDays[cartProduct.deliveryOption-1], true, orderPlaced)}"
                        data-tracking-product-id=${cartProduct.id}
                        data-tracking-product-quantity=${cartProduct.quantity}>
                    Track package
                    </button>
                </div>
        `
    })
    return orderDetailsGridHtml;
}





function render_order_page() {
    let orderSummaryHtml = ``;
    orders.forEach((order)=>{
        orderSummaryHtml += `
            <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${get_date(0, true, order.orderPlaced)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${format_currency(order.total)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${get_orderDetailsHtml(order.cart, order.orderPlaced)}
                </div>
        </div>
        `;
    })
    
    document.querySelector('.cart-quantity').innerHTML = `${cart.get_cart_quantity()}`;
    document.querySelector('.orders-grid').innerHTML = orderSummaryHtml;















    /*----------------------------Controller---------------------------------*/

    document.querySelectorAll('.js-buy-again-button')
        .forEach((buyAgainLink) => {
            let {productId} = buyAgainLink.dataset;
            buyAgainLink.addEventListener('click', () => {
                cart.update_cart(productId, 1);
                render_order_page();
        })
    })





    document.querySelectorAll('.js-track-package-button')
        .forEach((trackButtonLink) => {
            let {orderPlaced} = trackButtonLink.dataset;
            let {trackingProductId} = trackButtonLink.dataset;
            let {trackingProductQuantity} = trackButtonLink.dataset;
            trackButtonLink.addEventListener('click', () => {
                add_tracking_product(orderPlaced, trackingProductId, trackingProductQuantity);
                window.location.href='tracking.html';
        })
})

}