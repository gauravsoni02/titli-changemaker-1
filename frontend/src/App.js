import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { StudentCampaignModal } from "@/components/titli/StudentCampaignModal";

import { AuthProvider, useAuth } from "@/auth/AuthContext";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import SchoolRegisterPage from "@/pages/SchoolRegisterPage";

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

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
  const [studentOpen, setStudentOpen] = useState(false);

  const { coordinator } = useAuth();
  const navigate = useNavigate();

  useLenis();

  const isSignedIn =
    coordinator && typeof coordinator === "object";

  const handleRegisterSchool = () => {
    if (isSignedIn) {
      navigate("/dashboard");
      return;
    }

    navigate("/register");
  };

  return (
    <div className="App">
      <div id="top" />

      <Nav onRegisterSchool={handleRegisterSchool} />

      <Hero
        onRegisterSchool={handleRegisterSchool}
        onStartFundraiser={() => setStudentOpen(true)}
      />

      <HowItWorks />

      <ForSchools onRegister={handleRegisterSchool} />

      <ForStudents
        onStart={() => setStudentOpen(true)}
      />

      <Impact />

      <WhereItGoes />

      <Partners />

      <BreakTheTaboo />

      <FinalCTA
        onRegisterSchool={handleRegisterSchool}
        onStartFundraiser={() => setStudentOpen(true)}
      />

      <Footer />

      <StudentCampaignModal
        open={studentOpen}
        onClose={() => setStudentOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Landing page */}
          <Route
            path="/"
            element={<Landing />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* School registration */}
          <Route
            path="/register"
            element={<SchoolRegisterPage />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;