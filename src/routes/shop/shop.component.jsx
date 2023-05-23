import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Categoriespreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component.tsx";

// // This is our Normal ACTION creator
// import { setCategories } from "../../store/categories/categories.action";

// for thunk
import { fetchCategoriesStart } from "../../store/categories/categories.action";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<Categoriespreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
