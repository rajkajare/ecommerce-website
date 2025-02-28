/*-----------------------Functions----------------------------*/

export function format_currency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}