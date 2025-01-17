var url_base = "https://api.we-sell.store/api-wesell";
var rowsNew = 8;
var currentPageNew = 1;

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


var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1));

// Array de favicons para adicionar
var favicons = [
	{ rel: 'apple-touch-icon', sizes: '180x180', href: `${contextPath}/resources/assets/favicon/apple-touch-icon.png` },
	{ rel: 'icon', type: 'image/png', sizes: '32x32', href: `${contextPath}/resources/assets/favicon/favicon-32x32.png` },
	{ rel: 'icon', type: 'image/png', sizes: '16x16', href: `${contextPath}/resources/assets/favicon/favicon-16x16.png` }
];

// Loop para criar e adicionar cada favicon
$.each(favicons, function(index, favicon) {
	var link = $('<link>', {
		rel: favicon.rel,
		sizes: favicon.sizes,
		href: favicon.href
	});
	

	// Se o favicon tiver um tipo, adiciona ao link
	if (favicon.type) {
		link.attr('type', favicon.type);
	}

	// Adiciona o link ao <head> do documento
	$('head').append(link);
})


var link = $('<link>', {
		rel: "manifest",
		href: `${contextPath}/resources/assets/favicon/site.webmanifest`
	});
	
$('head').append(link)
window.addEventListener("load", function() {
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
	containerResponsivo();
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
	let container = $("<div>");
	container.addClass("container-table");
	container.append($(".table"));
	$("nav").before(container);
}

function containerResponsivo() {
	let container = $("<div>");
	container.addClass("container-table");
	container.append($(".table").not(".tableNot"));
	$("#pagination").before(container);
}

function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$("#colaTabela tr").hide();
	$("#colaTabela tr").slice(start, end).show();
}

function toggleNavigation() {
	var totalRows = $("#colaTabela tr").length;
	var totalPages = Math.ceil(totalRows / rows);


	if (totalPages > 1) {
		$("#pagination").removeAttr("hidden");
	}

	$("#prev").prop("disabled", currentPage === 1);
	$("#next").prop("disabled", currentPage === totalPages);

	$("#pagination").toggle(totalRows > 0);

	$("#page-numbers").empty();

	if (totalRows > 0) {
		var startPage = Math.max(
			1,
			Math.min(
				currentPage - Math.floor(pagesToShow / 2),
				totalPages - pagesToShow + 1
			)
		);
		var endPage = Math.min(totalPages, startPage + pagesToShow - 1);

		if (startPage > 1) {
			$("#page-numbers").append(
				'<button class="btn btn-sm btn-page" data-page="1">1</button>'
			);
			if (startPage > 2) {
				$("#page-numbers").append("<span>...</span>");
			}
		}

		for (var i = startPage; i <= endPage; i++) {
			var btnClass =
				i === currentPage
					? "btn btn-sm btn-page active-page"
					: "btn btn-sm btn-page";
			$("#page-numbers").append(
				'<button class="' +
				btnClass +
				'" data-page="' +
				i +
				'">' +
				i +
				"</button>"
			);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				$("#page-numbers").append("<span>...</span>");
			}
			$("#page-numbers").append(
				'<button class="btn btn-sm btn-page" data-page="' +
				totalPages +
				'">' +
				totalPages +
				"</button>"
			);
		}

		$(".btn-page").click(function() {
			goToPage(parseInt($(this).data("page")));
		});
	}

}

function updatePagination() {
	toggleNavigation();
}

function goToPage(page) {
	if (page >= 1 && page <= Math.ceil($("#colaTabela tr").length / rows)) {
		currentPage = page;
		showPage(currentPage);
		updatePagination();
	}
}

$("#prev").click(function() {
	goToPage(currentPage - 1);
});

$("#next").click(function() {
	goToPage(currentPage + 1);
});

// nova paginação

function showPageNew(page) {
	var start = (page - 1) * rowsNew;
	var end = start + rowsNew;

	$("#colaTabela tr").hide();
	$("#colaTabela tr").slice(start, end).show();
	toggleNavigationNew();
}

function renderPageNumbersNew() {
	var totalRows = dadosFiltrados.length;
	var totalPages = Math.ceil(totalRows / rowsNew);
	var pageNumbersHtml = "";

	if (totalPages > 1) {
		$("#pagination").removeAttr("hidden");

		var startPage = Math.max(1, currentPageNew - 1);
		var endPage = Math.min(totalPages, currentPageNew + 1);

		if (currentPageNew === 1) {
			endPage = Math.min(totalPages, 3);
		} else if (currentPageNew === totalPages) {
			startPage = Math.max(1, totalPages - 2);
		}

		if (totalPages > 1) {
			for (var i = startPage; i <= endPage; i++) {
				pageNumbersHtml +=
					'<li class="page-item ' + (i === currentPageNew ? "active" : "") + '">';
				pageNumbersHtml +=
					'<a class="page-link" href="#" data-page="' + i + '">' + i + "</a>";
				pageNumbersHtml += "</li>";
			}
		}

		$("#pagination").find("li.page-item:not(#prevB):not(#nextB)").remove();
		$("#pagination").find("li#prevB").after(pageNumbersHtml);

		$("#pagination").show();

		$("#pagination .page-link").click(function(e) {
			e.preventDefault();
			var page = $(this).data("page");
			if (page !== currentPageNew) {
				currentPageNew = page;
				showPageNew(currentPageNew);
				renderPageNumbersNew();
				toggleNavigationNew();
			}
		});
	} else {
		$("#pagination").attr("hidden", true);
	}
}

function toggleNavigationNew() {
	var totalRows = dadosFiltrados.length;
	var totalPages = Math.ceil(totalRows / rowsNew);

	if (totalRows > rowsNew) {
		$("#prevB, #nextB").show();
		$("#prevB").toggleClass("disabled", currentPageNew === 1);
		$("#nextB").toggleClass("disabled", currentPageNew === totalPages);

		$("#prevB a").click(function(e) {
			e.preventDefault();
			if (currentPageNew > 1) {
				currentPageNew--;
				showPageNew(currentPageNew);
				renderPageNumbersNew();
			}
		});

		$("#nextB a").click(function(e) {
			e.preventDefault();
			if (currentPageNew < totalPages) {
				currentPageNew++;
				showPageNew(currentPageNew);
				renderPageNumbersNew();
			}
		});
	} else {
		$("#prevB, #nextB").hide();
	}
}
$("#prevB").click(function() {
	if (currentPageNew > 1) {
		currentPageNew--;
		showPageNew(currentPageNew);
		renderPageNumbersNew();
	}
});

$("#nextB").click(function() {
	var totalRows = dadosFiltrados.length;
	var totalPages = Math.ceil(totalRows / rowsNew);

	if (currentPageNew < totalPages) {
		currentPageNew++;
		showPageNew(currentPageNew);
		renderPageNumbersNew();
	}
});
