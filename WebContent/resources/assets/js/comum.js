var url_base = "http://ec2-18-235-243-90.compute-1.amazonaws.com:8080/api-wesell";

// Definir o charset padrão para todos os scripts carregados dinamicamente
document.currentScript.charset = 'UTF-8';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

function removeObjeto() {
	localStorage.clear();
}
 const path_base = "http://localhost:8090/wesell-front/resources/menu";

//const path_base = "http://ec2-34-203-201-76.compute-1.amazonaws.com:8080/wesell-front/resources/menu";

window.addEventListener("load", function() {
	$("#menu").load(path_base + "/menu.html");
	const loader = document.querySelector(".bg-loading");
	loader.parentElement.removeChild(loader);
	$(".bg-loading").addClass("none");

	$("#menuLojista").load(path_base + "/menuLojista.html");
	const loader2 = document.querySelector(".bg-loading");
	$(".bg-loading").addClass("none");


	/*setTimeout(function() {
		const dataUser = JSON.parse(localStorage.getItem('usuario'))
		if (dataUser.perfil.toUpperCase() == 'FUNCIONARIO') {
			$('#hiddenMenu1').hide()
			$('#hiddenMenu2').hide()
		}

	}, 100);*/
	
	
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

