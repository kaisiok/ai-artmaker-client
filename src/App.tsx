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
import Mypage from "./components/bodys/Mypage";
import MyPhotos from "./components/bodys/Myphotos";
import Texttoimg from "./components/bodys/Texttoimg";
import Result from "./components/bodys/Result";
import Tagselect from "./components/bodys/Tagselect";
import Tagselect_pose from "./components/bodys/Tagselect_pose";
import Tagselect_style from "./components/bodys/Tagselect_style";

function App() {
  const location = useLocation();

  return (
    <div className="Ap bg-gray-lv1">
      <MyNavbar />
      {/* <SwitchTransition>
        <CSSTransition key={location.pathname} classNames="slide" timeout={300}> */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myphotos" element={<MyPhotos />} />
        <Route path="/tagselect" element={<Tagselect />}>
          <Route path="/tagselect/pose" element={<Tagselect_pose />} />
          <Route path="/tagselect/style" element={<Tagselect_style />} />
        </Route>
        <Route path="/texttoimg" element={<Texttoimg />} />
        <Route path="/result" element={<Result />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
      {/* </CSSTransition>
      </SwitchTransition> */}
      <MyFooter />
    </div>
  );
}

export default App;
