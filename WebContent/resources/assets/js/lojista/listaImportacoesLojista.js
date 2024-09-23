const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

var importacoes = []

$(document).ready(function() {


	$.ajax({
		url: url_base + "/importacao",
		type: "GET",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	})
		.done(function(data) {
			Swal.close();
			$('#exportar-excel').click(function() {
				var planilha = XLSX.utils.json_to_sheet(data);
				var livro = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
				XLSX.writeFile(livro, "FuncionariosLojista.xlsx");
			});

			importacoes = data;
			renderizarImportacoes(data);
		})

	function renderizarImportacoes(importacoes) {
		var html = importacoes.map(function(item) {
			// Determina a classe do botão de status com base no status da importação
			var buttonClass = item.statusImport === "C" ? "btn-success" : "btn-danger";
			var iconClass = item.lido === "S" ? "fa-check" : "fa-xmark";
			var statusLabel
			
			if(item.statusImport === "C"){				
				statusLabel = "Concluído sem Erros"
			}else if(item.statusImport === "I") {
				statusLabel = "Iniciada"
			}else{
				statusLabel = "Parcial"
			}

			return (
				"<tr>" +
				"<td>" + new Date(item.dataFinalizacao).toLocaleString() + "</td>" + // Data de finalização formatada
				"<td>" +
				'<button type="button" class="btn btn-status ' + buttonClass + ' btn-sm" ' +
				'style="width: 63px; height: 31px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
				'<i class="fa-solid ' + iconClass + ' fa-xl"></i>' +
				"</button>" +
				"</td>" +
				"<td>"+ item.categoriaNome + "</td>" +
				"<td>"+ item.subCategoriaNome + "</td>" +
				"<td>" + item.nomeArquivo + "</td>" +
				"<td>" + statusLabel + "</td>" +
				'<td class="d-flex">' +
				'<span style="width: 60%; margin-right: 5px; height: 31px; padding: 8px; display: flex; gap: 6px; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" onclick="baixarArquivo(\'' + item.pathLog + '\')">Baixar</span>' +
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

		$('.tabela-funcionarios tbody tr').hide();
		$('.tabela-funcionarios tbody tr').slice(start, end).show();
	}

	function toggleNavigation() {
		var totalRows = $('.tabela-funcionarios tbody tr').length;
		var totalPages = Math.ceil(totalRows / rows);

		generatePaginationList(totalPages); // Chama a função para gerar a lista de paginação


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
		var totalRows = $('.tabela-funcionarios tbody tr').length;
		var totalPages = Math.ceil(totalRows / rows);

		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
			toggleNavigation();
		}
	});

	function generatePaginationList(totalPages) {
		var paginationList = $('#pagination-list');
		paginationList.empty(); // Limpa a lista antes de adicionar novos itens

		// Adiciona item "Prev"
		var prevListItem = $('<li class="page-item">');
		var prevLink = $('<a class="page-link" href="#" aria-label="Previous">&laquo;</a>').attr('data-page', 'prev');
		prevListItem.append(prevLink);
		paginationList.append(prevListItem);

		for (let i = 1; i <= totalPages; i++) {
			var listItem = $('<li class="page-item">');
			var link = $('<a class="page-link" href="#"></a>').text(i).attr('data-page', i);

			link.on('click', function(e) {
				e.preventDefault(); // Previne o comportamento padrão do link
				var page = $(this).data('page');

				// Atualiza currentPage baseado no item clicado
				if (page === 'prev') {
					currentPage = Math.max(1, currentPage - 1);
				} else if (page === 'next') {
					currentPage = Math.min(totalPages, currentPage + 1);
				} else {
					currentPage = page;
				}

				showPage(currentPage);
				toggleNavigation();
			});

			listItem.append(link);
			paginationList.append(listItem);
		}

		// Adiciona item "Next"
		var nextListItem = $('<li class="page-item">');
		var nextLink = $('<a class="page-link" href="#" aria-label="Next">&raquo;</a>').attr('data-page', 'next');
		nextListItem.append(nextLink);
		paginationList.append(nextListItem);

		// Atualiza o manipulador de clique para 'prev' e 'next' separadamente para evitar conflitos
		prevLink.add(nextLink).on('click', function(e) {
			e.preventDefault();
			var page = $(this).data('page');

			if (page === 'prev' && currentPage > 1) {
				currentPage--;
			} else if (page === 'next' && currentPage < totalPages) {
				currentPage++;
			}

			showPage(currentPage);
			toggleNavigation();
		});
	}



	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
});

