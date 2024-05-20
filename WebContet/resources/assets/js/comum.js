var url_base = "https://api-relatorios.sumare.edu.br/api-wesell";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

function removeObjeto() {
	localStorage.clear();
}

const path_base = "http://localhost:8090/wesell-front/resources/menu";

window.addEventListener("load", function() {
	$("#menu").load(path_base + "/menu.html");
	const loader = document.querySelector(".bg-loading");
	loader.parentElement.removeChild(loader);
	$(".bg-loading").addClass("none");

	$("#menuLojista").load(path_base + "/menuLojista.html");
	const loader2 = document.querySelector(".bg-loading");
	$(".bg-loading").addClass("none");


	setTimeout(function() {
		const dataUser = JSON.parse(localStorage.getItem('usuario'))
		if (dataUser.perfil.toUpperCase() == 'FUNCIONARIO') {
			$('#hiddenMenu1').hide()
			$('#hiddenMenu2').hide()
		}

	}, 50);
	
	
	const url = window.location.pathname
	const dataUser = localStorage.getItem('usuario')
	if (url.includes('loginFuncionario') == false) {
		if (dataUser == "" || dataUser == undefined) {
			Swal.fire({
				title: "Nenhum usuário localizado, logue novamente",
				icon: "info",
			}).then(result => {
				if (result) {
					window.location.href = "loginFuncionario"
				}
			})
		}
	}

})

