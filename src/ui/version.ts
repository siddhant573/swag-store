// Booth heal demo switch. v1 is the baseline; v2 renames "Place order" and moves the promo field.
// It never touches pricing. Set UI_VERSION=v2 to switch.
export type UiVersion = "v1" | "v2";

export function uiVersion(): UiVersion {
  return process.env.UI_VERSION === "v2" ? "v2" : "v1";
}
