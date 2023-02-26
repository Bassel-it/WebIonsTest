export function addToCart(p) {
    return {
       type: 'addToCart',
       product:p
    }
 }
 export function removeFromCart(i) {
    return {
       type: 'removeFromCart',
       id:i
    }
 }
 export function reset() {
    return { type: 'RESET' }
 }