import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TitliButton } from "@/components/titli/TitliButton";
import { ButterflyLogo } from "@/components/titli/ButterflyLogo";
import { useAuth } from "@/auth/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SIZES = ["Under 300", "300 – 800", "800 – 1500", "1500+"];

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

export default function SchoolRegisterPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [form, setForm] = useState({
    school_name: "",
    city: "",
    coordinator_name: "",
    coordinator_email: "",
    phone: "",
    size: SIZES[1],
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const required = [
      "school_name",
      "city",
      "coordinator_name",
      "coordinator_email",
      "password",
    ];

    if (required.some((key) => !form[key].trim()))
      return setError("Please fill all required fields.");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.coordinator_email))
      return setError("Please enter a valid coordinator email.");

    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/schools/register`,
        form
      );

      if (data.access_token)
        setSession(data.access_token, data.coordinator);

      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FFF1F7] px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1180px] items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_560px] lg:gap-20">

          {/* LEFT */}
          <section className="hidden lg:block">
            <Link
              to="/"
              className="inline-flex items-center gap-3 cursor-pointer"
              aria-label="Titli Foundation home"
            >
              <ButterflyLogo size={72} tone="pink" />

              <div>
                <div className="text-[17px] font-extrabold tracking-tight text-[#EC5A99]">
                  Titli Foundation
                </div>
              </div>
            </Link>

            <div className="mt-16 max-w-[430px]">
              <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8F4A69]">
                School registration
              </div>

              <h1 className="font-sans text-[52px] font-extrabold leading-[.95] tracking-[-0.04em] text-[#111]">
                Bring your
                <br />
                school <span className="text-[#EC5A99]">on board.</span>
              </h1>

              <p className="mt-6 max-w-[390px] text-[15px] leading-7 text-[#444]">
                Create your school account and give students access to
                meaningful menstrual health education and resources.
              </p>

              <div className="mt-9 space-y-5">
                {[
                  ["01", "Register your school", "Tell us about your school and coordinator."],
                  ["02", "Access your dashboard", "Manage your school participation."],
                  ["03", "Start making an impact", "Help students access better resources."],
                ].map(([num, title, text]) => (
                  <div key={num} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EC5A99] text-[9px] font-bold text-white">
                      {num}
                    </span>

                    <div>
                      <p className="text-[12px] font-bold text-[#111]">
                        {title}
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#555]">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MOBILE LOGO */}
          <Link
            to="/"
            className="mb-2 inline-flex items-center gap-3 cursor-pointer lg:hidden"
            aria-label="Titli Foundation home"
          >
            <ButterflyLogo size={38} tone="pink" />

            <div>
              <div className="text-[16px] font-extrabold text-[#EC5A99]">
                Titli Foundation
              </div>
            </div>
          </Link>

          {/* REGISTRATION CARD */}
          <section className="w-full">
            <div className="rounded-[30px] border border-[#E8C8D6] bg-[#FFFBF7] p-7 shadow-[0_22px_55px_rgba(30,20,25,.10)] md:p-10">

              <div className="mb-7">
                <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8F4A69]">
                  School registration
                </div>

                <h2 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-[#111] md:text-[36px]">
                  Registration details
                </h2>

                <p className="mt-2 max-w-[470px] text-[13px] leading-5 text-[#444]">
                  Create your school account. Your dashboard will be available
                  immediately after registration.
                </p>

                {/* PROGRESS */}
                <div className="mt-5">
                  <div className="flex gap-2">
                    <span className="h-[3px] flex-1 rounded-full bg-[#EC5A99]" />
                    <span className="h-[3px] flex-1 rounded-full bg-[#F3DCE7]" />
                    <span className="h-[3px] flex-1 rounded-full bg-[#F3DCE7]" />
                  </div>

                  <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#888]">
                    Step 1 · School information
                  </div>
                </div>
              </div>

              <form onSubmit={submit} className="space-y-4">

                <Field label="School name">
                  <input
                    className={input}
                    value={form.school_name}
                    onChange={update("school_name")}
                    placeholder="Delhi Public School, R.K. Puram"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="City">
                    <input
                      className={input}
                      value={form.city}
                      onChange={update("city")}
                      placeholder="New Delhi"
                    />
                  </Field>

                  <Field label="School size">
                    <select
                      className={input}
                      value={form.size}
                      onChange={update("size")}
                    >
                      {SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size} students
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Coordinator name">
                  <input
                    className={input}
                    value={form.coordinator_name}
                    onChange={update("coordinator_name")}
                    placeholder="Ms. Priya Sharma"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Coordinator email">
                    <input
                      type="email"
                      autoComplete="username"
                      className={input}
                      value={form.coordinator_email}
                      onChange={update("coordinator_email")}
                      placeholder="coordinator@school.edu"
                    />
                  </Field>

                  <Field label="Phone (optional)">
                    <input
                      className={input}
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 ..."
                    />
                  </Field>
                </div>

                <Field label="Create password (8+ chars)">
                  <input
                    type="password"
                    autoComplete="new-password"
                    className={input}
                    value={form.password}
                    onChange={update("password")}
                    placeholder="••••••••"
                  />
                </Field>

                {error && (
                  <div className="rounded-2xl border border-[#EC5A99]/25 bg-[#EC5A99]/5 px-4 py-3 text-[12px] text-[#B83268]">
                    {error}
                  </div>
                )}

                <TitliButton
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="!mt-6 w-full justify-center"
                >
                  {loading ? "Creating account..." : "Register school →"}
                </TitliButton>

              </form>

              <div className="mt-7 border-t border-black/10 pt-5 text-center text-[12px] text-[#444]">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#EC5A99] hover:underline"
                >
                  Sign in
                </Link>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}