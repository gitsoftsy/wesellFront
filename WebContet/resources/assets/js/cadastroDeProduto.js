
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


button.addEventListener("click", (event) => {
	event.preventDefault()

	var dadosFormulario = {

		nomeDoProduto: $('#nomeProduto').val(),
		descricao: $('#descricao').val(),
		categoria: $('#categoria').val(),
		subCategoria: $('#subCategoria').val(),
		precoDeVenda: $('#precoDeVenda').val(),
		comissao: $('#comissao').val(),
		lojista: $('#lojista').val(),
		fileInput: document.querySelector("#file").value,

	}

	function validacaoDados() {
		if (dadosFormulario.nomeDoProduto.length < 5) {
			mostraModalFeedback("erro", "Invalido, Nome do Produto precisa ter no minimo 5 Caracteres!")
		}
		else if (dadosFormulario.descricao === "") {
			mostraModalFeedback("erro", "Invalido, Descrição precisa ser preenchida!")
		}
		else if (dadosFormulario.categoria === "") {
			mostraModalFeedback("erro", "Invalido, Selecione uma Categoria!")
		}
		else if (dadosFormulario.subCategoria === "") {
			mostraModalFeedback("erro", "Invalido, Selecione uma Sub-Categoria!")
		}
		else if (dadosFormulario.precoDeVenda.length < 1) {
			mostraModalFeedback("erro", "Invalido, Digite o Valor do Preço de Venda!")
		}
		else if (dadosFormulario.comissao < 1) {
			mostraModalFeedback("erro", "Invalido, Digite o Valor da Comissão!")
		}
		//else if (dadosFormulario.fileInput.files.length === "") {
		//	mostraModalFeedback("erro", "Invalido, Nenhum arquivo selecionado!")
		//}
		else  {
			mostraModalFeedback("sucesso", "Seu Cadastro Foi Realizado!")	
		}
	}
  	
	validacaoDados()
});











var userData = {};
$(formArray).each(function(index, obj) {
	userData[obj.name] = obj.value;
});

var nomeInput = $('#nome').val();

var ativoCheckbox = $('input[name="ativo"]');

var numeroInput = $('#numero');

var cpfInput = $("#cpf");

var emailInput = $('#email').val();

var cargoInput = $('#cargo').val();

userData['ativo'] = ativoCheckbox.is(':checked') ? 'S' : 'N';

userData['numero'] = numeroInput.cleanVal();

userData["cpf"] = cpfInput.cleanVal();

