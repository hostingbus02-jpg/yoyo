import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}

export function getSession() {
  const cookieStore = cookies();
  return cookieStore.get("auth")?.value || null;
}

export function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete("auth");
}
