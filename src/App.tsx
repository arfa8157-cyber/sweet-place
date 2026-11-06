import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react'

type Language = 'en' | 'ar'
type Theme = 'light' | 'dark'

const products = [
  {
    name: { en: 'Strawberry Dream Cake', ar: 'كيكة حلم الفراولة' },
    description: { en: 'Cloud-soft layers, berry-sweet days.', ar: 'طبقات هشة وأيام بطعم التوت.' },
    price: '50',
    image: 'photo-1578985545062-69928b1d9587',
    color: 'pink',
    tag: { en: 'BESTSELLER', ar: 'الأكثر مبيعاً' },
  },
  {
    name: { en: 'Chocolate Explosion', ar: 'انفجار الشوكولاتة' },
    description: { en: 'A little messy. A lot of magic.', ar: 'فوضى لذيذة وسحر لا يُقاوم.' },
    price: '35',
    image: 'photo-1606313564200-e75d5e30476c',
    color: 'lavender',
    tag: { en: 'CHOCO HEAVEN', ar: 'جنة الشوكولاتة' },
  },
  {
    name: { en: 'Rainbow Donuts', ar: 'دونات قوس قزح' },
    description: { en: 'A sprinkle of happy in every bite.', ar: 'رشّة سعادة في كل قضمة.' },
    price: '20',
    image: 'photo-1551024601-bec78aea704b',
    color: 'blue',
    tag: { en: 'SUGAR RUSH', ar: 'جرعة سعادة' },
  },
  {
    name: { en: 'Pink Velvet Cupcakes', ar: 'كب كيك المخمل الوردي' },
    description: { en: 'Fluffy, fancy, and made to share.', ar: 'هشة وأنيقة ومثالية للمشاركة.' },
    price: '25',
    image: 'photo-1486427944299-d1955d23e34d',
    color: 'yellow',
    tag: { en: 'SO PRETTY', ar: 'جميلة جداً' },
  },
  {
    name: { en: 'Caramel Heaven', ar: 'جنة الكراميل' },
    description: { en: 'Silky caramel, zero self-control.', ar: 'كراميل ناعم يصعب مقاومته.' },
    price: '100',
    image: 'photo-1550617931-e17a7b70dce2',
    color: 'mint',
    tag: { en: 'CARAMEL KISS', ar: 'قبلة كراميل' },
  },
  {
    name: { en: 'Sweet Bubble Cookies', ar: 'كوكيز الفقاعات الحلوة' },
    description: { en: 'Crispy edges, gooey little middle.', ar: 'أطراف مقرمشة وقلب طري.' },
    price: '150',
    image: 'photo-1499636136210-6f4ee915583e',
    color: 'orange',
    tag: { en: 'COOKIE CLUB', ar: 'نادي الكوكيز' },
  },
]

const translations = {
  en: {
    nav: ['Home', 'Our Sweets', 'About Us', 'Contact'],
    order: 'ORDER SWEETS',
    heroWelcome: 'WELCOME TO OUR HAPPY PLACE',
    love: '100% LOVE',
    soYummy: 'SO YUMMY!',
    goodMood: 'GOOD MOOD',
    sweetThings: <>sweet<br />things<br />inside</>,
    freshlyBaked: 'FRESHLY BAKED EVERY DAY',
    heroEstablished: 'EST. 2025 · 100% HAPPY',
    heroLine: ['TOO SWEET', 'TO BE', 'REAL!'],
    heroSub: 'Little bites of happiness, made with love.',
    explore: 'EXPLORE OUR SWEETS',
    story: 'OUR STORY',
    marquee: 'MADE WITH LOVE  •  BAKED WITH HAPPINESS  •  SWEETEN YOUR DAY  •  ',
    featuredEyebrow: 'A LITTLE SOMETHING FOR YOUR SWEET TOOTH',
    featuredIndex: '01 — THE GOOD STUFF',
    madeFresh: 'MADE FRESH!',
    featuredTitle: ['MEET YOUR', 'NEW OBSESSION'],
    add: 'ADD TO BAG',
    storyTitle: ['WE MAKE', 'HAPPINESS', 'EDIBLE.'],
    storyBody: 'Every sweet tells a story. We create delicious little moments that turn ordinary days into unforgettable memories.',
    storyStamp: <>BAKED<br /><strong>WITH<br />LOVE</strong></>,
    storyNote: <>GOOD<br />THINGS<br />GROW HERE</>,
    knowUs: 'GET TO KNOW US',
    storyFootnote: 'SMALL BATCHES · BIG FEELINGS',
    offersTag: 'A VERY GOOD DEAL',
    offersIndex: '02 — THE SWEET DEALS',
    offersTitle: ['MORE SWEETS.', 'MORE SMILES.'],
    offerLabels: ['FAN FAVE', 'WEEKEND MAGIC', 'PARTY TIME'],
    offerNames: ['Buy 2 Cakes, Get 1 Free', 'Sweet Weekend Box', 'Birthday Surprise Package'],
    offerDescriptions: ['A trio worth celebrating. Pick any three, pay for two.', 'Your Friday-night plans, already sorted.', 'Make their big day extra, extra sweet.'],
    claim: 'CLAIM YOUR TREAT',
    moodEyebrow: 'A VERY IMPORTANT QUESTION',
    moodTitle: ["WHAT'S YOUR", 'SWEET MOOD?'],
    moods: ['Feeling fruity', 'Choco-holic', 'A little fancy', 'Surprise me!'],
    moodResult: ['Berry bliss it is!', 'Chocolate fixes everything.', 'Fancy is always a good idea.', 'We love a little mystery.'],
    footerTitle: ["LET'S MAKE", 'LIFE SWEETER!'],
    footerSub: 'Have a sweet idea? Let’s make it happen.',
    email: 'Your email address',
    subscribe: 'COUNT ME IN',
    subscribed: 'YOU’RE ON THE LIST!',
    contact: 'COME SAY HI',
    footerTopline: 'THE HAPPY ENDING',
    address: '14 Sugar Lane, Sweet District',
    hours: 'Every day · 10am–10pm',
    follow: 'FOLLOW THE FUN',
    rights: '© 2025 SWEET PLACE. MADE WITH EXTRA SPRINKLES.',
    cart: 'Your sweet bag',
    cartEmpty: 'Your bag is looking a little lonely.',
    cartTotal: 'TOTAL',
    cartClose: 'KEEP EXPLORING',
    cartAdded: 'Added to your sweet bag!',
    items: 'sweet treats',
  },
  ar: {
    nav: ['الرئيسية', 'حلوياتنا', 'من نحن', 'تواصل معنا'],
    order: 'اطلب حلوياتك',
    heroWelcome: 'مرحباً بكم في عالمنا الحلو',
    love: '١٠٠٪ حب',
    soYummy: 'لذيذ جداً!',
    goodMood: 'مزاج رائع',
    sweetThings: <>حلوى<br />لذيذة<br />بالداخل</>,
    freshlyBaked: 'مخبوزات طازجة كل يوم',
    heroEstablished: 'تأسسنا عام ٢٠٢٥ · سعادة ١٠٠٪',
    heroLine: ['حلاها', 'يفوق', 'الخيال!'],
    heroSub: 'لقيمات صغيرة من السعادة، صُنعت بكل حب.',
    explore: 'اكتشف حلوياتنا',
    story: 'حكايتنا',
    marquee: 'صُنعت بحب  •  خُبزت بسعادة  •  حلّوا يومكم  •  ',
    featuredEyebrow: 'شيء لذيذ يرضي شغفكم بالحلوى',
    featuredIndex: '٠١ — أشهى الحلويات',
    madeFresh: 'طازجة يومياً!',
    featuredTitle: ['تعرّفوا على', 'حلاكم المفضل'],
    add: 'أضف إلى السلة',
    storyTitle: ['نصنع', 'السعادة', 'بنكهة حلوة.'],
    storyBody: 'لكل حلوى حكاية. نصنع لحظات صغيرة ولذيذة تحوّل الأيام العادية إلى ذكريات لا تُنسى.',
    storyStamp: <>مخبوزة<br /><strong>بكل<br />حب</strong></>,
    storyNote: <>أشياء<br />جميلة<br />تنمو هنا</>,
    knowUs: 'تعرّفوا علينا',
    storyFootnote: 'دفعات صغيرة · مشاعر كبيرة',
    offersTag: 'عرض يستحق التجربة',
    offersIndex: '٠٢ — عروض لذيذة',
    offersTitle: ['حلوى أكثر.', 'ابتسامات أكثر.'],
    offerLabels: ['المفضّل لدينا', 'سحر العطلة', 'وقت الاحتفال'],
    offerNames: ['اشترِ كعكتين والثالثة علينا', 'صندوق عطلة نهاية الأسبوع', 'مفاجأة عيد ميلاد'],
    offerDescriptions: ['ثلاث كعكات للاحتفال. اختاروا أي ثلاث وادفعوا ثمن اثنتين.', 'خطط ليلة الجمعة؟ حلوياتكم علينا.', 'اجعلوا يومهم المميز أحلى بكثير.'],
    claim: 'احصلوا على عرضكم',
    moodEyebrow: 'سؤال مهم جداً',
    moodTitle: ['ما هو', 'مزاجكم الحلو؟'],
    moods: ['مزاج الفواكه', 'عشاق الشوكولاتة', 'شيء فاخر', 'فاجئوني!'],
    moodResult: ['توت يليق بمزاجكم!', 'الشوكولاتة تحل كل شيء.', 'الفخامة خيار رائع دائماً.', 'نحبّ المفاجآت أيضاً!'],
    footerTitle: ['لنُضف', 'حلاوة لأيامكم!'],
    footerSub: 'لديكم فكرة حلوة؟ دعونا نحوّلها إلى حقيقة.',
    email: 'بريدكم الإلكتروني',
    subscribe: 'أنا مهتم!',
    subscribed: 'تم تسجيلكم!',
    contact: 'زورونا',
    footerTopline: 'نهاية سعيدة',
    address: '١٤ شارع السكر، حيّ الحلوى',
    hours: 'يومياً · ١٠ صباحاً–١٠ مساءً',
    follow: 'تابعوا المرح',
    rights: '© ٢٠٢٥ سويت بليس. صُنعت برشّات إضافية.',
    cart: 'سلتكم الحلوة',
    cartEmpty: 'سلتكم تنتظر بعض الحلوى.',
    cartTotal: 'الإجمالي',
    cartClose: 'تابعوا الاستكشاف',
    cartAdded: 'أُضيفت إلى سلتكم!',
    items: 'من الحلويات',
  },
}

const offers = ['🍰', '🎁', '🎈']
const moodColors = ['#ffb8d7', '#c8b3ff', '#ffe385', '#a8ebd1']

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('sweet-place-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('sweet-place-language') === 'ar' ? 'ar' : 'en'))
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cart, setCart] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [activeMood, setActiveMood] = useState<number | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [toast, setToast] = useState(false)
  const reducedMotion = useReducedMotion()
  const t = translations[language]
  const isArabic = language === 'ar'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sweet-place-language', language)
    localStorage.setItem('sweet-place-theme', theme)
  }, [language, theme, isArabic])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(false), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const addToCart = (index: number) => {
    setCart((items) => [...items, index])
    setToast(true)
  }

  const jumpTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const navIds = ['home', 'sweets', 'story', 'contact']

  return (
    <div className={`site ${isArabic ? 'is-arabic' : ''}`} data-theme={theme}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Sweet Place home" onClick={(event) => { event.preventDefault(); jumpTo('home') }}>
          <span className="brand-mark" aria-hidden="true">🍒</span>
          <span className="brand-name">SWEET<br />PLACE<span className="brand-dot">.</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
          {t.nav.map((label, index) => (
            <button key={label} className="nav-link" onClick={() => jumpTo(navIds[index])}>{label}</button>
          ))}
          <div className="mobile-tools">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </nav>
        <div className="nav-actions">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button className="bag-button icon-button" aria-label={t.cart} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={18} strokeWidth={2.2} />
            <span className="bag-count">{cart.length}</span>
          </button>
          <button className="button button-black nav-cta" onClick={() => jumpTo('sweets')}>{t.order}<ArrowUpRight size={15} /></button>
        </div>
        <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grain" />
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow hero-eyebrow"><span className="tiny-spark">✳</span>{t.heroWelcome}</div>
            <h1>{t.heroLine.map((line) => <span key={line}>{line}</span>)}</h1>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="hero-buttons">
              <button className="button button-black" onClick={() => jumpTo('sweets')}>{t.explore}<ArrowUpRight size={16} /></button>
              <button className="button button-outline" onClick={() => jumpTo('story')}>{t.story}<ArrowRight className="direction-icon" size={16} /></button>
            </div>
          </motion.div>
          <div className="hero-art" aria-label={isArabic ? 'رسومات حلويات ملونة' : 'Colorful dessert illustrations'}>
            <motion.div className="art-sunburst" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}>✳</motion.div>
            <motion.div className="hero-sticker sticker-strawberry" animate={reducedMotion ? undefined : { y: [0, -12, 0], rotate: [-7, -3, -7] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <span>🍓</span><b>{t.love}</b>
            </motion.div>
            <motion.div className="hero-donut" animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=650&q=85" alt={isArabic ? 'دونات مزينة برشات ملونة' : 'Colorfully sprinkled donut'} />
              <span className="donut-sparkle">✦</span>
            </motion.div>
            <div className="ribbon ribbon-blue" />
            <div className="ribbon ribbon-pink" />
            <motion.div className="hero-note" animate={reducedMotion ? undefined : { rotate: [8, 12, 8] }} transition={{ duration: 3.2, repeat: Infinity }}>
              <span>{t.soYummy.split(' ')[0]}</span><strong>{t.soYummy.split(' ').slice(1).join(' ')}</strong><i>✦</i>
            </motion.div>
            <motion.div className="gummy-bear" animate={reducedMotion ? undefined : { y: [0, -9, 0], rotate: [9, 4, 9] }} transition={{ duration: 3.7, repeat: Infinity, delay: 0.4 }}>🧸</motion.div>
            <div className="hero-sticker sticker-flower">✿<small>{t.goodMood}</small></div>
            <div className="hero-scribble">{t.sweetThings} <span>↘</span></div>
          </div>
          <div className="hero-bottom">
            <span>{t.freshlyBaked}</span>
            <button className="scroll-cue" onClick={() => jumpTo('sweets')} aria-label={isArabic ? 'انتقل إلى حلوياتنا' : 'Scroll to our sweets'}><ArrowDown size={16} /></button>
            <span>{t.heroEstablished}</span>
          </div>
        </section>

        <div className="marquee" aria-label={t.marquee}>
          <div className="marquee-track">{Array.from({ length: 4 }, (_, index) => <span key={index}>{t.marquee}<b>✳</b>&nbsp;</span>)}</div>
        </div>

        <section className="featured section-pad" id="sweets">
          <div className="section-top">
            <p className="eyebrow"><span className="tiny-spark">✳</span>{t.featuredEyebrow}</p>
            <span className="section-index">{t.featuredIndex}</span>
          </div>
          <div className="featured-heading">
            <h2>{t.featuredTitle.map((line) => <span key={line}>{line}</span>)}</h2>
            <div className="heading-sticker"><span>♡</span><b>{t.madeFresh}</b></div>
            <div className="heading-doodle">✳</div>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <motion.article className={`product-card card-${product.color}`} key={product.name.en} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ delay: index * 0.07, duration: 0.5 }}>
                <div className="product-image-wrap">
                  <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`} alt={product.name[language]} loading="lazy" />
                  <span className="product-tag">{product.tag[language]}</span>
                  <button className={`heart-button ${favorites.includes(index) ? 'is-favorite' : ''}`} aria-label={`${isArabic ? 'أضف للمفضلة' : 'Save'} ${product.name[language]}`} aria-pressed={favorites.includes(index)} onClick={() => setFavorites((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])}><Heart size={17} /></button>
                </div>
                <div className="product-info">
                  <div><h3>{product.name[language]}</h3><p>{product.description[language]}</p></div>
                  <div className="product-purchase">
                    <strong>{product.price}<small> €</small></strong>
                    <button className="add-button" onClick={() => addToCart(index)} aria-label={`${t.add}: ${product.name[language]}`}><span>{t.add}</span><span className="add-plus">+</span></button>
                  </div>
                </div>
                <span className="product-number">0{index + 1}</span>
              </motion.article>
            ))}
          </div>
          <div className="featured-end"><span>✳</span>{isArabic ? 'حُضّرت بحب، ومخصصة للمشاركة' : 'MADE WITH LOVE, MEANT TO BE SHARED'}<span>✳</span></div>
        </section>

        <section className="story" id="story">
          <div className="story-art">
            <div className="story-art-frame">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85" alt={isArabic ? 'كعكة احتفالية مزينة' : 'A beautifully decorated celebration cake'} loading="lazy" />
              <div className="story-stamp"><span>{t.storyStamp}</span><i>✳</i></div>
              <div className="story-caption">{isArabic ? 'مصنوعة بحب، لقمة لقمة' : 'A little joy, one bite at a time'}<span>♡</span></div>
            </div>
            <div className="story-float float-berry">🍓</div>
            <div className="story-float float-heart">💗</div>
            <div className="story-orbit">✳</div>
            <div className="story-mini-note">{t.storyNote}</div>
          </div>
          <div className="story-copy">
            <p className="eyebrow"><span className="tiny-spark">✳</span>{isArabic ? 'قصة حلوة تستحق أن تُروى' : 'A SWEET LITTLE STORY'}</p>
            <h2>{t.storyTitle.map((line) => <span key={line}>{line}</span>)}</h2>
            <p className="story-body">{t.storyBody}</p>
            <button className="button button-black" onClick={() => jumpTo('offers')}>{t.knowUs}<ArrowUpRight size={16} /></button>
            <span className="story-footnote">{t.storyFootnote}</span>
          </div>
        </section>

        <section className="offers section-pad" id="offers">
          <div className="section-top">
            <p className="eyebrow"><span className="tiny-spark">✳</span>{t.offersTag}</p>
            <span className="section-index">{t.offersIndex}</span>
          </div>
          <div className="offers-heading">
            <h2>{t.offersTitle.map((line) => <span key={line}>{line}</span>)}</h2>
            <div className="offers-scribble">MORE<br />YAY! <span>↗</span></div>
          </div>
          <div className="offer-grid">
            {t.offerNames.map((name, index) => (
              <motion.article key={name} className={`offer-card offer-${index + 1}`} whileHover={reducedMotion ? undefined : { y: -7, rotate: index === 1 ? 1 : -1 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
                <div className="offer-icon">{offers[index]}</div>
                <div className="offer-label">{t.offerLabels[index]}</div>
                <h3>{name}</h3>
                <p>{t.offerDescriptions[index]}</p>
                <button className="offer-link" onClick={() => jumpTo('sweets')}>{t.claim}<ArrowUpRight size={16} /></button>
                <span className="offer-spark">✳</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mood section-pad">
          <div className="mood-top">
            <div><p className="eyebrow"><span className="tiny-spark">✳</span>{t.moodEyebrow}</p><h2>{t.moodTitle.map((line) => <span key={line}>{line}</span>)}</h2></div>
            <p className="mood-help">{isArabic ? 'اختروا ما يشبهكم اليوم' : 'Pick the one that feels like you today'}<span>↓</span></p>
          </div>
          <div className="mood-grid">
            {t.moods.map((mood, index) => (
              <motion.button key={mood} className={`mood-card mood-${index} ${activeMood === index ? 'selected' : ''}`} style={{ '--mood-color': moodColors[index] } as React.CSSProperties} whileHover={reducedMotion ? undefined : { scale: 1.035, rotate: index % 2 ? 1 : -1 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveMood(index)}>
                <span className="mood-emoji">{['🍓', '🍫', '🧁', '🍬'][index]}</span>
                <span className="mood-label">{mood}</span>
                <span className="mood-arrow">{activeMood === index ? <Check size={18} /> : <ArrowUpRight size={18} />}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeMood !== null && <motion.p className="mood-response" key={activeMood} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>{t.moodResult[activeMood]} <span>♡</span></motion.p>}
          </AnimatePresence>
        </section>

        <footer className="footer section-pad" id="contact">
          <div className="footer-topline"><span>{t.footerTopline}</span><span>✳ &nbsp; SWEET PLACE &nbsp; ✳</span></div>
          <div className="footer-main">
            <div className="footer-title-wrap">
              <h2>{t.footerTitle.map((line) => <span key={line}>{line}</span>)}</h2>
              <div className="footer-candy" aria-hidden="true"><span>🍭</span></div>
              <p>{t.footerSub}</p>
              <form className="subscribe-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}>
                <label className="sr-only" htmlFor="email">{t.email}</label>
                <input id="email" type="email" placeholder={t.email} required />
                <button type="submit">{subscribed ? <><Check size={16} />{t.subscribed}</> : <>{t.subscribe}<ArrowUpRight size={16} /></>}</button>
              </form>
              <span className="footer-small">{isArabic ? 'لا رسائل مزعجة، فقط أشياء لذيذة.' : 'NO SPAM, JUST THE GOOD STUFF.'}</span>
            </div>
            <div className="footer-details">
              <div className="footer-detail"><span className="footer-label">{t.contact}</span><a href="mailto:hello@sweetplace.com">HELLO@SWEETPLACE.COM <ArrowUpRight size={14} /></a><p>{t.address}</p><p>{t.hours}</p></div>
              <div className="footer-detail"><span className="footer-label">{t.follow}</span><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={14} /></a><a href="https://tiktok.com" target="_blank" rel="noreferrer">TIKTOK <ArrowUpRight size={14} /></a></div>
              <div className="footer-detail"><span className="footer-label">{isArabic ? 'اكتشفوا المزيد' : 'GOOD TO KNOW'}</span>{t.nav.slice(0, 3).map((label, index) => <button key={label} onClick={() => jumpTo(navIds[index])}>{label}<ArrowUpRight size={14} /></button>)}</div>
            </div>
          </div>
          <div className="footer-bottom"><a className="footer-logo" href="#home" onClick={(event) => { event.preventDefault(); jumpTo('home') }}>SWEET PLACE<span>.</span></a><span>{t.rights}</span><button onClick={() => jumpTo('home')}>{isArabic ? 'للأعلى' : 'BACK TO TOP'} <ArrowUpRight size={14} /></button></div>
        </footer>
      </main>

      <AnimatePresence>
        {cartOpen && <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}>
          <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" initial={{ x: isArabic ? '-100%' : '100%' }} animate={{ x: 0 }} exit={{ x: isArabic ? '-100%' : '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}>
            <div className="cart-header"><h2 id="cart-title">{t.cart}<span> ({cart.length})</span></h2><button className="icon-button" aria-label="Close cart" onClick={() => setCartOpen(false)}><X size={20} /></button></div>
            {cart.length === 0 ? <div className="cart-empty"><span>🍪</span><p>{t.cartEmpty}</p></div> : <div className="cart-items">{cart.map((productIndex, itemIndex) => <div className="cart-item" key={`${productIndex}-${itemIndex}`}><img src={`https://images.unsplash.com/${products[productIndex].image}?auto=format&fit=crop&w=180&q=75`} alt="" /><span>{products[productIndex].name[language]}</span><strong>{products[productIndex].price} €</strong><button aria-label={isArabic ? 'إزالة' : 'Remove'} onClick={() => setCart((items) => items.filter((_, index) => index !== itemIndex))}><X size={15} /></button></div>)}</div>}
            <div className="cart-bottom"><div><span>{t.cartTotal}</span><strong>{cart.reduce((sum, index) => sum + Number(products[index].price), 0)} €</strong></div><button className="button button-black" onClick={() => setCartOpen(false)}>{t.cartClose}<ArrowLeft className="direction-icon" size={16} /></button></div>
          </motion.aside>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><Check size={16} />{t.cartAdded}<button aria-label="Open bag" onClick={() => { setToast(false); setCartOpen(true) }}>{cart.length} <ChevronDown size={14} /></button></motion.div>}</AnimatePresence>
    </div>
  )
}

function LanguageToggle({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  return <button className="language-toggle" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}>{language === 'en' ? 'AR' : 'EN'}</button>
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const isDark = theme === 'dark'
  return <button className="theme-toggle icon-button" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>{isDark ? <Sun size={17} /> : <Moon size={17} />}</button>
}

export default App
