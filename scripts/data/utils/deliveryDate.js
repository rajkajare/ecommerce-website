import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {format_currency } from './money.js';















/*--------------------------Data--------------------------*/

export const deliveryOptions = [
    {id: 1, date: get_date(7), cost : 0},
    {id: 2, date: get_date(3), cost : 499},
    {id: 3, date: get_date(1), cost : 999}
];















/*-----------------------Functions------------------------*/

function skipWeekend(TodaysDate, daysAfter) {
    let i = 1;
    while (i <= daysAfter) {
        let day = TodaysDate.add(i, 'day').format('dddd');
        if (day === 'Saturday') {
            daysAfter += 2;
            i++;
        } else if (day === 'Sunday') {
            daysAfter += 1;
        } 
        i++;
    }
    return daysAfter
}





function get_date(daysAfter) {
    let TodaysDate = dayjs();
    daysAfter = skipWeekend(TodaysDate, daysAfter)
    let desiredDate = TodaysDate.add(daysAfter, 'day');
    return desiredDate.format('dddd, MMMM D')
}





export function format_cost(priceCents) {
    if (priceCents === 0) {
        return "FREE";
    } else {
        return `$${format_currency(priceCents)}`;
    }
}