import { useEffect, useRef, useState } from "react";
import artistAtWork from "@/assets/prince-ink/img_d036d33174c8.jpg";
import japaneseDragon from "@/assets/prince-ink/img_3b6be6bf1598.jpg";
import thaiGuardian from "@/assets/prince-ink/img_3e2e6b46d8ad.jpg";
import compassLettering from "@/assets/prince-ink/img_52d4178dd0a6.jpg";
import darkSurrealism from "@/assets/prince-ink/img_73fd39074c55.jpg";
import samuraiBlade from "@/assets/prince-ink/img_b00e1c478035.jpg";
import smallColour from "@/assets/prince-ink/img_e005928b6aba.jpg";
import matchingFlash from "@/assets/prince-ink/img_fb4fac191ec9.jpg";
import travelCompass from "@/assets/prince-ink/img_fcfb769458ca.jpg";
import detailOne from "@/assets/prince-ink/img_045b43081db0.jpg";
import detailTwo from "@/assets/prince-ink/img_cbf977353338.jpg";
import detailThree from "@/assets/prince-ink/img_dc9e73e66bae.jpg";
import logo from "@/assets/prince-ink/img_fb6314897340.jpg";
import studioPortrait from "@/assets/prince-ink/studio-hero.png";
import heroVideo from "@/assets/prince-ink/hero-video.mp4";
import "@/prince-ink.css";

const instagramUrl = "https://www.instagram.com/prince_ink_33/";

const specialties = [
  { name: "Japanese", note: "Mythic · detailed · flowing", image: japaneseDragon, alt: "Japanese dragon tattoo with red blossoms" },
  { name: "Black & Grey", note: "Dark · dimensional · precise", image: darkSurrealism, alt: "Dark surreal black and grey tattoo" },
  { name: "Ornamental", note: "Symbolic · balanced · intricate", image: thaiGuardian, alt: "Ornamental Thai guardian tattoo" },
  { name: "Illustrative", note: "Graphic · personal · expressive", image: compassLettering, alt: "Illustrative compass and lettering tattoo" },
  { name: "Fine Detail", note: "Clean · considered · individual", image: matchingFlash, alt: "Matching fine detail tattoos" },
];

const gridWorks = [
  { image: samuraiBlade, alt: "Samurai mask framed inside a blade tattoo" },
  { image: travelCompass, alt: "Travel composition tattoo with compass and mountains" },
  { image: smallColour, alt: "Small colour character tattoo" },
  { image: detailOne, alt: "Prince Ink tattoo portfolio detail" },
  { image: detailTwo, alt: "Prince Ink tattoo portfolio artwork" },
  { image: detailThree, alt: "Prince Ink tattoo portfolio piece" },
];

export const PrinceInkPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const revealElements = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    const imageElements = Array.from(page.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frameId: number | undefined;

    const updateScrollEffects = () => {
      frameId = undefined;
      setScrolled(window.scrollY > 48);
      if (reducedMotion) return;

      const viewportHeight = window.innerHeight;
      imageElements.forEach((element) => {
        const rect = element.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom < 0 || rect.top > viewportHeight) return;
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const speed = Number(element.dataset.parallaxSpeed ?? 52);
        element.style.setProperty("--parallax-y", `${(progress - 0.5) * speed}px`);
      });
    };

    const requestUpdate = () => {
      if (frameId === undefined) frameId = window.requestAnimationFrame(updateScrollEffects);
    };

    let observer: IntersectionObserver | undefined;
    if (typeof window.IntersectionObserver === "function") {
      observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
    }

    revealElements.forEach((element) => observer?.observe(element));
    if (!observer) revealElements.forEach((element) => element.classList.add("is-visible"));
    updateScrollEffects();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
      rail.classList.add("is-dragging");
      rail.setPointerCapture?.(event.pointerId);
    };
    const pointerMove = (event: PointerEvent) => {
      if (dragging) rail.scrollLeft = startScroll - (event.clientX - startX);
    };
    const pointerUp = () => {
      dragging = false;
      rail.classList.remove("is-dragging");
    };
    rail.addEventListener("pointerdown", pointerDown);
    rail.addEventListener("pointermove", pointerMove);
    rail.addEventListener("pointerup", pointerUp);
    rail.addEventListener("pointercancel", pointerUp);
    rail.addEventListener("pointerleave", pointerUp);
    return () => {
      rail.removeEventListener("pointerdown", pointerDown);
      rail.removeEventListener("pointermove", pointerMove);
      rail.removeEventListener("pointerup", pointerUp);
      rail.removeEventListener("pointercancel", pointerUp);
      rail.removeEventListener("pointerleave", pointerUp);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="prince-page" ref={pageRef}>
      <header className="prince-nav" data-scrolled={scrolled}>
        <a className="prince-wordmark" href="#home" onClick={closeMenu} aria-label="Prince Ink home"><span>Prince</span><span>Ink</span></a>
        <nav className={menuOpen ? "prince-navlinks is-open" : "prince-navlinks"} aria-label="Main navigation">
          <a href="#artist" onClick={closeMenu}>The artist</a><a href="#specialties" onClick={closeMenu}>Work</a><a href="#portfolio" onClick={closeMenu}>Portfolio</a><a href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Instagram</a>
        </nav>
        <button className="prince-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        <a className="prince-button prince-nav-cta" href={instagramUrl} target="_blank" rel="noreferrer">Get tattooed</a>
      </header>

      <section className="prince-hero" id="home">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster={studioPortrait} src={heroVideo} data-parallax data-parallax-speed="110" />
        <div className="prince-hero-wash" />
        <div className="prince-hero-copy">
          <p className="prince-eyebrow prince-load-line"><span>Galway · Ireland</span></p>
          <h1 aria-label="Marked for life"><span className="prince-load-line"><span>Marked</span></span><span className="prince-load-line prince-gold"><span>for life</span></span></h1>
          <p className="prince-mono prince-load-line"><span>@prince_ink_33</span></p>
        </div>
        <a className="prince-scroll-cue" href="#artist" aria-label="Explore Prince Ink"><span>Explore</span><b>↓</b></a>
      </section>

      <section className="prince-intro" id="artist">
        <div className="prince-intro-title" data-reveal><p className="prince-eyebrow">Prince Ink · Galway</p><h2>Built by hand.<br /><span>Worn for life.</span></h2></div>
        <div className="prince-intro-copy" data-reveal><img className="prince-artist-thumb" src={artistAtWork} alt="Prince Ink artist at work" /><p>Original tattoo work shaped around the person wearing it. From the first idea to the final line, each piece is approached with focus, detail and intent.</p><a className="prince-text-link" href={instagramUrl} target="_blank" rel="noreferrer">Meet Prince Ink <span>↗</span></a></div>
      </section>

      <section className="prince-specialties" id="specialties">
        <div className="prince-section-kicker" data-reveal><p className="prince-eyebrow">Selected directions</p><span>Click + drag to explore</span></div>
        <div className="prince-rail" ref={railRef}><div className="prince-rail-track">
          {specialties.map((item, index) => <article className="prince-specialty" key={item.name} data-reveal><div className="prince-specialty-image"><img src={item.image} alt={item.alt} draggable="false" data-parallax data-parallax-speed="44" /><span>0{index + 1}</span></div><h3>{item.name}</h3><p>{item.note}</p></article>)}
        </div></div>
      </section>

      <section className="prince-studio-feature">
        <div className="prince-studio-image" data-reveal><img src={studioPortrait} alt="Tattoo artist working in a dark studio" data-parallax data-parallax-speed="80" /></div>
        <div className="prince-studio-copy" data-reveal><p className="prince-eyebrow">The work behind the work</p><h2>Focused<br />on the <span>detail.</span></h2><p>Every appointment begins with your idea. Share the concept, placement and approximate size directly on Instagram to start the conversation.</p><a className="prince-button prince-button-dark" href={instagramUrl} target="_blank" rel="noreferrer">Start your piece</a></div>
      </section>

      <section className="prince-portfolio" id="portfolio">
        <div className="prince-portfolio-heading" data-reveal><p className="prince-eyebrow">Recent work</p><h2>From the<br /><span>needle.</span></h2></div>
        <div className="prince-grid">{gridWorks.map((work, index) => <a className={`prince-grid-item prince-grid-item-${index + 1}`} href={instagramUrl} target="_blank" rel="noreferrer" key={work.image} data-reveal><img src={work.image} alt={work.alt} data-parallax data-parallax-speed={index % 2 === 0 ? "48" : "70"} /><span>View on Instagram ↗</span></a>)}</div>
      </section>

      <section className="prince-social"><p className="prince-eyebrow" data-reveal>Follow the process</p><a href={instagramUrl} target="_blank" rel="noreferrer" data-reveal>@prince_ink_33</a><div className="prince-social-strip" aria-hidden="true">{[japaneseDragon, thaiGuardian, matchingFlash, darkSurrealism].map((image) => <img src={image} alt="" key={image} />)}</div></section>

      <section className="prince-contact" id="contact">
        <div data-reveal><p className="prince-eyebrow">Have an idea?</p><h2>Let’s make it<br /><span>permanent.</span></h2></div>
        <div className="prince-contact-side" data-reveal><p>Send your idea, placement and approximate size. Prince Ink will take it from there.</p><a className="prince-button" href={instagramUrl} target="_blank" rel="noreferrer">Message on Instagram</a></div>
      </section>

      <footer className="prince-footer">
        <div className="prince-footer-top"><div><p>Navigate</p><a href="#artist">Artist</a><a href="#specialties">Work</a><a href="#portfolio">Portfolio</a></div><div><p>Connect</p><a href={instagramUrl} target="_blank" rel="noreferrer">@prince_ink_33 ↗</a><span>Galway, Ireland</span></div><div><p>Get tattooed</p><span>Start with your idea, placement and size.</span><a className="prince-button prince-footer-button" href={instagramUrl} target="_blank" rel="noreferrer">Send an enquiry</a></div></div>
        <div className="prince-footer-mark"><img src={logo} alt="Prince Ink Headquarters" /><p>© {new Date().getFullYear()} Prince Ink · Galway</p></div>
      </footer>
    </main>
  );
};
