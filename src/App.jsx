import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft,
  Menu, X, ExternalLink, Sparkles, Instagram, Twitter, Mail, Moon, Sun
} from 'lucide-react'

const VGEN_URL = 'https://vgen.co/loyn'
const CARRD_URL = 'https://loynn.carrd.co'
const heroSocials = [
  ['X', 'https://x.com/loynillust', <Twitter size={16} strokeWidth={1.6} key="x" />],
  ['Instagram', 'https://www.instagram.com/loynillust', <Instagram size={16} strokeWidth={1.6} key="ig" />],
  ['Email', 'mailto:ozloynn@gmail.com', <Mail size={16} strokeWidth={1.6} key="mail" />],
  ['VGen', VGEN_URL, <img className="social-img" src="/icons/vgen.png" alt="" key="vgen" />],
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
  ['Order via', <><a className="inline-link" href={VGEN_URL} target="_blank" rel="noreferrer">VGen</a> / direct (local)</>],
  ['Down payment', '50%'],
  ['Rough sketch', '1–4 days'],
  ['Full render', '7–30 days'],
]

const basePrice = [
  ['Bust up', '1', '50k', '40k', '15', 'https://vgen.co/loyn/service/illustration-bust-up-/4c0df3fd-6328-42ef-8098-83d9447687aa'],
  ['Half body', '1', null, '80k', '20', 'https://vgen.co/loyn/service/illustration-half-body-knee-up-/cf73821a-28f8-4d48-836a-e942a753f81d'],
  ['Full body', '1', null, '120k', '40', 'https://vgen.co/loyn/service/illustration-full-body-/85d39179-8815-4559-b487-b5739a92c3d6'],
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

const bookContacts = [
  ['X', 'https://x.com/loynillust'],
  ['Instagram', 'https://www.instagram.com/loynillust'],
  ['Email', 'mailto:ozloynn@gmail.com'],
]

const fmtUsd = (value) => (/^\d/.test(value) ? `$${value}` : value)

function BaseTable() {
  return (
    <div className="table-scroll">
      <table className="info-table">
        <thead><tr><th>Part</th><th>Figure</th><th>IDR</th><th>USD</th></tr></thead>
        <tbody>
          {basePrice.map(([part, figure, oldIdr, idr, usd, href]) => (
            <tr key={part} className="row-link">
              <th scope="row">
                <a className="row-link-anchor" href={href} target="_blank" rel="noreferrer" aria-label={`Order ${part} on VGen`}>
                  {part} <ArrowUpRight size={14} />
                </a>
              </th>
              <td>{figure}</td>
              <td>{oldIdr && <s className="old-price">{oldIdr}</s>} <strong>{idr}</strong></td>
              <td>${usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ExtraTable() {
  return (
    <div className="table-scroll">
      <table className="info-table">
        <thead><tr><th>Detail</th><th>IDR</th><th>USD</th></tr></thead>
        <tbody>
          {additionalPrice.map(([detail, idr, usd]) => (
            <tr key={detail}>
              <th scope="row">{detail}</th>
              <td className={idr === 'Free' ? 'is-free' : ''}>{idr}</td>
              <td className={usd === 'Free' ? 'is-free' : ''}>{fmtUsd(usd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ScopeTable() {
  const rows = Math.max(willNot.length, willDraw.length)
  return (
    <div className="table-scroll">
      <table className="info-table notes-table">
        <thead><tr><th className="col-yes">Will draw</th><th className="col-no">Will NOT draw</th></tr></thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index}><td>{willDraw[index] || ''}</td><td>{willNot[index] || ''}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StepsTable() {
  return (
    <div className="table-scroll">
      <table className="info-table stack-sm">
        <thead><tr><th>Step</th><th>What happens</th></tr></thead>
        <tbody>
          {steps.map(([name, text], index) => (
            <tr key={name}><th scope="row"><span className="step-no">{index + 1}</span> {name}</th><td>{text}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TermsTable() {
  return (
    <div className="table-scroll">
      <table className="info-table stack-sm">
        <thead><tr><th>Topic</th><th>Details</th></tr></thead>
        <tbody>
          {terms.map(([topic, detail]) => (
            <tr key={topic}><th scope="row">{topic}</th><td>{detail}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Header({ onMenu, onHome, onBack, onNavigate, theme, onToggleTheme, current }) {
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
        <nav className="topbar-right" aria-label="Main">
          {current !== 'landing' && (
            <button className="text-link" onClick={onBack} aria-label="Back">
              <ChevronLeft size={14} /><span className="hide-sm">Back</span>
            </button>
          )}
          <button
            className={`nav-link ${current === 'commission' ? 'active' : ''}`}
            onClick={() => onNavigate('commission')}
          >
            Commission
          </button>
          <a className="nav-link hide-sm" href={TRELLO_URL} target="_blank" rel="noreferrer">
            Queue <ArrowUpRight size={13} />
          </a>
          <a className="nav-cta hide-sm" href={VGEN_URL} target="_blank" rel="noreferrer">
            Order on VGen <ExternalLink size={13} />
          </a>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
          </button>
        </nav>
      </header>
    </div>
  )
}

function MenuDrawer({ open, onClose, navigate }) {
  if (!open) return null
  const links = [
    ['Home', 'landing'],
    ['Gallery', 'main'],
    ['Commission info', 'commission'],
    ['About & Contact', 'about'],
  ]
  return (
    <div className="drawer-scrim" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-heading">
          <span className="eyebrow">LOYN / INDEX</span>
          <button className="icon-button" onClick={onClose} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className="drawer-cta">
          <a className="drawer-order" href={VGEN_URL} target="_blank" rel="noreferrer">
            <span>Order on VGen</span><ExternalLink size={16} />
          </a>
          <a className="drawer-queue" href={TRELLO_URL} target="_blank" rel="noreferrer">
            <span>Commission queue</span><ArrowUpRight size={16} />
          </a>
        </div>
        <nav className="drawer-links">
          {links.map(([label, page], index) => (
            <button key={page} onClick={() => { navigate(page); onClose() }}>
              <span className="drawer-number">0{index + 1}</span>{label}<ArrowUpRight size={16} />
            </button>
          ))}
        </nav>
        <a className="drawer-simple" href={CARRD_URL} target="_blank" rel="noreferrer">
          <span><strong>Simple mode</strong><small>Plain, fast version of this site</small></span>
          <ExternalLink size={15} />
        </a>
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
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigate('main')}>Enter the gallery <ArrowDownRight size={17} /></button>
            <button className="ghost-button" onClick={() => navigate('commission')}>Commission info <ArrowUpRight size={16} /></button>
          </div>
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

const ROPES = [
  { key: 'front', paperW: 170, gap: 60, ropeH: 120, sag: 40, opacity: 1,   anchors: [60, 20, 70, 10, 50, 30] },
  { key: 'mid',   paperW: 140, gap: 70, ropeH: 100, sag: 34, opacity: 0.8, anchors: [20, 55, 15, 50, 25, 60] },
  { key: 'back',  paperW: 110, gap: 80, ropeH: 80,  sag: 26, opacity: 0.4, anchors: [40, 15, 45, 10, 35, 20] },
]
const TILTS = [-4, 3, -2, 5, -5, 2, -3, 4]

function buildRow(cfg, r, items, s, vw) {
  const paperW = cfg.paperW * s
  const spacing = (cfg.paperW + cfg.gap) * s
  const seg = spacing * 2
  const ropeH = cfg.ropeH * s
  const sag = cfg.sag * s
  const segs = Math.max(1, Math.ceil(items.length / 2))
  const lonely = items.length % 2 === 1
  const segLen = (k) => (lonely && k === segs - 1 ? spacing : seg)
  const xs = [0]
  for (let k = 0; k < segs; k++) xs.push(xs[k] + segLen(k))
  const inner = xs[segs]
  const padX = Math.max(60 * s, (vw - inner) / 2)
  const width = inner + padX * 2
  const a = (i) => cfg.anchors[i % cfg.anchors.length] * s

  let path = `M0 ${a(0)} L${padX} ${a(0)} `
  for (let k = 0; k < segs; k++) {
    const x0 = padX + xs[k], len = segLen(k)
    path += `M${x0} ${a(k)} Q${x0 + len / 2} ${(a(k) + a(k + 1)) / 2 + sag} ${x0 + len} ${a(k + 1)} `
  }
  path += `M${padX + inner} ${a(segs)} L${width} ${a(segs)}`

  const placed = items.map((art, i) => {
    const k = Math.floor(i / 2)
    const t = lonely && k === segs - 1 ? 0.5 : i % 2 === 0 ? 0.25 : 0.75
    const y0 = a(k), y1 = a(k + 1), c = (y0 + y1) / 2 + sag
    return {
      art,
      x: padX + xs[k] + t * segLen(k),
      y: (1 - t) ** 2 * y0 + 2 * (1 - t) * t * c + t ** 2 * y1,
      tilt: TILTS[(i * 3 + r) % TILTS.length],
    }
  })
  return { key: cfg.key, r, width, ropeH, paperW, opacity: cfg.opacity, path, placed,
           height: ropeH + paperW * 1.25 + 24 * s }
}

function GalleryPage({ navigate }) {
  const [selected, setSelected] = useState(null)
  const [vw, setVw] = useState(1000)
  const [hinted, setHinted] = useState(true)
  const stageRef = useRef(null)
  const rowRefs = useRef([])
  const thumbRef = useRef(null)
  const m = useRef({ target: 0, current: 0, max: [0, 0, 0], front: 1, ratio: 1, drag: null, moved: false, raf: 0 })

  const s = Math.min(1, Math.max(0.6, vw / 1100))
  const rows = useMemo(
    () => ROPES.map((cfg, r) => buildRow(cfg, r, artworks.filter((_, i) => i % 3 === r), s, vw)),
    [s, vw]
  )

  const apply = useCallback(() => {
    const st = m.current
    const p = st.front > 1 ? st.current / st.front : 0
    rowRefs.current.forEach((el, r) => {
      if (el) el.style.transform = `translate3d(${-p * st.max[r]}px,0,0)`
    })
    if (thumbRef.current) {
      thumbRef.current.style.width = `${st.ratio * 100}%`
      thumbRef.current.style.left = `${p * (1 - st.ratio) * 100}%`
    }
  }, [])

  const tick = useCallback(() => {
    const st = m.current
    st.current += (st.target - st.current) * (st.drag ? 0.35 : 0.12)
    if (Math.abs(st.target - st.current) < 0.3) {
      st.current = st.target
      st.raf = 0
    } else {
      st.raf = requestAnimationFrame(tick)
    }
    apply()
  }, [apply])

  const goTo = useCallback((x) => {
    const st = m.current
    st.target = Math.min(st.front, Math.max(0, x))
    if (!st.raf) st.raf = requestAnimationFrame(tick)
    setHinted(false)
  }, [tick])

  useEffect(() => {
    const el = stageRef.current
    const ro = new ResizeObserver(() => setVw(el.clientWidth))
    ro.observe(el)
    setVw(el.clientWidth)
    return () => { ro.disconnect(); cancelAnimationFrame(m.current.raf) }
  }, [])

  useEffect(() => {
    const st = m.current
    st.max = rows.map((row) => Math.max(0, row.width - vw))
    st.front = Math.max(1, st.max[0])
    st.ratio = Math.min(1, vw / rows[0].width)
    st.target = Math.min(st.target, st.front)
    st.current = Math.min(st.current, st.front)
    apply()
  }, [rows, vw, apply])

  useEffect(() => {
    const el = stageRef.current
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault()
        goTo(m.current.target + (e.deltaX || e.deltaY))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [goTo])

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const st = m.current
    st.moved = false
    st.drag = { x: e.clientX, start: st.target, id: e.pointerId, last: e.clientX, t: performance.now(), v: 0 }
  }

  const onPointerMove = (e) => {
    const st = m.current, d = st.drag
    if (!d) return
    const dx = e.clientX - d.x
    if (!st.moved && Math.abs(dx) > 6) {
      st.moved = true
      e.currentTarget.setPointerCapture(d.id)
    }
    if (st.moved) {
      const now = performance.now()
      d.v = (d.last - e.clientX) / Math.max(1, now - d.t)
      d.last = e.clientX
      d.t = now
      goTo(d.start - dx)
    }
  }

  const endDrag = () => {
    const st = m.current, d = st.drag
    st.drag = null
    if (st.moved && d) goTo(st.target + d.v * 220)
  }

  const step = Math.max(240, vw * 0.6)
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(m.current.target + step) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(m.current.target - step) }
  }

  return (
    <section className="page gallery-page">
      <h1 className="gallery-title">Gallery</h1>

      <div
        className="rope-stage"
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label="Gallery. Drag sideways or use the arrow keys to see more artworks."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        onScroll={(e) => { e.currentTarget.scrollLeft = 0 }}
        onClickCapture={(e) => { if (m.current.moved) { e.preventDefault(); e.stopPropagation(); m.current.moved = false } }}
      >
        {[...rows].reverse().map((row) => (
          <div
            key={row.key}
            className="rope-track"
            ref={(el) => { rowRefs.current[row.r] = el }}
            style={{ width: row.width, height: row.height, opacity: row.opacity, zIndex: 3 - row.r }}
          >
            <svg className="rope-line" width={row.width} height={row.ropeH} aria-hidden="true">
              <path d={row.path} />
            </svg>
            {row.placed.map(({ art, x, y, tilt }) => (
              <button
                key={art.title}
                className="hung-paper"
                style={{ left: x, top: y, width: row.paperW, '--tilt': `${tilt}deg` }}
                onClick={() => setSelected(art)}
                aria-label={`Open ${art.title}`}
              >
                <span className="peg" />
                <span className="paper-sheet">
                  {art.src ? <img src={art.thumb || art.src} alt={art.title} loading="lazy" draggable="false" /> : <DoodlePortrait />}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="gallery-controls">
        <button className="circle-button" onClick={() => goTo(m.current.target - step)} aria-label="Previous artworks"><ArrowLeft size={17} /></button>
        <div className="scrubber" aria-hidden="true"><span ref={thumbRef} /></div>
        <button className="circle-button" onClick={() => goTo(m.current.target + step)} aria-label="Next artworks"><ArrowRight size={17} /></button>
      </div>
      <p className={`drag-hint ${hinted ? '' : 'gone'}`}>drag sideways to see more ✳</p>

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

function Leaf({ eyebrow, title, children }) {
  return (
    <div className="leaf">
      <div className="leaf-scroll">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="leaf-title">{title}</h2>
        {children}
      </div>
    </div>
  )
}

function CoverPage({ onOpen }) {
  const art = artworks[0]
  return (
    <button className="cover" onClick={onOpen} aria-label="Open the commission book">
      <span className="cover-eyebrow">MADE TO ORDER ✳ BY LOYN</span>
      <span className="cover-frame">
        {art?.thumb ? <img src={art.thumb} alt="" draggable="false" /> : <DoodlePortrait />}
      </span>
      <span className="cover-title">Commission<i>.</i></span>
      <span className="cover-sub">prices · scope · terms</span>
      <span className="cover-open">Open <ArrowRight size={15} /></span>
    </button>
  )
}

const WelcomePage = () => (
  <Leaf eyebrow="BEFORE YOU ORDER" title="Quick facts">
    <dl className="facts-list">
      {quickFacts.map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
    <p className="leaf-note">Turn the page for prices. Tap any price row to open that service on VGen.</p>
  </Leaf>
)

const BasePage = () => (
  <Leaf eyebrow="01 / INVESTMENT" title="Base price">
    <BaseTable />
    <p className="table-note">Tap a row to order that type on VGen.</p>
  </Leaf>
)

const ExtraPage = () => (
  <Leaf eyebrow="02 / ADD-ONS" title="Additional">
    <ExtraTable />
    <p className="table-note">Percentages are added on top of the base price.</p>
  </Leaf>
)

const ScopePage = () => (
  <Leaf eyebrow="03 / SCOPE" title="What I draw"><ScopeTable /></Leaf>
)

const ProcessPage = () => (
  <Leaf eyebrow="04 / PROCESS" title="How it works"><StepsTable /></Leaf>
)

const TermsPage = () => (
  <Leaf eyebrow="05 / PLEASE READ" title="Terms of service"><TermsTable /></Leaf>
)

const OrderPage = () => (
  <Leaf eyebrow="READY WHEN YOU ARE" title="Let’s talk about your idea.">
    <div className="order-links">
      <a className="primary-button" href={VGEN_URL} target="_blank" rel="noreferrer">Order on VGen <ExternalLink size={16} /></a>
      <a className="underlined-link" href={TRELLO_URL} target="_blank" rel="noreferrer">Check the queue <ExternalLink size={14} /></a>
    </div>
    <p className="leaf-note">Questions first? Find me here:</p>
    <ul className="contact-list">
      {bookContacts.map(([label, href]) => (
        <li key={label}><a className="underlined-link" href={href} target="_blank" rel="noreferrer">{label} <ExternalLink size={13} /></a></li>
      ))}
    </ul>
  </Leaf>
)

const sheets = [
  [CoverPage, WelcomePage],
  [BasePage, ExtraPage],
  [ScopePage, ProcessPage],
  [TermsPage, OrderPage],
]
const spreadLabels = ['Cover', 'Price', 'Add-ons & scope', 'Process & terms', 'Order']

function Book() {
  const [index, setIndex] = useState(0)
  const count = sheets.length
  const go = (nextIndex) => setIndex(Math.max(0, Math.min(count, nextIndex)))
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(index + 1)
    if (event.key === 'ArrowLeft') go(index - 1)
  }

  return (
    <div className="book-wrap" onKeyDown={onKeyDown}>
      <div className="book" data-closed={index === 0}>
        <div className="book-base" aria-hidden="true"><span>thank you ✳</span><small>LOYN ILLUST</small></div>
        {sheets.map(([Front, Back], sheetIndex) => {
          const flipped = sheetIndex < index
          return (
            <div key={sheetIndex} className={`sheet ${flipped ? 'flipped' : ''}`} style={{ zIndex: flipped ? sheetIndex + 1 : count - sheetIndex }}>
              <div className="face front" inert={sheetIndex === index ? undefined : ''}>
                {sheetIndex === 0 ? <Front onOpen={() => go(1)} /> : <Front />}
                {sheetIndex > 0 && (
                  <button className="corner corner-next" onClick={() => go(sheetIndex + 1)} aria-label="Next page">Next <ArrowRight size={14} /></button>
                )}
              </div>
              <div className="face back" inert={sheetIndex === index - 1 ? undefined : ''}>
                <Back />
                <button className="corner corner-prev" onClick={() => go(sheetIndex)} aria-label="Previous page"><ArrowLeft size={14} /> Back</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="book-controls">
        <button className="circle-button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous spread"><ArrowLeft size={17} /></button>
        <div className="spread-chips">
          {spreadLabels.map((label, chipIndex) => (
            <button key={label} className={chipIndex === index ? 'active' : ''} aria-current={chipIndex === index ? 'true' : undefined} onClick={() => go(chipIndex)}>{label}</button>
          ))}
        </div>
        <button className="circle-button" onClick={() => go(index + 1)} disabled={index === count} aria-label="Next spread"><ArrowRight size={17} /></button>
      </div>
    </div>
  )
}

const linearPages = [CoverPage, WelcomePage, BasePage, ExtraPage, ScopePage, ProcessPage, TermsPage, OrderPage]

function MobileBook() {
  const [pageIndex, setPageIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef(null)
  const go = (nextIndex) => {
    const nextPage = Math.max(0, Math.min(linearPages.length - 1, nextIndex))
    setDirection(nextPage >= pageIndex ? 1 : -1)
    setPageIndex(nextPage)
  }
  const Page = linearPages[pageIndex]

  return (
    <div
      className="m-book"
      onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return
        const deltaX = event.changedTouches[0].clientX - touchStartX.current
        touchStartX.current = null
        if (Math.abs(deltaX) > 60) go(pageIndex + (deltaX < 0 ? 1 : -1))
      }}
    >
      <div className={`m-page ${direction > 0 ? 'from-right' : 'from-left'}`} key={pageIndex}>
        {pageIndex === 0 ? <Page onOpen={() => go(1)} /> : <Page />}
      </div>
      <div className="book-controls">
        <button className="circle-button" onClick={() => go(pageIndex - 1)} disabled={pageIndex === 0} aria-label="Previous page"><ArrowLeft size={17} /></button>
        <span className="carousel-status">{pageIndex + 1} / {linearPages.length}</span>
        <button className="circle-button" onClick={() => go(pageIndex + 1)} disabled={pageIndex === linearPages.length - 1} aria-label="Next page"><ArrowRight size={17} /></button>
      </div>
      <p className="drag-hint">swipe to turn the page ✳</p>
    </div>
  )
}

function CommissionList() {
  return (
    <>
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
        <BaseTable />
        <h3>Additional</h3>
        <ExtraTable />
        <p className="table-note">Percentages (+40%, +80%) are added on top of the base price.</p>
      </section>
      <section id="notes" className="info-section"><h2><span>02</span> What I draw</h2><ScopeTable /></section>
      <section id="process" className="info-section"><h2><span>03</span> How it works</h2><StepsTable /></section>
      <section id="terms" className="info-section"><h2><span>04</span> Terms of service</h2><TermsTable /></section>
      <div className="order-banner">
        <div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Let's talk<br /><em>about your idea.</em></h2></div>
        <div className="order-actions">
          <a className="primary-button" href={VGEN_URL} target="_blank" rel="noreferrer">Order on VGen <ExternalLink size={16} /></a>
          <a className="underlined-link" href={TRELLO_URL} target="_blank" rel="noreferrer">Check the queue <ExternalLink size={14} /></a>
        </div>
      </div>
      <a className="order-sticky" href={VGEN_URL} target="_blank" rel="noreferrer">Order on VGen <ExternalLink size={15} /></a>
    </>
  )
}

function useIsWide() {
  const query = '(min-width: 900px)'
  const [wide, setWide] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const onChange = (event) => setWide(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])
  return wide
}

function CommissionPage({ navigate }) {
  const wide = useIsWide()
  const [view, setView] = useState('book')
  return (
    <section className="page commission-page">
      <div className="page-intro commission-intro">
        <div><p className="eyebrow">MADE TO ORDER / BY LOYN</p><h1>Commission<span className="red-dot">.</span></h1></div>
        <p className="intro-aside">Everything you need to know before ordering: prices, what I draw, and how it works.</p>
      </div>
      <div className="view-toggle" role="group" aria-label="Choose how to read">
        <button aria-pressed={view === 'book'} onClick={() => setView('book')}>Book</button>
        <button aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
      </div>
      {view === 'list' ? <CommissionList /> : wide ? <Book /> : <MobileBook />}
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

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0f161b' : '#f4eee2')
    try {
      localStorage.setItem('loyn-theme', theme)
    } catch (error) {
      console.warn('Unable to save the theme preference.', error)
    }
  }, [theme])

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    window.setTimeout(() => root.classList.remove('theme-anim'), 450)
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
  }

  return [theme, toggleTheme]
}

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const userAgent = navigator.userAgent
    const chromium = /(Chrome|Chromium|Edg|SamsungBrowser)\//.test(userAgent) && !/CriOS|FxiOS/.test(userAgent)
    let x = -100
    let y = -100
    let cursorX = -100
    let cursorY = -100
    let frame = 0
    let visible = false

    if (chromium && window.CSS?.supports?.('backdrop-filter', 'url(#cursor-gradmap)')) {
      cursor.classList.add('gradmap')
    }

    const animate = () => {
      const smoothing = reduceMotion ? 1 : 0.22
      cursorX += (x - cursorX) * smoothing
      cursorY += (y - cursorY) * smoothing
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`

      if (Math.abs(x - cursorX) < 0.1 && Math.abs(y - cursorY) < 0.1) {
        cursorX = x
        cursorY = y
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
        frame = 0
      } else {
        frame = requestAnimationFrame(animate)
      }
    }

    const hide = () => {
      root.classList.remove('has-cursor')
      cursor.classList.remove('on', 'down')
      cursor.dataset.state = ''
      visible = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') {
        hide()
        return
      }

      x = event.clientX
      y = event.clientY
      if (!visible) {
        cursorX = x
        cursorY = y
        root.classList.add('has-cursor')
        cursor.classList.add('on')
        visible = true
      }
      if (!frame) frame = requestAnimationFrame(animate)

      const target = event.target
      const link = target.closest?.('a, button, [role="button"], summary, label, .row-link, .hung-paper')
      const drag = !link && target.closest?.('.rope-stage')
      cursor.dataset.state = link ? 'link' : drag ? 'drag' : ''
    }

    const onDown = (event) => {
      if (event.pointerType === 'mouse') cursor.classList.add('down')
    }
    const onUp = () => cursor.classList.remove('down')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    root.addEventListener('mouseleave', hide)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      root.removeEventListener('mouseleave', hide)
      root.classList.remove('has-cursor')
      cursor.classList.remove('gradmap')
    }
  }, [])

  return (
    <>
      <svg className="cursor-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="cursor-gradmap" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.06 0.38 0.90 1.00" />
            <feFuncG type="table" tableValues="0.02 0.08 0.38 0.80" />
            <feFuncB type="table" tableValues="0.20 0.46 0.14 0.28" />
          </feComponentTransfer>
        </filter>
      </svg>
      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <span className="cursor-dot">
          <svg
            className="cursor-arrows"
            viewBox="0 0 40 20"
            width="30"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline className="ar-l" points="10,3 3,10 10,17" />
            <polyline className="ar-r" points="30,3 37,10 30,17" />
          </svg>
        </span>
      </div>
    </>
  )
}

export default function App() {
  const [page, setPage] = useState('landing')
  const [previousPage, setPreviousPage] = useState('landing')
  const [menuOpen, setMenuOpen] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const [theme, toggleTheme] = useTheme()

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
      <Header onMenu={() => setMenuOpen(true)} onHome={() => navigate('landing')} onBack={goBack} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} current={page} />
      <main className="main-content" key={transitionKey}>
        <div className="page-transition">
          {page === 'landing' && <Landing navigate={navigate} />}
          {page === 'main' && <GalleryPage navigate={navigate} />}
          {page === 'commission' && <CommissionPage navigate={navigate} />}
          {(page === 'about' || page === 'queue') && <InfoPage type={page} navigate={navigate} />}
        </div>
      </main>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />
      <CustomCursor />
    </div>
  )
}
