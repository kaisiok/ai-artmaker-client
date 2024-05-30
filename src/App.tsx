import { Routes, Route } from "react-router-dom";

import MyNavbar from "./components/navbars/Navbar";
import MyFooter from "./components/footers/Myfooter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animations.css";

import Home from "./components/bodys/Home";
import Signup from "./components/bodys/Signup";
import Login from "./components/bodys/Login";
import Mypage from "./components/bodys/Mypage";
import MyPhotos from "./components/bodys/Myphotos";
import Texttoimg from "./components/bodys/Texttoimg";
import Result from "./components/bodys/Result";
import Tagselect from "./components/bodys/Tagselect";
import Error404 from "./components/bodys/Error404";
import Error500 from "./components/bodys/Error500";

function App() {
  return (
    <div className="Ap bg-gray-lv1 font-Main">
      <MyNavbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myphotos" element={<MyPhotos />} />
        <Route path="/tagselect" element={<Tagselect />} />
        <Route path="/texttoimg" element={<Texttoimg />} />
        <Route path="/result" element={<Result />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <MyFooter />
    </div>
  );
}

export default App;
