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
			
	})
	
	function sairModal(){
		
		$("#carrossel").addClass("none")	
		
	}
	
	
			
			
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
              
                    var imagemBase64 = arquivoCarregado.target.result;
                    imagensBase64.push(imagemBase64);
                    console.log(imagensBase64);
 
                    // Verificar se ainda há mais arquivos para ler
                    if (index < receberArquivos.length - 1) {
                        lerArquivo(index + 1);
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
  
});

function cadastrar() {

	console.log(imagensBase64[0,1,2,3,4,5])

	var objeto = {
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": ValorConvertidoPreco,
		"comissao": ValorConvertidoComissao,
		"categoriaId": $("#categoria option:selected").attr("value"),
		"subcategoriaId": novoValor,
		"lojistaId": $('#lojista option:selected').attr("value"),

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
				console.log(e.responseJSON)
			Toastify({
				text: e.responseJSON.message,
				duration: 3000,
				backgroundColor:"red",
				position: "center",
				type: "erro",
			}).showToast();
			
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
			}, 1000);
		})
	})
}

function editar() {
	
	

	var objetoEdit = {
		"idProduto": idProduto,
		"nomeProduto": $('#nomeProduto').val(),
		"descrProduto": $('#descricao').val(),
		"preco": ValorConvertidoPreco,
		"comissao": ValorConvertidoComissao,
		"categoriaId": $("#categoria option:selected").attr("value"),
		"subcategoriaId": $('#subCategoria option:selected').attr("value"),
		"lojistaId": $('#lojista option:selected').attr("value"),
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
				className: "Toastify__toast--custom"
			}).showToast();
			console.log(e.responseJSON)
		}
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
			}, 1000);
		})
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
		
		$('#categoria').append($('<option>', { 
			 value: "",
			 text : "Selecione...", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#categoria').append($('<option>', { 
                     value: item.idCategoria,
                     id: item.idCategoria,
                     text : item.categoria ,
                     name : item.categoria
                 }));
           })
		
	})

	$.ajax({
		url: url_base + '/subcategorias',
		type: "GET",
		async: false,
	}).done(function(data) {
	
	$('#subCategoria').append($('<option>', { 
			 value: "",
			 text : "Selecione...", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#subCategoria').append($('<option>', { 
                     value: item.id,
                     id: item.id,
                     text : item.nome,
                     name : item.nome
                 }));
           })
	
	})

	$.ajax({
		url: url_base + '/lojistas',
		type: "GET",
		async: false,
	}).done(function(data) {
		
	$('#lojista').append($('<option>', { 
			 value: "",
			 text : "Selecione...", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#lojista').append($('<option>', { 
                     value: item.idLojista,
                     id: item.idLojista,
                     text : item.nomeFantasia,
                     name : item.nomeFantasia
                 }));
           })
		
	})

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
					
					$('#precoDeVenda').val(data.preco.toLocaleString('pt-br', {minimumFractionDigits: 2})),
					$('#comissao').val(data.comissao.toLocaleString('pt-br', {minimumFractionDigits: 2})),
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



