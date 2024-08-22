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

  const user_id = JsonWebToken.extractUserID(token);

  const data = await context.request.json();
  if (data.type === "set") {
    if (!data.score) {
      return new Response(
        JSON.stringify({
          status: 400,
          error: "Request body does not satisfy",
        }),
        {
          status: 400,
        }
      );
    }
    const score = data.score;

    if (await writeScoreToDatabase(user_id, score, context.env)) {
      return new Response(
        JSON.stringify({
          status: 200,
          score: score,
          message: "Score Updated Successfully",
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to Update Score",
        }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(
      (await getScoreFromDatabase(user_id, context.env)).score,
      {
        status: 200,
      }
    );
  }
}

// return score object from database
async function getScoreFromDatabase(user_id, env) {
  const query = "Select score FROM users WHERE user_id = ?1";
  const exec = env.DB.prepare(query).bind(user_id).first();
  return exec;
}

// score setter function
async function writeScoreToDatabase(user_id, score, env) {
  const query = "UPDATE users SET score = ?1 WHERE user_id = ?2";
  const exec = await env.DB.prepare(query).bind(score, user_id).run();
  return exec.success;
}
