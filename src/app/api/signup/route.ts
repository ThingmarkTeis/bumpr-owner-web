import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, location, villas } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await initDB();

    await pool.query(
      `INSERT INTO signups (name, email, location, villas) VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET name = $1, location = $3, villas = $4`,
      [name, email, location || null, villas || null]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
