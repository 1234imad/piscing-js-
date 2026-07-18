let newPosts=[];



async function checkUpdates(){


try{


const data=
await getUpdates();



const ids=
data.items;



const fresh=[];



for(const id of ids){


if(!cache.has(id)){


fresh.push(id);


}


}



if(fresh.length){


newPosts=
[
...new Set(
[
...newPosts,
...fresh
]
)
];



document
.getElementById("liveText")
.textContent=
`${newPosts.length} new posts`;



document
.getElementById("liveBox")
.classList
.remove("hidden");



toast(
"New Hacker News updates"
);


}


}
catch(e){

console.log(e);

}


}





async function showNewPosts(){


const posts=
await Promise.all(
newPosts.map(getItem)
);



posts
.filter(Boolean)
.sort(
(a,b)=>b.time-a.time
)
.forEach(renderPost);



newPosts=[];



document
.getElementById("liveBox")
.classList
.add("hidden");


}





function startRealtime(){


setInterval(
checkUpdates,
5000
);


}