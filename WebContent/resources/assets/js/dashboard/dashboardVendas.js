const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
const today = new Date();

botaoDesativa.addEventListener("click", () => {
	elemento.classList.add("animar-sair");
	elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
	elemento.classList.add("animar-entrar");
	elemento.classList.remove("animar-sair");
});

function getWeekRange(date) {
	const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
	const lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));
	return { firstDayOfWeek, lastDayOfWeek };
}

const { firstDayOfWeek, lastDayOfWeek } = getWeekRange(new Date(today));

$(document).ready(function() {
	function isMobile() {
		return window.innerWidth <= 768;
	}

	const tooltipTriggerList = document.querySelectorAll(
		'[data-bs-toggle="tooltip"]'
	);
	const tooltipList = [...tooltipTriggerList].map(
		(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
	);

	if (isMobile()) {
		$("section.pt-4.card.card-table.px-5.py-3").removeClass();
	}

	$(window).resize(function() {
		if (isMobile()) {
			$("section.pt-4.card.card-table.px-5.py-3").removeClass();
		}
	});

	$.ajax({
		url: url_base + "/vendas",
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
		const today = new Date();
		const currentMonth = today.getMonth();
		const currentYear = today.getFullYear();

		const vendasSemana = [];

		const vendasMes = [];

		const vendasAno = [];

		data.map((venda) => {
			const dataVenda = new Date(venda.dataVenda);
			if (dataVenda >= firstDayOfWeek && dataVenda <= lastDayOfWeek) {
				vendasSemana.push(venda);
			}

			if (
				dataVenda.getMonth() === currentMonth &&
				dataVenda.getFullYear() === currentYear
			) {
				vendasMes.push(venda);
			}

			if (dataVenda.getFullYear() === currentYear) {
				vendasAno.push(venda);
			}
		});

		$("#numeroVendasSemanal").text(vendasSemana.length); // Vendas da semana
		$("#numeroVendasMensal").text(vendasMes.length); // Vendas do mês
		$("#numeroVendasAnual").text(vendasAno.length); // Vendas do ano

		Swal.close();

		let totalVendas = 0;
		let aguardandoPagamento = 0;
		let pago = 0;
		let cancelado = 0;

		data.forEach(function(venda) {
			if (venda.statusVenda === "A") {
				aguardandoPagamento++;
			} else if (venda.statusVenda === "P") {
				pago++;
			} else if (venda.statusVenda === "C") {
				cancelado++;
			}
			totalVendas++;
		});

		$("#numeroVendas").text(data.length); // Total de vendas

		let pix = 0;
		let cartao = 0;
		let boleto = 0;

		data.forEach(function(venda) {
			if (venda.formaPagamento === "P") {
				pix++;
			} else if (venda.formaPagamento === "C") {
				cartao++;
			} else if (venda.formaPagamento === "B") {
				boleto++;
			} else {
			}
		});

		// const detalhesVendas = vendasSemana.map(venda => `ID: ${venda.idVenda}, Data: ${new Date(venda.dataCadastro).toLocaleDateString()}`).join(', ');
		// $("#numeroVendasSemanal").text(detalhesVendas);
		const ctx = $("#myChart");
		const ctxDonut = $("#myChartDonut");

		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Aguardando Pagamento", "Pago", "Cancelados"], // Rótulos em cima das barras
				datasets: [
					{
						// Remova o label para não exibir a legenda
						data: [aguardandoPagamento, pago, cancelado], // Valores dinâmicos
						borderWidth: 1,
						backgroundColor: [
							"rgba(255, 255, 0, 0.2)",   // Amarelo claro para Aguardando Pagamento
							"rgba(75, 192, 192, 0.2)",  // Verde claro para Pago
							"rgba(255, 99, 132, 0.2)",  // Vermelho claro para Cancelados
						],
						borderColor: [
							"rgba(255, 255, 0, 1)",      // Amarelo para Aguardando Pagamento
							"rgba(75, 192, 192, 1)",     // Verde para Pago
							"rgba(255, 99, 132, 1)",     // Vermelho para Cancelados
						],
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: "Status das Vendas",
						font: {
							size: 18,
						},
					},
					legend: {
						display: false, // Desativa a legenda
					},
				},
				scales: {
					y: {
						beginAtZero: true, // Garante que o eixo Y comece do zero
					},
				},
			},
			// Removido o ChartDataLabels do array de plugins
		});



		new Chart(ctxDonut, {
			type: "doughnut",
			data: {
				labels: ["Cartão", "Pix", "Boleto"],
				datasets: [
					{
						label: ["Cartão", "Pix", "Boleto"],
						data: [cartao, pix, boleto],
						backgroundColor: [
							"rgb(255, 99, 132)",
							"#10B981",
							"rgb(255, 205, 86)",
						],
						hoverOffset: 4,
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: "Métodos de Pagamento Utilizados",
						font: {
							size: 18,
						},
					},
				},
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	});



	$.ajax({
		url: url_base + "/lojistas/top5Vendas",
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
		let tabelaTopVendedores = `
        <div class="caption-container">
      <caption>Top 5 Lojistas</caption>
      <div class="info" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Top 5 lojistas com mais vendas">
          <i class="fa-solid fa-info" aria-hidden="true"></i>
      </div>
    </div>
		<div class="table-responsive">
        <table class="table tableNot tableTel tabela-funcionarios table-striped table-bordered mb-0 caption-top mx-auto">
            <thead>
                <tr>
                    <th>Lojista</th>
                    <th>Itens Vendidos</th>
                </tr>
            </thead>
            <tbody>`;

		data.forEach((vendedor) => {
			tabelaTopVendedores += `<tr>
            <td>${vendedor.nomeFantasia}</td>
            <td>${vendedor.totalVendido}</td>
        </tr>`;
		});

		tabelaTopVendedores += `</tbody></table></div>`;

		$("#tabelaTopVendedores").html(tabelaTopVendedores);


	});

	/*	function renderizarImportacoes(importacoes) {
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
		  }*/

	$(".searchButton").click(function() {
		var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData;

		if (columnToSearch === "escolaId") {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});
				var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
				return nomeEscola.includes(searchInput);
			});
		} else if (columnToSearch === "anoVigente") {
			var filteredData = dadosOriginais.filter(function(item) {
				return item.anoVigente == searchInput;
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch]
					.toString()
					.toLowerCase()
					.includes(searchInput);
			});
		}

		listarDados(filteredData);

		$(this).siblings(".searchInput").val("");
		$(this).closest(".dropdown-content-form").removeClass("show");
	});

	Swal.close();
});
