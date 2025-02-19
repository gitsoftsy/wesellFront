var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var produto = []
var user = localStorage.getItem("usuario");
var lojista = JSON.parse(user);
const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");

/*botaoDesativa.addEventListener('click', () => {
  elemento.classList.add('animar-sair');
 elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
  elemento.classList.add('animar-entrar');
  elemento.classList.remove('animar-sair');
  });*/

var user = localStorage.getItem("usuario");
var usuario = JSON.parse(user);

$("#usuarioNome").text(usuario.nome);

var produto = [];
var imge = [];

$(document).ready(function() {



	function base64ToCSVAndDownload(base64String, fileName) {
		// Decodifica a string Base64 para obter os dados binários
		var binaryString = atob(base64String);
		var bytes = new Uint8Array(binaryString.length);
		for (var i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}

		// Cria um blob com os dados binários
		var blob = new Blob([bytes], { type: "text/csv" });

		// Cria um URL temporário para o blob
		var url = window.URL.createObjectURL(blob);

		// Cria um link de download com o URL temporário
		var a = document.createElement("a");
		a.href = url;
		a.download = fileName; // Define o nome do arquivo para download
		document.body.appendChild(a);

		// Simula um clique no link para iniciar o download
		a.click();

		// Libera o URL temporário
		window.URL.revokeObjectURL(url);
	}

	$("#fileExcel").on("change", function(event) {
		var file = event.target.files[0];

		if (file) {
			var reader = new FileReader();

			reader.onload = function(e) {
				var arrayBuffer = e.target.result;
				var base64Content = arrayBufferToBase64(arrayBuffer);

				$("#base64Output").text(base64Content);
				console.log(base64Content);
				// Exemplo de uso:
				var fileName = "teste.csv"; // Nome do arquivo CSV
				base64ToCSVAndDownload(base64Content, fileName);
			};

			reader.onerror = function(e) {
				console.error("Erro ao ler o arquivo:", e);
			};

			reader.readAsArrayBuffer(file);
		}
	});

	function arrayBufferToBase64(buffer) {
		var bytes = new Uint8Array(buffer);
		var binary = "";
		for (var i = 0; i < bytes.byteLength; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	}



	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});
	getDados()
	updatePagination(produto);
})


$("#form-filtro").on("submit", function(e) {

	e.preventDefault();

	Swal.fire({
		title: 'Carregando...',
		text: 'Por favor, aguarde.',
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: false,
		onOpen: () => {
			Swal.showLoading(); // Exibe o spinner de carregamento
		}
	});

	var valorBusca = $("#inputBusca").val();



	console.log(valorBusca)
	console.log(usuario.lojistaId)

	$.ajax({
		url: url_base + "/produtos/produtoPorNome/" + valorBusca + '?idLojista=' + usuario.lojistaId,
		type: "GET",
		async: false,
		contentType: "application/json; charset=utf-8",
	})
		.done(function(data) {
			console.log(data)
			produto = data; // Atualiza o array de produtos com os dados filtrados
			currentPage = 1; // Reseta a página atual
			renderizarProduto(produto != 'Nenhum resultado encontrado para os parâmetros informados.' ? produto.slice(0, rows) : []); // Renderiza os primeiros 12 produtos
			updatePaginationByFilter(); // Atualiza a paginação com base no filtro
			$('input[data-toggle="toggle"]').bootstrapToggle();
			Swal.close();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			Swal.close();
		});
});


$("#limpa-filtros").click(function() {
	Swal.fire({
		title: 'Carregando...',
		text: 'Por favor, aguarde.',
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: false,
		onOpen: () => {
			Swal.showLoading(); // Exibe o spinner de carregamento
		}
	});

	$("#inputBusca").val("")
	getDados()
	updatePagination(produto);

	$('input[data-toggle="toggle"]').bootstrapToggle();
	Swal.close();
});

function getDados() {
	$.ajax({
		url: url_base + "/produtos/lojista/" + usuario.lojistaId + '?page=0&size=12',
		type: "GET",
		async: false,
	})
		.done(function(data) {
			console.log(data)
			console.log(usuario.lojistaId)
			$("#exportar-excel").click(function() {
				var planilha = XLSX.utils.json_to_sheet(data);
				var livro = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
				XLSX.writeFile(livro, "produtosLojista.xlsx");
			});
			dadosOriginais = [...data.content]; // Armazena os dados originais corretamente
			content = data;
			produto = data;
			
			renderizarProduto(data.content); $('input[data-toggle="toggle"]').bootstrapToggle();

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function editar(user) {
	var idProduto = user.getAttribute("data-value");
	window.location.href = "cadastroProdutoLojista?id=" + idProduto;
}

function renderizarProduto(produto) {

	var html = produto
		.map(function(item) {
			var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";

			return (
				"<tr>" +
				"<td>" +
				'<button type="button" class="btn btn-status btn-sm ' +
				buttonClass +
				'" style="width: 63px; height: 31px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
				(item.ativo === "S"
					? "<i class='fa-solid fa-check fa-xl'></i>"
					: '<i class="fa-solid fa-xmark fa-xl"></i>') +
				"</button>" +
				"</td>" +
				"<td>" +
				item.nomeProduto +
				"</td>" +
				"<td>" +
				(item.categorias ? item.categorias.categoria : item.categoria) +
				"</td>" +
				"<td>" +
				((item.subcategorias ? item.subcategorias?.nome : item.subcategoria) || "Não possui") +
				"</td>" +
				"<td>" +
				"R$ " +
				item.precoVenda.toLocaleString("pt-br", { minimumFractionDigits: 2 }) +
				"</td>" +
				"<td>" +
				"R$ " +
				item.comissao.toLocaleString("pt-br", { minimumFractionDigits: 2 }) +
				"</td>" +
				"<td>" +
				(item.lojista ? item.lojista.nomeFantasia : item.nomeFantasia) +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idProduto +
				'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idProduto +
				'" onChange="alteraStatus(this)" 				' +
				`${item.ativo === "S" ? "checked" : ""}` +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#colaTabela").html(html);
}
function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");
	}

	$.ajax({
		url:
			url_base + `/produtos/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		success: function() {
			Swal.fire({
				title: `${status === "S" ? "Desativado" : "Ativado"} com sucesso!`,
				icon: "success",
			});
		},
		error: function(error) {
			console.error("Erro ao alterar status do funcionario:", error);
		},
	}).done(function() { });
}


function showPageByFilter(page) {
	var start = (page - 1) * rows;
	var end = start + rows;
	$('#colaTabela').html(renderizarProduto(produto.slice(start, end)));
}

function updatePaginationByFilter() {
	var totalRows = produto.length;
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
			goToPageByFilter(parseInt($(this).data('page')));
		});
	} else {
		$('#pagination').hide();
	}
}

function goToPageByFilter(page) {
	if (page >= 1 && page <= Math.ceil(produto.length / rows)) {
		currentPage = page;
		showPageByFilter(currentPage);
		updatePaginationByFilter();
	}
}



function showPage(page) {
	// Exibe o modal de carregamento
	Swal.fire({
		title: 'Carregando...',
		text: 'Por favor, aguarde.',
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: false,
		onOpen: () => {
			Swal.showLoading(); // Exibe o spinner de carregamento
		}
	});

	$.ajax({
		url: url_base + `/produtos/lojista/${usuario.lojistaId}?page=${page - 1}&size=${rows}`,
		method: 'GET',
		success: function(data) {
			produto = data;
			renderizarProduto(data.content); $('input[data-toggle="toggle"]').bootstrapToggle();
			updatePagination(data);

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Erro ao carregar itens:", jqXHR.responseText);
		},
		complete: function() {
			Swal.close(); // Fecha o modal de carregamento
		}
	});
}



function toggleNavigation(data) {
	console.log(data)

	var totalPages = data.totalPages;
	var currentPage = data.number + 1; // No Spring, 'number' começa do 0

	console.log(totalPages)
	
	if (totalPages > 1) {
		$("#pagination").removeAttr("hidden");
	} else {
		$("#pagination").attr("hidden", true);
	}
	$('#prev').prop('disabled', currentPage === 1);
	$('#next').prop('disabled', currentPage === totalPages);

	$('#page-numbers').empty();

	var startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
	var endPage = Math.min(totalPages, startPage + pagesToShow - 1);
	
	console.log(startPage)
	console.log(endPage)

	if (startPage > 1) {
		$('#page-numbers').append('<a class="page-link" data-page="1">1</a>');
		if (startPage > 2) {
			$('#page-numbers').append('<span>...</span>');
		}
	}

	for (var i = startPage; i <= endPage; i++) {
		var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
		console.log(btnClass)
				console.log(i)
		$('#page-numbers').append('<a class="page-link" data-page="' + i + '">' + i + '</a>');
	}

	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			$('#page-numbers').append('<span>...</span>');
		}
		$('#page-numbers').append('<a class="page-link" data-page="' + totalPages + '">' + totalPages + '</a>');
	}

	$('.page-link').click(function() {
		goToPage(parseInt($(this).data('page')));
	});
}

function goToPage(page) {
	showPage(page);
}

$('#prev').click(function() {
	if (produto.content) {
		if (currentPage > 1) goToPage(currentPage - 1);
	} else {
		goToPageByFilter(currentPage - 1);
	}
});

$('#next').click(function() {
	if (produto.content) {
		var totalPages = produto.totalPages;
		if (currentPage < totalPages) goToPage(currentPage + 1);
	} else {
		goToPageByFilter(currentPage + 1);
	}

});

function updatePagination(data) {
	toggleNavigation(data);
}

