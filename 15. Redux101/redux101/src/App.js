import "./App.css";
import FrozenDept from "./components/FrozenDept";
import MeatDept from "./components/MeatDept";
import ProduceDept from "./components/ProduceDept";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/main" element={<Main />} />
          <Route path="/frozen-dept" element={<FrozenDept />} />
          <Route path="/meat-dept" element={<MeatDept />} />
          <Route path="/produce-dept" element={<ProduceDept />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
