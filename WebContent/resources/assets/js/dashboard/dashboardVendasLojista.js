const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
const today = new Date();
var user = localStorage.getItem("usuario");
var usuario = JSON.parse(user);

botaoDesativa.addEventListener("click", () => {
	elemento.classList.add("animar-sair");
	elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
	elemento.classList.add("animar-entrar");
	elemento.classList.remove("animar-sair");
});

// Função para obter o primeiro e último dia da semana atual
function getWeekRange(date) {
	const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
	const lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));
	return { firstDayOfWeek, lastDayOfWeek };
}

// Obter o intervalo de datas para a semana atual

const { firstDayOfWeek, lastDayOfWeek } = getWeekRange(new Date(today));

$(document).ready(function() {
	function isMobile() {
		return window.innerWidth <= 768;
	}

	if (isMobile()) {
		$("section.pt-4.card.card-table.px-5.py-3").removeClass();
	}

	$(window).resize(function() {
		if (isMobile()) {
			$("section.pt-4.card.card-table.px-5.py-3").removeClass();
		}
	});

	$.ajax({
		url: url_base + "/lojistas/venda?idLojista=" + usuario.lojistaId,
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
		const currentMonth = today.getMonth(); // Mês atual (0-11)
		const currentYear = today.getFullYear(); // Ano atual

		// Filtrar vendas da semana
		const vendasSemana = [];

		// Filtrar vendas do mês
		const vendasMes = [];

		// Filtrar vendas do ano
		const vendasAno = [];

		let totalVendas = 0;
		let aguardandoPagamento = 0;
		let pago = 0;
		let cancelado = 0;

		let pix = 0;
		let cartao = 0;
		let boleto = 0;

		data.map((venda) => {
			const dataVenda = new Date(venda.dataCadastro);
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

			/*	if (venda.formaPagamento === "P") {
					pix++;
				} else if (venda.formaPagamento === "C") {
					cartao++;
				} else if (venda.formaPagamento === "B") {
					boleto++;
				} else {
				}*/
		});

		let valorTotalVendas = data.reduce(
			(total, venda) => total + venda.valorTotal,
			0
		);

		// Atualizar a interface com os resultados
		$("#numeroVendas").text(data.length); // Total de vendas
		$("#numeroVendasSemanal").text(vendasSemana.length); // Vendas da semana
		$("#numeroVendasMensal").text(vendasMes.length); // Vendas do mês
		$("#numeroVendasAnual").text(vendasAno.length); // Vendas do ano

		Swal.close();

		// Ou para exibir detalhes:
		// const detalhesVendas = vendasSemana.map(venda => `ID: ${venda.idVenda}, Data: ${new Date(venda.dataCadastro).toLocaleDateString()}`).join(', ');
		// $("#numeroVendasSemanal").text(detalhesVendas);

		const ctx = $("#myChart");
		const ctxDonut = $("#myChartDonut");


		$.ajax({
			url: url_base + "/lojistas/statusVenda?idLojista=" + usuario.lojistaId,
			type: "GET",
			async: false,
			error: function(e) {
				console.log(e.responseJSON);
				Swal.fire({
					icon: "error",
					title: e.responseJSON.message,
				});
			},
		}).done((res) => {
			res.map((venda) => {
				if (venda.formaPagamento === "P") {
					pix++;
				} else if (venda.formaPagamento === "C") {
					cartao++;
				} else if (venda.formaPagamento === "B") {
					boleto++;
				} else {
				}
			});
		})

		$.ajax({
			url: url_base + "/lojistas/statusVenda?idLojista=" + usuario.lojistaId,
			type: "GET",
			async: false,
			error: function(e) {
				console.log(e.responseJSON);
				Swal.fire({
					icon: "error",
					title: e.responseJSON.message,
				});
			},
		}).done((res) => {
			res.map((venda) => {
				if (venda.formaPagamento === "A") {
					aguardandoPagamento++;
				} else if (venda.formaPagamento === "P") {
					pago++;
				} else if (venda.formaPagamento === "C") {
					cancelado++;
				}
				totalVendas++;
			});
		})

		// Criar o gráfico com os dados processados
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Aguardando Pagamento", "Pago", "Cancelados"],
				datasets: [
					{
						label: "Status de Pagamento",
						data: [aguardandoPagamento, pago, cancelado],
						borderWidth: 1,
						backgroundColor: [
							"rgba(255, 255, 000, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(255, 99, 132, 0.2)",
						],
						borderColor: [
							"rgba(255, 255, 000, 1)",
							"rgba(75, 192, 192, 1)",
							"rgba(255, 99, 132, 1)",
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
				},
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
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

	$.ajax({
		url: url_base + "/produtos/lojista/top5?idLojista=" + 5,
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
		console.log(data);

		var html = data
			.map((item, index) => {
				// Pega a primeira imagem, se houver mais de uma
				let caminho = item.imagem.split(",")[0].trim().split("ROOT");
				const srcImage = `https://api.we-sell.store${caminho[1]}`;

				return `		
            <div class="itemProduto">
                <span class="classificacao">${index + 1}</span>
                <div class="boxImg">
                    <img src=${srcImage} alt="Imagem do produto" />
                </div>
                <div class="dadosProduto">
                    <p>${item.nomeProduto}</p>
                    <span>${item.totalQuantidade} VENDIDOS</span>
                </div>
            </div>
            `;
			})
			.join("");

		Swal.close();
		$("#tabelaTopVendedores").html(html);
	});

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
});
