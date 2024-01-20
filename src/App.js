import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import NotFound from "./pages/NotFoundPage/NotFound";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import BooksList from "./pages/BooksListPage/BooksList";
import BookDetail from "./pages/BooksDetailPage/BookDetail";
import Cart from "./pages/CartPage/Cart";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collections" element={<BooksList />} />
        <Route path="/collections/:id" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
