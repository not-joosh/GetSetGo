/*ROUTES*/
import { HOME } from './lib/routes';
import { LANDINGPAGE } from './lib/routes';
/*PAGES*/
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
/*IMPORTS*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes >
        <Route path = {HOME} element = {<HomePage/>}/>
        <Route path = {LANDINGPAGE} element = {<LandingPage />}/>
        <Route />
      </Routes>
    </Router>
  );
};
export default App
