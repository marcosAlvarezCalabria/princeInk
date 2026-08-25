import { FormEvent, useEffect, useRef, useState } from "react";
import artistAtWork from "@/assets/prince-ink/img_d036d33174c8.jpg";
import artistPortrait from "@/assets/prince-ink/img_cbf977353338.jpg";
import artistStudio from "@/assets/prince-ink/img_3641193e25c6.jpg";
import japaneseDragon from "@/assets/prince-ink/img_3b6be6bf1598.jpg";
import thaiGuardian from "@/assets/prince-ink/img_3e2e6b46d8ad.jpg";
import compassLettering from "@/assets/prince-ink/img_52d4178dd0a6.jpg";
import darkSurrealism from "@/assets/prince-ink/img_73fd39074c55.jpg";
import samuraiBlade from "@/assets/prince-ink/img_b00e1c478035.jpg";
import matchingFlash from "@/assets/prince-ink/img_fb4fac191ec9.jpg";
import travelCompass from "@/assets/prince-ink/img_fcfb769458ca.jpg";
import aztecWarrior from "@/assets/prince-ink/img_9998edc5c455.jpg";
import cherryBlossomMoon from "@/assets/prince-ink/img_0cc1327fceee.jpg";
import kingsLettering from "@/assets/prince-ink/img_467d7cfb718a.jpg";
import exitMoment from "@/assets/prince-ink/img_4c8e93f45783.jpg";
import logo from "@/assets/prince-ink/prince-ink-logo-cropped.jpg";
import heroVideo from "@/assets/prince-ink/hero-video.mp4";
import heroVideoMobile from "@/assets/prince-ink/hero-video-mobile.mp4";
import "@/prince-ink.css";

const instagramUrl = "https://www.instagram.com/prince_ink_33/";
const phoneDisplay = "089 481 3003";
const whatsappNumber = "353894813003";

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
  { image: aztecWarrior, alt: "Fine black and grey Aztec warrior tattoo" },
  { image: cherryBlossomMoon, alt: "Traditional Japanese cherry blossom tattoo with a red moon" },
  { image: kingsLettering, alt: "Black and grey kings playing cards tattoo with No Love All Hustle lettering" },
];

export const PrinceInkPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reducedMotion) {
      video.pause();
      return;
    }
    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

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

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hi Prince Ink, I'd like to enquire about a tattoo.",
      "",
      `Name: ${data.get("name")}`,
      `Idea: ${data.get("idea")}`,
      `Placement: ${data.get("placement")}`,
      `Approximate size: ${data.get("size")}`,
      `Contact: ${data.get("contact")}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="prince-page" ref={pageRef}>
      <header className="prince-nav" data-scrolled={scrolled}>
        <a className="prince-wordmark" href="#home" onClick={closeMenu} aria-label="Prince Ink home"><img src={logo} alt="" /></a>
        <nav className={menuOpen ? "prince-navlinks is-open" : "prince-navlinks"} aria-label="Main navigation">
          <a href="#artist" onClick={closeMenu}>The artist</a><a href="#specialties" onClick={closeMenu}>Work</a><a href="#portfolio" onClick={closeMenu}>Portfolio</a><a href="#contact" onClick={closeMenu}>Enquire</a><a href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Instagram</a>
        </nav>
        <button className="prince-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        <a className="prince-button prince-nav-cta" href="#contact">Get tattooed</a>
      </header>

      <section className="prince-hero" id="home">
        <video ref={videoRef} className="prince-hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source media="(max-width: 850px)" src={heroVideoMobile} type="video/mp4" />
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="prince-hero-wash" aria-hidden="true" />
        <div className="prince-hero-copy">
          <p className="prince-eyebrow prince-load-line"><span>Galway · Ireland</span></p>
          <h1 aria-label="Marked for life"><span className="prince-type-line prince-type-line-first" aria-hidden="true">Marked</span><span className="prince-type-line prince-type-line-second prince-gold" aria-hidden="true">for life</span></h1>
          <p className="prince-mono prince-load-line"><span>@prince_ink_33</span></p>
        </div>
        <a className="prince-scroll-cue" href="#artist" aria-label="Explore Prince Ink"><span>Explore</span><b>↓</b></a>
      </section>

      <div className="prince-tribal-gap prince-tribal-gap-hero" aria-hidden="true" />

      <section className="prince-marquee" aria-label="Prince Ink specialties">
        <div className="prince-marquee-track">
          {[0, 1].map((copy) => (
            <div className="prince-marquee-copy" aria-hidden={copy === 1} key={copy}>
              <span>Custom tattooing</span><b>✦</b><span>Galway, Ireland</span><b>✦</b><span>Japanese</span><b>✦</b><span>Black &amp; Grey</span><b>✦</b><span>Ornamental</span><b>✦</b><span>Fine detail</span><b>✦</b>
            </div>
          ))}
        </div>
      </section>

      <section className="prince-intro" id="artist">
        <div className="prince-artist-gallery" aria-hidden="true"><img src={artistAtWork} alt="" /><img src={artistPortrait} alt="" /></div>
        <div className="prince-intro-title" data-reveal><p className="prince-eyebrow">Prince Ink · Galway</p><h2>Built by hand.<br /><span>Worn for life.</span></h2></div>
        <div className="prince-intro-copy" data-reveal><p>Original tattoo work shaped around the person wearing it. From the first idea to the final line, each piece is approached with focus, detail and intent.</p><a className="prince-text-link" href={instagramUrl} target="_blank" rel="noreferrer">Meet Prince Ink <span>↗</span></a></div>
      </section>

      <div className="prince-tribal-gap" aria-hidden="true" />

      <section className="prince-specialties" id="specialties">
        <div className="prince-section-kicker" data-reveal><p className="prince-eyebrow">Selected directions</p><span>Click + drag to explore</span></div>
        <div className="prince-rail" ref={railRef}><div className="prince-rail-track">
          {specialties.map((item, index) => <article className="prince-specialty" key={item.name} data-reveal><div className="prince-specialty-image"><img src={item.image} alt={item.alt} draggable="false" data-parallax data-parallax-speed="44" /></div><div className="prince-specialty-title"><span>0{index + 1}</span><h3>{item.name}</h3></div><p>{item.note}</p></article>)}
        </div></div>
      </section>

      <div className="prince-tribal-gap prince-tribal-gap-wide" aria-hidden="true" />

      <section className="prince-studio-feature">
        <div className="prince-studio-image"><img src={artistStudio} alt="Prince Ink tattoo artist focused on a tattoo session" data-parallax data-parallax-speed="72" /></div>
        <div className="prince-studio-copy" data-reveal><p className="prince-eyebrow">The work behind the work</p><h2>Focused<br />on the <span>detail.</span></h2><p>Every appointment begins with your idea. Share the concept, placement and approximate size below to start the conversation.</p><a className="prince-button prince-button-dark" href="#contact">Start your piece</a></div>
      </section>

      <div className="prince-tribal-gap" aria-hidden="true" />

      <section className="prince-portfolio" id="portfolio">
        <div className="prince-portfolio-heading" data-reveal><p className="prince-eyebrow">Recent work</p><h2>From the<br /><span>needle.</span></h2></div>
        <div className="prince-grid">{gridWorks.map((work, index) => <a className={`prince-grid-item prince-grid-item-${index + 1}`} href={instagramUrl} target="_blank" rel="noreferrer" key={work.image} data-reveal><div className="prince-grid-image"><img src={work.image} alt={work.alt} data-parallax data-parallax-speed={index % 2 === 0 ? "48" : "70"} /></div><span>View on Instagram ↗</span></a>)}</div>
      </section>

      <div className="prince-tribal-gap prince-tribal-gap-small" aria-hidden="true" />

      <section className="prince-social"><p className="prince-eyebrow" data-reveal>Follow the process</p><a href={instagramUrl} target="_blank" rel="noreferrer" data-reveal>@prince_ink_33</a></section>

      <div className="prince-tribal-gap" aria-hidden="true" />

      <section className="prince-contact" id="contact">
        <div className="prince-contact-intro" data-reveal><p className="prince-eyebrow">Have an idea?</p><h2>Let’s make it<br /><span>permanent.</span></h2><p>Tell Prince Ink what you have in mind. A few useful details now means a better first reply.</p><span className="prince-form-note">All fields are required · No commitment</span></div>
        <form className="prince-enquiry-form" onSubmit={submitEnquiry} data-reveal aria-label="Tattoo enquiry">
          <div className="prince-field prince-field-full"><label htmlFor="enquiry-name">Your name</label><input id="enquiry-name" name="name" type="text" autoComplete="name" placeholder="Name" required /></div>
          <div className="prince-field prince-field-full"><label htmlFor="enquiry-idea">Tattoo idea</label><textarea id="enquiry-idea" name="idea" rows={4} placeholder="Describe the piece, style or references you have in mind" required /></div>
          <div className="prince-field"><label htmlFor="enquiry-placement">Body placement</label><input id="enquiry-placement" name="placement" type="text" placeholder="e.g. forearm" required /></div>
          <div className="prince-field"><label htmlFor="enquiry-size">Approximate size</label><input id="enquiry-size" name="size" type="text" placeholder="e.g. 15 cm" required /></div>
          <div className="prince-field prince-field-full"><label htmlFor="enquiry-contact">Email or Instagram</label><input id="enquiry-contact" name="contact" type="text" autoComplete="email" placeholder="you@email.com or @yourhandle" required /></div>
          <div className="prince-form-action prince-field-full"><button className="prince-button prince-submit" type="submit">Continue on WhatsApp<span aria-hidden="true">↗</span></button><p>Your enquiry will open in WhatsApp for you to review and send.</p></div>
        </form>
      </section>

      <div className="prince-tribal-gap prince-tribal-gap-wide" aria-hidden="true" />

      <section className="prince-final-call" aria-labelledby="final-call-title">
        <div className="prince-final-copy" data-reveal>
          <div className="prince-final-index" aria-hidden="true"><span>One idea</span><b>01</b></div>
          <p className="prince-eyebrow">This is the moment before</p>
          <h2 id="final-call-title">Nothing’s<br />changed.<br /><span>Yet.</span></h2>
          <p className="prince-final-lede">Right now, it’s still only an idea. No ink. No first line. Just that feeling that you’re ready to make it real.</p>
          <a className="prince-final-action" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Prince Ink, I’m ready to talk about my tattoo idea.")}`} target="_blank" rel="noreferrer"><span>Take the next step</span><b aria-hidden="true">→</b></a>
          <p className="prince-final-note">No commitment. Just start the conversation.</p>
        </div>
        <figure className="prince-final-image" data-reveal>
          <img src={exitMoment} alt="Exit sign pointing toward a client at Prince Ink" data-parallax data-parallax-speed="36" />
          <figcaption><span>Before the first line</span><span>Galway · Ireland</span></figcaption>
        </figure>
      </section>

      <div className="prince-tribal-gap prince-tribal-gap-small" aria-hidden="true" />

      <footer className="prince-footer">
        <div className="prince-footer-top"><div><p>Navigate</p><a href="#artist">Artist</a><a href="#specialties">Work</a><a href="#portfolio">Portfolio</a></div><div><p>Connect</p><a href={instagramUrl} target="_blank" rel="noreferrer">@prince_ink_33 ↗</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp Prince Ink at ${phoneDisplay}`}>{phoneDisplay} ↗</a><span>Galway, Ireland</span></div><div><p>Get tattooed</p><span>Start with your idea, placement and size.</span><a className="prince-button prince-footer-button" href="#contact">Send an enquiry</a></div></div>
        <div className="prince-footer-mark"><strong>PRINCE INK</strong><p>© {new Date().getFullYear()} Prince Ink · Galway</p></div>
      </footer>
    </main>
  );
};
