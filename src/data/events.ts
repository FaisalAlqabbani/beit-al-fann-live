export type EventType = "late" | "workshop" | "show";

export type HouseEvent = {
  id: string;
  type: EventType;
  /** [title, when, description] */
  en: [string, string, string];
  ar: [string, string, string];
  cap: number;
  taken: number;
  /** Drop-in: no booking needed. */
  open?: boolean;
};

/** Ported verbatim from the `EV` array in index.html. */
export const EVENTS: HouseEvent[] = [
  {
    id: "late1",
    type: "late",
    en: [
      "Weekly debate: Old meets new",
      "Thu 29 Oct · 19:00–21:00",
      "Established and emerging artists on art in Amman · filmed by our media team",
    ],
    ar: [
      "النقاش الأسبوعي: القديم يلتقي الجديد",
      "الخميس 29 تشرين الأول · 19:00–21:00",
      "فنانون مخضرمون وجدد عن الفن في عمّان · يصوّره فريقنا الإعلامي",
    ],
    cap: 60,
    taken: 41,
  },
  {
    id: "ws1",
    type: "workshop",
    en: [
      "Painting for beginners",
      "Sat 31 Oct · 11:00–14:00",
      "Taught by a local painter · materials included",
    ],
    ar: [
      "الرسم للمبتدئين",
      "السبت 31 تشرين الأول · 11:00–14:00",
      "يعلّمها رسام محلي · المواد مشمولة",
    ],
    cap: 12,
    taken: 9,
  },
  {
    id: "ws2",
    type: "workshop",
    en: [
      "Embroidery basics",
      "Fri 6 Nov · 15:00–18:00",
      "Traditional stitches taught by an embroidery artist",
    ],
    ar: [
      "أساسيات التطريز",
      "الجمعة 6 تشرين الثاني · 15:00–18:00",
      "غرز تقليدية تعلّمها فنانة تطريز",
    ],
    cap: 12,
    taken: 12,
  },
  {
    id: "ex1",
    type: "show",
    en: [
      "Artistic residency: open studio",
      "2 – 21 Nov · 3 weeks",
      "4 residents at work inside the house · drop by and watch",
    ],
    ar: [
      "الإقامة الفنية: استوديو مفتوح",
      "2 – 21 تشرين الثاني · 3 أسابيع",
      "4 فنانين مقيمين يعملون داخل البيت · تعال وشاهد",
    ],
    cap: 40,
    taken: 0,
    open: true,
  },
  {
    id: "ws3",
    type: "workshop",
    en: [
      "Embroidery: thobe patterns",
      "Sat 14 Nov · 16:00–18:00",
      "Learn the patterns of the Jordanian thobe",
    ],
    ar: [
      "التطريز: نقوش الثوب",
      "السبت 14 تشرين الثاني · 16:00–18:00",
      "تعلّم نقوش الثوب الأردني",
    ],
    cap: 12,
    taken: 4,
  },
  {
    id: "late2",
    type: "late",
    en: [
      "Weekly debate: Where can young artists show?",
      "Thu 5 Nov · 19:00–21:00",
      "Old and new artists on galleries, platforms and the house",
    ],
    ar: [
      "النقاش الأسبوعي: أين يعرض الفنانون الشباب؟",
      "الخميس 5 تشرين الثاني · 19:00–21:00",
      "فنانون قدامى وجدد عن المعارض والمنصات والبيت",
    ],
    cap: 60,
    taken: 12,
  },
];

/** The hero event the countdown and the home meter track. */
export const FEATURED_ID = "late1";
export const FEATURED_AT = "2026-10-29T19:00:00+03:00";
