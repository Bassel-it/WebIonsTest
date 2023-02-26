const reducer = (cart = [], action) => {
    switch (action.type) {
       case 'addToCart':return [...cart, action.product];
       case 'removeFromCart': return cart.filter(x=>x.productId!==action.id);
       case 'RESET' : return 0;
        default: return cart
    }
 }
 export default reducer;