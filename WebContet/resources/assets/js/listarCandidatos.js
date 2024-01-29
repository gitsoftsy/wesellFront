var usuario = $("#usuarioCadastro").val()
$(document).ready(function() {


	$.ajax({
		url: url_base + `/listaCandidatosAplicDesconto?idUsuarioParceiro=${usuario}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			renderizarCandidatos(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	function renderizarCandidatos(candidatos) {
		var html = candidatos.map(function(item) {
			var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";
			var cpfFormatado = formatarCPF(item.cpf);
			var telefoneFormatado = formatarTelefone(item.dddFoneCelular, item.foneCelular);
			return (
				"<tr>" +
				"<td>" +
				item.candidato +
				"</td>" +
				"<td>" +
				item.origemInscricao +
				"</td>" +
				"<td>" +
				item.nomeCompl +
				"</td>" +
				"<td>" +
				cpfFormatado +
				"</td>" +
				" <td>" + telefoneFormatado +
				"</td>" +
				" <td>" +
				item.email +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.candidato +
				'" onclick="showModal(this)"><i class="fa-solid fa-plus fa-xl"></i></span></td>' +
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
});

function formatarCPF(cpf) {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
function formatarTelefone(ddd, numero) {
	if (ddd.length === 2 && numero.length === 9) {
		return `(${ddd}) ${numero.substring(0, 5)}-${numero.substring(5)}`;
	} else {
		return `${ddd}${numero}`;
	}
}

function showModal(idCandidato) {
	var candidato = idCandidato.getAttribute("data-value");

	$.ajax({
		url: url_base + `/listaDadosCandidato?candidato=${candidato}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			$('.modal-confirm').empty();
			$("#cola-candidato").empty();
			$('.modal-confirm').text(`Aplicar desconto para o candidato ${data[0].candidato} ?`);
			$("#btn-confirm").attr("data-value", data[0].candidato);
			var cpfFormatado = formatarCPF(data[0].cpf);
			var celularFormatado = formatarTelefone(data[0].dddFoneCelular, data[0].foneCelular);
			$("#cola-candidato").append(
				`<tr>
	      <th scope="row">Candidato</th>
	      <td>${data[0].candidato}</td>
	    </tr>
	    <tr>
	      <th scope="row">Nome</th>
	      <td>${data[0].nomeCompl}</td>
	    </tr>
	    <tr>
	      <th scope="row">Curso de Interesse</th>
	      <td>${data[0].descricaoAbrev}</td>
	    </tr>
	    <tr>
	      <th scope="row">CPF</th>
	      <td>${cpfFormatado}</td>
	    </tr>
	    <tr>
	      <th scope="row">Celular</th>
	      <td>${celularFormatado}</td>
	    </tr>
	    <tr>
	      <th scope="row">Email</th>
	      <td>${data[0].email}</td>
	    </tr>`
			);
			$.ajax({
				url: url_base + `/listaDescontoCandidato?candidato=${candidato}&idUsuarioParceiro=${usuario}`,
				type: "GET",
				async: false,
			})
				.done(function(data) {
					$("#cola-desconto").empty();
					$.each(data, function(index, item) {
						$("#cola-desconto").append(
							'<tr>' +
							'<td>' + item.descricaoDesconto + '</td>' +
							'<td>' + item.valor + '</td>' +
							' <td>' + item.duracao + '</td>' +
							' <td>' + item.expiracao + '</td>' +
							' <td ><span data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm">Aplicar</span></td>' +
							'</tr>'
						)
					});

					$("#infoCandidatoModal").css("display", "block");
					var rowsModal = 4;
					var currentPageModal = 1;

					showPage(currentPageModal);

					function showPage(page) {
						var start = (page - 1) * rowsModal;
						var end = start + rowsModal;

						$(".tabela-modal tbody tr").hide();
						$(".tabela-modal tbody tr").slice(start, end).show();

						var totalRows = $(".tabela-modal tbody tr").length;
						var totalPages = Math.ceil(totalRows / rowsModal);

						if (totalRows > rowsModal) {
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
					console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
				});
			$("#infoCandidatoModal").css("display", "block");
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

function aplicarDesconto(element) {
	var candidato = element.getAttribute("data-value");
	console.log(candidato)
}

$("#closeInfo").click(function() {
	$("#infoCandidatoModal").css("display", "none");
});