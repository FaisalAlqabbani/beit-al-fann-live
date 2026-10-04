export type ZoneCopy = {
  t: string;
  now: string;
  live: string;
  rm: string;
  cost: string;
  fix: string;
};

export type Zone = {
  k: "A" | "B" | "C" | "D" | "E";
  x: number;
  y: number;
  w: number;
  h: number;
  /** CSS custom property holding the zone colour. */
  col: string;
  en: ZoneCopy;
  ar: ZoneCopy;
};

/** Ported verbatim from the `Z` array in index.html. Plan viewBox is 600 x 460. */
export const ZONES: Zone[] = [
  {
    k: "A",
    x: 0,
    y: 0,
    w: 600,
    h: 46,
    col: "--zone-a",
    en: {
      t: "Entrance & reception",
      now: "Closed door, no sign, nobody at the entrance to welcome visitors.",
      live: "A reception desk at the door, security on duty, and bilingual signs on the street.",
      rm: "Reception & security team",
      cost: "University volunteers",
      fix: "No reception, no security",
    },
    ar: {
      t: "المدخل والاستقبال",
      now: "باب مغلق بلا لافتة، ولا أحد عند المدخل لاستقبال الزوار.",
      live: "مكتب استقبال عند الباب، وحراسة في الدوام، ولافتات ثنائية اللغة في الشارع.",
      rm: "فريق الاستقبال والأمن",
      cost: "متطوعون من الجامعات",
      fix: "لا استقبال، لا أمن",
    },
  },
  {
    k: "B",
    x: 30,
    y: 70,
    w: 250,
    h: 200,
    col: "--zone-b",
    en: {
      t: "Debate hall",
      now: "The same display for years, rooms unwatched, and items have gone missing.",
      live: "Weekly debates between old and new artists every Thursday, with security watching every room.",
      rm: "Management team",
      cost: "Sponsors",
      fix: "No activities, robberies",
    },
    ar: {
      t: "قاعة النقاش",
      now: "العرض نفسه منذ سنوات، الغرف بلا مراقبة، وفُقدت مقتنيات.",
      live: "نقاشات أسبوعية بين الفنانين القدامى والجدد كل خميس، مع حراسة تراقب كل غرفة.",
      rm: "فريق الإدارة",
      cost: "الرعاة",
      fix: "لا أنشطة، سرقات",
    },
  },
  {
    k: "C",
    x: 30,
    y: 280,
    w: 250,
    h: 150,
    col: "--zone-c",
    en: {
      t: "Workshop room",
      now: "Heritage wings: music, theatre, radio & TV, crafts, folk costumes.",
      live: "The heritage wings stay as they are. One room becomes a 12-seat workshop room where artists teach painting and embroidery.",
      rm: "Management team",
      cost: "Sponsors (materials)",
      fix: "Nothing to do at the house",
    },
    ar: {
      t: "غرفة الورش",
      now: "أجنحة التراث: الموسيقى والمسرح والإذاعة والتلفزيون والحرف والأزياء الشعبية.",
      live: "تبقى أجنحة التراث كما هي. غرفة واحدة تصبح غرفة ورش لـ12 شخصًا يعلّم فيها الفنانون الرسم والتطريز.",
      rm: "فريق الإدارة",
      cost: "الرعاة (المواد)",
      fix: "لا شيء يُفعل في البيت",
    },
  },
  {
    k: "D",
    x: 300,
    y: 70,
    w: 280,
    h: 230,
    col: "--zone-d",
    en: {
      t: "Residency studio",
      now: "Unused open ground. The largest space on the plot sits empty.",
      live: "Home of الإقامة الفنية: 4 residents work here for 3 weeks, then open the studio to visitors.",
      rm: "Management team",
      cost: "Sponsors",
      fix: "No place for artists to create",
    },
    ar: {
      t: "استوديو الإقامة",
      now: "أرض مفتوحة غير مستخدمة. أكبر مساحة في الموقع فارغة.",
      live: "مقر الإقامة الفنية: 4 فنانين مقيمين يعملون هنا لثلاثة أسابيع، ثم يفتحون الاستوديو للزوار.",
      rm: "فريق الإدارة",
      cost: "الرعاة",
      fix: "لا مكان للفنانين ليبدعوا",
    },
  },
  {
    k: "E",
    x: 300,
    y: 320,
    w: 280,
    h: 110,
    col: "--zone-e",
    en: {
      t: "Media corner",
      now: "Nobody films or posts anything, so nobody knows the house exists.",
      live: "Base for the media team: every activity is filmed, photographed and posted the same week.",
      rm: "Media team",
      cost: "University volunteers",
      fix: "No media coverage",
    },
    ar: {
      t: "ركن الإعلام",
      now: "لا أحد يصوّر أو ينشر شيئًا، فلا أحد يعرف أن البيت موجود.",
      live: "مقر الفريق الإعلامي: كل نشاط يُصوَّر ويُنشر في الأسبوع نفسه.",
      rm: "الفريق الإعلامي",
      cost: "متطوعون من الجامعات",
      fix: "لا تغطية إعلامية",
    },
  },
];

export const DEFAULT_ZONE: Zone["k"] = "D";
