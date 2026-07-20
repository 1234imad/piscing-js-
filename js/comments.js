async function loadComments(post,container){


container.innerHTML="Loading comments...";


if(!post.kids || !post.kids.length){

container.innerHTML="No comments";//No comments to display

return;

}



const comments =
await Promise.all(
post.kids.map(getItem)//Télécharger tous les commentaires
);

container.innerHTML="";

comments
.filter(Boolean)
.sort(
(a,b)=>b.time-a.time//Trier par date de création
)
.forEach(comment=>{//Afficher chaque commentaire


renderComment(
comment,
container,
0
);


});


}





async function renderComment(
    //affiche un commentaire puis pourra afficher ses réponses
comment,
container,
level //gestion de l'indentation des réponses
){


if(!comment || comment.deleted)//Si le commentaire est supprimé on ne l'affiche pas
return;



const box=document.createElement("div");


box.className="comment";


box.style.marginLeft =
(level*20)+"px";



box.innerHTML=`

<div class="comment-author">

${escapeHTML(comment.by || "deleted")}

-
${formatTime(comment.time)}//ransforme un timestamp en date lisible

</div>


<div class="comment-text">

${escapeHTML(comment.text || "")}

</div>


<button class="reply">

Replies (${comment.kids?.length || 0})

</button>


<div class="children hidden"></div>

`;



container.append(box);//Ajoute le commentaire au dom



const button=
box.querySelector(".reply");


const children=
box.querySelector(".children");



if(comment.kids && comment.kids.length){


button.onclick=async()=>{


children.classList.toggle("hidden");//Afficher ou cacher les réponses



if(!children.dataset.loaded){



const replies=
await Promise.all(
comment.kids.map(getItem)//Télécharger tous les commentaires
);



replies
.filter(Boolean)
.sort(
(a,b)=>b.time-a.time//Trier par date de création
)
.forEach(reply=>{


renderComment(
reply,
children,//Afficher la réponse
level+1
);


});



children.dataset.loaded=true;//Marquer les réponses comme chargées


}


};



}
else{

button.style.display="none";//Si le commentaire n'a pas de réponses, on cache le bouton

}


}