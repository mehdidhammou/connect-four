import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
import CpuVsCpu from "./components/CpuVsCpu";
import Menu from "./components/Menu";
import VsCpu from "./components/VsCpu";
import Header from "./components/header";

const App = () => {
  return (
    <div className="grid max-w-4xl min-h-screen grid-rows-3 gap-8 mx-auto place-items-start">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/vs-cpu" element={<VsCpu whichCpu={1} />} />
          <Route path="/vs-cpu-2" element={<VsCpu whichCpu={2} />} />
          <Route path="/cpu-vs-cpu" element={<CpuVsCpu />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
