import { useEffect, useMemo, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowUpRight, BarChart3, Calculator, CalendarDays,
  Check, ChevronDown, CircleHelp, Download, HeartPulse, History, House, Languages,
  Menu, RefreshCw, ShieldCheck, UserRound, X, Trash2, Weight, Ruler
} from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const words = {
  rw: {
    brand: 'BMI Calculator', tagline: 'Menya igipimo cyawe, ubyiteho neza.',
    home: 'Ahabanza', calculator: 'Kubara BMI', dashboard: 'Imbonerahamwe', history: 'Amateka', profile: 'Umwirondoro',
    welcome: 'Murakaza neza!', intro: 'Kubara BMI yawe mu buryo bworoshye kandi bwihuse.',
    heroText: 'Menya aho igipimo cyawe gihagaze, ukurikirane impinduka kandi wite ku buzima bwawe.',
    start: 'Tangira kubara', learn: 'Sobanukirwa na BMI', trusted: 'Byoroshye • Byihuse • Bisobanutse',
    calculatorTitle: 'Kubara BMI yawe', calculatorDesc: 'Andika ibiro n’uburebure bwawe kugira ngo ubone igisubizo.',
    weight: 'Ibiro', height: 'Uburebure', kg: 'kg', cm: 'cm', age: 'Imyaka',
    calculate: 'Bara BMI', clear: 'Siba ibyo wanditse', result: 'Igisubizo cyawe', yourBMI: 'BMI yawe',
    category: 'Icyiciro', explanation: 'Ibisobanuro', healthyRange: 'Urwego rusanzwe rwa BMI ku bantu bakuru ni 18.5 kugeza munsi ya 25.',
    under: 'Ibiro biri munsi y’urwego rusanzwe', normal: 'Ibiro biri mu rwego rusanzwe', over: 'Ibiro birengeje urwego rusanzwe', obese: 'Umubyibuho ukabije',
    adultNote: 'Ibyiciro bigenewe abantu bakuru bafite imyaka 20 kuzamura. BMI si isuzuma ry’indwara.',
    save: 'Bika igisubizo', saved: 'Igisubizo kibitswe', calculateFirst: 'Banza ubare BMI.',
    dashboardTitle: 'Imbonerahamwe yawe', dashboardDesc: 'Reba uko ibipimo byawe byagiye bihinduka.',
    latest: 'BMI iheruka', records: 'Ibipimo wabaze', latestWeight: 'Ibiro biheruka', trend: 'Impinduka za BMI',
    noData: 'Nta bipimo urabika. Banza ubare BMI kugira ngo utangire gukurikirana.',
    historyTitle: 'Amateka ya BMI', date: 'Itariki', bmi: 'BMI', action: 'Igikorwa', export: 'Kuramo CSV', delete: 'Siba amateka',
    confirmDelete: 'Urashaka gusiba amateka yose ya BMI?', emptyHistory: 'Nta mateka ahari.',
    profileTitle: 'Umwirondoro', name: 'Amazina', email: 'Imeyili', saveProfile: 'Bika umwirondoro',
    profileSaved: 'Umwirondoro wabitswe kuri iyi browser.', profileHint: 'Iyi ni frontend gusa: amakuru abikwa kuri browser ukoresha.',
    guideTitle: 'BMI ni iki?', guideText: 'BMI (Body Mass Index) ni igipimo kigereranya ibiro n’uburebure. Ntigisimbura inama za muganga.',
    guide1: 'Munsi ya 18.5', guide2: '18.5 kugeza munsi ya 25', guide3: '25 kugeza munsi ya 30', guide4: '30 kuzamura',
    guideUnder: 'Ibiro biri munsi y’urwego', guideNormal: 'Urwego rusanzwe', guideOver: 'Ibiro birengeje urwego', guideObese: 'Umubyibuho ukabije',
    how: 'Uko ikoreshwa', step1: 'Andika ibiro byawe muri kg.', step2: 'Andika uburebure muri cm.', step3: 'Kanda “Bara BMI” urebe igisubizo.',
    warning: 'BMI ni igipimo rusange. Ntigisuzuma indwara kandi ntigisimbura muganga.',
    invalidWeight: 'Andika ibiro biri hagati ya 1 na 500 kg.', invalidHeight: 'Andika uburebure buri hagati ya 50 na 300 cm.',
    invalidAge: 'Andika imyaka yawe neza.', under20: 'Iyi mibare y’ibyiciro igenewe abantu bafite imyaka 20 kuzamura. Ku bantu bari munsi yayo, BMI isobanurwa hakoreshejwe imyaka n’igitsina.',
    footer: 'BMI Calculator — Wite ku buzima bwawe.', frontOnly: 'Frontend gusa • Amakuru abikwa kuri iyi browser',
    menu: 'Fungura menu', close: 'Funga', language: 'Ururimi', csvDone: 'Raporo yakuweho.'
  },
  en: {
    brand: 'BMI Calculator', tagline: 'Understand your number. Care for yourself.',
    home: 'Home', calculator: 'BMI Calculator', dashboard: 'Dashboard', history: 'History', profile: 'Profile',
    welcome: 'Welcome!', intro: 'Calculate your BMI easily and quickly.',
    heroText: 'Understand your BMI range, track changes, and take care of your health.',
    start: 'Calculate BMI', learn: 'Learn about BMI', trusted: 'Simple • Fast • Clear',
    calculatorTitle: 'Calculate your BMI', calculatorDesc: 'Enter your weight and height to see your result.',
    weight: 'Weight', height: 'Height', kg: 'kg', cm: 'cm', age: 'Age',
    calculate: 'Calculate BMI', clear: 'Clear inputs', result: 'Your result', yourBMI: 'Your BMI',
    category: 'Category', explanation: 'Explanation', healthyRange: 'The usual adult BMI range is 18.5 to under 25.',
    under: 'Below the usual weight range', normal: 'Within the usual weight range', over: 'Above the usual weight range', obese: 'Obesity range',
    adultNote: 'Categories are for adults aged 20 and over. BMI is not a diagnosis.',
    save: 'Save result', saved: 'Result saved', calculateFirst: 'Calculate your BMI first.',
    dashboardTitle: 'Your dashboard', dashboardDesc: 'See how your measurements have changed.',
    latest: 'Latest BMI', records: 'Saved measurements', latestWeight: 'Latest weight', trend: 'BMI trend',
    noData: 'No measurements saved yet. Calculate your BMI to start tracking.',
    historyTitle: 'BMI history', date: 'Date', bmi: 'BMI', action: 'Action', export: 'Export CSV', delete: 'Clear history',
    confirmDelete: 'Are you sure you want to delete all BMI history?', emptyHistory: 'No history yet.',
    profileTitle: 'Profile', name: 'Name', email: 'Email', saveProfile: 'Save profile',
    profileSaved: 'Profile saved in this browser.', profileHint: 'Frontend only: information is saved in this browser.',
    guideTitle: 'What is BMI?', guideText: 'BMI (Body Mass Index) compares weight with height. It does not replace medical advice.',
    guide1: 'Below 18.5', guide2: '18.5 to under 25', guide3: '25 to under 30', guide4: '30 and above',
    guideUnder: 'Below usual range', guideNormal: 'Usual range', guideOver: 'Above usual range', guideObese: 'Obesity range',
    how: 'How to use it', step1: 'Enter your weight in kg.', step2: 'Enter your height in cm.', step3: 'Select “Calculate BMI” to see your result.',
    warning: 'BMI is a general measure. It does not diagnose illness or replace a clinician.',
    invalidWeight: 'Enter a weight between 1 and 500 kg.', invalidHeight: 'Enter a height between 50 and 300 cm.',
    invalidAge: 'Enter a valid age.', under20: 'These categories are for people aged 20 and over. For younger people, BMI is interpreted using age and sex.',
    footer: 'BMI Calculator — Take care of your health.', frontOnly: 'Frontend only • Data stays in this browser',
    menu: 'Open menu', close: 'Close', language: 'Language', csvDone: 'Report exported.'
  }
}

const getCategory = (bmi, lang) => {
  const t = words[lang]
  if (bmi < 18.5) return { label: t.under, className: 'under' }
  if (bmi < 25) return { label: t.normal, className: 'normal' }
  if (bmi < 30) return { label: t.over, className: 'over' }
  return { label: t.obese, className: 'obese' }
}
const readStore = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function App() {
  const [lang, setLang] = useState(() => readStore('bmi-language', 'rw'))
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [records, setRecords] = useState(() => readStore('bmi-records', []))
  const [profile, setProfile] = useState(() => readStore('bmi-profile', { name: '', email: '' }))
  const t = words[lang]

  useEffect(() => localStorage.setItem('bmi-language', JSON.stringify(lang)), [lang])
  useEffect(() => localStorage.setItem('bmi-records', JSON.stringify(records)), [records])
  useEffect(() => localStorage.setItem('bmi-profile', JSON.stringify(profile)), [profile])

  const latest = records[0]
  const chartData = useMemo(() => [...records].reverse().map((r) => ({
    date: new Date(r.createdAt).toLocaleDateString(lang === 'rw' ? 'rw-RW' : 'en-US', { month: 'short', day: 'numeric' }),
    bmi: Number(r.bmi.toFixed(1))
  })), [records, lang])

  function calculate(e) {
    e?.preventDefault()
    setError('')
    setNotice('')
    const w = Number(weight), h = Number(height), a = Number(age)
    if (!weight || !Number.isFinite(w) || w < 1 || w > 500) return setError(t.invalidWeight)
    if (!height || !Number.isFinite(h) || h < 50 || h > 300) return setError(t.invalidHeight)
    if (!age || !Number.isFinite(a) || a < 1 || a > 120) return setError(t.invalidAge)
    const bmi = w / ((h / 100) ** 2)
    const item = { id: crypto.randomUUID?.() ?? String(Date.now()), name: profile.name?.trim() || (lang === 'rw' ? 'Nta zina' : 'Unnamed'), weight: w, height: h, age: a, bmi, category: getCategory(bmi, lang).className, createdAt: new Date().toISOString() }
    setResult(item)
  }
  function saveResult() {
    if (!result) return setNotice(t.calculateFirst)
    setRecords(prev => [result, ...prev.filter(r => r.id !== result.id)])
    setNotice(t.saved)
  }
  function clearForm() { setWeight(''); setHeight(''); setAge(''); setError(''); setNotice(''); setResult(null) }
  function navigate(next) { setPage(next); setMobileOpen(false); setError(''); setNotice('') }
  function exportCSV() {
    if (!records.length) return
    const rows = [['Name','Date','Weight (kg)','Height (cm)','Age','BMI','Category'], ...records.map(r => [r.name || '',new Date(r.createdAt).toLocaleString(),r.weight,r.height,r.age,r.bmi.toFixed(2),getCategory(r.bmi, 'en').label])]
    const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = 'bmi-history.csv'; a.click(); URL.revokeObjectURL(url)
  }
  function clearHistory() {
    if (window.confirm(t.confirmDelete)) { setRecords([]); setNotice('') }
  }

  const navItems = [
    ['home', House, t.home], ['calculator', Calculator, t.calculator],
    ['dashboard', BarChart3, t.dashboard], ['history', History, t.history], ['profile', UserRound, t.profile]
  ]
  const goCalculate = () => { navigate('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="app-shell">
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => navigate('home')} aria-label={t.home}>
          <span className="brand-icon"><HeartPulse size={22}/></span>
          <span><strong>{t.brand}</strong><small>{t.tagline}</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([id, Icon, label]) => <button key={id} className={`nav-link ${page === id ? 'active' : ''}`} onClick={() => navigate(id)}><Icon size={17}/>{label}</button>)}
        </nav>
        <div className="header-actions">
          <div className="language-picker">
            <Languages size={17}/>
            <select aria-label={t.language} value={lang} onChange={e => setLang(e.target.value)}>
              <option value="rw">Kinyarwanda</option><option value="en">English</option>
            </select>
            <ChevronDown size={14}/>
          </div>
          <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label={t.menu}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobileOpen && <nav className="mobile-nav">{navItems.map(([id, Icon, label]) => <button key={id} onClick={() => navigate(id)}><Icon size={18}/>{label}</button>)}</nav>}
    </header>

    <main>
      {page === 'home' && <Home t={t} onCalculate={goCalculate} onNavigate={navigate}/>}
      {page === 'guide' && <section className="page-wrap">
        <PageHeading eyebrow={t.learn} title={t.guideTitle} description={t.guideText}/>
        <div className="panel guide-detail">
          <h2>{lang === 'rw' ? 'BMI ni iki?' : 'What is BMI?'}</h2>
          <p>{lang === 'rw' ? 'BMI (Body Mass Index) ni igipimo kibara isano iri hagati y’ibiro n’uburebure. Kiboneka ugabanyije ibiro byawe muri kg n’uburebure bwawe muri metero wikubye kabiri.' : 'BMI (Body Mass Index) is a measure that relates a person’s weight to their height. It is calculated by dividing weight in kilograms by height in meters squared.'}</p>
          <h3>{lang === 'rw' ? 'Uko usoma igisubizo ku bantu bakuru' : 'How to read adult BMI'}</h3>
          <div className="guide-grid"><GuideRange range={t.guide1} label={t.guideUnder} color="under"/><GuideRange range={t.guide2} label={t.guideNormal} color="normal"/><GuideRange range={t.guide3} label={t.guideOver} color="over"/><GuideRange range={t.guide4} label={t.guideObese} color="obese"/></div>
          <p className="small-note"><ShieldCheck size={16}/>{t.warning}</p>
          <button className="button primary" onClick={goCalculate}>{t.start}<ArrowUpRight size={18}/></button>
        </div>
      </section>}
      {page === 'calculator' && <section className="page-wrap">
        <PageHeading eyebrow={t.calculator} title={t.calculatorTitle} description={t.calculatorDesc}/>
        <div className="calculator-layout">
          <form className="panel calculator-form" onSubmit={calculate}>
            <div className="form-heading"><span className="soft-icon"><Calculator/></span><div><h2>{t.calculatorTitle}</h2><p>{t.calculatorDesc}</p></div></div>
            <label>{t.weight}<span className="input-wrap"><Weight size={18}/><input type="number" min="1" max="500" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" required/><b>{t.kg}</b></span></label>
            <label>{t.height}<span className="input-wrap"><Ruler size={18}/><input type="number" min="50" max="300" step="0.1" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" required/><b>{t.cm}</b></span></label>
            <label>{t.age}<span className="input-wrap"><CalendarDays size={18}/><input type="number" min="1" max="120" value={age} onChange={e => setAge(e.target.value)} placeholder="25" required/><b>{lang === 'rw' ? 'imyaka' : 'years'}</b></span></label>
            {error && <p className="message error" role="alert">{error}</p>}
            <div className="form-actions"><button className="button primary" type="submit"><Calculator size={18}/>{t.calculate}</button><button className="button secondary" type="button" onClick={clearForm}><RefreshCw size={17}/>{t.clear}</button></div>
          </form>
          <section className="panel result-panel">
            <div className="result-top"><span className="soft-icon green"><Activity/></span><span className="eyebrow">{t.result}</span></div>
            {result ? <div className="result-content">
              <div className="bmi-number">{result.bmi.toFixed(1)}<small>{t.yourBMI}</small></div>
              <div className={`category-pill ${getCategory(result.bmi,lang).className}`}><span/>{getCategory(result.bmi,lang).label}</div>
              <div className="bmi-scale"><span/><span/><span/><span/><i style={{left:`${Math.max(2,Math.min(98,(result.bmi/40)*100))}%`}}/></div>
              <div className="scale-labels"><span>18.5</span><span>25</span><span>30</span></div>
              <p className="result-explain">{t.explanation}: {getCategory(result.bmi,lang).label}.</p>
              {result.age < 20 && <p className="message warning">{t.under20}</p>}
              <p className="small-note">{t.adultNote}</p>
              <button className="button primary full" onClick={saveResult}><Check size={18}/>{t.save}</button>
            </div> : <div className="empty-result"><div className="result-placeholder"><Activity size={35}/></div><h3>{t.yourBMI}</h3><p>{t.healthyRange}</p><div className="skeleton-line"/><div className="skeleton-line short"/></div>}
            {notice && <p className="message success">{notice}</p>}
          </section>
        </div>
        <div className="notice-strip"><ShieldCheck size={19}/><span>{t.warning}</span></div>
      </section>}
      {page === 'dashboard' && <section className="page-wrap">
        <PageHeading eyebrow={t.dashboard} title={t.dashboardTitle} description={t.dashboardDesc}/>
        {records.length ? <>
          <div className="stats-grid">
            <StatCard icon={Activity} label={t.latest} value={latest.bmi.toFixed(1)} hint={getCategory(latest.bmi,lang).label}/>
            <StatCard icon={History} label={t.records} value={records.length} hint={t.records}/>
            <StatCard icon={Weight} label={t.latestWeight} value={`${latest.weight} kg`} hint={`${latest.height} cm`}/>
          </div>
          <div className="panel chart-panel"><div className="section-title"><div><h2>{t.trend}</h2><p>{t.dashboardDesc}</p></div><span className="soft-icon"><BarChart3/></span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf5"/><XAxis dataKey="date" tickLine={false} axisLine={false}/><YAxis domain={['auto','auto']} tickLine={false} axisLine={false}/><Tooltip/><Line type="monotone" dataKey="bmi" stroke="#155eef" strokeWidth={3} dot={{r:4,fill:'#18a979'}} activeDot={{r:6}}/></LineChart></ResponsiveContainer></div></div>
          <button className="button secondary" onClick={() => navigate('history')}>{t.history} <ArrowDownRight size={17}/></button>
        </> : <EmptyState t={t} onCalculate={goCalculate}/>}
      </section>}
      {page === 'history' && <section className="page-wrap">
        <PageHeading eyebrow={t.history} title={t.historyTitle} description={t.dashboardDesc}/>
        <div className="panel history-panel">
          <div className="history-toolbar"><span>{records.length} {t.records}</span><div><button className="button secondary small" onClick={exportCSV} disabled={!records.length}><Download size={16}/>{t.export}</button><button className="button danger small" onClick={clearHistory} disabled={!records.length}><Trash2 size={16}/>{t.delete}</button></div></div>
          {records.length ? <div className="table-scroll"><table><thead><tr><th>{t.name}</th><th>{t.date}</th><th>{t.weight}</th><th>{t.height}</th><th>{t.bmi}</th><th>{t.category}</th><th>{t.action}</th></tr></thead><tbody>{records.map(r => <tr key={r.id}><td><strong>{r.name || (lang === 'rw' ? 'Nta zina' : 'Unnamed')}</strong></td><td>{new Date(r.createdAt).toLocaleString(lang === 'rw' ? 'rw-RW' : 'en-US')}</td><td>{r.weight} kg</td><td>{r.height} cm</td><td><strong>{r.bmi.toFixed(1)}</strong></td><td><span className={`category-pill compact ${getCategory(r.bmi,lang).className}`}>{getCategory(r.bmi,lang).label}</span></td><td><button className="icon-button" title={t.delete} onClick={() => setRecords(prev => prev.filter(x => x.id !== r.id))}><Trash2 size={17}/></button></td></tr>)}</tbody></table></div> : <div className="empty-history"><History size={36}/><p>{t.emptyHistory}</p><button className="button primary" onClick={goCalculate}>{t.start}</button></div>}
        </div>
      </section>}
      {page === 'profile' && <section className="page-wrap narrow">
        <PageHeading eyebrow={t.profile} title={t.profileTitle} description={t.profileHint}/>
        <form className="panel profile-form" onSubmit={e => {e.preventDefault();setNotice(t.profileSaved)}}>
          <div className="profile-avatar"><UserRound size={30}/></div>
          <label>{t.name}<input className="text-input" value={profile.name} onChange={e => setProfile({...profile,name:e.target.value})} placeholder={t.name}/></label>
          <label>{t.email}<input className="text-input" type="email" value={profile.email} onChange={e => setProfile({...profile,email:e.target.value})} placeholder="name@example.com"/></label>
          <button className="button primary" type="submit"><Check size={18}/>{t.saveProfile}</button>
          {notice && <p className="message success">{notice}</p>}
          <p className="small-note">{t.profileHint}</p>
        </form>
      </section>}
    </main>
    <footer className="footer"><div className="footer-inner"><span className="footer-brand"><span className="footer-mark"><HeartPulse size={17}/></span> {t.footer}</span><p className="footer-description">BMI Calculator is a simple health tool that calculates your Body Mass Index (BMI) using your height and weight, helps you understand your BMI category, and lets you review your measurement history.</p><span className="footer-marquee" aria-label="Developed by Havugimana felex in Eav kivumu Tss students"><span>Developed by Havugimana felex in Eav kivumu Tss students</span></span><nav className="footer-socials" aria-label="Social media"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">Facebook</a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">YouTube</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">Instagram</a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Twitter" title="Twitter">Twitter</a></nav><span className="footer-note">{t.frontOnly}</span></div></footer>
  </div>
}

function PageHeading({eyebrow,title,description}) {
  return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
}
function StatCard({icon:Icon,label,value,hint}) {
  return <div className="panel stat-card"><span className="soft-icon"><Icon/></span><span className="stat-label">{label}</span><strong>{value}</strong><small>{hint}</small></div>
}
function EmptyState({t,onCalculate}) {
  return <div className="panel empty-state"><span className="empty-icon"><BarChart3 size={32}/></span><h2>{t.noData}</h2><p>{t.noData}</p><button className="button primary" onClick={onCalculate}>{t.start}</button></div>
}
function Home({t,onCalculate,onNavigate}) {
  return <div className="home-page">
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy"><span className="hero-tag"><HeartPulse size={16}/>{t.trusted}</span><h1>{t.welcome}<br/><em>{t.intro}</em></h1><p>{t.heroText}</p><div className="hero-actions"><button className="button primary large" onClick={onCalculate}>{t.start}<ArrowUpRight size={19}/></button><button className="button hero-secondary large" onClick={() => onNavigate('guide')}>{t.learn}<CircleHelp size={18}/></button></div><div className="hero-foot"><span className="tiny-check"><Check size={13}/></span>{t.adultNote}</div></div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-card"><div className="hero-card-top"><span className="pulse-icon"><Activity size={21}/></span><span>BMI <b>22.9</b></span><span className="mini-status">●</span></div><div className="hero-graph"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="hero-card-bottom"><span><i/>18.5 — 24.9</span><b>Normal</b></div></div><div className="floating-badge badge-one"><span className="badge-icon"><Check size={15}/></span><span><b>22.9</b><small>Healthy range</small></span></div><div className="floating-badge badge-two"><span className="badge-icon green"><HeartPulse size={17}/></span><span><b>Wite ku buzima</b><small>Umunsi ku wundi</small></span></div><div className="hero-blob"/></div>
      </div>
    </section>
    <section className="home-features page-wrap"><div className="center-heading"><span className="eyebrow">{t.brand}</span><h2>{t.guideTitle}</h2><p>{t.guideText}</p></div><div className="feature-grid"><Feature icon={Calculator} title={t.calculator} text={t.calculatorDesc} onClick={onCalculate}/><Feature icon={History} title={t.history} text={t.dashboardDesc} onClick={() => onNavigate('history')}/><Feature icon={BarChart3} title={t.dashboard} text={t.trend} onClick={() => onNavigate('dashboard')}/></div><div className="how-panel panel"><div><span className="eyebrow">{t.how}</span><h2>{t.how}</h2></div><ol><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li></ol><button className="button primary" onClick={onCalculate}>{t.start}<ArrowUpRight size={18}/></button></div><div className="bmi-guide"><h2>{t.guideTitle}</h2><div className="guide-grid"><GuideRange range={t.guide1} label={t.guideUnder} color="under"/><GuideRange range={t.guide2} label={t.guideNormal} color="normal"/><GuideRange range={t.guide3} label={t.guideOver} color="over"/><GuideRange range={t.guide4} label={t.guideObese} color="obese"/></div><p className="small-note"><ShieldCheck size={16}/>{t.warning}</p></div></section>
  </div>
}
function Feature({icon:Icon,title,text,onClick}) {
  return <button className="feature-card panel" onClick={onClick}><span className="soft-icon"><Icon/></span><h3>{title}</h3><p>{text}</p><span className="feature-link">Fungura <ArrowUpRight size={16}/></span></button>
}
function GuideRange({range,label,color}) {
  return <div className="guide-item"><span className={`guide-dot ${color}`}/><strong>{range}</strong><small>{label}</small></div>
}
