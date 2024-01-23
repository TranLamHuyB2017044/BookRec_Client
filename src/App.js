import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, Outlet,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import NotFound from "./pages/NotFoundPage/NotFound";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import BooksList from "./pages/BooksListPage/BooksList";
import BookDetail from "./pages/BooksDetailPage/BookDetail";
import Cart from "./pages/CartPage/Cart";
import Checkout from "./pages/CheckoutPage/Checkout";
import Account from "./pages/ManagerAccountPage/Account";
import YourOrder from "./pages/ManagerAccountPage/YourOrder";
import ChangePassword from "./pages/ManagerAccountPage/ChangePassword";

function App() {
  // const user = true
  // const ProtectedRoute = () => {
  //   if (user) {
  //     return <Navigate to='/' replace />;
  //   }

  //   return <Outlet />;
  // };
  // const ProtectUser = () => {
  //   if(!user){
  //     return <Navigate to='/login' replace />;
  //   }
  //   return <Outlet />;
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route element={<ProtectedRoute/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<ProtectUser/>}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/yourOrders" element={<YourOrder />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/yourOrders" element={<YourOrder />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/collections" element={<BooksList />} />
        <Route path="/collections/:id" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
