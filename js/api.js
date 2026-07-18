const API =
"https://hacker-news.firebaseio.com/v0";


const cache = new Map();

const pendingRequests = new Map();



async function fetchRetry(url,retries=3){


for(let i=0;i<retries;i++){

try{


const r =
await fetch(url);


if(!r.ok)
throw Error();


return await r.json();


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



async function getItem(id){


if(cache.has(id))
return cache.get(id);



if(pendingRequests.has(id))
return pendingRequests.get(id);



const request =
fetchRetry(
`${API}/item/${id}.json`
)
.then(data=>{


cache.set(id,data);

pendingRequests.delete(id);

return data;


})
.catch(()=>{


pendingRequests.delete(id);

return null;


});



pendingRequests.set(id,request);


return request;


}





async function getFeed(type){

return fetchRetry(
`${API}/${type}.json`
);

}



async function getUpdates(){

return fetchRetry(
`${API}/updates.json`
);

}