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
  /*containerResponsivoNav()*/
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

function containerResponsivoNav() {
	let container = $('<div>')
	container.addClass('container-table')
	container.append($('.table'))
	$("nav").before(container)
}


function containerResponsivo() {
	let container = $('<div>')
	container.addClass('container-table')
	container.append($('.table').not('.tableNot'))
	$('#pagination').before(container)
}



function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$('#cola-tabela tr').hide();
	$('#cola-tabela tr').slice(start, end).show();
}

function toggleNavigation() {
	var totalRows = $('#cola-tabela tr').length;
	var totalPages = Math.ceil(totalRows / rows);

	$('#prev').prop('disabled', currentPage === 1);
	$('#next').prop('disabled', currentPage === totalPages);

	$('#pagination').toggle(totalRows > 0);

	$('#page-numbers').empty();

	if (totalRows > 0) {
		var startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
		var endPage = Math.min(totalPages, startPage + pagesToShow - 1);

		if (startPage > 1) {
			$('#page-numbers').append('<button class="btn btn-sm btn-page" data-page="1">1</button>');
			if (startPage > 2) {
				$('#page-numbers').append('<span>...</span>');
			}
		}

		for (var i = startPage; i <= endPage; i++) {
			var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
			$('#page-numbers').append('<button class="' + btnClass + '" data-page="' + i + '">' + i + '</button>');
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				$('#page-numbers').append('<span>...</span>');
			}
			$('#page-numbers').append('<button class="btn btn-sm btn-page" data-page="' + totalPages + '">' + totalPages + '</button>');
		}

		$('.btn-page').click(function() {
			goToPage(parseInt($(this).data('page')));

		});
	}
}


function updatePagination() {
	toggleNavigation();
}

function goToPage(page) {
	if (page >= 1 && page <= Math.ceil($('#cola-tabela tr').length / rows)) {
		currentPage = page;
		showPage(currentPage);
		updatePagination();

	}
}

$('#prev').click(function() {
	goToPage(currentPage - 1);
});

$('#next').click(function() {
	goToPage(currentPage + 1);
});


