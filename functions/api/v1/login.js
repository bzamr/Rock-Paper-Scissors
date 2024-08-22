import crypto from "node:crypto";
import { JsonWebToken } from "./token";

export async function onRequest(context) {
  try {
    const user = await checkEmailAndPassword(
      await context.request.formData(),
      context.env
    );

    if (!user) {
      // return unauthorized if password or email not match
      return new Response(
        JSON.stringify({
          status: 401,
          error: "Invalid Password or Email. Please Try again!",
        }),
        {
          status: 401,
        }
      );
    }

    const payload = {
      user_id: user.user_id,
      user_name: user.user_name,
      exp: "1",
    };

    const token = JsonWebToken.generateToken(
      "HS256",
      payload,
      context.env.JWT_SECRET
    );

    return new Response(
      JSON.stringify({
        status: 200,
        message: "User Logined Succesfully.",
        token: token,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Login Failed.",
      }),
      {
        status: 500,
      }
    );
  }
}

// return user if password match
export async function checkEmailAndPassword(data, env) {
  const email = data.get("email");
  let password = data.get("password");
  password = crypto.createHash("sha256").update(password).digest("hex");

  const query =
    "SELECT * FROM users WHERE email_address = ?1 AND password = ?2";

  // if not find in db return null
  const exec = await env.DB.prepare(query).bind(email, password).first();
  return exec;
}
