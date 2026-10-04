"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { getCopy } from "@/data";
import type { Locale } from "@/lib/i18n";
import {
  countWords,
  hasErrors,
  validateResidency,
  type ResidencyErrors,
} from "@/lib/validation";
import { Button } from "./ui";
import { Field, FieldError, inputClass } from "./Field";

export default function ResidencyForm({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const still = useReducedMotion();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [statement, setStatement] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<ResidencyErrors>({});
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  const words = countWords(statement);

  // Derive the preview URLs, then revoke them on the next pick or unmount —
  // otherwise the tab leaks a blob for every image the applicant tries.
  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = validateResidency(
      { name, age, discipline, files, statement, agreed },
      c,
    );
    setErrors(next);
    if (hasErrors(next)) {
      setShake((n) => n + 1);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={still ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="rounded-[var(--radius)] border border-[var(--teal)] border-s-4 bg-[color-mix(in_srgb,var(--teal)_10%,var(--surface))] p-6"
      >
        <h3 className="mb-2 text-[22px]">{c.doneT}</h3>
        <p className="text-[15px] leading-relaxed text-muted">
          {c.doneD}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cName" label={c.fName} error={errors.name} shake={shake}>
          <input
            id="cName"
            className={inputClass(!!errors.name)}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field id="cAge" label={c.fAge} error={errors.age} shake={shake}>
          <input
            id="cAge"
            type="number"
            min={18}
            max={30}
            inputMode="numeric"
            className={inputClass(!!errors.age)}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="cDisc"
          label={c.fDisc}
          error={errors.discipline}
          shake={shake}
        >
          <select
            id="cDisc"
            className={inputClass(!!errors.discipline)}
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            <option value="">{c.choose}</option>
            {c.disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <Field id="cIg" label={c.fIg}>
          <input
            id="cIg"
            placeholder="@"
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field id="cFiles" label={c.fFiles} error={errors.files} shake={shake}>
        <input
          ref={fileInput}
          id="cFiles"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[14px] font-semibold transition-colors hover:border-[var(--accent)] hover:text-accent"
          >
            {c.pickFiles}
          </button>
          <span className="text-[13.5px] text-muted">
            {files.length ? files.map((f) => f.name).join(", ") : c.noFiles}
          </span>
        </div>
        {previews.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {previews.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="h-20 w-20 rounded-lg border border-[var(--line)] object-cover"
              />
            ))}
          </div>
        )}
      </Field>

      <Field
        id="cStmt"
        label={c.fStmt}
        error={errors.statement}
        shake={shake}
        hint={
          <span
            className={`tnum ${
              words > 300 ? "text-accent" : "text-muted"
            }`}
          >
            {words} {c.words}
          </span>
        }
      >
        <textarea
          id="cStmt"
          className={`${inputClass(!!errors.statement)} min-h-[130px] resize-y`}
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span>{c.fRules}</span>
        </label>
        <FieldError message={errors.agreed} shake={shake} />
      </div>

      <AnimatePresence>
        <Button type="submit" className="justify-self-start">
          {c.submit}
        </Button>
      </AnimatePresence>
    </form>
  );
}
