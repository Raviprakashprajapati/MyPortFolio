import { useState, useEffect, useRef } from "react";
import Ravi from "./assets/raviphoto.png";
const AVATAR = Ravi;
/* ─── DATA ─── */
const ROLES = ["Full Stack Developer","React Native Developer","MERN Stack Engineer","Mobile App Developer","React Developer"];

const SKILLS = [
  { name:"React Native",  icon:"📱", tag:"Mobile"   },
  { name:"Android",       icon:"🤖", tag:"Mobile"   },
  { name:"iOS",           icon:"🍎", tag:"Mobile"   },
  { name:"React.js",      icon:"⚛️", tag:"Frontend" },
  { name:"Node.js",       icon:"🟩", tag:"Backend"  },
  { name:"Express.js",    icon:"🚂", tag:"Backend"  },
  { name:"MongoDB",       icon:"🍃", tag:"Database" },
  { name:"MySQL",         icon:"🐬", tag:"Database" },
  { name:"JavaScript",    icon:"JS", tag:"Language" },
  { name:"HTML5 & CSS3",  icon:"🌐", tag:"Frontend" },
  { name:"Tailwind CSS",  icon:"💨", tag:"Frontend" },
  { name:"Bootstrap",     icon:"🅱",  tag:"Frontend" },
  { name:"Java",          icon:"☕", tag:"Language" },
  { name:"C++",           icon:"C+", tag:"Language" },
  { name:"Git & GitHub",  icon:"🐙", tag:"DevOps"   },
  { name:"REST APIs",     icon:"🔗", tag:"Backend"  },
  { name:"Video Editing", icon:"🎬", tag:"Creative" },
];

const PROFESSIONAL_PROJECTS = [
  {
    title:"AI Learning App",
    desc:"Built from scratch as a solo developer — an AI-powered learning app that makes Science and Math engaging for students in classes 6–9. Owned full React Native development: UI design, API integration, and performance tuning. Published on Google Play Store for wide student access.",
    tags:["React Native","AI","Android","Play Store"],
    accent:"#8b5cf6",
    badge:"Solo Developer",
  },
  {
    title:"Gig Worker Platform",
    desc:"End-to-end gig economy app where workers create profiles, discover jobs by profession and location, and apply on the go. Includes a web-based employer portal for posting jobs — workers apply seamlessly from the mobile app.",
    tags:["React Native","MERN","Geolocation","Web Portal"],
    accent:"#f59e0b",
    badge:"Solo Developer",
  },
  {
    title:"Community & Expert Chat",
    desc:"Standalone social app with interest-based community chat rooms and private messaging. Users share media, add friends, and make voice/video calls. Expert-tier users by profession let others book paid query sessions.",
    tags:["React Native","WebRTC","Real-time","In-App Calls"],
    accent:"#3b82f6",
    badge:"Solo Developer",
  },
  {
    title:"Bedtime Story App",
    desc:"React + Capacitor story app for parents: child profiles, AI-generated bedtime stories from daily prompts, audio playback, and a yearbook that collects every story session over time.",
    tags:["React","Capacitor","AI","Audio"],
    accent:"#ec4899",
    badge:"Solo Developer",
  },
];

const PERSONAL_PROJECTS = [
  { title:"MERN Ecommerce",   desc:"Full-stack shop with cart, auth & admin dashboard.",     tags:["React","Node","MongoDB"], accent:"#f59e0b", link:"https://flipmarts.netlify.app/",              linkLabel:"Live Demo" },
  { title:"YouTube Clone",    desc:"Video platform powered by the YouTube Data API.",         tags:["React","API"],            accent:"#ef4444", link:"https://youtudeclonereactjs.netlify.app/",    linkLabel:"Live Demo" },
  { title:"LMS Java Project", desc:"Library management with books, students, issue & return.", tags:["Java","MySQL"],           accent:"#10b981", link:"https://github.com/Raviprakashprajapati/LMS_MinorProject_JAVA", linkLabel:"GitHub" },
  { title:"Coding Quiz App",  desc:"Timed quiz with scoring, hints and leaderboard.",         tags:["JS","HTML","CSS"],        accent:"#a855f7", link:"https://codingquizbyme.netlify.app/",         linkLabel:"Live Demo" },
  { title:"Movie Search",     desc:"OMDB-powered discovery app with watchlist support.",       tags:["React","API"],            accent:"#ec4899", link:"https://moviemaniaapi.netlify.app/",          linkLabel:"Live Demo" },
  { title:"Pokemon App",      desc:"Pokédex with live data, search and detail views.",         tags:["React","REST API"],       accent:"#f97316", link:"https://pokemondex-app.netlify.app/",         linkLabel:"Live Demo" },
];

const SOCIALS = [
  { label:"GitHub",   href:"https://github.com/Raviprakashprajapati",              abbr:"GH" },
  { label:"LinkedIn", href:"https://www.linkedin.com/in/raviprakashprajapati123/", abbr:"LI" },
  { label:"Twitter",  href:"https://twitter.com/Ravipp123",                        abbr:"TW" },
  { label:"Replit",   href:"https://replit.com/@Raviprakash123",                   abbr:"RE" },
];

/* ─── DESIGN TOKENS (dark) ─── */
const C = {
  bg:        "#0c0c0e",   // page background
  surface:   "#131316",   // card background
  surface2:  "#1a1a1f",   // slightly lighter surface
  border:    "#242429",   // subtle border
  border2:   "#2e2e35",   // hover border
  text:      "#f0f0f2",   // primary text
  textMid:   "#9898a8",   // secondary text
  textDim:   "#555560",   // muted text
  accent:    "#e8e8f0",   // bright accent (near-white)
  white:     "#ffffff",
};

const TAG_ACCENTS = {
  All: "#e8e8f0",
  Mobile: "#61dafb",
  Frontend: "#a855f7",
  Backend: "#22c55e",
  Database: "#10b981",
  Language: "#f59e0b",
  DevOps: "#f97316",
  Creative: "#ec4899",
};

const STAT_COLORS = ["#8b5cf6", "#f59e0b", "#3b82f6"];
const SERVICE_ACCENTS = ["#61dafb", "#a855f7", "#22c55e", "#10b981", "#f59e0b", "#3b82f6", "#ec4899"];
const INFO_ACCENTS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"];
const HERO_TAG_COLORS = ["#61dafb", "#a855f7", "#22c55e", "#f97316", "#3b82f6"];
const MARQUEE_COLORS = ["#8b5cf6", "#61dafb", "#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#10b981", "#ec4899", "#a855f7", "#f97316", "#06b6d4", "#f97316", "#8b5cf6", "#61dafb"];
const SOCIAL_ACCENTS = { GitHub: "#a855f7", LinkedIn: "#3b82f6", Twitter: "#38bdf8", Replit: "#f59e0b" };
const BTN_GRADIENT = "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 45%, #61dafb 100%)";

/* ─── HOOKS ─── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, {
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
  }];
}

/* ─── SECTION HEADING ─── */
function SHead({ label, title, accent = "#8b5cf6" }) {
  const [r, s] = useReveal();
  return (
    <div ref={r} className="section-head" style={{ ...s, marginBottom: 52 }}>
      <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:4, color:accent, textTransform:"uppercase", marginBottom:14 }}>{label}</span>
      <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:900, lineHeight:1.05, color:C.text, margin:0, letterSpacing:-1 }}>{title}</h2>
      <div style={{ width:52, height:3, marginTop:18, borderRadius:99, background:`linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );
}

/* ─── DIVIDER ─── */
const Divider = () => (
  <div style={{ margin:"0 8%", height:1, background:"linear-gradient(90deg, transparent, #8b5cf633 20%, #3b82f633 50%, #61dafb33 80%, transparent)" }} />
);

function AboutText() {
  const [r, s] = useReveal(100);
  return (
    <div ref={r} style={s}>
      <p style={{ fontSize:15.5, color:C.textMid, lineHeight:1.9, marginBottom:18 }}>
        I'm a <strong style={{ color:C.text, fontWeight:800 }}>Software Developer with 2 years of professional IT experience</strong>, specialising in the MERN stack and <strong style={{ color:C.text, fontWeight:800 }}>React Native</strong>. I build scalable web apps and cross-platform <strong style={{ color:C.text, fontWeight:800 }}>Android & iOS</strong> mobile applications — from pixel-perfect UIs to robust backend APIs.
      </p>
      <p style={{ fontSize:15.5, color:C.textMid, lineHeight:1.9, marginBottom:34 }}>
        I completed my <strong style={{ color:C.text, fontWeight:800 }}>BCA in 2024</strong> and am currently pursuing <strong style={{ color:C.text, fontWeight:800 }}>MCA (2024 – Present)</strong>, blending academic foundations in data structures, OOP and databases with hands-on production work across web and mobile.
      </p>
      <div className="about-info-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[["📧","Email","raviprakashprajapati445@gmail.com"],["📱","Phone","9953906396"],["📍","Location","Noida, UP, India"],["🎓","Education","MCA (2024 – Present)"]].map(([ic,lb,val], i) => (
          <div key={lb} style={{ padding:"12px 14px", background:C.surface, border:`1px solid ${C.border}`, borderLeft:`3px solid ${INFO_ACCENTS[i]}`, borderRadius:12, boxShadow:`0 4px 20px ${INFO_ACCENTS[i]}12` }}>
            <div style={{ fontSize:10, color:INFO_ACCENTS[i], fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", marginBottom:4 }}>{ic} {lb}</div>
            <div style={{ fontSize:12, color:C.text, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutServices({ hovSvc, setHovSvc }) {
  const [r, s] = useReveal(180);
  const svcs = [
    { icon:"📱", title:"Mobile App Dev",   sub:"React Native, Android & iOS apps" },
    { icon:"🖥️", title:"Frontend Dev",     sub:"React, Tailwind, clean responsive UI" },
    { icon:"⚙️", title:"Backend Dev",      sub:"Node, Express, REST API design" },
    { icon:"🗄️", title:"Database",         sub:"MongoDB, MySQL, schema design" },
    { icon:"🔗", title:"API Integration",  sub:"3rd-party APIs & services" },
    { icon:"📐", title:"Responsive Design",sub:"Mobile-first web & app layouts" },
    { icon:"🎬", title:"Video Editing",    sub:"Creative content & production" },
  ];
  return (
    <div ref={r} className="about-services-grid" style={{ ...s, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
      {svcs.map((c, i) => (
        <div key={c.title}
          onMouseEnter={() => setHovSvc(i)} onMouseLeave={() => setHovSvc(null)}
          style={{ padding:"22px 18px", background:hovSvc===i ? C.surface2 : C.surface, border:`1px solid ${hovSvc===i ? SERVICE_ACCENTS[i]+"66" : C.border}`, borderTop:`3px solid ${SERVICE_ACCENTS[i]}`, borderRadius:16, transition:"all .25s", cursor:"default", boxShadow:hovSvc===i ? `0 8px 28px ${SERVICE_ACCENTS[i]}18` : "none" }}>
          <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
          <div style={{ fontSize:13.5, fontWeight:800, color:C.text, marginBottom:5 }}>{c.title}</div>
          <div style={{ fontSize:12, color:C.textDim, lineHeight:1.55 }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

function SkillsFilter({ tags, activeTag, setActiveTag }) {
  const [r, s] = useReveal();
  return (
    <div ref={r} style={{ ...s, display:"flex", gap:8, flexWrap:"wrap", marginBottom:36 }}>
      {tags.map(t => (
        <button key={t} className="tagbtn" onClick={() => setActiveTag(t)} style={{
          background: activeTag===t ? (TAG_ACCENTS[t] || C.text)+"22" : "transparent",
          color:      activeTag===t ? (TAG_ACCENTS[t] || C.text) : C.textMid,
          borderColor:activeTag===t ? (TAG_ACCENTS[t] || C.text) : C.border,
          boxShadow:  activeTag===t ? `0 0 20px ${(TAG_ACCENTS[t] || "#fff")}22` : "none",
        }}>{t}</button>
      ))}
    </div>
  );
}

function SkillCard({ skill, delay, hovSkill, setHovSkill, isText }) {
  const [r, s] = useReveal(delay);
  const hov = hovSkill === skill.name;
  const txt = isText(skill.icon);
  const ac = TAG_ACCENTS[skill.tag] || C.textDim;
  return (
    <div ref={r} style={s}
      onMouseEnter={() => setHovSkill(skill.name)}
      onMouseLeave={() => setHovSkill(null)}>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"flex-start", gap:10,
        padding:"20px 18px", background:hov ? C.surface2 : C.surface,
        border:`1px solid ${hov ? ac+"88" : C.border}`,
        borderRadius:14, cursor:"default", transition:"all .25s",
        boxShadow: hov ? `0 8px 24px ${ac}15` : "none",
      }}>
        <span style={{ fontSize:txt?16:26, fontWeight:txt?900:400, lineHeight:1, color:hov ? ac : C.text }}>{skill.icon}</span>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:3 }}>{skill.name}</div>
          <span style={{ fontSize:10, fontWeight:700, color:ac, letterSpacing:.6, textTransform:"uppercase" }}>{skill.tag}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, delay, hovProj, setHovProj, featured = false }) {
  const [r, s] = useReveal(delay);
  const hov = hovProj === project.title;
  return (
    <div ref={r} style={s}
      onMouseEnter={() => setHovProj(project.title)}
      onMouseLeave={() => setHovProj(null)}>
      <div style={{
        padding: featured ? "28px 24px" : "26px 22px", borderRadius:16,
        background: hov ? C.surface2 : C.surface,
        border:`1px solid ${hov ? project.accent+"55" : C.border}`,
        boxShadow: hov ? `0 12px 36px ${project.accent}14` : "none",
        transition:"all .3s", transform:hov ? "translateY(-5px)" : "translateY(0)",
        height: featured ? "100%" : undefined,
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:16 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:project.accent+"18", border:`1px solid ${project.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <div style={{ width:11, height:11, borderRadius:"50%", background:project.accent }} />
          </div>
          {project.badge && (
            <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, textTransform:"uppercase", padding:"4px 10px", borderRadius:99, background:project.accent+"22", color:project.accent, border:`1px solid ${project.accent}44`, whiteSpace:"nowrap" }}>{project.badge}</span>
          )}
        </div>
        <h3 style={{ fontSize: featured ? 16 : 15, fontWeight:800, color:C.text, marginBottom:8 }}>{project.title}</h3>
        <p  style={{ fontSize:13, color:C.textMid, lineHeight:1.75, marginBottom:16 }}>{project.desc}</p>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99, background:C.surface2, color:C.textDim, border:`1px solid ${C.border}` }}>{t}</span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{ color: project.accent }}
          >
            {project.linkLabel || "View Project"} →
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectsDivider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, margin:"72px 0 36px" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent, #a855f766)" }} />
      <span style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:"#a855f7", textTransform:"uppercase", whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg, #a855f766, transparent)" }} />
    </div>
  );
}

function ExperienceCard({ entry, delay }) {
  const [r, s] = useReveal(delay);
  return (
    <div ref={r} style={{ ...s, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"30px 26px" }}>
      <div style={{ fontSize:28, marginBottom:16 }}>{entry.icon}</div>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:C.textDim, textTransform:"uppercase", marginBottom:8 }}>{entry.period}</div>
      <h3 style={{ fontSize:19, fontWeight:900, color:C.text, marginBottom:4, letterSpacing:-.4 }}>{entry.role}</h3>
      <div style={{ fontSize:13, fontWeight:700, color:C.textMid, marginBottom:14 }}>{entry.org}</div>
      <p   style={{ fontSize:13.5, color:C.textMid, lineHeight:1.8 }}>{entry.desc}</p>
    </div>
  );
}

function ContactInfo() {
  const [r, s] = useReveal();
  return (
    <div ref={r} style={s}>
      <p style={{ fontSize:15.5, color:C.textMid, lineHeight:1.9, marginBottom:36 }}>Have a project in mind? I'm always open to discussing new ideas, roles or collaborations.</p>
      {[["📧","Email","raviprakashprajapati445@gmail.com","#8b5cf6"],["📱","Phone","+91 9953906396","#22c55e"],["📍","Location","Noida, Uttar Pradesh, India","#3b82f6"]].map(([ic,lb,val,ac]) => (
        <div key={lb} style={{ display:"flex", gap:14, marginBottom:22, alignItems:"flex-start" }}>
          <div style={{ width:40, height:40, flexShrink:0, borderRadius:11, background:ac+"18", border:`1px solid ${ac}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{ic}</div>
          <div>
            <div style={{ fontSize:10, color:C.textDim, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", marginBottom:3 }}>{lb}</div>
            <div className="contact-val" style={{ fontSize:13.5, color:C.text, fontWeight:600 }}>{val}</div>
          </div>
        </div>
      ))}
      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginTop:12 }}>
        {SOCIALS.map(sc => {
          const sac = SOCIAL_ACCENTS[sc.label] || "#8b5cf6";
          return (
          <a key={sc.label} href={sc.href} target="_blank" rel="noopener noreferrer" className="socia"
            style={{ borderColor:sac+"44" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=sac; e.currentTarget.style.background=sac+"12"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=sac+"44"; e.currentTarget.style.background=C.surface; }}>
            <span style={{ width:22, height:22, borderRadius:6, background:sac+"22", border:`1px solid ${sac}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, color:sac }}>{sc.abbr}</span>
            {sc.label}
          </a>
        );})}
      </div>
    </div>
  );
}

function ContactFormSection({ sent, form, setForm, sendMsg }) {
  const [r, s] = useReveal(140);
  return (
    <div ref={r} style={s}>
      {sent ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:280, gap:14, textAlign:"center" }}>
          <div style={{ fontSize:50 }}>✅</div>
          <h3 style={{ fontSize:20, fontWeight:900, color:C.text }}>Message Sent!</h3>
          <p style={{ fontSize:14, color:C.textMid }}>Thanks for reaching out — I'll reply soon.</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input className="inp" placeholder="Your Name"    value={form.name}  onChange={e => setForm(p => ({...p, name:e.target.value}))} />
          <input className="inp" placeholder="Your Email"   value={form.email} onChange={e => setForm(p => ({...p, email:e.target.value}))} type="email" />
          <textarea className="inp" placeholder="Your Message" rows={6} value={form.msg} onChange={e => setForm(p => ({...p, msg:e.target.value}))} style={{ resize:"none" }} />
          <button type="button" className="btn-gradient" onClick={sendMsg} style={{ border:"none", padding:"14px 26px", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", letterSpacing:.4, alignSelf:"flex-start" }}
            onMouseEnter={e => e.currentTarget.style.opacity=".85"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>Send Message →</button>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN ─── */
export default function Portfolio() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [fading,    setFading]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [sent,      setSent]      = useState(false);
  const [form,      setForm]      = useState({ name:"", email:"", msg:"" });
  const [activeTag, setActiveTag] = useState("All");
  const [hovSkill,  setHovSkill]  = useState(null);
  const [hovSvc,    setHovSvc]    = useState(null);
  const [hovProj,   setHovProj]   = useState(null);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setRoleIdx(p => (p+1)%ROLES.length); setFading(false); }, 340);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const lock = menuOpen && window.innerWidth <= 900;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };
  const tags = ["All", ...Array.from(new Set(SKILLS.map(s => s.tag)))];
  const filtered = activeTag === "All" ? SKILLS : SKILLS.filter(s => s.tag === activeTag);
  const isText = s => s.length <= 2 && !/\p{Emoji_Presentation}/u.test(s);

  const sendMsg = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:"", email:"", msg:"" }); }, 3500);
  };

  return (
    <div className="portfolio" style={{ background:C.bg, color:C.text, fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;0,9..40,900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(180deg, #8b5cf6, #3b82f6); border-radius:99px; }

        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes glow       { 0%,100%{opacity:.4} 50%{opacity:.9} }
        @keyframes spinRing   { to{transform:rotate(360deg)} }

        .nlink {
          font-size:13px; font-weight:600; color:${C.textMid}; cursor:pointer;
          padding:3px 0; letter-spacing:.3px;
          border-bottom:1.5px solid transparent;
          transition:color .2s, border-color .2s;
        }
        .nlink:hover { color:${C.text}; border-bottom-color:${C.text}; }

        .inp {
          width:100%; background:${C.surface2}; border:1px solid ${C.border};
          border-radius:10px; padding:13px 16px; font-size:14px;
          color:${C.text}; font-family:inherit; outline:none;
          box-sizing:border-box; transition:border-color .2s, box-shadow .2s;
        }
        .inp::placeholder { color:${C.textDim}; }

        .socia {
          display:flex; align-items:center; gap:8px; padding:8px 15px;
          background:${C.surface}; border:1px solid ${C.border};
          border-radius:9px; color:${C.textMid}; font-size:13px; font-weight:600;
          text-decoration:none; transition:all .2s;
        }
        .socia:hover { border-color:${C.border2}; color:${C.text}; background:${C.surface2}; }

        .tagbtn {
          font-size:12px; font-weight:700; padding:5px 15px; border-radius:99px;
          cursor:pointer; border:1px solid; transition:all .2s;
        }

        .project-link {
          display:inline-flex; align-items:center; gap:6px; margin-top:14px;
          font-size:12px; font-weight:700; text-decoration:none;
          transition:opacity .2s, gap .2s;
        }
        .project-link:hover { opacity:.85; gap:8px; }

        .section-pad { padding:110px 8%; max-width:1200px; margin:0 auto; width:100%; }
        .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .grid-contact { display:grid; grid-template-columns:1fr 1.1fr; gap:80px; max-width:880px; align-items:start; }
        .grid-experience { display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:880px; }
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(145px,1fr)); gap:10px; }
        .projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:14px; }

        .nav-toggle {
          display:none; flex-direction:column; justify-content:center; gap:5px;
          width:40px; height:40px; padding:8px; background:transparent;
          border:1px solid ${C.border}; border-radius:9px; cursor:pointer;
        }
        .nav-toggle span {
          display:block; height:2px; width:100%; background:${C.text};
          border-radius:2px; transition:transform .25s, opacity .25s;
        }
        .nav-toggle.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .nav-toggle.open span:nth-child(2) { opacity:0; }
        .nav-toggle.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary, .btn-primary-lg {
          background:linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #61dafb 100%);
          color:#0c0c0e; border:none; font-weight:700; cursor:pointer;
          letter-spacing:.4px; transition:opacity .2s, transform .2s, box-shadow .2s;
          box-shadow:0 4px 20px rgba(139,92,246,.3); white-space:nowrap;
        }
        .btn-primary { padding:9px 22px; border-radius:9px; font-size:13px; }
        .btn-primary-lg { padding:14px 32px; border-radius:10px; font-size:14px; }
        .btn-primary:hover, .btn-primary-lg:hover { opacity:.92; transform:translateY(-1px); }
        .btn-gradient {
          background:linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #61dafb 100%);
          color:#0c0c0e; box-shadow:0 4px 24px rgba(139,92,246,.35);
          transition:opacity .2s, transform .2s;
        }
        .btn-gradient:hover { opacity:.92; transform:translateY(-1px); }
        .text-gradient {
          background:linear-gradient(90deg, #8b5cf6, #3b82f6, #61dafb);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }
        .btn-outline {
          background:transparent; color:${C.text}; border:1.5px solid ${C.border2};
          padding:14px 32px; border-radius:10px; font-size:14px; font-weight:700;
          cursor:pointer; letter-spacing:.4px; transition:all .2s;
        }
        .btn-outline:hover { border-color:#8b5cf6; background:rgba(139,92,246,.08); color:#c4b5fd; }
        .inp:focus { border-color:#8b5cf6; box-shadow:0 0 0 3px rgba(139,92,246,.15); }

        @media (max-width: 900px) {
          .section-pad { padding:72px 5%; }
          .grid-2, .grid-contact, .grid-experience { grid-template-columns:1fr; gap:40px; }
          .grid-contact, .grid-experience { max-width:100%; }
          .projects-grid { grid-template-columns:1fr; }
          .skills-grid { grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); }

          .nav-brand-name { display:none; }
          .nav-toggle { display:flex; }
          .nav-menu {
            position:fixed; top:60px; left:0; right:0;
            flex-direction:column; align-items:stretch; gap:0;
            padding:12px 5% 20px; background:rgba(12,12,14,.98);
            border-bottom:1px solid ${C.border};
            backdrop-filter:blur(20px);
            transform:translateY(-120%); opacity:0; pointer-events:none;
            transition:transform .3s ease, opacity .3s ease;
          }
          .nav-menu.open {
            transform:translateY(0); opacity:1; pointer-events:auto;
          }
          .nav-menu .nlink {
            padding:14px 0; font-size:15px;
            border-bottom:1px solid ${C.border};
          }
          .nav-menu .btn-primary { width:100%; margin-top:8px; padding:14px; }

          .hero-section {
            flex-direction:column !important;
            align-items:stretch !important;
            padding:88px 5% 48px !important;
            min-height:auto !important;
          }
          .hero-content { max-width:100% !important; padding-top:0 !important; }
          .hero-title { letter-spacing:-2px !important; font-size:clamp(40px,12vw,72px) !important; }
          .hero-title span { letter-spacing:-2px !important; }
          .hero-role-text { font-size:15px !important; }
          .hero-desc { font-size:15px !important; margin-bottom:32px !important; }
          .hero-cta { margin-bottom:36px !important; }
          .hero-cta .btn-primary-lg, .hero-cta .btn-outline {
            flex:1; min-width:140px; text-align:center; padding:13px 20px;
          }
          .hero-cards {
            position:relative !important; right:auto !important; top:auto !important;
            transform:none !important; animation:none !important;
            margin-top:8px; width:100%; max-width:340px; align-self:center;
          }
          .hero-bg-decor { display:none; }
          .stats-row .stat-num { font-size:28px !important; }
          .stats-row .stat-item { padding-left:16px !important; padding-right:16px !important; }
          .section-head { margin-bottom:36px !important; }
          .about-info-grid { grid-template-columns:1fr !important; }
          .about-info-grid div:last-child { white-space:normal; word-break:break-word; }
          .about-services-grid { grid-template-columns:1fr !important; }
          .hero-cards > div { min-width:0 !important; width:100%; }
          .footer-bar {
            flex-direction:column; gap:16px; text-align:center;
            padding:24px 5% !important;
          }
        }

        @media (max-width: 480px) {
          .section-pad { padding:56px 4.5%; }
          .hero-section { padding-top:80px !important; }
          .hero-badge span:last-child { font-size:11px; }
          .hero-title { font-size:clamp(36px,11vw,56px) !important; }
          .hero-cta { flex-direction:column; }
          .hero-cta .btn-primary-lg, .hero-cta .btn-outline { width:100%; }
          .stats-row { flex-direction:column; gap:0; }
          .stats-row .stat-item {
            border-right:none !important; border-bottom:1px solid ${C.border};
            padding:16px 0 !important; padding-left:0 !important;
          }
          .stats-row .stat-item:last-child { border-bottom:none; }
          .skills-grid { grid-template-columns:repeat(2, 1fr); }
          .socia { font-size:12px; padding:7px 12px; }
          .contact-val { word-break:break-word; }
        }
      `}</style>

      {/* ═══════ NAV ═══════ */}
      <nav className="nav-bar" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200, height:60,
        display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 8%",
        background: scrolled || menuOpen ? `rgba(12,12,14,.92)` : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${C.border}` : "none",
        transition:"all .35s",
      }}>
        <div className="nav-brand" style={{ display:"flex", alignItems:"center", gap:9 }}>
          <img src={AVATAR} alt="Ravi Prakash" style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", border:`2px solid ${C.accent}` }} />
          <span className="nav-brand-name" style={{ fontWeight:800, fontSize:14, color:C.text, letterSpacing:.3 }}>Ravi Prakash</span>
        </div>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <div className={`nav-menu${menuOpen ? " open" : ""}`} style={{ display:"flex", gap:28, alignItems:"center" }}>
          {["about","skills","projects","experience","contact"].map(s => (
            <span key={s} className="nlink" style={{ textTransform:"capitalize" }} onClick={() => go(s)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && go(s)}>{s}</span>
          ))}
          <button type="button" className="btn-primary" onClick={() => go("contact")}>Hire Me</button>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="hero-section" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"0 8%", position:"relative", overflow:"hidden" }}>

        {/* bg decoration */}
        <div className="hero-bg-decor" style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
          {/* faint circle outlines */}
          <div style={{ position:"absolute", top:"8%", right:"-5%", width:500, height:500, borderRadius:"50%", border:`1px solid ${C.border}` }} />
          <div style={{ position:"absolute", top:"16%", right:"2%",  width:310, height:310, borderRadius:"50%", border:`1px solid rgba(255,255,255,.04)` }} />
          {/* dot grid */}
          <div style={{ position:"absolute", right:"6%", top:"20%", display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:20 }}>
            {Array.from({length:56}).map((_,i) => (
              <div key={i} style={{ width:2.5, height:2.5, borderRadius:"50%", background:C.border2 }} />
            ))}
          </div>
          {/* subtle glow blob */}
          <div style={{ position:"absolute", top:"20%", right:"10%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,.12) 0%, transparent 70%)" }} />
          <div style={{ position:"absolute", top:"50%", left:"5%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,.08) 0%, transparent 70%)" }} />
          {/* bottom line */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.border} 20%,${C.border} 80%,transparent)` }} />
        </div>

        {/* left — main content */}
        <div className="hero-content" style={{ position:"relative", zIndex:1, flex:1, maxWidth:700, paddingTop:60 }}>

          {/* pill badge */}
          <div className="hero-badge" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.35)", borderRadius:99, marginBottom:36 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block", animation:"glow 2s infinite" }} />
            <span style={{ fontSize:12, fontWeight:600, color:C.textMid, letterSpacing:.5 }}>Available for new projects</span>
          </div>

          {/* name */}
          <h1 className="hero-title" style={{ fontSize:"clamp(52px,8vw,104px)", fontWeight:900, lineHeight:1.0, color:C.text, marginBottom:20, letterSpacing:-4 }}>
            Ravi<br/>Prakash<br/>
            <span style={{ WebkitTextStroke:`2px ${C.textMid}`, color:"transparent", letterSpacing:-4 }}>Prajapati</span>
          </h1>

          {/* animated role */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28, minHeight:32 }}>
            <div style={{ width:24, height:2, background:"linear-gradient(90deg, #8b5cf6, #61dafb)", borderRadius:2, flexShrink:0 }} />
            <span className="hero-role-text text-gradient" style={{
              fontSize:17, fontWeight:700, letterSpacing:.3,
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(-6px)" : "translateY(0)",
              transition:"opacity .3s, transform .3s",
            }}>{ROLES[roleIdx]}</span>
            <span style={{ width:2, height:20, background:"linear-gradient(180deg, #8b5cf6, #61dafb)", borderRadius:2, animation:"blink 1s infinite" }} />
          </div>

          <p className="hero-desc" style={{ fontSize:16.5, color:C.textMid, lineHeight:1.85, maxWidth:490, marginBottom:42 }}>
            2 years of professional experience building production-ready web apps with the MERN stack and cross-platform mobile apps with React Native for Android & iOS. Based in Noida, India.
          </p>

          {/* CTA buttons */}
          <div className="hero-cta" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:60 }}>
            <button type="button" className="btn-primary-lg" onClick={() => go("projects")}>View Projects</button>
            <button type="button" className="btn-outline" onClick={() => go("contact")}>Get In Touch</button>
          </div>

          {/* stats row */}
          <div className="stats-row" style={{ display:"flex", borderTop:`1px solid ${C.border}`, paddingTop:20,marginBottom:20 }}>
            {[["2+","Years Experience"],["12+","Projects Built"],["16+","Technologies"]].map(([n,l],i) => (
              <div key={l} className="stat-item" style={{ flex:1, paddingRight:26, borderRight:i<2?`1px solid ${C.border}`:"none", paddingLeft:i>0?26:0 }}>
                <div className="stat-num" style={{ fontSize:36, fontWeight:900, color:STAT_COLORS[i], lineHeight:1, marginBottom:6, textShadow:`0 0 40px ${STAT_COLORS[i]}44` }}>{n}</div>
                <div style={{ fontSize:11, color:C.textDim, fontWeight:700, letterSpacing:.5, textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — floating card stack */}
        <div className="hero-cards" style={{ position:"absolute", right:"7%", top:"40%", transform:"translateY(-50%)", zIndex:1, display:"flex", flexDirection:"column", gap:12, animation:"floatY 7s ease-in-out infinite" }}>

          {/* avatar card */}
          <div style={{ background:C.surface, border:"1px solid rgba(139,92,246,.25)", borderRadius:22, padding:"28px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap:11, minWidth:210, boxShadow:"0 8px 40px rgba(139,92,246,.12)" }}>
            <img src={AVATAR} alt="Ravi Prakash" style={{ width:100, height:100, borderRadius:"50%", objectFit:"cover", border:`2px solid ${C.accent}` }} />
            <div style={{ fontWeight:800, fontSize:15, color:C.text, textAlign:"center" }}>Ravi Prakash</div>
            <div style={{ fontSize:12, color:C.textDim, fontWeight:500 }}>Full Stack & Mobile Developer</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center", marginTop:4 }}>
              {["React Native","React","Android","iOS","Node"].map((tag, i) => (
                <span key={tag} style={{ fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99, background:HERO_TAG_COLORS[i]+"18", color:HERO_TAG_COLORS[i], border:`1px solid ${HERO_TAG_COLORS[i]}44` }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* location mini */}
          <div style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:14, padding:"13px 18px", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:18 }}>📍</span>
            <div>
              <div style={{ fontSize:9, color:C.textDim, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", marginBottom:2 }}>Location</div>
              <div style={{ fontSize:13, color:C.text, fontWeight:700 }}>Noida, India</div>
            </div>
          </div>

          {/* email mini */}
          <div style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:14, padding:"13px 18px", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:18 }}>✉️</span>
            <div>
              <div style={{ fontSize:9, color:C.textDim, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", marginBottom:2 }}>Email</div>
              <div style={{ fontSize:11.5, color:C.textMid, fontWeight:600 }}>raviprakash...@gmail.com</div>
            </div>
          </div>
        </div>

        
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <div style={{ background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"14px 0", overflow:"hidden",marginTop:"10px" }}>
        <div style={{ display:"flex", animation:"marquee 22s linear infinite", whiteSpace:"nowrap" }}>
          {[0,1].map(ri => (
            <div key={ri} style={{ display:"flex", gap:36, paddingRight:36 }}>
              {["React Native","Android","iOS","React.js","Node.js","MongoDB","Express","JavaScript","MySQL","Tailwind","Git","REST APIs","Java","C++","Bootstrap"].map((tech, ti) => (
                <span key={tech+ri} style={{ fontSize:11, fontWeight:700, color:C.textDim, letterSpacing:2.5, textTransform:"uppercase" }}>
                  {tech} <span style={{ color:MARQUEE_COLORS[(ti+1) % MARQUEE_COLORS.length], marginLeft:2 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="section-pad">
        <div className="grid-2">

          {/* left text */}
          <div>
            <SHead label="About Me" accent="#a855f7" title={<>Passionate about<br/>building the web</>} />
            <AboutText />
          </div>

          {/* right — service cards */}
          <AboutServices hovSvc={hovSvc} setHovSvc={setHovSvc} />
        </div>
      </section>

      <Divider />

      {/* ═══════ SKILLS ═══════ */}
      <section id="skills" className="section-pad">
        <SHead label="Technical Skills" accent="#61dafb" title={<>My tech<br/>stack</>} />

        <SkillsFilter tags={tags} activeTag={activeTag} setActiveTag={setActiveTag} />

        <div className="skills-grid">
          {filtered.map((sk, i) => (
            <SkillCard
              key={sk.name}
              skill={sk}
              delay={i * 35}
              hovSkill={hovSkill}
              setHovSkill={setHovSkill}
              isText={isText}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══════ PROJECTS ═══════ */}
      <section id="projects" className="section-pad">
        <SHead label="Featured Work" accent="#f59e0b" title={<>Professional<br/>Projects</>} />
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.85, maxWidth:640, margin:"-28px 0 40px" }}>
          Standalone apps built from scratch — React Native mobile products and a React + Capacitor web app, shipped end-to-end.
        </p>
        <div className="projects-grid projects-grid--featured">
          {PROFESSIONAL_PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              delay={i * 55}
              hovProj={hovProj}
              setHovProj={setHovProj}
              featured
            />
          ))}
        </div>

        <ProjectsDivider label="Personal Projects" />

        <div className="projects-grid">
          {PERSONAL_PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              delay={i * 55}
              hovProj={hovProj}
              setHovProj={setHovProj}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══════ EXPERIENCE ═══════ */}
      <section id="experience" className="section-pad">
        <SHead label="Experience" accent="#22c55e" title={<>My<br/>journey</>} />
        <div className="grid-experience">
          {[
            { icon:"💼", period:"2024 – Present", role:"Software Developer", org:"IT Companies, Delhi", accent:"#f59e0b", desc:"Built 8+ production web and mobile applications using the MERN stack and React Native. Delivered cross-platform Android & iOS apps alongside full-stack web products — frontend, backend, REST APIs, and responsive UI. Collaborated with cross-functional teams on scalable solutions." },
            { icon:"🎓", period:"2024 – Present", role:"MCA Student",        org:"University",          accent:"#3b82f6", desc:"Master of Computer Applications — pursuing advanced coursework in computer science while continuing professional work in full-stack web and React Native mobile development." },
            { icon:"🎓", period:"2021 – 2024",    role:"BCA Graduate",       org:"University",          accent:"#10b981", desc:"Bachelor of Computer Applications (completed 2024) — data structures, algorithms, RDBMS, OOP with Java & C++, and web development. Built personal and academic projects alongside coursework." },
          ].map((e, i) => (
            <ExperienceCard key={e.role} entry={e} delay={i * 150} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="section-pad">
        <SHead label="Contact" accent="#ec4899" title={<>Let's work<br/>together</>} />
        <div className="grid-contact">

          {/* contact info */}
          <ContactInfo />


          {/* form */}
          <ContactFormSection sent={sent} form={form} setForm={setForm} sendMsg={sendMsg} />
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="footer-bar" style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"30px 8%", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:C.text, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:C.bg }}>RP</div>
          <span style={{ fontSize:13, color:C.textDim }}>© 2025 Ravi Prakash Prajapati</span>
        </div>
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={{ width:36, height:36, borderRadius:"50%", background:"transparent", border:`1.5px solid ${C.border2}`, color:C.textDim, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
          onMouseEnter={e => { e.currentTarget.style.background=C.text; e.currentTarget.style.color=C.bg; e.currentTarget.style.borderColor=C.text; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.textDim; e.currentTarget.style.borderColor=C.border2; }}>↑</button>
      </footer>
    </div>
  );
}
