var banners = [];
var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;

function getDados() {
	$.ajax({
		url: url_base + "/banners/ativos",
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {
		$("#exportar-excel").click(function() {
			var planilha = XLSX.utils.json_to_sheet(data);
			var livro = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
			XLSX.writeFile(livro, "banners.xlsx");
		});

		banners = data;
		renderizarItens(data);
	});
}
$(document).ready(function() {
	$.ajax({
		url: url_base + "/banners/ativos",
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {
		$("#exportar-excel").click(function() {
			var planilha = XLSX.utils.json_to_sheet(data);
			var livro = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
			XLSX.writeFile(livro, "banners.xlsx");
		});

		banners = data;
		renderizarItens(data);
	});

	function renderizarItens(banner) {
		var html = banner
			.map(function(item) {
				var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";

				var tipoBanner =
					item.tipoBanner === "I" ? "Influenciador" : "Comprador";
				var tipoDispositivo =
					item.tipoDispositivo === "M" ? "Mobile" : "Desktop";
				var localBanner = item.localBanner === "P" ? "Principal" : "Secundário";

				function formatarData(data) {
					var partes = data.split("-");
					return partes[2] + "/" + partes[1] + "/" + partes[0];
				}

				var dataInicioExibicaoBR = formatarData(item.dataInicioExibicao);
				var dataFimExibicaoBR = formatarData(item.dataFimExibicao);

				return (
					"<tr>" +
					"<td>" +
					tipoBanner +
					"</td>" +
					"<td>" +
					tipoDispositivo +
					"</td>" +
					"<td>" +
					localBanner +
					"</td>" +
					"<td>" +
					item.ordem +
					"</td>" +
					"<td>" +
					item.urlDestino +
					"</td>" +
					"<td>" +
					dataInicioExibicaoBR +
					"</td>" +
					"<td>" +
					dataFimExibicaoBR +
					"</td>" +
					"<td>" +
					'<button type="button" class="btn btn-status btn-sm ' +
					buttonClass +
					'" style="width: 63px; height: 31px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
					(item.ativo === "S"
						? "<i class='fa-solid fa-check fa-xl'></i>"
						: '<i class="fa-solid fa-xmark fa-xl"></i>') +
					"</button>" +
					"</td>" +
					'<td class="d-flex"><button style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
					item.idBanner +
					'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></button> <input type="checkbox" data-status="' +
					item.ativo +
					'" data-id="' +
					item.idBanner +
					'" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"> <button style="margin-left: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-danger btn-sm" data-value="' +
					item.idBanner +
					'" onclick="remover(this)">Remover</button></td>' +
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
	
	showPage(currentPage);
		updatePagination();
});

function editar(user) {
	var id = user.getAttribute("data-value");
	window.location.href = "editBanner?id=" + id;
}

function remover(item) {
	var idBanner = item.getAttribute("data-value");

	$.ajax({
		url: url_base + "/banners/" + idBanner,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			console.log(e);
			alert(e.responseJSON.message);
		},
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			icon: "success",
			title: "Removido com sucesso!",
		}).then(result => {
			window.location.href = 'listarBanners'
		})
		getDados();
	});
}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");
	var button = $(element).closest("tr").find(".btn-status");

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
			url_base + `/banners/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "PUT",
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
	}).done(function() {
		Swal.close();
	});
}