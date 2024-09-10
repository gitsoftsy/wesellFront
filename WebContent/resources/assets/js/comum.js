var url_base = "https://api.we-sell.store/api-wesell";

// Definir o charset padrão para todos os scripts carregados dinamicamente
document.currentScript.charset = "UTF-8";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

function removeObjeto() {
  localStorage.clear();
}
let path_base = window.location.origin;
let path_menu = "";

let path_img = "";

if (window.location.origin.includes("localhost") > 0) {
  path_menu = path_base + "/wesell-front/resources/menu";
} else {
  path_menu = path_base + "/resources/menu";
}

window.addEventListener("load", function () {
  $("#menu").load(path_menu + "/menu.html");
  const loader = document.querySelector(".bg-loading");
  loader.parentElement.removeChild(loader);
  $(".bg-loading").addClass("none");

  $("#menuLojista").load(path_menu + "/menuLojista.html");
  const loader2 = document.querySelector(".bg-loading");
  $(".bg-loading").addClass("none");

  /*setTimeout(function() {
		const dataUser = JSON.parse(localStorage.getItem('usuario'))
		if (dataUser.perfil.toUpperCase() == 'FUNCIONARIO') {
			$('#hiddenMenu1').hide()
			$('#hiddenMenu2').hide()
		}

	}, 100);*/

  const url = window.location.pathname;
  const dataUser = JSON.parse(localStorage.getItem("usuario"));
  containerResponsivo()
  if (
    url.includes("loginFuncionario") == false &&
    url.includes("listarLojista") == false
  ) {
    if (dataUser == "" || dataUser == undefined) {
      Swal.fire({
        title: "Nenhum usuário localizado, logue novamente",
        icon: "info",
      }).then((result) => {
        if (result) {
          window.location.href = "loginFuncionario";
        }
      });
    } else {
      if (
        dataUser.perfil == "COLABORADOR" &&
        url.toLowerCase().includes("lojista") &&
        url.toLowerCase().includes("cadastrodelojista") == false
      ) {
        Swal.fire({
          title: "Nenhum usuário localizado, logue novamente",
          icon: "info",
        }).then((result) => {
          if (result) {
            window.location.href = "loginFuncionario";
          }
        });
      } else if (
        dataUser.perfil == "FUNCIONARIO" &&
        url.toLowerCase().includes("lojista") == false
      ) {
        Swal.fire({
          title: "Nenhum usuário localizado, logue novamente",
          icon: "info",
        }).then((result) => {
          if (result) {
            window.location.href = "loginFuncionario";
          }		
        });
      }
    }
  }
});

function containerResponsivo() {
	let container = $('<div>')
	container.addClass('container-table')
	container.append($('.table'))
	$("nav").before(container)
}

