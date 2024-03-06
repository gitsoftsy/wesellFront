const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
const idProduto = params.get("id");
var edição = ""

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});



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
	
	botao.addEventListener("click", function(e){
		  e.preventDefault(e)
			$("#carrossel").removeClass("none")	
			
			var carrossel = document.getElementById("carrossel")
			
			setTimeout(function(){
			document.addEventListener("click", function(event){
				e.preventDefault(e)
				
				if(carrossel.contains(event.target)){
					
				} else { $("#carrossel").addClass("none") }
				});	
			}, 2000)
			
			
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
 
            reader.onload = function (arquivoCarregado) {
                const input = document.getElementById("imagem-produto");
 
                const tamanhoMaximo = 500 * 500; // 1MB
 
                if (input.files[index].size > tamanhoMaximo) {
                    Toastify({
                        text: "A imagem é muito grande. O tamanho máximo é de 500 X 500.",
                        duration: 3000,
                        position: "center",
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



function cadastrar() {

	console.log(imagensBase64)

	var objeto = {
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": $('#precoDeVenda').val(),
		"comissao": $('#comissao').val(),
		"categoriaId": $("#categoria option:selected").attr("id"),
		"subcategoriaId": $('#subCategoria option:selected').attr("id"),
		"lojistaId": $('#lojista option:selected').attr("id"),

	};

	$.ajax({

		url: url_base + '/produtos',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(data) {
			Toastify({
				text: "erro na requisição!",
				duration: 3000,
				position: "center",
				type: "erro",
			}).showToast();

		}
	}).done(function(data) {

		var imagens = {
			"imagem": imagensBase64[0],
			"produtoId": data.idProduto,
		}

		$.ajax({
			url: url_base + "/imagens",
			type: 'POST',
			data: JSON.stringify(imagens),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e)

			}
		}).done(function(data) {


			Toastify({
				text: "cadastrado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				window.location.href = 'listarProduto';
			}, 2000);
		})
	})
}

function editar() {

	var objetoEdit = {
		"idProduto": idProduto,
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": $('#precoDeVenda').val(),
		"comissao": $('#comissao').val(),
		"categoriaId": $("#categoria option:selected").attr("id"),
		"subcategoriaId": $('#subCategoria option:selected').attr("id"),
		"lojistaId": 1,
	}

	$.ajax({
		url: url_base + "/produtos",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
	})
		.done(function(data) {
			Toastify({
				text: "Editado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				window.location.href = 'listarProduto';
			}, 2000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

var categoria = []
var subcategoria = []
var lojista = []

$(document).ready(function() {

	

	$.ajax({
		url: url_base + '/categorias',
		type: "GET",
		async: false,
	}).done(function(data) {
		categoria = data;
		renderizarCategoria(data)
	})
	function renderizarCategoria(categoria) {
		var html = categoria.map(function(item) {
			return (
				`<option id="${item.idCategoria}">${item.categoria}</option>`

			)
		});
		$("#categoria").html(html);
	};

	$.ajax({
		url: url_base + '/subcategorias',
		type: "GET",
		async: false,
	}).done(function(data) {
		subcategoria = data;
		renderizarSubCategoria(data)
	})
	function renderizarSubCategoria(subcategoria) {
		var html = subcategoria.map(function(item) {
			return (
				`<option id="${item.id}">${item.nome}</option>`
			)
		});
		$("#subCategoria").html(html);
	};

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
				`<option id="${item.idLojista}">${item.nomeFantasia}</option>`
			)
		});
		$("#lojista").html(html);
	};

	const novaOpcao = $("<option>"); // Cria um novo elemento option
	novaOpcao.text("Selecione..."); // Define o texto da opção
	novaOpcao.val("exemplo");

	$("select").prepend(novaOpcao).val();
	$("select option[value='exemplo']").attr("selected", "selected");

	if (idProduto == undefined) {




	} else {
		
	

		$("#categoria, #subCategoria ,#lojista").attr("disabled", "disabled")

		$("#tituloPagina, #tituloForm").text("Editar Produto")
		$("#btn-submit").text("Editar")
		
	

		$.ajax({
			url: url_base + "/produtos/" + idProduto,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$('#nomeProduto').val(data.nomeProduto),
					$('#descricao').val(data.descrProduto),
					$('#precoDeVenda').val(data.preco),
					$('#comissao').val(data.comissao),
					$('#categoria').find(`option[id=${data.categoriaId}]`).attr("selected", "selected"),
					$('#subCategoria').find(`option[id=${data.subcategoriaId}]`).attr("selected", "selected"),
					$('#lojista').find(`option[id=${data.lojistaId}]`).attr("selected", "selected"),

					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
			
			$.ajax({
			url: url_base + "/imagens/produto/" + idProduto,
			type: 'GET',
			async: false,
		}).done(function(data){
			
			imagem = data[0].imagem
			
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



