import * as React from "react";

import {BrowserRouter as Router, Route, Routes, useLocation,} from "react-router-dom";
import Header from "./components/Header/Header";
import About from "./components/Header/About";
import {Layout} from "./components/Layout/Layout";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ConditionalLayout />
        <Routes>
          <Route path="/" element={<></>}></Route>{" "}
          {/*<Route path="/login" element={<Login />}></Route>*/}
          {/*<Route path="/register" element={<Register />} />*/}
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalLayout() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Layout />;
  }

  return null;
}

export default App;
