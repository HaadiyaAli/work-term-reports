import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Lottie } from "lottie-react";

// --- Asset Imports ---
import pokemonCard from "./assets/Haadiya_pokemon_card.png";
import magnetForensicsLogo from "./assets/mf-logo.png";
import magnetHqImage from "./assets/magnet_hq.jpeg";
import aiImage from "./assets/ai.jpg";
import timeImage from "./assets/time.jpg";
import noKermitGif from "./assets/no_kermit.gif";

// Animations
import anim1 from "./assets/anim1.json";
import seoAnim from "./assets/seo.json";
import speakerAnim from "./assets/speaker.json";
import thinkAnim from "./assets/think.json";
import problemAnim from "./assets/problem.json";
import anim2 from "./assets/anim2.json";
import htmlTool from "./assets/tools_slider/html.png";
import cssTool from "./assets/tools_slider/css.png";
import jsTool from "./assets/tools_slider/js.png";
import phpTool from "./assets/tools_slider/php.png";
import dockerTool from "./assets/tools_slider/docker.png";
import vsTool from "./assets/tools_slider/vs.png";
import wordpressTool from "./assets/tools_slider/wordpress.png";

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
    text: "This was one of my biggest goals because it’s a skill I need in any environment. I’ve definitely grown; I feel a real shift in how comfortable I am reaching out to people and asking questions. Before, it felt forced or nerve-wracking, but now it feels natural in my day-to-day work. There’s still room to improve, especially when it comes to connecting with others more intentionally and taking the time to build those relationships.",
  },
  {
    title: "CRITICAL THINKING",
    animationData: thinkAnim,
    text: "This has been another big area of growth for me. I’ve gotten better at researching things I don’t understand, asking questions, and figuring out why something works the way it does. I’ve also learned not to rely on AI for everything and to use my own skills to troubleshoot and optimize. Moving forward, I want to keep building this skill by pushing myself to learn new tools, explore more complex concepts, and dig deeper into the “why” behind the solutions I use.",
  },
  {
    title: "PROBLEM SOLVING",
    animationData: problemAnim,
    text: "Problem Solving has been a big area of growth for me this term. I’ve learned how to handle challenges and blockers in a professional way, figuring out how to work around them while keeping things moving. I’ve gotten better at actively looking for ways to optimize things or tackle tricky bugs instead of giving up. One of the biggest hurdles I faced was setting up a local tech environment, it came with a lot of confusion and uncertainty, but I stuck with it. It took time, but I eventually figured it out, and it felt amazing.",
  },
  {
    title: "TECH LITERACY",
    animationData: anim2,
    text: "Something really cool I learned during my co-op, and something you don’t really see in school, is the full process of how a webpage comes to life. From content, to approvals, to design, to more approvals, to web, and then final review. Seeing how different teams and even external vendors interact is really insightful because in school you usually do all the steps yourself. I also saw how important testing and approvals are. They might feel annoying, but they catch bugs and gaps you’d miss otherwise.",
  },
  {
    title: "TIME MANAGEMENT",
    imageSrc: timeImage,
    text: "I’ve learned that good things take time. I’m always jumping into new ideas, so slowing down and deciding what’s useful has been a big improvement for me. I’ve gotten much better at meeting deadlines, unlike school where procrastination was a huge issue. Now I can sit down, focus, and finish my work on time instead of leaving everything to the last minute.",
  },
];

const TOOL_IMAGES = [
  htmlTool,
  wordpressTool,
  cssTool,
  vsTool,
  phpTool,
  jsTool,
  dockerTool,
];

const JobDuties = () => (
  <section className="job-duties">
    <div className="center-header">
      <h1 className="pixel-title">JOB DUTIES/PROJECTS</h1>
      <h2 className="subtitle">WHAT I DO DAY TO DAY AND SOME COOL PROJECTS</h2>
    </div>

    <div className="job-duty-intro">
      <p>
        By the nature of my role, I work across both web management and digital
        marketing. On the web side, I spend a lot of time coding with HTML, CSS,
        JavaScript, PHP, and Gutenberg blocks inside a CMS called WordPress. I
        learned HTML and CSS in q web design course I took my winter 2026
        semester, picked up JavaScript on my own, and I’ve been learning PHP as
        I go by reviewing smaller code sections and understanding how they fit
        into the larger WordPress structure. On the marketing side, I use tools
        like Yoast to optimize content for SEO, choose keywords, write metadata,
        and apply the concepts I learned in my digital marketing course from
        Summer 2025. This mix lets me connect what I’ve learned in school with
        real projects, while also building new skills as I go.
      </p>
      <div className="tools-marquee" aria-label="Tools used in web development">
        <div className="tools-marquee-track">
          {[...TOOL_IMAGES, ...TOOL_IMAGES].map((tool, index) => (
            <img
              key={`${tool}-${index}`}
              src={tool}
              alt=""
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>

    <div className="job-duty-row job-duty-row-projects">
      <div className="job-duty-animation">
        <Lottie src={anim1} loop autoplay className="responsive-lottie" />
      </div>
      <div className="job-duty-copy">
        <p>
          Some of the bigger projects I’ve worked on are product pages, which
          are a major source of conversions for the website. I take Figma
          designs and turn them into fully functioning pages, applying the
          coding principles I learned in school and implementing them in real
          projects. I’ve learned how much I dislike adjusting designs to make
          them responsive, but working with the design team and seeing their
          process has helped me understand how everything fits together from the
          start. It’s made me better at thinking ahead about how layouts will
          behave across different devices. My more regular tasks include posting
          blogs with SEO optimization, creating HTML emails, and helping with
          eBooks and case studies. I also help maintain the WordPress site by
          updating content, posting assets to Vimeo and YouTube, and building
          custom landing pages when needed.
        </p>
      </div>
    </div>

    <div className="job-duty-row">
      <div className="job-duty-copy">
        <p>
          I’ve also gotten to use tools I only heard about in class, like
          SEMrush for keyword analysis. Seeing how the tool is used in practice
          was completely different from just learning about it. Another tool I
          tried was Hotjar, which helped me understand how users interact with
          pages, what modules work, which ones don’t, and how important CTA
          placement really is.
        </p>
        <p>
          One of my favourite parts of this co-op is how much I get to explore.
          When I share ideas, they’re heard, and I get the freedom to try things
          out and use the technical skills I’ve built in school, like setting up
          a local tech workspace, and experimenting with AI automation.
        </p>
      </div>
      <div className="job-duty-animation">
        <Lottie src={seoAnim} loop autoplay className="responsive-lottie" />
      </div>
    </div>
  </section>
);

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
  const [isKermitVisible, setIsKermitVisible] = useState(false);

  const showKermit = () => {
    setIsKermitVisible(true);
    window.setTimeout(() => setIsKermitVisible(false), 2000);
  };

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
                        My name is Haadiya. I'm a second year Computer Science
                        student at the University of Guelph, studying Computer
                        Science with an AOI in Data Science and a minor in
                        Business Data Analytics. After wrapping up the first
                        four months of my eight-month co-op at Magnet Forensics,
                        I've really leveled up my skills as a Digital Marketing
                        and Web Management Co-op. These past months pushed me to
                        experiment, learn, and expand my tech toolkit. Here's a
                        quick look at what I've accomplished so far, what I want
                        to improve, and what I'm excited to explore next.
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
                      <h1 className="magnet-section-logo-title">
                        <img
                          src={magnetForensicsLogo}
                          alt="Magnet Forensics"
                          className="magnet-section-logo"
                        />
                      </h1>
                      <h2 className="subtitle">WATERLOO, ONTARIO OFFICE</h2>
                      <p>
                        Magnet Forensics is a global developer of digital
                        investigation software that helps law enforcement,
                        government agencies, and enterprises analyze digital
                        evidence from computers, mobile devices, and the cloud.
                        Their mission is to "unlock the truth and protect the
                        innocent," and you can see it in the people who work
                        here. They're genuinely passionate about what they do
                        and truly want to make a difference. I couldn't have
                        started my career in a better place. My team cares about
                        their work, the environment is open and supportive, and
                        I never feel uncomfortable asking questions. It's a
                        collaborative space where I'm encouraged to learn, grow,
                        and share ideas.
                      </p>
                    </div>
                    <div className="visual-content magnet-visual">
                      <motion.img
                        src={magnetHqImage}
                        alt="Magnet Forensics headquarters"
                        className="magnet-hq-image"
                        initial={{
                          opacity: 0,
                          x: -80,
                          rotate: -12,
                          scale: 0.7,
                        }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </Reveal>

                  <div className="section-duties">
                    <JobDuties />
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
                        see the “don’t use this” side of it.
                      </p>
                      <p>
                        Working at a company that's actively adopting AI showed
                        me a completely different perspective. Here, the focus
                        is on secure and responsible adoption. Exploring ideas
                        around AI powered workflows taught me how companies
                        build governance, guardrails, and security reviews to
                        make sure AI improves efficiency without replacing human
                        oversight. Identifying where AI shines like automating
                        repetitive or tedious tasks and where it still
                        struggles.
                      </p>
                      <p>
                        I really enjoyed seeing how the company uses AI in real,
                        practical ways, especially since school has such strict
                        rules around it. It made me appreciate how different AI
                        looks when you're in the industry versus learning about
                        it in a classroom.
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
                          <button className="win-btn" onClick={showKermit}>
                            _
                          </button>
                          <button className="win-btn">□</button>
                          <button
                            className="win-btn close"
                            onClick={showKermit}
                          >
                            X
                          </button>
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
                          As I move into the second half of my co‑op, I want to
                          step a little outside my comfort zone and focus on a
                          few areas that will help me grow even more. I want to
                          push my technical skills further by building
                          meaningful automated solutions that the team can rely
                          on long after my term ends. I also want to dive deeper
                          into data analysis, I’ve used tools like Hotjar and
                          Google Analytics briefly, but now I want to actively
                          study user behavior and use that data to influence web
                          design decisions. Another goal is to put myself out
                          there more learning about what people in different
                          roles do day to day. I think hearing their experiences
                          will help me explore other areas of tech and marketing
                          that might interest me in the future. I’m excited to
                          see what the next four months have in store for me.
                        </p>
                      </div>
                    </div>
                    {isKermitVisible && (
                      <img
                        src={noKermitGif}
                        alt="Kermit reacting"
                        className="notepad-reaction-gif"
                      />
                    )}
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
                    Work Term 2 report for the last four months of my
                    eight-month co-op at Magnet Forensics, coming in December.
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
                    Coming next summer...
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
            <a
              href="https://github.com/HaadiyaAli"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/haadiya-ali/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:hali21@uoguelph.ca">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Coop;
