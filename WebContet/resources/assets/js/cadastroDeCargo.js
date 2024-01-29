
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

		cargo: $('#cargo').val(),
		descricao: $('#descricao').val()
		

	}

	function validacaoDados() {
		if (dadosFormulario.cargo === "") {
			mostraModalFeedback("erro", " Digite o Cargo que Deseja Incluir!")
		}
		else if (dadosFormulario.descricao === ""){
			mostraModalFeedback("erro", "Digite Uma Descrição")
		}
		else  {
			mostraModalFeedback("sucesso", "Seu Cargo foi Cadastro!")	
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

