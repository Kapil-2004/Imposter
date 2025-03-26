import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Home from "./pages/Home";
import {Forgotpassword} from "./pages/Forgotpassword";

import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Resetpassword from "./pages/Resetpassword";
import VerifyOTP from "./pages/VerifyOTP";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import UserPost from "./pages/UserPost";

export default function App() {
  return (
    <div className=" dark:bg-background-dark overflow-hidden     bg-background">
      <BrowserRouter>
      
      <Header />

        <Routes>
          
          <Route path="/sign-in" element={<Signin />}></Route>
     
          <Route path="/" element={<Home />}></Route>

          <Route path="/forgot-password" element={<Forgotpassword></Forgotpassword>}></Route>

          <Route path="/sign-up" element={<Signup />}></Route>

          <Route path="/about" element={<About />}></Route>

          <Route path="/contact" element={<Contact />}></Route>

          <Route path="/reset-password/:token" element={<Resetpassword/>}></Route>

          <Route path="/verify-otp" element={<VerifyOTP />}></Route>

          <Route path="/create-post" element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }></Route>

          <Route path="/post/:postSlug" element={<PostPage />}></Route>

          <Route
            path="/posts/userposts"
            element={
              <ProtectedRoute>
                <UserPost />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <PublicChat />
              </ProtectedRoute>
            }
          />
                   
         
        </Routes>

        <Footer/>
       
      </BrowserRouter>
    </div>
  );
}
