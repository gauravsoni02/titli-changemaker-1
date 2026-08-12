import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TitliButton } from "@/components/titli/TitliButton";
import { TitliButterfly } from "@/components/titli/ScriptAccent";
import { ButterflyLoader } from "@/components/titli/ButterflyLoader";
import { useAuth, formatApiErrorDetail } from "@/auth/AuthContext";

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (e2) {
      setErr(formatApiErrorDetail(e2.response?.data?.detail) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-full bg-white border border-black/10 focus:border-[#EC5A99] outline-none px-5 py-3 text-[15px] text-[#111] placeholder-black/30 transition-colors";

  return (
    <div className="min-h-screen bg-[#FEF1F8] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[480px]">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
          <TitliButterfly size={26} className="transition-transform group-hover:scale-110"/>
          <span className="font-sans font-extrabold text-[14px] tracking-[0.18em] text-[#EC5A99] uppercase">Titli Foundation</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FFFBF7] rounded-[32px] p-8 md:p-10 shadow-lift border border-[#FFC5DE]/40"
        >
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] font-bold">Coordinator login</div>
          <h1 className="mt-3 font-sans font-extrabold text-[32px] leading-[1.05] tracking-tight text-[#111]">
            Welcome back.
          </h1>
          <p className="mt-2 text-[14px] text-[#4A4A4A] font-body">
            Access your school&apos;s dashboard and 80G exports.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-black/55 font-semibold mb-1.5">Email</span>
              <input
                data-testid="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className={inputCls}
                placeholder="coordinator@school.edu"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-black/55 font-semibold mb-1.5">Password</span>
              <input
                data-testid="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={inputCls}
                placeholder="••••••••"
              />
            </label>

            {err && <div className="text-[13px] text-[#EC5A99]">{err}</div>}

            <TitliButton
              type="submit"
              size="lg"
              onClick={submit}
              disabled={loading}
              data-testid="login-submit"
              className="w-full justify-center"
              glow
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <ButterflyLoader size={18} tone="white"/>
                  Signing in…
                </span>
              ) : (
                "Sign in →"
              )}
            </TitliButton>
          </form>

          <div className="mt-6 pt-6 border-t border-black/[0.08] text-[13px] text-[#4A4A4A] text-center font-body">
            Not registered yet?{" "}
            <Link to="/" className="text-[#EC5A99] font-semibold hover:underline">Register your school</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
