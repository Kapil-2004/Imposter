import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Signin from "./pages/Signin";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className=" dark:bg-background-dark overflow-hidden     bg-background">
      <BrowserRouter>
      

        <Routes>
          
          <Route path="/sign-in" element={<Signin />}></Route>
     
          <Route path="/" element={<Home />}></Route>
          
        
         
        </Routes>
       
      </BrowserRouter>
    </div>
  );
}
