let currentPosts=[];

let displayed=0;

const PAGE_SIZE=10;

let loading=false;



async function loadFeed(type="newstories"){


try{


const ids=
await getFeed(type);



const posts=
await Promise.all(
ids.slice(0,100).map(getItem)
);



currentPosts=
posts
.filter(Boolean)
.sort(
(a,b)=>b.time-a.time
);



displayed=0;



document
.getElementById("feed")
.innerHTML="";



loadMore();


}

catch(e){

showError(
"Cannot load feed"
);


}


}






function loadMore(){


if(loading)
return;


loading=true;



const posts=
currentPosts.slice(
displayed,
displayed+PAGE_SIZE
);



if(!posts.length){

showEmpty();

loading=false;

return;

}



posts.forEach(renderPost);



displayed+=PAGE_SIZE;


loading=false;


}




function initInfiniteScroll(){


const loader=
document.getElementById("loader");



const observer=
new IntersectionObserver(
entries=>{


if(entries[0].isIntersecting){

loadMore();

}


},
{
rootMargin:"300px"
}
);



observer.observe(loader);


}