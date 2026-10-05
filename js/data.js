'use strict';

/* ============================================================
   Subject names — order: [en, hi, bn, ur, es, fr]
============================================================ */
const SUBJ = {
  mathematics:['Mathematics','गणित','গণিত','ریاضی','Matemáticas','Mathématiques'],
  physics:['Physics','भौतिक विज्ञान','পদার্থবিজ্ঞান','طبیعیات','Física','Physique'],
  chemistry:['Chemistry','रसायन विज्ञान','রসায়ন বিজ্ঞান','کیمیا','Química','Chimie'],
  biology:['Biology','जीव विज्ञान','জীববিজ্ঞান','حیاتیات','Biología','Biologie'],
  science:['Science','विज्ञान','বিজ্ঞান','سائنس','Ciencias','Sciences'],
  english:['English','अंग्रेज़ी','ইংরেজি','انگریزی','Inglés','Anglais'],
  socialScience:['Social Science','सामाजिक विज्ञान','সমাজবিজ্ঞান','سماجی علوم','Ciencias Sociales','Sciences sociales'],
  computerScience:['Computer Science','कंप्यूटर विज्ञान','কম্পিউটার বিজ্ঞান','کمپیوٹر سائنس','Informática','Informatique'],
  it:['Information Technology','सूचना प्रौद्योगिकी','তথ্য প্রযুক্তি','انفارمیشن ٹیکنالوجی','Tecnologías de la Información','Technologies de l\'information'],
  accountancy:['Accountancy','लेखाशास्त्र','হিসাববিজ্ঞান','حسابداری','Contabilidad','Comptabilité'],
  businessStudies:['Business Studies','व्यवसाय अध्ययन','ব্যবসায় শিক্ষা','بزنس اسٹڈیز','Estudios Empresariales','Études commerciales'],
  economics:['Economics','अर्थशास्त्र','অর্থনীতি','معاشیات','Economía','Économie'],
  history:['History','इतिहास','ইতিহাস','تاریخ','Historia','Histoire'],
  geography:['Geography','भूगोल','ভূগোল','جغرافیہ','Geografía','Géographie'],
  politicalScience:['Political Science','राजनीति विज्ञान','রাষ্ট্রবিজ্ঞান','علم سیاست','Ciencias Políticas','Sciences politiques'],
  psychology:['Psychology','मनोविज्ञान','মনোবিজ্ঞান','نفسیات','Psicología','Psychologie'],
  sociology:['Sociology','समाजशास्त्र','সমাজবিজ্ঞান','عمرانیات','Sociología','Sociologie'],
  philosophy:['Philosophy','दर्शनशास्त्र','দর্শন','فلسفہ','Filosofía','Philosophie'],
  environmentalScience:['Environmental Science','पर्यावरण विज्ञान','পরিবেশ বিজ্ঞান','ماحولیاتی سائنس','Ciencias Ambientales','Sciences de l\'environnement'],
  statistics:['Statistics','सांख्यिकी','পরিসংখ্যান','شماریات','Estadística','Statistiques'],
  engineeringMathematics:['Engineering Mathematics','अभियांत्रिकी गणित','ইঞ্জিনিয়ারিং গণিত','انجینئرنگ ریاضی','Matemáticas de Ingeniería','Mathématiques de l\'ingénieur'],
  engineeringPhysics:['Engineering Physics','अभियांत्रिकी भौतिकी','ইঞ্জিনিয়ারিং পদার্থবিজ্ঞান','انجینئرنگ فزکس','Física de Ingeniería','Physique de l\'ingénieur'],
  management:['Management','प्रबंधन','ব্যবস্থাপনা','انتظامیہ','Gestión','Gestion'],
  law:['Law','विधि','আইন','قانون','Derecho','Droit'],
  medicine:['Medicine','चिकित्सा','চিকিৎসা','طب','Medicina','Médecine'],
  anatomy:['Anatomy','शरीर रचना विज्ञान','শারীরস্থান','تشریح','Anatomía','Anatomie'],
  dataScience:['Data Science','डेटा विज्ञान','ডেটা সায়েন্স','ڈیٹا سائنس','Ciencia de Datos','Science des données'],
  researchMethodology:['Research Methodology','शोध पद्धति','গবেষণা পদ্ধতি','تحقیقی طریقہ کار','Metodología de la Investigación','Méthodologie de la recherche'],
  biotechnology:['Biotechnology','जैव प्रौद्योगिकी','জৈবপ্রযুক্তি','حیاتیاتی ٹیکنالوجی','Biotecnología','Biotechnologie'],
  organicChemistry:['Organic Chemistry','कार्बनिक रसायन','জৈব রসায়ন','نامیاتی کیمیا','Química Orgánica','Chimie organique'],
  astrophysics:['Astrophysics','खगोल भौतिकी','জ্যোতিঃপদার্থবিজ্ঞান','فلکی طبیعیات','Astrofísica','Astrophysique'],
  finance:['Finance','वित्त','অর্থসংস্থান','مالیات','Finanzas','Finance'],
  ethics:['Ethics','नैतिकता','নীতিশাস্ত্র','اخلاقیات','Ética','Éthique'],
  microbiology:['Microbiology','सूक्ष्मजीव विज्ञान','অণুজীববিজ্ঞান','خرد حیاتیات','Microbiología','Microbiologie'],
  constitutionalLaw:['Constitutional Law','संवैधानिक विधि','সাংবিধানিক আইন','آئینی قانون','Derecho Constitucional','Droit constitutionnel'],
  clinicalMedicine:['Clinical Medicine','नैदानिक चिकित्सा','ক্লিনিক্যাল মেডিসিন','طبی معالجہ','Medicina Clínica','Médecine clinique'],
  cognitiveScience:['Cognitive Science','संज्ञानात्मक विज्ञान','জ্ঞানভিত্তিক বিজ্ঞান','علمِ ادراک','Ciencia Cognitiva','Sciences cognitives'],
  advancedStatistics:['Advanced Statistics','उच्च सांख्यिकी','উচ্চতর পরিসংখ্যান','اعلیٰ شماریات','Estadística Avanzada','Statistiques avancées'],
  scientificWriting:['Scientific Writing','वैज्ञानिक लेखन','বৈজ্ঞানিক লেখন','سائنسی تحریر','Escritura Científica','Rédaction scientifique'],
  researchEthics:['Research Ethics','शोध नैतिकता','গবেষণা নীতিশাস্ত্র','تحقیقی اخلاقیات','Ética de la Investigación','Éthique de la recherche'],

  /* ---------- Tally ERP 9 (fixed-bank subjects) ---------- */
  tallyBasics:['Tally – Basics & Vouchers',
    'टैली – मूल बातें और वाउचर',
    'ট্যালি – বেসিক ও ভাউচার',
    'ٹیلی – بنیادی باتیں اور واؤچر',
    'Tally – Básico y Comprobantes',
    'Tally – Bases et Vouchers'],
  tallyConfig:['Tally – Company, Ledger & GST',
    'टैली – कंपनी, लेजर और जीएसटी',
    'ট্যালি – কোম্পানি, লেজার ও জিএসটি',
    'ٹیلی – کمپنی، لیجر اور جی ایس ٹی',
    'Tally – Empresa, Mayor y GST',
    'Tally – Société, Grand Livre et GST'],
  tallyJournal:['Tally – Shortcuts & Journal Entries',
    'टैली – शॉर्टकट और जर्नल प्रविष्टियाँ',
    'ট্যালি – শর্টকাট ও জার্নাল এন্ট্রি',
    'ٹیلی – شارٹ کٹ اور جرنل انٹریز',
    'Tally – Atajos y Asientos de Diario',
    'Tally – Raccourcis et Écritures de Journal']
};

function sname(key){
  const e = SUBJ[key];
  return e ? (e[idx()] || e[0]) : key;
}

/* ============================================================
   Levels → subjects
   Each subject: [displayKey, bankKey, icon]
   bankKey starting with "tally" refers to FIXED_BANKS in questions.js
============================================================ */
const LEVELS = [
  /* ---------- Tally ERP 9 (PDF question bank) ---------- */
  { id:'tally', name:['Tally ERP 9','टैली ईआरपी 9','ট্যালি ইআরপি ৯','ٹیلی ای آر پی ۹','Tally ERP 9','Tally ERP 9'],
    d:1, icon:'📊',
    subjects:[
      ['tallyBasics','tally1','📘'],
      ['tallyConfig','tally2','📗'],
      ['tallyJournal','tally3','📕']
    ]},

  { id:'c8', name:['Class 8','कक्षा 8','অষ্টম শ্রেণি','آٹھویں جماعت','8.º grado','8e année'],
    d:1, icon:'🎒',
    subjects:[
      ['mathematics','math','🔢'],['science','general','🔬'],['english','english','📖'],
      ['socialScience','social','🌏'],['computerScience','cs','💻']
    ]},
  { id:'c9', name:['Class 9','कक्षा 9','নবম শ্রেণি','نویں جماعت','9.º grado','9e année'],
    d:2, icon:'📘',
    subjects:[
      ['mathematics','math','🔢'],['science','general','🔬'],['english','english','📖'],
      ['socialScience','social','🌏'],['it','cs','💻']
    ]},
  { id:'c10', name:['Class 10','कक्षा 10','দশম শ্রেণি','دسویں جماعت','10.º grado','10e année'],
    d:3, icon:'🎓',
    subjects:[
      ['mathematics','math','🔢'],['science','general','🔬'],['english','english','📖'],
      ['socialScience','social','🌏'],['it','cs','💻']
    ]},
  { id:'c11', name:['Class 11','कक्षा 11','একাদশ শ্রেণি','گیارہویں جماعت','11.º grado','11e année'],
    d:4, icon:'📗',
    subjects:[
      ['physics','physics','⚛️'],['chemistry','chemistry','🧪'],['biology','biology','🧬'],
      ['mathematics','math','🔢'],['english','english','📖'],['accountancy','commerce','📊'],
      ['businessStudies','commerce','💼'],['economics','commerce','📈'],['computerScience','cs','💻'],
      ['history','social','🏛️'],['geography','social','🗺️'],['politicalScience','social','⚖️'],
      ['psychology','research','🧠']
    ]},
  { id:'c12', name:['Class 12','कक्षा 12','দ্বাদশ শ্রেণি','بارہویں جماعت','12.º grado','12e année'],
    d:5, icon:'📕',
    subjects:[
      ['physics','physics','⚛️'],['chemistry','chemistry','🧪'],['biology','biology','🧬'],
      ['mathematics','math','🔢'],['english','english','📖'],['accountancy','commerce','📊'],
      ['businessStudies','commerce','💼'],['economics','commerce','📈'],['computerScience','cs','💻'],
      ['history','social','🏛️'],['geography','social','🗺️'],['politicalScience','social','⚖️'],
      ['psychology','research','🧠'],['environmentalScience','biology','🌱']
    ]},
  { id:'ug', name:['Undergraduate','स्नातक','স্নাতক','انڈرگریجویٹ','Grado','Licence'],
    d:6, icon:'🏫',
    subjects:[
      ['engineeringMathematics','math','📐'],['engineeringPhysics','engineering','⚙️'],
      ['organicChemistry','chemistry','🧪'],['biotechnology','biology','🧬'],
      ['computerScience','cs','💻'],['dataScience','cs','🤖'],
      ['economics','commerce','📈'],['management','commerce','💼'],['finance','commerce','💰'],
      ['law','social','⚖️'],['medicine','medicine','🩺'],['anatomy','medicine','🫀'],
      ['psychology','research','🧠'],['statistics','research','📊'],
      ['politicalScience','social','🏛️'],['history','social','📜'],
      ['english','english','📚'],['philosophy','research','🕯️']
    ]},
  { id:'pg', name:['Postgraduate','स्नातकोत्तर','স্নাতকোত্তর','پوسٹ گریجویٹ','Posgrado','Master'],
    d:7, icon:'🎖️',
    subjects:[
      ['advancedStatistics','research','📊'],['astrophysics','physics','🌌'],
      ['organicChemistry','chemistry','🧪'],['microbiology','biology','🦠'],
      ['dataScience','cs','🤖'],['economics','commerce','📈'],['finance','commerce','💰'],
      ['constitutionalLaw','social','⚖️'],['clinicalMedicine','medicine','🩺'],
      ['cognitiveScience','research','🧠'],['philosophy','research','🕯️'],
      ['environmentalScience','biology','🌱']
    ]},
  { id:'phd', name:['PhD / Doctorate','पीएचडी / डॉक्टरेट','পিএইচডি / ডক্টরেট','پی ایچ ڈی / ڈاکٹریٹ','Doctorado','Doctorat'],
    d:8, icon:'🔬',
    subjects:[
      ['researchMethodology','research','🧭'],['advancedStatistics','research','📊'],
      ['scientificWriting','research','✍️'],['researchEthics','research','🕊️'],
      ['dataScience','cs','🤖'],['philosophy','research','🕯️'],['astrophysics','physics','🌌']
    ]}
];

/* ============================================================
   Reference tables (unchanged)
============================================================ */
const ELEMENTS = {
  hydrogen:['H',1], oxygen:['O',8], carbon:['C',6], nitrogen:['N',7],
  sodium:['Na',11], chlorine:['Cl',17], iron:['Fe',26], copper:['Cu',29],
  gold:['Au',79], silver:['Ag',47], mercury:['Hg',80], helium:['He',2],
  neon:['Ne',10], argon:['Ar',18], calcium:['Ca',20], potassium:['K',19],
  magnesium:['Mg',12], zinc:['Zn',30], aluminium:['Al',13], silicon:['Si',14]
};
const ELEM_KEYS = Object.keys(ELEMENTS);

const FORMULAS = {
  water:'H₂O', carbonDioxide:'CO₂', methane:'CH₄', ammonia:'NH₃',
  sulphuricAcid:'H₂SO₄', hydrochloricAcid:'HCl',
  sodiumChloride:'NaCl', glucose:'C₆H₁₂O₆'
};
const MOLAR = {
  water:'18 g/mol', carbonDioxide:'44 g/mol', methane:'16 g/mol', ammonia:'17 g/mol',
  sulphuricAcid:'98 g/mol', hydrochloricAcid:'36.5 g/mol',
  sodiumChloride:'58.5 g/mol', glucose:'180 g/mol'
};
const UNIT_OF = {
  force:'newton', work:'joule', energy:'joule', power:'watt', pressure:'pascal',
  charge:'coulomb', frequency:'hertz', resistance:'ohm',
  current:'ampere', voltage:'volt', capacitance:'farad', magneticFlux:'weber'
};
const ALL_UNITS = ['newton','joule','watt','pascal','ampere','volt',
                   'ohm','coulomb','hertz','tesla','farad','weber'];
const BALANCED = [
  ['2H₂ + O₂ → 2H₂O', ['H₂ + O₂ → H₂O','H₂ + O₂ → 2H₂O','2H₂ + O₂ → H₂O']],
  ['2Na + Cl₂ → 2NaCl', ['Na + Cl₂ → NaCl','Na + Cl₂ → 2NaCl','2Na + Cl → 2NaCl']],
  ['C + O₂ → CO₂', ['C + O₂ → CO','C + O → CO₂','2C + O₂ → CO₂']],
  ['N₂ + 3H₂ → 2NH₃', ['N₂ + H₂ → NH₃','N₂ + 3H₂ → NH₄','N₂ + H₂ → 2NH₃']],
  ['2Mg + O₂ → 2MgO', ['Mg + O₂ → MgO','Mg + O₂ → 2MgO','2Mg + O₂ → MgO']],
  ['Zn + 2HCl → ZnCl₂ + H₂', ['Zn + HCl → ZnCl₂ + H₂','Zn + 2HCl → ZnCl + H₂','Zn + 2HCl → ZnCl₂ + 2H₂']]
];
const SYNONYMS = [
  ['happy','joyful','sad'],['quick','rapid','slow'],['brave','courageous','timid'],
  ['begin','commence','finish'],['big','huge','tiny'],['angry','furious','calm'],
  ['silent','quiet','noisy'],['difficult','arduous','easy'],['bright','luminous','dull'],
  ['honest','truthful','deceitful'],['ancient','antique','modern'],['calm','tranquil','agitated'],
  ['abundant','plentiful','scarce'],['clever','intelligent','foolish'],['rare','scarce','common'],
  ['strong','sturdy','weak'],['tiny','minute','huge'],['famous','renowned','obscure'],
  ['polite','courteous','rude'],['vacant','empty','occupied']
];
const ANTONYMS = [
  ['happy','sad','joyful'],['increase','decrease','expand'],['victory','defeat','triumph'],
  ['generous','stingy','kind'],['ancient','modern','old'],['brave','cowardly','bold'],
  ['transparent','opaque','clear'],['abundant','scarce','plenty'],['optimist','pessimist','hopeful'],
  ['arrive','depart','reach'],['accept','reject','receive'],['expand','contract','grow'],
  ['permanent','temporary','lasting'],['humble','arrogant','modest'],['praise','criticise','applaud'],
  ['flexible','rigid','supple'],['fertile','barren','productive'],['courage','fear','valour'],
  ['poverty','wealth','want'],['unity','division','harmony']
];
const PLURALS = [
  ['child','children','childs'],['mouse','mice','mouses'],['foot','feet','foots'],
  ['tooth','teeth','tooths'],['man','men','mans'],['woman','women','womans'],
  ['goose','geese','gooses'],['cactus','cacti','cactuses'],['crisis','crises','crisises'],
  ['datum','data','datums'],['ox','oxen','oxes'],['leaf','leaves','leafs'],
  ['knife','knives','knifes'],['hero','heroes','heros'],['potato','potatoes','potatos'],
  ['analysis','analyses','analysises'],['phenomenon','phenomena','phenomenons'],
  ['medium','media','mediums'],['index','indices','indexes'],['sheep','sheep','sheeps']
];
const PAST_TENSE = [
  ['go','went','goed'],['eat','ate','eated'],['write','wrote','writed'],
  ['run','ran','runned'],['take','took','taked'],['speak','spoke','speaked'],
  ['drink','drank','drinked'],['begin','began','beginned'],['bring','brought','bringed'],
  ['teach','taught','teached'],['buy','bought','buyed'],['catch','caught','catched'],
  ['choose','chose','choosed'],['drive','drove','drived'],['fly','flew','flied'],
  ['give','gave','gived'],['know','knew','knowed'],['ride','rode','rided'],
  ['sing','sang','singed'],['swim','swam','swimed']
];
const SPELLINGS = [
  ['receive','recieve'],['necessary','neccessary'],['separate','seperate'],
  ['definitely','definately'],['occurrence','occurence'],['accommodate','acommodate'],
  ['embarrass','embarass'],['rhythm','rythm'],['privilege','priviledge'],
  ['maintenance','maintainance'],['questionnaire','questionaire'],['millennium','millenium'],
  ['conscience','concience'],['committee','commitee'],['existence','existance'],
  ['independent','independant'],['recommend','recomend'],['successful','succesful']
];
const COMPLEXITY = [
  ['binary search','O(log n)'],['bubble sort','O(n²)'],['merge sort','O(n log n)'],
  ['linear search','O(n)'],['quick sort (average)','O(n log n)'],
  ['insertion sort','O(n²)'],['heap sort','O(n log n)'],
  ['accessing an array element','O(1)']
];
const CAPITALS = [
  ['india','delhi'],['france','paris'],['japan','tokyo'],['unitedKingdom','london'],
  ['china','beijing'],['russia','moscow'],['australia','canberra'],['canada','ottawa'],
  ['germany','berlin'],['italy','rome'],['spain','madrid'],['egypt','cairo']
];
const CAPITAL_NAMES = {
  india:['India','भारत','ভারত','بھارت','India','Inde'],
  france:['France','फ़्रांस','ফ্রান্স','فرانس','Francia','France'],
  japan:['Japan','जापान','জাপান','جاپان','Japón','Japon'],
  unitedKingdom:['the United Kingdom','यूनाइटेड किंगडम','যুক্তরাজ্য','برطانیہ','el Reino Unido','le Royaume-Uni'],
  china:['China','चीन','চীন','چین','China','Chine'],
  russia:['Russia','रूस','রাশিয়া','روس','Rusia','Russie'],
  australia:['Australia','ऑस्ट्रेलिया','অস্ট্রেলিয়া','آسٹریلیا','Australia','Australie'],
  canada:['Canada','कनाडा','কানাডা','کینیڈا','Canadá','Canada'],
  germany:['Germany','जर्मनी','জার্মানি','جرمنی','Alemania','Allemagne'],
  italy:['Italy','इटली','ইতালি','اٹلی','Italia','Italie'],
  spain:['Spain','स्पेन','স্পেন','اسپین','España','Espagne'],
  egypt:['Egypt','मिस्र','মিশর','مصر','Egipto','Égypte'],
  delhi:['New Delhi','नई दिल्ली','নয়াদিল্লি','نئی دہلی','Nueva Delhi','New Delhi'],
  paris:['Paris','पेरिस','প্যারিস','پیرس','París','Paris'],
  tokyo:['Tokyo','टोक्यो','টোকিও','ٹوکیو','Tokio','Tokyo'],
  london:['London','लंदन','লন্ডন','لندن','Londres','Londres'],
  beijing:['Beijing','बीजिंग','বেইজিং','بیجنگ','Pekín','Pékin'],
  moscow:['Moscow','मॉस्को','মস্কো','ماسکو','Moscú','Moscou'],
  canberra:['Canberra','कैनबरा','ক্যানবেরা','کینبرا','Canberra','Canberra'],
  ottawa:['Ottawa','ओटावा','অটোয়া','اوٹاوا','Ottawa','Ottawa'],
  berlin:['Berlin','बर्लिन','বার্লিন','برلن','Berlín','Berlin'],
  rome:['Rome','रोम','রোom','روم','Roma','Rome'],
  madrid:['Madrid','मैड्रिड','মাদ্রিদ','میڈرڈ','Madrid','Madrid'],
  cairo:['Cairo','काहिरा','কায়রো','قاہرہ','El Cairo','Le Caire']
};
function capName(k){ const e = CAPITAL_NAMES[k]; return e ? (e[idx()] || e[0]) : k; }