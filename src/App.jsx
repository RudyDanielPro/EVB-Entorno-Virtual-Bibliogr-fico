import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import { Principal } from "./Pages/Principal";
import { Acerca_de } from "./Pages/Acerca_de";
import { Soporte } from "./Pages/Soporte";
import { Course } from "./Pages/Course";

export function App() {
 
 return( 
 <Router>
    <Routes>
    <Route path="/" element={<Principal />} />
    <Route path="/acerca_de" element={<Acerca_de/>}/>
    <Route path="/soporte" element={<Soporte/>}/>
    <Route path="/courses" element={<Course/>}/>
    </Routes>
  </Router>
 )
}

