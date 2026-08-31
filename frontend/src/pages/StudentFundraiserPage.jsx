import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TitliButton } from "@/components/titli/TitliButton";
import { ButterflyLogo } from "@/components/titli/ButterflyLogo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const input =
  "w-full rounded-full bg-white border border-black/15 focus:border-[#EC5A99] focus:ring-2 focus:ring-[#EC5A99]/10 outline-none px-5 py-3 text-[14px] text-[#111] placeholder-[#777] transition";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block mb-1.5 text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold">
      {label}
    </span>
    {children}
  </label>
);

export default function StudentFundraiserPage() {
  const [form, setForm] = useState({
    student_name: "",
    email: "",
    school: "",
    school_code: "",
    grade: "",
    target_amount: "5000",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.student_name || !form.email || !form.school || !form.school_code) {
      return setError(
        "Please fill your name, email, school, and school code."
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setError("Enter a valid email.");
    }

    if (!form.target_amount || Number(form.target_amount) < 500) {
      return setError("Your target must be at least ₹500.");
    }

    try {
      setLoading(true);

      await axios.post(`${API}/students/campaigns`, {
        ...form,
        target_amount: Number(form.target_amount) || 0,
      });

      setSuccess(true);
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Something went wrong, please retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF1F7] px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1180px]">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
            aria-label="Titli Foundation home"
          >
            <ButterflyLogo size={48} tone="pink" />

            <div>
              <div className="text-[16px] font-extrabold text-titli-action">
                Titli Foundation
              </div>
              <div className="text-[8px] uppercase tracking-[0.25em] text-[#8F4A69]">
                Menstrual Health
              </div>
            </div>
          </Link>

          <Link
            to="/login"
            className="text-[12px] text-[#555] hover:text-titli-action"
          >
            Already registered?{" "}
            <span className="font-semibold text-titli-action">
              Sign in
            </span>
          </Link>
        </header>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[1fr_560px] lg:gap-20 lg:py-20">

          {/* LEFT CONTENT */}
          <section className="max-w-[480px]">
            <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8F4A69]">
              For students
            </div>

            <h1 className="font-sans text-[48px] font-extrabold leading-[.95] tracking-[-0.04em] text-[#111] md:text-[60px]">
              Your fundraiser is
              <br />
              <span className="text-[#EC5A99]">your voice.</span>
            </h1>

            <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-[#444]">
              We built this for students, not for competition. Every campaign
              matters. Every rupee lands. Raise ten or ten thousand — a girl
              somewhere in India gets to sit through class without shame.
            </p>

            <div className="mt-9 space-y-5">
              {[
                ["✎", "A campaign page in 60 seconds"],
                ["♥", "Real-time counter — no leaderboards, no comparison"],
                ["◐", "Group with friends, split the effort"],
                ["⌁", "Share link, WhatsApp story, QR code"],
                ["✦", "Certificate for every campaign"],
                ["◌", "Learn what your money actually did"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-titli-action shadow-sm">
                    {icon}
                  </span>

                  <span className="pt-1 text-[13px] text-[#222]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* FORM */}
          <section>
            <div className="rounded-[30px] border border-[#E8C8D6] bg-[#FFFBF7] p-7 shadow-[0_22px_55px_rgba(30,20,25,.10)] md:p-10">

              {!success ? (
                <>
                  <div className="mb-7">
                    <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8F4A69]">
                      Start your fundraiser
                    </div>

                    <h2 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-[#111] md:text-[36px]">
                      You + a target. That's it.
                    </h2>

                    <p className="mt-2 text-[13px] leading-5 text-[#444]">
                      We'll email you a shareable link and a QR poster you can
                      print.
                    </p>

                    {/* PROGRESS BAR */}
                    <div className="mt-5">
                      <div className="flex gap-2">
                        <span className="h-[3px] flex-1 rounded-full bg-[#EC5A99]" />
                        <span className="h-[3px] flex-1 rounded-full bg-[#F3DCE7]" />
                        <span className="h-[3px] flex-1 rounded-full bg-[#F3DCE7]" />
                      </div>

                      <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#888]">
                        Step 1 · Campaign information
                      </div>
                    </div>
                  </div>

                  <form onSubmit={submit} className="space-y-4">

                    {/* NAME */}
                    <Field label="Your name">
                      <input
                        className={input}
                        value={form.student_name}
                        onChange={update("student_name")}
                        placeholder="Ananya S."
                      />
                    </Field>

                    {/* EMAIL */}
                    <Field label="Your email">
                      <input
                        type="email"
                        className={input}
                        value={form.email}
                        onChange={update("email")}
                        placeholder="ananya@school.edu"
                      />
                    </Field>

                    {/* SCHOOL + SCHOOL CODE */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="School">
                        <input
                          className={input}
                          value={form.school}
                          onChange={update("school")}
                          placeholder="DPS R.K. Puram"
                        />
                      </Field>

                      <Field label="School code">
                        <input
                          className={input}
                          value={form.school_code}
                          onChange={update("school_code")}
                          placeholder="DPSRKP01"
                        />
                      </Field>
                    </div>

                    {/* GRADE */}
                    <Field label="Grade (optional)">
                      <input
                        className={input}
                        value={form.grade}
                        onChange={update("grade")}
                        placeholder="11-B"
                      />
                    </Field>

                    {/* TARGET */}
                    <Field label="Your target (₹)">
                      <input
                        type="number"
                        min="500"
                        className={input}
                        value={form.target_amount}
                        onChange={update("target_amount")}
                        placeholder="5000"
                      />
                    </Field>

                    {/* ERROR */}
                    {error && (
                      <div role="alert" className="rounded-2xl bg-titli-pink/5 px-4 py-3 text-[12px] text-titli-action">
                        {error}
                      </div>
                    )}

                    {/* SUBMIT */}
                    <TitliButton
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="!mt-6 w-full justify-center"
                      glow
                    >
                      {loading
                        ? "Creating..."
                        : "Create my campaign →"}
                    </TitliButton>

                    <p className="pt-1 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#555]">
                      No leaderboards · Every rupee counts
                    </p>
                  </form>
                </>
              ) : (
                /* SUCCESS */
                <div className="py-12 text-center">
                  <ButterflyLogo size={60} tone="pink" />

                  <h2 className="mt-6 text-[30px] font-extrabold text-[#111]">
                    Campaign created 🎉
                  </h2>

                  <p className="mx-auto mt-3 max-w-[380px] text-[15px] leading-6 text-[#444]">
                    Check your email{" "}
                    <span className="font-semibold text-titli-action">
                      {form.email}
                    </span>{" "}
                    for your shareable link and QR poster.
                  </p>

                  <Link to="/">
                    <TitliButton className="mt-8">
                      Back to home →
                    </TitliButton>
                  </Link>
                </div>
              )}

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
