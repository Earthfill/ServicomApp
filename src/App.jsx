import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer"
import About from "./pages/About";
import Complaints from "./pages/Complaints";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/complaints" element={<Complaints />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App