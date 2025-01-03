import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Brust from "./Brust";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/brust" element={<Brust />} />
      </Routes>
    </Router>
  );
}

export default App;
