/**
 * JOGI AYURVED HEALTH QUIZ - SCRIPT
 * Production-ready vanilla JS logic for hospital awareness event quiz.
 */


document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === "U")
  ) e.preventDefault();
});



// ==========================================================================
// 1. UI TRANSLATIONS & CONSTANTS
// ==========================================================================

const UI_STRINGS = {
  gu: {
    headerTagline: "હોસ્પિટલ એન્ડ વેલનેસ",
    heroEyebrow: "JOGI AYURVED • હેલ્થ અવેરનેસ ઈવેન્ટ",
    heroHeadingPre: "How",
    swasthWord: "સ્વસ્થ",
    heroHeadingPost: "Are You?",
    heroIntro: "JOGI Ayurved પરંપરાગત આયુર્વેદિક પદ્ધતિઓ, સચોટ નિદાન અને વ્યક્તિગત દિનચર્યા દ્વારા સમગ્ર સ્વાસ્થ્ય અને કલ્યાણને પ્રોત્સાહન આપવા માટે કટિબદ્ધ છે.",
    hospitalTitle: "JOGI Ayurved હોસ્પિટલ",
    hospitalServices: "હોસ્પિટલ કેર • ડિજિટલ કેર • વેલનેસ એન્ડ પંચકર્મ",
    scrollHint: "શરૂ કરવા માટે નીચે ભાષા પસંદ કરો",
    langStepTag: "પગલું ૧",
    langSelectTitle: "તમારી ભાષા પસંદ કરો",
    langSelectSub: "SELECT YOUR LANGUAGE",
    quizStepTag: "પગલું ૨",
    quizMainTitle: "આયુર્વેદિક સ્વાસ્થ્ય મૂલ્યાંકન",
    quizMainSub: "તમારી રોજિંદી દિનચર્યાના આધારે તમામ ૧૩ પ્રશ્નોના જવાબ આપો.",
    progressLabel: "તમારી પ્રગતિ",
    progressCounterText: "{count} / ૧૩ ઉત્તર આપ્યા",
    validationText: "કૃપા કરીને સબમિટ કરતા પહેલા તમામ ૧૩ પ્રશ્નોના જવાબ આપો.",
    btnSubmitText: "ક્વિઝ સબમિટ કરો",
    loadingText: "તમારો સ્વાસ્થ્ય સ્કોર ગણાઈ રહ્યો છે...",
    resultBadge: "ક્વિઝ પૂર્ણ થઈ",
    resultTitle: "તમારો સ્વાસ્થ્ય સ્કોર",
    evalTitle: "સ્વાસ્થ્ય મૂલ્યાંકન",
    reviewMainTitle: "ઉત્તરોનું સમીક્ષા અને આયુર્વેદિક સલાહ",
    reviewSubTitle: "જુઓ કે તમારી દિનચર્યા આયુર્વેદના નિયમો સાથે કેટલી અનુકૂળ છે.",
    correctLabel: "સાચો જવાબ",
    wrongLabel: "ખોટો જવાબ",
    yourAnsLabel: "તમારો ઉત્તર:",
    correctAnsLabel: "શ્રેષ્ઠ આયુર્વેદિક પસંદગી:",
    btnRestartText: "ફરીથી પ્રયાસ કરો",
    footerCopy: "આયુર્વેદિક જાગૃતિ અને સર્વાંગી સ્વાસ્થ્યનો સંગમ"
  },
  hi: {
    headerTagline: "अस्पताल एवं वैलनेस",
    heroEyebrow: "JOGI AYURVED • स्वास्थ्य जागरूकता कार्यक्रम",
    heroHeadingPre: "आप कितने",
    swasthWord: "स्वस्थ",
    heroHeadingPost: "हैं?",
    heroIntro: "JOGI Ayurved पारंपरिक आयुर्वेदिक चिकित्सा, मूल-कारण उपचार और व्यक्तिगत दिनचर्या के माध्यम से समग्र स्वास्थ्य को बढ़ावा देने के लिए प्रतिबद्ध है।",
    hospitalTitle: "JOGI Ayurved अस्पताल",
    hospitalServices: "हॉस्पिटल केयर • डिजिटल केयर • वैलनेस एवं पंचकर्म",
    scrollHint: "शुरू करने के लिए नीचे भाषा चुनें",
    langStepTag: "चरण 1",
    langSelectTitle: "अपनी भाषा चुनें",
    langSelectSub: "SELECT YOUR LANGUAGE",
    quizStepTag: "चरण 2",
    quizMainTitle: "आयुर्वेदिक स्वास्थ्य मूल्यांकन",
    quizMainSub: "अपनी दैनिक दिनचर्या के आधार पर सभी 13 प्रश्नों के उत्तर दें।",
    progressLabel: "आपकी प्रगति",
    progressCounterText: "{count} / 13 उत्तर दिए",
    validationText: "कृपया सबमिट करने से पहले सभी 13 प्रश्नों के उत्तर दें।",
    btnSubmitText: "क्विज़ सबमिट करें",
    loadingText: "आपके स्वास्थ्य स्कोर की गणना की जा रही है...",
    resultBadge: "क्विज़ पूर्ण हुई",
    resultTitle: "आपका स्वास्थ्य स्कोर",
    evalTitle: "स्वास्थ्य मूल्यांकन",
    reviewMainTitle: "उत्तर समीक्षा एवं आयुर्वेदिक परामर्श",
    reviewSubTitle: "जानें कि आपकी जीवनशैली आयुर्वेदिक सिद्धांतों के कितने अनुरूप है।",
    correctLabel: "सही उत्तर",
    wrongLabel: "असंगत उत्तर",
    yourAnsLabel: "आपका उत्तर:",
    correctAnsLabel: "उत्तम आयुर्वेदिक विकल्प:",
    btnRestartText: "पुनः प्रयास करें",
    footerCopy: "आयुर्वेदिक जागरूकता एवं समग्र स्वास्थ्य संवर्धन"
  },
  en: {
    headerTagline: "HOSPITAL & WELLNESS",
    heroEyebrow: "JOGI AYURVED • HEALTH AWARENESS EVENT",
    heroHeadingPre: "How",
    swasthWord: "Healthy",
    heroHeadingPost: "Are You?",
    heroIntro: "JOGI Ayurved is dedicated to promoting holistic health and wellness through traditional Ayurveda practices, root-cause healing, and personalized lifestyle care.",
    hospitalTitle: "JOGI Ayurved Hospital",
    hospitalServices: "Hospital Care • Digital Care • Wellness & Panchakarma",
    scrollHint: "Choose language below to begin",
    langStepTag: "STEP 1",
    langSelectTitle: "SELECT YOUR LANGUAGE",
    langSelectSub: "Choose preferred language for the assessment",
    quizStepTag: "STEP 2",
    quizMainTitle: "Ayurvedic Health Assessment",
    quizMainSub: "Please answer all 13 questions thoughtfully based on your daily routine.",
    progressLabel: "Your Progress",
    progressCounterText: "{count} / 13 answered",
    validationText: "Please answer all 13 questions before submitting.",
    btnSubmitText: "SUBMIT QUIZ",
    loadingText: "Calculating your health score...",
    resultBadge: "QUIZ COMPLETED",
    resultTitle: "Your Health Score",
    evalTitle: "Swasthya Evaluation",
    reviewMainTitle: "Answer Review & Ayurvedic Wisdom",
    reviewSubTitle: "See how your daily habits compare with ideal Ayurvedic principles.",
    correctLabel: "Correct Choice",
    wrongLabel: "Needs Alignment",
    yourAnsLabel: "Your Answer:",
    correctAnsLabel: "Optimal Ayurvedic Choice:",
    btnRestartText: "TRY AGAIN",
    footerCopy: "Promoting Holistic Health & Ayurvedic Awareness"
  }
};

// ==========================================================================
// 2. QUESTION DATA BANK (13 QUESTIONS)
// ==========================================================================

const QUIZ_DATA = {
  gu: [
    {
      id: 1,
      question: "તમે દરરોજ કેટલા કલાક સૂઓ છો?",
      options: [
        "૭ - ૮ કલાક",
        "૯ - ૧૦ કલાક",
        "૬ કલાકથી ઓછી ઊંઘ"
      ],
      correct: 0,
      explanation: "રાત્રે ૭ થી ૮ કલાકની ગાઢ ઊંઘ લેવી સૌથી શ્રેષ્ઠ છે. તેનાથી બીજા દિવસ માટે નવી ઉર્જા મળે છે. ૬ કલાકથી ઓછી ઊંઘ લેવાથી સ્ટ્રેસ વધી શકે છે, જ્યારે ૯-૧૦ કલાક કરતાં વધારે ઊંઘ લેવાથી શરીરમાં આળસ અને કફ પ્રકોપ થાય છે."
    },
    {
      id: 2,
      question: "તમે દરરોજ કેટલી કસરત કરો છો?",
      options: [
        "૩૦ થી ૪૫ મિનિટ રોજ",
        "ક્યારેક અઠવાડિયામાં એકાદ વાર",
        "નથી કરતા"
      ],
      correct: 0,
      explanation: "પોતાના સ્વાસ્થ્યનું ધ્યાન રાખવા ૩૦-૪૫ મિનિટ રોજ કસરત કરવી ઉત્તમ છે. ૨૫ ની ઉંમર પછી નિયમિત કસરત ડાયાબિટીસ અને થાઈરોઈડ જેવા લાઈફસ્ટાઈલ રોગો પ્રિવેન્ટ કરવા અને શરીરની ઉર્જા જાળવવા અત્યંત જરૂરી છે."
    },
    {
      id: 3,
      question: "તમે સાંજનું ભોજન કેટલા વાગે કરો છો?",
      options: [
        "૬ થી ૭ ની વચ્ચે",
        "૮ થી ૯ ની વચ્ચે",
        "અનિયમિત સમય (ક્યારેક ૧૦ વાગ્યા પછી)"
      ],
      correct: 0,
      explanation: "સૂર્યાસ્ત પછી તરત ભોજન કરવું સૌથી શ્રેષ્ઠ છે. ૬ થી ૭ વાગ્યાનો સમય પાચનશક્તિ માટે સૌથી ઉત્તમ છે. સૂર્યાસ્ત પછી પાચનશક્તિ મંદ થતી હોવાથી મોડેથી ભોજન કરવાથી પાચન યોગ્ય રીતે થતું નથી."
    },
    {
      id: 4,
      question: "તમે રાત્રે કેટલા વાગે સૂવો છો?",
      options: [
        "૧૧ વાગ્યા પહેલા",
        "૧૨ વાગ્યે",
        "૧ વાગ્યા પછી"
      ],
      correct: 0,
      explanation: "૧૧:૦૦ વાગ્યા પહેલાં સૂઈ જવું શરીર માટે ખરેખર લાભદાયી છે. ૧૨:૦૦ વાગ્યા પછી મોડું સૂવાથી શરીરમાં વાત પ્રકોપ થાય છે, સ્લીપ સાયકલ ડિસ્ટર્બ થાય છે અને હોર્મોનલ ઈમ્બેલેન્સ ઊભું થાય છે."
    },
    {
      id: 5,
      question: "તમારો સ્ક્રીન ટાઈમ કેટલો છે?",
      options: [
        "૪ કલાકથી ઓછો",
        "૪ થી ૧૦ કલાક",
        "૧૦ થી વધુ કલાક"
      ],
      correct: 0,
      explanation: "૪ કલાકથી ઓછો સ્ક્રીન ટાઈમ હોવો આંખોના સ્વાસ્થ્ય માટે યોગ્ય છે. જો તમારો સ્ક્રીન ટાઈમ વધુ હોય તો આંખોની કાળજી માટે રોજ નેત્ર પ્રક્ષાલન કરવું હિતકારી છે."
    },
    {
      id: 6,
      question: "તમે દિવસમાં કેટલી વાર જમો છો?",
      options: [
        "૨ વાર (સવારે અને સાંજે નિયમિત)",
        "૪ થી વધુ વાર",
        "અનિયમિત સમય અને માત્રા"
      ],
      correct: 0,
      explanation: "દિવસમાં ૨ વાર સમતોલ ભોજન લેવું પાચન માટે ઉત્તમ છે. વધારે પડતું (૪ થી વધુ વાર) ખાવાથી શરીરમાં આળસ અને કફ વધે છે, જ્યારે અનિયમિત ખાવાથી ગેસ, એસિડિટી અને કબજિયાત થાય છે."
    },
    {
      id: 7,
      question: "દિવસમાં પાણી કેટલું પીવો છો?",
      options: [
        "તરસ લાગે ત્યારે યોગ્ય માત્રામાં",
        "૩ થી ૪ લીટર (જબરદસ્તી)",
        "યોગ્ય માત્રા કરતાં ઓછું"
      ],
      correct: 0,
      explanation: "આયુર્વેદ પ્રમાણે જ્યારે તરસ લાગે ત્યારે યોગ્ય માત્રામાં પાણી પીવું શ્રેષ્ઠ છે. જરૂર કરતાં વધુ પાણી પીવાથી જઠરાગ્નિ મંદ થાય છે અને સોજા આવી શકે છે, જ્યારે બહુ ઓછું પાણી પીવાથી કબજિયાત કે પથરી થઈ શકે છે."
    },
    {
      id: 8,
      question: "મહિનામાં તમે જંક ફૂડ કેટલી વાર ખાઓ છો?",
      options: [
        "મહિનામાં ૧ થી ૨ વાર",
        "અઠવાડિયામાં એકવાર",
        "મહિનામાં ૭ થી ૮ વાર"
      ],
      correct: 0,
      explanation: "વધારે પડતું જંક ફૂડ અને સ્પાઈસી ખોરાક સ્વાસ્થ્ય માટે હાનિકારક છે. તેનાથી ચયાપચય બગડે છે અને રોગો થાય છે, માટે બને ત્યાં સુધી ઘરનો તાજો આહાર પસંદ કરવો."
    },
    {
      id: 9,
      question: "તમારી ઊંઘ કેવી છે?",
      options: [
        "ગાઢ અને શાંત નિંદ્રા",
        "અવાજ થતાં તરત જ ઊઠી જવાય",
        "અનિંદ્રા (ઊંઘ ન આવવી)"
      ],
      correct: 0,
      explanation: "ગાઢ નિંદ્રા દર્શાવે છે કે મન શાંત છે. જો અવાજથી જાગી જવાતું હોય કે અનિંદ્રા રહેતી હોય તો તે મનમાં સતત વિચારો, સ્ટ્રેસ અને વાયુ પ્રકોપ દર્શાવે છે. રાત્રે વૈદ્યની સલાહ મુજબ નસ્ય કરવું હિતકારી છે."
    },
    {
      id: 10,
      question: "તમે જમ્યા પછી શું કરો છો?",
      options: [
        "થોડું હળવું ચાલો છો (૧૦૦ કદમ)",
        "એક જ જગ્યાએ બેસી રહો છો",
        "તરત સૂઈ જાઓ છો"
      ],
      correct: 0,
      explanation: "જમ્યાના ૩૦ મિનિટ પછી ૧૦૦ કદમ (શતપદી) હળવું ચાલવું પાચનમાં મદદ કરે છે. જમ્યા પછી તરત બેસી રહેવાથી કે સૂઈ જવાથી શરીરમાં કફ પ્રકોપ થાય છે અને આળસ વધે છે."
    },
    {
      id: 11,
      question: "તમે સવારે બ્રેકફાસ્ટ કરો છો?",
      options: [
        "હા, દરરોજ નિયમિત કરું છું",
        "ટાઈમ હોય ત્યારે જ કરું છું",
        "બ્રેકફાસ્ટ skip કરું છું"
      ],
      correct: 0,
      explanation: "સવારે નિયમિત હળવો નાસ્તો કરવો જોઈએ જેથી આખા દિવસ દરમિયાન ઊર્જા જળવાય. ૪ કલાકથી વધારે સમય ભૂખ્યા રહેવાથી શરીરમાં વાયુનો પ્રકોપ થાય છે."
    },
    {
      id: 12,
      question: "શું તમારું પેટ નિયમિતપણે સાફ થાય છે?",
      options: [
        "હા, સવારે સહજ રીતે સાફ થાય છે",
        "અનિયમિત રીતે સમય નક્કી હોતો નથી",
        "પેટ સાફ થયા બાદ સંતુષ્ટી હોતી નથી"
      ],
      correct: 0,
      explanation: "સવારે કોઈ પણ ઔષધિ વગર પેટ સાફ થવું ઉત્તમ સ્વાસ્થ્યની નિશાની છે ('સમ્યક મલપ્રવૃત્તિ'). અનિયમિતતા કે અસંતોષ મુખ્યત્વે વાત દોષના અસંતુલન અને અનિયમિત જીવનશૈલીને કારણે થાય છે."
    },
    {
      id: 13,
      question: "તમે ઉપવાસ કેટલી વાર કરો છો?",
      options: [
        "મહિનામાં ૧ થી ૨ વાર",
        "મહિનામાં ૩-૪ વાર કરતાં વધુ",
        "દર અઠવાડિયે ૨ દિવસ"
      ],
      correct: 0,
      explanation: "આયુર્વેદ અનુસાર મહિનામાં ૧ થી ૨ વાર હળવો ઉપવાસ કે લંઘન કરવું શરીર માટે ફાયદાકારક છે. અતિશય ઉપવાસ કરવાથી વાયુ વધીને ચક્કર, અશક્તિ અને સાંધામાં દુખાવો થઈ શકે છે ('અતિ સર્વત્ર વર્જયેત્')."
    }
  ],

  hi: [
    {
      id: 1,
      question: "आप रोजाना कितने घंटे सोते हैं?",
      options: [
        "7 - 8 घंटे",
        "9 - 10 घंटे",
        "6 घंटे से कम"
      ],
      correct: 0,
      explanation: "रात में 7 से 8 घंटे की गहरी नींद लेना स्वास्थ्य के लिए सर्वोत्तम है। 6 घंटे से कम नींद से तनाव बढ़ सकता है, जबकि 9-10 घंटे से अधिक नींद से शरीर में आलस्य और कफ दोष का प्रकोप होता है।"
    },
    {
      id: 2,
      question: "आप रोजाना कितना व्यायाम करते हैं?",
      options: [
        "30 से 45 मिनट प्रतिदिन",
        "कभी-कभी सप्ताह में एक बार",
        "बिल्कुल नहीं करते"
      ],
      correct: 0,
      explanation: "प्रतिदिन 30-45 मिनट व्यायाम करना उत्तम स्वास्थ्य बनाए रखता है। 25 वर्ष की आयु के बाद नियमित व्यायाम से डायबिटीज, थायराइड जैसी जीवनशैली की बीमारियों से बचाव होता है।"
    },
    {
      id: 3,
      question: "आप शाम का भोजन कितने बजे करते हैं?",
      options: [
        "शाम 6 से 7 बजे के बीच",
        "रात 8 से 9 बजे के बीच",
        "अनिश्चित समय (कभी 10 बजे के बाद)"
      ],
      correct: 0,
      explanation: "सूर्यास्त के तुरंत बाद भोजन करना सबसे उत्तम है। शाम 6 से 7 बजे जठराग्नि सबसे तीव्र होती है। सूर्यास्त के बाद पाचन शक्ति मंद हो जाती है, जिससे देर से किया गया भोजन ठीक से नहीं पचता।"
    },
    {
      id: 4,
      question: "आप रात को कितने बजे सोते हैं?",
      options: [
        "रात 11 बजे से पहले",
        "रात 12 बजे",
        "रात 1 बजे के बाद"
      ],
      correct: 0,
      explanation: "11:00 बजे से पहले सोना शरीर के लिए अत्यधिक लाभकारी है। 12:00 बजे के बाद सोने से शरीर में वात प्रकोपित होता है, स्लीप साइकिल बिगड़ती है और हार्मोनल असंतुलन होता है।"
    },
    {
      id: 5,
      question: "आपका दैनिक स्क्रीन टाइम कितना है?",
      options: [
        "4 घंटे से कम",
        "4 से 10 घंटे",
        "10 घंटे से अधिक"
      ],
      correct: 0,
      explanation: "4 घंटे से कम स्क्रीन टाइम नेत्र स्वास्थ्य के लिए अच्छा है। अधिक स्क्रीन टाइम होने पर नेत्रों की सुरक्षा के लिए प्रतिदिन नेत्र प्रक्षालन करना चाहिए।"
    },
    {
      id: 6,
      question: "आप दिन में कितनी बार भोजन करते हैं?",
      options: [
        "2 बार (नियमित संतुलित भोजन)",
        "4 बार से अधिक",
        "अनियमित समय और मात्रा"
      ],
      correct: 0,
      explanation: "दिन में 2 बार संतुलित भोजन लेना पाचन तंत्र के लिए आदर्श है। 4 बार से अधिक खाने से कफ और आलस्य बढ़ता है, जबकि अनियमित खान-पान से गैस, एसिडिटी और कब्ज होता है।"
    },
    {
      id: 7,
      question: "आप दिन में कितना पानी पीते हैं?",
      options: [
        "जब प्यास लगे तब आवश्यकतानुसार",
        "3 से 4 लीटर (ज़बरदस्ती)",
        "आवश्यकता से बहुत कम"
      ],
      correct: 0,
      explanation: "आयुर्वेद के अनुसार केवल प्यास लगने पर ही जल का सेवन करना चाहिए। अधिक पानी पीने से जठराग्नि मंद होती है और सूजन आ सकती है, जबकि कम पानी से कब्ज व पथरी की समस्या होती है।"
    },
    {
      id: 8,
      question: "आप महीने में कितनी बार जंक फूड खाते हैं?",
      options: [
        "महीने में 1 से 2 बार",
        "सप्ताह में एक बार",
        "महीने में 7 से 8 बार"
      ],
      correct: 0,
      explanation: "अत्यधिक जंक फूड और मसालेदार खाना स्वास्थ्य के लिए हानिकारक है। इससे पाचन बिगड़ता है और बीमारियाँ जन्म लेती हैं। ताजा घर का भोजन ही सर्वोत्तम है।"
    },
    {
      id: 9,
      question: "आपकी नींद की गुणवत्ता कैसी है?",
      options: [
        "गहरी और शांत नींद",
        "हल्की आहट से नींद खुल जाती है",
        "अनिद्रा (नींद न आना)"
      ],
      correct: 0,
      explanation: "गहरी नींद यह दर्शाती है कि आपका मन शांत है। हल्की आवाज में नींद टूटना या अनिद्रा वात दोष और मानसिक तनाव का प्रतीक है। रात को नस्य (Nasya) प्रयोग लाभदायक होता है।"
    },
    {
      id: 10,
      question: "आप भोजन करने के तुरंत बाद क्या करते हैं?",
      options: [
        "थोड़ा टहलते हैं (शतपदी - 100 कदम)",
        "एक ही जगह बैठे रहते हैं",
        "तुरंत सो जाते हैं"
      ],
      correct: 0,
      explanation: "भोजन के 30 मिनट बाद 100 कदम टहलना (शतपदी) पाचन में सहायक होता है। तुरंत बैठने या सोने से शरीर में कफ बढ़ता है और आलस्य आता है।"
    },
    {
      id: 11,
      question: "क्या आप सुबह का नाश्ता (ब्रेकफास्ट) करते हैं?",
      options: [
        "हाँ, प्रतिदिन नियम से करता/करती हूँ",
        "समय मिलने पर ही करता/करती हूँ",
        "नाश्ता स्किप कर देता/देती हूँ"
      ],
      correct: 0,
      explanation: "सुबह नियमित हल्का नाश्ता करने से दिनभर ऊर्जा बनी रहती है। 4 घंटे से अधिक समय तक भूखे रहने से शरीर में वात दोष प्रकोपित होता है।"
    },
    {
      id: 12,
      question: "क्या आपका पेट नियमित रूप से साफ होता है?",
      options: [
        "हाँ, सुबह स्वतः और सुगमता से साफ होता है",
        "अनियमित रहता है",
        "पेट साफ होने के बाद भी असंतुष्टि रहती है"
      ],
      correct: 0,
      explanation: "सुबह बिना किसी औषधि के सुगमता से पेट साफ होना उत्तम स्वास्थ्य का लक्षण है ('सम्यक मलप्रवृत्ति')। अनियमितता या असंतोष वात दोष के असंतुलन का कारण है।"
    },
    {
      id: 13,
      question: "आप उपवास (व्रत) कितनी बार करते हैं?",
      options: [
        "महीने में 1 से 2 बार",
        "महीने में 3-4 बार से अधिक",
        "हर हफ्ते 2 दिन"
      ],
      correct: 0,
      explanation: "आयुर्वेद के अनुसार महीने में 1-2 बार हल्का उपवास (लंघन) शरीर के डिटॉक्स के लिए लाभदायक है। अत्यधिक उपवास से वात बढ़ता है जिससे कमजोरी और जोड़ों में दर्द हो सकता है।"
    }
  ],

  en: [
    {
      id: 1,
      question: "How many hours do you sleep every day?",
      options: [
        "7 - 8 hours",
        "9 - 10 hours",
        "Less than 6 hours"
      ],
      correct: 0,
      explanation: "Getting 7 to 8 hours of deep sleep at night is optimal for bodily rejuvenation. Sleeping under 6 hours raises stress hormones, while over 9-10 hours leads to sluggishness and Kapha aggravation."
    },
    {
      id: 2,
      question: "How much exercise do you perform daily?",
      options: [
        "30 to 45 minutes daily",
        "Occasionally once a week",
        "Do not exercise"
      ],
      correct: 0,
      explanation: "Exercising 30-45 minutes daily preserves metabolic health. Regular activity after age 25 is crucial to prevent lifestyle conditions like diabetes, thyroid imbalances, and low energy."
    },
    {
      id: 3,
      question: "What time do you eat your dinner?",
      options: [
        "Between 6 PM and 7 PM",
        "Between 8 PM and 9 PM",
        "Irregular (sometimes after 10 PM)"
      ],
      correct: 0,
      explanation: "Dining close to sunset (6-7 PM) is ideal because digestive fire (Jatharagni) is strongest then. Eating late slows down metabolism and disrupts overnight healing."
    },
    {
      id: 4,
      question: "What time do you go to bed at night?",
      options: [
        "Before 11:00 PM",
        "Around 12:00 Midnight",
        "After 1:00 AM"
      ],
      correct: 0,
      explanation: "Sleeping before 11 PM aligns with natural circadian rhythms. Sleeping after midnight aggravates Vata dosha, disrupts sleep quality, and induces hormonal imbalance."
    },
    {
      id: 5,
      question: "What is your average daily screen time?",
      options: [
        "Less than 4 hours",
        "4 to 10 hours",
        "More than 10 hours"
      ],
      correct: 0,
      explanation: "Keeping screen time under 4 hours preserves eye vigor and reduces mental fatigue. Higher screen time requires daily Ayurvedic eye therapy (Netra Prakshalana)."
    },
    {
      id: 6,
      question: "How many meals do you consume daily?",
      options: [
        "2 wholesome meals daily",
        "More than 4 times",
        "Irregular timing & portions"
      ],
      correct: 0,
      explanation: "Eating 2 structured meals daily preserves digestive strength. Eating >4 times leads to Kapha stagnation and lethargy, whereas erratic eating causes acidity and bloating."
    },
    {
      id: 7,
      question: "How do you drink water throughout the day?",
      options: [
        "Whenever thirsty, in proper amount",
        "Forced 3 to 4 Liters",
        "Significantly less than needed"
      ],
      correct: 0,
      explanation: "Ayurveda stresses drinking water according to natural thirst. Excess forced water dampens digestive fire and causes fluid retention; inadequate water triggers constipation and stones."
    },
    {
      id: 8,
      question: "How often do you consume junk food monthly?",
      options: [
        "1 to 2 times a month",
        "Once a week",
        "7 to 8 times a month"
      ],
      correct: 0,
      explanation: "Restricting junk and spicy foods to 1-2 times monthly protects digestive microflora. Freshly cooked, home-prepared meals promote long-term vitality."
    },
    {
      id: 9,
      question: "How would you describe your sleep quality?",
      options: [
        "Deep and undisturbed sleep",
        "Wake up easily at slight noise",
        "Insomnia (difficulty sleeping)"
      ],
      correct: 0,
      explanation: "Restful deep sleep reflects mental peace and balanced doshas. Light sleeping or insomnia signifies Vata dominance and stress, often relieved by Ayurvedic Nasya."
    },
    {
      id: 10,
      question: "What do you do immediately after eating a meal?",
      options: [
        "Take a gentle walk (Shatapadi ~100 steps)",
        "Remain seated continuously",
        "Go to sleep immediately"
      ],
      correct: 0,
      explanation: "Strolling ~100 steps (Shatapadi) 30 mins post-meal enhances digestion. Sleeping or sitting immediately after eating aggravates Kapha and promotes sluggishness."
    },
    {
      id: 11,
      question: "Do you eat breakfast every morning?",
      options: [
        "Yes, every day regularly",
        "Only when I have time",
        "I skip breakfast"
      ],
      correct: 0,
      explanation: "A nutritious breakfast stabilizes metabolic energy throughout the day. Remaining on an empty stomach for >4 hours aggravates Vata dosha in the GI tract."
    },
    {
      id: 12,
      question: "Do you have clean, regular bowel movements?",
      options: [
        "Yes, naturally clean every morning",
        "Irregular and unpredictable",
        "Feel unsatisfied after evacuation"
      ],
      correct: 0,
      explanation: "Effortless morning elimination signifies optimal gut motility ('Samyak Mala Pravrutti'). Irregularity or feeling unsatisfied indicates Vata imbalance in the colon."
    },
    {
      id: 13,
      question: "How frequently do you practice fasting?",
      options: [
        "1 to 2 times a month",
        "More than 3-4 times a month",
        "2 days every week"
      ],
      correct: 0,
      explanation: "Light periodic fasting (Langhana) 1-2 times monthly cleanses metabolic toxins (Ama). Excessive fasting aggravates Vata, causing weakness, dizziness, and joint pains."
    }
  ]
};

// ==========================================================================
// 3. APPLICATION STATE & GLOBALS
// ==========================================================================

// ==========================================================================
// 3. APPLICATION STATE & GLOBALS
// ==========================================================================

let currentLang = 'gu'; // Default language
let userAnswers = new Array(13).fill(null); // Array to hold live selected option index (0, 1, or 2) for each question
let submittedAnswers = null; // Frozen snapshot taken upon submission
let isLocked = false; // Prevents any modification after submission
let currentViewState = 'QUIZ'; // 'QUIZ' | 'SUBMITTING' | 'RESULT'

// ==========================================================================
// 4. INITIALIZATION & VIEW STATE HANDLING
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize default language and initial view state
  setLanguage(currentLang, false);
  setViewState('QUIZ');
});

/**
 * Switch major view states cleanly
 * @param {'QUIZ' | 'SUBMITTING' | 'RESULT'} state 
 */
function setViewState(state) {
  currentViewState = state;
  const quizSec = document.getElementById('quiz-section');
  const loadingSec = document.getElementById('loading-section');
  const resultSec = document.getElementById('result-section');

  if (state === 'QUIZ') {
    if (quizSec) quizSec.classList.remove('hidden');
    if (loadingSec) loadingSec.classList.add('hidden');
    if (resultSec) resultSec.classList.add('hidden');
  } else if (state === 'SUBMITTING') {
    if (quizSec) quizSec.classList.add('hidden');
    if (loadingSec) loadingSec.classList.remove('hidden');
    if (resultSec) resultSec.classList.add('hidden');
    scrollToSection('loading-section');
  } else if (state === 'RESULT') {
    if (quizSec) quizSec.classList.add('hidden');
    if (loadingSec) loadingSec.classList.add('hidden');
    if (resultSec) resultSec.classList.remove('hidden');
    scrollToSection('result-section');
  }
}

/**
 * Switch language and refresh interface
 * @param {string} langCode - 'gu', 'hi', or 'en'
 * @param {boolean} scrollQuiz - whether to smooth scroll down to quiz
 */
function setLanguage(langCode, scrollQuiz = false) {
  if (!UI_STRINGS[langCode]) return;
  currentLang = langCode;

  // Update HTML lang attribute
  document.documentElement.lang = langCode;

  // Update Language Selector Cards active state
  const langCards = document.querySelectorAll('.lang-card');
  langCards.forEach(card => {
    if (card.getAttribute('data-lang') === langCode) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Update Header Lang Badge text
  const activeLangNameMap = { gu: 'ગુજરાતી', hi: 'हिन्दी', en: 'English' };
  const badgeText = document.getElementById('active-lang-text');
  if (badgeText) badgeText.innerText = activeLangNameMap[langCode];

  // Translate static UI elements
  const str = UI_STRINGS[langCode];
  setElementText('header-tagline', str.headerTagline);
  setElementText('hero-eyebrow-text', str.heroEyebrow);
  setElementText('swasth-word', str.swasthWord);
  setElementText('hero-intro-text', str.heroIntro);
  setElementText('hospital-services-text', str.hospitalServices);
  setElementText('scroll-hint-text', str.scrollHint);
  setElementText('lang-step-tag', str.langStepTag);
  setElementText('lang-select-title', str.langSelectTitle);
  setElementText('lang-select-sub', str.langSelectSub);
  setElementText('quiz-step-tag', str.quizStepTag);
  setElementText('quiz-main-title', str.quizMainTitle);
  setElementText('quiz-main-sub', str.quizMainSub);
  setElementText('quiz-progress-label', str.progressLabel);
  setElementText('validation-text', str.validationText);
  setElementText('btn-submit-text', str.btnSubmitText);
  setElementText('loading-text', str.loadingText);
  setElementText('result-badge-text', str.resultBadge);
  setElementText('result-title-text', str.resultTitle);
  setElementText('eval-title-text', str.evalTitle);
  setElementText('review-main-title', str.reviewMainTitle);
  setElementText('review-sub-title', str.reviewSubTitle);
  setElementText('btn-restart-text', str.btnRestartText);
  setElementText('footer-copy-text', str.footerCopy);

  // Render questions in selected language if not locked
  if (!isLocked) {
    renderQuestions();
  }

  // Update progress counter text
  updateProgressCounter();

  // Scroll to quiz section smoothly if triggered by click
  if (scrollQuiz && currentViewState === 'QUIZ') {
    scrollToSection('quiz-section');
  }
}

/**
 * Utility to safely set text content of element if it exists
 */
function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

/**
 * Smooth scroll to element by ID
 */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ==========================================================================
// 5. QUIZ RENDERING & INTERACTION
// ==========================================================================

/**
 * Render all 13 questions dynamically as single-page scrollable cards
 */
function renderQuestions() {
  const container = document.getElementById('questions-container');
  if (!container) return;

  const questions = QUIZ_DATA[currentLang];
  let html = '';

  questions.forEach((q, qIndex) => {
    const formattedNum = (qIndex + 1).toString().padStart(2, '0');
    const isAnswered = userAnswers[qIndex] !== null;

    html += `
      <div class="question-card ${isAnswered ? 'answered' : ''}" id="q-card-${qIndex}">
        <div class="question-header">
          <span class="question-number-badge">${formattedNum}</span>
          <h3 class="question-title">${q.question}</h3>
        </div>
        <div class="options-group">
    `;

    q.options.forEach((optText, optIndex) => {
      const isSelected = userAnswers[qIndex] === optIndex;
      const inputId = `q_${qIndex}_opt_${optIndex}`;

      html += `
        <label class="option-label ${isSelected ? 'selected' : ''} ${isLocked ? 'disabled' : ''}" for="${inputId}" onclick="handleOptionSelect(${qIndex}, ${optIndex})">
          <input type="radio" id="${inputId}" name="question_${qIndex}" value="${optIndex}" class="option-radio-native" ${isSelected ? 'checked' : ''} ${isLocked ? 'disabled' : ''}>
          <div class="custom-radio">
            <div class="custom-radio-inner"></div>
          </div>
          <span class="option-text">${optText}</span>
        </label>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Handle user selection of an answer option
 * @param {number} qIndex - Question index (0..12)
 * @param {number} optIndex - Option index (0..2)
 */
function handleOptionSelect(qIndex, optIndex) {
  // STRICT RULE: Ignore clicks if quiz attempt is locked
  if (isLocked) return;

  userAnswers[qIndex] = optIndex;

  // Update card styling
  const card = document.getElementById(`q-card-${qIndex}`);
  if (card) {
    card.classList.add('answered');
    card.classList.remove('highlight-unanswered');

    // Update labels inside option group
    const labels = card.querySelectorAll('.option-label');
    labels.forEach((lbl, idx) => {
      if (idx === optIndex) {
        lbl.classList.add('selected');
        const radio = lbl.querySelector('input');
        if (radio) radio.checked = true;
      } else {
        lbl.classList.remove('selected');
      }
    });
  }

  // Hide validation banner if active
  const banner = document.getElementById('validation-banner');
  if (banner) banner.classList.add('hidden');

  // Update Progress Sticky Bar
  updateProgressCounter();
}

/**
 * Update the progress bar fill and answered count text
 */
function updateProgressCounter() {
  const answeredCount = userAnswers.filter(a => a !== null).length;
  const total = 13;
  const percentage = Math.round((answeredCount / total) * 100);

  // Fill bar
  const fill = document.getElementById('progress-bar-fill');
  if (fill) fill.style.width = `${percentage}%`;

  // Counter text
  const str = UI_STRINGS[currentLang].progressCounterText;
  const formattedText = str.replace('{count}', answeredCount);
  setElementText('progress-counter-text', formattedText);
}

// ==========================================================================
// 6. VALIDATION & SUBMISSION LIFECYCLE
// ==========================================================================

/**
 * Validate that all questions are answered, lock quiz, show loader, and display Result View
 */
function submitQuiz() {
  if (isLocked) return;

  // STEP 1: Validate that all 13 questions have been answered
  const firstUnansweredIndex = userAnswers.findIndex(ans => ans === null);

  if (firstUnansweredIndex !== -1) {
    // Show validation banner
    const banner = document.getElementById('validation-banner');
    if (banner) {
      banner.classList.remove('hidden');
      setElementText('validation-text', UI_STRINGS[currentLang].validationText);
    }

    // Highlight the unanswered card
    const targetCard = document.getElementById(`q-card-${firstUnansweredIndex}`);
    if (targetCard) {
      targetCard.classList.add('highlight-unanswered');
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return;
  }

  // STEP 2: IMMEDIATELY LOCK QUIZ
  isLocked = true;

  // Store frozen copy/snapshot of submitted answers
  submittedAnswers = [...userAnswers];

  // Disable all radio buttons & options UI
  const labels = document.querySelectorAll('.option-label');
  labels.forEach(lbl => {
    lbl.classList.add('disabled');
    const input = lbl.querySelector('input');
    if (input) input.disabled = true;
  });

  const submitBtn = document.getElementById('btn-submit-quiz');
  if (submitBtn) {
    submitBtn.classList.add('disabled');
    submitBtn.disabled = true;
  }

  // STEP 3: SHOW SHORT LOADING STATE (~1000ms)
  setViewState('SUBMITTING');

  setTimeout(() => {
    // STEP 4: RESULT PAGE AS A SEPARATE VIEW (QUIZ IS HIDDEN)
    setViewState('RESULT');
    renderResultView();
  }, 1000);
}

// ==========================================================================
// 7. RESULT CALCULATION & REVIEW GENERATION
// ==========================================================================

function renderResultView() {
  const answersToUse = submittedAnswers || userAnswers;
  const questions = QUIZ_DATA[currentLang];
  let correctCount = 0;

  // Calculate score strictly using frozen submittedAnswers snapshot
  answersToUse.forEach((ans, idx) => {
    if (ans === questions[idx].correct) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / 13) * 100);

  // Update Score Percentage & Fraction
  setElementText('score-percentage-text', `${percentage}%`);
  setElementText('score-fraction-text', `${correctCount} / 13`);

  // Animate Circle Gauge
  const circleProgress = document.getElementById('score-circle-progress');
  if (circleProgress) {
    const circumference = 2 * Math.PI * 70; // r=70 -> ~439.8
    const offset = circumference - (percentage / 100) * circumference;
    setTimeout(() => {
      circleProgress.style.strokeDashoffset = offset;
    }, 150);
  }

  // Determine Evaluation Message Tier
  renderEvaluationMessage(percentage, correctCount);

  // Render Detailed Answer Review Cards using frozen answers snapshot
  renderAnswerReview();
}

/**
 * Render evaluation title and summary based on user score percentage
 */
function renderEvaluationMessage(percentage, correctCount) {
  let title = "";
  let desc = "";

  if (currentLang === 'gu') {
    if (percentage >= 80) {
      title = "ઉત્તમ સ્વાસ્થ્ય અને દોષ સંતુલન 🌿";
      desc = "અભિનંદન! તમારી દિનચર્યા અને આહારશૈલી આયુર્વેદના સિદ્ધાંતો સાથે ખૂબ જ સુંદર રીતે સંતુલિત છે. આ સ્વાસ્થ્યપ્રદ આદતો જાળવી રાખો.";
    } else if (percentage >= 50) {
      title = "મધ્યમ સ્વાસ્થ્ય અને સુધારાની તક 🌾";
      desc = "તમારી દિનચર્યા સારી છે, પરંતુ અમુક જીવનશૈલીની આદતો (જેમ કે ઊંઘનો સમય, સ્ક્રીન ટાઈમ કે પાણી પીવાની રીત) માં થોડા સુધારાની જરૂર છે.";
    } else {
      title = "જીવનશૈલી પર ધ્યાન આપવાની જરૂર ⚠️";
      desc = "તમારી વર્તમાન દિનચર્યામાં વાયુ કે કફ દોષનું અસંતુલન થઈ રહ્યું છે. આયુર્વેદિક માર્ગદર્શન મેળવી રોજિંદી આદતોમાં સકારાત્મક ફેરફાર કરો.";
    }
  } else if (currentLang === 'hi') {
    if (percentage >= 80) {
      title = "उत्तम स्वास्थ्य एवं दोष संतुलन 🌿";
      desc = "बधाई हो! आपकी जीवनशैली और खान-पान आयुर्वेद के सिद्धांतों के अनुसार बहुत संतुलित है। इस दिनचर्या को निरंतर बनाए रखें।";
    } else if (percentage >= 50) {
      title = "मध्यम स्वास्थ्य - सुधार की आवश्यकता 🌾";
      desc = "आपकी दिनचर्या अच्छी है, लेकिन कुछ आदतों (जैसे सोने का समय, स्क्रीन टाइम या भोजन का समय) में सुधार की आवश्यकता है।";
    } else {
      title = "जीवनशैली में सुधार हेतु ध्यान दें ⚠️";
      desc = "आपकी वर्तमान दिनचर्या से वात या कफ का असंतुलन हो सकता है। आयुर्वेदिक विशेषज्ञों की सलाह से जीवनशैली में सकारात्मक बदलाव लाएं।";
    }
  } else {
    if (percentage >= 80) {
      title = "Excellent Ayurvedic Balance 🌿";
      desc = "Congratulations! Your daily routine and eating habits align wonderfully with traditional Ayurvedic principles. Keep maintaining these healthy habits!";
    } else if (percentage >= 50) {
      title = "Moderate Balance - Needs Minor Tuning 🌾";
      desc = "Your lifestyle is fairly healthy, but a few areas (like sleep timing, dinner time, or water habits) could be optimized for complete wellness.";
    } else {
      title = "Lifestyle Focus Recommended ⚠️";
      desc = "Your daily habits suggest potential Vata or Kapha imbalances. Consulting JOGI Ayurved experts can help realign your routine for vitality.";
    }
  }

  setElementText('eval-title-text', title);
  setElementText('eval-desc-text', desc);
}

/**
 * Render review cards for all 13 questions using frozen submittedAnswers snapshot
 */
function renderAnswerReview() {
  const reviewList = document.getElementById('review-list');
  if (!reviewList) return;

  const questions = QUIZ_DATA[currentLang];
  const ui = UI_STRINGS[currentLang];
  const answersToUse = submittedAnswers || userAnswers;
  let html = '';

  questions.forEach((q, idx) => {
    const userChoice = answersToUse[idx];
    const isCorrect = userChoice === q.correct;
    const formattedNum = (idx + 1).toString().padStart(2, '0');

    const statusPillClass = isCorrect ? 'status-correct' : 'status-wrong';
    const statusText = isCorrect ? `✓ ${ui.correctLabel}` : `✕ ${ui.wrongLabel}`;
    const cardClass = isCorrect ? 'correct-card' : 'wrong-card';

    html += `
      <div class="review-card ${cardClass}">
        <div class="review-card-top">
          <span class="review-q-num">Q${formattedNum}</span>
          <span class="review-status-pill ${statusPillClass}">${statusText}</span>
        </div>
        <h4 class="review-q-title">${q.question}</h4>

        <div class="review-answers-box">
          <div class="ans-row ${isCorrect ? 'ans-correct-fix' : 'ans-user-wrong'}">
            <span class="ans-label">${ui.yourAnsLabel}</span>
            <span>${q.options[userChoice]}</span>
          </div>

          ${!isCorrect ? `
            <div class="ans-row ans-correct-fix">
              <span class="ans-label">${ui.correctAnsLabel}</span>
              <span>✓ ${q.options[q.correct]}</span>
            </div>
          ` : ''}
        </div>

        <div class="ayurvedic-advice-box">
          <strong>🌿 JOGI Ayurved Guidance:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  reviewList.innerHTML = html;
}

// ==========================================================================
// 8. TRY AGAIN / RESTART QUIZ
// ==========================================================================

/**
 * Reset all state and start a completely fresh quiz attempt
 */
function restartQuiz() {
  // 1. Reset answers array & snapshot
  userAnswers = new Array(13).fill(null);
  submittedAnswers = null;

  // 2. Unlock quiz state
  isLocked = false;

  // 3. Re-enable submit button
  const submitBtn = document.getElementById('btn-submit-quiz');
  if (submitBtn) {
    submitBtn.classList.remove('disabled');
    submitBtn.disabled = false;
  }

  // 4. Reset SVG gauge stroke
  const circleProgress = document.getElementById('score-circle-progress');
  if (circleProgress) circleProgress.style.strokeDashoffset = 440;

  // 5. Hide validation banner if active
  const banner = document.getElementById('validation-banner');
  if (banner) banner.classList.add('hidden');

  // 6. Switch view state back to QUIZ (Hides result section, shows quiz section)
  setViewState('QUIZ');

  // 7. Re-render fresh blank questions & progress
  renderQuestions();
  updateProgressCounter();

  // 8. Scroll smoothly to top of quiz section
  scrollToSection('quiz-section');
}
