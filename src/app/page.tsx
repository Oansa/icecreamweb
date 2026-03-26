"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Check,
  ChevronRight,
  Clock3,
  Coins,
  Menu,
  Moon,
  Network,
  Play,
  Sparkles,
  Star,
  Zap,
  X,
  MessageSquare,
  Globe,
  Shield,
  ShieldCheck,
  Disc,
  GitBranch,
  Link2,
} from "lucide-react";

type SocialLink = { href: string; label: string; icon: React.ReactNode };

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ScrollTo({
  targetId,
  className,
  children,
  onAfterScroll,
}: {
  targetId: string;
  className?: string;
  children: React.ReactNode;
  onAfterScroll?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => onAfterScroll?.(), 250);
      }}
    >
      {children}
    </button>
  );
}

function RippleButton({
  variant,
  className,
  onClick,
  children,
}: {
  variant: "primary" | "secondary" | "gradient" | "glass" | "white";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLButtonElement | null>(null);
  const [ripples, setRipples] = useState<
    Array<{ id: string; x: number; y: number; size: number }>
  >([]);

  const base =
    "relative overflow-hidden rounded-full px-6 py-3 font-semibold transition-transform active:scale-[0.99]";

  const styles: Record<typeof variant, string> = {
    primary:
      "bg-[#ff6b9d] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_10px_30px_rgba(255,107,157,0.25)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_12px_36px_rgba(255,107,157,0.34)]",
    gradient:
      "bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_50px_rgba(192,132,252,0.28)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_22px_60px_rgba(192,132,252,0.38)]",
    glass:
      "bg-white/[0.05] text-[#F8FAFC] border border-white/[0.10] backdrop-blur-xl hover:bg-white/[0.08]",
    secondary:
      "bg-white/[0.03] text-[#F8FAFC] border border-white/[0.10] backdrop-blur-xl hover:bg-white/[0.06]",
    white:
      "bg-[#F8FAFC] text-black shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_18px_44px_rgba(255,255,255,0.12)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.14),0_22px_54px_rgba(255,255,255,0.18)]",
  };

  return (
    <button
      ref={rootRef}
      type="button"
      className={cn(base, styles[variant], className)}
      onClick={(e) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const size = Math.max(rect.width, rect.height) * 0.7;
          const id = `${Date.now()}-${Math.random()}`;
          setRipples((prev) => [...prev, { id, x, y, size }]);
          window.setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
          }, 650);
        }
        onClick?.();
      }}
    >
      <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/35"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            transform: "translate(-50%,-50%)",
            animation: "iceRipple 650ms ease-out forwards",
          }}
        />
      ))}
      {children}
    </button>
  );
}

function CursorGlow() {
  useEffect(() => {
    let raf = 0;
    const handle = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty("--cursor-x", `${x}%`);
        document.documentElement.style.setProperty("--cursor-y", `${y}%`);
      });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handle);
    };
  }, []);

  return <div className="cursor-glow" />;
}

function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const progress = height > 0 ? scrollTop / height : 0;
      progressRef.current && (progressRef.current.style.width = `${progress * 100}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/5">
      <div
        ref={progressRef}
        className="h-full w-0 bg-[linear-gradient(90deg,#FF6B9D,#C084FC,#38BDF8)]"
      />
    </div>
  );
}

function IceCreamLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="iceLogo" x1="4" y1="3" x2="26" y2="26">
            <stop stopColor="#FF6B9D" />
            <stop offset="0.5" stopColor="#C084FC" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <path
          d="M10.2 5.4C10.9 4.1 12.3 3.2 13.9 3.2H16C17.6 3.2 19 4.1 19.7 5.4L23.1 12.1C24 13.8 23.9 15.9 22.9 17.5C21.3 20.1 18.4 21.8 15.1 21.8C11.8 21.8 8.9 20.1 7.3 17.5C6.3 15.9 6.2 13.8 7.1 12.1L10.2 5.4Z"
          stroke="url(#iceLogo)"
          strokeWidth="1.6"
        />
        <path
          d="M9.2 21.2L6.8 25.6H23.2L20.8 21.2H9.2Z"
          fill="url(#iceLogo)"
          opacity="0.95"
        />
        <path
          d="M12.2 10.4C12.8 9.3 14 8.6 15.3 8.6C16.6 8.6 17.8 9.3 18.4 10.4"
          stroke="url(#iceLogo)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight">
          Ice Cream
        </span>
      </div>
    </div>
  );
}

function SectionReveal({
  children,
  className,
  stagger = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };
  const child = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      className={className}
      variants={stagger ? parent : undefined}
      initial="hidden"
      whileInView={stagger ? "show" : undefined}
      viewport={{ once: true, margin: "-120px 0px -40px" }}
    >
      {React.Children.map(children, (childEl) => {
        if (!stagger || !React.isValidElement(childEl)) return childEl;
        return React.cloneElement(childEl as any, { variants: child } as any);
      })}
    </motion.section>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socialProofAvatars = useMemo(
    () => [
      { initials: "AK", bg: "from-[#FF6B9D] to-[#C084FC]" },
      { initials: "NO", bg: "from-[#4ADE80] to-[#38BDF8]" },
      { initials: "LH", bg: "from-[#C084FC] to-[#FB923C]" },
      { initials: "SA", bg: "from-[#38BDF8] to-[#FACC15]" },
      { initials: "KT", bg: "from-[#FB923C] to-[#FF6B9D]" },
    ],
    []
  );

  const tickerStats = useMemo(
    () => [
      "$2.1M traded by agents",
      "2,400+ agents deployed",
      "Base Chain powered",
      "Claude AI integrated",
      "99.8% uptime",
      "6 trading strategies",
      "Built in Nairobi 🇰🇪",
    ],
    []
  );

  const waitlistSubmit = (email: string) => {
    try {
      const key = "icecream_waitlist_v1";
      const raw = localStorage.getItem(key);
      const existing = raw ? JSON.parse(raw) : [];
      existing.push({ email, ts: Date.now() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      // Ignore storage errors for production safety.
    }
  };

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<
    "idle" | "success"
  >("idle");

  const [demoChatStep, setDemoChatStep] = useState(0);
  const [demoNodeStep, setDemoNodeStep] = useState(0);
  const [demoTyping, setDemoTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise((r) => window.setTimeout(r, ms));

    const steps = [
      "Connect wallet — we never touch your private keys.",
      "Describe your Spot strategy in plain English.",
      "Review risk controls and live logic before going live.",
      "Deploy one click to Base blockchain.",
      "Agent is live — trades 24/7 with stop loss protection.",
    ];

    async function loop() {
      while (!cancelled) {
        setDemoChatStep(0);
        setDemoNodeStep(0);
        await wait(600);
        for (let i = 0; i < steps.length; i++) {
          setDemoTyping(true);
          await wait(700);
          setDemoTyping(false);
          setDemoChatStep(i + 1);
          setDemoNodeStep(i + 1);
          await wait(900);
        }
        await wait(3000);
        if (cancelled) break;
      }
    }

    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "How It Works", targetId: "how" },
      { label: "Features", targetId: "features" },
      { label: "Strategies", targetId: "strategies" },
      { label: "Pricing", targetId: "pricing" },
    ],
    []
  );

  return (
    <div className="relative min-h-screen">
      <div className="ice-mesh" />
      <CursorGlow />
      <ScrollProgressBar />

      {/* Navbar */}
      <header
        className={cn(
          "fixed left-0 top-0 z-[50] w-full transition-all",
          navScrolled
            ? "bg-[rgba(10,11,20,0.78)] backdrop-blur-[16px] border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <IceCreamLogo />
            </motion.div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <button
                key={l.targetId}
                type="button"
                onClick={() => {
                  document
                    .getElementById(l.targetId)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ScrollTo
                targetId="waitlist"
                className="relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
              >
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] opacity-95" />
                <span className="absolute inset-0 rounded-full opacity-0 blur-[18px] bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] transition-opacity hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Join Waitlist <ChevronRight className="h-4 w-4" />
                </span>
              </ScrollTo>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-2 text-[#F8FAFC] md:hidden"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Open menu"
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/10 bg-[rgba(10,11,20,0.65)] backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto max-w-6xl px-4 py-3">
                <div className="flex flex-col gap-2">
                  {navLinks.map((l) => (
                    <button
                      key={l.targetId}
                      type="button"
                      className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                      onClick={() => {
                        setNavOpen(false);
                        document
                          .getElementById(l.targetId)
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                  <div className="pt-2">
                    <ScrollTo
                      targetId="waitlist"
                      className="w-full rounded-full bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_55px_rgba(192,132,252,0.30)]"
                      onAfterScroll={() => setNavOpen(false)}
                    >
                      Join Waitlist
                    </ScrollTo>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <main className="relative pt-20">
        <section className="mx-auto grid max-w-6xl items-center px-4 pb-20 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-28">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="scroll-margin"
            >
              <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-xl">
                <span className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#FF6B9D,#C084FC,#4ADE80,#38BDF8,#FF6B9D)] opacity-75 blur-[14px] ice-animate-spin-slow" />
                <span className="relative flex items-center gap-2">
                  <span aria-hidden>🍦</span>
                  Now in Beta — Join 2,400+ traders
                </span>
              </div>

              <div className="mt-7">
                <h1 className="font-[var(--font-nunito)] text-[54px] leading-[1.02] tracking-tight sm:text-[66px] md:text-[74px]">
                  <span className="block text-white">Build AI Agents</span>
                  <span className="block bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] bg-clip-text text-transparent">
                    That Trade Crypto
                  </span>
                  <span className="block text-white">For You.</span>
                </h1>
              </div>

              <p className="mt-5 max-w-[580px] text-[17px] leading-[1.75] text-[#94A3B8]">
                No code. No terminals. No complexity. Just describe your strategy
                in plain English and deploy a trading agent to the blockchain in
                minutes.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                  <RippleButton variant="gradient" className="w-full sm:w-auto">
                    <span className="inline-flex items-center gap-2">
                      Start Building Free <ChevronRight className="h-4 w-4" />
                    </span>
                  </RippleButton>
                </motion.div>

                <RippleButton variant="glass" className="w-full sm:w-auto">
                  <span className="inline-flex items-center gap-2">
                    <Play className="h-4 w-4" /> Watch Demo
                  </span>
                </RippleButton>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
                <div className="flex -space-x-2">
                  {socialProofAvatars.map((a, idx) => (
                    <div
                      key={a.initials}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br",
                        "text-xs font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                        idx === 0 ? "" : "",
                        a.bg
                      )}
                      style={{
                        backgroundImage:
                          `linear-gradient(135deg, ${
                            idx % 2 === 0 ? "#FF6B9D" : "#C084FC"
                          }, ${
                            idx % 3 === 0 ? "#38BDF8" : "#4ADE80"
                          })`,
                      }}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-semibold text-[#94A3B8]">
                  Join 2,400+ traders already building agents
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden md:block">
            <div className="relative h-[560px] w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 transform-gpu ice-animate-bob"
                style={{ transform: "rotateX(8deg) rotateY(-4deg) translateZ(0)" }}
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.05] backdrop-blur-xl shadow-[0_30px_90px_rgba(192,132,252,0.12)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,107,157,0.22),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.20),transparent_58%)] opacity-70" />
                  <div className="relative grid h-[470px] grid-cols-5">
                    {/* Chat */}
                    <div className="col-span-3 border-r border-white/10 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white/80">
                          Agent Builder
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
                          <span className="inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
                          Live preview
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-2xl bg-white/5 p-3 text-xs leading-relaxed text-[#F8FAFC]">
                          <div className="font-bold text-white/90">You</div>
                          Connect wallet to Base and deploy a Spot trading bot.
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-[#FF6B9D]/25 to-[#C084FC]/25 p-3 text-xs leading-relaxed text-[#F8FAFC] border border-white/10">
                          <div className="font-bold text-white/90">Ice Cream AI</div>
                          I’ll build a strategy with risk checks, stop loss, and
                          24/7 execution.
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3 text-xs leading-relaxed text-[#F8FAFC]">
                          <div className="font-bold text-white/90">You</div>
                          Target: ETH/USDC. Average return with high win rate.
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-white/80">
                          <MessageSquare className="h-4 w-4" />
                          Plan (Auto)
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-white/5 p-2 text-[11px] text-[#94A3B8]">
                            Trigger: Price action
                          </div>
                          <div className="rounded-xl bg-white/5 p-2 text-[11px] text-[#94A3B8]">
                            Action: Place spot trade
                          </div>
                          <div className="rounded-xl bg-white/5 p-2 text-[11px] text-[#94A3B8]">
                            Risk: Stop loss
                          </div>
                          <div className="rounded-xl bg-white/5 p-2 text-[11px] text-[#94A3B8]">
                            Mode: 24/7
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="col-span-2 p-5">
                      <div className="text-xs font-bold text-white/80">Preview</div>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <div className="text-[11px] font-bold text-white/90">
                            Trigger
                          </div>
                          <div className="mt-2 flex items-center justify-center">
                            <div className="h-9 w-9 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center">
                              <Clock3 className="h-4 w-4 text-[#38BDF8]" />
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <div className="text-[11px] font-bold text-white/90">
                            Action
                          </div>
                          <div className="mt-2 flex items-center justify-center">
                            <div className="h-9 w-9 rounded-full bg-[#FF6B9D]/20 border border-[#FF6B9D]/30 flex items-center justify-center">
                              <Coins className="h-4 w-4 text-[#FF6B9D]" />
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <div className="text-[11px] font-bold text-white/90">
                            Risk
                          </div>
                          <div className="mt-2 flex items-center justify-center">
                            <div className="h-9 w-9 rounded-full bg-[#FB923C]/20 border border-[#FB923C]/30 flex items-center justify-center">
                              <ShieldCheck className="h-4 w-4 text-[#FB923C]" />
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <div className="text-[11px] font-bold text-white/90">
                            Deploy
                          </div>
                          <div className="mt-2 text-[11px] leading-relaxed text-[#94A3B8]">
                            One click to Base, fully transparent.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges around mockup */}
              {[
                {
                  title: "ETH/USDC +12.4% today",
                  top: "8%",
                  left: "6%",
                  color: "from-[#FF6B9D] to-[#C084FC]",
                },
                {
                  title: "Agent deployed to Base",
                  top: "18%",
                  left: "76%",
                  color: "from-[#38BDF8] to-[#4ADE80]",
                },
                {
                  title: "Sniper Bot — Live",
                  top: "60%",
                  left: "10%",
                  color: "from-[#FB923C] to-[#FACC15]",
                },
                {
                  title: "Stop loss triggered — saved $240",
                  top: "64%",
                  left: "72%",
                  color: "from-[#C084FC] to-[#38BDF8]",
                },
                {
                  title: "Risk tuned by Claude",
                  top: "40%",
                  left: "62%",
                  color: "from-[#4ADE80] to-[#38BDF8]",
                },
              ].map((b, idx) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 * idx }}
                  className={cn(
                    "absolute rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-4 py-3 text-xs font-bold text-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                  )}
                  style={{ top: b.top, left: b.left }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div
                    className={cn(
                      "absolute -inset-px rounded-2xl bg-gradient-to-r opacity-20",
                      b.color
                    )}
                  />
                  <div className="relative">{b.title}</div>
                  <motion.div
                    className="relative mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-white/30 to-white/0 opacity-60"
                    animate={{ scaleX: [0.6, 1.0, 0.6] }}
                    transition={{ duration: 2.2 + idx * 0.5, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <div className="border-y border-white/10 bg-white/[0.03] py-4">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6">
            <div className="flex-1 overflow-hidden">
              <div className="ice-ticker-anim flex w-[200%] items-center gap-3">
                {[...tickerStats, ...tickerStats].map((t, idx) => (
                  <div
                    key={`${t}-${idx}`}
                    className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-[#94A3B8]"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-[linear-gradient(135deg,#FF6B9D,#C084FC,#38BDF8)]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <section id="how" className="scroll-margin mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              From idea to live agent in minutes
            </h2>
            <div className="mt-4 h-1 w-28 bg-[#4ADE80] blur-[0.2px]" />
          </motion.div>

          <HowItWorks />
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-margin mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <h2 className="font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              Everything you need to trade smarter
            </h2>
            <div className="mt-4 h-1 w-24 bg-[#FB923C]" />
          </motion.div>

          <FeaturesGrid />
        </section>

        {/* Strategies */}
        <section
          id="strategies"
          className="scroll-margin mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              <span className="bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] bg-clip-text text-transparent">
                Six strategies.
              </span>{" "}
              Infinite possibilities.
            </h2>
          </motion.div>

          <TradingStrategies />
        </section>

        {/* Live Demo */}
        <section className="scroll-margin mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              See it in action
            </h2>
          </motion.div>
          <LiveDemo demoChatStep={demoChatStep} demoNodeStep={demoNodeStep} demoTyping={demoTyping} />
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="scroll-margin mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              Simple, transparent pricing
            </h2>
          </motion.div>
          <Pricing />
        </section>

        {/* Testimonials */}
        <section className="scroll-margin mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              🧊 Traders love Ice Cream
            </h2>
          </motion.div>
          <Testimonials />
        </section>

        {/* Final CTA + Waitlist */}
        <section className="scroll-margin relative overflow-hidden" id="waitlist">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#FF6B9D_0%,#C084FC_40%,#38BDF8_100%)] opacity-20 bg-[length:200%_200%] animate-[iceFinalGrad_16s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-white/[0.02]" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="text-center">
              <h2 className="font-[var(--font-nunito)] text-5xl font-extrabold text-white">
                Start trading smarter today.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[17px] text-[#94A3B8]">
                Join 2,400+ traders who are already letting AI agents work for
                them on the blockchain.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <RippleButton
                  variant="white"
                  className="px-8 py-4 text-lg font-extrabold"
                  onClick={() => {
                    window.setTimeout(() => {
                      emailInputRef.current?.focus();
                    }, 200);
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    Create Your Free Agent <Sparkles className="h-5 w-5" />
                  </span>
                </RippleButton>
              </div>

              <div className="mt-5 text-sm font-semibold text-[#94A3B8]">
                No credit card required • Free forever plan • Deploy in under 5
                minutes
              </div>

              {/* Waitlist form */}
              <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto mt-8 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!waitlistEmail.trim()) return;
                  waitlistSubmit(waitlistEmail.trim());
                  setWaitlistStatus("success");
                }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      ref={emailInputRef}
                      id="email"
                      value={waitlistEmail}
                      onChange={(e) => {
                        setWaitlistEmail(e.target.value);
                        if (waitlistStatus !== "idle") setWaitlistStatus("idle");
                      }}
                      placeholder="you@company.com"
                      className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 rounded-2xl bg-[linear-gradient(135deg,#FF6B9D_0%,#C084FC_55%,#38BDF8_120%)] px-5 text-sm font-extrabold text-white shadow-[0_20px_60px_rgba(192,132,252,0.26)] transition-transform hover:scale-[1.01]"
                  >
                    {waitlistStatus === "success" ? (
                      <span className="inline-flex items-center gap-2">
                        Added <Check className="h-4 w-4" />
                      </span>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
                <div className="mt-3 text-xs font-semibold text-[#94A3B8]">
                  By joining, you’ll get early access updates and beta launch
                  invites.
                </div>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div className="max-w-sm">
                <IceCreamLogo />
                <div className="mt-3 text-sm font-semibold text-[#94A3B8]">
                  No-code AI blockchain trading agents for everyday traders.
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4 md:w-auto">
                <div>
                  <div className="text-sm font-extrabold text-white">Product</div>
                  {["Features", "Strategies", "Pricing", "Roadmap"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="mt-3 block text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] text-left"
                      onClick={() => {
                        const map: Record<string, string> = {
                          Features: "features",
                          Strategies: "strategies",
                          Pricing: "pricing",
                          Roadmap: "how",
                        };
                        const target = map[t] || "how";
                        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Company</div>
                  {["About", "Blog", "Careers", "Press"].map((t) => (
                    <div
                      key={t}
                      className="mt-3 text-sm font-semibold text-[#94A3B8]"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">
                    Resources
                  </div>
                  {["Docs", "API", "Discord", "X"].map((t) => (
                    <div
                      key={t}
                      className="mt-3 text-sm font-semibold text-[#94A3B8]"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Legal</div>
                  {["Privacy", "Terms", "Security"].map((t) => (
                    <div
                      key={t}
                      className="mt-3 text-sm font-semibold text-[#94A3B8]"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <div className="text-sm font-semibold text-[#94A3B8]">
                © 2025 Ice Cream. Built in Nairobi, Kenya 🇰🇪 • Powered by Base
                Chain and Claude AI.
              </div>
              <div className="flex items-center gap-3">
                {[
                  { Icon: X, label: "X", href: "#" },
                  { Icon: Disc, label: "Discord", href: "#" },
                  { Icon: GitBranch, label: "GitHub", href: "#" },
                  { Icon: Link2, label: "LinkedIn", href: "#" },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );

  function HowItWorks() {
    const steps = [
      {
        n: "1",
        accent: "bg-[#38BDF8]",
        title: "Connect Wallet",
        desc: "Link your Web3 wallet securely. We never touch your private keys.",
      },
      {
        n: "2",
        accent: "bg-[#C084FC]",
        title: "Describe Strategy",
        desc: "Tell our AI what you want in plain English. No jargon required.",
      },
      {
        n: "3",
        accent: "bg-[#FACC15]",
        title: "Review Agent",
        desc: "See your agent's full logic visualised before going live.",
      },
      {
        n: "4",
        accent: "bg-[#4ADE80]",
        title: "Deploy to Chain",
        desc: "One click sends your agent live to Base blockchain.",
      },
      {
        n: "5",
        accent: "bg-[#FB923C]",
        title: "Earn Passively",
        desc: "Your agent trades 24/7 while you track performance in real time.",
      },
    ];

    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
      <div ref={ref} className="mt-12">
        <div className="hidden flex-row items-start gap-6 lg:flex">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <StepCard step={s} />
              {i < steps.length - 1 && <ConnectorLine active={inView} />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((s) => (
            <StepCard key={s.n} step={s} />
          ))}
        </div>
      </div>
    );
  }

  function StepCard({
    step,
  }: {
    step: { n: string; accent: string; title: string; desc: string };
  }) {
    return (
      <motion.div
        className="relative flex-1 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <div className="pointer-events-none absolute left-6 top-2 text-[72px] font-extrabold text-white/5">
          {step.n}
        </div>
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className={cn("h-12 w-12 rounded-2xl border border-white/10", step.accent)} />
            <div>
              <div className="text-sm font-extrabold text-[#F8FAFC]">Step {step.n}</div>
              <div className="mt-1 font-[var(--font-nunito)] text-xl font-extrabold text-white">
                {step.title}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-[#94A3B8]">
            {step.desc}
          </p>
        </div>
      </motion.div>
    );
  }

  function ConnectorLine({ active }: { active: boolean }) {
    return (
      <div className="relative flex h-[172px] flex-1 items-center justify-center">
        <div className="absolute inset-0 rounded-3xl bg-white/[0.02] opacity-40" />
        <svg width="100%" height="60" viewBox="0 0 200 60" className="relative">
          <motion.line
            x1="10"
            y1="30"
            x2="190"
            y2="30"
            stroke="url(#dashGrad)"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 60 }}
            animate={{ strokeDashoffset: active ? 0 : 60 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="dashGrad" x1="0" y1="0" x2="200" y2="0">
              <stop stopColor="#FF6B9D" />
              <stop offset="0.5" stopColor="#C084FC" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  function FeaturesGrid() {
    const cards = [
      {
        title: "No-Code Agent Builder",
        accent: "bg-gradient-to-r from-[#FF6B9D] to-[#C084FC]",
        span: "lg:col-span-7",
        content: (
          <div className="mt-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-white/90">
                  <MessageSquare className="h-4 w-4" />
                  Build in chat
                </div>
                <div className="text-[11px] font-semibold text-[#94A3B8]">
                  Claude understands your intent
                </div>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="rounded-xl bg-white/[0.05] p-3 text-[#F8FAFC]">
                  <div className="font-bold text-white/90">You</div>
                  Make a Spot trading agent for ETH/USDC with stop loss.
                </div>
                <div className="rounded-xl bg-gradient-to-br from-[#FF6B9D]/20 to-[#C084FC]/20 border border-white/10 p-3">
                  <div className="font-bold text-white/90">Ice Cream AI</div>
                  Creating triggers, action logic, and risk checks.
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Live Agent Preview",
        accent: "bg-gradient-to-r from-[#C084FC] to-[#38BDF8]",
        span: "lg:col-span-5",
        content: (
          <div className="mt-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-white/90">
                <Network className="h-4 w-4" />
                Flow diagram
              </div>
              <div className="mt-4 grid grid-cols-3 items-center gap-3">
                <Node label="Trigger" active />
                <Connector />
                <Node label="Action" active />
                <Connector />
                <Node label="Risk" accent />
                <Connector />
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "24/7 Autonomous Trading",
        accent: "bg-[#4ADE80]",
        span: "lg:col-span-4",
        content: (
          <div className="mt-3 text-sm font-semibold leading-relaxed text-[#94A3B8]">
            Agents never sleep. Your portfolio works while you do.
          </div>
        ),
        icon: <Moon className="h-5 w-5" />,
      },
      {
        title: "On-Chain Transparency",
        accent: "bg-[#38BDF8]",
        span: "lg:col-span-4",
        content: (
          <div className="mt-3 text-sm font-semibold leading-relaxed text-[#94A3B8]">
            Every trade is recorded on Base blockchain. Fully verifiable.
          </div>
        ),
        icon: <Globe className="h-5 w-5" />,
      },
      {
        title: "Stop Loss Protection",
        accent: "bg-[#FB923C]",
        span: "lg:col-span-4",
        content: (
          <div className="mt-3 text-sm font-semibold leading-relaxed text-[#94A3B8]">
            AI automatically protects your downside on every position.
          </div>
        ),
        icon: <Shield className="h-5 w-5" />,
      },
      {
        title: "Multi-Strategy Support",
        accent: "bg-[#FACC15]",
        span: "lg:col-span-4",
        content: (
          <div className="mt-3 text-sm font-semibold leading-relaxed text-[#94A3B8]">
            Spot, margin, sniper, meme coins, arbitrage and more.
          </div>
        ),
        icon: <Zap className="h-5 w-5" />,
      },
      {
        title: "Powered by Claude AI",
        accent: "bg-gradient-to-r from-[#FF6B9D] to-[#C084FC]",
        span: "lg:col-span-12",
        content: (
          <div className="mt-3 text-sm font-semibold leading-relaxed text-[#94A3B8]">
            Our agent builder uses Claude, Anthropic&apos;s frontier AI, to
            understand your strategy in natural language and translate it into
            precise on-chain trading logic.
          </div>
        ),
        wide: true,
      },
    ] as const;

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Layout tuned to look asymmetric */}
        <div className="lg:col-span-7">
          <FeatureCard card={cards[0]} />
        </div>
        <div className="lg:col-span-5">
          <FeatureCard card={cards[1]} />
        </div>
        <div className="lg:col-span-4">
          <FeatureCard card={cards[2]} />
        </div>
        <div className="lg:col-span-4">
          <FeatureCard card={cards[3]} />
        </div>
        <div className="lg:col-span-4">
          <FeatureCard card={cards[4]} />
        </div>
        <div className="lg:col-span-12">
          <FeatureCard card={cards[5]} />
        </div>
        <div className="lg:col-span-12">
          <FeatureCard card={cards[6]} />
        </div>
      </div>
    );
  }

  function FeatureCard({ card }: { card: any }) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <div
          className={cn(
            "absolute left-0 top-0 h-[4px] w-full opacity-90",
            card.accent
          )}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-[var(--font-nunito)] text-xl font-extrabold text-white">
                {card.title}
              </div>
            </div>
            {card.icon ? (
              <div className="mt-1 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                {card.icon}
              </div>
            ) : null}
          </div>
          {card.content}
          {card.title === "Powered by Claude AI" ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(255,107,157,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.18),transparent_60%)] p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-extrabold text-white/90">
                  Claude / Anthropic
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-[#94A3B8]">
                  <Sparkles className="h-4 w-4 text-[#C084FC]" />
                  Natural language to on-chain logic
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  }

  function Node({
    label,
    active,
    accent,
  }: {
    label: string;
    active?: boolean;
    accent?: boolean;
  }) {
    return (
      <div className="col-span-1 flex flex-col items-center gap-2">
        <div
          className={cn(
            "h-12 w-12 rounded-2xl border border-white/10 flex items-center justify-center",
            active ? "bg-white/[0.07]" : "bg-white/[0.04]",
            accent ? "bg-[#FB923C]/15 border-[#FB923C]/30" : ""
          )}
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#C084FC]" />
        </div>
        <div className="text-[11px] font-bold text-[#94A3B8]">{label}</div>
      </div>
    );
  }

  function Connector() {
    return <div className="col-span-1 h-[1px] bg-gradient-to-r from-[#FF6B9D]/60 via-[#C084FC]/60 to-[#38BDF8]/60" />;
  }

  function TradingStrategies() {
    const strategies = [
      {
        name: "Spot Trading",
        gradient: "from-[#38BDF8] to-[#4ADE80]",
        difficulty: "Beginner",
        desc: "Automated spot entries with clear risk rules and human-readable strategy logic.",
        stats: { ret: "+8.6% avg", win: "62% win rate", users: "1,280" },
      },
      {
        name: "Sniper Bot",
        gradient: "from-[#FB923C] to-[#FF6B9D]",
        difficulty: "Advanced",
        desc: "Fast execution tuned for breakout windows with stop loss protection and safety caps.",
        stats: { ret: "+18.2% avg", win: "54% win rate", users: "740" },
      },
      {
        name: "Meme Coin Hunter",
        gradient: "from-[#C084FC] to-[#FF6B9D]",
        difficulty: "Advanced",
        desc: "Claude-assisted memecoin scanning with momentum checks and downside throttles.",
        stats: { ret: "+15.1% avg", win: "51% win rate", users: "510" },
      },
      {
        name: "Safe DCA Bot",
        gradient: "from-[#4ADE80] to-[#38BDF8]",
        difficulty: "Beginner",
        desc: "Dollar-cost averaging with volatility-aware sizing and transparent on-chain reporting.",
        stats: { ret: "+6.9% avg", win: "66% win rate", users: "1,020" },
      },
      {
        name: "Arbitrage Scout",
        gradient: "from-[#FACC15] to-[#FB923C]",
        difficulty: "Expert",
        desc: "Spot-to-spot and route-aware opportunities with strict risk filters and fast execution.",
        stats: { ret: "+12.8% avg", win: "58% win rate", users: "620" },
      },
      {
        name: "Swing Trader",
        gradient: "from-[#C084FC] to-[#38BDF8]",
        difficulty: "Intermediate",
        desc: "Multi-day positioning logic with risk gates and stop loss enforcement on every cycle.",
        stats: { ret: "+10.4% avg", win: "60% win rate", users: "860" },
      },
    ] as const;

    return (
      <>
        <div className="flex gap-5 overflow-x-auto pb-2 lg:hidden">
          {strategies.map((s) => (
            <StrategyCard key={s.name} strategy={s} />
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-6 lg:grid">
          {strategies.map((s) => (
            <StrategyCard key={s.name} strategy={s} />
          ))}
        </div>
      </>
    );
  }

  function StrategyCard({
    strategy,
  }: {
    strategy: {
      name: string;
      gradient: string;
      difficulty: string;
      desc: string;
      stats: { ret: string; win: string; users: string };
    };
  }) {
    const difficultyColor =
      strategy.difficulty === "Beginner"
        ? "bg-[#4ADE80]/15 text-[#4ADE80] border-[#4ADE80]/30"
        : strategy.difficulty === "Advanced"
          ? "bg-[#FB923C]/15 text-[#FB923C] border-[#FB923C]/30"
          : strategy.difficulty === "Expert"
            ? "bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/30"
            : "bg-[#C084FC]/15 text-[#C084FC] border-[#C084FC]/30";

    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="min-w-[270px] rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl"
      >
        <div className={cn("rounded-t-3xl p-5 bg-gradient-to-r", strategy.gradient)}>
          <div className="flex items-center justify-between">
            <div className="font-[var(--font-nunito)] text-lg font-extrabold text-white">
              {strategy.name}
            </div>
            <div className={cn("rounded-full border px-3 py-1 text-[11px] font-extrabold", difficultyColor)}>
              {strategy.difficulty}
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm font-semibold leading-relaxed text-[#94A3B8]">
            {strategy.desc}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <StatPill label="Avg Return" value={strategy.stats.ret} />
            <StatPill label="Win Rate" value={strategy.stats.win} />
            <StatPill label="Users" value={strategy.stats.users} />
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm font-extrabold text-white hover:bg-white/[0.09] transition-colors"
          >
            Use This Strategy
          </button>
        </div>
      </motion.div>
    );
  }

  function StatPill({ label, value }: { label: string; value: string }) {
    return (
      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
        <div className="text-[11px] font-extrabold text-white/70">{label}</div>
        <div className="text-[12px] font-extrabold text-white">{value}</div>
      </div>
    );
  }

  function LiveDemo({
    demoChatStep,
    demoNodeStep,
    demoTyping,
  }: {
    demoChatStep: number;
    demoNodeStep: number;
    demoTyping: boolean;
  }) {
    const chatSteps = [
      { who: "You", text: "Connect wallet to Base." },
      { who: "Ice Cream AI", text: "Wallet connected. Next: strategy setup." },
      { who: "You", text: "Describe a Spot Trading agent for ETH/USDC." },
      { who: "Ice Cream AI", text: "Logic generated: triggers, action, and risk nodes." },
      { who: "Ice Cream AI", text: "Deploying now... Agent is live and trading 24/7." },
    ];

    const nodes = [
      { name: "Connect", color: "#38BDF8" },
      { name: "Strategy", color: "#C084FC" },
      { name: "Review", color: "#FACC15" },
      { name: "Deploy", color: "#4ADE80" },
      { name: "Live", color: "#FB923C" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chat */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold text-white">
                Agent Builder Walkthrough
              </div>
              <div className="text-xs font-semibold text-[#94A3B8]">
                Auto-play
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {chatSteps.slice(0, demoChatStep).map((m, idx) => (
                <div
                  key={`${m.who}-${idx}`}
                  className={cn(
                    "max-w-[92%] rounded-2xl border border-white/10 p-3 text-xs font-semibold leading-relaxed",
                    m.who === "You"
                      ? "ml-auto bg-white/[0.05] text-[#F8FAFC]"
                      : "mr-auto bg-gradient-to-br from-[#FF6B9D]/20 to-[#C084FC]/20 text-[#F8FAFC]"
                  )}
                >
                  <div className="text-[11px] font-extrabold text-white/70">
                    {m.who}
                  </div>
                  {m.text}
                </div>
              ))}

              {demoTyping && (
                <div className="mr-auto w-fit rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C084FC] animate-[iceDot_1s_infinite]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B9D] animate-[iceDot_1s_infinite_0.2s]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8] animate-[iceDot_1s_infinite_0.4s]" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview nodes */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-extrabold text-white">
              Live Logic Preview
            </div>
            <div className="mt-2 text-xs font-semibold text-[#94A3B8]">
              Nodes appear as each chat step completes.
            </div>

            <div className="mt-5 grid gap-4">
              <div className="flex items-center gap-3">
                {nodes.map((n, idx) => {
                  const on = idx + 1 <= demoNodeStep;
                  return (
                    <div key={n.name} className="flex-1">
                      <div className="flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: on ? 1 : 0.8, opacity: on ? 1 : 0.25 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          className={cn(
                            "h-12 w-12 rounded-2xl border flex items-center justify-center backdrop-blur-xl",
                            on ? "border-white/20 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"
                          )}
                          style={{
                            boxShadow: on
                              ? `0 0 0 1px rgba(255,255,255,0.08), 0 18px 50px ${n.color}33`
                              : undefined,
                          }}
                        >
                          <div
                            className="h-5 w-5 rounded-full"
                            style={{ background: n.color }}
                          />
                        </motion.div>
                      </div>
                      <div className="mt-2 text-center text-[11px] font-extrabold text-[#94A3B8]">
                        {n.name}
                      </div>
                      {idx < nodes.length - 1 ? (
                        <div className="mt-2 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-[linear-gradient(90deg,#FF6B9D,#C084FC,#38BDF8)]"
                            style={{
                              width: on ? "100%" : "30%",
                              transition: "width 400ms ease",
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-extrabold text-white/80">
                      Trigger / Action / Risk
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[#94A3B8] leading-relaxed">
                      Your chat instructions are translated into deterministic on-chain
                      trading logic.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <Sparkles className="h-5 w-5 text-[#C084FC]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://app.icecream.ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 px-6 text-sm font-extrabold text-white hover:bg-white/[0.09] transition-colors"
          >
            Try It Yourself <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </motion.div>
    );
  }

  function Pricing() {
    const plans = [
      {
        name: "Free",
        price: "$0/mo",
        highlight: false,
        badge: null,
        items: [
          "1 active agent",
          "spot trading only",
          "basic analytics",
          "community support",
        ],
        cta: "Get Started Free",
      },
      {
        name: "Pro",
        price: "$29/mo",
        highlight: true,
        badge: "Most Popular",
        items: [
          "5 active agents",
          "all trading modes",
          "advanced analytics",
          "priority support",
          "strategy marketplace access",
        ],
        cta: "Start Pro Trial",
      },
      {
        name: "Elite",
        price: "$99/mo",
        highlight: false,
        badge: null,
        items: [
          "Unlimited agents",
          "all modes",
          "custom strategies",
          "API access",
          "dedicated support",
          "early access to new features",
        ],
        cta: "Go Elite",
      },
    ] as const;

    return (
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={cn(
              "relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl",
              p.highlight
                ? "border-[2px] border-transparent bg-[rgba(255,255,255,0.04)]"
                : ""
            )}
            style={
              p.highlight
                ? {
                    borderImage:
                      "linear-gradient(135deg,#FF6B9D,#C084FC,#38BDF8) 1",
                  }
                : undefined
            }
          >
            {p.badge ? (
              <div className="absolute -top-3 left-6 rounded-full bg-[linear-gradient(135deg,#FF6B9D,#C084FC)] px-3 py-1 text-xs font-extrabold text-white shadow-[0_20px_70px_rgba(255,107,157,0.20)]">
                {p.badge}
              </div>
            ) : null}

            <div className="text-sm font-extrabold text-[#94A3B8]">
              {p.name}
            </div>
            <div className="mt-2 font-[var(--font-nunito)] text-4xl font-extrabold text-white">
              {p.price}
            </div>

            <div className="mt-5 space-y-2">
              {p.items.map((it) => (
                <div key={it} className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-black/20">
                    <Check className="h-3.5 w-3.5 text-[#4ADE80]" />
                  </span>
                  {it}
                </div>
              ))}
            </div>

            <div className="mt-6">
              {p.highlight ? (
                <RippleButton variant="gradient" className="w-full justify-center" onClick={() => {}}>
                  <span className="inline-flex items-center gap-2">
                    {p.cta} <ChevronRight className="h-4 w-4" />
                  </span>
                </RippleButton>
              ) : (
                <RippleButton variant="glass" className="w-full justify-center" onClick={() => {}}>
                  <span className="inline-flex items-center gap-2">
                    {p.cta} <ChevronRight className="h-4 w-4" />
                  </span>
                </RippleButton>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  function Testimonials() {
    const people = [
      {
        initials: "AN",
        name: "Amina N.",
        city: "Nairobi",
        accent: "from-[#FF6B9D] to-[#C084FC]",
        quote:
          "I didn’t need to learn code. I just described my strategy in chat and my agent started working.",
      },
      {
        initials: "TK",
        name: "Tosin K.",
        city: "Lagos",
        accent: "from-[#38BDF8] to-[#4ADE80]",
        quote:
          "My bot trades while I sleep. The stop loss protection saved me from a brutal move.",
      },
      {
        initials: "EC",
        name: "Esi C.",
        city: "Accra",
        accent: "from-[#C084FC] to-[#FB923C]",
        quote:
          "The live logic preview made it easy to understand what the agent was doing before deployment.",
      },
    ];

    return (
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {people.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br p-0 flex items-center justify-center"
                )}
                style={{ backgroundImage: `linear-gradient(135deg,#FF6B9D,#C084FC)` }}
              >
                <div className="text-sm font-extrabold">{p.initials}</div>
              </div>
              <div>
                <div className="font-[var(--font-nunito)] text-lg font-extrabold text-white">
                  {p.name}
                </div>
                <div className="text-sm font-semibold text-[#94A3B8]">
                  {p.city}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FACC15] text-[#FACC15]" />
              ))}
            </div>

            <div className="mt-4 text-sm font-semibold leading-relaxed text-[#94A3B8]">
              “{p.quote}”
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
}
