// ===== Pembersihan src/App.jsx (3 perubahan kecil) =====

// 1) Import lucide-react: hapus `Sparkles` (tidak dipakai lagi).
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft,
  Menu, X, ExternalLink, Instagram, Twitter, Mail, Moon, Sun
} from 'lucide-react'

// 2) GANTI seluruh fungsi InfoPage dengan versi ini
//    (halaman "queue" internal sudah tidak ada: tombol Queue langsung ke Trello).
function InfoPage({ navigate }) {
  return (
    <section className="page simple-page">
      <p className="eyebrow">A LITTLE ABOUT ME</p>
      <h1>Hello, I’m Loyn.</h1>
      <div className="simple-card">
        <span className="status-dot" />
        <h2>Loyn Illust — illustrator.</h2>
        <p>Hi! I’m a freelance artist. I enjoy creating concept art, illustrations, character designs, scenery, unique things, and more—all available through the VGen platform.</p>
        <p>Hmm... I can’t really say too much, as I’d prefer not to share any private information, hehe~</p>
        <ul className="contact-list">
          {socials.map(([label, href]) => (
            <li key={label}><a className="underlined-link" href={href} target="_blank" rel="noreferrer">{label} <ExternalLink size={14} /></a></li>
          ))}
        </ul>
      </div>
      <button className="underlined-link" onClick={() => navigate('main')}><ArrowLeft size={15} /> Back to gallery</button>
    </section>
  )
}

// 3) Di fungsi App(), ganti baris ini:
//      {(page === 'about' || page === 'queue') && <InfoPage type={page} navigate={navigate} />}
//    menjadi:
//      {page === 'about' && <InfoPage navigate={navigate} />}
