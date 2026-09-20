import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ChevronDown, Menu, Pause, Play, Send, Volume2, X } from 'lucide-react';
import './styles.css';

const nav = [
  ['About Him', '/#about-him'], ['About Us', '/#about-us'], ['Tell Your Story', '/#story'],
  ['Gallery', '/gallery'], ['Audio Podcast', '/#podcast'], ['Contact Us', '/#contact']
];

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="logo-slot" href="/" aria-label="They Lived home"><img src="/assets/they-live-logo.png" alt="They Lived — chess, music, and love" /></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'open' : ''} aria-label="Main navigation">
      {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </header>
}

function StoryModal({ onClose }) {
  const [sent, setSent] = useState(false);
  useEffect(() => { const esc = e => e.key === 'Escape' && onClose(); addEventListener('keydown', esc); return () => removeEventListener('keydown', esc); }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="story-title">
      <button className="modal-close" onClick={onClose} aria-label="Close"><X /></button>
      {sent ? <div className="success"><span>♟</span><h2>Thank you for sharing.</h2><p>Your words help keep his story moving forward.</p><button className="button gold" onClick={onClose}>Close</button></div> : <>
        <p className="section-label">Tell Your Story</p><h2 id="story-title">What do you remember?</h2>
        <p>Share a memory, a lesson, a song, or a moment. This can be edited before it is ever published.</p>
        <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <label>Your name<input required placeholder="Name" /></label>
          <label>Your connection<input placeholder="Friend, family, community..." /></label>
          <label>Your story<textarea required rows="6" placeholder="Tell us what you remember..." /></label>
          <button className="button burgundy" type="submit">Send Your Story <Send size={16} /></button>
        </form>
      </>}
    </div>
  </div>
}

function PodcastPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  useEffect(() => { if (!playing) return; const id = setInterval(() => setProgress(p => p >= 100 ? 0 : p + .25), 250); return () => clearInterval(id); }, [playing]);
  const mins = Math.floor((progress / 100) * 45); const secs = Math.floor(((progress / 100) * 45 - mins) * 60);
  return <div className="player">
    <div className="episode-art"><span>THEY<br /><em>LIVED</em></span><b>♟</b><small>AUDIO PODCAST</small></div>
    <div className="player-body"><p>Featured Episode</p><h3>More Than a Game</h3><span>A conversation about life, strategy, and lasting impact.</span>
      <div className="controls"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><time>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</time><input aria-label="Episode progress" type="range" min="0" max="100" value={progress} onChange={e => setProgress(+e.target.value)} /><time>45:00</time><Volume2 size={18} /></div>
    </div>
  </div>
}

function Gallery() {
  return <section className="gallery-section gallery-page" id="gallery">
    <div className="gallery-heading">
      <div><p className="section-label">Gallery</p><h2>Pieces of<br />His Story</h2></div>
      <div><p>The moments we keep close—each photograph held here like a memory taped into a well-loved notebook.</p></div>
    </div>
    <div className="photo-collage" aria-live="polite">
      <div className="empty-photo empty-one"><span className="tape"></span><p>A favorite smile</p></div>
      <div className="empty-photo empty-two"><span className="tape"></span><p>A moment together</p></div>
      <div className="empty-photo empty-three"><span className="tape"></span><p>A memory worth keeping</p></div>
    </div>
  </section>;
}

function App() {
  const [storyOpen, setStoryOpen] = useState(false); const [contactSent, setContactSent] = useState(false);
  const isGalleryPage = window.location.pathname.replace(/\/$/, '') === '/gallery';
  useEffect(() => {
    if (!window.location.hash) return;
    requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
  }, []);
  return <>
    <Header />
    {isGalleryPage ? <main id="top"><Gallery /></main> : <main id="top">
      <section className="hero">
        <div className="hero-content"><h1>THEY <em>LIVED</em></h1><p className="hero-line">His moves. His music. His memory.</p><p className="hero-copy">A life that made room for bigger conversations.<br />On the board. In the beat. In all of us.</p><div className="actions"><a className="button gold" href="#about-him">Discover His Story <ArrowRight size={17} /></a><button className="button outline" onClick={() => setStoryOpen(true)}>Share Your Story</button></div></div>
        <a className="scroll-cue" href="#about-him">Keep going <ChevronDown /></a>
      </section>

      <section className="about-him light-section" id="about-him">
        <div className="visual-collage" aria-hidden="true"><div className="record"><i>♟</i></div><div className="board"></div><p>STRATEGY<br />IN LIFE<br />AND LYRICS</p></div>
        <div className="section-copy">
          <p className="section-label">About Him</p>
          <h2>A Life Played<br />With Purpose</h2>
          <p>He saw connections where others saw opposites—chess and hip-hop, strategy and self-expression, discipline and freedom. He moved through the world with curiosity, heart, and a belief that both the board and the beat could make life better.</p>
          <p>He wasn’t just a fan of the culture—he lived it. Every verse, every move, every conversation was a chance to think deeper and uplift others.</p>
          <p>Monte’s life reminds us that even when someone is living with a serious condition like thalassemia, their diagnosis does not define the meaning of their life. Learning about this disease in Monte’s memory teaches us the importance of awareness, compassion, early testing, blood donation, and continued support for those living with inherited blood disorders.</p>
          <p>Monte’s legacy calls us to turn grief into purpose—to learn, to share, and to help others. By speaking his name and raising awareness, we honor not only how he died, but more importantly, how he lived: <strong>a life played with purpose.</strong></p>
        </div>
        <blockquote>“Different pieces.<br />Same bigger picture.”</blockquote>
      </section>

      <section className="about-us dark-section" id="about-us">
        <div className="vinyl" aria-hidden="true"><span>PEOPLE<br />+ STORIES<br />KEEP<br />HIM HERE</span></div>
        <div>
          <p className="section-label">About Us</p>
          <h2>More Than<br />a Memory</h2>
          <p>This website and podcast were born out of profound love for my son, Ja’Monte Lee Adams.</p>
          <p>Ja’Monte lived with thalassemia, facing every challenge with quiet strength, resilience, and an unforgettable spirit. On May 19, 2018, at the age of 24, Ja’Monte passed away, changing my world forever. The loss of a child is an unimaginable path—one filled with complex grief, unspoken sorrow, and a love that never ends.</p>
          <p>I created this platform to ensure Ja’Monte’s legacy lives on and to create a compassionate sanctuary for parents walking this same road. Through honest conversations about child loss, memory, and healing, this podcast is dedicated to grieving parents everywhere. Here, we remember together, honor our children’s lives, and remind one another that no parent has to carry this journey alone.</p>
        </div>
        <div className="quote-panel">GOOD PEOPLE<br />MOVE<br />DIFFERENTLY.</div>
      </section>

      <section className="story-section light-section" id="story">
        <div><p className="section-label">Tell Your Story</p><h2>Your Words<br />Keep Him Alive</h2><p>A memory. A lesson. A moment. A song. However he touched your life, we’d love to hear your story. Your voice helps keep his spirit, values, and impact alive for generations to come.</p><button className="button burgundy" onClick={() => setStoryOpen(true)}>Share Your Story <ArrowRight size={17} /></button></div>
        <button className="notebook" onClick={() => setStoryOpen(true)}><span>Good stories<br />live longer.</span><small>Open the page <ArrowRight size={14} /></small></button>
      </section>

      <section className="podcast dark-section" id="podcast">
        <div className="podcast-intro"><p className="section-label">Audio Podcast</p><h2>Conversations<br />That Keep Him Close</h2><p>Real stories. Deeper ideas. Fine culture he loved. Our audio podcast features conversations with family, friends, and voices from the worlds of hip-hop, chess, and beyond—exploring his impact and the ideas that still move us today.</p></div>
        <PodcastPlayer />
      </section>

      <section className="contact light-section" id="contact">
        <div><p className="section-label">Contact Us</p><h2>Let’s Stay Connected</h2><p>Have a question, an idea, or just want to reach out?<br />We’d love to hear from you.</p></div>
        {contactSent ? <div className="contact-success"><span>Message received.</span><p>Thank you for reaching out. We’ll be in touch.</p></div> : <form onSubmit={e => { e.preventDefault(); setContactSent(true); }}><div className="form-row"><input required aria-label="Your name" placeholder="Your Name" /><input required type="email" aria-label="Your email" placeholder="Your Email" /></div><textarea required aria-label="Your message" placeholder="Your Message" rows="4" /><button className="button burgundy">Send Message <ArrowRight size={17} /></button></form>}
      </section>
    </main>}
    <footer><strong>THEY <em>LIVED</em></strong><span>His moves. His music. His memory.</span><span>Good people keep good stories alive.</span><small>© 2026 They Lived. All rights reserved.</small></footer>
    {storyOpen && <StoryModal onClose={() => setStoryOpen(false)} />}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
