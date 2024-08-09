import crypto from 'node:crypto';

export async function onRequest(context) {

    try{
        
        const user = await check_email_and_password(await context.request.formData(),context.env);

        if(!user){
            // return unauthorized if password or email not match
            return new Response(JSON.stringify({
                status: 401,
                error : "Invalid Password or Email. Please Try again!",
            })
            ,{
                status: 401,
            })

        }

        const payload = {
            "user_id" : user.user_id,
            "user_name": user.user_name,
            "exp": "1h"
        };

        const token = generate_jwts_token(payload,context.env);

        return new Response(JSON.stringify({
            status: 200,
            message: "User Logined Succesfully.",
        }),
        {
            status: 200,
            headers: {
                "Set-Cookie": `__token__=${token}; Max-Age=${1*60*60};Secure; HttpOnly`,
            }
        });


    }catch(err){
        
        return new Response(JSON.stringify({
            "status": 500,
            "error": "Login Failed.",
        }),{
            status: 500
        });
    }
    
}

// return user if password match 
export async function check_email_and_password(data,env){
    const email = data.get("email");
    let password = data.get("password");
    password = crypto.createHash("sha256").update(password).digest("hex");

    const query = 'SELECT * FROM users WHERE email_address = ?1 AND password = ?2';

    // if not find in db return null
    const exec = await env.DB.prepare(query).bind(email,password).first();
    return exec;
}

// generate JWT token from given payload 
export function generate_jwts_token(payload,env) {
    const header  = {
        "alg": "HS256",
        "typ": "JWT"
    };
    const header_part = btoa(JSON.stringify(header));
    const payload_part = btoa(JSON.stringify(payload)).split("=")[0];
    const signiture_part = generate_signiture(header_part,payload_part,env.JWT_SECRET)
    return (header_part+'.' + payload_part+'.'+signiture_part);
}

// sign the payload with the key and return base64url encoded of signiture
export function generate_signiture(header,payload,secret){
    return crypto.createHmac("sha256",secret).update(header+'.'+payload).digest("base64url").split("=")[0];
}