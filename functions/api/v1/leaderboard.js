import { JsonWebToken } from "./token";

export async function onRequest(context) {
  const token = JsonWebToken.extractToken(context.request);

  if (!JsonWebToken.verify(token, context.env.JWT_SECRET)) {
    return new Response(
      JSON.stringify({
        status: 401,
        error: "UnAuthorized",
      }),
      {
        status: 401,
      }
    );
  }

  //   const user_id = JsonWebToken.extractUserID(token);

  const leaderBoard = await getTopTen(context.env);
  return new Response(
    JSON.stringify({
      status: 200,
      result: JSON.stringify(leaderBoard),
    }),
    {
      status: 200,
    }
  );
}

async function getTopTen(env) {
  const query =
    "Select user_name,score FROM users ORDER BY score DESC LIMIT 10";
  const exec = await env.DB.prepare(query).run();
  return exec.results;
}
