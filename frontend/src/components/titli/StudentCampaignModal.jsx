import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { TitliButton } from "./TitliButton";
import { TitliButterfly } from "./ScriptAccent";
import { useDialogA11y } from "@/hooks/useDialogA11y";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export function StudentCampaignModal({ open, onClose }) {
  const [f, setF] = useState({
    student_name: "", email: "", school: "", grade: "", target_amount: "5000",
  });
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const { dialogRef, titleId } = useDialogA11y(open, onClose);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!f.student_name || !f.email || !f.school) {
      setErr("Please fill your name, school, and email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
      setErr("Enter a valid email");
      return;
    }
    try {
      setState("loading");
      await axios.post(`${API}/students/campaigns`, { ...f, target_amount: Number(f.target_amount) || 0 });
      setState("success");
    } catch {
      setState("idle");
      setErr("Something went wrong, please retry.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="student-campaign-modal"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose}/>
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] bg-[#FFFBF7] rounded-[32px] p-8 md:p-10 shadow-hero border border-[#FFC5DE]/50 max-h-[92vh] overflow-y-auto"
          >
            <button
              type="button"
              data-dialog-initial-focus
              data-testid="student-modal-close"
              onClick={onClose}
              className="absolute top-5 right-5 min-w-11 min-h-11 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 transition-all"
              aria-label="Close"
            >×</button>

            {state !== "success" ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <TitliButterfly size={30}/>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-titli-action font-bold">Start your fundraiser</div>
                </div>
                <h3 id={titleId} className="font-sans font-extrabold text-[30px] leading-[1.1] tracking-tight text-[#111]">
                  You + a target. That&apos;s it.
                </h3>
                <p className="mt-2 text-[14px] text-[#4A4A4A] font-body">
                  We&apos;ll email you a shareable link and a QR poster you can print.
                </p>

                <form onSubmit={submit} className="mt-7 space-y-4">
                  <Field label="Your name">
                    <input value={f.student_name} onChange={set("student_name")} data-testid="student-name-input" className={inputCls} placeholder="Ananya S."/>
                  </Field>
                  <Field label="Your email">
                    <input type="email" value={f.email} onChange={set("email")} data-testid="student-email-input" className={inputCls} placeholder="ananya@school.edu"/>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="School">
                      <input value={f.school} onChange={set("school")} data-testid="student-school-input" className={inputCls} placeholder="DPS R.K. Puram"/>
                    </Field>
                    <Field label="Grade (optional)">
                      <input value={f.grade} onChange={set("grade")} data-testid="student-grade-input" className={inputCls} placeholder="11-B"/>
                    </Field>
                  </div>
                  <Field label="Your target (₹)">
                    <input type="number" min="500" value={f.target_amount} onChange={set("target_amount")} data-testid="student-target-input" className={inputCls} placeholder="5000"/>
                  </Field>

                  {err && <div role="alert" className="text-[13px] text-titli-action">{err}</div>}

                  <TitliButton
                    type="submit"
                    size="lg"
                    disabled={state === "loading"}
                    data-testid="student-submit"
                    className="w-full justify-center"
                    glow
                  >
                    {state === "loading" ? "Creating…" : "Create my campaign →"}
                  </TitliButton>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/45 font-semibold text-center">
                    No leaderboards · Every rupee counts
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="flex justify-center mb-6 animate-flutter">
                  <TitliButterfly size={60}/>
                </div>
                <h3 id={titleId} className="font-sans font-extrabold text-[30px] leading-[1.1] tracking-tight text-[#111]">
                  Campaign created 🎉
                </h3>
                <p className="mt-3 text-[15px] text-[#4A4A4A] max-w-[380px] mx-auto font-body">
                  Check your email <span className="text-titli-action font-semibold">{f.email}</span> for your shareable link and QR poster.
                </p>
                <TitliButton onClick={onClose} className="mt-8">Done</TitliButton>
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
