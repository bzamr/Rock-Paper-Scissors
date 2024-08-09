export async function sync_score(type) {
    let score = {};
    if(type==="set"){
        score = {
            type: type,
            score: localStorage.getItem("score"),
            modified_at: Date.now()
        }
    }else{
        score = {
            type: type,
        }
    }
    const response = await fetch("/api/v1/score",{
        body: JSON.stringify(score),
        method: "POST",
    });
    try{
        const r_json = await response.json();
        if(type==="get"){
            localStorage.setItem("score",r_json.score)
        }
    }catch(err){
        console.log(err);
    }

}