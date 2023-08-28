import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer"
import About from "./pages/About";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/:uniqueGuid" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App