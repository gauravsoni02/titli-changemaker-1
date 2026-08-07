import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { TitliButton } from "./TitliButton";
import { DONATE } from "@/constants/testIds";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PACKAGES = [
  { id: "spark", amount: 500, label: "Spark", note: "10 books to a classroom" },
  { id: "seed", amount: 1500, label: "Seed", note: "One teacher training day" },
  { id: "grow", amount: 5000, label: "Grow", note: "A full library corner" },
];

export function DonateModal({ open, onClose }) {
  const [selected, setSelected] = useState("seed");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    const isCustom = selected === "custom";
    const amt = isCustom ? parseFloat(custom) : null;
    if (isCustom && (!amt || amt < 100)) {
      setError("Minimum custom amount is 100");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/donations/checkout`, {
        package_id: selected,
        custom_amount: isCustom ? amt : undefined,
        origin_url: window.location.origin,
      });
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (e) {
      setError("Could not start checkout. Try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid={DONATE.modal}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] bg-[#FFFBF7] rounded-[36px] p-8 md:p-10 shadow-hero border border-black/[0.06]"
          >
            <button
              data-testid={DONATE.close}
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 transition-all"
              aria-label="Close"
            >
              ×
            </button>

            <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99]">
              Support Titli · one gift
            </div>
            <h3 className="mt-4 font-editorial text-[34px] leading-[1.05] tracking-tight text-black">
              Choose your <span className="italic text-[#EC5A99]">gift.</span>
            </h3>
            <p className="mt-3 text-[14px] text-[#4A4A4A]">
              Every rupee reaches a specific classroom. You'll get a photograph.
            </p>

            <div className="mt-8 space-y-3">
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  data-testid={DONATE.option(p.id)}
                  onClick={() => setSelected(p.id)}
                  className={`w-full flex items-center justify-between rounded-[20px] px-5 py-4 border transition-all duration-300 ease-titli text-left ${
                    selected === p.id
                      ? "border-[#EC5A99] bg-[#FEF1F8]"
                      : "border-black/10 bg-white hover:border-black/30"
                  }`}
                >
                  <div>
                    <div className="text-[15px] font-medium text-black">
                      {p.label}
                    </div>
                    <div className="text-[13px] text-[#4A4A4A]">{p.note}</div>
                  </div>
                  <div className="font-editorial text-[24px] text-[#EC5A99]">
                    ${p.amount}
                  </div>
                </button>
              ))}

              <button
                data-testid={DONATE.option("custom")}
                onClick={() => setSelected("custom")}
                className={`w-full rounded-[20px] px-5 py-4 border transition-all duration-300 ease-titli ${
                  selected === "custom"
                    ? "border-[#EC5A99] bg-[#FEF1F8]"
                    : "border-black/10 bg-white hover:border-black/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[15px] font-medium text-black">
                    Custom amount
                  </div>
                  <div className="text-[13px] text-[#4A4A4A]">min $100</div>
                </div>
                {selected === "custom" && (
                  <div className="mt-3 flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-black/10">
                    <span className="text-[15px] text-black/50">$</span>
                    <input
                      data-testid={DONATE.customInput}
                      type="number"
                      min="100"
                      placeholder="e.g. 2500"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      className="flex-1 outline-none bg-transparent text-[15px]"
                    />
                  </div>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 text-[13px] text-[#EC5A99]">{error}</div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <TitliButton
                size="lg"
                onClick={submit}
                data-testid={DONATE.submit}
                disabled={loading}
                className="flex-1 justify-center"
              >
                {loading ? "Redirecting…" : "Continue to secure checkout →"}
              </TitliButton>
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-black/45 text-center">
              Powered by Stripe · 80G eligible · SSL secured
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
