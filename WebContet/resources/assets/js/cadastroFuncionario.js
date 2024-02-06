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


button.addEventListener("click", (event) => {
	event.preventDefault()

	var objetos = {

		"cargoId": $('#cargo').val(),		
		"cpf": $('#cpf').val(),
		"email": $('#email').val(),
		"lojistaId":2,
		"nome": $('#nome').val(),
		"telefone": $('#telefone').val(),
		

	}

	
		if (objetos.nome === "") {
			mostraModalFeedback("erro", "Digite o Nome do Funcionario!")
		}
		else if (objetos.cargoId === "") {
			mostraModalFeedback("erro", "Selecione o Cargo!")
		}
		else if (objetos.email === "") {
			mostraModalFeedback("erro", "Digite o E-mail do Funcionario!")
		}
		else if (objetos.cpf.length < 11) {
			mostraModalFeedback("erro", "CPF necessita de 14 Dígitos!")
		}
		else if (objetos.telefone.length < 13) {
			mostraModalFeedback("erro", "Telefone Invalido!")
		}
		else  {
			
			$.ajax({
                   
		url: url_base + 'funcionarios',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			mostraModalFeedback("sucesso", "Seu funcionario foi Cadastrado!")
		},
		error: function (data) {
       mostraModalFeedback("erro", " erro!");
        
      }
});
		}
	
  	
	
});

  
  
  
  
  
  
  
  

 