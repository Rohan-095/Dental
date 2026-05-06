import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date");

  let query = getSupabaseAdmin()
    .from("appointments")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (status) query = query.eq("status", status);
  if (date) query = query.eq("date", date);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function PATCH(req) {
  const { id, status, notes } = await req.json();
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const { data, error } = await getSupabaseAdmin()
    .from("appointments")
    .update({ status, notes })
    .eq("id", id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
