import { NextResponse } from "next/server";
import { getPool, initDB } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDB();
    const result = await getPool().query("SELECT * FROM signups ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Signups fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
