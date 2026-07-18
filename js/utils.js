function escapeHTML(text){

if(!text)
return "";

const div=document.createElement("div");

div.textContent=text;

return div.innerHTML;

}



function formatTime(timestamp){

if(!timestamp)
return "";

return new Date(timestamp*1000)
.toLocaleString();

}



function showLoading(){

document.getElementById("loader")
.textContent="Loading...";

}



function hideLoading(){

document.getElementById("loader")
.textContent="";

}



function showEmpty(){

document.getElementById("status")
.textContent="No more posts";

}



function showError(msg){

document.getElementById("status")
.textContent=msg;

}



function toast(msg){

const box=
document.getElementById("toast");

box.textContent=msg;

box.style.display="block";


setTimeout(()=>{

box.style.display="none";

},3000);

}