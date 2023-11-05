import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/dashboard/Pagenotfound";
import About from "./pages/About";
import Register from "./pages/auth/Register";
import Login1 from "./pages/auth/Login1";

import PrivateRoute from "./components/Routes/Private";
import Forgetpassword from "./pages/auth/Forgetpassword";
import CreateSale from "./pages/dashboard/CreateSale";
import Auctionweb from "./pages/Auctionweb";
import Orders from "./pages/dashboard/Orders";
import Auctions from "./pages/dashboard/Auctions";
import Productssale from "./pages/dashboard/Productssale";
import Getauctions from "./pages/dashboard/Getauctions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Productssale />} />
        <Route path="createsale" element={<CreateSale />} />
        <Route path="orders" element={<Orders />} />
        <Route path="createauctions" element={<Auctions />} />
        <Route path="auctions" element={<Getauctions/>} />
      </Route>
      <Route path="/login" element={<Login1 />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/auctionweb" element={<Auctionweb />} />
    </Routes>
  );
}

export default App;
