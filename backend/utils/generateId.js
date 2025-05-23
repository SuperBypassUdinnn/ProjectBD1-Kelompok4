import { customAlphabet } from "nanoid";

// Fungsi pembuat ID dengan awalan tertentu (misalnya "A", "D", "JD", dll)
export function generateId(prefix = "", length = 4) {
  const generate = customAlphabet("0123456789", length);
  return prefix + generate();
}
