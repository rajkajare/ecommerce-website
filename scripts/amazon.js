import {products, load_products_fetch} from './data/products.js'
import {cart} from './data/checkoutSummary.js'















/*------------------------View-------------------------*/
load_products_fetch().then(()=>{
    render_home_page();
})





function show_added_image(productId, intervalId) {
    if (intervalId) {
        clearTimeout(intervalId);
    }
    const addedImg = document.querySelector(`.js-added-to-cart-${productId}`)
    addedImg.classList.add('added-to-cart-show');
    intervalId = setTimeout(() => {
                    addedImg.classList.remove('added-to-cart-show');
                    }, 2000);
    return intervalId;
}





function render_home_page() {
    document.querySelector('.js-cart-quantity').innerHTML = cart.get_cart_quantity();

    let productsGridHtml = '';
    products.forEach((product) => {
        productsGridHtml += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                        src= ${product.image}>
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                        src=${product.get_rating()}>
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.get_price()}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfo()}

                <div class="product-spacer"></div>

                <div class="js-added-to-cart-${product.id} added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="js-addToCart add-to-cart-button button-primary" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    });

    document.querySelector('.products-grid').innerHTML = productsGridHtml;
















    /*--------------------Controllers-------------------------*/
    document.querySelectorAll('.js-addToCart')
        .forEach((cartButton) => {
            let intervalId;
            cartButton.addEventListener('click', ()=>{
                const {productId} = cartButton.dataset;
                const increment = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
                cart.update_cart(productId, increment);
                render_home_page();
                intervalId = show_added_image(productId, intervalId);
        });
    });

}