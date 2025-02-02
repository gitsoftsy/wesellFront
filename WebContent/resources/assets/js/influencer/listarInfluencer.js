var dados = [];
var sortOrder = {};
var dadosFiltrados = [];
var dados = [];

function formatarDataParaBR(data) {
	var dataObj = new Date(data);
	var dia = String(dataObj.getDate()).padStart(2, "0");
	var mes = String(dataObj.getMonth() + 1).padStart(2, "0");
	var ano = dataObj.getFullYear();
	return dia + "/" + mes + "/" + ano;
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
			url_base + `/vendedor/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Status alterado!",
			icon: "success",
		});
	});
}

$(document).ready(function() {
	$.ajax({
		url: url_base + "/vendedor",
		type: "GET",
		async: false,
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
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
		renderizarInfluencer(dadosFiltrados);
		showPageNew(currentPageNew);
		renderPageNumbersNew();
	});
	

	function renderizarInfluencer(influencers) {
		var html = influencers
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
					item.nome +
					"</td>" +
					"<td>" +
					formatarDataParaBR(item.dtNasc) +
					"</td>" +
					"<td>" +
					item.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3") +
					"</td>" +
					'<td class="d-flex gap-3"><input type="checkbox" data-status="' +
					item.ativo +
					'" data-id="' +
					item.idVendedor +
					'" onChange="alteraStatus(this)" ' + `" ${item.ativo !== "S" ? "" : "checked"}` +' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm">		  <span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
					item.idVendedor +
					'" data-id="' +
					item.idVendedor +
					'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
					"</tr>"
				);
			})
			.join("");

		$("#colaTabela").html(html);
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
			dadosFiltrados = dados;
		} else {
			dadosFiltrados = dados.filter(function(item) {
				return (
					item.nome.toLowerCase().includes(valorInput) ||
					item.cpf.includes(valorInput) ||
					item.celular.includes(valorInput) ||
					formatarDataParaBR(item.dtNasc).includes(valorInput)
				);
			});
		}

		currentPage = 1;
		renderizarInfluencer(dadosFiltrados);
		$('input[data-toggle="toggle"]').bootstrapToggle();
		renderPageNumbersNew();
		showPageNew(currentPageNew);
		toggleNavigationNew();
	}
});

const editar = (ref) => {
		var id = ref.getAttribute("data-id");
		window.location.href = "editarInfluencer?id=" + id;
	}

