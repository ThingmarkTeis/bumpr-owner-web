import { NextResponse } from "next/server";
import { getSQL, initDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, location, villas } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await initDB();
    const sql = getSQL();

    await sql`
      INSERT INTO signups (name, email, location, villas)
      VALUES (${name}, ${email}, ${location || null}, ${villas || null})
      ON CONFLICT (email) DO UPDATE SET name = ${name}, location = ${location || null}, villas = ${villas || null}
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
