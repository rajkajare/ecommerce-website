/*------------------------------Data----------------------------*/

export const orders = JSON.parse(localStorage.getItem('order')) || [];















/*------------------------------Functions----------------------------*/

export function addOrder(order) {
    orders.unshift(order);
    save_orders();
}





function save_orders() {
    localStorage.setItem('order', JSON.stringify(orders))
}
