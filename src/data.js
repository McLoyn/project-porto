// ============================================================
// Data sentral Loyn Illust — edit di sini, bukan di App.jsx
// ============================================================

export const VGEN_URL = 'https://vgen.co/loyn'
export const CARRD_URL = 'https://loynn.carrd.co'
export const TRELLO_URL = 'https://trello.com/b/j8EIfMRz/loyn-workspace'

// Status komisi: 'open' | 'waitlist' | 'closed'
// slots: jumlah slot tersisa (opsional, hanya relevan saat open)
export const COMMISSION = { status: 'closed', slots: 3 }

export const heroSocials = [
  ['X',         'https://x.com/loynillust',                   'twitter'],
  ['Instagram', 'https://www.instagram.com/loynillust',       'instagram'],
  ['Email',     'mailto:ozloynn@gmail.com',                   'mail'],
  ['VGen',      VGEN_URL,                                     'vgen'],
]

export const socials = [
  ['X / Twitter', 'https://x.com/loynillust'],
  ['Instagram',   'https://www.instagram.com/loynillust'],
  ['WhatsApp',    'https://wa.me/6287733660846'],
  ['Email',       'mailto:ozloynn@gmail.com'],
  ['VGen',        VGEN_URL],
]

export const bookContacts = [
  ['X',        'https://x.com/loynillust'],
  ['Instagram', 'https://www.instagram.com/loynillust'],
  ['Email',    'mailto:ozloynn@gmail.com'],
]

// template:
// { title: 'Title', kind: 'what', tone: 'artwork-', note: 'digital painting', src: '/art/.jpg', thumb: '/art/thumb/.jpg' }
export const artworks = [
  { title: 'Different World',      kind: 'Illustration',            tone: 'artwork-two',   note: 'digital',          src: '/art/02.jpg', thumb: '/art/thumb/02.jpg' },
  { title: 'Blue',                 kind: 'Scene Study',             tone: 'artwork-three', note: 'digital painting', src: '/art/15.jpg', thumb: '/art/thumb/15.jpg' },
  { title: 'Lying in Grass',       kind: 'Study',                   tone: 'artwork-five',  note: 'digital',          src: '/art/05.jpg', thumb: '/art/thumb/05.jpg' },
  { title: 'Who?',                 kind: 'Illustration',            tone: 'artwork-one',   note: 'digital painting', src: '/art/01.jpg', thumb: '/art/thumb/01.jpg' },
  { title: 'Training',             kind: 'Character study',         tone: 'artwork-three', note: 'digital sketch',   src: '/art/03.jpg', thumb: '/art/thumb/03.jpg' },
  { title: 'Crow & Bridge',        kind: 'Character design',        tone: 'artwork-four',  note: 'digital',          src: '/art/04.jpg', thumb: '/art/thumb/04.jpg' },
  { title: 'First Commission',     kind: 'Illustration Commission', tone: 'artwork-one',   note: 'digital painting', src: '/art/08.jpg', thumb: '/art/thumb/08.jpg' },
  { title: 'Golden Field',         kind: 'Redraw Study',            tone: 'artwork-six',   note: 'digital painting', src: '/art/06.jpg', thumb: '/art/thumb/06.jpg' },
  { title: 'Lady Vertin',          kind: 'Paint Study',             tone: 'artwork-one',   note: 'digital painting', src: '/art/07.jpg', thumb: '/art/thumb/07.jpg' },
  { title: 'Lost',                 kind: 'Illustration',            tone: 'artwork-one',   note: 'digital painting', src: '/art/13.jpg', thumb: '/art/thumb/13.jpg' },
]

export const quickFacts = [
  ['Order via',     'VGen / direct (local)'],   // nilai string saja; link dirender di App
  ['Down payment',  '50%'],
  ['Rough sketch',  '1–4 days'],
  ['Full render',   '7–30 days'],
]

// [part, figure, oldIdr, idr, usd, vgenHref]
export const basePrice = [
  ['Bust up',   '1', '50k', '40k', '15', 'https://vgen.co/loyn/service/illustration-bust-up-/4c0df3fd-6328-42ef-8098-83d9447687aa'],
  ['Half body', '1', null,  '80k', '20', 'https://vgen.co/loyn/service/illustration-half-body-knee-up-/cf73821a-28f8-4d48-836a-e942a753f81d'],
  ['Full body', '1', null,  '120k','40', 'https://vgen.co/loyn/service/illustration-full-body-/85d39179-8815-4559-b487-b5739a92c3d6'],
]

// [detail, idr, usd]
export const additionalPrice = [
  ['Monetized content', '+40%', '+40%'],
  ['Commercial merch',  '+80%', '+80%'],
  ['Minor revision',    'Free', 'Free'],
  ['Major revision',    '20k',  '5'],
]

export const willDraw = ['Original Character', 'FanArt', 'Kemonomimi']
export const willNot  = ['NSFW', 'Hard Mecha', 'Heavy Gore']

// [topic, detail]
export const terms = [
  ['Platform',     'Main commission is on VGen for safety (international). Local payment via Gopay or Dana.'],
  ['Payment',      '50% down payment before the project starts; the remaining 50% before the final file is sent. Non-refundable.'],
  ['Rough sketch', '1–4 days.'],
  ['Full render',  '7–30 days, counted after the sketch/lineart is approved.'],
  ['Revisions',    '2 major revisions and unlimited minor revisions.'],
  ['Portfolio',    'Commissioned artworks may be shown in my portfolio (website, social media, etc).'],
  ['Files',        'Google Drive share for the terms and files is available for 30 days.'],
]

// [step name, description]
export const steps = [
  ['Order',        'Choose a type and send your idea and references on VGen (or contact me directly for local payment).'],
  ['Down payment', 'Pay 50% to start the project.'],
  ['Sketch',       'Rough sketch in 1–4 days. Check the composition and request changes.'],
  ['Render',       'Full render in 7–30 days after the sketch/lineart is approved.'],
  ['Delivery',     'Pay the remaining 50%, then receive the final file.'],
]
