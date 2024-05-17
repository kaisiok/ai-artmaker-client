import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import Counter from "./components/Counter";
import OutlineTypesExample from "./components/button";
import MyNavbar from "./components/navbars/Navbar";
import MyFooter from "./components/footers/Myfooter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animations.css";

import Home from "./components/bodys/Home";
import Signup from "./components/bodys/Signup";
import Login from "./components/bodys/Login";
import Tagselect_style from "./components/bodys/Tagselect_style";
import Mypage from "./components/bodys/Mypage";
import MyPhotos from "./components/bodys/Myphotos";

function App() {
  const location = useLocation();

  return (
    <div className="Ap bg-gray-lv1">
      <MyNavbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myphotos" element={<MyPhotos />} />
      </Routes>
      <SwitchTransition>
        <CSSTransition key={location.pathname} classNames="slide" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/tagselect-style" element={<Tagselect_style />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
      <MyFooter />
    </div>
  );
}

export default App;
