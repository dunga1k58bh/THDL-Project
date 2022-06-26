import "./App.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./page/Home";
import Detail from "./page/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
