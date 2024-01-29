var usuarios = []
var parceiros = []

$(document).ready(function() {

	$.ajax({
		url: url_base + "/listaParceiroAtivo",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			parceiros = data;
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/listaUsuarioParceiro",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			renderizarUsuarios(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	function renderizarUsuarios(userParceiros) {
		var html = userParceiros.map(function(item) {
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
				item.email +
				"</td>" +
				" <td>" +
				item.nome +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idUsuarioParceiro +
				'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
				item.ativo +
				'" data-usuario="' +
				item.idUsuarioParceiro +
				'" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
				"</tr>"
			);
		}).join("");

		$("#colaTabela").html(html);
	}

	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#colaTabela tr").show();
		} else {
			$("#colaTabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#colaTabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	    var rows = 8;
	var currentPage = 1;

	showPage(currentPage);
	toggleNavigation();

	function showPage(page) {
		var start = (page - 1) * rows;
		var end = start + rows;

		$('.tabela-parceiros tbody tr').hide();
		$('.tabela-parceiros tbody tr').slice(start, end).show();
	}

	function toggleNavigation() {
		var totalRows = $('.tabela-parceiros tbody tr').length;
		var totalPages = Math.ceil(totalRows / rows);

		if (totalRows > rows) {
			$('#prev, #next').show();
		} else {
			$('#prev, #next').hide();
		}
	}

	$('#prev').click(function() {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
			toggleNavigation();
		}
	});

	$('#next').click(function() {
		var totalRows = $('.tabela-parceiros tbody tr').length;
		var totalPages = Math.ceil(totalRows / rows);

		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
			toggleNavigation();
		}
	});

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
});


function editar(user) {
	var idUsuario = user.getAttribute("data-value");
	window.location.href = "editarUsuarioParceiro?id=" + idUsuario;
}

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
		url: url_base + `/alterarAtivoUsuarioParceiro?idUsuarioParceiro=${idUsuario}&ativo=${status === "S" ? "N" : "S"}`,
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
		}
	});

	usuarios = usuarios.map((usuario) => {
		if (usuario.idUsuarioParceiro === idUsuario) {
			return { ...usuario, ativo: status === "S" ? "N" : "S" };
		}
		return usuario;
	});
}