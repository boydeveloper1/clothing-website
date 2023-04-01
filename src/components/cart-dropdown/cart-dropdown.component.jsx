import Button from "../button/button.component";

import { useContext } from "react";

// Allows for the use of links in buttons
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  // Calling useNavigate hook
  const navigate = useNavigate();

  // this handler is used by the dom on the checkout button to navigate to the page
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
