async function loadComments(post,container){


container.innerHTML="Loading comments...";



if(!post.kids || !post.kids.length){

container.innerHTML="No comments";

return;

}



const comments =
await Promise.all(
post.kids.map(getItem)
);



container.innerHTML="";



comments
.filter(Boolean)
.sort(
(a,b)=>b.time-a.time
)
.forEach(comment=>{


renderComment(
comment,
container,
0
);


});


}





async function renderComment(
comment,
container,
level
){


if(!comment || comment.deleted)
return;



const box=document.createElement("div");


box.className="comment";


box.style.marginLeft =
(level*20)+"px";



box.innerHTML=`

<div class="comment-author">

${escapeHTML(comment.by || "deleted")}

-
${formatTime(comment.time)}

</div>


<div class="comment-text">

${escapeHTML(comment.text || "")}

</div>


<button class="reply">

Replies (${comment.kids?.length || 0})

</button>


<div class="children hidden"></div>

`;



container.append(box);



const button=
box.querySelector(".reply");


const children=
box.querySelector(".children");



if(comment.kids && comment.kids.length){


button.onclick=async()=>{


children.classList.toggle("hidden");



if(!children.dataset.loaded){



const replies=
await Promise.all(
comment.kids.map(getItem)
);



replies
.filter(Boolean)
.sort(
(a,b)=>b.time-a.time
)
.forEach(reply=>{


renderComment(
reply,
children,
level+1
);


});



children.dataset.loaded=true;


}


};



}
else{

button.style.display="none";

}


}