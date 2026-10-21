import { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft,
  ChevronRight, House, Menu, X, ExternalLink, Sparkles
} from 'lucide-react'

const VGEN_URL = 'https://vgen.co/' // Replace with your own VGen profile URL.

const artworks = [
  { title: 'Study no. 01', kind: 'Character study', tone: 'artwork-one', note: 'soft graphite / 2025' },
  { title: 'Quiet afternoon', kind: 'Illustration', tone: 'artwork-two', note: 'pencil & digital' },
  { title: 'Little daydream', kind: 'Character design', tone: 'artwork-three', note: 'linework study' },
  { title: 'After the rain', kind: 'Illustration', tone: 'artwork-four', note: 'personal work' },
  { title: 'Untitled portrait', kind: 'Portrait', tone: 'artwork-five', note: 'rough sketch' },
  { title: 'Blue hour', kind: 'Character study', tone: 'artwork-six', note: 'concept sketch' },
]

const commissionPanels = [
  {
    eyebrow: '01 / PLEASE READ',
    title: 'Terms of Service',
    subtitle: 'A few notes before we begin.',
    content: [
      ['Usage', 'Personal use is welcome. Commercial use and redistribution must be discussed in advance.'],
      ['Payment', 'Payment details and timing will be confirmed through my commission platform.'],
      ['Process', 'I will share progress updates when applicable. Please send clear references with your request.'],
      ['Changes', 'Small adjustments may be possible during the process; major changes depend on the stage of work.'],
    ],
  },
  {
    eyebrow: '02 / THE PROCESS',
    title: 'Comms Details',
    subtitle: 'From your idea to a finished piece.',
    content: [
      ['01 — Request', 'Choose a commission type and describe your idea on VGen.'],
      ['02 — Discussion', 'We confirm the brief, references, scope, and timeline.'],
      ['03 — Sketch', 'The composition is established before the illustration is refined.'],
      ['04 — Delivery', 'The final artwork is delivered digitally through the agreed platform.'],
    ],
  },
  {
    eyebrow: '03 / INVESTMENT',
    title: 'Price List',
    subtitle: 'A starting point for your idea.',
    content: [
      ['Portrait', 'Starting price — add your price here'],
      ['Half body', 'Starting price — add your price here'],
      ['Full body', 'Starting price — add your price here'],
      ['Extra options', 'Complex details, extra characters, and commercial use may affect the final quote.'],
    ],
  },
]

function Header({ onMenu, onHome, onBack, current }) {
  return (
    <header className="topbar">
      <button className="brand-button" onClick={onMenu} aria-label="Open navigation menu">
        <Menu size={18} strokeWidth={1.7} />
        <span>Navbar</span>
      </button>
      <button className="brand-mark" onClick={onHome} aria-label="Go to landing page">
        <span className="brand-scribble">loyn</span>
        <span className="brand-dot" />
      </button>
      <div className="topbar-right">
        {current !== 'landing' && (
          <button className="text-link" onClick={onBack}><ChevronLeft size={14} /> Back</button>
        )}
        <button className="text-link" onClick={onHome}><House size={14} /> Home</button>
      </div>
    </header>
  )
}

function MenuDrawer({ open, onClose, navigate }) {
  if (!open) return null
  const links = [
    ['Home / Landing', 'landing'],
    ['Gallery', 'main'],
    ['About me & Contact', 'about'],
    ['Commission', 'commission'],
    ['Queue', 'queue'],
  ]
  return (
    <div className="drawer-scrim" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-heading">
          <span className="eyebrow">LOYN / INDEX</span>
          <button className="icon-button" onClick={onClose} aria-label="Close menu"><X size={20} /></button>
        </div>
        <p className="drawer-note">A small collection of drawings, ideas, and commission information.</p>
        <nav className="drawer-links">
          {links.map(([label, page], index) => (
            <button key={page} onClick={() => { navigate(page); onClose() }}>
              <span className="drawer-number">0{index + 1}</span>{label}<ArrowUpRight size={16} />
            </button>
          ))}
        </nav>
        <div className="drawer-bottom">HANDMADE WITH CARE <span>✳</span></div>
      </aside>
    </div>
  )
}

function DoodlePortrait() {
  return (
    <svg className="portrait-svg" viewBox="0 0 360 330" role="img" aria-label="Decorative rough line-art portrait placeholder">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path className="rough-line" strokeWidth="2.2" d="M78 135 C64 70 112 30 171 29 C231 23 285 64 284 131 C290 177 259 220 224 238 L219 273 L258 298 L102 298 L142 272 L137 235 C103 215 78 179 78 135Z"/>
        <path strokeWidth="1.2" d="M74 123 C48 95 79 42 119 26 M86 93 C97 62 113 48 134 42 M268 74 C292 99 304 133 291 160 M279 174 C270 202 251 219 236 229"/>
        <path strokeWidth="1.6" d="M87 126 C104 112 125 112 145 126 M208 126 C229 111 252 112 270 125"/>
        <path strokeWidth="2.5" d="M92 130 L143 137 M211 137 L265 128"/>
        <path strokeWidth="1.5" d="M101 144 C116 156 132 156 146 143 M209 143 C224 157 244 154 256 140"/>
        <path strokeWidth="1.4" d="M166 151 C161 176 155 184 169 188 M183 189 L194 188 M172 205 C183 210 196 208 205 203"/>
        <path strokeWidth="1.2" d="M142 232 C160 246 199 249 222 231 M133 268 C156 280 199 280 223 267"/>
        <path strokeWidth="1.4" d="M153 35 C136 68 146 96 131 118 M184 29 C190 68 171 91 181 117 M220 37 C239 66 226 93 242 115"/>
        <path strokeWidth="1.1" d="M75 146 C60 169 72 197 87 211 M283 148 C299 172 285 199 270 211"/>
        <path strokeWidth="1.4" d="M96 301 C66 294 42 306 27 321 M252 300 C280 293 306 306 331 322"/>
      </g>
    </svg>
  )
}

function Landing({ navigate }) {
  return (
    <section className="page landing-page">
      <div className="landing-kicker"><span className="tiny-star">✳</span> INDEPENDENT ARTIST / DIGITAL SKETCHBOOK</div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">WELCOME TO MY LITTLE CORNER</p>
          <h1>Drawn from<br /><span>daydreams.</span></h1>
          <p className="hero-description">A collection of characters, unfinished thoughts, and little things I wanted to keep.</p>
          <button className="primary-button" onClick={() => navigate('main')}>Enter the gallery <ArrowDownRight size={17} /></button>
          <span className="hero-footnote">SCROLL A LITTLE, STAY A WHILE.</span>
        </div>
        <div className="portrait-stage">
          <div className="portrait-note note-top">fig. 01 — a familiar face</div>
          <div className="portrait-paper"><DoodlePortrait /><span className="portrait-caption">a study in progress</span></div>
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="stage-index">LOYN® / 001</span>
          <span className="stage-sticker">not quite<br />finished ✳</span>
        </div>
      </div>
      <div className="landing-gallery">
        <div className="section-heading">
          <div><span className="eyebrow">A FEW THINGS I MADE</span><h2>Little gallery<span className="red-dot">.</span></h2></div>
          <button className="underlined-link" onClick={() => navigate('main')}>View all works <ArrowUpRight size={15} /></button>
        </div>
        <GalleryStrip />
      </div>
      <footer className="site-footer"><span>LOYN — PERSONAL ART ARCHIVE</span><span>MADE SLOWLY, WITH CARE ↗</span></footer>
    </section>
  )
}

function GalleryStrip() {
  return (
    <div className="hanging-gallery">
      {artworks.slice(0, 4).map((art, index) => (
        <div className={`hanging-item hang-${index + 1}`} key={art.title}>
          <span className="clip" />
          <div className={`artwork-placeholder ${art.tone}`}><DoodlePortrait /></div>
          <span className="artwork-label">{art.title}</span>
        </div>
      ))}
    </div>
  )
}

function MainPage({ navigate }) {
  const [selected, setSelected] = useState(null)
  return (
    <section className="page main-page">
      <div className="page-intro">
        <div><p className="eyebrow">THE ART ARCHIVE / 2024—2026</p><h1>Collected<br /><span>moments.</span></h1></div>
        <p className="intro-aside">Sketches, characters, and pieces from the corners of my mind. Some finished, some still becoming.</p>
      </div>
      <div className="archive-toolbar"><span><span className="status-dot" /> {artworks.length} WORKS IN THE ARCHIVE</span><span>PERSONAL WORKS / 01—06</span></div>
      <div className="artwork-grid">
        {artworks.map((art, index) => (
          <button className={`artwork-card card-${index + 1}`} key={art.title} onClick={() => setSelected(art)} aria-label={`Open ${art.title}`}>
            <div className={`artwork-image ${art.tone}`}><DoodlePortrait /><span className="image-index">0{index + 1}</span><span className="image-open"><ArrowUpRight size={18} /></span></div>
            <div className="artwork-meta"><span>{art.title}</span><span>{art.kind}</span></div>
          </button>
        ))}
      </div>
      <section className="commission-cta">
        <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
        <h2>Let's make it<br /><em>something real.</em></h2>
        <button className="primary-button" onClick={() => navigate('commission')}>Explore commissions <ArrowUpRight size={17} /></button>
        <Sparkles className="cta-sparkle" size={38} strokeWidth={1} />
      </section>
      <footer className="site-footer"><span>LOYN — PERSONAL ART ARCHIVE</span><button onClick={() => navigate('landing')}>BACK TO LANDING ↑</button></footer>
      {selected && <ArtworkModal art={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function ArtworkModal({ art, onClose }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div className="art-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className={`modal-art ${art.tone}`}><DoodlePortrait /></div>
        <p className="eyebrow">{art.kind}</p><h2>{art.title}</h2><p className="muted">{art.note}</p>
      </div>
    </div>
  )
}

function CommissionPage({ navigate }) {
  const [active, setActive] = useState(1)
  const panel = commissionPanels[active]
  const prev = () => setActive((active + commissionPanels.length - 1) % commissionPanels.length)
  const next = () => setActive((active + 1) % commissionPanels.length)
  return (
    <section className="page commission-page">
      <div className="page-intro commission-intro">
        <div><p className="eyebrow">MADE TO ORDER / BY LOYN</p><h1>Commission<span className="red-dot">.</span></h1></div>
        <p className="intro-aside">Have a character or idea you want to bring to life? Here are the details before we start.</p>
      </div>
      <div className="commission-layout">
        <button className="side-preview side-left" onClick={prev}>
          <span className="side-label">{commissionPanels[(active + 2) % 3].title}</span>
          <div className={`side-scribble side-art-${(active + 2) % 3}`}><DoodlePortrait /></div>
          <span className="side-arrow"><ChevronLeft size={20} /></span>
        </button>
        <article className="active-panel" key={panel.title}>
          <div className="panel-topline"><span>{panel.eyebrow}</span><span>LOYN / COMMISSIONS</span></div>
          <div className="panel-title-row"><div><h2>{panel.title}</h2><p>{panel.subtitle}</p></div><span className="panel-count">0{active + 1}<i> / 03</i></span></div>
          <div className="panel-content">
            {panel.content.map(([title, body], index) => (
              <div className="info-row" key={title}><span className="info-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></div>
            ))}
          </div>
          {active === 2 && <p className="price-note">* Replace the sample price text with your actual rates before publishing.</p>}
          <div className="panel-bottom"><span>PLEASE READ BEFORE ORDERING</span><span>✳</span></div>
        </article>
        <button className="side-preview side-right" onClick={next}>
          <span className="side-label">{commissionPanels[(active + 1) % 3].title}</span>
          <div className={`side-scribble side-art-${(active + 1) % 3}`}><DoodlePortrait /></div>
          <span className="side-arrow"><ChevronRight size={20} /></span>
        </button>
      </div>
      <div className="carousel-controls">
        <button className="circle-button" onClick={prev} aria-label="Previous commission section"><ArrowLeft size={17} /></button>
        <div className="carousel-dots">{commissionPanels.map((item, index) => <button key={item.title} className={index === active ? 'dot active' : 'dot'} onClick={() => setActive(index)} aria-label={`Show ${item.title}`} />)}</div>
        <span className="carousel-status">0{active + 1} / 03</span>
        <button className="circle-button" onClick={next} aria-label="Next commission section"><ArrowRight size={17} /></button>
      </div>
      <div className="order-banner">
        <div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Let's talk<br /><em>about your idea.</em></h2></div>
        <a className="primary-button" href={VGEN_URL} target="_blank" rel="noreferrer">Order on VGen <ExternalLink size={16} /></a>
      </div>
      <footer className="site-footer"><span>LOYN — COMMISSION INFORMATION</span><button onClick={() => navigate('main')}>BACK TO GALLERY ↑</button></footer>
    </section>
  )
}

function InfoPage({ type, navigate }) {
  const isQueue = type === 'queue'
  return (
    <section className="page simple-page">
      <p className="eyebrow">{isQueue ? 'CURRENT STATUS' : 'A LITTLE ABOUT ME'}</p>
      <h1>{isQueue ? 'Commission queue.' : 'Hello, I’m Loyn.'}</h1>
      <div className="simple-card">
        <span className="status-dot" />
        <h2>{isQueue ? 'Queue information coming soon.' : 'An artist collecting little moments.'}</h2>
        <p>{isQueue ? 'Add your current queue, estimated progress, or a link to a public queue tracker here.' : 'This section is ready for your introduction, contact links, and a few words about your art.'}</p>
        {!isQueue && <a className="underlined-link" href={VGEN_URL} target="_blank" rel="noreferrer">Find me on VGen <ExternalLink size={15} /></a>}
      </div>
      <button className="underlined-link" onClick={() => navigate('main')}><ArrowLeft size={15} /> Back to gallery</button>
    </section>
  )
}

export default function App() {
  const [page, setPage] = useState('landing')
  const [previousPage, setPreviousPage] = useState('landing')
  const [menuOpen, setMenuOpen] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)

  const navigate = (nextPage) => {
    if (nextPage === page) return
    setPreviousPage(page)
    setPage(nextPage)
    setTransitionKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const goBack = () => navigate(previousPage === page ? 'main' : previousPage)
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="site-shell">
      <div className="paper-grain" aria-hidden="true" />
      <Header onMenu={() => setMenuOpen(true)} onHome={() => navigate('landing')} onBack={goBack} current={page} />
      <main className="main-content" key={transitionKey}>
        <div className="page-transition">
          {page === 'landing' && <Landing navigate={navigate} />}
          {page === 'main' && <MainPage navigate={navigate} />}
          {page === 'commission' && <CommissionPage navigate={navigate} />}
          {(page === 'about' || page === 'queue') && <InfoPage type={page} navigate={navigate} />}
        </div>
      </main>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </div>
  )
}
