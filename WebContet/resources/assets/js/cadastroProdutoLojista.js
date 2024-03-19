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

document.getElementById('precoDeVenda').addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    valor = (valor / 100).toFixed(2) + ''; // Divide por 100 para converter em um número decimal e fixa duas casas decimais
    valor = valor.replace('.', ','); // Troca ponto por vírgula
    
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona ponto como separador de milhar
    
    e.target.value = `${valor}`; // Atualiza o campo com o valor formatado
});

document.getElementById('comissao').addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    valor = (valor / 100).toFixed(2) + ''; // Divide por 100 para converter em um número decimal e fixa duas casas decimais
    valor = valor.replace('.', ','); // Troca ponto por vírgula
    
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona ponto como separador de milhar
    
    e.target.value = `${valor}`; // Atualiza o campo com o valor formatado
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
			var imagem = document.getElementsByClassName("imagem-ativa")
			setTimeout(function(){
			document.addEventListener("click", function(event){
				e.preventDefault(e)
				
				if(carrossel.contains(event.target)){
					
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
 
            reader.onload = function (arquivoCarregado) {
                const input = document.getElementById("imagem-produto");
 
                const tamanhoMaximo = 500 * 500; // 1MB
 
                if (input.files[index].size > tamanhoMaximo) {
                    Toastify({
                        text: "A imagem é muito grande. O tamanho máximo é de 500 X 500.",
                        duration: 3000,
                        position: "center",
                        backgroundColor:"red",
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

  var valorSelecionado =  $("#subCategoria option:selected").attr("value")

   novoValor = valorSelecionado == "exemplo" ? "36" :  valorSelecionado;
  
  console.log(novoValor)
});

var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

function cadastrar() {

	console.log(imagensBase64)

	var objeto = {
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": $('#precoDeVenda').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"comissao": $('#comissao').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"categoriaId": $("#categoria option:selected").attr("value"),
		"subcategoriaId": novoValor,
		"lojistaId": usuario.lojistaId,

	};

	$.ajax({

		url: url_base + '/produtos',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
				text: e.responseJSON.message,
				duration: 3000,
				backgroundColor:"red",
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
				window.location.href = 'listarProdutoLojista';
			}, 1000);
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
		"lojistaId": usuario.lojistaId,
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
				window.location.href = 'listarProdutoLojista';
			}, 1000);
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
				`<option value="${item.idCategoria}">${item.categoria}</option>`

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
				`<option value="${item.id}">${item.nome}</option>`
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
				`<option value="${item.idLojista}">${item.nomeFantasia}</option>`
			)
		});
		$("#lojista").html(html);
	};

	const novaOpcao = $("<option>"); // Cria um novo elemento option
	novaOpcao.text("Selecione..."); // Define o texto da opção
	novaOpcao.val("exemplo");
	novaOpcao.attr("id","0")

	$("select").prepend(novaOpcao).val();
	$("select option[value='exemplo']").attr("selected", "selected");

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
				$('#nomeProduto').val(data.nomeProduto),
					$('#descricao').val(data.descrProduto),
					
					$('#precoDeVenda').val(data.preco),
					$('#comissao').val(data.comissao),
					$('#categoria').find(`option[value=${data.categorias.idCategoria}]`).attr("selected", "selected"),
					$('#subCategoria').find(`option[value=${data.subcategorias.id}]`).attr("selected", "selected"),
					$('#lojista').find(`option[value=${data.lojista.idLojista}]`).attr("selected", "selected"),

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



