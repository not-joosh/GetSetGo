
/*ROUTES*/
import { HOME, LANDINGPAGE } from "./lib/routes";

/*COMPONENTS AND PAGES*/
import { LandingPage } from "./pages/LandingPage";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { BackDrop } from "../_BIN_/src versions/src1/components/BackDrop";
/*OTHER IMPORTS*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { homepageBG } from "./assets/config";

function App() {
  const wrapNavBar = (componentIn) => {
    return (
      <>
        <BackDrop image = {homepageBG}/>
        <Navbar />
        {componentIn}
      </>
    );
  }
  
  return (
    <Router>
      <Routes >
        <Route path = {LANDINGPAGE} element = {<LandingPage />}/>
        <Route path = {HOME} element = {wrapNavBar(<HomePage />)}/>
      </Routes>
    </Router>
  );
};
export default App
