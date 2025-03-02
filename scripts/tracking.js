import {get_product, load_products_fetch} from './data/products.js'
import {tracked_product} from './data/trackingSummary.js'
import {cart} from './data/checkoutSummary.js';















/*---------------------------------View----------------------------------*/
load_products_fetch().then(()=>{
    render_tracking_page();
})


function render_tracking_page() {
    const product = get_product(tracked_product[1]);
    let trackingSummaryHtml = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${tracked_product[0]}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${tracked_product[2]}
        </div>

        <img class="product-image" src=${"../" + product.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;
    
    document.querySelector('.cart-quantity').innerHTML = `${cart.get_cart_quantity()}`;
    document.querySelector('.order-tracking').innerHTML = trackingSummaryHtml;
}