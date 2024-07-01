import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
 import Home from "./components/Home"
 import NutritionChecker from "./components/NutritionCheck";
 import Bmr from "./components/Bmr";
 import Diet from "./components/Diet";
import RunningTimer from "./components/RunningTimer";
import ExerciseDB from "./components/ExerciseDB"
// import Mealbase from "./components/Mealbase";
import MealPart2 from "./components/MealPart2";

function App() {
  
  return (
    
    <Router>
        <Navbar></Navbar>
      <AuthProvider>
        <Routes>
        
        <Route path="/" element={<Home />} />
       
         <Route path="/home" element={<Home />} />
         <Route path="/NutritionCheck" element={<NutritionChecker />} />
         <Route path="/Health" element={<Bmr />} />
         <Route path="/register" element={<Registration />} />{" "}
         <Route path="/logout" element={<Logout />} />
         <Route path="/login" element={<Login />} />
         <Route path="/exercise" element={<ExerciseDB />} />

          <Route path="/RunningTimer" element={<RunningTimer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Mealpart" element={<MealPart2 />} />
          <Route path="/Diet" element={<Diet />} />
        
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;