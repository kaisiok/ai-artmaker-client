import React from "react";
import Counter from "./components/Counter";
import OutlineTypesExample from "./components/button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">hello world!</h1>
      <Counter />
      <OutlineTypesExample />
    </div>
  );
}

export default App;
