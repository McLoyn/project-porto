// ===== src/App.jsx =====
// 1) Tempel komponen ini di atas fungsi App().
// 2) Di dalam return App(), taruh <CustomCursor /> sebagai elemen terakhir di dalam <div className="site-shell">.
// 3) Tempel CSS di bawah ke src/styles.css.
//
// Perilaku:
// - Hanya aktif saat memakai MOUSE (layar sentuh tidak terpengaruh, kursor biasa tetap ada).
// - Titik kecil mengikuti mouse dengan sedikit "tertinggal" (halus).
// - Di atas link/tombol/kertas galeri/baris harga: titik membesar jadi cincin emas.
// - Di atas area galeri yang bisa digeser: berubah jadi lingkaran berlabel "drag".
// - Saat klik: mengecil sebentar.

function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, shown = false

    const loop = () => {
      const k = reduce ? 1 : 0.22
      cx += (x - cx) * k
      cy += (y - cy) * k
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') {          // sentuh / pena: pakai kursor bawaan
        root.classList.remove('has-cursor'); el.classList.remove('on'); shown = false
        return
      }
      x = e.clientX; y = e.clientY
      if (!shown) {
        shown = true; cx = x; cy = y
        root.classList.add('has-cursor'); el.classList.add('on')
      }
      const link = e.target.closest?.('a, button, [role="button"], summary, label, .row-link, .hung-paper')
      const drag = !link && e.target.closest?.('.rope-stage')
      el.dataset.state = link ? 'link' : drag ? 'drag' : ''
    }
    const onDown = () => el.classList.add('down')
    const onUp = () => el.classList.remove('down')
    const onLeave = () => { el.classList.remove('on'); shown = false }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      root.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor-dot"><span className="cursor-label">drag</span></span>
    </div>
  )
}

/* ===== src/styles.css ===== */
/*
html.has-cursor, html.has-cursor * { cursor: none !important; }

.cursor { position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; opacity: 0; transition: opacity .25s; will-change: transform; }
.cursor.on { opacity: 1; }
.cursor-dot {
  position: absolute; left: 0; top: 0; display: grid; place-items: center;
  width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--red) 45%, transparent);
  transition: width .25s, height .25s, margin .25s, background .25s, box-shadow .25s, transform .15s;
}
.cursor[data-state='link'] .cursor-dot {
  width: 36px; height: 36px; margin: -18px 0 0 -18px;
  background: color-mix(in srgb, var(--gold) 50%, transparent);
  box-shadow: 0 0 0 1.5px var(--gold);
}
.cursor[data-state='drag'] .cursor-dot {
  width: 62px; height: 62px; margin: -31px 0 0 -31px;
  background: var(--ink); box-shadow: none;
}
.cursor.down .cursor-dot { transform: scale(.78); }
.cursor-label { font: 10px var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--paper); opacity: 0; transition: opacity .2s; }
.cursor[data-state='drag'] .cursor-label { opacity: 1; }
*/
