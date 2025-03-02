import {get_product, load_products_fetch} from './data/products.js'
import {cart} from './data/checkoutSummary.js';
import {format_currency} from './data/utils/money.js';
import {deliveryOptions, format_cost} from './data/utils/deliveryDate.js';
import {updated_payment_details} from './data/paymentSummary.js'
import {update_order} from './data/orderSummary.js';















/*----------------------------------View-------------------------------------*/

load_products_fetch().then(()=>{
    render_checkout_page();
})





function get_delivery_html(cartProduct) {
  let deliveryOptionHtml = ``;
  let {deliveryOption} = cartProduct;

  deliveryOptions.forEach((option) => {
    deliveryOptionHtml += `
      <div class="delivery-option">
        <input type="radio" 
          ${(option.id === deliveryOption) ? "checked" : ""}
          class="js-delivery-option-input delivery-option-input"
          name="delivery-option-${cartProduct.id}"
          data-product-id="${cartProduct.id}"
          data-option-id="${option.id}">
        <div>
          <div class="delivery-option-date">
            ${option.date}
          </div>
          <div class="delivery-option-price">
            ${format_cost(option.cost)} Shipping
          </div>
        </div>
      </div>
    `
  });
  return deliveryOptionHtml;
}





export function render_checkout_page() {
  
  let checkoutSummaryHtml = '';
  cart.cartItems.forEach((cartProduct) => {
      const product = get_product(cartProduct.id);
      checkoutSummaryHtml += `
          <div class="js-cart-item-container-${cartProduct.id} cart-item-container">
            <div class="delivery-date">
              Delivery date: ${deliveryOptions[cartProduct.deliveryOption-1].date}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src= ${product.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${format_currency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="js-quantity-label quantity-label">${cartProduct.quantity}</span>
                  </span>
                  <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${cartProduct.id}">
                    Update
                  </span>
                  <input class="js-update-quantity-input update-quantity-input" data-product-id="${cartProduct.id}">
                  <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${cartProduct.id}">
                    Save
                  </span>
                  <span class="js-delete-quantity-link delete-quantity-link link-primary" data-product-id="${cartProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${get_delivery_html(cartProduct)}
              </div>
              </div>
          </div>
      `;
  })

  let costCents = updated_payment_details();
  let paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.get_cart_quantity()}):</div>
      <div class="payment-summary-money">$${format_currency(costCents.items)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${format_currency(costCents.shipping)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${format_currency(costCents.totalWithoutTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${format_currency(costCents.tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${format_currency(costCents.totalWithTax)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-return-to-home-link').innerHTML = `${cart.get_cart_quantity()} items`;
  document.querySelector('.order-summary').innerHTML = checkoutSummaryHtml;
  document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;















  /*-----------------------------------Controller-------------------------------------*/

  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((deleteLink) => {
      let {productId} = deleteLink.dataset;
      deleteLink.addEventListener('click', () => {
        cart.update_cart(productId, -1);
        render_checkout_page();
      })
    })





  document.querySelectorAll('.js-update-quantity-link')
    .forEach((updateLink) => {
      updateLink.addEventListener('click', ()=>{
        const {productId} = updateLink.dataset;
        const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        updateLink.classList.add('hide-original-quantity');
        cartContainer.querySelector('.js-quantity-label').classList.add('hide-original-quantity');
        cartContainer.querySelector('.js-update-quantity-input').classList.add('is-editing-quantity');
        cartContainer.querySelector('.js-save-quantity-link').classList.add('is-editing-quantity');
      })
    })

  



  function save_updated_quantity(element) {
    const {productId} = element.dataset;
    const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    let updatedQuantity = Number(cartContainer.querySelector('.js-update-quantity-input').value);
    if (updatedQuantity > 0 && updatedQuantity < 1000) {
      cart.update_cart(productId ,updatedQuantity, true);
    } else {
      alert("Number must be less than 1000 and greater than 0 !");
    }
    cartContainer.querySelector('.js-update-quantity-input').classList.remove('is-editing-quantity');
    cartContainer.querySelector('.js-save-quantity-link').classList.remove('is-editing-quantity');
    cartContainer.querySelector('.js-update-quantity-link').classList.remove('hide-original-quantity');
    cartContainer.querySelector('.js-quantity-label').classList.remove('hide-original-quantity');
    render_checkout_page()
  }





  document.querySelectorAll('.js-save-quantity-link')
    .forEach((saveLink) => {
      saveLink.addEventListener('click', ()=>{
        save_updated_quantity(saveLink);
      })
    })
  




  document.querySelectorAll('.js-update-quantity-input')
    .forEach((updateQunatityInput) => {
      updateQunatityInput.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter') {
          save_updated_quantity(updateQunatityInput);
        }
      })
    })
  



  
  document.querySelectorAll('.js-delivery-option-input')
    .forEach((optionInput) => {
      const {productId} = optionInput.dataset;
      const {optionId} = optionInput.dataset;
      optionInput.addEventListener('click', () => {
        cart.update_cart(productId, 0, false, Number(optionId));
        render_checkout_page();
      })
    })

  



  document.querySelector('.js-place-order').addEventListener('click', ()=>{
    update_order()
    window.location.href='orders.html';
  })

}