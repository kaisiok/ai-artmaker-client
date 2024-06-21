import { Routes, Route } from "react-router-dom";
import Mydata from "./data/data.json";
import { useEffect } from "react";

import MyNavbar from "./components/navbars/Navbar";
import MyFooter from "./components/footers/Myfooter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animations.css";

import Home from "./components/bodys/Home";
import Signup from "./components/bodys/Signup";
import Login from "./components/bodys/Login";
import Oauth_naver from "./components/bodys/Oauth_naver";
import Mypage from "./components/bodys/Mypage";
import MyPhotos from "./components/bodys/Myphotos";
import Texttoimg from "./components/bodys/Texttoimg";
import Result from "./components/bodys/Result";
import Tagselect from "./components/bodys/Tagselect";
import Error404 from "./components/bodys/Error404";
import Error500 from "./components/bodys/Error500";

type ImageObject = {
  src: string;
};
interface ISvgObj {
  [key: string]: any;
}
const MydataTs: ISvgObj = Mydata;

function preloadImages(urls: Array<ImageObject>) {
  urls.forEach((el) => {
    const img = new Image();
    img.src = el.src;
  });
}

function App() {
  useEffect(() => {
    const dataKeys = Object.keys(Mydata);
    dataKeys.forEach((key) => {
      preloadImages(MydataTs[key]);
    });
  }, []);

  return (
    <div className="Ap bg-gray-lv1 font-Main">
      <MyNavbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/oauth" element={<Oauth_naver />} />
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
