/*------------------------------Data---------------------------------*/

export let tracked_product = JSON.parse(localStorage.getItem('track')) || [];















/*-----------------------------Functions------------------------------*/
export function add_tracking_product(orderPlaced, productId, productQuantity) {
    tracked_product = [orderPlaced, productId, productQuantity];
    localStorage.setItem('track', JSON.stringify(tracked_product))
}