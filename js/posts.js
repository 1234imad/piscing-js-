function renderPost(post){


const article=
document.createElement("article");


article.className="card";


let content="";



let count =
post.descendants ||
(post.kids ? post.kids.length : 0);



if(post.type==="story"){


content=`

<span class="badge">
STORY
</span>

<h3>

${
post.url
?
`<a href="${post.url}" target="_blank">
${escapeHTML(post.title)}
</a>`
:
escapeHTML(post.title)
}

</h3>


<div class="meta">

${post.score||0} points |

${post.by||"unknown"} |

${formatTime(post.time)} |

${count} comments

</div>

`;



}



else if(post.type==="job"){


content=`

<span class="badge">
JOB
</span>

<h3>
${escapeHTML(post.title)}
</h3>


<div class="meta">

${post.by||"unknown"}

|

${formatTime(post.time)}

</div>


<p>
${escapeHTML(post.text||"")}
</p>

`;



}



else if(post.type==="poll"){


content=`

<span class="badge">
POLL
</span>


<h3>
${escapeHTML(post.title)}
</h3>


<div id="poll-${post.id}">
Loading options...
</div>

`;



loadPollOptions(post);


}




article.innerHTML=
content+`

<button class="comments-button">

Comments (${count})

</button>


<div class="comments hidden"></div>

`;



const btn=
article.querySelector(".comments-button");


const comments=
article.querySelector(".comments");



btn.onclick=()=>{


comments.classList.toggle("hidden");


if(!comments.dataset.loaded){

loadComments(
post,
comments
);


comments.dataset.loaded=true;

}


};



document
.getElementById("feed")
.append(article);


}





async function loadPollOptions(post){


if(!post.parts)
return;


const options=
await Promise.all(
post.parts.map(getItem)
);



const box=
document.getElementById(
`poll-${post.id}`
);



if(!box)
return;


box.innerHTML="";


options
.filter(Boolean)
.forEach(o=>{


const div=
document.createElement("div");


div.className="poll-option";


div.textContent=
`${o.text} - ${o.score||0} votes`;


box.append(div);


});


}