
const { useState, useMemo, useEffect } = React;

// ---------------- Data ----------------
const THEMES = [
  { key:"thales", title:"Théorème de Thalès", color:"#2563eb" },
  { key:"pythagore", title:"Théorème de Pythagore", color:"#16a34a" },
  { key:"litteral", title:"Calculs littéraux", color:"#f59e0b" },
  { key:"fractions", title:"Fractions", color:"#d946ef" },
  { key:"proportion", title:"Proportionnalité", color:"#0ea5e9" },
  { key:"mesures", title:"Grandeurs & mesures", color:"#ea580c" }
];

const LESSONS = {
  thales:[
    "Configuration : M ∈ [AB], N ∈ [AC] et (MN)//(BC).",
    "Égalité des rapports : AM/AB = AN/AC = MN/BC.",
    "Applications : calculs de longueurs ; réciproque pour prouver le parallélisme."
  ],
  pythagore:[
    "Si ABC est rectangle en A : BC² = AB² + AC² ; réciproque et contraposée.",
    "Hypoténuse = côté opposé à l’angle droit (toujours le plus long).",
    "Cas pratiques : calculs de longueurs, vérification d’un angle droit."
  ],
  litteral:[
    "Réduire (rassembler termes), développer (distributivités), factoriser (facteur commun).",
    "Substituer une valeur, respecter les priorités d’opérations.",
    "Équations linéaires simples (selon progression)."
  ],
  fractions:[
    "Addition/soustraction : dénominateur commun.",
    "Produit/quotient : multiplier par l’inverse (simplifier avant).",
    "Passer en décimal/pourcentage si pertinent."
  ],
  proportion:[
    "Tableaux, produit en croix, coefficient de proportionnalité.",
    "Pourcentages, échelles, vitesses (unités !).",
    "Toujours vérifier la proportionnalité."
  ],
  mesures:[
    "Conversions longueurs/aires/volumes ; périmètres/aires/volumes usuels.",
    "Vitesses moyennes : v=d/t (unités cohérentes).",
    "Formules : disque, rectangle, triangle ; pavé droit, cylindre."
  ]
};

function ThalesSVG(){
  return (
    <svg className="diagram" viewBox="0 0 260 180" aria-label="Schéma de Thalès">
      <polygon points="30,150 220,150 90,30" fill="none" stroke="#1f2937" strokeWidth="2"/>
      <line x1="60" y1="150" x2="120" y2="90" stroke="#2563eb" strokeWidth="3"/>
      <line x1="90" y1="30" x2="120" y2="90" stroke="#2563eb" strokeWidth="3"/>
      <line x1="120" y1="90" x2="180" y2="90" stroke="#2563eb" strokeWidth="3"/>
      <text x="24" y="165" fill="#0f172a" fontSize="12">A</text>
      <text x="222" y="165" fill="#0f172a" fontSize="12">B</text>
      <text x="86" y="22" fill="#0f172a" fontSize="12">C</text>
      <text x="56" y="165" fill="#0f172a" fontSize="12">M</text>
      <text x="184" y="96" fill="#0f172a" fontSize="12">N</text>
      <text x="130" y="86" fill="#0f172a" fontSize="11">MN // BC</text>
    </svg>
  );
}
function PythagoreSVG(){
  return (
    <svg className="diagram" viewBox="0 0 260 180" aria-label="Schéma de Pythagore">
      <polygon points="40,150 200,150 40,40" fill="none" stroke="#1f2937" strokeWidth="2"/>
      <rect x="40" y="130" width="20" height="20" fill="#16a34a" opacity="0.25"/>
      <text x="30" y="165" fill="#0f172a" fontSize="12">A</text>
      <text x="204" y="165" fill="#0f172a" fontSize="12">B</text>
      <text x="28" y="40" fill="#0f172a" fontSize="12">C</text>
      <text x="110" y="160" fill="#0f172a" fontSize="12">AB (hypoténuse)</text>
    </svg>
  );
}

// --------------- Question bank (10 / thème) ---------------
const BANK = {
  thales: [
    { q:"Dans ABC, (MN)//(BC). AB=8, AM=3, AC=10. AN = ?", choices:["3,75","4","2,5","5"], answer:0, why:"AM/AB = AN/AC ⇒ 3/8 = AN/10 ⇒ AN=3×10/8=3,75." },
    { q:"Dans ABC, (MN)//(BC). AB=12, AM=9, BC=20. MN = ?", choices:["12","15","10","18"], answer:1, why:"9/12=MN/20 ⇒ MN=15." },
    { q:"(MN)//(BC). AN=7, AC=14. Coefficient k = AN/AC ?", choices:["1/3","1/2","2","7"], answer:1, why:"k=7/14=1/2 (réduction)." },
    { q:"(MN)//(BC). AM=5, AB=20, MN=6. BC = ?", choices:["12","18","24","30"], answer:2, why:"5/20=6/BC ⇒ BC=24." },
    { q:"(MN)//(BC). AB=10, AC=15, MN=6. BC = ?", choices:["9","12","15","18"], answer:0, why:"6/BC=10/15 ⇒ BC=9."},
    { q:"(MN)//(BC). AM/AB = 2/5 et AN=6. AC = ?", choices:["10","12","15","18"], answer:2, why:"AN/AC=2/5 ⇒ AC=15." },
    { q:"(MN)//(BC). AB=18, AC=24, AM=9. AN = ?", choices:["10","11","12","13"], answer:2, why:"9/18=AN/24 ⇒ AN=12." },
    { q:"Si AM=AB alors MN/BC = ?", choices:["0","1/2","1","2"], answer:2, why:"Rapports égaux ⇒ 1." },
    { q:"(MN)//(BC). AM=4, AB=16, BC=40. MN = ?", choices:["8","9","10","11"], answer:2, why:"4/16=MN/40 ⇒ MN=10."},
    { q:"(MN)//(BC). AB=9, AC=12, MN=9. BC ?", choices:["6","10","12","15"], answer:2, why:"BC=(MN×AC)/AB=(9×12)/9=12."}
  ],
  pythagore: [
    { q:"Rect. en A, AB=3, AC=4. BC?", choices:["5","6","7","4,5"], answer:0, why:"3²+4²=5²." },
    { q:"Rect. en C, AB=13, AC=5. BC?", choices:["12","8","10","√13"], answer:0, why:"AB²=AC²+BC² ⇒ BC=12." },
    { q:"Rect. en B, AC=10, BC=6. AB?", choices:["8","√136","14","√164"], answer:0, why:"AB²=AC²−BC²=64 ⇒ AB=8." },
    { q:"Triangle 7-24-25 : rectangle ?", choices:["Oui","Non","Impossible"], answer:0, why:"49+576=625." },
    { q:"Rect. en A, AB= x, AC=9, BC=15. x?", choices:["12","√306","6","√144"], answer:0, why:"x²=225−81=144 ⇒ 12." },
    { q:"Rect. en C, AB=10, AC=8. BC?", choices:["6","√18","√36","4"], answer:0, why:"100−64=36 ⇒ 6." },
    { q:"Rect. ?, côtés 5,6,7", choices:["Oui","Non","On ne sait pas"], answer:1, why:"61≠49." },
    { q:"Rect. en B, AB=17, BC=15. AC?", choices:["8","10","12","√289"], answer:0, why:"289−225=64 ⇒ 8."},
    { q:"Rect. en A, AB=26, AC=10. BC?", choices:["24","√576","12","16"], answer:0, why:"676−100=576 ⇒ 24." },
    { q:"Contraposée : si c²≠a²+b² alors…", choices:["Triangle rectangle","Pas rectangle","Toujours isocèle","Toujours équilatéral"], answer:1, why:"Pas rectangle." }
  ],
  litteral: [
    { q:"Réduire : 3x + 5 − 2x + 1", choices:["x+6","x+4","5x+6","x−4"], answer:0, why:"(3x−2x)+(5+1)=x+6." },
    { q:"Développer : 2(x−3)", choices:["2x−6","2x+6","x−6","2x−3"], answer:0, why:"Distributivité." },
    { q:"Développer : (2x−3)(x+4)", choices:["2x²+5x−12","2x²+8x−3","2x²+5x+12","x²+8x−3"], answer:0, why:"2x²+5x−12." },
    { q:"Factoriser : 7x − 21", choices:["7(x−3)","7(x+3)","(7x−3)","(7−3)x"], answer:0, why:"Sortir 7." },
    { q:"Réduire : 5x − (2x − 4)", choices:["3x+4","3x−4","7x−4","7x+4"], answer:0, why:"5x−2x+4."},
    { q:"Développer : (x+2)²", choices:["x²+4x+4","x²+2","x²+2x+2","x²+4"], answer:0, why:"(a+b)²." },
    { q:"Réduire : 4(3x−1)−2(2x−5)", choices:["8x+6","8x−6","8x+2","12x−4"], answer:0, why:"12x−4−(4x−10)=8x+6."},
    { q:"Substituer x=−2 : 3x²−x", choices:["14","10","−10","−14"], answer:0, why:"12+2." },
    { q:"Équation : 2x+5=19", choices:["6","7","8","9"], answer:1, why:"2x=14 ⇒ x=7."},
    { q:"Factoriser : 6x+9y", choices:["3(2x+3y)","(6+9)(x+y)","6(x+y)+3y","3x(2+3y)"], answer:0, why:"PGCD 3." }
  ],
  fractions: [
    { q:"(3/4)+(1/6)= ?", choices:["11/12","5/10","10/12","13/12"], answer:0, why:"9/12+2/12=11/12." },
    { q:"(5/8)×(12/5)= ?", choices:["12/8","60/13","3/2","17/8"], answer:2, why:"=3/2." },
    { q:"(7/9)−(2/3)= ?", choices:["1/9","3/9","5/9","7/27"], answer:0, why:"2/3=6/9 ⇒ 1/9." },
    { q:"(3/5) ÷ (9/10)= ?", choices:["2/3","10/15","6/9","30/45"], answer:0, why:"× l’inverse ⇒ 30/45=2/3." },
    { q:"Simplifie 28/42", choices:["2/3","4/7","3/7","2/7"], answer:0, why:"÷14." },
    { q:"0,125 = ?", choices:["1/4","1/8","1/6","1/5"], answer:1, why:"1/8." },
    { q:"(−2/3)+(5/6)= ?", choices:["1/6","−1/6","7/6","−7/6"], answer:0, why:"−4/6+5/6." },
    { q:"(2/7)×(14/5)= ?", choices:["4/5","2/5","28/35","16/5"], answer:0, why:"=4/5." },
    { q:"(3/4) ÷ (1/2)= ?", choices:["3/2","2/3","1/2","6"], answer:0, why:"×2." },
    { q:"(5/12)+(7/18)= ?", choices:["41/36","29/36","11/30","1"], answer:1, why:"15/36+14/36." }
  ],
  proportion: [
    { q:"6 kg coûtent 18 €. 2,5 kg ?", choices:["7,5 €","6 €","9 €","10 €"], answer:0, why:"k=3 ⇒ 7,5 €." },
    { q:"Remise 20 % sur 45 €", choices:["36 €","40,5 €","9 €","33 €"], answer:0, why:"45×0,8=36." },
    { q:"Échelle 1:25 000. 4 cm sur carte = ? km", choices:["1 km","2 km","10 km","0,5 km"], answer:0, why:"100 000 cm." },
    { q:"Vitesse moyenne : 150 km en 2 h 30", choices:["50","60","65","70"], answer:1, why:"150/2,5=60." },
    { q:"x/12 = 8/3", choices:["32","48","64","96"], answer:0, why:"x=32."},
    { q:"Augmenter 80 de 15 %", choices:["92","92,5","94","95"], answer:0, why:"×1,15."},
    { q:"Baisse 12 % de 250", choices:["220","218","220,5","232"], answer:0, why:"×0,88." },
    { q:"Conso 6 L/100 km. Pour 350 km ?", choices:["18","21","24","30"], answer:1, why:"=21." },
    { q:"Salaire +10 % puis −10 %", choices:["inchangé","+1 %","−1 %","+0 %"], answer:2, why:"0,99." },
    { q:"Échelle 1:5000, 12 cm ?", choices:["60 m","600 m","120 m","6 km"], answer:1, why:"600 m." }
  ],
  mesures: [
    { q:"Périmètre rectangle 7×4,5", choices:["23 cm","21 cm","20 cm","11,5 cm"], answer:0, why:"2(7+4,5)." },
    { q:"Aire rectangle 7×4,5", choices:["31,5 cm²","28 cm²","11,5 cm²","14,5 cm²"], answer:0, why:"7×4,5." },
    { q:"Volume pavé 3×2×0,5 m", choices:["3 m³","2,5 m³","1,5 m³","30 dm³"], answer:0, why:"3×2×0,5."},
    { q:"1,2 m = ? cm", choices:["12","120","0,12","1 200"], answer:1, why:"×100." },
    { q:"1,5 L = ? cm³", choices:["150","1 500","15 000","150 000"], answer:1, why:"1 L=1000 cm³."},
    { q:"Aire disque r=5", choices:["25π","10π","50π","5π²"], answer:0, why:"πr²." },
    { q:"Aire triangle b=12, h=7", choices:["84","42","19","24"], answer:1, why:"(b×h)/2." },
    { q:"Vitesse : 120 km en 1 h 30", choices:["80","90","100","120"], answer:0, why:"120/1,5."},
    { q:"Convertir 2,5 m² en cm²", choices:["250","2 500","25 000","250 000"], answer:2, why:"×10 000." },
    { q:"Volume cylindre r=3, h=10 (≈)", choices:["90π","30π","60π","9π"], answer:0, why:"π×9×10." }
  ]
};

// ---------------- UI ----------------
function Progress({value,max,color}){
  const pct = Math.round(100*value/max);
  return (<div className="progress" title={`${pct}%`}><div className="bar" style={{width:`${pct}%`,background:color}}/></div>);
}

function ThemeCard({t,progress,onOpenCourse,onOpenQuiz}){
  const pr = progress[t.key]||0; const total = BANK[t.key].length;
  return (
    <div className="card">
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
        <span className="badge" style={{background:t.color}}></span>
        <h3 style={{margin:0}}>{t.title}</h3>
      </div>
      <ul style={{margin:'0 0 10px 18px',color:'var(--muted)'}}>
        {LESSONS[t.key].map((l,i)=>(<li key={i}>{l}</li>))}
      </ul>
      <Progress value={pr} max={total} color={t.color}/>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:10,alignItems:'center'}}>
        <small className="small">Progression : {pr}/{total}</small>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>onOpenCourse(t)}>Cours</button>
          <button className="btn" style={{background:t.color,color:'#fff',borderColor:t.color}} onClick={()=>onOpenQuiz(t)}>Quiz</button>
        </div>
      </div>
    </div>
  );
}

function Lesson({themeKey}){
  const Svg = themeKey==='thales'?ThalesSVG:themeKey==='pythagore'?PythagoreSVG:null;
  return (
    <div className="card">
      <div className="svg-wrap">{Svg? <Svg/>: null}</div>
      <h4 style={{margin:'0 0 8px'}}>Cours — {THEMES.find(t=>t.key===themeKey).title}</h4>
      <ul style={{margin:'0 0 8px 18px'}}>
        {LESSONS[themeKey].map((l,i)=>(<li key={i}>{l}</li>))}
      </ul>
      <div className="small">Astuce : A/B/C/D au clavier pendant le quiz.</div>
    </div>
  );
}

function Quiz({themeKey,onExit,onFinish}){
  const theme = THEMES.find(t=>t.key===themeKey);
  const questions = BANK[themeKey];
  const [i,setI]=useState(0);
  const [answers,setAnswers]=useState(Array(questions.length).fill(null));
  const q=questions[i];
  useEffect(()=>{const onKey=e=>{const m={a:0,b:1,c:2,d:3};const k=e.key.toLowerCase();if(m[k]!=null && !answers[i]) choose(m[k]);if(k==='arrowright') next();if(k==='arrowleft') prev()};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[i,answers]);
  const choose = idx=>{const isOk = idx===q.answer; const next=[...answers]; next[i]={choice:idx,isCorrect:isOk}; setAnswers(next)};
  const next = ()=> setI(v=>Math.min(v+1, questions.length-1));
  const prev = ()=> setI(v=>Math.max(v-1, 0));
  const done = answers.filter(Boolean).length; const score=answers.filter(a=>a?.isCorrect).length;
  return (
    <div className="card">
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
        <span className="badge" style={{background:theme.color}}></span>
        <h4 style={{margin:0}}>{theme.title} — Quiz</h4>
      </div>
      <Progress value={done} max={questions.length} color={theme.color}/>
      <p style={{margin:'10px 0 4px',color:'var(--muted)'}}>Question {i+1}/{questions.length}</p>
      <p style={{margin:'0 0 10px'}}>{q.q}</p>
      <div className="grid cols-2">
        {q.choices.map((c,idx)=>{
          const a=answers[i]; const picked=a?.choice===idx; const cls = a ? (idx===q.answer? 'choice ok' : picked ? 'choice bad' : 'choice') : 'choice';
          return (
            <button key={idx} className={cls} onClick={()=>choose(idx)} disabled={!!a}><strong style={{marginRight:6}}>{String.fromCharCode(65+idx)}.</strong>{c}</button>
          );
        })}
      </div>
      {answers[i] && <div className="card" style={{marginTop:12}}><strong>Correction détaillée</strong><div style={{marginTop:6}}>{q.why}</div></div>}
      <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
        <button className="btn" onClick={prev}>Précédent</button>
        {i<questions.length-1? <button className="btn-primary" onClick={next}>Suivant</button> : <button className="btn-primary" onClick={()=>{onFinish(); onExit();}}>Terminer</button>}
      </div>
      <div className="footer">Score provisoire : {score}/{done}</div>
    </div>
  );
}

function ThemeView({themeKey,onBack,markDone}){
  const [tab,setTab]=useState('cours');
  return (
    <div className="container" style={{padding:0}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <button className="btn" onClick={onBack}>← Retour</button>
        <div className="tabs">
          <button className={`tab ${tab==='cours'?'active':''}`} onClick={()=>setTab('cours')}>Cours</button>
          <button className={`tab ${tab==='quiz'?'active':''}`} onClick={()=>setTab('quiz')}>Quiz</button>
        </div>
      </div>
      {tab==='cours' ? <Lesson themeKey={themeKey}/> : <Quiz themeKey={themeKey} onExit={onBack} onFinish={()=>markDone(themeKey)}/>}
    </div>
  );
}

function Dashboard({onStart,progressByTheme}){
  return (
    <div className="grid cols-3">
      {THEMES.map(t=>{
        const pr = progressByTheme[t.key]||0; const total = BANK[t.key].length;
        return <ThemeCard key={t.key} t={t} progress={progressByTheme} onOpenCourse={()=>onStart(t.key,'cours')} onOpenQuiz={()=>onStart(t.key,'quiz')}/>;
      })}
    </div>
  );
}

function App(){
  const [active,setActive]=useState(null); // themeKey
  const [progress,setProgress]=useState({});

  const start = (themeKey,tab)=>{ setActive({themeKey, tab}); };
  const back = ()=> setActive(null);
  const markDone = (themeKey)=> setProgress(p=>({...p, [themeKey]: BANK[themeKey].length}));

  return (
    <div>
      <div className="container">
        <h1>Maths 4e — Cours + Quiz</h1>
        <p className="sub">Thalès · Pythagore · Calcul littéral · Fractions · Proportionnalité · Grandeurs & mesures</p>
        {!active ? (
          <>
            <Dashboard onStart={start} progressByTheme={progress}/>
            <div className="small" style={{marginTop:12}}>Version claire : cours visibles par onglet, corrections détaillées, navigation clavier (A/B/C/D, ← →).</div>
          </>
        ) : (
          <ThemeView themeKey={active.themeKey} onBack={back} markDone={markDone}/>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
