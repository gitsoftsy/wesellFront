var descontos = []

$(document).ready(function() {


	$.ajax({
		url: url_base + "/listaDesconto",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			descontos = data;
			renderizarDescontos(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	function renderizarDescontos(descontos) {
		var html = descontos.map(function(item) {
			var tipo = item.tipo === 'P' || item.tipo === 'p' ? 'Percentual' : 'Valor'
			var isAtivo = item.ativo === "S";
			var buttonClass = isAtivo ? "btn-success" : "btn-danger";
			var statusButton = isAtivo ? "<i class='fa-solid fa-check fa-xl'></i>" : '<i class="fa-solid fa-xmark fa-xl"></i>';

			var vincularButton = '<button id="btn-vincula" style="margin-left: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm"';

			if (!isAtivo) {
				vincularButton += ' disabled';
			}

			vincularButton += ' data-id="' + item.idDesconto + '" data-nome="' + item.desconto + '" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showVincular(this)">Vincular</button></td>';

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
				item.desconto +
				"</td>" +
				"<td>" +
				item.valor +
				"</td>" +
				"<td>" +
				tipo +
				"</td>" +
				"<td>" +
				item.duracao +
				"</td>" +
				'<td class="d-flex">' +
				'<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idDesconto +
				'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span>' +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idDesconto +
				'" onChange="alteraStatus(this)"checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm">' +
				vincularButton +
				"</td>" +
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

function editar(desconto) {
	var idDesconto = desconto.getAttribute("data-value");
	window.location.href = "editarDesconto?id=" + idDesconto;
}
$('#form-vincular').submit(function(event) {
	event.preventDefault();

})
function vincular(id) {
	var idDesconto = id.getAttribute("data-id");
	let usuario = $("#usuarioCadastro").val()
	let parceiro = $('#parceiros').val()

	$.ajax({
		url: url_base + `/inserirDescontoParceiro?idParceiro=${parceiro}&idDesconto=${idDesconto}&usuarioCadastro=${usuario}&ativo=S`,
		type: "GET",
	})
		.done(function(data) {
			$('#btn-vincula').click();
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
			console.log('Erro ao vincular parceiro')
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}
function showVincular(desconto) {
	var id = desconto.getAttribute("data-id");
	var nome = desconto.getAttribute("data-nome");
	$('#nome-desconto').text(nome);

	$('#btn-submit').attr('data-id', id);



	$.ajax({
		url: url_base + '/listaParceiroAtivo',
		type: "GET",
	})
		.done(function(data) {
			$('#parceiros').empty();
			$.each(data, function(index, item) {
				$('#parceiros').append($('<option>', {
					value: item.idParceiro,
					text: item.razaoSocial,
					name: item.razaoSocial
				}));


			});

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Erro ao listar parceiros')
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + `/listaDescontoParceiro?idDesconto=${id}`,
		type: "GET",
	})
		.done(function(data) {

			$('#parceiros-vinculados').empty();
			$.each(data, function(index, item) {
				var isAtivo = item.ativo === "S";
				var buttonClass = isAtivo ? "btn-success" : "btn-danger";
				var statusButton = isAtivo ? "<i class='fa-solid fa-check fa-xl'></i>" : '<i class="fa-solid fa-xmark fa-xl"></i>';
				var row = "<tr>" +
					"<td>" +
					'<button type="button" class="btn btn-status btn-sm ' +
					buttonClass +
					'" style="width: 55px; height: 28px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
					(item.ativo === "S"
						? "<i class='fa-solid fa-check fa-xl'></i>"
						: '<i class="fa-solid fa-xmark fa-xl"></i>') +
					"</button>" +
					"</td>" +
					"<td>" +
					item.parceiro +
					"</td>" +
					'<td class="px-5">' +
					'<input type="checkbox" data-status="' +
					item.ativo +
					'" data-parceiro="' +
					item.idParceiro +
					'" data-desconto="' +
					item.idDesconto +
					'" onChange="alteraStatusParceiro(this)"checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="60" class="checkbox-toggle" data-size="sm" >' + "</td>" +
					"</tr>"

				$('#parceiros-vinculados').append(row);
			});
			$('.checkbox-toggle').bootstrapToggle();
			var rowsModal = 5;
			var currentPageModal = 1;

			showPage(currentPageModal);

			function showPage(page) {
				var start = (page - 1) * rowsModal;
				var end = start + rowsModal;

				$(".tabela-modal tbody tr").hide();
				$(".tabela-modal tbody tr").slice(start, end).show();

				var totalRows = $(".tabela-modal tbody tr").length;
				var totalPages = Math.ceil(totalRows / rowsModal);

				if (totalRows > 5) {
					$("#prevModal, #nextModal").show();
				} else {
					$("#prevModal, #nextModal").hide();
				}
			}

			$("#prevModal").click(function() {
				if (currentPageModal > 1) {
					currentPageModal--;
					showPage(currentPageModal);
				}
			});

			$("#nextModal").click(function() {
				var totalRows = $(".tabela-modal tbody tr").length;
				var totalPages = Math.ceil(totalRows / rowsModal);
				if (currentPageModal < totalPages) {
					currentPageModal++;
					showPage(currentPageModal);
				}
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Erro ao listar parceiros')
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}
function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	const vincularButton = $(element).closest("tr").find("#btn-vincula");

	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");

		vincularButton.prop("disabled", true);
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");

		vincularButton.prop("disabled", false);
	}

	$.ajax({
		url: url_base + `/alterarAtivoDesconto?idDesconto=${id}&ativo=${status === "S" ? "N" : "S"}`,
		type: "GET",
		success: function() {
			if (status === "S") {
				console.log("Desativado com sucesso!");
			} else {
				console.log("Ativado com sucesso!");
			}
		},
		error: function(error) {
			console.error("Erro ao alterar status do desconto:", error);
		}
	});

	descontos = descontos.map((desconto) => {
		if (desconto.idDesconto === id) {
			return { ...desconto, ativo: status === "S" ? "N" : "S" };
		}
		return desconto;
	});
}

function alteraStatusParceiro(element) {
	var parceiro = element.getAttribute("data-parceiro");
	var desconto = element.getAttribute("data-desconto");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	const vincularButton = $(element).closest("tr").find(".btn-vincula");

	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");

		vincularButton.prop("disabled", true);
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");

		vincularButton.prop("disabled", false);
	}

	$.ajax({
		url: url_base + `/alterarAtivoDescontoParceiro?idDesconto=${desconto}&idParceiro=${parceiro}&ativo=${status === "S" ? "N" : "S"}`,
		type: "GET",
		success: function() {
		},
		error: function(error) {
			console.error("Erro ao alterar status do parceiro:", error);
		}
	});
}