import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./components/game/game";
import Header from "./components/header";
import Menu from "./components/main-menu";
import { ThemeProvider } from "./providers/theme-provider";
import { AutoGame } from "./components/game";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid max-w-4xl min-h-screen grid-rows-4 gap-8 mx-auto place-items-stretch">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/vs-cpu/:heuristic" element={<Game />} />
            <Route path="/cpu-vs-cpu" element={<AutoGame />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
