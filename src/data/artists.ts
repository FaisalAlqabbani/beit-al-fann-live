export type Artist = {
  /** [en, ar] name */
  n: [string, string];
  /** [en, ar] discipline · generation */
  d: [string, string];
  /** [en, ar] work title */
  w: [string, string];
  /** price, same in both languages */
  p: string;
  /** [ground, mark] colours for the generated artwork */
  c: [string, string];
};

/** Ported verbatim from the `AR` array in index.html. */
export const ARTISTS: Artist[] = [
  {
    n: ["Lina H.", "لينا ح."],
    d: ["Painting · resident", "رسم · فنانة مقيمة"],
    w: ["Arches at dusk, acrylic", "أقواس عند الغروب، أكريليك"],
    p: "120 JD",
    c: ["#2E5B4F", "#B07A1F"],
  },
  {
    n: ["Nabil T.", "نبيل ت."],
    d: ["Painting · established artist", "رسم · فنان مخضرم"],
    w: ["Old Amman, oil on canvas", "عمّان القديمة، زيت على قماش"],
    p: "400 JD",
    c: ["#1B2421", "#A9431D"],
  },
  {
    n: ["Dana S.", "دانة س."],
    d: ["Embroidery · workshop teacher", "تطريز · مدرّبة ورش"],
    w: ["Thobe pattern remix", "إعادة نقش الثوب"],
    p: "150 JD",
    c: ["#B07A1F", "#ECE9E2"],
  },
  {
    n: ["Sara M.", "سارة م."],
    d: ["Calligraphy · emerging artist", "خط عربي · فنانة جديدة"],
    w: ["Kufic tile study", "دراسة كوفية للبلاط"],
    p: "90 JD",
    c: ["#A9431D", "#1B2421"],
  },
  {
    n: ["Huda K.", "هدى ك."],
    d: ["Embroidery · established artist", "تطريز · فنانة مخضرمة"],
    w: ["Hand-stitched cushion, wool", "وسادة مطرزة يدويًا، صوف"],
    p: "200 JD",
    c: ["#3E4A45", "#B07A1F"],
  },
  {
    n: ["Hamza R.", "حمزة ر."],
    d: ["Painting · resident", "رسم · فنان مقيم"],
    w: ["Spiral stairs, ink", "الدرج الحلزوني، حبر"],
    p: "70 JD",
    c: ["#2E5B4F", "#ECE9E2"],
  },
];
