import type { Copy } from "@/data";

export const countWords = (s: string) =>
  s.trim().split(/\s+/).filter(Boolean).length;

export type ResidencyValues = {
  name: string;
  age: string;
  discipline: string;
  files: File[];
  statement: string;
  agreed: boolean;
};

export type ResidencyErrors = Partial<
  Record<"name" | "age" | "discipline" | "files" | "statement" | "agreed", string>
>;

/** Same rules and messages as the `#callForm` handler in index.html. */
export function validateResidency(
  v: ResidencyValues,
  c: Copy,
): ResidencyErrors {
  const e: ResidencyErrors = {};
  const age = Number(v.age);
  const words = countWords(v.statement);

  if (!v.name.trim()) e.name = c.ui.errReq;
  if (!(age >= 18 && age <= 30)) e.age = c.ui.errAge;
  if (!v.discipline) e.discipline = c.ui.errReq;
  if (!(v.files.length >= 1 && v.files.length <= 3)) e.files = c.ui.errFiles;
  if (!(words >= 50 && words <= 300))
    e.statement = `${c.ui.errStmt} (${words}).`;
  if (!v.agreed) e.agreed = c.ui.errRules;

  return e;
}

/** Caps per space, in the same order as the select options. */
export const SPACE_CAPS = [120, 12, 40] as const;

export type RequestValues = {
  name: string;
  spaceIndex: number;
  date: string;
  people: string;
  teach: string;
};

export type RequestErrors = Partial<
  Record<"name" | "date" | "people", string>
>;

/** Same rules and messages as the `#bookForm` handler in index.html. */
export function validateRequest(v: RequestValues, c: Copy): RequestErrors {
  const e: RequestErrors = {};
  const max = SPACE_CAPS[v.spaceIndex] ?? 120;
  const people = Number(v.people);

  if (!v.name.trim()) e.name = c.ui.errReq;
  if (!(v.date && new Date(v.date) > new Date())) e.date = c.ui.errDate;
  if (!(people >= 1 && people <= max)) e.people = c.ui.errPpl;

  return e;
}

export const hasErrors = (e: object) => Object.keys(e).length > 0;
