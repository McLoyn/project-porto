// ===== 1) index.html — di dalam <head> =====
/*
  <!-- font judul -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />

  <!-- pasang tema sebelum halaman tampil (mencegah kedip putih saat mode gelap) -->
  <script>
    (function () {
      try {
        var t = localStorage.getItem('loyn-theme');
        if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = t;
      } catch (e) {}
    })();
  </script>

  Ubah juga: <meta name="theme-color" content="#f4eee2" />
*/

// ===== 2) src/App.jsx =====

// a) Tambah Sun dan Moon di import lucide-react paling atas.

// b) Tambahkan hook ini (di atas fungsi App):
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('loyn-theme', theme) } catch (e) { /* abaikan */ }
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#15110f' : '#f4eee2')
  }, [theme])
  const toggle = () => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    setTimeout(() => root.classList.remove('theme-anim'), 450)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }
  return [theme, toggle]
}

// c) Header: tambah prop `theme` dan `onToggleTheme`, lalu tombolnya di dalam <nav className="topbar-right">
//    (taruh di paling akhir, setelah tombol "Order on VGen"):
//
//   <button
//     className="theme-toggle"
//     onClick={onToggleTheme}
//     aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
//     title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
//   >
//     {theme === 'dark' ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
//   </button>
//
//   Tanda tangan fungsinya menjadi:
//   function Header({ onMenu, onHome, onBack, onNavigate, theme, onToggleTheme, current }) { ... }

// d) Di fungsi App(): panggil hook dan teruskan ke Header:
//   const [theme, toggleTheme] = useTheme()
//   <Header ... onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} current={page} />
