const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
const idProduto = params.get("id");
var edição = ""

/*botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});*/

var ValorConvertidoPreco

document.getElementById('precoDeVenda').addEventListener('input', function(e) {
	let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
	valor = (valor / 100).toFixed(2) + ''; // Divide por 100 para converter em um número decimal e fixa duas casas decimais
	ValorConvertidoPreco = valor
	valor = valor.replace('.', ','); // Troca ponto por vírgula

	valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona ponto como separador de milhar

	e.target.value = `${valor}`; // Atualiza o campo com o valor formatado
});

var ValorConvertidoComissao

document.getElementById('comissao').addEventListener('input', function(e) {
	let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
	valor = (valor / 100).toFixed(2) + ''; // Divide por 100 para converter em um número decimal e fixa duas casas decimais
	ValorConvertidoComissao = valor
	valor = valor.replace('.', ','); // Troca ponto por vírgula

	valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona ponto como separador de milhar

	e.target.value = `${valor}`; // Atualiza o campo com o valor formatado
});

var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

$("#usuarioNome").text(usuario.nome)


const button = document.querySelector("#btn-submit");

function mostraModalFeedback(tipo, mensagem) {
	if (tipo == "erro") {
		$('#exampleModalLabel').text(mensagem)
		$('#icone-modal').replaceWith("<i id='icone-modal' class='fa-solid fa-xmark modal-erro'></i>")
		$("#openModalBtn").click()
	} else if (tipo == "sucesso") {
		$('#exampleModalLabel').text(mensagem)
		$('#icone-modal').replaceWith("<i id='icone-modal' class='fa-solid fa-check circulo-border'></i>")
		$("#openModalBtn").click()
	}
}

// Modal imagens

let indiceAtual = 0;

function mudarImagem(n) {
	let imagens = document.querySelectorAll(".imagens img");
	imagens[indiceAtual].classList.remove("imagem-ativa");
	indiceAtual = (imagens.length + indiceAtual + n) % imagens.length;
	imagens[indiceAtual].classList.add("imagem-ativa");
}

// Inicializar o carrossel com a primeira imagem ativa
document.addEventListener("DOMContentLoaded", function() {
	mudarImagem(0);
});

var botao = document.getElementById("abrirModalImg")

botao.addEventListener("click", function(e) {
	e.preventDefault(e)

	$("#carrossel").removeClass("none")

	var carrossel = document.getElementById("carrossel")
	var imagem = document.getElementsByClassName("imagem-ativa")
	setTimeout(function() {
		document.addEventListener("click", function(event) {
			e.preventDefault(e)

			if (carrossel.contains(event.target)) {

			} else { $("#carrossel").addClass("none") }
		});
	}, 1000)


})








var imagensBase64 = []
// Funcao converter imagem para base64
function converterImagem() {

	// Receber o arquivo do formulario
	var receberArquivos = document.getElementById("imagem-produto").files;

	// Verificar se existe o arquivo
	if (receberArquivos.length > 0) {

		// Função para ler cada arquivo
		function lerArquivo(index) {
			var reader = new FileReader();

			reader.onload = function(arquivoCarregado) {
				const input = document.getElementById("imagem-produto");

				const tamanhoMaximo = 500 * 500; // 1MB

				if (input.files[index].size > tamanhoMaximo) {
					Toastify({
						text: "A imagem é muito grande. O tamanho máximo é de 500 X 500.",
						duration: 3000,
						position: "center",
						backgroundColor: "red",
						close: true,
						className: "Toastify__toast--custom"
					}).showToast();
					input.value = "";
				} else {
					var imagemBase64 = arquivoCarregado.target.result;
					imagensBase64.push(imagemBase64);
					console.log(imagemBase64);

					// Verificar se ainda há mais arquivos para ler
					if (index < receberArquivos.length - 1) {
						lerArquivo(index + 1);
					}
				}
			};

			reader.readAsDataURL(receberArquivos[index]);
		}

		// Iniciar o processo de leitura
		lerArquivo(0);
	}
}

var novoValor
$("#subCategoria").change(function() {

	var valorSelecionado = $("#subCategoria option:selected").attr("value")

	novoValor = valorSelecionado == "exemplo" ? "36" : valorSelecionado;

	console.log(novoValor)
});

var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

function cadastrar() {

	console.log(imagensBase64)

	var objeto = {
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": ValorConvertidoPreco,
		"comissao": ValorConvertidoComissao,
		"categoriaId": $("#categoria option:selected").attr("value"),
		"subcategoriaId": novoValor,
		"lojistaId": usuario.lojistaId,

	};

	$.ajax({

		url: url_base + '/produtos',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(objeto);
			console.log(e.responseJSON[0].mensagem);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastrar, confira os dados e tente novamente",
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Criado com sucesso!",
			icon: "success",
		}).then((result) => {
			window.location.href = 'listarProdutoLojista';
		});

		/*var imagens = {
			"imagem": imagensBase64[0],
			"produtoId": data.idProduto,
		}

		$.ajax({
			url: url_base + "/imagens",
			type: 'POST',
			data: JSON.stringify(imagens),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e.responseJSON.message)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar, confira os dados e tente novamente",
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Criado com sucesso!",
				icon: "success",
			}).then((result) => {
				window.location.href = 'listarTelefoneLojista';
			});
		})*/
	})
}

function editar() {
	
	let preco = $('#precoDeVenda').val().replace(',', '.');
	let comissao = $('#comissao').val().replace(',', '.');

	var objetoEdit = {
		"idProduto": idProduto,
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": preco,
		"comissao": comissao,
		"categoriaId": $("#categoria option:selected").attr("value"),
		"subcategoriaId": $('#subCategoria option:selected').attr("value"),
		"lojistaId": usuario.lojistaId,
	}
	
	console.log(preco)
	console.log(comissao)
	
	console.log(objetoEdit)

	$.ajax({
		url: url_base + "/produtos",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON[0].mensagem);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastrar, confira os dados e tente novamente",
			});
		}
	})
		.done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Editado com sucesso!",
				icon: "success",
			}).then((result) => {
				window.location.href = 'listarProdutoLojista';
			});
		})


}

var categoria = []
var subcategoria = []
var lojista = []

function loadSubCategories(categoryId) {

	$.ajax({
		url: url_base + `/subcategorias/categoria/${categoryId}`,
		type: "GET",
		beforeSend: function() {
			Swal.showLoading()
		},
		success: function(data) {
			Swal.close()
			$('#subCategoria').empty().append($('<option>', {
				value: "",
				text: "Selecione...",
			}));

			$.each(data, function(index, item) {
				$('#subCategoria').append($('<option>', {
					value: item.id,
					text: item.nome,
				}));
			});
		},
		error: function(xhr, status, error) {
			Swal.close()
			console.error("Erro ao buscar subcategorias:", status, error);
		}
	});
}

$(document).ready(function() {
	$('#categoria').change(function() {
		const categoryId = $(this).val()
		if (categoryId) {
			loadSubCategories(categoryId);
		} else {
			alert('Foi4')
			$('#subCategoria').empty().append($('<option>', {
				value: "",
				text: "Selecione...",
			}));
		}
	});

	$.ajax({
		url: url_base + '/categorias',
		type: "GET",
		async: false,
	}).done(function(data) {

		$('#categoria').append($('<option>', {
			value: "",
			text: "Selecione...",
		}));


		$.each(data, function(index, item) {

			$('#categoria').append($('<option>', {
				value: item.idCategoria,
				id: item.idCategoria,
				text: item.categoria,
				name: item.categoria
			}));
		})

	})

	$.ajax({
		url: url_base + '/lojistas',
		type: "GET",
		async: false,
	}).done(function(data) {
		lojista = data;
		renderizarLojista(data)
	})
	function renderizarLojista(lojista) {
		var html = lojista.map(function(item) {
			return (
				`<option value="${item.idLojista}">${item.nomeFantasia}</option>`
			)
		});
		$("#lojista").html(html);
	};

	if (idProduto == undefined) {




	} else {



		$("#imagem-produto").attr("disabled", "disabled")



		$("#abrirModalImg").removeClass("none")

		$("#categoria, #subCategoria ,#lojista").attr("disabled", "disabled")

		$("#tituloPagina, #tituloForm").text("Editar Produto")
		$("#btn-submit").text("Editar")





		$.ajax({
			url: url_base + "/produtos/" + idProduto,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$.ajax({
					url: url_base + `/subcategorias/categoria/${data.categorias.idCategoria}`,
					type: "GET",
					beforeSend: function() {
						Swal.showLoading()
					},
					success: function(dataSubCategoria) {
						Swal.close()
						$('#subCategoria').append($('<option>', {
							value: "",
							text: "Selecione...",
						}));

						$.each(dataSubCategoria, function(index, item) {
							$('#subCategoria').append($('<option>', {
								value: item.id,
								text: item.nome,
								id: item.id,
								name: item.nome
							}));
						});
						$('#subCategoria').find(`option[value=${data.subcategorias.id}]`).attr("selected", "selected")
					},
					error: function(xhr, status, error) {
						Swal.close()
						console.error("Erro ao buscar subcategorias:", status, error);
					}
				});
				console.log(data.subcategorias.id)
				$('#nomeProduto').val(data.nomeProduto),
					$('#descricao').val(data.descrProduto),

					$('#precoDeVenda').val(data.preco),
					$('#comissao').val(data.comissao),
					$('#categoria').find(`option[value=${data.categorias.idCategoria}]`).attr("selected", "selected"),
				$('#lojista').find(`option[value=${data.lojista.idLojista}]`).attr("selected", "selected"),

					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});

		$.ajax({
			url: url_base + "/imagens/" + 17,
			type: 'GET',
			async: false,
		}).done(function(data) {

			imagem = data.imagem
			console.log(data.imagem)

			$("#img0").attr("src", imagem)
		})
	}

});
$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();


	if (edição == "sim") {

		editar()
	} else {

		cadastrar()

	}
});



