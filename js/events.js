function initEvents(){


document
.querySelectorAll(
"button[data-feed]"
)
.forEach(btn=>{


btn.onclick=()=>{


loadFeed(
btn.dataset.feed
);


};


});



const show=
document.getElementById(
"showNew"
);



if(show){

show.onclick=
showNewPosts;

}



initInfiniteScroll();


}