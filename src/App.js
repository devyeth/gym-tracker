import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Brust from "./Brust";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/brust" element={<Brust />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
