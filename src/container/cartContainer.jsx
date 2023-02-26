import { connect } from 'react-redux'
import Cart from '../component/cart'
import { removeFromCart, reset } from '../actions';

const mapStateToProps = (state) => {
   return {
      cart: state
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      removeFromCart: (id) => dispatch(removeFromCart(id)),
      reset: () => dispatch(reset())
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);