import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import CpuVsCpu from "./components/CpuVsCpu";
import Menu from "./components/main-menu";
import VsCpu from "./components/vs-cpu";
import Header from "./components/header";

const App = () => {
  return (
    <div className="grid max-w-4xl min-h-screen grid-rows-4 gap-8 mx-auto place-items-start">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/vs-cpu" element={<VsCpu whichCpu={1} />} />
          <Route path="/vs-cpu-2" element={<VsCpu whichCpu={2} />} />
          {/* <Route path="/cpu-vs-cpu" element={<CpuVsCpu />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
