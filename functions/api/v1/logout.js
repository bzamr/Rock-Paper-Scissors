import { generate_signiture } from "./login";

export async function onRequest(context) {

    try {

        let token = context.request.headers.get("Cookie");
        if (!token){
            return new Response(JSON.stringify({
                status: 401,
                "message": "Unauthorized",
            }),{
                status: 401
            });
        }else{
            token = token.split("=")[1];
        }


        //if token valid remove it from user browser
        if (verify_token(token,context.env)){
            
            return new Response(JSON.stringify({
                status: 200,
                "message": "User Loged out Successfully.",
            }),
            {
                status: 200,
                headers:{
                    "Set-Cookie": `__token__=${token}; Max-Age=0; Secure; HttpOnly`,
                }
            });

        }else {
            return new Response(JSON.stringify({
                status: 401,
                "message": "Unauthorized",
            }),{
                status: 401
            });
        }
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({
            status: 500,
            "error": "Failed to Logout.",
        }),{
            status: 500
        });
    }
    
}


export function verify_token(token,env){
    const [header,payload,signiture] = token.split(".");
    if (signiture ===  generate_signiture(header,payload,env.JWT_SECRET))
    {
        return true;
    }else {
        return false;
    }
}