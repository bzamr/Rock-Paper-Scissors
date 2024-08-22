import { JsonWebToken } from "./token";

export async function onRequest(context) {
  try {
    let token = JsonWebToken.extractToken(context.request);
    if (!token) {
      return new Response(
        JSON.stringify({
          status: 401,
          message: "Unauthorized",
        }),
        {
          status: 401,
        }
      );
    }

    //if token valid remove it from user browser
    if (JsonWebToken.verify(token, context.env.JWT_SECRET)) {
      return new Response(
        JSON.stringify({
          status: 200,
          message: "User Loged out Successfully.",
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 401,
          message: "Unauthorized",
        }),
        {
          status: 401,
        }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Failed to Logout.",
      }),
      {
        status: 500,
      }
    );
  }
}

export function verify_token(token, env) {}
