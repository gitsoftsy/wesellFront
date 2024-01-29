

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

		nome: $('#nome').val(),
		cargo: $('#cargo').val(),
		email: $('#email').val(),
		cpf: $('#cpf').val(),
		telefone: $('#telefone').val(),
		

	}

	function validacaoDados() {
		if (dadosFormulario.nome === "") {
			mostraModalFeedback("erro", "Digite o Nome do Funcionario!")
		}
		else if (dadosFormulario.cargo === "") {
			mostraModalFeedback("erro", "Selecione o Cargo!")
		}
		else if (dadosFormulario.email === "") {
			mostraModalFeedback("erro", "Digite o E-mail do Funcionario!")
		}
		else if (dadosFormulario.cpf.length < 11) {
			mostraModalFeedback("erro", "CPF necessita de 14 Dígitos!")
		}
		else if (dadosFormulario.telefone.length < 13) {
			mostraModalFeedback("erro", "Telefone Invalido!")
		}
		else  {
			mostraModalFeedback("sucesso", "Seu Cadastro Foi Realizado!")	
		}
	}
  	
	validacaoDados()
});

  
  
  
  
  
  
  
  

 