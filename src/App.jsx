import {Routes, Route} from 'react-router-dom';

import UnitalkLanding from "./Uni_Webpage.jsx";

import Unitalk from "./Unitalk.jsx";     // CHATBOT PROJECT 

function App() {
  
  return(
    <Routes>
      <Route path="/" element={<UnitalkLanding/>} />
      <Route path="/Unitalk" element={<Unitalk/>} />
    </Routes>

  );
}

export default App
