import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer"
import About from "./pages/About";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/:uniqueGuid" element={<About />} />
          <Route path="/feedback/:uniqueGuid" element={<Feedback />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
