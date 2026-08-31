import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
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

import { AuthProvider, useAuth } from "@/auth/AuthContext";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import SchoolRegisterPage from "@/pages/SchoolRegisterPage";
import StudentFundraiserPage from "@/pages/StudentFundraiserPage";

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}

function Landing() {
  const { coordinator } = useAuth();
  const navigate = useNavigate();

  useLenis();

  const isSignedIn =
    coordinator && typeof coordinator === "object";

  const handleRegisterSchool = () => {
    navigate(isSignedIn ? "/dashboard" : "/register");
  };

  const handleStudentFundraiser = () => {
    navigate("/student");
  };

  return (
    <div className="App">
      <div id="top" />

      <Nav onRegisterSchool={handleRegisterSchool} />

      <Hero
        onRegisterSchool={handleRegisterSchool}
        onStartFundraiser={handleStudentFundraiser}
      />

      <HowItWorks />

      <ForSchools onRegister={handleRegisterSchool} />

      <ForStudents onStart={handleStudentFundraiser} />

      <Impact />

      <WhereItGoes />

      <Partners />

      <BreakTheTaboo />

      <FinalCTA
        onRegisterSchool={handleRegisterSchool}
        onStartFundraiser={handleStudentFundraiser}
      />

      <Footer />
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SchoolRegisterPage />} />
          <Route path="/student" element={<StudentFundraiserPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
