import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const POINTS_PER_VIDEO = 10;
const COOLDOWN_SECONDS = 60; // 1 minute between rewards

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate JWT
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

    // Verify user token
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
    const videoId = body?.video_id;

    if (!videoId || typeof videoId !== "string" || videoId.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid video_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Rate limit: check last watch time
    const cooldownTime = new Date(Date.now() - COOLDOWN_SECONDS * 1000).toISOString();
    const { data: recentWatch } = await supabase
      .from("video_watches")
      .select("id, created_at")
      .eq("user_id", user.id)
      .gte("created_at", cooldownTime)
      .order("created_at", { ascending: false })
      .limit(1);

    if (recentWatch && recentWatch.length > 0) {
      const lastWatch = new Date(recentWatch[0].created_at).getTime();
      const remainingMs = (COOLDOWN_SECONDS * 1000) - (Date.now() - lastWatch);
      const remainingSec = Math.ceil(remainingMs / 1000);
      return new Response(
        JSON.stringify({
          error: "rate_limited",
          message: `Please wait ${remainingSec} seconds`,
          remaining_seconds: remainingSec,
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Record the watch
    const { error: insertError } = await supabase
      .from("video_watches")
      .insert({
        user_id: user.id,
        video_id: videoId,
        points_earned: POINTS_PER_VIDEO,
      });

    if (insertError) {
      return new Response(JSON.stringify({ error: "Failed to record watch" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update user points
    const { data: profile } = await supabase
      .from("profiles")
      .select("points")
      .eq("user_id", user.id)
      .single();

    const newPoints = (profile?.points || 0) + POINTS_PER_VIDEO;
    await supabase
      .from("profiles")
      .update({ points: newPoints })
      .eq("user_id", user.id);

    // Also create a transaction record
    await supabase.from("transactions").insert({
      user_id: user.id,
      amount: 0,
      type: "video_watch",
      description: `Earned ${POINTS_PER_VIDEO} points from video`,
      status: "completed",
    });

    return new Response(
      JSON.stringify({
        success: true,
        points_earned: POINTS_PER_VIDEO,
        total_points: newPoints,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
