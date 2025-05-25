import db from "../db.js";

// prefix: string, table: string, field: string, digit: number
export async function generateAutoIncId(prefix, table, field, digit = 4) {
  // Query ID terakhir dengan prefix
  const [rows] = await db.query(
    `SELECT ${field} FROM ${table} WHERE ${field} LIKE ? ORDER BY ${field} DESC LIMIT 1`,
    [`${prefix}%`]
  );
  let nextNumber = 1;
  if (rows.length > 0) {
    // Ambil angka dari ID terakhir, misal JD0007 -> 7
    const lastId = rows[0][field];
    const num = parseInt(lastId.replace(prefix, ""), 10);
    nextNumber = num + 1;
  }
  // Padding nol di depan
  const padded = String(nextNumber).padStart(digit, "0");
  return prefix + padded;
}
