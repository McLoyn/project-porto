// Jalankan dari folder project (yang berisi src/styles.css):
//   node migrate-theme.mjs
// Membuat cadangan src/styles.css.bak lalu mengganti warna hex lama dengan variabel tema.
// Aman dijalankan ulang (warna yang sudah jadi var(...) tidak disentuh).
import fs from 'node:fs'

const FILE = 'src/styles.css'
const css = fs.readFileSync(FILE, 'utf8')
fs.writeFileSync(FILE + '.bak', css)

const groups = {
  '--surface':     ['fbfaf7'],
  '--paper':       ['f7f6f2'],
  '--surface-2':   ['efeee8', 'eeede7', 'eeece4', 'ecebe5', 'eeebe5', 'eae8e0', 'e9e7e0', 'e8e9e3', 'e7e5df', 'f0eee8', 'f1efe8', 'f6f4ee'],
  '--shadow-block':['ebe9e0', 'e9e7de'],
  '--line-strong': ['d0cdc2', 'd1cec3', 'd9d7cd', 'd8d5ca', 'c9c6bb', 'c8c4b8', 'cbc8bd', 'c7c4b8', 'b9b6aa'],
  '--faint':       ['aaa79c', '9a978c', '8a887e', 'a3a095', 'a09d92', '99968b', 'aaa69b', '929087', '99978e'],
  '--muted':       ['77766e', '85847e'],
  '--ink-soft':    ['4a4a43'],
  '--ink':         ['262622', '292923'],
  '--green':       ['6d7c5c', '5f6f4e', '8d9b7c'],
}
const map = {}
for (const [name, hexes] of Object.entries(groups)) for (const h of hexes) map[h] = `var(${name})`
const GLASS = /rgba\(\s*247,\s*246,\s*242,\s*\.88\s*\)/g

// elemen yang memang harus tetap gelap di kedua tema (sampul buku) tidak diubah
const SKIP_SELECTOR = /cover|book-base/

const selectorAt = (i) => {
  let depth = 0, j = i - 1
  for (; j >= 0; j--) {
    if (css[j] === '}') depth++
    else if (css[j] === '{') { if (depth === 0) break; depth-- }
  }
  const start = Math.max(css.lastIndexOf('}', j), css.lastIndexOf(';', j), css.lastIndexOf('{', j - 1)) + 1
  return css.slice(start, j)
}
const insideCustomProp = (i) => {
  const start = Math.max(css.lastIndexOf(';', i), css.lastIndexOf('{', i), css.lastIndexOf('}', i)) + 1
  return /^\s*--[\w-]+\s*:/.test(css.slice(start, i))
}

let count = 0
// satu kali jalan (glass + hex) supaya posisi karakter tetap cocok dengan teks asli
const out = css.replace(
  new RegExp(GLASS.source + '|#([0-9a-fA-F]{6})\\b', 'g'),
  (m, hex, i) => {
    if (SKIP_SELECTOR.test(selectorAt(i))) return m
    if (!hex) { count++; return 'var(--paper-glass)' }
    const v = map[hex.toLowerCase()]
    if (!v || insideCustomProp(i)) return m
    count++
    return v
  }
)

fs.writeFileSync(FILE, out)
console.log(`Selesai: ${count} warna diganti. Cadangan: ${FILE}.bak`)

const left = [...new Set((out.match(/#[0-9a-fA-F]{6}\b/g) || []).map((s) => s.toLowerCase()))]
if (left.length) console.log('Warna hex yang masih tersisa (cek manual bila perlu):', left.join(', '))
