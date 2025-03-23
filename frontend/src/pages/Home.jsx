import React from "react";
import { PopularPosts } from "../components/PopularPosts";
import { AllPosts } from "../components/AllPosts";


export default function Home() {
  return (
    <div className="  ">
      <div className="w-full  flex md:flex-row flex-col min-h-screen        pt-20">
        <PopularPosts />
        <AllPosts />
    
      
        
        
      </div>
    </div>
  );
}