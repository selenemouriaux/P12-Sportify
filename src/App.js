import Recharts from "./components/Recharts";
import D3 from "./components/D3";
import {Route, Routes} from "react-router-dom";
import Header from "./layouts/Header";
import SideBar from "./layouts/SideBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Activity from "./pages/Activity";

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <SideBar/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/activity/:activity" element={<Activity/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
    // <>
    //   <p>Ma page web Sportify</p>
    //   <D3/>
    //   <hr/>
    //   <Recharts/>
    // </>
  )
}

export default App;
