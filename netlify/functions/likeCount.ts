import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

// 1. 初始化 supabase 客户端
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// 2. Netlify Functions handler
const handler: Handler = async (event) => {
  const page = "home";

  if (event.httpMethod === "GET") {
    const { data, error } = await supabase
      .from("likes")
      .select("count")
      .eq("id", page)
      .maybeSingle();

    return {
      statusCode: 200,
      body: JSON.stringify({ count: data?.count ?? 0, error }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (event.httpMethod === "POST") {
    const { data, error } = await supabase.rpc("increment_like", {
      page_id: page,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ count: data, error }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 405,
    body: "Method not allowed",
  };
};

export { handler };
