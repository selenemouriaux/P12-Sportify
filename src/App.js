import { Route, Routes } from "react-router-dom"
import Header from "./layouts/Header"
import SideBar from "./layouts/SideBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import Community from "./pages/Community"
import NotFound from "./pages/NotFound"
import { SettingsContextProvider } from "./service/Context"

function App() {
  return (
    <SettingsContextProvider>
      <div className="wrapper">
        <Header />
        <div className="content">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SettingsContextProvider>
  )
}

export default App
