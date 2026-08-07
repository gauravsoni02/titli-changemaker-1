import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useSearchParams } from "react-router-dom";
import Lenis from "lenis";
import axios from "axios";
import "@/App.css";

import { Nav } from "@/components/titli/Nav";
import { Hero } from "@/components/titli/Hero";
import { TrustMetrics } from "@/components/titli/TrustMetrics";
import { HowItWorks } from "@/components/titli/HowItWorks";
import { WhyJoin } from "@/components/titli/WhyJoin";
import { Privacy } from "@/components/titli/Privacy";
import { Stories } from "@/components/titli/Stories";
import { Schools } from "@/components/titli/Schools";
import { FinalCTA } from "@/components/titli/FinalCTA";
import { Footer } from "@/components/titli/Footer";
import { DonateModal } from "@/components/titli/DonateModal";
import { TitliButton } from "@/components/titli/TitliButton";
import { CupGlyph } from "@/components/titli/ScriptAccent";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
  const [donateOpen, setDonateOpen] = useState(false);
  useLenis();

  return (
    <div className="App">
      <div id="top" />
      <Nav onDonate={() => setDonateOpen(true)} />
      <Hero onDonate={() => setDonateOpen(true)} />
      <TrustMetrics />
      <HowItWorks />
      <WhyJoin />
      <Privacy />
      <Stories />
      <Schools />
      <FinalCTA onDonate={() => setDonateOpen(true)} />
      <Footer />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}

function DonationSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("checking");
  const [amount, setAmount] = useState(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!sessionId) {
      setStatus("no_session");
      return;
    }
    let stopped = false;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/donations/status/${sessionId}`);
        if (stopped) return;
        setAmount(data.amount);
        if (data.payment_status === "paid") {
          setStatus("paid");
          return;
        }
        if (["failed", "expired"].includes(data.payment_status)) {
          setStatus("failed");
          return;
        }
        attemptsRef.current += 1;
        if (attemptsRef.current > 12) {
          setStatus("timeout");
          return;
        }
        setTimeout(poll, 2000);
      } catch (e) {
        if (stopped) return;
        setStatus("failed");
      }
    };
    poll();
    return () => {
      stopped = true;
    };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center px-6">
      <div className="max-w-[560px] text-center">
        <div className="flex justify-center mb-8">
          <CupGlyph size={56} />
        </div>
        {status === "checking" && (
          <>
            <h1 className="font-editorial text-[42px] leading-tight tracking-tight text-black">
              Confirming your gift…
            </h1>
            <p className="mt-4 text-[#4A4A4A]">One moment while Stripe replies.</p>
            <div className="mt-8 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#EC5A99] border-t-transparent animate-spin" />
            </div>
          </>
        )}
        {status === "paid" && (
          <>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FEF1F8] px-4 py-1.5 text-[11px] uppercase tracking-widest text-[#EC5A99] border border-[#FFC5DE] mb-6">
              Gift received
            </div>
            <h1 className="font-editorial text-[54px] leading-[1.02] tracking-tight text-black">
              Thank you.
              <br />
              <span className="italic text-[#EC5A99]">Truly.</span>
            </h1>
            <p className="mt-6 text-[#4A4A4A] text-[16px] leading-[1.7]">
              Your ${amount} gift will be tagged to a specific classroom in the
              coming days. A field report will arrive in your inbox with a
              photograph and a signature.{" "}
            </p>
            <div className="mt-10">
              <Link to="/">
                <TitliButton>Back to the story →</TitliButton>
              </Link>
            </div>
          </>
        )}
        {(status === "failed" || status === "timeout" || status === "no_session") && (
          <>
            <h1 className="font-editorial text-[42px] leading-tight tracking-tight text-black">
              Something didn&apos;t complete.
            </h1>
            <p className="mt-4 text-[#4A4A4A]">
              No charge has been made. You can try again anytime.
            </p>
            <div className="mt-10">
              <Link to="/">
                <TitliButton>Return home</TitliButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DonationCancel() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center px-6">
      <div className="max-w-[520px] text-center">
        <h1 className="font-editorial text-[48px] leading-tight tracking-tight text-black">
          No worries.
        </h1>
        <p className="mt-4 text-[#4A4A4A]">
          Your gift wasn&apos;t processed. Whenever you&apos;re ready — we&apos;ll be here.
        </p>
        <div className="mt-8">
          <Link to="/">
            <TitliButton>Back to the story →</TitliButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/donation/success" element={<DonationSuccess />} />
        <Route path="/donation/cancel" element={<DonationCancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
