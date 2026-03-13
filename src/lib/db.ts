import postgres from "postgres";

let sql: ReturnType<typeof postgres>;

function getSQL() {
  if (!sql) {
    sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
  }
  return sql;
}

export async function initDB() {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS signups (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      location TEXT,
      villas TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export { getSQL };
