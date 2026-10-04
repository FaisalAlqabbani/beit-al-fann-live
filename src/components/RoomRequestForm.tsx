"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { getCopy } from "@/data";
import type { Locale } from "@/lib/i18n";
import {
  SPACE_CAPS,
  hasErrors,
  validateRequest,
  type RequestErrors,
} from "@/lib/validation";
import { Button } from "./ui";
import { Field, inputClass } from "./Field";

function Tracker({ steps, active }: { steps: string[]; active: number }) {
  const still = useReducedMotion();
  return (
    <ol className="m-0 flex list-none items-center gap-0 p-0">
      {steps.map((s, i) => {
        const done = i <= active;
        return (
          <li key={s} className="flex flex-1 items-center gap-2 last:flex-none">
            <div className="flex items-center gap-2">
              <motion.span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12.5px] font-bold"
                animate={{
                  backgroundColor: done ? "var(--teal)" : "var(--surface-2)",
                  color: done ? "#f2fbf8" : "var(--muted)",
                }}
                transition={{ delay: still ? 0 : i * 0.22 }}
              >
                {i + 1}
              </motion.span>
              <span
                className={`whitespace-nowrap text-[13px] ${
                  done ? "font-semibold" : "text-muted"
                }`}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-1 h-[2px] flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <motion.div
                  className="h-full bg-[var(--teal)]"
                  initial={{ width: 0 }}
                  animate={{ width: i < active ? "100%" : 0 }}
                  transition={{ duration: 0.4, delay: still ? 0 : i * 0.22 + 0.1 }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function RoomRequestForm({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const still = useReducedMotion();

  const [name, setName] = useState("");
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [teach, setTeach] = useState("");
  const [errors, setErrors] = useState<RequestErrors>({});
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = validateRequest(
      { name, spaceIndex, date, people, teach },
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
        className="grid gap-5 rounded-[var(--radius)] border border-s-4 border-[var(--teal)] bg-[color-mix(in_srgb,var(--teal)_10%,var(--surface))] p-6"
      >
        <div>
          <h3 className="mb-2 text-[22px]">{c.reqT}</h3>
          <p className="text-[15px] leading-relaxed text-muted">
            {c.reqD}
          </p>
        </div>
        <Tracker steps={c.steps} active={2} />
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6">
      <Tracker steps={c.steps} active={0} />

      <form onSubmit={submit} noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="bName" label={c.fGroup} error={errors.name} shake={shake}>
            <input
              id="bName"
              className={inputClass(!!errors.name)}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field id="bSpace" label={c.fSpaceSel}>
            <select
              id="bSpace"
              className={inputClass(false)}
              value={spaceIndex}
              onChange={(e) => setSpaceIndex(Number(e.target.value))}
            >
              {c.spaces.map((s, i) => (
                <option key={s} value={i}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="bDate" label={c.fDate} error={errors.date} shake={shake}>
            <input
              id="bDate"
              type="date"
              className={inputClass(!!errors.date)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>

          <Field
            id="bPeople"
            label={c.fPeople}
            error={errors.people}
            shake={shake}
            hint={
              <span className="tnum text-muted">
                max {SPACE_CAPS[spaceIndex]}
              </span>
            }
          >
            <input
              id="bPeople"
              type="number"
              min={1}
              max={SPACE_CAPS[spaceIndex]}
              inputMode="numeric"
              className={inputClass(!!errors.people)}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </Field>
        </div>

        <Field id="bWhat" label={c.fWhat}>
          <textarea
            id="bWhat"
            className={`${inputClass(false)} min-h-[110px] resize-y`}
            value={teach}
            onChange={(e) => setTeach(e.target.value)}
          />
        </Field>

        <Button type="submit" className="justify-self-start">
          {c.sendReq}
        </Button>
      </form>
    </div>
  );
}
