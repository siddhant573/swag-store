import { cookies } from "next/headers";

export const SESSION_COOKIE = "swag_session";
export const DEMO_USER = "octo-demo";
export const DEMO_PASSWORD = "universe-2026";

export async function currentUser(): Promise<string | null> {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}
