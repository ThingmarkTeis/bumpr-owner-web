import { NextResponse } from "next/server";
import { getSQL, initDB } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDB();
    const sql = getSQL();
    const rows = await sql`SELECT * FROM signups ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Signups fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
