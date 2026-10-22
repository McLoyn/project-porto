import { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowLeft, ArrowUpRight, ChevronLeft,
  House, Menu, X, ExternalLink, Sparkles, Instagram, Twitter, Mail
} from 'lucide-react'

const VGEN_URL = 'https://vgen.co/loyn'
const heroSocials = [
  ['X', 'https://x.com/loynillust', <Twitter size={16} strokeWidth={1.6} key="x" />],
  ['Instagram', 'https://www.instagram.com/loynillust', <Instagram size={16} strokeWidth={1.6} key="ig" />],
  ['Email', 'mailto:ozloynn@gmail.com', <Mail size={16} strokeWidth={1.6} key="mail" />],
  ['VGen', VGEN_URL, <span className="vgen-letter" key="vgen">V</span>],
]
const TRELLO_URL = 'https://trello.com/b/j8EIfMRz/loyn-workspace'
const socials = [
  ['X / Twitter', 'https://x.com/loynillust'],
  ['Instagram', 'https://www.instagram.com/loynillust'],
  ['WhatsApp', 'https://wa.me/6287733660846'],
  ['Email', 'mailto:ozloynn@gmail.com'],
  ['VGen', VGEN_URL],
]

const artworks = [
  { title: 'The Frame',      kind: 'Illustration',    tone: 'artwork-one',   note: 'digital painting', src: '/art/01.jpg', thumb: '/art/thumb/01.jpg' },
  { title: 'Shattered',      kind: 'Illustration',    tone: 'artwork-two',   note: 'digital',          src: '/art/02.jpg', thumb: '/art/thumb/02.jpg' },
  { title: 'Training',           kind: 'Character study', tone: 'artwork-three', note: 'digital sketch',   src: '/art/03.jpg', thumb: '/art/thumb/03.jpg' },
  { title: 'Crow & Bridge',  kind: 'Character design', tone: 'artwork-four', note: 'digital',          src: '/art/04.jpg', thumb: '/art/thumb/04.jpg' },
  { title: 'Lying in Grass', kind: 'Illustration',    tone: 'artwork-five',  note: 'digital',          src: '/art/05.jpg', thumb: '/art/thumb/05.jpg' },
  { title: 'Golden Field',   kind: 'Illustration',    tone: 'artwork-six',   note: 'digital painting', src: '/art/06.jpg', thumb: '/art/thumb/06.jpg' },
  { title: 'Lady Vertin',    kind: 'Portrait',        tone: 'artwork-one',   note: 'digital painting', src: '/art/07.jpg', thumb: '/art/thumb/07.jpg' },
]

const quickFacts = [
  ['Order via', 'VGen / direct (local)'],
  ['Down payment', '50%'],
  ['Rough sketch', '1–4 days'],
  ['Full render', '7–30 days'],
]

const basePrice = [
  ['Bust up', '1', '50k', '40k', '15'],
  ['Half body', '1', null, '80k', '20'],
  ['Full body', '1', null, '120k', '40'],
]

const additionalPrice = [
  ['Monetized content', '+40%', '+40%'],
  ['Commercial merch', '+80%', '+80%'],
  ['Minor revision', 'Free', 'Free'],
  ['Major revision', '20k', '5'],
]

const willNot = ['NSFW', 'Hard Mecha', 'Heavy Gore']
const willDraw = ['Original Character', 'FanArt', 'Kemonomimi']

const terms = [
  ['Platform', 'Main commission is on VGen for safety (international). Local payment via Gopay or Dana.'],
  ['Payment', '50% down payment before the project starts; the remaining 50% before the final file is sent. Non-refundable.'],
  ['Rough sketch', '1–4 days.'],
  ['Full render', '7–30 days, counted after the sketch/lineart is approved.'],
  ['Revisions', '2 major revisions and unlimited minor revisions.'],
  ['Portfolio', 'Commissioned artworks may be shown in my portfolio (website, social media, etc).'],
  ['Files', 'Google Drive share for the terms and files is available for 30 days.'],
]

const steps = [
  ['Order', 'Choose a type and send your idea and references on VGen (or contact me directly for local payment).'],
  ['Down payment', 'Pay 50% to start the project.'],
  ['Sketch', 'Rough sketch in 1–4 days. Check the composition and request changes.'],
  ['Render', 'Full render in 7–30 days after the sketch/lineart is approved.'],
  ['Delivery', 'Pay the remaining 50%, then receive the final file.'],
]

function Header({ onMenu, onHome, onBack, current }) {
  return (
    <div className="topbar-wrap">
      <header className="topbar">
        <div className="topbar-left">
          <button className="brand-button" onClick={onMenu} aria-label="Open navigation menu">
            <Menu size={20} strokeWidth={1.7} />
          </button>
          <button className="brand-mark" onClick={onHome} aria-label="Go to landing page">
            <span className="brand-scribble">loyn</span>
            <span className="brand-dot" />
          </button>
        </div>
        <div className="topbar-right">
          {current !== 'landing' && (
            <button className="text-link" onClick={onBack}><ChevronLeft size={14} /> Back</button>
          )}
          <button className="text-link" onClick={onHome}><House size={14} /> Home</button>
        </div>
      </header>
    </div>
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
      <div className="landing-kicker"><span className="tiny-star">✳</span> FREELANCE ARTIST / DIGITAL PORTFOLIO</div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">WELCOME TO LOYN'S LITTLE CORNER</p>
          <h1>Drawn from<br /><span>daydreams.</span></h1>
          <p className="hero-description">A collection of characters, unfinished thoughts, and little things I wanted to keep.</p>
          <button className="primary-button" onClick={() => navigate('main')}>Enter the gallery <ArrowDownRight size={17} /></button>
          <div className="hero-socials">
            {heroSocials.map(([label, href, icon]) => (
              <a key={label} className="social-circle" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="portrait-stage">
          <div className="portrait-note note-top">fig. 01 — a familiar face</div>
          <div className="portrait-paper">
             <img className="hero-img" src="/art/a1.jpg" alt="Loyn artwork" />
             <span className="portrait-caption">a study in progress</span>
          </div>
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
      <footer className="site-footer"><span>LOYN ILLUST — COMMISSION SHEET</span><span>MADE SLOWLY, WITH CARE ↗</span></footer>
    </section>
  )
}

function GalleryStrip() {
  return (
    <div className="hanging-gallery">
      {artworks.slice(0, 4).map((art, index) => (
        <div className={`hanging-item hang-${index + 1}`} key={art.title}>
          <span className="clip" />
          <div className={`artwork-placeholder ${art.tone}`}><img src={art.thumb} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <span className="artwork-label">{art.title}</span>
        </div>
      ))}
    </div>
  )
}

const ropes = [
  { cls: 'rope-back', y0: 30, yc: 90, y1: 20, count: 2 },
  { cls: 'rope-mid', y0: 10, yc: 75, y1: 45, count: 3 },
  { cls: 'rope-front', y0: 85, yc: 60, y1: 15, count: 3 },
]
const tilts = [-4, 3, -2, 5, -5, 2, -3, 4]

const ropeY = ({ y0, yc, y1 }, t) =>
  (1 - t) ** 2 * y0 + 2 * (1 - t) * t * yc + t ** 2 * y1

function GalleryPage({ navigate }) {
  const [selected, setSelected] = useState(null)

  let cursor = 0
  const rows = ropes.map((rope, i) => {
    const take = i === ropes.length - 1 ? artworks.length - cursor : rope.count
    const items = artworks.slice(cursor, cursor + take).map((art, k, arr) => ({
      art,
      t: (k + 1) / (arr.length + 1),
      tilt: tilts[(cursor + k) % tilts.length],
    }))
    cursor += take
    return { rope, items }
  })

  return (
    <section className="page gallery-page">
      <h1 className="gallery-title">Gallery</h1>

      {rows.map(({ rope, items }) => (
        <div className={`rope-row ${rope.cls}`} key={rope.cls}>
          <svg className="rope-svg" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={`M0 ${rope.y0} Q500 ${rope.yc} 1000 ${rope.y1}`} vectorEffect="non-scaling-stroke" />
          </svg>
          {items.map(({ art, t, tilt }) => (
            <button
              key={art.title}
              className="hung-paper"
              style={{
                left: `${t * 100}%`,
                top: `calc(var(--rope-h) * ${ropeY(rope, t) / 100})`,
                '--tilt': `${tilt}deg`,
              }}
              onClick={() => setSelected(art)}
              aria-label={`Open ${art.title}`}
            >
              <span className="peg" />
              <span className="paper-sheet">
                {art.src ? <img src={art.thumb || art.src} alt={art.title} loading="lazy" /> : <DoodlePortrait />}
              </span>
            </button>
          ))}
        </div>
      ))}

      <button className="gallery-back" onClick={() => navigate('landing')}>
        <ArrowLeft size={18} /> Back
      </button>

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
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className={`modal-art ${art.tone}`}>
          {art.src ? <img className="modal-img" src={art.src} alt={art.title} /> : <DoodlePortrait />}
        </div>
        <p className="eyebrow">{art.kind}</p><h2>{art.title}</h2><p className="muted">{art.note}</p>
      </div>
    </div>
  )
}

function CommissionPage({ navigate }) {
  const rows = Math.max(willNot.length, willDraw.length)
  return (
    <section className="page commission-page">
      <div className="page-intro commission-intro">
        <div><p className="eyebrow">MADE TO ORDER / BY LOYN</p><h1>Commission<span className="red-dot">.</span></h1></div>
        <p className="intro-aside">Everything you need to know before ordering: prices, what I draw, and how it works.</p>
      </div>
      <dl className="quick-facts">
        {quickFacts.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>

      <nav className="jump-nav" aria-label="Sections">
        <a href="#price">Price</a><a href="#notes">What I draw</a><a href="#process">How it works</a><a href="#terms">Terms</a>
      </nav>

      <section id="price" className="info-section">
        <h2><span>01</span> Base price</h2>
        <div className="table-scroll">
          <table className="info-table">
            <thead><tr><th>Part</th><th>Figure</th><th>IDR</th><th>USD</th></tr></thead>
            <tbody>
              {basePrice.map(([part, figure, oldIdr, idr, usd]) => (
                <tr key={part}>
                  <th scope="row">{part}</th>
                  <td>{figure}</td>
                  <td>{oldIdr && <s className="old-price">{oldIdr}</s>} <strong>{idr}</strong></td>
                  <td>${usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Additional</h3>
        <div className="table-scroll">
          <table className="info-table">
            <thead><tr><th>Detail</th><th>IDR</th><th>USD</th></tr></thead>
            <tbody>
              {additionalPrice.map(([detail, idr, usd]) => (
                <tr key={detail}>
                  <th scope="row">{detail}</th>
                  <td className={idr === 'Free' ? 'is-free' : ''}>{idr}</td>
                  <td className={usd === 'Free' ? 'is-free' : ''}>{/^\d/.test(usd) ? `$${usd}` : usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">Percentages (+40%, +80%) are added on top of the base price.</p>
      </section>

      <section id="notes" className="info-section">
        <h2><span>02</span> What I draw</h2>
        <div className="table-scroll">
          <table className="info-table notes-table">
            <thead><tr><th className="col-yes">Will draw</th><th className="col-no">Will NOT draw</th></tr></thead>
            <tbody>
              {Array.from({ length: rows }).map((_, i) => (
                <tr key={i}><td>{willDraw[i] || ''}</td><td>{willNot[i] || ''}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="process" className="info-section">
        <h2><span>03</span> How it works</h2>
        <div className="table-scroll">
          <table className="info-table">
            <thead><tr><th>Step</th><th>What happens</th></tr></thead>
            <tbody>
              {steps.map(([name, text], i) => (
                <tr key={name}><th scope="row"><span className="step-no">{i + 1}</span> {name}</th><td>{text}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="terms" className="info-section">
        <h2><span>04</span> Terms of service</h2>
        <div className="table-scroll">
          <table className="info-table">
            <thead><tr><th>Topic</th><th>Details</th></tr></thead>
            <tbody>
              {terms.map(([topic, detail]) => (
                <tr key={topic}><th scope="row">{topic}</th><td>{detail}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="order-banner">
        <div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Let's talk<br /><em>about your idea.</em></h2></div>
        <div className="order-actions">
          <a className="primary-button" href={VGEN_URL} target="_blank" rel="noreferrer">Order on VGen <ExternalLink size={16} /></a>
          <a className="underlined-link" href={TRELLO_URL} target="_blank" rel="noreferrer">Check the queue <ExternalLink size={14} /></a>
        </div>
      </div>

      <a className="order-sticky" href={VGEN_URL} target="_blank" rel="noreferrer">Order on VGen <ExternalLink size={15} /></a>

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
        <h2>{isQueue ? 'Follow my progress on Trello.' : 'Loyn Illust — illustrator.'}</h2>
        {isQueue ? (
          <>
            <p>My current commission queue is updated on my Trello board.</p>
            <a className="underlined-link" href={TRELLO_URL} target="_blank" rel="noreferrer">Open queue <ExternalLink size={15} /></a>
          </>
        ) : (
          <>
            <p>Commissions open for original characters, fanart, and kemonomimi. Find me here:</p>
            <ul className="contact-list">
              {socials.map(([label, href]) => (
                <li key={label}><a className="underlined-link" href={href} target="_blank" rel="noreferrer">{label} <ExternalLink size={14} /></a></li>
              ))}
            </ul>
          </>
        )}
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
          {page === 'main' && <GalleryPage navigate={navigate} />}
          {page === 'commission' && <CommissionPage navigate={navigate} />}
          {(page === 'about' || page === 'queue') && <InfoPage type={page} navigate={navigate} />}
        </div>
      </main>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
    </div>
  )
}
