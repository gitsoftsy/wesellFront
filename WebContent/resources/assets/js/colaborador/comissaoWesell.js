var dados = [];
var sortOrder = {};
var dadosFiltrados = [];

const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");

botaoDesativa.addEventListener("click", () => {
	elemento.classList.add("animar-sair");
	elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
	elemento.classList.add("animar-entrar");
	elemento.classList.remove("animar-sair");
});

var comissao = [];

$(document).ready(function() {

	$.ajax({
		url: url_base + "/comissaoWesell/listar",
		type: "GET",
		async: false,
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).done(function(data) {
		Swal.close();
		$("#exportar-excel").click(function() {
			var planilha = XLSX.utils.json_to_sheet(data);
			var livro = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
			XLSX.writeFile(livro, "cargos.xlsx");
		});

		comissao = data;
		dadosFiltrados = comissao;
		renderizarComissao(dadosFiltrados); $('input[data-toggle="toggle"]').bootstrapToggle();
		showPageNew(currentPageNew);
		renderPageNumbersNew();
	});

	function renderizarComissao(cargos) {
		var html = cargos
			.map(function(item) {
				var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";
				// Exibir a comissão com o símbolo de porcentagem
				return (
					"<tr>" +
					"<td>" +
					"<input id='inputComissao' class='inputComissao' type='text' value='" + item.comissaoWeSell + "%'/>" +  // Exibe porcentagem
					"</td>" +
					'<td class="d-flex"><span id="btnEditar" style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
					item.comissaoWeSell +
					'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span>' +
					'<span id="btnSalvar" style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-success btn-sm" data-value="' +
					item.comissaoWeSell +
					'" onclick="salvar(this)"><i class="fa-solid fa-check"></i></span>' +
					'<span id="btnCancelar" style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-danger btn-sm" data-value="' +
					item.comissaoWeSell +
					'" onclick="cancelar(this)"><i class="fa-solid fa-xmark"></i></span>' +
					'</td>' +
					"</tr>"
				);
			})
			.join("");

		$("#colaTabela").html(html);

		$('.inputComissao').prop('disabled', true);
		$('#btnSalvar').hide();
		$('#btnCancelar').hide();
	}


	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === "") {
			dadosFiltrados = cargos;
		} else {
			dadosFiltrados = cargos.filter(function(item) {
				return item.cargo.toLowerCase().includes(valorInput);
			});
		}

		currentPage = 1;
		renderizarComissao(dadosFiltrados); $('input[data-toggle="toggle"]').bootstrapToggle();
		renderPageNumbersNew();
		showPageNew(currentPageNew);
		toggleNavigationNew();
	}
});

const salvar = () => {
	var novaComissao = $('#inputComissao').val().replace('%', ''); // Remove o símbolo de porcentagem
	$.ajax({
		url: url_base + '/comissaoWesell/atualizar?comissaoAtual=' +
			comissao[0].comissaoWeSell + '&novaComissao=' + novaComissao,
		type: "put",
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			icon: "success",
			title: "Comissão atualizada com sucesso!"
		}).then(result => {
			window.location.href = 'comissaoWesell';
		});
	});
};


const cancelar = () => {
	$('.inputComissao').prop('disabled', true);
	$('#btnSalvar').hide();
	$('#btnCancelar').hide();
	$('#btnEditar').show();
	$('#inputComissao').val(comissao[0].comissaoWeSell + '%'); // Adiciona novamente o símbolo de porcentagem
};


const editar = () => {
	$('.inputComissao').prop('disabled', false);
	$('#inputComissao').val($('#inputComissao').val().replace('%', '')); // Remove o símbolo de porcentagem para edição
	$('#btnSalvar').show();
	$('#btnCancelar').show();
	$('#btnEditar').hide();
};

