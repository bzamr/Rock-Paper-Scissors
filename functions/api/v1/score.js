import { verify_token } from "./logout";

export async function onRequest(context) {
    const token = context.request.headers.get("Cookie").split("=")[1];
        if(!verify_token(token,context.env)){
            return new Response(JSON.stringify({
                status: 401,
                error: "UnAuthorized",
            }),{
                status: 401,
            })
        }

    const user_id = JSON.parse(atob(context.request.headers.get("Cookie").split("=")[1].split(".")[1])).user_id;
    const data = await context.request.json();
    if(data.type === "set"){
        if(!(data.score && data.modified_at)) {
            return new Response(JSON.stringify({
                status: 400,
                error: "Request body does not satisfy",
            }),{
                status: 400,
            })
        }
        const score = {
            "score" : data.score,
            "modified_at" : data.modified_at
        }
        console.log(score);
        if(await set_score(user_id,score,context.env)){
            
            return new Response(JSON.stringify({
                status: 200,
                message: "Score Updated Successfully"
            }),{
                status: 200
            });
        }else{
            return new Response(JSON.stringify({
                status: 500,
                message: "Failed to Update Score",
            }),{
                status: 500
            }); 
        }
    }else
    {
        return new Response((await get_score(user_id,context.env)).score,{
            status: 200
        }); 
    }

}

// return score object from database
async function get_score(user_id,env) {
    const query = 'Select score FROM users WHERE user_id = ?1';
    const exec = env.DB.prepare(query).bind(user_id).first();
    return exec;
}

// score setter function
async function set_score(user_id,score,env) {
    const query = 'UPDATE users SET score = ?1 WHERE user_id = ?2';
    const exec = await env.DB.prepare(query).bind(JSON.stringify(score),user_id).run();
    return exec.success;
}
