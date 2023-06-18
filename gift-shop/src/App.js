import "./css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Navbar from "./js/components/layouts/navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import BottomNavbar from "./js/components/layouts/bottomnav";
import FooterSection from "./js/components/layouts/FooterSection";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomeSection from "./js/components/Pages/HomeSection";
import ProductsSection from "./js/components/Pages/Product/ProductsSection";
import SingleProductSection from "./js/components/Pages/Product/SingleProductSection";
import PageNotFoundSection from "./js/components/Pages/404PageNotFoundSection";
import SearchProductSection from "./js/components/Pages/Product/SearchProductSection";
import FilterProductSection from "./js/components/Pages/Product/FilterProductSection";
import FilterByCategory from "./js/components/Pages/Product/FilterbyCategory";
import CartPageSection from "./js/components/Pages/cart/CartPageSection";
import LoginSection from "./js/components/Pages/User/LoginSection";
import RegisterSection from "./js/components/Pages/User/RegisterSection";
import { Fragment, useEffect} from "react";
import store from "./Reduxstore";
import { GetUserProfileAction } from "./js/actions/AuthenticationAction";
import UserProfileSection from "./js/components/Pages/User/UserProfileSecion";
import ProtectedRoute from "./js/components/Utils/ProtectedRoute";
import ChangePasswordSection from "./js/components/Pages/User/ChangePasswordSection";
import ForgotPasswordSection from "./js/components/Pages/User/ForgotPasswordSection";
import ResetPasswordSection from "./js/components/Pages/User/ResetPasswordSection";
import Toaster from "./js/components/layouts/Toaser";
import ShippingSection from "./js/components/Pages/Orders/ShippingSection";
import ConfirmOrderSection from "./js/components/Pages/Orders/ConfirmOrderSection";
import PaymentSection from "./js/components/Pages/Orders/PaymentSection";
import OrderSuccessSection from "./js/components/Pages/Orders/OrderSuccessSection";
import ListofOrdersSection from "./js/components/Pages/Orders/ListOfOrderSection";
import SingleOrderSection from "./js/components/Pages/Orders/SingleOrderSection";
import InternalServerError from "./js/components/Pages/500InternalServerError";
import ScrollToTop from "./js/components/layouts/ScrollUplayot";

function App() {

  useEffect(() => {
    store.dispatch(GetUserProfileAction);

  });

  return (
    <Fragment>
      <Router>
        <div className="App" id="scroll">
          <HelmetProvider>
            <Navbar />
            <ScrollToTop/>
            <Routes>
              <Route path="/" element={<HomeSection />} />
              <Route path="/products" element={<ProductsSection />} />
              <Route
                path="/single/product/:id"
                element={<SingleProductSection />}
              />
              <Route
                path="/product/search/:keyword"
                element={<SearchProductSection />}
              />
              <Route
                path="/product/filter/:price"
                element={<FilterProductSection />}
              />
              <Route
                path="/product/filter/category/:category"
                element={<FilterByCategory />}
              />
              <Route path="/product/cart" element={<CartPageSection />} />
              <Route path="/user/register" element={<RegisterSection />} />
              <Route path="/user/login" element={<LoginSection />} />
              <Route
                path="/forgot/password"
                element={<ForgotPasswordSection />}
              />
              <Route
                path="/reset/password/:token"
                element={<ResetPasswordSection />}
              />
              <Route path="/server/error" element={<InternalServerError />} />

              {/* Protected Routes */}
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute>
                    <UserProfileSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/change/password"
                element={
                  <ProtectedRoute>
                    <ChangePasswordSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/shipping"
                element={
                  <ProtectedRoute>
                    <ShippingSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrderSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/payment"
                element={
                  <ProtectedRoute>
                    <PaymentSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/payment/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccessSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/orders"
                element={
                  <ProtectedRoute>
                    <ListofOrdersSection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/single/order/:id"
                element={
                  <ProtectedRoute>
                    <SingleOrderSection />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<PageNotFoundSection />} />
            </Routes>
            <FooterSection />
            <BottomNavbar />
            <Toaster />
          </HelmetProvider>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
