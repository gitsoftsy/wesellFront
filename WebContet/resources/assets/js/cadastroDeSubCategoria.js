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

	var dadosFormulario = {

		
		descriçãoSubCategoria: $('#descricaoSubCategoria').val(),
		

	}

	function validacaoDados() {
		
		 if (dadosFormulario.descriçãoSubCategoria === "") {
			mostraModalFeedback("erro", "Escreva sua Sub-Categoria!")
		}
		else  {
			mostraModalFeedback("sucesso", "Seu Cadastro Foi Realizado!")	
		}
	}
  	
	validacaoDados()
});

  
  
  
  
  
  
  
  

     var userData = {};
      $(formArray).each(function (index, obj) {
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

