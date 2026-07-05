import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Donate from "./pages/Donate"
import ControlPanel from "./pages/ControlPanel"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <main className="flex-grow-1">
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/informacion" element={<About />} />
            <Route path="/donar" element={<Donate />} />
          </Route>
          <Route path="/adminpanel" element={<ControlPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
