import { Routes, Route } from "react-router-dom";

import Counter from "./components/Counter";
import OutlineTypesExample from "./components/button";
import MyNavbar from "./components/navbars/Navbar";
import MyFooter from "./components/footers/Myfooter";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/bodys/Home";
import Signup from "./components/bodys/Signup";
import Login from "./components/bodys/Login";
import Tagselect_style from "./components/bodys/Tagselect_style";
import Mypage from "./components/bodys/Mypage";
import MyPhotos from "./components/bodys/Myphotos";

function App() {
  return (
    <div className="Ap bg-gray-lv1">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tagselect-style" element={<Tagselect_style />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myphotos" element={<MyPhotos />} />
      </Routes>
      <MyFooter />
    </div>
  );
}

export default App;
