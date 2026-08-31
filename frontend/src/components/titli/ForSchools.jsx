import React from "react";
import { motion } from "framer-motion";
import { BENTO } from "@/constants/testIds";
import { EyebrowLabel, TitliButton, Chip } from "./TitliButton";

const IMG = "https://www.titlifoundation.in/images/caro%202.png";
const IMG2 = "https://www.titlifoundation.in/images/caro%204.png";

function Card({ children, className = "", index = 0 }) {
  return (
    <motion.div
      data-testid={BENTO.card(index)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      whileHover={{ y: -6 }}
      className={`relative group overflow-hidden rounded-[32px] border border-black/[0.05] shadow-soft transition-shadow duration-500 hover:shadow-lift ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ForSchools({ onRegister }) {
  return (
    <section
      id="schools"
      data-testid={BENTO.section}
      className="relative py-32 md:py-40 bg-[#FEF1F8]"
    >
      <div className="titli-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <EyebrowLabel>For Schools</EyebrowLabel>

            <h2 className="mt-6 font-sans font-extrabold text-[42px] md:text-[64px] leading-[1.02] tracking-tight balance max-w-[720px] text-[#111]">
              Everything your school gets. Nothing you pay.
            </h2>
          </div>

          <TitliButton size="lg" onClick={onRegister}>
            Register your school →
          </TitliButton>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Card 1 */}
          <Card
            index={0}
            className="col-span-12 md:col-span-7 min-h-[440px] bg-[#111] text-white"
          >
            <img
              src={IMG}
              alt="Community workshop"
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-900 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-transparent" />

            <div className="relative p-8 md:p-12 flex flex-col justify-end h-full min-h-[440px]">
              <h3 className="font-sans font-extrabold text-[28px] md:text-[40px] leading-[1.1] balance max-w-[440px]">
                A live dashboard for every coordinator.
              </h3>

              <p className="mt-4 max-w-[400px] text-[15px] text-white/80 leading-[1.65]">
                Track how many students launched, how much has been raised, who
                to thank. Export tax-exempt receipts in one click.
              </p>
            </div>
          </Card>

          {/* Card 2 */}
          <Card
            index={1}
            className="col-span-12 md:col-span-5 min-h-[440px] bg-white"
          >
            <div className="p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-extrabold text-[28px] md:text-[36px] leading-[1.05] text-[#111]">
                  Free to run.
                  <br />
                  Forever.
                </h3>

                <p className="mt-4 text-[15px] text-[#4A4A4A] leading-[1.65] font-body">
                  Your school pays nothing, ever. 100% of raised funds route to
                  Titli&apos;s field work. Platform costs are underwritten by
                  our founding donors.
                </p>
              </div>

              <div className="mt-8 font-sans font-extrabold text-[72px] leading-none text-[#EC5A99]">
                ₹0
                <span className="text-[24px] text-black/40 font-semibold">
                  /year
                </span>
              </div>
            </div>
          </Card>

          {/* Card 3 */}
          <Card
            index={2}
            className="col-span-12 md:col-span-4 min-h-[320px] bg-white"
          >
            <div className="p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-extrabold text-[24px] md:text-[28px] leading-[1.1] text-[#111]">
                  80G receipts.
                  <br />
                  Instant. Every donor.
                </h3>
              </div>

              <div className="mt-6 text-[13px] text-[#4A4A4A]">
                Auto-issued to parents, alumni, and family who contribute.
              </div>
            </div>
          </Card>

          {/* Card 4 */}
          <Card
            index={3}
            className="col-span-12 md:col-span-4 min-h-[320px] bg-[#FFFBF7]"
          >
            <div className="p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-extrabold text-[24px] md:text-[28px] leading-[1.1] text-[#111]">
                  A named coordinator on WhatsApp.
                </h3>
              </div>

              <div className="mt-6 text-[13px] text-[#4A4A4A]">
                Real human, same person, whole year.
              </div>
            </div>
          </Card>

          {/* Card 5 */}
          <Card
            index={4}
            className="col-span-12 md:col-span-4 min-h-[320px] bg-white"
          >
            <div className="grid grid-cols-2 h-full">
              <div className="relative overflow-hidden">
                <img
                  src={IMG2}
                  alt="Titli workshop"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-900 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-extrabold text-[20px] leading-[1.15] text-[#111]">
                    A photo & signature from every girl you helped.
                  </h3>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}