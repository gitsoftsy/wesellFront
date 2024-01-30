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

$("#cep").blur(function() {
	
	$.ajax({
		
		url :'https://viacep.com.br/ws/' + $('#cep').val() + '/json/',
		type : "get",
		async : false,
	})
	.done(function(data) {
		$('#endereco').val(data.logradouro);
		$('#bairro').val(data.bairro);
		$('#cidade').val(data.localidade);
		$('#estado').val(data.uf);
		$('#numero').val(data.ddd);
		
		});
	
	});
	
button.addEventListener("click", (event) => {
	event.preventDefault()

	var dadosFormulario = {

		cnpj: $('#cnpj').val(),
		endereço: $('#endereco').val(),
		numero: $('#numero').val(),
		bairro: $('#bairro').val(),
		cidade: $('#cidade').val(),
		estado: $('#estado').val(),
		cep: $('#cep').val(),
		site: $('#site').val(),

	}

	function validacaoDados() {
		if (dadosFormulario.cnpj.length < 14) {
			mostraModalFeedback("erro", " CNPJ Invalido, CNPJ Necessita de 14 Dígitos!")
		}
		else if (dadosFormulario.endereço === "") {
			mostraModalFeedback("erro", "Erro, Escreva Seu Endereço!")
		}
		else if (dadosFormulario.numero.length < 10) {
			mostraModalFeedback("erro", "Número Invalido, (dd) 00000-0000  !")
		}
		else if (dadosFormulario.bairro === "") {
			mostraModalFeedback("erro", "Invalido, Escreva seu Bairro!")
		}
		else if (dadosFormulario.cidade === "") {
			mostraModalFeedback("erro", "Invalido, Escreva sua Cidade!")
		}
		else if (dadosFormulario.estado < 2) {
			mostraModalFeedback("erro", "Invalido, Escreva seu Estado!")
		}
		else if (dadosFormulario.cep < 8) {
			mostraModalFeedback("erro", "Seu Cep precisa de 8 Dígitos!")	
		}
		else if (dadosFormulario.site === "") {
			mostraModalFeedback("erro", "Invalido, Digite seu Site!")
		}
		else  {
			mostraModalFeedback("sucesso", "Seu Cadastro Foi Realizado!")	
		}
	}
  	
	validacaoDados()
});