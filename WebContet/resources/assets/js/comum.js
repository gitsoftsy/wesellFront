var url_base = "https://api-relatorios.sumare.edu.br/api-wesell";

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

function removeObjeto(){
	localStorage.clear();
}

const path_base="http://localhost:8090/wesell-front/resources/menu";
 
window.addEventListener("load", function() {
	$("#menu").load(path_base+"/menu.html" );
    const loader = document.querySelector(".bg-loading");
    loader.parentElement.removeChild(loader);
    $(".bg-loading").addClass("none");
})