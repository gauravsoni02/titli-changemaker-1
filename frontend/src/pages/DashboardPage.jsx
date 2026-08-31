import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TitliButton, Chip } from "@/components/titli/TitliButton";
import { TitliButterfly } from "@/components/titli/ScriptAccent";
import { ButterflyLoader } from "@/components/titli/ButterflyLoader";
import { useAuth } from "@/auth/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function StatCard({ label, value, suffix = "", prefix = "", note, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      className="rounded-[24px] bg-white border border-black/[0.05] shadow-soft p-6 md:p-7"
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-titli-action font-bold mb-3">0{i + 1}</div>
      <div className="font-sans font-extrabold text-[40px] md:text-[52px] leading-[0.95] tracking-tight text-[#111]">
        {prefix}<CountUp end={value} duration={1.6} separator=","/>{suffix}
      </div>
      <div className="mt-3 text-[13px] font-semibold text-[#111]">{label}</div>
      {note && <div className="text-[12px] text-[#4A4A4A] mt-1 font-body">{note}</div>}
    </motion.div>
  );
}

export default function DashboardPage() {
  const nav = useNavigate();
  const { coordinator, logout, token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (coordinator === false) { nav("/login"); return; }
    if (!coordinator) return;
    (async () => {
      try {
        const { data } = await axios.get(`${API}/schools/dashboard`);
        setData(data);
      } catch (e) {
        setError("Could not load dashboard");
      }
    })();
  }, [coordinator, nav]);

  const exportCSV = async () => {
    try {
      setExporting(true);
      const res = await axios.get(`${API}/schools/export/80g`, {
        responseType: "blob",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      const cd = res.headers["content-disposition"] || "";
      const m = /filename="?([^"]+)"?/.exec(cd);
      a.download = m ? m[1] : "titli-80g-export.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  if (!coordinator || coordinator === null) {
    return (
      <div className="min-h-screen bg-[#FEF1F8] flex items-center justify-center">
        <ButterflyLoader size={64} label="Loading your dashboard"/>
      </div>
    );
  }

  const summary = data?.summary || {};
  const campaigns = data?.campaigns || [];

  return (
    <div className="min-h-screen bg-[#FEF1F8]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#FEF1F8]/85 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="titli-container flex items-center justify-between h-[76px]">
          <Link to="/" className="flex items-center gap-3 group">
            <TitliButterfly size={26} className="transition-transform group-hover:scale-110"/>
            <div className="hidden sm:block">
              <div className="font-sans font-extrabold text-[13px] tracking-[0.18em] text-titli-action uppercase">Titli Foundation</div>
              <div className="text-[11px] text-black/50 -mt-0.5">School Dashboard</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-[13px] text-black/70">
              <span className="font-semibold text-[#111]">{coordinator.coordinator_name}</span>
              <span className="text-black/40"> · {coordinator.coordinator_email}</span>
            </div>
            <TitliButton variant="ghost" size="sm" onClick={() => { logout(); nav("/"); }} data-testid="logout-btn">
              Sign out
            </TitliButton>
          </div>
        </div>
      </header>

      <main className="titli-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Chip>Live · in your name</Chip>
            <h1 className="mt-4 font-sans font-extrabold text-[36px] md:text-[52px] leading-[1] tracking-tight text-[#111]">
              {coordinator.school_name}
            </h1>
            <p className="mt-2 text-[15px] text-[#4A4A4A] font-body">
              {coordinator.city} · Coordinator: {coordinator.coordinator_name}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <TitliButton
              size="lg"
              onClick={exportCSV}
              disabled={exporting}
              data-testid="export-80g-btn"
              glow
            >
              {exporting ? (
                <span className="inline-flex items-center gap-2">
                  <ButterflyLoader size={18} tone="white"/>
                  Preparing…
                </span>
              ) : (
                "Export 80G receipts (CSV) ↓"
              )}
            </TitliButton>
          </div>
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-[20px] bg-white border border-titli-action/30 p-4 text-titli-action text-[14px]">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard i={0} label="Campaigns" value={summary.campaigns_count || 0} note="students onboard"/>
          <StatCard i={1} label="Active" value={summary.active_campaigns || 0} note="raising right now"/>
          <StatCard i={2} label="Raised" value={summary.total_raised || 0} prefix="₹" note="across your school"/>
          <StatCard i={3} label="Target" value={summary.total_target || 0} prefix="₹" note="collective goal"/>
        </div>

        {/* Campaigns table */}
        <section className="mt-14 rounded-[28px] bg-white border border-black/[0.05] shadow-soft overflow-hidden">
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-black/[0.06]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-titli-action font-bold">All campaigns</div>
              <h2 className="mt-1 font-sans font-extrabold text-[22px] md:text-[26px] tracking-tight text-[#111]">
                Every student, every rupee.
              </h2>
            </div>
            <div className="text-[13px] text-black/60 font-medium">{campaigns.length} total</div>
          </div>

          {campaigns.length === 0 ? (
            <div className="p-10 md:p-16 text-center">
              <div className="flex justify-center mb-4 opacity-70"><TitliButterfly size={40}/></div>
              <div className="font-sans font-bold text-[18px] text-[#111]">No campaigns yet.</div>
              <p className="mt-2 text-[14px] text-[#4A4A4A] max-w-[360px] mx-auto font-body">
                Share your school&apos;s registration with class reps — every fundraiser will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead className="bg-[#FEF1F8]">
                  <tr className="text-left">
                    <Th>Student</Th>
                    <Th>Grade</Th>
                    <Th>Target</Th>
                    <Th>Raised</Th>
                    <Th>Progress</Th>
                    <Th>Status</Th>
                    <Th>Started</Th>
                  </tr>
                </thead>
                <tbody data-testid="campaigns-table">
                  {campaigns.map((c) => {
                    const pct = c.target_amount > 0 ? Math.min(100, (c.raised_amount / c.target_amount) * 100) : 0;
                    return (
                      <tr key={c.id} className="border-t border-black/[0.05] hover:bg-[#FEF1F8]/40 transition-colors">
                        <Td>
                          <div className="font-semibold text-[#111]">{c.student_name}</div>
                          <div className="text-[12px] text-black/45">{c.email}</div>
                        </Td>
                        <Td className="text-black/70">{c.grade || "—"}</Td>
                        <Td className="text-black/70">₹{Number(c.target_amount || 0).toLocaleString()}</Td>
                        <Td>
                          <span className="font-semibold text-titli-action">₹{Number(c.raised_amount || 0).toLocaleString()}</span>
                        </Td>
                        <Td>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 md:w-32 rounded-full bg-black/10 overflow-hidden">
                              <div className="h-full bg-[#EC5A99]" style={{ width: `${pct}%` }}/>
                            </div>
                            <span className="text-[12px] text-black/55">{pct.toFixed(0)}%</span>
                          </div>
                        </Td>
                        <Td>
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] uppercase tracking-widest font-bold ${
                            c.status === "active" ? "bg-[#FEF1F8] text-titli-action border border-[#FFC5DE]"
                            : "bg-black/5 text-black/60 border border-black/10"
                          }`}>{c.status || "active"}</span>
                        </Td>
                        <Td className="text-black/55 text-[12px]">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-10 text-[12px] text-black/45 text-center uppercase tracking-[0.2em] font-semibold">
          80G · 12A · #BreakTheTaboo · Titli Foundation
        </div>
      </main>
    </div>
  );
}

const Th = ({ children }) => (
  <th className="px-6 md:px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-black/55 font-bold">{children}</th>
);
const Td = ({ children, className = "" }) => (
  <td className={`px-6 md:px-8 py-4 ${className}`}>{children}</td>
);
