"use client";
import type { ReactNode } from "react";

export function AutoSubmitSelect(props: { name: string; defaultValue: string; label: string; testid: string; children: ReactNode }) {
  return (
    <select
      name={props.name}
      defaultValue={props.defaultValue}
      aria-label={props.label}
      data-testid={props.testid}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      {props.children}
    </select>
  );
}
