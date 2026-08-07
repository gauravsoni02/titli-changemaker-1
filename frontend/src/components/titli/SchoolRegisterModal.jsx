import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TitliButton } from "./TitliButton";
import { TitliButterfly } from "./ScriptAccent";
import { useAuth } from "@/auth/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SCHOOL_SIZES = ["Under 300", "300 – 800", "800 – 1500", "1500+"];

export function SchoolRegisterModal({ open, onClose }) {
  const nav = useNavigate();
  const { setSession } = useAuth();
  const [f, setF] = useState({
    school_name: "", city: "", coordinator_name: "", coordinator_email: "",
    phone: "", size: SCHOOL_SIZES[1], password: "",
  });
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!f.school_name || !f.city || !f.coordinator_name || !f.coordinator_email || !f.password) {
      setErr("Please fill all required fields"); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.coordinator_email)) {
      setErr("Enter a valid coordinator email"); return;
    }
    if (f.password.length < 8) {
      setErr("Password must be at least 8 characters"); return;
    }
    try {
      setState("loading");
      const { data } = await axios.post(`${API}/schools/register`, f);
      if (data.access_token) setSession(data.access_token, data.coordinator);
      setState("success");
    } catch (e2) {
      setState("idle");
      const detail = e2.response?.data?.detail;
      setErr(typeof detail === "string" ? detail : "Something went wrong, please retry.");
    }
  };

  const goDashboard = () => {
    onClose();
    nav("/dashboard");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="school-register-modal"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose}/>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[560px] bg-[#FFFBF7] rounded-[32px] p-8 md:p-10 shadow-hero border border-[#FFC5DE]/50 max-h-[92vh] overflow-y-auto"
          >
            <button
              data-testid="school-modal-close"
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 transition-all"
              aria-label="Close"
            >×</button>

            {state !== "success" ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <TitliButterfly size={30}/>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] font-bold">School registration</div>
                </div>
                <h3 className="font-sans font-extrabold text-[30px] leading-[1.1] tracking-tight text-[#111]">
                  Bring your school on board.
                </h3>
                <p className="mt-2 text-[14px] text-[#4A4A4A] font-body">
                  Set a password now — your coordinator dashboard opens the moment you register.
                </p>

                <form onSubmit={submit} className="mt-7 space-y-4">
                  <Field label="School name">
                    <input value={f.school_name} onChange={set("school_name")} data-testid="school-name-input" className={inputCls} placeholder="Delhi Public School, R.K. Puram"/>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City">
                      <input value={f.city} onChange={set("city")} data-testid="school-city-input" className={inputCls} placeholder="New Delhi"/>
                    </Field>
                    <Field label="School size">
                      <select value={f.size} onChange={set("size")} data-testid="school-size-input" className={inputCls}>
                        {SCHOOL_SIZES.map((s) => <option key={s} value={s}>{s} students</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Coordinator name">
                    <input value={f.coordinator_name} onChange={set("coordinator_name")} data-testid="school-coord-input" className={inputCls} placeholder="Ms. Priya Sharma"/>
                  </Field>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Coordinator email">
                      <input type="email" autoComplete="username" value={f.coordinator_email} onChange={set("coordinator_email")} data-testid="school-email-input" className={inputCls} placeholder="coordinator@school.edu"/>
                    </Field>
                    <Field label="Phone (optional)">
                      <input value={f.phone} onChange={set("phone")} data-testid="school-phone-input" className={inputCls} placeholder="+91 …"/>
                    </Field>
                  </div>
                  <Field label="Create password (8+ chars)">
                    <input type="password" autoComplete="new-password" value={f.password} onChange={set("password")} data-testid="school-password-input" className={inputCls} placeholder="••••••••"/>
                  </Field>

                  {err && <div className="text-[13px] text-[#EC5A99]">{err}</div>}

                  <div className="pt-2">
                    <TitliButton
                      type="submit"
                      size="lg"
                      onClick={submit}
                      disabled={state === "loading"}
                      data-testid="school-submit"
                      className="w-full justify-center"
                    >
                      {state === "loading" ? "Sending…" : "Register school →"}
                    </TitliButton>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/45 font-semibold text-center pt-2">
                    Free · 80G eligible · Dashboard opens instantly
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="flex justify-center mb-6 animate-flutter">
                  <TitliButterfly size={60}/>
                </div>
                <h3 className="font-sans font-extrabold text-[32px] leading-[1.1] tracking-tight text-[#111]">
                  You&apos;re in.
                </h3>
                <p className="mt-3 text-[15px] text-[#4A4A4A] max-w-[380px] mx-auto font-body">
                  Your dashboard for <span className="text-[#EC5A99] font-semibold">{f.school_name}</span> is ready.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <TitliButton onClick={goDashboard} data-testid="go-dashboard-btn" glow>Open dashboard →</TitliButton>
                  <TitliButton variant="ghost" onClick={onClose}>Stay on page</TitliButton>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls = "w-full rounded-full bg-white border border-black/10 focus:border-[#EC5A99] outline-none px-5 py-3 text-[14px] text-[#111] placeholder-black/30 transition-colors";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-black/55 font-semibold mb-1.5">{label}</span>
      {children}
    </label>
  );
}
