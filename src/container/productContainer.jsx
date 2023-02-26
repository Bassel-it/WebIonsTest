import { connect } from 'react-redux'
import Products from '../component/Products'
import { addToCart } from '../actions';

const mapStateToProps = (state) => {
   return {
      cart: state
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      addToCart: (product) => dispatch(addToCart(product)),
      
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);