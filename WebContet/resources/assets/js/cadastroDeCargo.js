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
	
	$.ajax({
		url:"https://api-relatorios.sumare.edu.br/api-wesell/cargos",
		type:"POST",
		data:{
			carga:dadosFormulario.cargo,
			
		},
		success: function(){
			console.log("teste de requisição aceito")
		}
	})
	
	
});


  
  
  
  
  
  
  
  

  