var url_base = "http://localhost:8080/wesell";

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

window.addEventListener("load", function() {
    const loader = document.querySelector(".bg-loading");
    loader.parentElement.removeChild(loader);
    $(".bg-loading").addClass("none");
});

function removeObjeto(){
	localStorage.clear();
}