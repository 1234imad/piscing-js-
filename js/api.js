const API =
"https://hacker-news.firebaseio.com/v0";


const cache = new Map();//cache pour stocker les reponses deja recues

const pendingRequests = new Map();//cache pour stocker les requetes en cours



async function fetchRetry(url,retries=3){


for(let i=0;i<retries;i++){

try{


const r =
await fetch(url); //envoi les requete attente la reponse

if(!r.ok)
throw Error();


return await r.json(); //attente la reponse et la transforme en json


}
catch(e){


if(i===retries-1)
throw e;


await new Promise(r=>
setTimeout(r,1000*(i+1))
);


}

}


}



async function getItem(id){//recupere un item par son id


if(cache.has(id))
return cache.get(id);



if(pendingRequests.has(id))
return pendingRequests.get(id);



const request =//Création de la requête
fetchRetry(
`${API}/item/${id}.json`
)
.then(data=>{//une fois la reponse recu on la stocke dans le cache


cache.set(id,data);

pendingRequests.delete(id);//on supprime la requete en cours

return data;


})
.catch(()=>{


pendingRequests.delete(id);

return null;


});



pendingRequests.set(id,request);//mémorise la Promise.


return request;


}





async function getFeed(type){//recupere une liste d'item par type (top, new, best) 

return fetchRetry(//récupérer une liste d'identifiants
`${API}/${type}.json`
);

}



async function getUpdates(){

return fetchRetry(
`${API}/updates.json`
);

}