import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";

import Authentication from "./routes/authentication/authentication.components";

import Navigation from "./routes/navigation/navigation-component";

import Shop from "./routes/shop/shop.component";

import Checkout from "./routes/checkout/checkout.component";

// This is our ACTION creator
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  // This effect only runs on initialization, the dispatch doesn't change
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
