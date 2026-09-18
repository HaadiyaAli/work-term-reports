import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Lottie } from "lottie-react";

// --- Asset Imports ---
import pokemonCard from "./assets/Haadiya_pokemon_card.png";
import magnetForensicsLogo from "./assets/mf-logo.png";
import aiImage from "./assets/ai.jpg";
import codesImage from "./assets/codes.webp";
import timeImage from "./assets/time.jpg";

// Animations
import anim1 from "./assets/anim1.json";
import seoAnim from "./assets/seo.json";
import responsiveAnim from "./assets/responsive.json";
import speakerAnim from "./assets/speaker.json";
import thinkAnim from "./assets/think.json";
import problemAnim from "./assets/problem.json";
import anim3 from "./assets/anim3.json";

import "./coop.css";

/* =========================================================
   SHARED ANIMATION HELPERS
   ========================================================= */

const Reveal = ({
  children,
  className = "",
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const TypewriterTitle = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const characters = text.split("");
  return (
    <motion.h1
      className={`pixel-title ${className}`}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.05 } },
          }}
        >
          {char === " " ? "\u00a0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/* =========================================================
   DATA
   ========================================================= */

type DutyStep = {
  id: string;
  text: ReactNode;
  visual: ReactNode;
};

const DUTY_STEPS: DutyStep[] = [
  {
    id: "web-marketing",
    text: (
      <p>
        By the nature of my role, I work across both web management and digital
        marketing. On the web side, I spend a lot of time coding with HTML, CSS,
        JavaScript, and Gutenberg blocks inside a CMS. On the marketing side, I
        use tools like Yoast to optimize content, choose keywords, write
        metadata, add accessible alt text, and follow best practices to keep
        everything clean and user-friendly.
      </p>
    ),
    visual: (
      <div className="media-container">
        <img src={codesImage} alt="HTML CSS JS" className="responsive-img" />
      </div>
    ),
  },
  {
    id: "product-pages",
    text: (
      <p>
        Some of the bigger projects I've worked on are product pages, which are
        a major source of conversions for the website. I take Figma designs and
        turn them into fully functioning pages, applying the coding principles I
        learned in school and seeing them come to life in a real environment. My
        more regular tasks include posting blogs with SEO optimization. Through
        that, I noticed how often we reused the same modules, so I built a
        system to streamline the process by turning them into WordPress patterns
        that are easy to access and reuse. I also create HTML emails, and one
        thing I learned is how to make them accessible—like using text-only
        versions without UI elements so everyone can read them.
      </p>
    ),
    visual: (
      <div className="media-container">
        <Lottie src={anim1} loop autoplay className="responsive-lottie" />
      </div>
    ),
  },
  {
    id: "seo-tools",
    text: (
      <>
        <p>
          I've also gotten to use tools I only heard about in class, like
          Semrush for keyword analysis. Seeing it applied in real projects was
          completely different from just learning about it. Another tool I tried
          was Hotjar, which helped me understand how users actually interact
          with pages—what modules work, which ones don't, and how important CTA
          placement really is.
        </p>
        <p>
          One of my favourite parts of this co-op is how much I get to explore.
          When I share ideas, they're actually heard, and I get the freedom to
          try things out and use the technical skills I've built in school.
          Sometimes that means setting up a local tech workspace, and other
          times it's experimenting with AI automation.
        </p>
      </>
    ),
    visual: (
      <div className="media-container">
        <Lottie src={seoAnim} loop autoplay className="responsive-lottie" />
      </div>
    ),
  },
  {
    id: "responsive",
    text: (
      <p>
        Lately, I've learned how much I dislike adjusting designs to make them
        responsive, but working closely with the design team and seeing their
        process has helped me understand how everything fits together from the
        start. It's made me better at thinking ahead about how layouts will
        behave across different devices. And along the way, I've picked up new
        skills, like integrating AI into my workflow in a way that supports my
        work without taking it over.
      </p>
    ),
    visual: (
      <div className="media-container">
        <Lottie
          src={responsiveAnim}
          loop
          autoplay
          className="responsive-lottie"
        />
      </div>
    ),
  },
];

type Goal = {
  title: string;
  text: string;
  animationData?: object;
  imageSrc?: string;
};

const GOALS: Goal[] = [
  {
    title: "ORAL COMMUNICATION",
    animationData: speakerAnim,
    text: "This is one of my biggest goals because it's a skill I need in any environment. I've definitely grown—I feel a real shift in how comfortable I am reaching out to people and asking questions. Before, it felt forced or nerve-wracking, but now it feels natural in my day-to-day work. There's still room to improve, especially when it comes to interacting with others more intentionally.",
  },
  {
    title: "CRITICAL THINKING",
    animationData: thinkAnim,
    text: "I've gotten better at researching things or asking questions when I don't understand something and figuring out why things work the way they do. I've also learned not to rely on AI for everything and to use my own skills to troubleshoot and optimize. Something I've gotten to see more is how fast to rush through hurdles and keep things moving even when there are blockers.",
  },
  {
    title: "PROBLEM SOLVING",
    animationData: problemAnim,
    text: "I'm always looking for ways to optimize things or fix bugs. One big hurdle was setting up a local tech environment. It came with a lot of confusion and uncertainty, but I stuck with it. It took time, but I eventually figured it out, and it felt amazing.",
  },
  {
    title: "TECH LITERACY",
    animationData: anim3,
    text: "Something really cool I learned, and something you don't really see in school, is the full process of how a webpage comes to life. From context, to approvals, to design, to web, and then final review. Seeing how different teams and vendors interact is really cool. I also saw how important testing and approvals are to catch bugs you'd miss otherwise.",
  },
  {
    title: "TIME MANAGEMENT",
    imageSrc: timeImage,
    text: "I've learned that good things take time. I'm always jumping into new ideas, so slowing down and deciding what's actually useful has been a big improvement. I've gotten much better at meeting deadlines, unlike school where procrastination was a huge issue. Now I can actually sit down, focus, and finish my work on time.",
  },
];

/* =========================================================
   SCROLL INTERACTIVE COMPONENTS
   ========================================================= */

const StackedScrollDuties = ({ steps }: { steps: DutyStep[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const deckProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, steps.length - 1)],
  );

  useMotionValueEvent(deckProgress, "change", (latest) => {
    const idx = Math.min(steps.length - 1, Math.floor(latest + 0.001));
    setActiveStep(idx);
  });

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      style={{ height: `${steps.length * 60}vh` }}
    >
      <div className="scroll-sticky-content duties-sticky">
        <div className="center-header">
          <h1 className="pixel-title">JOB DUTIES/PROJECTS</h1>
          <h2 className="subtitle">
            WHAT I DO DAY TO DAY AND SOME COOL PROJECTS
          </h2>
        </div>

        <div className="duty-card-deck">
          <AnimatePresence initial={false}>
            {steps.map((step, index) => {
              const distance = index - activeStep;
              const isVisible = index >= activeStep && index <= activeStep + 2;

              return (
                <motion.div
                  key={step.id}
                  className={`duty-step-card ${distance > 0 ? "is-behind" : ""}`}
                  initial={false}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: distance < 0 ? -200 : distance * -16,
                    x: distance < 0 ? 0 : distance * -16,
                    scale: 1,
                    zIndex: steps.length - index,
                    backgroundColor:
                      distance === 0
                        ? "#ffffff"
                        : distance === 1
                          ? "#e0e0e0"
                          : "#808080",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="duty-card-inner"
                    style={{
                      opacity: distance === 0 ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <div className="duty-text">{step.text}</div>
                    <div className="duty-visual">{step.visual}</div>
                    <span className="duty-number">
                      {index + 1}/{steps.length}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ScrollStateGoals = ({ goals }: { goals: Goal[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeGoal, setActiveGoal] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(goals.length - 1, Math.floor(latest * goals.length));
    setActiveGoal(idx);
  });

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      style={{ height: `${goals.length * 40}vh` }}
    >
      <div className="scroll-sticky-content goals-sticky">
        <div className="center-header">
          <h1 className="pixel-title">GOAL REFLECTION</h1>
        </div>

        <div className="goals-timeline-container">
          <div className="goals-timeline">
            {goals.map((_, i) => (
              <div key={i} className="timeline-node-wrapper">
                <div className="timeline-node">
                  <div
                    className={`timeline-dot ${activeGoal === i ? "active" : ""}`}
                  />
                </div>
                {i < goals.length - 1 && <div className="timeline-line" />}
              </div>
            ))}
          </div>

          <div className="goal-content-wrapper">
            <motion.div className="goal-text-slider">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGoal}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="goal-text-content"
                >
                  <h3 className="pixel-title">{goals[activeGoal].title}:</h3>
                  <p>{goals[activeGoal].text}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="goal-visual">
            <div className="media-container">
              {goals[activeGoal].animationData ? (
                <Lottie
                  src={goals[activeGoal].animationData}
                  loop
                  autoplay
                  className="responsive-lottie"
                />
              ) : (
                <img
                  src={goals[activeGoal].imageSrc}
                  alt={goals[activeGoal].title}
                  className="responsive-img"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN LAYOUT
   ========================================================= */

const Coop = () => {
  const [activeTab, setActiveTab] = useState("WORK 1");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <span className="logo-text">HAADIYA ALI</span>
        </div>
      </header>

      <div className="coop-page">
        <div className="coop-container">
          <div className="tabs-container">
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              MENU
            </button>
            <div
              className={`tabs-header ${isMobileMenuOpen ? "open" : ""}`}
              role="tablist"
            >
              {["WORK TERM 1", "WORK TERM 2", "SUMMER 2027"].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={
                    activeTab === tab.replace("WORK TERM ", "WORK ")
                  }
                  className={`tab-button ${activeTab === tab.replace("WORK TERM ", "WORK ") ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab.replace("WORK TERM ", "WORK "));
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="tab-button-label">{tab}</span>
                  {activeTab === tab.replace("WORK TERM ", "WORK ") && (
                    <motion.span
                      layoutId="tab-active-bg"
                      className="tab-active-bg"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="folder-content" role="tabpanel">
            <AnimatePresence mode="wait">
              {activeTab === "WORK 1" && (
                <motion.div
                  key="work1"
                  className="tab-pane"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="section-intro split-section">
                    <div className="text-content">
                      <TypewriterTitle text="CO-OP WORK TERM 1" />
                      <h2 className="subtitle">MAY - AUGUST 2026</h2>
                      <p>
                        After wrapping up the first four months of my
                        eight-month co-op at Magnet Forensics, I've really been
                        able to level up my skills as a Digital Marketing and
                        Web Management Co-op. These past months have pushed me
                        to grow, experiment, and expand my tech toolkit. Here's
                        a quick look at what I've accomplished so far, what I
                        want to improve, and what I'm excited to explore next.
                      </p>
                    </div>
                    <div className="visual-content intro-images">
                      <div className="media-container">
                        <img
                          src={pokemonCard}
                          alt="Haadiya Pokemon card"
                          className="responsive-img"
                        />
                      </div>
                    </div>
                  </div>

                  <Reveal className="section-magnet split-section reverse">
                    <div className="text-content">
                      <h1 className="pixel-title">MAGNET FORENSICS</h1>
                      <h2 className="subtitle">WATERLOO, ONTARIO OFFICE</h2>
                      <p>
                        Magnet Forensics is a global developer of digital
                        investigation software that helps law enforcement,
                        government agencies, and enterprises analyze digital
                        evidence from computers, mobile devices, and the cloud.
                        Their mission is to "unlock the truth and protect the
                        innocent," and you can see it in the people who work
                        here — they're genuinely passionate about what they do
                        and truly want to make a difference.
                      </p>
                      <p>
                        I couldn't have started my career in a better place. My
                        team cares about their work, the environment is open and
                        supportive, and I never feel uncomfortable asking
                        questions. It's a collaborative space where I'm
                        encouraged to learn, grow, and share ideas.
                      </p>
                    </div>
                    <div className="visual-content">
                      <div className="media-container">
                        <img
                          src={magnetForensicsLogo}
                          alt="Magnet Forensics logo"
                          className="responsive-img"
                        />
                      </div>
                    </div>
                  </Reveal>

                  <div className="section-duties">
                    <StackedScrollDuties steps={DUTY_STEPS} />
                  </div>

                  <div className="section-goals">
                    <ScrollStateGoals goals={GOALS} />
                  </div>

                  <Reveal className="section-ai">
                    <h1 className="pixel-title white-text">
                      INTERESTING FINDS: AI IN THE REAL WORLD
                    </h1>
                    <div className="glass-visual media-container">
                      <img src={aiImage} alt="AI" className="responsive-img" />
                    </div>
                    <div className="glass-text">
                      <p>
                        One of the most interesting things I discovered this
                        term is how differently Artificial Intelligence is
                        treated in school compared to the workplace. In an
                        academic setting, AI is usually surrounded by strict
                        rules focused on preventing plagiarism, so you mostly
                        see the "don't use this" side of it.
                      </p>
                      <p>
                        Working at a company that actually adopts AI showed me a
                        completely different perspective. Here, the focus is on
                        secure and responsible adoption. Exploring ideas around
                        AI-powered workflows taught me how companies build
                        governance, guardrails, and security reviews to make
                        sure AI improves efficiency without replacing human
                        oversight.
                      </p>
                      <p>
                        Seeing where AI shines—like automating repetitive or
                        tedious tasks—and where it still struggles—like
                        capturing a nuanced, brand-specific voice—was honestly
                        eye-opening. I really enjoyed seeing how the company
                        uses AI in real, practical ways.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal className="section-looking-ahead">
                    <div className="notepad-window">
                      <div className="notepad-titlebar">
                        <div className="notepad-title">
                          <span className="notepad-icon">📝</span> Untitled -
                          Notepad
                        </div>
                        <div className="notepad-controls">
                          <button className="win-btn">_</button>
                          <button className="win-btn">□</button>
                          <button className="win-btn close">X</button>
                        </div>
                      </div>
                      <div className="notepad-menu">
                        <span>File</span>
                        <span>Edit</span>
                        <span>Format</span>
                        <span>View</span>
                        <span>Help</span>
                      </div>
                      <div className="notepad-content">
                        <h1 className="pixel-title text-center">
                          LOOKING AHEAD: IMPROVEMENTS FOR NEXT TERM
                        </h1>
                        <p>
                          As I move into the second half of my co-op, I want to
                          step a little outside my comfort zone and focus on a
                          few areas that will help me grow even more. I want to
                          push my technical skills further by building
                          meaningful automated solutions that the team can rely
                          on long after my term ends.
                        </p>
                        <p>
                          I also want to dive deeper into data analysis: I've
                          used tools like Hotjar and Google Analytics briefly,
                          but now I want to actively study user behavior and use
                          that data to influence web design decisions. Another
                          goal is to put myself out there more by setting up
                          coffee chats and learning about what people in
                          different roles do day to day. I think hearing their
                          experiences will help me explore other areas of tech
                          and marketing that might interest me in the future.
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </motion.div>
              )}
              {activeTab === "WORK 2" && (
                <motion.div
                  key="work2"
                  className="tab-pane placeholder-pane"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <h1 className="pixel-title">WORK TERM 2</h1>
                  <p>
                    Placeholder content for the upcoming winter term. Come back
                    soon to follow the next chapter.
                  </p>
                </motion.div>
              )}
              {activeTab === "SUMMER 2027" && (
                <motion.div
                  key="summer2027"
                  className="tab-pane placeholder-pane"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <h1 className="pixel-title">SUMMER 2027</h1>
                  <p>
                    Placeholder content for a future summer experience. This
                    page will grow with the work.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <span className="logo-text">HAADIYA ALI</span>
          <nav className="footer-links" aria-label="Social links">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@example.com">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Coop;
