var parceiros = [];

$(document).ready(function() {

	$.ajax({
		url: url_base + "/listaParceiroAtivo",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			parceiros = data;
			parceiros.forEach(function(parceiro) {
				$("#listaParceiros").append(
					$("<option>", {
						value: parceiro.idParceiro,
						text: parceiro.razaoSocial,
					})
				);
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/listaUtm",
		type: "GET",
		async: false,
	})
		.done(function(response) {
			response.forEach(function(data) {
				$("#listaLyceum").append(
					$("<option>", {
						value: data.origemInscricao,
						text: data.origemInscricao,
					})
				);
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/listaParceiroUtm",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			renderizarParceiroUtm(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	function renderizarParceiroUtm(parceirosUtm) {
		var html = parceirosUtm
			.map(function(item) {
				var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";

				var parceiroEncontrado = parceiros.find(function(parceiro) {
					return parceiro.idParceiro === item.idParceiro;
				});

				var nomeParceiro = parceiroEncontrado
					? parceiroEncontrado.razaoSocial
					: "Parceiro não encontrado";
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
					nomeParceiro +
					"</td>" +
					"<td>" +
					item.utm +
					"</td>" +
					'<td class="d-flex"><input type="checkbox" data-status="' +
					item.ativo +
					'" data-usuario="' +
					item.idParceiroUtm +
					'" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
					"</tr>"
				);
			})
			.join("");

		$("#colaTabela").html(html);
	}

	var rows = 6;
	var currentPage = 1;

	showPage(currentPage);

	function showPage(page) {
		var start = (page - 1) * rows;
		var end = start + rows;

		$(".tabela-parceiros tbody tr").hide();
		$(".tabela-parceiros tbody tr").slice(start, end).show();
	}

	$("#prev").click(function() {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
		}
	});

	$("#next").click(function() {
		var totalRows = $(".tabela-parceiros tbody tr").length;
		var totalPages = Math.ceil(totalRows / rows);
		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
		}
	});

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});
});

function alteraStatus(element) {
	var idUsuario = element.getAttribute("data-usuario");
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
			url_base +
			`/alterarAtivoParceiroUtm?idParceiroUtm=${idUsuario}&ativo=${status === "S" ? "N" : "S"
			}`,
		type: "GET",
		success: function() {
			if (status === "S") {
				console.log("Desativado com sucesso!");
			} else {
				console.log("Ativado com sucesso!");
			}
		},
		error: function(error) {
			console.error("Erro ao alterar status do funcionario:", error);
		},
	});
}
var usuario = $("#usuarioCadastro").val()

$("#form-parceiro-utm").submit(function(e) {
	e.preventDefault();
	var formArray = $("#form-parceiro-utm").serializeArray();

	var userData = {};
	$(formArray).each(function(index, obj) {
		userData[obj.name] = obj.value;
	});
	$.ajax({
		url:
			url_base +
			`/inserirParceiroUtm?idParceiro=${userData.parceiro}&utm=${userData.utm}&usuarioCadastro=${usuario}&ativo=S`,
		type: "GET",
	})
		.done(function(data) {
			
			Toastify({
				text: "Vinculado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				location.reload(true);
			}, 1000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Erro ao cadastrar");
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
});
