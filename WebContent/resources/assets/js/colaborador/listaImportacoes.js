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
function downloadFile(path, name) {
	console.log(path, name);

	// Cria um elemento <a> oculto para forçar o download
	var link = document.createElement('a');
	link.target = "_blank"
	link.href = path;
	link.download = name; // Nome do arquivo que será baixado

	// Força o navegador a baixar o arquivo em vez de abrir
	document.body.appendChild(link);
	link.click(); // Simula o clique no link
	document.body.removeChild(link); // Remove o link após o clique
}


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
			dadosFiltrados = importacoes;
			renderizarImportacoes(data);
			showPageNew(currentPageNew);
			renderPageNumbersNew();
		})

	function renderizarImportacoes(importacoes) {
		var html = importacoes.map(function(item) {
			// Determina a classe do botão de status com base no status da importação
			var buttonClass = item.lido === "S" ? "btn-success" : "btn-danger";
			var iconClass = item.lido === "S" ? "fa-check" : "fa-xmark";
			var statusLabel

			if (item.statusImport === "C") {
				statusLabel = "Concluído"
			} else if (item.statusImport === "I") {
				statusLabel = "Iniciada"
			} else if (item.statusImport === "E") {
				statusLabel = "Erro"
			} else {
				statusLabel = "Parcial"
			}
			return (
				"<tr>" +
				"<td>" + item.lojistaNome + "</td>" +
				"<td>" + new Date(item.dataFinalizacao).toLocaleString() + "</td>" + // Data de finalização formatada
				"<td>" +
				'<button type="button" class="btn btn-status ' + buttonClass + ' btn-sm" ' +
				'style="width: 63px; height: 31px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
				'<i class="fa-solid ' + iconClass + ' fa-xl"></i>' +
				"</button>" +
				"</td>" +
				"<td>" + item.categoriaNome + "</td>" +
				"<td>" + item.subCategoriaNome + "</td>" +
				"<td>" + item.nomeArquivo + "</td>" +
				"<td>" + statusLabel + "</td>" +
				'<td class="d-flex">' +
				'<button style="width: 60%; min-width: 80px ;margin-right: 5px; height: 31px; padding: 8px; display: flex; gap: 6px; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" onclick="downloadFile(\'' + item.pathLog + '\', \'' + item.nomeArquivo + '\')"><i class="fa-regular fa-eye"></i> Ver</button>' +
				"</td>" +
				"</tr>"
			);
		}).join("");

		$("#colaTabela").html(html);
	}

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'escolaId') {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});
				var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
				return nomeEscola.includes(searchInput);
			});
		} else if (columnToSearch === 'anoVigente') {
			var filteredData = dadosOriginais.filter(function(item) {
				return item.anoVigente == searchInput;
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch].toString().toLowerCase().includes(searchInput);
			});
		}

		listarDados(filteredData); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
	});

	$(document).on('click', '.sortable .col', function() {
		var column = $(this).closest('th').data("column");
		var currentOrder = sortOrder[column] || 'vazio';
		var newOrder;

		if (currentOrder === 'vazio') {
			newOrder = 'asc';
		} else if (currentOrder === 'asc') {
			newOrder = 'desc';
		} else {
			newOrder = 'vazio';
		}

		$(".sortable span").removeClass("asc desc");
		$(this).find('span').addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === 'asc') {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === 'desc') {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});
	
	function sortData(column, order) {
			var dadosOrdenados = dadosOriginais.slice();

			dadosOrdenados.sort(function(a, b) {

				if (column === 'anoEscolarId') {
					var valueA = a.anoEscolar.anoEscolar.toLowerCase();
					var valueB = b.anoEscolar.anoEscolar.toLowerCase();
					if (order === 'asc') {
						return valueA.localeCompare(valueB);
					} else {
						return valueB.localeCompare(valueA);
					}
				} else if (column === 'turnoId') {
					var valueA = a.turno.turno.toLowerCase();
					var valueB = b.turno.turno.toLowerCase();
					if (order === 'asc') {
						return valueA.localeCompare(valueB);
					} else {
						return valueB.localeCompare(valueA);
					}
				} else if (column === 'modalidadeEscolaId') {
					var valueA = a.modalidadeEscola.modalidadeEscola.toLowerCase();
					var valueB = b.modalidadeEscola.modalidadeEscola.toLowerCase();
					if (order === 'asc') {
						return valueA.localeCompare(valueB);
					} else {
						return valueB.localeCompare(valueA);
					}
				} else if (column === 'escolaId') {
					var escolaA = escolas.find(function(school) {
						return school.idEscola === a.escolaId;
					});
					var escolaB = escolas.find(function(school) {
						return school.idEscola === b.escolaId;
					});
					var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
					var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
					if (order === 'asc') {
						return nomeEscolaA.localeCompare(nomeEscolaB);
					} else {
						return nomeEscolaB.localeCompare(nomeEscolaA);
					}
				} else {
					var valueA = a[column].toString().toLowerCase();
					var valueB = b[column].toString().toLowerCase();
					if (order === 'asc') {
						return valueA.localeCompare(valueB);
					} else {
						return valueB.localeCompare(valueA);
					}
				}

			});

			listarDados(dadosOrdenados); $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();

		}


	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
});

