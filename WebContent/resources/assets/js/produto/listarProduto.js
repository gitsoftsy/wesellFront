const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
var produto = [];
var imge = [];
var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;

botaoDesativa.addEventListener("click", () => {
	elemento.classList.add("animar-sair");
	elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
	elemento.classList.add("animar-entrar");
	elemento.classList.remove("animar-sair");
});


// // Desabilita o link
// document.getElementById('cadastroDeProdutoLink').onclick = function() {
// 	alert("Esse botão essa desativado por enquanto, para análise se há a necessidade de existir esse botão aqui.")
// 	return false;
// };




function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$('#colaTabela tr').hide();
	$('#colaTabela tr').slice(start, end).show();
}

function toggleNavigation() {
	var totalRows = $('#colaTabela tr').length;
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
	if (page >= 1 && page <= Math.ceil($('#colaTabela tr').length / rows)) {
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

	$.ajax({
		url: url_base + "/lojistas/ativos",
		type: "GET",
		async: false,
	}).done(function(data) {
		$("#lojista").append(
			$("<option>", {
				value: "",
				text: "Selecione...",
			})
		);

		$.each(data, function(index, item) {
			$("#lojista").append(
				$("<option>", {
					value: item.idLojista,
					id: item.idLojista,
					text: item.nomeFantasia,
					name: item.nomeFantasia,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/produtos",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			// $('#exportar-excel').click(function() {
			// 	var planilha = XLSX.utils.json_to_sheet(data);
			// 	var livro = XLSX.utils.book_new();
			// 	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
			// 	XLSX.writeFile(livro, "produtosLojista.xlsx");
			// });
			produto = data;
			renderizarProduto(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});


	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	showPage(currentPage);
	updatePagination();
});

function renderizarProduto(produtos) {

	console.log(produtos)

	var html = produtos.content
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
				item.categorias.categoria +
				"</td>" +
				"<td>" +
				item.subcategorias?.nome +
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
				item.lojista.nomeFantasia +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idProduto +
				'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idProduto +
				'" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#colaTabela").html(html);
}

function editar(user) {
	var idProduto = user.getAttribute("data-value");
	window.location.href = "cadastroDeProduto?id=" + idProduto;
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
			Toastify({
				text: `${status === "S" ? "desativado" : "ativado"} Com Sucesso!`,
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom",
			}).showToast();
		},
		error: function(error) {
			console.error("Erro ao alterar status do funcionario:", error);
		},
	}).done(function() { });
}
