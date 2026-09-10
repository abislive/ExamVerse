'use strict';

/* ============================================================
   Question generators
   Each generator: (difficulty) => { q, correct, wrongs }
   Options are built later by mk() in app.js.
============================================================ */

/* ------------------------- MATHEMATICS ------------------------- */
const MATH = [
  d => { const a=R(120,980), b=R(120,980), c=a+b;
         return { q:t('whatIsValueOf',{x:`${a} + ${b}`}), correct:c, wrongs:[c+10,c-10,c+100] }; },
  d => { const a=R(12,49), b=R(3,12), c=a*b;
         return { q:t('whatIsValueOf',{x:`${a} × ${b}`}), correct:c, wrongs:[c+a,c-b,c+10] }; },
  d => { const a=R(200,900), b=R(100,190), c=a-b;
         return { q:t('whatIsValueOf',{x:`${a} − ${b}`}), correct:c, wrongs:[c+10,c-10,c+100] }; },
  d => { const p=P([10,20,25,50]), n=R(5,40)*20, c=p*n/100;
         return { q:t('whatIsPercentOf',{a:p,b:n}), correct:fmt(c),
                  wrongs:[fmt(c+1), fmt(c*2), fmt(c/2)] }; },
  d => { const a=R(2,9), b=R(1,20), x=R(2,20), c=a*x+b;
         return { q:t('solveForX',{eq:`${a}x + ${b} = ${c}`}), correct:x,
                  wrongs:[x+1,x-1,x+2] }; },
  d => { const r=R(2,14), c=3.14*r*r;
         return { q:t('areaOfCircle',{r}), correct:fmt(c),
                  wrongs:[fmt(2*3.14*r), fmt(3.14*r), fmt(c*2)] }; },
  d => { const a=R(6,30), b=R(4,24), l=a*b/gcd(a,b);
         return { q:t('lcmOf',{a,b}), correct:l,
                  wrongs:[l+a, l+b, Math.round(l/2)] }; },
  d => { const a=R(12,60), b=R(8,40), h=gcd(a,b);
         return { q:t('hcfOf',{a,b}), correct:h, wrongs:[h*2,h+1,h-1] }; },
  d => { const n=R(2,9);
         return { q:t('differentiate',{f:`x^${n}`}), correct:`${n}x^${n-1}`,
                  wrongs:[`${n}x^${n+1}`, `x^${n-1}`, `${n-1}x^${n}`] }; },
  d => { const n=R(1,6);
         return { q:t('integrate',{f:`x^${n}`}), correct:`x^${n+1}/${n+1} + C`,
                  wrongs:[`x^${n+1} + C`, `${n}x^${n-1} + C`, `x^${n}/${n} + C`] }; },
  d => { const a=R(2,9), dd=R(2,9), n=R(5,20), s=n/2*(2*a+(n-1)*dd);
         return { q:t('apSum',{n,a,b:a+dd,c:a+2*dd}), correct:fmt(s),
                  wrongs:[fmt(s+dd), fmt(s-n), fmt(s*2)] }; },
  d => { const r=R(2,8), b=R(2,8);
         return { q:t('probability',{r,b}), correct:fmt(r/(r+b)),
                  wrongs:[fmt(b/(r+b)), fmt(r/b), fmt((r+b)/r)] }; },
  d => { const p=R(2,20)*500, rr=P([4,5,6,8,10,12]), tt=R(2,5), si=p*rr*tt/100;
         return { q:t('simpleInterest',{p,r:rr,t:tt}), correct:fmt(si),
                  wrongs:[fmt(si*2), fmt(si/2), fmt(p*rr/100)] }; },
  d => { const a=R(1,9), b=R(1,9), c=R(1,9), e=R(1,9);
         return { q:t('determinant',{a,b,c,d:e}), correct:a*e-b*c,
                  wrongs:[a*e+b*c, a*b-c*e, a+c] }; },
  d => { const a=P([0,30,45,60,90]);
         const v={'0':'0','30':'0.5','45':'0.707','60':'0.866','90':'1'}[a];
         return { q:t('valueOfSin',{a}), correct:v,
                  wrongs:['0.5','0.707','0.866','1','0'].filter(x=>x!==v).slice(0,3) }; },
  d => { const r1=R(1,9), r2=R(1,9), s=r1+r2, p=r1*r2;
         return { q:t('quadraticRoot',{s,p}), correct:Math.max(r1,r2),
                  wrongs:[Math.min(r1,r2), s, p] }; },
  d => { const n=Array.from({length:5},()=>R(10,90)), m=n.reduce((x,y)=>x+y,0)/5;
         return { q:t('meanOf',{a:n[0],b:n[1],c:n[2],d:n[3],e:n[4]}), correct:fmt(m),
                  wrongs:[fmt(m+2), fmt(m-2), fmt(m*2)] }; }
];

/* --------------------------- PHYSICS --------------------------- */
const PHYSICS = [
  d => { const m=R(3,20), a=R(3,12), F=m*a;
         return { q:t('forceFromMA',{m,a}), correct:`${F} N`,
                  wrongs:[`${F+m} N`, `${F*2} N`, `${fmt(F/2)} N`] }; },
  d => { const f=R(5,50), dd=R(3,20), W=f*dd;
         return { q:t('workFromFD',{f,d:dd}), correct:`${W} J`,
                  wrongs:[`${W+f} J`, `${W*2} J`, `${fmt(W/2)} J`] }; },
  d => { const m=R(2,10), v=R(3,12), K=0.5*m*v*v;
         return { q:t('keFromMV',{m,v}), correct:`${fmt(K)} J`,
                  wrongs:[`${m*v*v} J`, `${m*v} J`, `${fmt(0.5*m*v)} J`] }; },
  d => { const r=R(3,20), i=R(3,8), V=r*i;
         return { q:t('ohmsLaw',{r,i}), correct:`${V} V`,
                  wrongs:[`${fmt(r/i)} V`, `${V+r} V`, `${V*2} V`] }; },
  d => { const i=R(3,8), v=R(3,40), Pw=i*v;
         return { q:t('powerFromVI',{i,v}), correct:`${Pw} W`,
                  wrongs:[`${Pw+i} W`, `${fmt(v/i)} W`, `${Pw*2} W`] }; },
  d => { const m=R(20,200), v=R(3,20);
         return { q:t('densityFromMV',{m,v}), correct:`${fmt(m/v)} g/cm³`,
                  wrongs:[`${fmt(m*v)} g/cm³`, `${fmt(v/m)} g/cm³`, `${fmt(m/v/2)} g/cm³`] }; },
  d => { const dd=R(50,500), s=R(3,20);
         return { q:t('speedFromDT',{d:dd,s}), correct:`${fmt(dd/s)} m/s`,
                  wrongs:[`${fmt(dd*s)} m/s`, `${fmt(s/dd)} m/s`, `${fmt(dd/s/2)} m/s`] }; },
  d => { const f=R(3,20), w=R(3,20);
         return { q:t('waveSpeed',{f,w}), correct:`${f*w} m/s`,
                  wrongs:[`${f+w} m/s`, `${fmt(f/w)} m/s`, `${f*w*2} m/s`] }; },
  d => { const a=R(3,20), b=R(3,20);
         return { q:t('seriesResistance',{a,b}), correct:`${a+b} Ω`,
                  wrongs:[`${fmt(a*b/(a+b))} Ω`, `${Math.abs(a-b)} Ω`, `${a*b} Ω`] }; },
  d => { const a=R(3,20), b=R(3,20);
         return { q:t('parallelResistance',{a,b}), correct:`${fmt(a*b/(a+b))} Ω`,
                  wrongs:[`${a+b} Ω`, `${Math.abs(a-b)} Ω`, `${a*b} Ω`] }; },
  d => { const q=P(Object.keys(UNIT_OF));
         return { q:t('siUnitOf',{x:term(q)}), correct:term(UNIT_OF[q]),
                  wrongs:pickN(ALL_UNITS.filter(x=>x!==UNIT_OF[q]),3).map(term) }; },
  d => { const map={newton:'force',joule:'energy',watt:'power',pascal:'pressure',
                   ampere:'current',volt:'voltage',ohm:'resistance'};
         const unit=P(Object.keys(map));
         return { q:t('siUnitOf',{x:term(map[unit])}), correct:term(unit),
                  wrongs:pickN(ALL_UNITS.filter(x=>x!==unit),3).map(term) }; }
];

/* -------------------------- CHEMISTRY -------------------------- */
const CHEMISTRY = [
  d => { const e=P(ELEM_KEYS);
         return { q:t('symbolFor',{x:term(e)}), correct:ELEMENTS[e][0],
                  wrongs:pickN(ELEM_KEYS.filter(k=>k!==e),3).map(k=>ELEMENTS[k][0]) }; },
  d => { const e=P(ELEM_KEYS);
         return { q:t('atomicNumberOf',{x:term(e)}), correct:ELEMENTS[e][1],
                  wrongs:[ELEMENTS[e][1]+1, ELEMENTS[e][1]-1, ELEMENTS[e][1]+8] }; },
  d => { const e=P(ELEM_KEYS);
         return { q:t('protonsIn',{x:term(e)}), correct:ELEMENTS[e][1],
                  wrongs:[ELEMENTS[e][1]+2, ELEMENTS[e][1]-2, ELEMENTS[e][1]*2] }; },
  d => { const e=P(ELEM_KEYS);
         return { q:t('electronsIn',{x:term(e)}), correct:ELEMENTS[e][1],
                  wrongs:[ELEMENTS[e][1]+3, ELEMENTS[e][1]-3, ELEMENTS[e][1]+1] }; },
  d => { const k=P(Object.keys(FORMULAS));
         return { q:t('formulaOf',{x:term(k)}), correct:FORMULAS[k],
                  wrongs:pickN(Object.keys(FORMULAS).filter(x=>x!==k),3).map(x=>FORMULAS[x]) }; },
  d => { const k=P(Object.keys(MOLAR));
         return { q:t('molarMassOf',{x:term(k)}), correct:MOLAR[k],
                  wrongs:pickN(Object.keys(MOLAR).filter(x=>x!==k),3).map(x=>MOLAR[x]) }; },
  d => { const e=P(BALANCED);
         return { q:t('balancedEq'), correct:e[0], wrongs:e[1] }; },
  d => { const pairs = [
           ['strongAcid','HCl'],['strongBase','NaOH'],
           ['weakAcid','CH₃COOH'],['neutralSubstance','NaCl']
         ];
         const p=P(pairs);
         return { q:t('knownAs',{x:term(p[0])}), correct:p[1],
                  wrongs:pairs.filter(x=>x[1]!==p[1]).map(x=>x[1]) }; },
  d => { const n=R(2,6), h=R(4,12), mm=12*n+h;
         return { q:t('molarMassOf',{x:`C${n}H${h}`}), correct:`${mm} g/mol`,
                  wrongs:[`${mm+12} g/mol`, `${mm-4} g/mol`, `${mm*2} g/mol`] }; },
  d => { const pairs = [
           ['hydrogen',1],['helium',2],['carbon',4],['nitrogen',5],
           ['oxygen',6],['neon',8],['silicon',4],['magnesium',2]
         ];
         const p=P(pairs);
         return { q:t('valenceElectronsOf',{x:term(p[0])}),
                  correct:p[1], wrongs:[p[1]+1, p[1]-1, p[1]+3] }; },
  d => { return { q:t('whichIsNot',{x:term('nobleGas')}),
                  correct:term(P(['oxygen','nitrogen','hydrogen'])),
                  wrongs:pickN(['helium','neon','argon'],3).map(term) }; }
];

/* --------------------------- BIOLOGY --------------------------- */
const BIOLOGY = [
  d => ({ q:t('knownAs',{x:term('powerhouseOfCell')}), correct:term('mitochondria'),
          wrongs:[term('ribosome'),term('nucleus'),term('chloroplast')] }),
  d => ({ q:t('knownAs',{x:term('suicideBagOfCell')}), correct:term('lysosome'),
          wrongs:[term('ribosome'),term('nucleus'),term('mitochondria')] }),
  d => ({ q:t('knownAs',{x:term('basicUnitOfLife')}), correct:term('cell'),
          wrongs:[term('nucleus'),term('protein'),term('gene')] }),
  d => ({ q:t('knownAs',{x:term('geneticMaterial')}), correct:term('dna'),
          wrongs:[term('protein'),term('enzyme'),term('hormone')] }),
  d => ({ q:t('knownAs',{x:term('largestOrgan')}), correct:term('skin'),
          wrongs:[term('nucleus'),term('cell'),term('haemoglobin')] }),
  d => ({ q:t('knownAs',{x:term('photosyntheticPigment')}), correct:term('chlorophyll'),
          wrongs:[term('haemoglobin'),term('protein'),term('hormone')] }),
  d => ({ q:t('knownAs',{x:term('oxygenCarrier')}), correct:term('haemoglobin'),
          wrongs:[term('chlorophyll'),term('enzyme'),term('hormone')] }),
  d => ({ q:t('knownAs',{x:term('nervousUnit')}), correct:term('neuron'),
          wrongs:[term('cell'),term('gene'),term('enzyme')] }),
  d => ({ q:t('whichIsNot',{x:term('cellOrganelle')}),
          correct:term(P(['protein','hormone','enzyme'])),
          wrongs:pickN(['mitochondria','ribosome','nucleus','chloroplast'],3).map(term) }),
  d => ({ q:t('knownAs',{x:term('fatherOfGenetics')}), correct:term('mendel'),
          wrongs:[term('darwin'),term('newton'),term('einstein')] }),
  d => ({ q:t('knownAs',{x:term('theoryOfEvolution')}), correct:term('darwin'),
          wrongs:[term('mendel'),term('newton'),term('einstein')] }),
  d => ({ q:t('whichIsNot',{x:term('livingKingdom')}), correct:term('mineralia'),
          wrongs:pickN(['monera','protista','fungi'],3).map(term) }),
  d => ({ q:t('knownAs',{x:term('largestGland')}),
          correct:'Liver', wrongs:['Pancreas','Thyroid','Spleen'] }),
  d => ({ q:t('whichIsNot',{x:term('digestiveSystemPart')}),
          correct:'Trachea', wrongs:['Oesophagus','Stomach','Duodenum'] })
];

/* ---------------------- COMPUTER SCIENCE ---------------------- */
const CS = [
  d => { const n=R(5,60);
         return { q:t('binaryOf',{x:n}), correct:n.toString(2),
                  wrongs:[(n+1).toString(2), (n-1).toString(2), (n+2).toString(2)] }; },
  d => { const e=P(COMPLEXITY);
         return { q:t('complexityOf',{x:e[0]}), correct:e[1],
                  wrongs:pickN(['O(1)','O(n)','O(log n)','O(n²)','O(n log n)','O(2ⁿ)']
                                 .filter(x=>x!==e[1]),3) }; },
  d => { const c=P([['5 + 3','8'],['10 % 3','1'],['2 ** 3','8'],['7 // 2','3'],
                    ['len("exam")','4'],['int("42") + 8','50'],['"ab" * 3','ababab'],
                    ['5 > 3','True'],['bool(0)','False']]);
         return { q:t('outputOf',{x:c[0]}), correct:c[1],
                  wrongs:pickN(['0','1','2','3','4','5','6','7','8','9','10','42','50',
                                'True','False','ababab','None'],3) }; },
  d => ({ q:t('whichIsNot',{x:term('programmingLanguage')}), correct:'HTTP',
          wrongs:['Python','Java','C++'] }),
  d => ({ q:t('whichIsNot',{x:term('linearDataStructure')}), correct:term('tree'),
          wrongs:pickN(['array','stack','queue','linkedList'],3).map(term) }),
  d => ({ q:t('knownAs',{x:term('errorFixing')}), correct:term('debugging'),
          wrongs:['Compiling','Linking','Encoding'] }),
  d => ({ q:t('studyOf',{x:term('algorithmStudy')}), correct:term('algorithm'),
          wrongs:[term('database'),term('compiler'),term('binarySearch')] }),
  d => { const n=R(2,9);
         return { q:t('whatIsValueOf',{x:`2^${n}`}), correct:Math.pow(2,n),
                  wrongs:[Math.pow(2,n)+2, Math.pow(2,n)-2, n*2] }; },
  d => ({ q:t('knownAs',{x:term('fatherOfComputer')}), correct:term('babbage'),
          wrongs:['Alan Turing','John von Neumann','Bill Gates'] }),
  d => ({ q:t('whichIsNot',{x:term('operatingSystem')}), correct:'Oracle',
          wrongs:['Linux','Windows','macOS'] }),
  d => ({ q:t('whichIsNot',{x:term('databaseKey')}), correct:'Loop key',
          wrongs:['Primary key','Foreign key','Candidate key'] }),
  d => { const n=R(3,12);
         return { q:t('whatIsValueOf',{x:`${n} × ${n} − ${n}`}), correct:n*n-n,
                  wrongs:[n*n, n*n+n, n*n-n-1] }; }
];

/* --------------------------- ENGLISH --------------------------- */
const ENGLISH = [
  d => { const s=P(SYNONYMS);
         return { q:t('synonymOf',{w:s[0]}), correct:s[1],
                  wrongs:pickN([s[2],'unclear','ordinary','distant','narrow','heavy'],3) }; },
  d => { const s=P(ANTONYMS);
         return { q:t('antonymOf',{w:s[0]}), correct:s[1],
                  wrongs:pickN([s[2],'silent','rapid','gentle','narrow','bright'],3) }; },
  d => { const s=P(PLURALS);
         return { q:t('pluralOf',{w:s[0]}), correct:s[1],
                  wrongs:[s[2], s[0]+'es', s[0]+'s'] }; },
  d => { const s=P(PAST_TENSE);
         return { q:t('pastOf',{w:s[0]}), correct:s[1],
                  wrongs:[s[2], s[0]+'ed', s[0]+'d'] }; },
  d => { const s=P(SPELLINGS);
         return { q:t('correctSpelling'), correct:s[0],
                  wrongs:pickN(SPELLINGS.filter(x=>x[0]!==s[0]).map(x=>x[1]),3) }; },
  d => ({ q:t('whoWrote',{x:'"Romeo and Juliet"'}), correct:term('shakespeare'),
          wrongs:[term('tagore'),term('newton'),term('darwin')] }),
  d => ({ q:t('whoWrote',{x:'"Gitanjali"'}), correct:term('tagore'),
          wrongs:[term('shakespeare'),term('gandhi'),term('aryabhata')] }),
  d => ({ q:t('whichIsNot',{x:term('partOfSpeech')}), correct:'Syllable',
          wrongs:['Noun','Verb','Adjective'] }),
  d => ({ q:t('studyOf',{x:'the structure of sentences'}), correct:term('syntax'),
          wrongs:['Phonetics','Semantics','Morphology'] }),
  d => ({ q:t('whichIsNot',{x:'a figure of speech'}), correct:'Paragraph',
          wrongs:['Simile','Metaphor','Personification'] }),
  d => ({ q:t('whichIsNot',{x:term('punctuationMark')}), correct:'Syllable',
          wrongs:['Comma','Semicolon','Apostrophe'] }),
  d => { const s=P(SYNONYMS);
         return { q:t('synonymOf',{w:s[0]}), correct:s[1],
                  wrongs:pickN([s[2],'vacant','fragile','hollow','bitter'],3) }; }
];

/* ------------------------ SOCIAL SCIENCE ------------------------ */
const SOCIAL = [
  d => { const c=P(CAPITALS);
         const others = CAPITALS.filter(x=>x[1]!==c[1]).map(x=>x[1]);
         return { q:t('capitalOf',{x:capName(c[0])}), correct:capName(c[1]),
                  wrongs:pickN(others,3).map(capName) }; },
  d => ({ q:t('knownAs',{x:term('fatherOfNation')}), correct:term('gandhi'),
          wrongs:[term('tagore'),term('newton'),term('aryabhata')] }),
  d => ({ q:t('yearOf',{x:term('independence')}), correct:'1947',
          wrongs:['1942','1950','1930'] }),
  d => ({ q:t('yearOf',{x:term('worldWarTwo')}), correct:'1939–1945',
          wrongs:['1914–1918','1920–1925','1950–1955'] }),
  d => ({ q:t('whichIsNot',{x:term('fundamentalRight')}), correct:'Right to Property',
          wrongs:['Right to Equality','Right to Freedom','Right to Education'] }),
  d => ({ q:t('whichIsNot',{x:term('branchOfGovernment')}), correct:'Press',
          wrongs:[term('parliament'),term('judiciary'),term('executive')] }),
  d => ({ q:t('studyOf',{x:term('humanSociety')}), correct:term('sociology'),
          wrongs:[term('psychology'),term('philosophy'),term('economics')] }),
  d => ({ q:t('studyOf',{x:term('mindBehaviour')}), correct:term('psychology'),
          wrongs:[term('sociology'),term('philosophy'),term('ethics')] }),
  d => ({ q:t('whichIsNot',{x:term('formOfGovernment')}), correct:term('gravity'),
          wrongs:[term('democracy'),'Monarchy','Republic'] }),
  d => ({ q:t('studyOf',{x:term('goodsProduction')}), correct:term('economics'),
          wrongs:[term('sociology'),term('ethics'),term('philosophy')] }),
  d => ({ q:t('whichIsNot',{x:term('earthLayer')}), correct:'Stratosphere',
          wrongs:['Crust','Mantle','Core'] }),
  d => ({ q:t('whichIsNot',{x:term('continent')}), correct:'Greenland',
          wrongs:['Asia','Africa','Europe'] }),
  d => ({ q:t('whichIsNot',{x:term('planetOfSolarSystem')}), correct:'Moon',
          wrongs:['Mars','Venus','Jupiter'] }),
  d => ({ q:t('yearOf',{x:term('frenchRevolution')}), correct:'1789',
          wrongs:['1776','1815','1848'] })
];

/* -------------------------- COMMERCE -------------------------- */
const COMMERCE = [
  d => { const p=R(1000,20000), r=R(2,12), tt=R(1,5);
         return { q:t('whatIsValueOf',{x:`${p} × (1 + ${r}/100)^${tt}`}),
                  correct:fmt(Math.round(p*Math.pow(1+r/100,tt))),
                  wrongs:[fmt(Math.round(p*(1+r*tt/100))), fmt(p+r*tt), fmt(Math.round(p*1.2))] }; },
  d => { const c=R(100,900), s=R(120,1200), base=s-c;
         return { q:t('whatIsPercentOf',{a:18,b:base}), correct:Math.round(base*18/100),
                  wrongs:[Math.round(base*10/100), Math.round(base*20/100), Math.round(base*28/100)] }; },
  d => { const n=R(2,20);
         return { q:t('whatIsValueOf',{x:`${n}² − ${n}`}), correct:n*n-n,
                  wrongs:[n*n, n*n+n, n*(n+1)] }; },
  d => { const p=R(500,5000), r=R(5,15), tt=R(2,6);
         return { q:t('simpleInterest',{p,r,t:tt}), correct:fmt(p*r*tt/100),
                  wrongs:[fmt(p*r*tt/200), fmt(p*r/100), fmt(p*r*tt/50)] }; },
  d => { const n=R(10,50);
         return { q:t('whatIsPercentOf',{a:20,b:n}), correct:fmt(n*0.2),
                  wrongs:[fmt(n*0.1), fmt(n*0.4), fmt(n*0.25)] }; },
  d => ({ q:t('whichIsNot',{x:term('currentAsset')}), correct:term('building'),
          wrongs:[term('cash'),term('inventory'),term('debtors')] }),
  d => ({ q:t('whichIsNot',{x:term('financialStatement')}), correct:'Balance Scorecard',
          wrongs:['Balance Sheet','Profit & Loss Account','Cash Flow Statement'] }),
  d => ({ q:t('knownAs',{x:term('capitalExcess')}), correct:term('capital'),
          wrongs:[term('liabilities'),'Drawings','Revenue'] }),
  d => ({ q:t('whichIsNot',{x:term('managementFunction')}), correct:'Auditing',
          wrongs:['Planning','Organising','Controlling'] }),
  d => ({ q:t('whichIsNot',{x:term('businessFinance')}), correct:'Depreciation',
          wrongs:['Equity shares','Debentures','Bank loan'] }),
  d => ({ q:t('studyOf',{x:term('financeStudy')}), correct:term('finance'),
          wrongs:['Marketing','Accounting',term('economics')] }),
  d => ({ q:t('whichIsNot',{x:term('businessOrganisation')}), correct:'Timetable',
          wrongs:['Partnership','Sole proprietorship','Company'] })
];

/* -------------------------- RESEARCH -------------------------- */
const RESEARCH = [
  d => ({ q:t('studyOf',{x:term('numericalData')}), correct:term('statistics'),
          wrongs:[term('psychology'),term('ethics'),term('philosophy')] }),
  d => ({ q:t('whichIsNot',{x:term('centralTendency')}), correct:'Standard deviation',
          wrongs:['Mean','Median','Mode'] }),
  d => { const n=Array.from({length:5},()=>R(2,20)), m=n.reduce((a,b)=>a+b,0)/5;
         return { q:t('meanOf',{a:n[0],b:n[1],c:n[2],d:n[3],e:n[4]}), correct:fmt(m),
                  wrongs:[fmt(m+1), fmt(m-1), fmt(m*2)] }; },
  d => ({ q:t('whichIsNot',{x:term('samplingTechnique')}), correct:'Snowball sampling',
          wrongs:['Simple random sampling','Stratified sampling','Cluster sampling'] }),
  d => ({ q:t('knownAs',{x:term('testableStatement')}),
          correct:term('hypothesis'), wrongs:['Conclusion','Variable','Sample'] }),
  d => ({ q:t('whichIsNot',{x:term('researchEthics')}), correct:'Fabrication',
          wrongs:['Informed consent','Confidentiality','Beneficence'] }),
  d => { const a=R(2,12), b=R(2,12);
         return { q:t('whatIsValueOf',{x:`${a}³ − ${b}³`}), correct:a**3-b**3,
                  wrongs:[a**3+b**3, (a-b)**3, a**3-b**2] }; },
  d => ({ q:t('studyOf',{x:term('natureOfKnowledge')}), correct:term('epistemology'),
          wrongs:['Ontology','Axiology','Logic'] }),
  d => ({ q:t('whichIsNot',{x:term('researchDesign')}), correct:'Poster design',
          wrongs:['Experimental','Descriptive','Exploratory'] }),
  d => { const n=R(5,50);
         return { q:t('whatIsPercentOf',{a:25,b:n}), correct:fmt(n/4),
                  wrongs:[fmt(n/2), fmt(n/5), fmt(n/3)] }; },
  d => ({ q:t('whichIsNot',{x:term('measurementLevel')}), correct:'Circular',
          wrongs:['Nominal','Ordinal','Interval'] }),
  d => ({ q:t('knownAs',{x:term('entireGroup')}), correct:term('population'),
          wrongs:['Sample','Statistic','Parameter'] })
];

/* ------------------------- ENGINEERING ------------------------- */
const ENGINEERING = [
  d => { const m=R(3,20), a=R(3,12), F=m*a;
         return { q:t('forceFromMA',{m,a}), correct:`${F} N`,
                  wrongs:[`${F+m} N`, `${F*2} N`, `${fmt(F/2)} N`] }; },
  d => { const a=R(3,20), b=R(3,20);
         return { q:t('seriesResistance',{a,b}), correct:`${a+b} Ω`,
                  wrongs:[`${fmt(a*b/(a+b))} Ω`, `${Math.abs(a-b)} Ω`, `${a*b} Ω`] }; },
  d => { const i=R(3,10), v=R(3,40), Pw=i*v;
         return { q:t('powerFromVI',{i,v}), correct:`${Pw} W`,
                  wrongs:[`${Pw+i} W`, `${fmt(v/i)} W`, `${Pw*2} W`] }; },
  d => { const n=R(2,8);
         return { q:t('differentiate',{f:`x^${n}`}), correct:`${n}x^${n-1}`,
                  wrongs:[`${n}x^${n+1}`, `x^${n}`, `${n-1}x^${n-1}`] }; },
  d => { const m=R(2,20), v=R(3,15), K=0.5*m*v*v;
         return { q:t('keFromMV',{m,v}), correct:`${fmt(K)} J`,
                  wrongs:[`${m*v*v} J`, `${m*v} J`, `${fmt(0.5*m*v)} J`] }; },
  d => { const n=R(3,12);
         return { q:t('whatIsValueOf',{x:`${n} × ${n} + ${n}`}), correct:n*n+n,
                  wrongs:[n*n, n*n-n, n*(n+2)] }; },
  d => { const r=R(3,15), i=R(3,8), V=r*i;
         return { q:t('ohmsLaw',{r,i}), correct:`${V} V`,
                  wrongs:[`${fmt(r/i)} V`, `${V+r} V`, `${V*2} V`] }; },
  d => ({ q:t('whichIsNot',{x:term('engineeringMaterial')}), correct:term('algorithm'),
          wrongs:['Steel','Aluminium','Polymer'] }),
  d => ({ q:t('whichIsNot',{x:term('thermodynamicsLaw')}), correct:"Newton's third law",
          wrongs:['Zeroth law','First law','Second law'] }),
  d => ({ q:t('studyOf',{x:term('materialBehaviour')}), correct:'Mechanics of materials',
          wrongs:['Thermodynamics','Electromagnetism','Optics'] }),
  d => ({ q:t('whichIsNot',{x:term('logicGate')}), correct:'Transformer',
          wrongs:['AND','OR','NOT'] }),
  d => ({ q:t('whichIsNot',{x:term('electricalQuantity')}), correct:'Enthalpy',
          wrongs:['Voltage','Current','Resistance'] })
];

/* --------------------------- MEDICINE --------------------------- */
const MEDICINE = [
  d => ({ q:t('knownAs',{x:term('powerhouseOfCell')}), correct:term('mitochondria'),
          wrongs:[term('nucleus'),term('ribosome'),term('lysosome')] }),
  d => ({ q:t('knownAs',{x:term('oxygenCarrier')}), correct:term('haemoglobin'),
          wrongs:[term('chlorophyll'),term('enzyme'),term('hormone')] }),
  d => ({ q:t('whichIsNot',{x:term('bloodCell')}), correct:term('neuron'),
          wrongs:['Red blood cell','White blood cell','Platelet'] }),
  d => ({ q:t('whichIsNot',{x:term('vitalOrgan')}), correct:'Appendix',
          wrongs:['Heart','Lung','Kidney'] }),
  d => ({ q:t('knownAs',{x:term('nervousUnit')}), correct:term('neuron'),
          wrongs:[term('cell'),term('gene'),term('hormone')] }),
  d => ({ q:t('whichIsNot',{x:term('bloodComponent')}), correct:term('chlorophyll'),
          wrongs:['Plasma','Platelets','Red blood cells'] }),
  d => ({ q:t('whichIsNot',{x:term('vitamin')}), correct:'Calcium',
          wrongs:['Vitamin A','Vitamin C','Vitamin K'] }),
  d => ({ q:t('knownAs',{x:term('largestOrgan')}), correct:term('skin'),
          wrongs:[term('nucleus'),term('cell'),term('protein')] }),
  d => ({ q:t('whichIsNot',{x:term('respiratorySystem')}), correct:'Liver',
          wrongs:['Trachea','Bronchus','Alveolus'] }),
  d => ({ q:t('knownAs',{x:term('antigen')}), correct:term('antigenShort'),
          wrongs:[term('enzyme'),term('hormone'),term('protein')] }),
  d => ({ q:t('whichIsNot',{x:term('muscleTissue')}), correct:'Epithelial tissue',
          wrongs:['Skeletal muscle','Smooth muscle','Cardiac muscle'] }),
  d => ({ q:t('whichIsNot',{x:term('inflammation')}), correct:'Anaesthesia',
          wrongs:['Redness','Swelling','Pain'] }),
  d => ({ q:t('whichIsNot',{x:term('heartChamber')}), correct:'Medulla',
          wrongs:['Atrium','Ventricle','Aorta'] })
];

/* -------------------- GENERAL SCIENCE (8–10) -------------------- */
const GENERAL = [
  ...PHYSICS.slice(0, 4),
  ...CHEMISTRY.slice(0, 4),
  ...BIOLOGY.slice(0, 5),
  ...MATH.slice(0, 3),
  d => ({ q:t('knownAs',{x:term('forcePullsEarth')}),
          correct:term('gravity'), wrongs:[term('friction'),term('inertia'),term('power')] }),
  d => ({ q:t('knownAs',{x:term('plantsMakeFood')}),
          correct:term('photosynthesis'), wrongs:[term('respiration'),term('osmosis'),term('mitosis')] }),
  d => ({ q:t('knownAs',{x:term('liquidSemiPermeable')}),
          correct:term('osmosis'), wrongs:[term('photosynthesis'),term('oxidation'),term('mitosis')] })
];

/* ---------------------------- BANKS ---------------------------- */
const BANKS = {
  math: MATH,
  physics: PHYSICS,
  chemistry: CHEMISTRY,
  biology: BIOLOGY,
  cs: CS,
  english: ENGLISH,
  social: SOCIAL,
  commerce: COMMERCE,
  research: RESEARCH,
  engineering: ENGINEERING,
  medicine: MEDICINE,
  general: GENERAL
};