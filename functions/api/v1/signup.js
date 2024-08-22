import crypto from "node:crypto";

export async function onRequest(context) {
  try {
    const user = createUser(await context.request.formData());
    const exist = await userExist(user, context.env);

    if (exist) {
      // return bad request
      return new Response(
        JSON.stringify({
          status: 400,
          message: "User already exists with same email.",
        }),
        {
          status: 400,
        }
      );
    } else {
      // if can't add to db throw error
      await addUserToDB(user, context.env);
      // else return success response
      return new Response(
        JSON.stringify({
          status: 201,
          message: "User registered successfully",
        }),
        {
          status: 201,
        }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: err,
      }),
      {
        status: 500,
      }
    );
  }
}

// create user object from form data
function createUser(data) {
  const email = data.get("email");
  const full_name = data.get("fullname");
  const password = data.get("password");
  const user_id = crypto.randomUUID();
  const score = data.get("score");
  const preferences = data.get("preferences");

  if (!(email && password && score && preferences && full_name)) {
    throw "error: Provided form not satisfy all of requirement for creating user object";
  }

  // for security porpose we store password hash instead of password itself
  const user = {
    user_id: user_id,
    user_name: full_name,
    user_type: "Player",
    email_address: email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
    created_at: Date.now(),
    preferences: preferences,
    score: score,
  };

  return user;
}

// add user's proprety to database
async function addUserToDB(user, env) {
  const q =
    "INSERT INTO users (user_id, user_name, user_type, email_address, password, created_at, preferences, score) VALUES (?1,?2,?3,?4,?5,?6,?7,?8)";
  const exec = await env.DB.prepare(q)
    .bind(
      user.user_id,
      user.user_name,
      user.user_type,
      user.email_address,
      user.password,
      user.created_at,
      user.preferences,
      user.score
    )
    .run();

  if (!exec.success) {
    throw "DB: error while adding user";
  }
}

// return true if user exist in database
export async function userExist(user, env) {
  const query = "SELECT * FROM users WHERE email_address = ?1";

  // if not find in db return null
  const exec = await env.DB.prepare(query).bind(user.email_address).first();
  return exec ? true : false;
}
