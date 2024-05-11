import { Routes, Route } from "react-router-dom";

import Counter from "./components/Counter";
import OutlineTypesExample from "./components/button";
import MyNavbar from "./components/navbars/Navbar";
import MyFooter from "./components/footers/Myfooter";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/bodys/Home";
import Tagselect from "./components/bodys/Tagselect";

function App() {
  return (
    <div className="Ap bg-gray-lv1">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tagselect" element={<Tagselect />} />
      </Routes>
      <MyFooter />
    </div>
  );
}

export default App;
