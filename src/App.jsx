import {Routes, Route} from 'react-router-dom';

import UnitalkLanding from "./Uni_Webpage.jsx";

import Unitalk from "./Unitalk.jsx";      

import AIChatbot from './Redesigned.jsx';

import StudentPortal from './LMS_page.jsx';

function App() {
  
  return(
    // <Routes>
    //   <Route path="/" element={<StudentPortal/>} />
    //   <Route path="/Redesigned" element={<AIChatbot/>} />
    // </Routes>

    <UnitalkLanding/>    

  );
}

export default App
