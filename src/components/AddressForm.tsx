"use client";
import { useState } from "react";
import { STATES, validateAddress, type Address } from "@/data/address";

type Draft = Omit<Address, "id">;
const EMPTY: Draft = { name: "", street: "", city: "", state: "", zip: "" };

export function AddressForm({ initial, submitLabel, onSave, onCancel, prefix = "address" }: {
  initial?: Draft; submitLabel: string; onSave: (a: Draft) => void; onCancel?: () => void; prefix?: string;
}) {
  const [a, setA] = useState<Draft>(initial ?? EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setA({ ...a, [k]: e.target.value });
  const field = (k: keyof Draft, label: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <label className="field">
      <span>{label}</span>
      <input value={a[k]} onChange={set(k)} data-testid={`${prefix}-${k}`} aria-invalid={!!errors[k]} {...extra} />
      {errors[k] ? <small className="err" data-testid={`${prefix}-${k}-error`}>{errors[k]}</small> : null}
    </label>
  );
  return (
    <div className="stack" data-testid={`${prefix}-form`}>
      {field("name", "Full name", { autoComplete: "name" })}
      {field("street", "Street address", { autoComplete: "street-address" })}
      <div className="three">
        {field("city", "City")}
        <label className="field">
          <span>State</span>
          <select value={a.state} onChange={set("state")} data-testid={`${prefix}-state`} aria-invalid={!!errors.state}>
            <option value="">Choose…</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state ? <small className="err" data-testid={`${prefix}-state-error`}>{errors.state}</small> : null}
        </label>
        {field("zip", "ZIP code", { inputMode: "numeric", maxLength: 5 })}
      </div>
      <div className="actions">
        <button
          type="button" className="btn" data-testid={`${prefix}-save`}
          onClick={() => {
            const e = validateAddress(a);
            setErrors(e);
            if (Object.keys(e).length === 0) onSave({ ...a, name: a.name.trim(), street: a.street.trim(), city: a.city.trim() });
          }}
        >
          {submitLabel}
        </button>
        {onCancel ? <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button> : null}
      </div>
    </div>
  );
}
