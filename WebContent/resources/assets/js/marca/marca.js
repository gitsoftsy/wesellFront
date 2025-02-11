const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
let id = 0;

var dados = [];
var sortOrder = {};
var dadosOriginais = [];

botaoDesativa.addEventListener("click", () => {
	elemento.classList.add("animar-sair");
	elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
	elemento.classList.add("animar-entrar");
	elemento.classList.remove("animar-sair");
});

$(document).ready(function() {
	$.ajax({
		url: url_base + "/marcas",
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

		dados = data;
		dadosFiltrados = dados;
		renderizarFuncionarios(dadosFiltrados); $('input[data-toggle="toggle"]').bootstrapToggle();
		showPageNew(currentPageNew);
		renderPageNumbersNew();
	});

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
			dadosFiltrados = dados;
		} else {
			dadosFiltrados = dados.filter(function(item) {
				return item.marca.toLowerCase().includes(valorInput);
			});
		}

		currentPage = 1;
		renderizarFuncionarios(dadosFiltrados); $('input[data-toggle="toggle"]').bootstrapToggle();
		renderPageNumbersNew();
		showPageNew(currentPageNew);
		toggleNavigationNew();
	}
});

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
		url: url_base + `/marcas/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	});
}

function renderizarFuncionarios(cargos) {
	var html = cargos
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
				item.marca +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idMarca +
				'" data-nome="' +
				item.marca +
				'" data-id="' +
				item.idMarca +
				'" data-bs-toggle="modal" onclick="showModal(this)" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idMarca +
				'" data-nome="' +
				item.marca +
				'" onChange="alteraStatus(this)" 		' +
				`${item.ativo === "S" ? "checked" : ""}` +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#colaTabela").html(html);
}

const cadastrar = () => {
	var objeto = {
		marca: $("#marca").val(),
	};

	$.ajax({
		url: url_base + "/marcas",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.href = "listarMarcas";
		});
	});

	return false;
};

const showModal = (ref) => {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");

	$("#marcaEdit").val(nome);
};

const editar = () => {
	var objeto = {
		idMarca: id,
		marca: $("#marcaEdit").val(),
	};

	$.ajax({
		url: url_base + "/marcas",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.href = "listarMarcas";
		});
	});

	return false;
};

$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

$("#editItem").on("submit", function(e) {
	e.preventDefault();
	editar();
	return false;
});

const limpaCampo = () => {
	$("#marca").val("");
	$("#marcaEdit").val("");
};
