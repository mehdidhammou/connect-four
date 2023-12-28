import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CpuVsCpu from "./components/CpuVsCpu";
import Menu from "./components/Menu";
import VsCpu from "./components/VsCpu";
import VsCpu2 from "./components/VsCpu2";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/vs-cpu" element={<VsCpu />} />
        <Route path="/vs-cpu2" element={<VsCpu2 />} />
        <Route path="/cpu-vs-cpu" element={<CpuVsCpu />} />
      </Routes>
    </Router>
  );
};

export default App;
