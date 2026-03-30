import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const POINTS_PER_DOLLAR = 1000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const pointsToConvert = body?.points;

    if (!pointsToConvert || typeof pointsToConvert !== "number" || pointsToConvert < POINTS_PER_DOLLAR || pointsToConvert % POINTS_PER_DOLLAR !== 0) {
      return new Response(
        JSON.stringify({ error: `Points must be a multiple of ${POINTS_PER_DOLLAR}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("points, balance")
      .eq("user_id", user.id)
      .single();

    if (!profile || profile.points < pointsToConvert) {
      return new Response(
        JSON.stringify({ error: "Insufficient points" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dollarsEarned = pointsToConvert / POINTS_PER_DOLLAR;

    // Deduct points, add balance
    await supabase
      .from("profiles")
      .update({
        points: profile.points - pointsToConvert,
        balance: Number(profile.balance) + dollarsEarned,
        lifetime_earnings: Number(profile.balance) + dollarsEarned,
      })
      .eq("user_id", user.id);

    // Record transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      amount: dollarsEarned,
      type: "points_conversion",
      description: `Converted ${pointsToConvert} points to $${dollarsEarned.toFixed(2)}`,
      status: "completed",
    });

    return new Response(
      JSON.stringify({
        success: true,
        points_converted: pointsToConvert,
        dollars_earned: dollarsEarned,
        remaining_points: profile.points - pointsToConvert,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
