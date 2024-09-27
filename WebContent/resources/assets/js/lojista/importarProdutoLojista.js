var perfil = localStorage.getItem("usuario");
var usuario = JSON.parse(perfil);

$(document).ready(function() {
	fetchData("/categorias/ativos", "#categoria", "idCategoria", "categoria");



	async function fetchData(endpoint, selectId, valueKey, textKey) {
		try {
			const response = await $.ajax({
				url: url_base + endpoint,
				type: "GET",
				async: false,
			});

			response.forEach((item) => {
				$(selectId).append(
					$("<option>", {
						value: item[valueKey],
						id: item[valueKey],
						text: item[textKey],
						name: item[textKey],
					})
				);
			});
		} catch (error) {
			console.error(`Erro ao buscar dados de ${endpoint}:`, error);
		}
	}
});

$("#categoria").change(function() {
	const categoryId = $(this).val();
	loadSubCategories(categoryId);
});

async function loadSubCategories(categoryId) {
	await $.ajax({
		url: `${url_base}/subcategorias/categoria/${categoryId}`,
		type: "GET",
		success: function(data) {
			const subCategoriaSelect = $("#subCategoria").empty();
			subCategoriaSelect.append(
				$("<option>", {
					value: "",
					text: "Selecione...",
					disabled: true,
					selected: true,
				})
			);

			data.forEach((item) => {
				subCategoriaSelect.append(
					$("<option>", {
						value: item.id,
						text: item.nome,
					})
				);
			});
		},
		error: function(xhr, status, error) {
			console.error("Erro ao buscar subcategorias:", status, error);
		},
	});
}

$("#btnDownload").click(function() {
	var headers = [
			{
				"CODIGO DO PRODUTO": "1",
				"NOME DO PRODUTO": "produto exemplo",
				"DESCRIÇÃO": "descricao exemplo do produto",
				"PREÇO": "10.50",
				"PREÇO PROMOCIONAL": "9.00",
				"COMISSÃO": "5.00",
				"FRETE GRÁTIS": "N",
				"ALTURA(cm)": "10",
				"LARGURA(cm)": "15",
				"PROFUNDIDADE(cm)": "22",
				"PESO(Kg)": "0.270",
				"NÍVEL RELEVÂNCIA (0-5)": "1",
				"DESTACAR": "N",
				"URL IMAGEM": "https://we-sell.store/assets/logoWesell-DHlth4qb.svg",
			},
			{
				"CODIGO DO PRODUTO": "",
				"NOME DO PRODUTO": "",
				"DESCRIÇÃO": "",
				"PREÇO": "",
				"PREÇO PROMOCIONAL": "",
				"COMISSÃO": "",
				"FRETE GRÁTIS": "",
				"ALTURA(cm)": "",
				"LARGURA(cm)": "",
				"PROFUNDIDADE(cm)": "",
				"PESO(Kg)": "",
				"NÍVEL RELEVÂNCIA (0-5)": "",
				"DESTACAR": "",
				"URL IMAGEM": "",
			}
		];

		var planilha = XLSX.utils.json_to_sheet(headers);

		planilha["!cols"] = [
			{ wch: 20 },
			{ wch: 30 },
			{ wch: 50 },
			{ wch: 10 },
			{ wch: 20 },
			{ wch: 20 },
			{ wch: 15 },
			{ wch: 15 },
			{ wch: 10 },
			{ wch: 10 },
			{ wch: 15 },
			{ wch: 10 },
			{ wch: 20 },
			{ wch: 15 },
			{ wch: 50 },
		];

		var livro = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(livro, planilha, "Modelo De Importação");

		XLSX.writeFile(livro, "modeloImportacao.xlsx");
});

$("#form-cadastro").on("submit", async function(e) {
	e.preventDefault();

	var file = $("#fileExcel")[0].files[0];

	if (file) {
		var reader = new FileReader();

		reader.onload = function() {
			var base64String = reader.result.split(",")[1];

			var objeto = {
				idUsuarioLojista: usuario.id,
				idCategoria: $("#categoria").val(),
				idSubCategoria: $("#subCategoria").val(),
				idLojista: usuario.lojistaId,
				nomeArquivo: file.name,
				base64arquivo: base64String,
			};

			$.ajax({
				url: url_base + "/importacao/produto",
				type: "POST",
				async: true,
				data: JSON.stringify(objeto),
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					Swal.close();
					console.log(e.responseJSON);
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Erro ao importar arquivo.",
					});
				},
			});

			Swal.fire({
				title: "Importação iniciada, aguarde a notificação de conclusão!",
				icon: "success",
			}).then(() => {
				window.location.href = "listarProdutoLojista";
			});
		};


		reader.readAsDataURL(file);
	} else {
		console.log("Por favor, selecione um arquivo primeiro.");
	}
});
