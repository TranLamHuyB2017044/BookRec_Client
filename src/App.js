import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, Outlet
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
import { useDispatch, useSelector } from "react-redux";
import { PublicRequest } from './service/Request';
import { useEffect } from 'react';
import { addBook } from "./store/cartReducer";
function App() {
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.books)
  const user_id = user?.user_id
  console.log(cartItems, user_id)

  useEffect(() => {
    const cartApi = async () => {
      try {
        if (cartItems != null) {
          const response = await PublicRequest.get(`/cart/${user_id}`);
          dispatch(addBook(response.data));
        } else if(user_id !== undefined && cartItems == null) {
          const response = await PublicRequest.post('/cart', { user_id: user_id })
          console.log(response.data)
        }else return
      } catch (error) {
        console.log(error)
      }
    };
    cartApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id, dispatch]);

  const ProtectedRoute = () => {
    if (user) {
      return <Navigate to='/' replace />;
    }
    return <Outlet />;
  };
  const ProtectUser = () => {
    if (user == null) {
      return <Navigate to='/login' replace />;
    }
    return <Outlet />;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectUser />}>
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/yourOrders" element={<YourOrder />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
        <Route path="/collections/:page=?" element={<BooksList />} />
        <Route path="/collections/:slug" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
