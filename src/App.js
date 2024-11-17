import { Outlet } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./util/Scroll";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App no-scrollbar overflow-y-auto">
      <ScrollToTop />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
