const idProduto = params.get("id");
var ValorConvertidoPreco;
var ValorConvertidoPrecoPromo;
var ValorConvertidoComissao;
var peso;
var edição = "";

let swiper;

$(document).ready(function() {
	$(".summernote").summernote({
		lang: "pt-BR",
		height: 200,
		tabsize: 2,
		minHeight: 100,
		maxHeight: 400,
		placeholder: "Digite aqui...",
		fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New"],
		fontNamesIgnoreCheck: ["Arial", "Comic Sans MS"],
		spellCheck: true,
		toolbar: [
			["style", ["style"]],
			["font", ["bold", "italic", "underline", "clear"]],
			["fontname", ["fontname"]],
			["fontsize", ["fontsize"]],
			["color", ["color"]],
			["para", ["ul", "ol", "paragraph"]],
			["height", ["height"]],
			["insert", ["link", "hr"]],
		],
	});
	var noteBar = $(".note-toolbar");
	noteBar.find("[data-toggle]").each(function() {
		$(this)
			.attr("data-bs-toggle", $(this).attr("data-toggle"))
			.removeAttr("data-toggle");
	});

	swiper = new Swiper(".mySwiper", {
		slidesPerView: 4,
		spaceBetween: 15,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	$(".dimensoes").hide().find("input").prop("required", false);

	$('input[name="possuiFrete"]').change(function() {
		if ($(this).val() === "N") {
			$(".dimensoes").slideDown().find("input").prop("required", true);
		} else {
			$(".dimensoes").slideUp().find("input").prop("required", false);
			$(".dimensoes input").val("");
			$("input[name='freteGratis'][value='S']").prop("checked", true);
		}
	});

	fetchData("/lojistas/ativos", "#lojista", "idLojista", "nomeFantasia");
	fetchData("/marcas/ativos", "#marca", "idMarca", "marca");
	fetchDataActive(
		"/categorias",
		"#categoria",
		"idCategoria",
		"categoria"
	).then(() => {
		if (idProduto) {
			listarImagens();
			$("#nomeProdutoEdit").attr("required", "required");
			$("#categoria").attr("disabled", "disabled");
			$("#subCategoria").attr("disabled", "disabled");
			$("#marca").attr("disabled", "disabled");
			$("#lojista").attr("disabled", "disabled");
			$("#area-input-edit").removeAttr("hidden");
			$("#area-carrossel").removeAttr("hidden");
			$("#title-imagens").removeAttr("hidden");
			$("#area-input-cadastro").hide();

			$("#tituloPagina, #tituloForm").text("Editar Produto");
			$("#btn-submit").text("Salvar");

			$.ajax({
				url: url_base + "/produtos/" + idProduto,
				type: "GET",
				async: false,
			})
				.done(function(data) {
					$("#nomeProdutoEdit").val(data.nomeProduto);
					$("#descricao").val(data.descrProduto);
					$("#descricao").summernote("code", data.descrProduto);
					$("#precoPromocional").val(
						data.precoPromocional.toLocaleString("pt-br", {
							minimumFractionDigits: 2,
						})
					);
					$("#precoDeVenda").val(
						data.precoVenda.toLocaleString("pt-br", {
							minimumFractionDigits: 2,
						})
					);
					$("#comissao").val(
						data.comissao.toLocaleString("pt-br", {
							minimumFractionDigits: 2,
						})
					);

					if (data.altura && data.largura && data.profundidade) {
						$("#altura").val(data.altura);
						$("#peso").val(
							data.peso
								.toLocaleString("pt-br", {
									minimumFractionDigits: 3,
									useGrouping: false,
								})
								.replace(",", ".")
						);
						$("#largura").val(data.largura);
						$("#profundidade").val(data.profundidade);
						$("input[name='possuiFrete'][value='N']").prop("checked", true);
						$(".dimensoes").slideDown().find("input").prop("required", true);
					} else {
						$("input[name='possuiFrete'][value='S']").prop("checked", true);
					}

					$(`input[name='nivel'][value='${data.nivelRelevancia}']`).prop(
						"checked",
						true
					);
					$(`input[name='destaque'][value='${data.destacar}']`).prop(
						"checked",
						true
					);

					if (data.freteGratis === "S") {
						$("input[name='freteGratis'][value='S']").prop("checked", true);
					} else {
						$("input[name='freteGratis'][value='N']").prop("checked", true);
					}

					$("#categoria")
						.val(data.categorias.idCategoria)
						.attr("selected", true);
					$("#marca").val(data.marca.idMarca).attr("selected", true);
					loadSubCategories(data.categorias.idCategoria).then(() => {
						$("#subCategoria")
							.val(data.subcategorias.id)
							.attr("selected", true);
					});

					$("#lojista").val(data.lojista.idLojista).attr("selected", true);
					edição = "sim";
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log("erro ao buscar dados.");
					console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
				});

			$.ajax({
				url: url_base + "/imagens/produto/" + idProduto,
				type: "GET",
				async: false,
			}).done(function(data) { });
		} else {
			$("#nomeProduto").attr("required", "required");
			$("#imagem-produto").attr("required", "required");
		}
	});

	$("#categoria").change(function() {
		const categoryId = $(this).val();
		loadSubCategories(categoryId);
	});

	$("#precoDeVenda").on("input", function(e) {
		formatCurrencyInput(e, function(formattedValue, rawValue) {
			ValorConvertidoPreco = rawValue;
			e.target.value = formattedValue;
		});
	});

	$("#precoPromocional").on("input", function(e) {
		formatCurrencyInput(e, function(formattedValue, rawValue) {
			ValorConvertidoPrecoPromo = rawValue;
			e.target.value = formattedValue;
		});
	});

	$("#comissao").on("input", function(e) {
		formatCurrencyInput(e, function(formattedValue, rawValue) {
			ValorConvertidoComissao = rawValue;
			e.target.value = formattedValue;
		});
	});

	$("#peso").on("input", function(e) {
		formatKgInput(e, function(formattedValue, rawValue) {
			peso = rawValue;
			e.target.value = formattedValue;

			const messagePeso = $("<p id='errMessagePeso'></p>")
				.text("Peso até 20Kg")
				.css("color", "#FF0000");
			if (formattedValue <= 20.0) {
				$("#btn-adicionar").removeAttr("disabled");
				$("#peso").removeClass("err-message");
				$("#errMessagePeso").css("display", "none");
			} else {
				if ($("#cardPeso").find("#errMessagePeso").length > 0) {
					$("#errMessagePeso").remove();
				}
				$("#btn-adicionar").attr("disabled", "disabled");
				$("#peso").addClass("err-message");
				$("#cardPeso").append(messagePeso);
				messagePeso.show();
			}
		});
	});
});

function formatCurrencyInput(event, callback) {
	let value = event.target.value.replace(/\D/g, "");
	let rawValue = (value / 100).toFixed(2);
	let formattedValue = rawValue.replace(".", ",");
	formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	callback(formattedValue, rawValue);
}

function formatKgInput(event, callback) {
	let value = event.target.value.replace(/\D/g, "");
	let rawValue = (value / 1000).toFixed(3);
	let formattedValue = rawValue;
	formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	callback(formattedValue, rawValue);
}

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


async function fetchDataActive(endpoint, selectId, valueKey, textKey) {
	try {
		const response = await $.ajax({
			url: url_base + endpoint,
			type: "GET",
			async: false,
		});

		response.forEach((item) => {

			if (item.ativo === "S") {
				$(selectId).append(
					$("<option>", {
						value: item[valueKey],
						id: item[valueKey],
						text: item[textKey],
						name: item[textKey],
					})
				);
			}


		});
	} catch (error) {
		console.error(`Erro ao buscar dados de ${endpoint}:`, error);
	}
}

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

async function cadastrarProduto(objeto) {
	try {
		const response = await $.ajax({
			url: url_base + "/produtos",
			type: "POST",
			data: JSON.stringify(objeto),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading();
			},
		});

		return response.idProduto;
	} catch (error) {
		console.log(objeto);
		console.log(error.responseJSON[0].mensagem);
		Swal.close();
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error.responseJSON[0].message,
		});
		throw error;
	}
}

async function listarImagens() {
	await $.ajax({
		url: url_base + "/imagens/produto/" + idProduto,
		type: "GET",
		contentType: "application/json",
		success: function(data) {
			console.log(data);

			data.forEach(function(img) {
				addImageCard(img);
			});

			swiper.update();
		},
		error: function(e) {
			console.log("Erro ao listar imagens.");
			console.error("Erro na solicitação AJAX:", e);
		},
	});
}

function addImageCard(img) {
	var imageUrl = img.imagem.replace(
		"/opt/apache-tomcat-9.0.89/webapps",
		"https://api.we-sell.store"
	);

	var divCard = $("<div>", {
		class: "swiper-slide card-image shadow-sm",
		"data-id": img.idImagemProduto,
	});

	var linkElement = $("<a>", {
		href: imageUrl,
		"data-fancybox": "gallery",
		"data-caption": "imagem " + img.idImagemProduto,
	});

	var imgElement = $("<img>", {
		src: imageUrl,
		alt: "imagem " + img.idImagemProduto,
	});

	var buttonRemove = $("<button>", {
		class: "btn btn-sm btn-danger btn-remove",
		text: "Remover",
		"data-id": img.idImagemProduto,
		type: "button",
	});

	linkElement.append(imgElement);
	divCard.append(linkElement);
	divCard.append(buttonRemove);

	$(".swiper-wrapper").append(divCard);
}

$(document).on("click", ".btn-remove", function() {
	var idImagemProduto = $(this).data("id");

	var $button = $(this);

	$button.html("Removendo...");
	$button.prop("disabled", true);

	removeImageById(idImagemProduto, $button);
});

async function removeImageById(id, $button) {
	await $.ajax({
		url: url_base + "/imagens/" + id,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
				text: e.responseJSON.message,
				duration: 2000,
				position: "center",
				backgroundColor: "red",
				close: true,
				className: "Toastify__toast--custom",
			}).showToast();
			console.log(e.responseJSON);

			$button.html("Remover");
			$button.prop("disabled", false);
		},
	}).done(function(data) {
		Swal.fire({
			title: "Removido com sucesso!",
			icon: "success",
		}).then(() => {
			$button.closest(".card-image").remove();
			document.getElementById("btn-close").click();
			swiper.update();
		});
	});
}

async function cadastrarImagens(imagensBase64, produtoId) {
	try {
		var imagens = {
			base64List: imagensBase64,
			produtoId: produtoId,
		};

		await $.ajax({
			url: url_base + "/imagens/upload",
			type: "POST",
			data: JSON.stringify(imagens),
			contentType: "application/json; charset=utf-8",
		});
	} catch (error) {
		console.log(error);
		Swal.close();
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Falha ao cadastrar imagens.",
		});
		throw error;
	}
}

async function converterImagensParaBase64(files) {
	const imagensBase64 = [];

	const promises = Array.from(files).map((file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = function(event) {
				imagensBase64.push(
					event.target.result.replace(
						/^data:image\/(png|jpeg|jpg|webp);base64,/,
						""
					)
				);
				resolve();
			};
			reader.onerror = function(error) {
				reject(error);
			};
			reader.readAsDataURL(file);
		});
	});

	await Promise.all(promises);
	return imagensBase64;
}

$("#form-new-image").on("submit", async function(e) {
	e.preventDefault();

	const $button = $("#btn-submit-modal");
	const originalButtonText = $button.html();

	$button.html(
		'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
	);
	$button.prop("disabled", true);

	const input = document.getElementById("new-imagem-produto");
	const files = input.files;

	let imagensBase64 = [];
	if (files.length > 0) {
		try {
			imagensBase64 = await converterImagensParaBase64(files);
			console.log(imagensBase64);
		} catch (error) {
			console.error("Erro ao converter imagens:", error);
			Swal.fire({
				title: "Erro ao converter imagens",
				icon: "error",
			});
			$button.html(originalButtonText);
			$button.prop("disabled", false);
			return;
		}
	}
	try {
		await cadastrarImagens(imagensBase64, idProduto);
		Swal.fire({
			title: "Adicionado com sucesso!",
			icon: "success",
		}).then((result) => {
			limpaInput();
			$(".swiper-wrapper").empty();

			listarImagens();
			$button.html(originalButtonText);
			$button.prop("disabled", false);
			document.getElementById("btn-close").click();
		});
	} catch (error) {
		$button.html(originalButtonText);
		$button.prop("disabled", false);
	}
});

function formatCurrencyInput2(value) {
	let numericValue = value.replace(/\D/g, "");
	let rawValue = (numericValue / 100).toFixed(2);
	let formattedValue = rawValue.replace(".", ",");
	formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	return { formattedValue, rawValue };
}

function formatKg2(value) {
	let numericValue = value.replace(/\D/g, "");
	let rawValue = (numericValue / 100).toFixed(2);
	let formattedValue = rawValue;
	formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	return { formattedValue, rawValue };
}

async function editar($button, originalButtonText) {
	let precoDeVendaVal = $("#precoDeVenda").val();
	let precoPromoVal = $("#precoPromocional").val();
	let pesoVal = $("#peso").val();

	let precoConvertido =
		ValorConvertidoPreco || formatCurrencyInput2(precoDeVendaVal).rawValue;
	let precoPromocional =
		ValorConvertidoPrecoPromo || formatCurrencyInput2(precoPromoVal).rawValue;
	let pesoConvertido = peso || formatKg2(pesoVal).rawValue;

	var objetoEdit = {
		idProduto: idProduto,
		nomeProduto: $("#nomeProdutoEdit").val(),
		descrProduto: $("#descricao").val(),
		precoVenda: precoConvertido,
		comissao: 0,
		precoPromocional: precoPromocional,
		peso: pesoConvertido,
		largura: $("#largura").val(),
		altura: $("#altura").val(),
		profundidade: $("#profundidade").val(),
		categoriaId: $("#categoria").val(),
		subcategoriaId: $("#subCategoria").val(),
		lojistaId: $("#lojista").val(),
		marcaId: $("#marca").val(),
		nivelRelevancia: $("input[name='nivel']:checked").val(),
		destacar: $("input[name='destaque']:checked").val(),
		freteGratis: $('input[name="freteGratis"]:checked').val()
	};

	if ($("input[name='possuiFrete']:checked").val() == "S") {
		objetoEdit.largura = null;
		objetoEdit.altura = null;
		objetoEdit.freteGratis = "S";
		objetoEdit.profundidade = null;
	}

	$.ajax({
		url: url_base + "/produtos",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
				text: e.responseJSON.message,
				duration: 2000,
				position: "center",
				backgroundColor: "red",
				close: true,
				className: "Toastify__toast--custom",
			}).showToast();
			console.log(e.responseJSON);

			$button.html(originalButtonText);
			$button.prop("disabled", false);
		},
	})
		.done(function(data) {
			Swal.fire({
				title: "Editado com sucesso!",
				icon: "success",
			}).then(() => {
				setTimeout(function() {
					window.location.href = "listarProduto";
				}, 2000);
			});
		})
		.always(() => {
			$button.html(originalButtonText);
			$button.prop("disabled", false);
		});
}

async function cadastrar($button, originalButtonText) {
	const input = document.getElementById("imagem-produto");
	const files = input.files;

	let imagensBase64 = [];
	if (files.length > 0) {
		try {
			imagensBase64 = await converterImagensParaBase64(files);
		} catch (error) {
			console.error("Erro ao converter imagens:", error);
			Swal.fire({
				title: "Erro ao converter imagens",
				icon: "error",
			});

			$button.html(originalButtonText);
			$button.prop("disabled", false);
			return;
		}
	}

	var objeto = {
		nomeProduto: $("#nomeProduto").val(),
		descrProduto: $("#descricao").val(),
		precoVenda: ValorConvertidoPreco,
		comissao: 0,
		precoPromocional: ValorConvertidoPrecoPromo,
		peso: peso || null,
		largura: $("#largura").val(),
		altura: $("#altura").val(),
		profundidade: $("#profundidade").val(),
		categoriaId: $("#categoria").val(),
		subcategoriaId: $("#subCategoria").val(),
		lojistaId: $("#lojista").val(),
		marcaId: $("#marca").val(),
		nivelRelevancia: $("input[name='nivel']:checked").val(),
		destacar: $("input[name='destaque']:checked").val(),
		freteGratis: $("input[name='freteGratis']:checked").val(),
	};

	if ($("input[name='possuiFrete']:checked").val() == "S") {
		objeto.largura = null;
		objeto.altura = null;
		objeto.freteGratis = "S";
		objeto.profundidade = null;
	}

	try {
		const produtoId = await cadastrarProduto(objeto);
		await cadastrarImagens(imagensBase64, produtoId);

		Swal.fire({
			title: "Cadastrado com sucesso!",
			icon: "success",
		}).then((result) => {
			window.location.href = "listarProduto";
		});
	} catch (error) {
		console.error("Erro ao cadastrar produto:", error);
		Swal.fire({
			title: "Erro ao cadastrar produto",
			icon: "error",
		});
	} finally {
		$button.html(originalButtonText);
		$button.prop("disabled", false);
	}
}

function limpaInput() {
	$("#new-imagem-produto").val("");
}
// cadastro do prduto
$("#form-cadastro").on("submit", async function(e) {
	e.preventDefault();

	var descricaoContent = $("#descricao").summernote("code").trim();
	if (descricaoContent === "") {
		Swal.fire({
			title: "A descrição é obrigatória.",
			icon: "error",
		});
		return;
	}

	const $button = $("#btn-submit");
	const originalButtonText = $button.html();

	$button.html(
		'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
	);
	$button.prop("disabled", true);

	if (edição == "sim") {
		await editar($button, originalButtonText);
	} else {
		await cadastrar($button, originalButtonText);
	}
});

/*function ValidarCpf() {
	const cpf = $('#cpf');
	const message = $("<p id='errMessage'></p>").text("CPF Inválido").css('color', '#FF0000');
	if (cpfValido(cpf.val())) {
		$("#btn-submit").removeAttr('disabled');
		cpf.removeClass('err-message')
		$('#errMessage').css('display', 'none')
	} else {
		if ($("#cardCpf").find('#errMessage').length > 0) {
			$('#errMessage').remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(message)
		message.show()
	}
}*/

function formatarValor(valor) {
	return parseFloat(valor.replace(".", "").replace(",", "."));
}

function validarValores(texto, valorMaior, valorMenor, container, card) {
	const box = container;
	const message = $(`<p id='errMessage${card.attr("id")}'></p>`)
		.text(texto)
		.css("color", "#FF0000");

	if (formatarValor(valorMaior) >= formatarValor(valorMenor)) {
		box.removeClass("err-message");
		$(`#errMessage${card.attr("id")}`).remove();
		return true;
	} else {
		if (card.find(`#errMessage${card.attr("id")}`).length > 0) {
			$(`#errMessage${card.attr("id")}`).remove();
		}
		box.addClass("err-message");
		card.append(message);
		message.show();
		return false;
	}
}

function validarFormulario() {
	const precoDeVenda = $("#precoDeVenda").val();
	const precoPromocional = $("#precoPromocional").val();
	const comissao = $("#comissao").val();

	let validacaoComissaoVenda = true;
	let validacaoComissaoPromocional = true;
	let validacaoPrecoPromocional = true;

	if (comissao !== "" && precoDeVenda !== "") {
		validacaoComissaoVenda = validarValores(
			"Comissão maior que preço de venda.",
			precoDeVenda,
			comissao,
			$("#precoDeVenda"),
			$("#cardComissao")
		);
	}

	if (comissao !== "" && precoPromocional !== "") {
		validacaoComissaoPromocional = validarValores(
			"Comissão maior que preço promocional.",
			precoPromocional,
			comissao,
			$("#precoPromocional"),
			$("#cardComissao")
		);
	}

	if (precoDeVenda !== "" && precoPromocional !== "") {
		validacaoPrecoPromocional = validarValores(
			"Preço promocional maior que preço de venda.",
			precoDeVenda,
			precoPromocional,
			$("#precoDeVenda"),
			$("#cardPrecoPromocional")
		);
	}

	if (
		validacaoComissaoVenda &&
		validacaoComissaoPromocional &&
		validacaoPrecoPromocional
	) {
		$("#btn-submit").removeAttr("disabled");
	} else {
		$("#btn-submit").attr("disabled", "disabled");
	}
}

$("#comissao").blur(function() {
	validarFormulario();
});

$("#precoDeVenda").blur(function() {
	validarFormulario();
});

$("#precoPromocional").blur(function() {
	validarFormulario();
});
