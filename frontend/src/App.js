import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import "@/App.css";

import { Nav } from "@/components/titli/Nav";
import { Hero } from "@/components/titli/Hero";
import { HowItWorks } from "@/components/titli/HowItWorks";
import { ForSchools } from "@/components/titli/ForSchools";
import { ForStudents } from "@/components/titli/ForStudents";
import { Impact } from "@/components/titli/Impact";
import { WhereItGoes } from "@/components/titli/WhereItGoes";
import { Partners } from "@/components/titli/Partners";
import { BreakTheTaboo } from "@/components/titli/BreakTheTaboo";
import { FinalCTA } from "@/components/titli/FinalCTA";
import { Footer } from "@/components/titli/Footer";
import { SchoolRegisterModal } from "@/components/titli/SchoolRegisterModal";
import { StudentCampaignModal } from "@/components/titli/StudentCampaignModal";
import { AuthProvider } from "@/auth/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
}

function Landing() {
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  useLenis();

  return (
    <div className="App">
      <div id="top"/>
      <Nav onRegisterSchool={() => setSchoolOpen(true)}/>
      <Hero onRegisterSchool={() => setSchoolOpen(true)} onStartFundraiser={() => setStudentOpen(true)}/>
      <HowItWorks/>
      <ForSchools onRegister={() => setSchoolOpen(true)}/>
      <ForStudents onStart={() => setStudentOpen(true)}/>
      <Impact/>
      <WhereItGoes/>
      <Partners/>
      <BreakTheTaboo/>
      <FinalCTA onRegisterSchool={() => setSchoolOpen(true)} onStartFundraiser={() => setStudentOpen(true)}/>
      <Footer/>
      <SchoolRegisterModal open={schoolOpen} onClose={() => setSchoolOpen(false)}/>
      <StudentCampaignModal open={studentOpen} onClose={() => setStudentOpen(false)}/>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
