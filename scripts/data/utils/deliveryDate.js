import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {format_currency } from './money.js';















/*--------------------------Data--------------------------*/

export const deliveryDays = [7, 3, 1];
export const deliveryOptions = [
    {id: 1, date: get_date(deliveryDays[0]), cost : 0},
    {id: 2, date: get_date(deliveryDays[1]), cost : 499},
    {id: 3, date: get_date(deliveryDays[2]), cost : 999}
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





export function get_date(daysAfter, format=true, TodaysDate=false) {
    if (!TodaysDate) {
        TodaysDate = dayjs()
    } else {
        TodaysDate = dayjs(TodaysDate)
    }
    daysAfter = skipWeekend(TodaysDate, daysAfter)
    let desiredDate = TodaysDate.add(daysAfter, 'day');
    if (format) {
        return desiredDate.format('dddd, MMMM D')
    } else {
        return dayjs(desiredDate)
    }
}





export function isDatePassed(deliveryOption, orderPlaced) {
    return ! get_date(deliveryDays[deliveryOption-1], false, orderPlaced).isBefore(get_date(0, false), "day");
}





export function format_cost(priceCents) {
    if (priceCents === 0) {
        return "FREE";
    } else {
        return `$${format_currency(priceCents)}`;
    }
}