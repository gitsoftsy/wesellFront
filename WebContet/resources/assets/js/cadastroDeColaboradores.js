


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
		cpf: $('#cpf').val(),
		usuario: $('#usuario').val(),
		email: $('#email').val(),
		senha: $('#senha').val(),
		administrador: $('#adm').val()
		

	}

	function validacaoDados() {
		if (dadosFormulario.nome === "") {
			mostraModalFeedback("erro", "Digite o Nome do Colaborador!")
		}
		else if (dadosFormulario.cpf === "") {
			mostraModalFeedback("erro", "Digite o CPF, 11 Dígitos!")
		}
		else if (dadosFormulario.usuario === "") {
			mostraModalFeedback("erro", "Digite o Usuário!")
		}
		else if (dadosFormulario.email === "") {
			mostraModalFeedback("erro", "Digite o E-mail!")
		}
		else if (dadosFormulario.senha === "") {
			mostraModalFeedback("erro", "Digite a Senha!")
		}
		else  {
			mostraModalFeedback("sucesso", "Seu Cadastro Foi Realizado!")	
		}
	}
  	
	validacaoDados()
	
	 $.ajax({
    url: "",
    method: "post",
    data: JSON.stringify({
      nome: dadosFormulario.nome,
      email: dadosFormulario.email,
      usario: dadosFormulario.usuario,
      senha: dadosFormulario.senha,
      cpf: dadosFormulario.cpf,
      email: dadosFormulario.email
    }),
    success: function() {
      // Exibe a mensagem de sucesso
      alert("Dados enviados com sucesso!");
    }
  });
	
});