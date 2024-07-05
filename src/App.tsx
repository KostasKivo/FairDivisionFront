import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Header/Login";
import Register from "./components/Header/Register";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ConditionalLayout />
        <Routes>
          <Route path="/" element={<></>}></Route>{" "}
          {/* Default content for the root path */}{" "}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalLayout() {
  const location = useLocation();

  // Render Layout only on the main page ("/")
  if (location.pathname === "/") {
    return <Layout />;
  }

  return null;
}

export default App;
